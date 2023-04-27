import Location from '../entity/Location';
import UUID from '../../UUID/UUID';

export default function adaptLocation(json: any, instance: Location = new Location()): Location {
  instance.id = json.id || json.location_id;
  instance.uuid = UUID.fromString(json.id || json.location_id);
  instance.administrative_authority_full_name = json.full_name;
  instance.name = json.name;
  instance.administrative_authority_id = json.administrative_authority_id || json.city_id;
  instance.administrative_authority_name = json.administrative_authority_name || json.city_name;
  instance.passenger_description = json.customer_description;
  instance.driver_description = json.driver_description;
  instance.latitude = json.latitude;
  instance.longitude = json.longitude;
  instance.address = json.address;
  instance.postal_code = json.postal_code;
  instance.images = [];
  instance.stop_id = json.stop_id;
  instance.stop_name = json.stop_name;
  instance.timezone = json.timezone;

  return instance;
}
