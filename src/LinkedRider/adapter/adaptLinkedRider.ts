import LinkedRider from '../entity/LinkedRider';
import UUID from '../../UUID/UUID';

type response = {
  rider_id: string;
  rider_name: string;
  rider_surname: string;
  rider_birthdate: string;
};

export default function adaptLinkedRider(json: response, linkedRider: LinkedRider = new LinkedRider()): LinkedRider {
  linkedRider.created = true;

  linkedRider.uuid = UUID.fromString(json.rider_id);
  linkedRider.id = json.rider_id;
  linkedRider.first_name = json.rider_name;
  linkedRider.last_name = json.rider_surname;
  linkedRider.birthdate = json.rider_birthdate;

  return linkedRider;
}
