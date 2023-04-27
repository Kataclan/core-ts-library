import Tier from '../entity/Tier';
import prepareTravelPassStop from '../../TravelPassStop/adapter/prepareTravelPassStop';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';

export default function prepareTier(instance: Tier): any {
  return {
    id: instance.id,
    travel_pass_id: instance.travel_pass_id,
    title: instance.title,
    description: instance.description,
    image_id: instance.image ? instance.image.id : void 0,
    travel_pass_stops: instance.travel_pass_stops.map((each) => prepareTravelPassStop(each)),
    from_date: instance.start_date ? prepareDateTimeZone(instance.start_date) : null,
    to_date: instance.end_date ? prepareDateTimeZone(instance.end_date) : null,
    allow_show: instance.show,
    unlimited_rides: instance.unlimited_rides,
    number_one_way_rides: instance.unlimited_rides ? null : +instance.one_way_rides,
    is_one_way: instance.isOneWay,
    ...prepareMarketTrait(instance),
  };
}
