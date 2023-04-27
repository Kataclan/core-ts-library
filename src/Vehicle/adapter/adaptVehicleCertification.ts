import VehicleCertification from '../entity/VehicleCertification';

export default function adaptVehicleCertification(
  json: any,
  instance: VehicleCertification = new VehicleCertification()
): VehicleCertification {
  instance.type = json[0];
  instance.value = json[1];
  return instance;
}
