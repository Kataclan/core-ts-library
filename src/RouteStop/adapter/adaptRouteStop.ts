import RouteStop from '../entity/RouteStop';
import adaptTravelStop from '../../TravelStop/adapter/adaptTravelStop';

export default function adaptRouteStop(json: any, instance: RouteStop = new RouteStop()): RouteStop {
  const instanceAdapted = <RouteStop>adaptTravelStop(json, instance);
  instanceAdapted.stop_waiting_time = 'stop_waiting_time' in json ? +json.stop_waiting_time : 0;

  return instanceAdapted;
}
