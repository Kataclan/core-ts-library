import BaseEntity from '../../common/entities/BaseEntity';
import Market from '../../Market/entity/Market';

export default class Operator extends BaseEntity {
  private _name: String;
  private _available_markets: Array<Market> = [];

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get available_markets(): Array<Market> {
    return this._available_markets;
  }

  set available_markets(value: Array<Market>) {
    this._available_markets = value;
  }
}
