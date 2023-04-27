import RouteGroup from '../entity/RouteGroup';
import adaptRoute from '../../Route/adapter/adaptRoute';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import UUID from '../../UUID/UUID';

export default function adaptRouteGroup(json: any, instance: RouteGroup = new RouteGroup()): RouteGroup {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.name = json.name;
  instance.number_of_journeys = json.number_of_journeys || 0;
  instance.created = true;
  instance.routeGroupVersion = json.route_group_version;
  instance.previousRouteGroupId = json.previous_route_group_id;
  instance.isLoop = json.is_loop || false;
  instance.isStarred = json.is_starred || false;
  instance.routes = (json.routes || []).map((each) => adaptRoute(each));
  adaptMarketTrait(json, instance);
  instance.occupancy = json.occupancy ?? null;
  instance.waitingListOccupancy = json.waitlist_occupancy ?? null;

  return instance;
}
