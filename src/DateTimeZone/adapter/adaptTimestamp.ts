import moment from 'moment-timezone';

import DateTimeZone from '../entity/DateTimeZone';

export default function adaptTimestamp(createdAt: number): any {
  const datetime = new DateTimeZone();
  const unix = moment.unix(createdAt);

  datetime.datetime = unix.format('YYYY-MM-DD HH:mm:ss');
  datetime.timezone = moment.tz.guess(true);

  return datetime;
}
