import BaseEntity from '../../common/entities/BaseEntity';
import JourneyStop from '../../JourneyStop/entity/JourneyStop';
import Vehicle from '../../Vehicle/entity/Vehicle';
import Journey from '../../Journey/entity/Journey';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import TravelStopType from '../../TravelStop/enums/TravelStopType';
import GeoPoint from '../../GeoPoint/entity/GeoPoint';
import ETA from '../../ETA/entity/ETA';

export default class JourneyVehicleStop extends BaseEntity {
  private _number_of_seats: number;
  private _journey: Journey;
  private _vehicle: Vehicle;
  private _journey_stop: JourneyStop;
  private _scheduled_arrival_time: DateTimeZone = new DateTimeZone();
  private _actual_arrival_time: DateTimeZone = new DateTimeZone();
  private _scheduled_departure_time: DateTimeZone = new DateTimeZone();
  private _actual_departure_time: DateTimeZone = new DateTimeZone();
  private _name: string;
  private _type: TravelStopType;
  private _journey_stop_id: string;

  geoPoint: GeoPoint;
  locationName: string;
  ETA: ETA;
  passengersCounter: number;
  isNotUsed: boolean;
  loopId: string;

  get number_of_seats(): number {
    return this._number_of_seats;
  }

  set number_of_seats(value: number) {
    this._number_of_seats = value;
  }

  get journey(): Journey {
    return this._journey;
  }

  set journey(value: Journey) {
    this._journey = value;
  }

  get vehicle(): Vehicle {
    return this._vehicle;
  }

  set vehicle(value: Vehicle) {
    this._vehicle = value;
  }

  get journey_stop(): JourneyStop {
    return this._journey_stop;
  }

  set journey_stop(value: JourneyStop) {
    this._journey_stop = value;
  }

  get scheduled_arrival_time(): DateTimeZone {
    return this._scheduled_arrival_time;
  }

  set scheduled_arrival_time(value: DateTimeZone) {
    this._scheduled_arrival_time = value;
  }

  get actual_arrival_time(): DateTimeZone {
    return this._actual_arrival_time;
  }

  set actual_arrival_time(value: DateTimeZone) {
    this._actual_arrival_time = value;
  }

  get scheduled_departure_time(): DateTimeZone {
    return this._scheduled_departure_time;
  }

  set scheduled_departure_time(value: DateTimeZone) {
    this._scheduled_departure_time = value;
  }

  get actual_departure_time(): DateTimeZone {
    return this._actual_departure_time;
  }

  set actual_departure_time(value: DateTimeZone) {
    this._actual_departure_time = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): TravelStopType {
    return this._type;
  }

  set type(value: TravelStopType) {
    this._type = value;
  }

  get journey_stop_id(): string {
    return this._journey_stop_id;
  }

  set journey_stop_id(value: string) {
    this._journey_stop_id = value;
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

  arrivedBehindSchedule(): boolean {
    return this.scheduled_arrival_time.happensBefore(this.actual_arrival_time);
  }

  arrivedAheadSchedule(): boolean {
    return this.actual_arrival_time.happensBefore(this.scheduled_arrival_time);
  }

  arrivedOnTime(): boolean {
    return (
      this.scheduled_arrival_time.momentify().format('YYYYMMHHmm') ===
      this.actual_arrival_time.momentify().format('YYYYMMHHmm')
    );
  }

  departedBehindSchedule(): boolean {
    return this.scheduled_departure_time.happensBefore(this.actual_departure_time);
  }

  departedAheadSchedule(): boolean {
    return this.actual_departure_time.happensBefore(this.scheduled_departure_time);
  }

  departedOnTime(): boolean {
    return (
      this.scheduled_departure_time.momentify().format('YYYYMMHHmm') ===
      this.actual_departure_time.momentify().format('YYYYMMHHmm')
    );
  }

  hasBeenVisited(): boolean {
    return !!this.actual_arrival_time.datetime;
  }

  getLatitude(): number {
    return this.geoPoint.latitude;
  }

  getLongitude(): number {
    return this.geoPoint.longitude;
  }
}
