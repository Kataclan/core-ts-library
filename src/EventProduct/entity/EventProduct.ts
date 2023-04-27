import TravelProduct from '../../TravelProduct/entity/TravelProduct';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import PageType from '../../Page/enums/PageType';

export default class EventProduct extends TravelProduct {
  protected _from_date: DateTimeZone = new DateTimeZone();
  protected _to_date: DateTimeZone = new DateTimeZone();

  constructor() {
    super();
    this.page_type = PageType.EVENT;
  }

  get from_date(): DateTimeZone {
    return this._from_date;
  }

  set from_date(value: DateTimeZone) {
    this._from_date = value;
  }

  get to_date(): DateTimeZone {
    return this._to_date;
  }

  set to_date(value: DateTimeZone) {
    this._to_date = value;
  }
}
