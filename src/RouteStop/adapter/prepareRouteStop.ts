import RouteStop from '../entity/RouteStop';
import prepareTravelStop from '../../TravelStop/adapter/prepareTravelStop';

export default function prepareRouteStop(instance: RouteStop): any {
  return prepareTravelStop(instance);
}
