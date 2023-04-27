import { generateUuid } from '../common/utils/uuid';

export default class UUID {
  private _id: string;

  constructor() {
    this.regenerate();
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  static fromString(id: string): UUID {
    const newUUID = new UUID();
    newUUID.id = id;
    return newUUID;
  }

  regenerate() {
    this._id = this.getNewId();
  }

  getNewId() {
    return generateUuid();
  }

  getFirstBit() {
    return this.id.split('-')[0];
  }

  getLastBit() {
    return this.id.split('-')[this.id.split('-').length - 1];
  }

  static getNew() {
    return new UUID();
  }

  toString() {
    return this.id;
  }
}
