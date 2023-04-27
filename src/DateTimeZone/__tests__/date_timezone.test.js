import DateTimeZone from '../entity/DateTimeZone';

describe('DateTimeZone tests', () => {
  it('Should detect that 2 DateTimeZone objects are strictly the same, given a timezone', () => {
    const dateTimeZone = DateTimeZone.getNew('2022-11-09 12:13:14', 'Europe/London');

    expect(dateTimeZone.isStrictlySameAsByTimezone('Europe/London')).toBeTruthy();
  });

  it('Should detect that 2 DateTimeZone objects are not strictly the same, given a timezone', () => {
    const dateTimeZone = DateTimeZone.getNew('2022-11-09 12:13:14', 'Europe/London');

    expect(dateTimeZone.isStrictlySameAsByTimezone('America/New_York')).toBeFalsy();
  });
});
