import moment from 'moment-timezone';

import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import DBSValidCertificateType from '../enum/DBSValidCertificateType';
import DBSCheck from './DBSCheck';

export default class DBSCheckUK extends DBSCheck {
  issuedDate: DateTimeZone;
  expiryDate: DateTimeZone;
  certificateType: DBSValidCertificateType;
  certificateNumber: any;
  safeguardCertificateDate: DateTimeZone;

  expiryTimeValue = 3;
  expiryTimeUnits = 'years';

  calculateExpiryDate(): void {
    const fromIssuedDate = this.issuedDate.momentify();

    fromIssuedDate.add(this.expiryTimeValue, this.expiryTimeUnits);

    this.expiryDate = DateTimeZone.getNewFromMoment(fromIssuedDate);
  }

  hasExpired(): boolean {
    return this.expiryDate?.happensBefore(DateTimeZone.getNewFromMoment(moment.tz())) ?? false;
  }

  isAboutToExpire(daysHorizon: number): boolean {
    if (!this.expiryDate) {
      return false;
    }

    const dbsCheckExpiryDate = this.expiryDate.momentify();

    return dbsCheckExpiryDate.diff(moment.tz(), 'days', true) < daysHorizon;
  }

  isValid(): boolean {
    if (!this.isComplete()) {
      return false;
    }

    if (this.hasExpired()) {
      return false;
    }

    if (this.certificateType !== DBSValidCertificateType.ENHANCED) {
      return false;
    }

    return true;
  }

  // Returns true if all the important pieces have value.
  isComplete(): boolean {
    return !!this.issuedDate && !!this.expiryDate && !!this.certificateType && !!this.certificateNumber;
  }

  // Returns true if all the values are wiped (so we can replace this object with null).
  isEmpty(): boolean {
    return (
      !this.issuedDate &&
      !this.expiryDate &&
      !this.certificateType &&
      !this.certificateNumber &&
      !this.safeguardCertificateDate
    );
  }
}
