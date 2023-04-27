import Route from '../entity/Route';
import RouteStop from '../../RouteStop/entity/RouteStop';
import TravelStopPricing from '../../TravelStopPricing/entity/TravelStopPricing';
import adaptRouteStop from '../../RouteStop/adapter/adaptRouteStop';
import UUID from '../../UUID/UUID';

export default function adaptRoute(json: any, instance: Route = new Route()): Route {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.route_group_id = json.route_group_id;
  instance.name = json.name;
  instance.stops = (json.route_stops || json.stops || []).map((each) => adaptRouteStop(each));
  instance.number_of_journeys = json.number_of_journeys || 0;
  instance.tag_ids = json.tags || [];
  instance.addressable_market = json.addressable_market;
  instance.created = true;
  instance.stopsWaitingTime = json.default_stop_waiting_time || 0;
  instance.isLoop = json.is_loop || false;

  // TODO: adapt travel stop pricing to entity.
  instance.stops = instance.stops.map((eachRouteStop: RouteStop) => {
    eachRouteStop.pricings = eachRouteStop.pricings.map((eachPricing: TravelStopPricing) => {
      eachPricing.destination_stop = instance.stops.find(
        (each) => each.location.id === eachPricing.destination_stop_id
      );
      return eachPricing;
    });

    return eachRouteStop;
  });

  return instance;
}
