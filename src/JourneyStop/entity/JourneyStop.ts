import TravelStop from '../../TravelStop/entity/TravelStop';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';

export default class JourneyStop extends TravelStop {
  static STOP_WAITING_TIME: number = 0;

  private _seats_available: any;
  private _arrival_date: DateTimeZone = new DateTimeZone();
  private _departure_date: DateTimeZone = new DateTimeZone();
  private _pickup: boolean;
  private _dropoff: boolean;
  protected _stop_waiting_time: number = JourneyStop.STOP_WAITING_TIME;

  loopId: string;
  isNotUsed: boolean;

  get seats_available(): any {
    return this._seats_available;
  }

  set seats_available(value: any) {
    this._seats_available = value;
  }

  get arrival_date(): DateTimeZone {
    return this._arrival_date;
  }

  set arrival_date(value: DateTimeZone) {
    this._arrival_date = value;
  }

  get departure_date(): DateTimeZone {
    return this._departure_date;
  }

  set departure_date(value: DateTimeZone) {
    this._departure_date = value;
  }

  get pickup(): boolean {
    return this._pickup;
  }

  set pickup(value: boolean) {
    this._pickup = value;
  }

  get dropoff(): boolean {
    return this._dropoff;
  }

  set dropoff(value: boolean) {
    this._dropoff = value;
  }

  isJourneyStop(): boolean {
    return true;
  }
}
