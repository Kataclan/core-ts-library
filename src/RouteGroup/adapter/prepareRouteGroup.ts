import RouteGroup from '../entity/RouteGroup';
import prepareRoute from '../../Route/adapter/prepareRoute';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareRouteGroup(instance: RouteGroup): any {
  return {
    id: instance.id,
    name: instance.name,
    route_group_version: instance.routeGroupVersion,
    is_loop: instance.isLoop || false,
    previous_route_group_id: instance.previousRouteGroupId,
    is_starred: instance.isStarred || false,
    routes: (instance.routes || []).map((each) => prepareRoute(each)),
    ...prepareMarketTrait(instance),
  };
}
