import Location from '../entity/Location';

export default function prepareLocation(instance: Location): object {
  return {
    id: instance.id,
    administrative_authority_id: instance.administrative_authority_id,
    name: instance.name,
    administrative_authority_name: instance.administrative_authority_name,
    latitude: instance.latitude.toString(),
    longitude: instance.longitude.toString(),
    address: instance.address,
    postal_code: instance.postal_code,
    customer_description: instance.passenger_description,
    driver_description: instance.driver_description,
    images: instance.images
  };
}
