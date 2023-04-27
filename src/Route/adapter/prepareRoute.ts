import Route from '../entity/Route';
import prepareRouteStop from '../../RouteStop/adapter/prepareRouteStop';

export default function prepareRoute(instance: Route): object {
  return {
    id: instance.id,
    name: instance.name,
    stops: instance.stops.map((each) => prepareRouteStop(each)),
    tags: instance.data_labels.getAll().map((each) => each.id),
    addressable_market: instance.addressable_market,
    default_stop_waiting_time: instance.stopsWaitingTime || 0,
    is_loop: instance.isLoop || false,
  };
}
