import moment from 'moment-timezone';

import DateTimeZone from '../entity/DateTimeZone';

function rearrange(what: string, timezone: string): string {
  return moment.tz(what, 'YYYYMMDDHHmmss', timezone).format('YYYY-MM-DD HH:mm:ss');
}

export default function adaptDateTimeZone(
  json: string,
  instance: DateTimeZone = new DateTimeZone(),
  toTimezone = null
): DateTimeZone {
  if (!json) return instance;

  const splitted = json.split(' ');
  instance.timezone = splitted[1];
  instance.datetime = rearrange(splitted[0], instance.timezone); // it arrives as YYYYMMDDHHmmss

  if (toTimezone) {
    const mom = moment.tz(instance.datetime, instance.timezone).tz(toTimezone);
    instance.datetime = mom.format('YYYY-MM-DD HH:mm:ss');
    instance.timezone = toTimezone;
  }

  return instance;
}
