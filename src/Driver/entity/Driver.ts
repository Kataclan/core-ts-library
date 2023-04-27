import BaseEntity from '../../common/entities/BaseEntity';
import Supplier from '../../Supplier/entity/Supplier';
import Market from '../../Market/entity/Market';
import DBSCheckUK from '../../DBSCheck/entity/DBSCheckUK';
import JourneyVehicle from '../../JourneyVehicle/entity/JourneyVehicle';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import InternalNote from '../../InternalNote/entity/InternalNote';
import ComplianceStatus from '../enums/ComplianceStatus';

export default class Driver extends BaseEntity {
  first_name: string;
  last_name: string;
  email: string;
  supplier: Supplier;
  dbsCheck: DBSCheckUK;
  market: Market;
  defaultPhoneNumber: PhoneNumber;
  personalPhoneNumber: PhoneNumber;
  internalNotes: Array<InternalNote> = [];
  complianceStatus: ComplianceStatus = ComplianceStatus.PENDING;

  getFullName() {
    const fields = [];
    this.first_name && fields.push(this.first_name);
    this.last_name && fields.push(this.last_name);

    return fields.join(' ');
  }

  activateDBSCheck() {
    if (this.market.isUK()) {
      this.dbsCheck = new DBSCheckUK();
    }
  }

  deactivateDBSCheck() {
    this.dbsCheck = null;
  }

  canBeAllocated(journeyVehicle: JourneyVehicle): boolean {
    if (!journeyVehicle.hasDBSCheckEnabled()) {
      return true;
    }

    if (this.market.isUK()) {
      if (!this.dbsCheck) {
        return false;
      }

      if (!this.dbsCheck.isValid()) {
        return false;
      }

      if (this.dbsCheck.expiryDate.happensBefore(journeyVehicle.departure_date)) {
        return false;
      }
    }

    return true;
  }

  addInternalNote(withText: string, withTimezone: string) {
    this.internalNotes.push(InternalNote.getNew(withText, withTimezone));
  }
}
