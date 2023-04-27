import BookedItem from './BookedItem';
import Tier from '../../Tier/entity/Tier';
import TravelPassStop from '../../TravelPassStop/entity/TravelPassStop';

export default class BookedItemTier extends BookedItem {
  private _tier: Tier;
  private _tier_stop_pickup: TravelPassStop;
  private _tier_stop_dropoff: TravelPassStop;

  get tier(): Tier {
    return this._tier;
  }

  set tier(value: Tier) {
    this._tier = value;
  }

  get tier_stop_pickup(): TravelPassStop {
    return this._tier_stop_pickup;
  }

  set tier_stop_pickup(value: TravelPassStop) {
    this._tier_stop_pickup = value;
  }

  get tier_stop_dropoff(): TravelPassStop {
    return this._tier_stop_dropoff;
  }

  set tier_stop_dropoff(value: TravelPassStop) {
    this._tier_stop_dropoff = value;
  }
}
