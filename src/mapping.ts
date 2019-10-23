import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import { store, log } from '@graphprotocol/graph-ts'
import {
  Pool,
  Deposited,
  SponsorshipDeposited,
  AdminAdded,
  AdminRemoved,
  Withdrawn,
  Opened,
  Committed,
  Rewarded,
  NextFeeFractionChanged,
  NextFeeBeneficiaryChanged,
  Paused,
  Unpaused
} from "../generated/PoolTogether/Pool"
import { 
  Draw,
  PlayerEntry,
  Player,
  Admin
} from '../generated/schema'

const ZERO = BigInt.fromI32(0)
const ONE = BigInt.fromI32(1)

function formatPlayerEntryId(playerId: string, drawId: BigInt): string {
  return 'player-' + playerId + '_draw-' + drawId.toString()
}

function createPlayerEntry(playerId: string, drawId: BigInt): PlayerEntry {
  const playerEntryId = formatPlayerEntryId(playerId, drawId)
  const playerEntry = new PlayerEntry(playerEntryId)
  playerEntry.player = playerId
  playerEntry.draw = drawId.toString()
  playerEntry.drawId = drawId
  return playerEntry
}

function addEntry(draw: Draw | null, playerEntry: PlayerEntry | null): void {
  const entryIds = draw.entryIds.slice(0)
  log.debug("------------------ addEntry: playerId: {}", [playerEntry.id.toString()])
  entryIds.push(playerEntry.id)
  draw.entryIds = entryIds
  draw.entries = entryIds.slice(0)
}

function removeEntry(draw: Draw | null, playerEntryId: string): void {
  let entryIds = draw.entryIds.slice(0)
  const index = entryIds.indexOf(playerEntryId)
  if (index !== -1) {
    entryIds.splice(index, 1)
  }
  draw.entryIds = entryIds
  draw.entries = entryIds.slice(0)
}

export function handleDeposited(event: Deposited): void {
  const playerAddress = event.params.sender
  const poolAddress = event.address
  let playerId = playerAddress.toHex()
  let player = Player.load(playerId)
  if (!player) {
    player = new Player(playerId)
    player.sponsorshipBalance = ZERO
  }
  let pool = Pool.bind(poolAddress)
  player.balance = pool.committedBalanceOf(playerAddress).plus(pool.openBalanceOf(playerAddress))
  player.save()

  const openDrawId = pool.currentOpenDrawId()
  const openDraw = Draw.load(openDrawId.toString())
  openDraw.balance = pool.committedSupply().plus(pool.openSupply())
  openDraw.save()

  const playerEntryId = formatPlayerEntryId(playerId, openDrawId)
  let playerEntry = PlayerEntry.load(playerEntryId)
  if (!playerEntry) {
    playerEntry = createPlayerEntry(player.id, openDrawId)
    playerEntry.balance = player.balance
    playerEntry.save()
    addEntry(openDraw, playerEntry)
    openDraw.save()
  } else {
    playerEntry.balance = player.balance
    playerEntry.save()
  }
}

export function handleSponsorshipDeposited(event: SponsorshipDeposited): void {
  let playerAddress = event.params.sender
  let playerId = playerAddress.toHex()
  let player = Player.load(playerId)
  if (!player) {
    player = new Player(playerId)
    player.balance = ZERO
  }
  let pool = Pool.bind(event.address)
  let balance = pool.balanceOf(playerAddress)
  let committedBalance = pool.committedBalanceOf(playerAddress)
  let openBalance = pool.openBalanceOf(playerAddress)
  let sponsorshipBalance = balance.minus(committedBalance.plus(openBalance))
  player.sponsorshipBalance = sponsorshipBalance
  player.save()
}

export function handleWithdrawn(event: Withdrawn): void {
  let playerAddress = event.params.sender
  log.debug('handleWithdrawn for tx {}, sender: {}', [event.transaction.hash.toHex(), playerAddress.toHex()])
  let playerId = playerAddress.toHex()
  let player = new Player(playerId)
  player.balance = ZERO
  player.sponsorshipBalance = ZERO
  player.save()

  let pool = Pool.bind(event.address)
  const openDrawId = pool.currentOpenDrawId()
  const openDraw = Draw.load(openDrawId.toString())

  const openPlayerEntryId = formatPlayerEntryId(playerId, openDrawId)
  removeEntry(openDraw, openPlayerEntryId)
  openDraw.balance = pool.committedSupply().plus(pool.openSupply())
  openDraw.save()
  store.remove('PlayerEntry', openPlayerEntryId)

  const committedDrawId = pool.currentCommittedDrawId()
  const committedPlayerEntryId = formatPlayerEntryId(playerId, committedDrawId)
  const committedPlayerEntry = PlayerEntry.load(committedPlayerEntryId)
  if (committedPlayerEntry) {
    const committedDraw = Draw.load(committedDrawId.toString())
    removeEntry(committedDraw, committedPlayerEntryId)
    committedDraw.balance = pool.committedSupply()
    committedDraw.save()
    store.remove('PlayerEntry', committedPlayerEntryId)
  }
}

export function handleAdminAdded(event: AdminAdded): void {
  let adminId = event.params.admin.toHex()
  let admin = new Admin(adminId)
  admin.addedAt = event.block.timestamp
  admin.save()
}

export function handleAdminRemoved(event: AdminRemoved): void {
  let adminId = event.params.admin.toHex()
  store.remove('Admin', adminId)
}

export function handleOpened(event: Opened): void {
  const drawId = event.params.drawId
  const draw = new Draw(drawId.toString())

  let pool = Pool.bind(event.address)  

  draw.balance = pool.committedSupply().plus(pool.openSupply())
  draw.drawId = drawId
  draw.winner = new Bytes(32)
  draw.entropy = new Bytes(32)
  draw.winnings = ZERO
  draw.fee = ZERO
  draw.state = 'Open'
  draw.feeBeneficiary = event.params.feeBeneficiary
  draw.secretHash = event.params.secretHash
  draw.feeFraction = event.params.feeFraction
  draw.openedAt = event.block.timestamp
  draw.committedAt = ZERO
  draw.rewardedAt = ZERO

  draw.save()

  log.debug("!!!!!!!!!!!!!! Started draw {}", [drawId.toString()])

  let committedDrawId = pool.currentCommittedDrawId()
  draw.entryIds = []
  draw.entries = []
  if (!committedDrawId.isZero()) {
    const committedDraw = Draw.load(committedDrawId.toString())
    const entryIds = committedDraw.entryIds.slice(0)
    log.debug("!!!!!!!!!!!!!! Found old committed draw {}", [committedDrawId.toString()])
    for (let i = 0; i < entryIds.length; i++) {
      let committedPlayerEntry = PlayerEntry.load(entryIds[i])
      const playerAddress = Address.fromString(committedPlayerEntry.player)
      log.debug("!!!!!!!!!!!!!! Started draw {} Found player {}", [drawId.toString(), committedPlayerEntry.player])
      const openPlayerEntry = createPlayerEntry(committedPlayerEntry.player, drawId)
      openPlayerEntry.balance = pool.committedBalanceOf(playerAddress).plus(pool.openBalanceOf(playerAddress))
      openPlayerEntry.save()
      addEntry(draw, openPlayerEntry)
    }
  }
  draw.save()
}

export function handleCommitted(event: Committed): void {
  let openDraw = new Draw(event.params.drawId.toString())
  openDraw.state = 'Committed'
  openDraw.committedAt = event.block.timestamp
  openDraw.save()
}

export function handleRewarded(event: Rewarded): void {
  let draw = Draw.load(event.params.drawId.toString())
  
  draw.state = 'Rewarded'
  draw.winner = event.params.winner

  const winnerEntryId = formatPlayerEntryId(draw.winner.toHex(), event.params.drawId)
  const playerEntry = PlayerEntry.load(winnerEntryId)
  log.debug("????????????? WINNER PLAYER ENTRY IS: {}, exists: {}", [winnerEntryId, (playerEntry !== null ? 'yes' : 'no')])
  draw.winnerEntry = winnerEntryId

  draw.winnings = event.params.winnings
  draw.fee = event.params.fee
  draw.entropy = event.params.entropy
  draw.rewardedAt = event.block.timestamp

  draw.save()

  // const pool = Pool.bind(event.address)
  // const committedDrawId = pool.currentCommittedDrawId()
  // const committedPlayerEntryId = formatPlayerEntryId(draw.winner.toHex(), committedDrawId)
  // const committedPlayerEntry = PlayerEntry.load(committedPlayerEntryId)
  // committedPlayerEntry.balance = committedPlayerEntry.balance.plus(draw.winnings)
  // committedPlayerEntry.save()
}

export function handleNextFeeFractionChanged(
  event: NextFeeFractionChanged
): void {}

export function handleNextFeeBeneficiaryChanged(
  event: NextFeeBeneficiaryChanged
): void {}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}


/*


When a draw is rewarded:





*/