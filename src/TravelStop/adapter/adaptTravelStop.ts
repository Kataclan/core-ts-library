import TravelStop from '../entity/TravelStop';
import UUID from '../../UUID/UUID';
import adaptTravelStopType from './adaptTravelStopType';
import TravelStopPricing from '../../TravelStopPricing/entity/TravelStopPricing';
import adaptLocation from '../../Location/adapters/adaptLocation';
import adaptTravelStopPricing from '../../TravelStopPricing/adapter/adaptTravelStopPricing';

export default function adaptTravelStop(json: any, instance: TravelStop): TravelStop {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.name = json.name;
  instance.location = adaptLocation(json.location);
  instance.location_order = json.stop_order;
  instance.distance = +json.meters_distance;
  instance.time_to_reach = +json.minutes_distance;
  instance.stop_waiting_time = +json.stop_waiting_time;
  instance.type = adaptTravelStopType(json);
  instance.pricings = (json.prices || []).map((each) => adaptTravelStopPricing(each, new TravelStopPricing()));

  return instance;
}
