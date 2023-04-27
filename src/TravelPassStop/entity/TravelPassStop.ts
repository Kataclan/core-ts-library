import BaseEntity from '../../common/entities/BaseEntity';
import Stop from '../../Stop/entity/Stop';
import TravelStopType from '../../TravelStop/enums/TravelStopType';
import TravelPassStopPricing from '../../TravelPassStopPricing/entity/TravelPassStopPricing';

export default class TravelPassStop extends BaseEntity {
  private _stop: Stop;
  private _stop_order: number;
  private _type: TravelStopType;
  private _pricings: Array<TravelPassStopPricing> = [];
  private _from_route_id: string;
  private _from_route_name: string;
  location: any;

  get stop(): Stop {
    return this._stop;
  }

  set stop(value: Stop) {
    this._stop = value;
  }

  get stop_order(): number {
    return this._stop_order;
  }

  set stop_order(value: number) {
    this._stop_order = value;
  }

  get type(): TravelStopType {
    return this._type;
  }

  set type(value: TravelStopType) {
    this._type = value;
  }

  get pricings(): Array<TravelPassStopPricing> {
    return this._pricings;
  }

  set pricings(value: Array<TravelPassStopPricing>) {
    this._pricings = value;
  }

  get from_route_id(): string {
    return this._from_route_id;
  }

  set from_route_id(value: string) {
    this._from_route_id = value;
  }

  get from_route_name(): string {
    return this._from_route_name;
  }

  set from_route_name(value: string) {
    this._from_route_name = value;
  }

  addPricing(item: TravelPassStopPricing) {
    this.pricings.push(item);
  }

  isPickup() {
    return this.type === TravelStopType.TYPE_PICKUP || this.type === TravelStopType.TYPE_BOTH;
  }

  isDropoff() {
    return this.type === TravelStopType.TYPE_DROPOFF || this.type === TravelStopType.TYPE_BOTH;
  }

  isPickupAndDropoff() {
    return this.type === TravelStopType.TYPE_BOTH;
  }

  getDisplayedName(): string {
    return this.stop.name;
  }
}
