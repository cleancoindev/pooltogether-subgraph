// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Draw extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Draw entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Draw entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Draw", id.toString(), this);
  }

  static load(id: string): Draw | null {
    return store.get("Draw", id) as Draw | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get drawId(): BigInt {
    let value = this.get("drawId");
    return value.toBigInt();
  }

  set drawId(value: BigInt) {
    this.set("drawId", Value.fromBigInt(value));
  }

  get feeBeneficiary(): Bytes | null {
    let value = this.get("feeBeneficiary");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set feeBeneficiary(value: Bytes | null) {
    if (value === null) {
      this.unset("feeBeneficiary");
    } else {
      this.set("feeBeneficiary", Value.fromBytes(value as Bytes));
    }
  }

  get secretHash(): Bytes | null {
    let value = this.get("secretHash");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set secretHash(value: Bytes | null) {
    if (value === null) {
      this.unset("secretHash");
    } else {
      this.set("secretHash", Value.fromBytes(value as Bytes));
    }
  }

  get feeFraction(): BigInt | null {
    let value = this.get("feeFraction");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set feeFraction(value: BigInt | null) {
    if (value === null) {
      this.unset("feeFraction");
    } else {
      this.set("feeFraction", Value.fromBigInt(value as BigInt));
    }
  }

  get winner(): Bytes | null {
    let value = this.get("winner");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set winner(value: Bytes | null) {
    if (value === null) {
      this.unset("winner");
    } else {
      this.set("winner", Value.fromBytes(value as Bytes));
    }
  }

  get entropy(): Bytes | null {
    let value = this.get("entropy");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set entropy(value: Bytes | null) {
    if (value === null) {
      this.unset("entropy");
    } else {
      this.set("entropy", Value.fromBytes(value as Bytes));
    }
  }

  get winnings(): BigInt | null {
    let value = this.get("winnings");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set winnings(value: BigInt | null) {
    if (value === null) {
      this.unset("winnings");
    } else {
      this.set("winnings", Value.fromBigInt(value as BigInt));
    }
  }

  get fee(): BigInt | null {
    let value = this.get("fee");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt | null) {
    if (value === null) {
      this.unset("fee");
    } else {
      this.set("fee", Value.fromBigInt(value as BigInt));
    }
  }

  get state(): string | null {
    let value = this.get("state");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set state(value: string | null) {
    if (value === null) {
      this.unset("state");
    } else {
      this.set("state", Value.fromString(value as string));
    }
  }

  get poolContract(): string {
    let value = this.get("poolContract");
    return value.toString();
  }

  set poolContract(value: string) {
    this.set("poolContract", Value.fromString(value));
  }

  get openedAt(): BigInt | null {
    let value = this.get("openedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set openedAt(value: BigInt | null) {
    if (value === null) {
      this.unset("openedAt");
    } else {
      this.set("openedAt", Value.fromBigInt(value as BigInt));
    }
  }

  get committedAt(): BigInt | null {
    let value = this.get("committedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set committedAt(value: BigInt | null) {
    if (value === null) {
      this.unset("committedAt");
    } else {
      this.set("committedAt", Value.fromBigInt(value as BigInt));
    }
  }

  get rewardedAt(): BigInt | null {
    let value = this.get("rewardedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set rewardedAt(value: BigInt | null) {
    if (value === null) {
      this.unset("rewardedAt");
    } else {
      this.set("rewardedAt", Value.fromBigInt(value as BigInt));
    }
  }

  get balance(): BigInt | null {
    let value = this.get("balance");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set balance(value: BigInt | null) {
    if (value === null) {
      this.unset("balance");
    } else {
      this.set("balance", Value.fromBigInt(value as BigInt));
    }
  }

  get winnerEntry(): string | null {
    let value = this.get("winnerEntry");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set winnerEntry(value: string | null) {
    if (value === null) {
      this.unset("winnerEntry");
    } else {
      this.set("winnerEntry", Value.fromString(value as string));
    }
  }

  get extra(): string | null {
    let value = this.get("extra");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set extra(value: string | null) {
    if (value === null) {
      this.unset("extra");
    } else {
      this.set("extra", Value.fromString(value as string));
    }
  }

  get entryIds(): Array<string> {
    let value = this.get("entryIds");
    return value.toStringArray();
  }

  set entryIds(value: Array<string>) {
    this.set("entryIds", Value.fromStringArray(value));
  }

  get entries(): Array<string> {
    let value = this.get("entries");
    return value.toStringArray();
  }

  set entries(value: Array<string>) {
    this.set("entries", Value.fromStringArray(value));
  }

  get entriesCount(): BigInt {
    let value = this.get("entriesCount");
    return value.toBigInt();
  }

  set entriesCount(value: BigInt) {
    this.set("entriesCount", Value.fromBigInt(value));
  }
}

export class Player extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Player entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Player entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Player", id.toString(), this);
  }

  static load(id: string): Player | null {
    return store.get("Player", id) as Player | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get sponsorshipBalance(): BigInt {
    let value = this.get("sponsorshipBalance");
    return value.toBigInt();
  }

  set sponsorshipBalance(value: BigInt) {
    this.set("sponsorshipBalance", Value.fromBigInt(value));
  }

  get entries(): Array<string> | null {
    let value = this.get("entries");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set entries(value: Array<string> | null) {
    if (value === null) {
      this.unset("entries");
    } else {
      this.set("entries", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class Admin extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Admin entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Admin entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Admin", id.toString(), this);
  }

  static load(id: string): Admin | null {
    return store.get("Admin", id) as Admin | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get addedAt(): BigInt {
    let value = this.get("addedAt");
    return value.toBigInt();
  }

  set addedAt(value: BigInt) {
    this.set("addedAt", Value.fromBigInt(value));
  }
}

export class PlayerEntry extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save PlayerEntry entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save PlayerEntry entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("PlayerEntry", id.toString(), this);
  }

  static load(id: string): PlayerEntry | null {
    return store.get("PlayerEntry", id) as PlayerEntry | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get drawId(): BigInt {
    let value = this.get("drawId");
    return value.toBigInt();
  }

  set drawId(value: BigInt) {
    this.set("drawId", Value.fromBigInt(value));
  }

  get draw(): string {
    let value = this.get("draw");
    return value.toString();
  }

  set draw(value: string) {
    this.set("draw", Value.fromString(value));
  }

  get player(): string | null {
    let value = this.get("player");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set player(value: string | null) {
    if (value === null) {
      this.unset("player");
    } else {
      this.set("player", Value.fromString(value as string));
    }
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get sponsorshipBalance(): BigInt | null {
    let value = this.get("sponsorshipBalance");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set sponsorshipBalance(value: BigInt | null) {
    if (value === null) {
      this.unset("sponsorshipBalance");
    } else {
      this.set("sponsorshipBalance", Value.fromBigInt(value as BigInt));
    }
  }
}

export class PoolContract extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save PoolContract entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save PoolContract entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("PoolContract", id.toString(), this);
  }

  static load(id: string): PoolContract | null {
    return store.get("PoolContract", id) as PoolContract | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get draws(): Array<string> {
    let value = this.get("draws");
    return value.toStringArray();
  }

  set draws(value: Array<string>) {
    this.set("draws", Value.fromStringArray(value));
  }
}
