import moment from 'moment-timezone';

import DateTimeZone from '../entity/DateTimeZone';

function strip(what: string): string {
  return moment(what).format('YYYYMMDDHHmmss');
}

export default function prepareDateTimeZone(instance: DateTimeZone, timezone?: string): any {
  if (!instance || !instance.datetime || !instance.timezone) {
    return null;
  }

  return `${strip(instance.datetime)} ${timezone ?? instance.timezone}`;
}
