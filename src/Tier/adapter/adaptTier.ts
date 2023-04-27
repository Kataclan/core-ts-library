import Tier from '../entity/Tier';
import adaptImage from '../../Image/adapter/adaptImage';
import adaptTravelPassStop from '../../TravelPassStop/adapter/adaptTravelPassStop';
import UUID from '../../UUID/UUID';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';

export default function adaptTier(json: any, instance: Tier = new Tier()): Tier {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.travel_pass_id = json.travel_pass_id;
  instance.title = json.title;
  instance.description = json.description;
  instance.image = json.image && !Array.isArray(json.image) ? adaptImage(json.image) : null;
  instance.travel_pass_stops = (json.travel_pass_stops || []).map((each) => adaptTravelPassStop(each));
  instance.one_way_rides = +json.number_one_way_rides;
  instance.show = json.allow_show;
  instance.created = true;
  instance.start_date = json.from_date ? adaptDateTimeZone(json.from_date) : null;
  instance.end_date = json.to_date ? adaptDateTimeZone(json.to_date) : null;
  instance.unlimited_rides = json.unlimited_rides;
  instance.created = true;
  instance.isOneWay = json.is_one_way;

  return instance;
}
