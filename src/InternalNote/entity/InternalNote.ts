import moment from 'moment-timezone';

import BaseEntity from '../../common/entities/BaseEntity';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';

export default class InternalNote extends BaseEntity {
  private _text: string;
  private _datetime: DateTimeZone;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get datetime(): DateTimeZone {
    return this._datetime;
  }

  set datetime(value: DateTimeZone) {
    this._datetime = value;
  }

  static getNew(withText: string, withTimezone: string): InternalNote {
    const internalNote = new InternalNote();
    internalNote.text = withText;
    internalNote.datetime = DateTimeZone.getNew(moment().format('YYYY-MM-DD HH:mm:ss'), withTimezone);
    return internalNote;
  }
}
