import Driver from '../entity/Driver';
import prepareInternalNotes from '../../InternalNote/adapter/prepareInternalNotes';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';
import prepareDBSCheck from '../../DBSCheck/adapter/prepareDBSCheck';
import { preparePhoneNumberWithoutPhonePrefix } from '../../PhoneNumber/adapter/preparePhoneNumber';

export default function prepareDriver(instance: Driver): any {
  return {
    id: instance.uuid.id,
    first_name: instance.first_name,
    last_name: instance.last_name,
    email: instance.email,
    supplier_id: instance.supplier.uuid.id,
    ...prepareInternalNotes(instance),
    ...prepareMarketTrait(instance),
    dbs_check: prepareDBSCheck(instance.dbsCheck),
    default_phone_number: preparePhoneNumberWithoutPhonePrefix(instance.defaultPhoneNumber),
    personal_phone_number: preparePhoneNumberWithoutPhonePrefix(instance.personalPhoneNumber),
    compliance_status: instance.complianceStatus,
  };
}
