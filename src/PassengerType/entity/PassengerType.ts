import BaseEntity from '../../common/entities/BaseEntity';
import Market from '../../Market/entity/Market';

export default class PassengerType extends BaseEntity {
  private _name: string;
  market: Market;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
