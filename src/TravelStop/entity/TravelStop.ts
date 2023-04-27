import Location from '../../Location/entity/Location';
import TravelStopType from '../enums/TravelStopType';
import ValidableInterface from '../../common/interfaces/ValidableInterface';
import BaseEntity from '../../common/entities/BaseEntity';
import TravelStopPricing from '../../TravelStopPricing/entity/TravelStopPricing';

export default abstract class TravelStop extends BaseEntity implements ValidableInterface {
  private _name: string = '';
  private _location: Location = null;
  private _type: TravelStopType;
  private _pricings: Array<TravelStopPricing> = [];
  private _location_order: number;
  private _time_to_reach: number;
  private _distance: number;
  protected _stop_waiting_time: number;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }

  get type(): TravelStopType {
    return this._type;
  }

  set type(value: TravelStopType) {
    this._type = value;
  }

  get pricings(): Array<TravelStopPricing> {
    return this._pricings;
  }

  set pricings(value: Array<TravelStopPricing>) {
    this._pricings = value;
  }

  get location_order(): number {
    return this._location_order;
  }

  set location_order(value: number) {
    this._location_order = value;
  }

  get time_to_reach(): number {
    return this._time_to_reach;
  }

  set time_to_reach(value: number) {
    this._time_to_reach = value;
  }

  get distance(): number {
    return this._distance;
  }

  set distance(value: number) {
    this._distance = value;
  }

  get stop_waiting_time(): number {
    return this._stop_waiting_time;
  }

  set stop_waiting_time(value: number) {
    this._stop_waiting_time = value;
  }

  getDisplayedName(): string {
    return this.location.stop_name;
  }

  addPricing(item: TravelStopPricing) {
    this.pricings.push(item);
  }

  setPricing(item: TravelStopPricing) {
    this.pricings[this.pricings.findIndex((e) => e.id === item.id)] = item;
  }

  removePricing(item: TravelStopPricing) {
    let index = this.pricings.findIndex((each: TravelStopPricing) => each.id === item.id);
    index !== -1 && this.pricings.slice(index, 1);
  }

  resetPricing() {
    this.pricings = [];
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

  isValidPickup() {
    return this.isPickup() || this.isPickupAndDropoff();
  }

  isValidDropoff() {
    return this.isDropoff() || this.isPickupAndDropoff();
  }

  public isValid() {
    return this.invalidFields().length === 0;
  }

  public invalidFields() {
    let fields = [];

    !this._location && fields.push('location');

    return fields;
  }

  isEqual(as: TravelStop): boolean {
    return this.id === as.id;
  }

  isRouteStop(): boolean {
    return false;
  }

  isJourneyStop(): boolean {
    return false;
  }
}
