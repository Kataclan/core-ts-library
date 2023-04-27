import ValidableInterface from '../../common/interfaces/ValidableInterface';
import BaseEntity from '../../common/entities/BaseEntity';
import TravelStop from '../../TravelStop/entity/TravelStop';
import Money from '../../Money/entity/Money';

export default class TravelStopPricing extends BaseEntity implements ValidableInterface {
  private _destination_stop: TravelStop;
  private _destination_stop_id: string;
  private _one_leg_price: Money = new Money();
  private _two_legs_price: Money = new Money();

  get destination_stop(): TravelStop {
    return this._destination_stop;
  }

  set destination_stop(value: TravelStop) {
    this._destination_stop = value;
  }

  get destination_stop_id(): string {
    return this._destination_stop_id;
  }

  set destination_stop_id(value: string) {
    this._destination_stop_id = value;
  }

  get one_leg_price(): Money {
    return this._one_leg_price;
  }

  set one_leg_price(value: Money) {
    this._one_leg_price = value;
  }

  get two_legs_price(): Money {
    return this._two_legs_price;
  }

  set two_legs_price(value: Money) {
    this._two_legs_price = value;
  }

  invalidFields(prefix: string = ''): Array<string> {
    let fields = [];
    return fields;
  }

  isValid(): boolean {
    return this.invalidFields().length === 0;
  }

  isValidCombination(fromPickup: TravelStop): boolean {
    return fromPickup.isPickup() && this.destination_stop.isDropoff() && !fromPickup.isEqual(this.destination_stop);
  }
}
