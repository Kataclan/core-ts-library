import TravelStop from '../entity/TravelStop';
import prepareTravelStopType from './prepareTravelStopType';
import TravelStopPricing from '../../TravelStopPricing/entity/TravelStopPricing';
import prepareTravelStopPricing from '../../TravelStopPricing/adapter/prepareTravelStopPricing';

export default function prepareTravelStop(instance: TravelStop): any {
  return {
    id: instance.id,
    ...prepareTravelStopType(instance.type),
    location_id: instance.location.id,
    prices: instance.pricings.map((eachPricing: TravelStopPricing) => prepareTravelStopPricing(eachPricing)),
    minutes_distance: +instance.time_to_reach || 0,
    meters_distance: +instance.distance || 0,
    stop_waiting_time: +instance.stop_waiting_time || 0,
  };
}
