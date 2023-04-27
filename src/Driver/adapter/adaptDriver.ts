import Driver from '../entity/Driver';
import adaptSupplier from '../../Supplier/adapter/adaptSupplier';
import UUID from '../../UUID/UUID';
import Supplier from '../../Supplier/entity/Supplier';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import adaptDBSCheck from '../../DBSCheck/adapter/adaptDBSCheck';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';
import adaptInternalNote from '../../InternalNote/adapter/adaptInternalNote';
import ComplianceStatus from '../enums/ComplianceStatus';
import { baseAdapter } from '../../common/adapters/baseAdapter';

export default function adaptDriver(json: any, instance: Driver = new Driver()): Driver {
  baseAdapter(json.id, instance);

  instance.first_name = json.first_name;
  instance.last_name = json.last_name;
  instance.email = json.email;
  instance.complianceStatus = json.compliance_status ?? ComplianceStatus.PENDING;

  if (json.supplier) {
    instance.supplier = adaptSupplier(json.supplier);
  } else {
    instance.supplier = new Supplier();
    instance.supplier.id = json.supplier_id;
    instance.supplier.uuid = UUID.fromString(json.supplier_id);
  }

  if (json.default_phone_number) {
    instance.defaultPhoneNumber = adaptPhoneNumber(json.default_phone_number);
  }
  if (json.personal_phone_number) {
    instance.personalPhoneNumber = adaptPhoneNumber(json.personal_phone_number);
  }

  instance.internalNotes = (json.internal_notes ?? []).map((each) => adaptInternalNote(each));
  adaptMarketTrait(json, instance);

  instance.dbsCheck = adaptDBSCheck(json.dbs_check);

  return instance;
}
