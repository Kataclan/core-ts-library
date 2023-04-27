import UUID from '../../UUID/UUID';

export default abstract class BaseEntity {
  id: string;
  uuid: UUID;
  created: boolean = false;

  version: number;

  constructor(id: string = UUID.getNew().toString()) {
    this.uuid = UUID.fromString(id);
    this.id = id;
  }

  identify(id: string) {
    if (!id) throw new Error('ID must be a valid string');

    this.id = id;
    this.uuid = UUID.fromString(id);
  }

  isRemotelyCreated(): boolean {
    return this.created;
  }

  isEqual(as: BaseEntity): boolean {
    return this.id === as.id;
  }

  hasValue(field) {
    return field !== undefined && field !== null && field !== '';
  }

  regen() {
    this.uuid.regenerate();
    this.id = this.uuid.id;
  }

  getFirstIdBit() {
    return this.id.split('-')[0];
  }

  getLastIdBit() {
    return this.id.split('-')[this.id.split('-').length - 1];
  }
}
