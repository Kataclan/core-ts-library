import moment from 'moment-timezone';

import DateTimeZone from '../entity/DateTimeZone';

export default function prepareTimestamp(instance: DateTimeZone): any {
  const fromMoment = moment.tz(moment(), moment.tz.guess(true));

  if (!instance || !instance.datetime || !instance.timezone) {
    return fromMoment.format('X');
  }

  return moment(instance.datetime, 'YYYYMMDDHHmmss', instance.timezone).unix();
}
