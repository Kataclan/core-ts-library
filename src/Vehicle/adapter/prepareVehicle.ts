import Vehicle from '../entity/Vehicle';
import prepareVehicleCertification from './prepareVehicleCertification';
import prepareInternalNotes from '../../InternalNote/adapter/prepareInternalNotes';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareVehicle(instance: Vehicle): any {
  return {
    id: instance.id,
    vehicle_make: instance.make,
    supplier_id: instance.supplier.id,
    registration_nr: instance.reg_number,
    date_first_registration: prepareDateTimeZone(instance.dateFirstRegistration),
    vehicle_type: instance.vehicle_type,
    vehicle_certifications: instance.vehicle_certifications.map((eachVehicleCertification) =>
      prepareVehicleCertification(eachVehicleCertification)
    ),
    capacity: instance.capacity,
    description: instance.description,
    ...prepareInternalNotes(instance),
    ...prepareMarketTrait(instance),
  };
}
