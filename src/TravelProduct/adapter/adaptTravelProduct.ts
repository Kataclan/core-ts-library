import TravelProduct from '../entity/TravelProduct';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptConcession from '../../Concession/adapter/adaptConcession';
import adaptProduct from '../../Product/adapter/adaptProduct';

export default function adaptTravelProduct(json: any, instance: TravelProduct): TravelProduct {
  const instanceAdapted = adaptProduct(json, instance) as TravelProduct;
  instanceAdapted.seats_on_sale = json.outbound_seats_for_sale;
  instanceAdapted.completed = json.complete;
  instanceAdapted.first_journey_departure_date = adaptDateTimeZone(json.first_journey_departure_date);
  instanceAdapted.last_journey_departure_date = adaptDateTimeZone(json.last_journey_departure_date);
  instanceAdapted.next_journey_departure_date = adaptDateTimeZone(json.next_journey_departure_date);
  instanceAdapted.concessions = (json.concessions || []).map((each) => adaptConcession(each));
  instanceAdapted.programCode = json.program_code;

  if (json.dbs_check) {
    instanceAdapted.dbsCheck = {
      valid_certificate_types: json.dbs_check.valid_certificate_types,
    };
  }

  return instanceAdapted;
}
