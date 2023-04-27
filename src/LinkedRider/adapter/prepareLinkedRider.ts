import LinkedRider from '../entity/LinkedRider';

export default function prepareLinkedRider(linkedRider: LinkedRider): any {
  return {
    rider_id: linkedRider.uuid.id,
    rider_name: linkedRider.first_name,
    rider_surname: linkedRider.last_name,
    rider_birthdate: linkedRider.birthdate,
  };
}
