import Vehicle from '../entity/Vehicle';
import adaptSupplier from '../../Supplier/adapter/adaptSupplier';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptVehicleCertification from './adaptVehicleCertification';
import Supplier from '../../Supplier/entity/Supplier';
import UUID from '../../UUID/UUID';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import { baseAdapter } from '../../common/adapters/baseAdapter';
import adaptInternalNote from '../../InternalNote/adapter/adaptInternalNote';

export default function adaptVehicle(json: any, instance: Vehicle = new Vehicle()): Vehicle {
  baseAdapter(json.id, instance);

  instance.make = json.vehicle_make;

  if (json.supplier) {
    instance.supplier = adaptSupplier(json.supplier);
  } else {
    instance.supplier = new Supplier();
    instance.supplier.id = json.supplier_id;
    instance.supplier.uuid = UUID.fromString(json.supplier_id);
  }

  instance.reg_number = json.registration_nr;
  instance.dateFirstRegistration = adaptDateTimeZone(json.date_first_registration);
  instance.vehicle_type = json.vehicle_type;
  instance.vehicle_certifications = json.vehicle_certifications.map((eachVehicleCertification) =>
    adaptVehicleCertification(eachVehicleCertification)
  );
  instance.capacity = json.capacity;
  instance.description = json.description;
  instance.internalNotes = (json.internal_notes ?? []).map((each) => adaptInternalNote(each));
  adaptMarketTrait(json, instance);
  return instance;
}
