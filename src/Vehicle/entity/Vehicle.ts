import BaseEntity from '../../common/entities/BaseEntity';
import Supplier from '../../Supplier/entity/Supplier';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import VehicleType from '../enums/VehicleType';
import VehicleCertification from './VehicleCertification';
import Market from '../../Market/entity/Market';
import InternalNote from '../../InternalNote/entity/InternalNote';

export default class Vehicle extends BaseEntity {
  make: string;
  supplier: Supplier;
  reg_number: string;
  dateFirstRegistration: DateTimeZone = new DateTimeZone();
  vehicle_type: VehicleType;
  vehicle_certifications: Array<VehicleCertification> = [];
  capacity: number;
  description: string;
  market: Market;
  internalNotes: Array<InternalNote> = [];

  addInternalNote(withText: string, withTimezone: string) {
    this.internalNotes.push(InternalNote.getNew(withText, withTimezone));
  }
}
