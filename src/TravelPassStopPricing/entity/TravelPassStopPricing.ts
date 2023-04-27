import BaseEntity from '../../common/entities/BaseEntity';
import TravelPassStop from '../../TravelPassStop/entity/TravelPassStop';
import Money from '../../Money/entity/Money';

export default class TravelPassStopPricing extends BaseEntity {
  private _destination_stop: TravelPassStop;
  private _destination_stop_id: string;
  private _leg_price: Money = new Money();

  get destination_stop(): TravelPassStop {
    return this._destination_stop;
  }

  set destination_stop(value: TravelPassStop) {
    this._destination_stop = value;
  }

  get destination_stop_id(): string {
    return this._destination_stop_id;
  }

  set destination_stop_id(value: string) {
    this._destination_stop_id = value;
  }

  get leg_price(): Money {
    return this._leg_price;
  }

  set leg_price(value: Money) {
    this._leg_price = value;
  }

  isValidCombination(fromPickup: TravelPassStop): boolean {
    return fromPickup.isPickup() && this.destination_stop.isDropoff() && !fromPickup.isEqual(this.destination_stop);
  }
}
