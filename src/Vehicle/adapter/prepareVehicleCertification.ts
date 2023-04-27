import VehicleCertification from '../entity/VehicleCertification';

export default function prepareVehicleCertification(certification: VehicleCertification): object {
  return [certification.type, certification.value];
}
