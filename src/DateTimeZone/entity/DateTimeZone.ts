import * as moment from 'moment-timezone';

import clone from '../../common/utils/clone';

export default class DateTimeZone {
  private _datetime: string; // e.g.: 2019-02-14 13:47:21
  private _timezone: string; // e.g.: Europe/London

  get datetime(): string {
    return this._datetime;
  }

  set datetime(value: string) {
    this._datetime = value;
  }

  get timezone(): string {
    return this._timezone;
  }

  set timezone(value: string) {
    this._timezone = value;
  }

  static getNew(datetime: string, timezone: string): DateTimeZone {
    const dtz = new this();
    dtz.datetime = datetime;
    dtz.timezone = timezone;
    return dtz;
  }

  static fromString(datetimeAndTimezone: string): DateTimeZone {
    if (!datetimeAndTimezone) {
      return null;
    }

    const isValidFormat = datetimeAndTimezone.match(/([0-9]{14}) (.*)/);

    if (!isValidFormat) {
      return null;
    }

    const [, datetime, timezone] = isValidFormat;

    const momentObject = moment.tz(datetime, 'YYYYMMDDHHmmss', timezone);

    return DateTimeZone.getNewFromMoment(momentObject);
  }

  static getNewFromMoment(dateTimeMoment) {
    return DateTimeZone.getNew(dateTimeMoment.format('YYYY-MM-DD HH:mm:ss'), dateTimeMoment.tz());
  }

  happensBefore(another: DateTimeZone): boolean {
    return (
      moment(this.getInEuropeLondon().datetime).format('YYYYMMDDHHmmss') <
      moment(another.getInEuropeLondon().datetime).format('YYYYMMDDHHmmss')
    );
  }

  happensAfter(another: DateTimeZone): boolean {
    return (
      moment(this.getInEuropeLondon().datetime).format('YYYYMMDDHHmmss') >
      moment(another.getInEuropeLondon().datetime).format('YYYYMMDDHHmmss')
    );
  }

  getInEuropeLondon() {
    return this.toTimezone('Europe/London');
  }

  guessTimezone() {
    this.timezone = moment.tz.guess(true);
  }

  momentify(toTimeone = null) {
    const toReturn = moment.tz(this.datetime, this.timezone);
    if (toTimeone) {
      toReturn.tz(toTimeone);
    }

    return toReturn;
  }

  toTimezone(timezone: string): DateTimeZone {
    const newDateTimeZone = clone(this);
    newDateTimeZone.datetime = moment
      .tz(newDateTimeZone.datetime, 'YYYY-MM-DD HH:mm:ss', newDateTimeZone.timezone)
      .tz(timezone);
    newDateTimeZone.timezone = timezone;
    return newDateTimeZone;
  }

  isWithinTheNextXUnits(value: number, units: string): boolean {
    const thisMoment = moment.tz(this.datetime, this.timezone);
    const nowMoment = moment.tz().subtract(value, units);

    if (!nowMoment.isValid) return false;

    return thisMoment.isAfter(nowMoment);
  }

  isStrictlySameAsByTimezone(timezone: string): boolean {
    return this.toTimezone(timezone).momentify().format('YYYYMMDDHHmmss') === this.momentify().format('YYYYMMDDHHmmss');
  }
}
