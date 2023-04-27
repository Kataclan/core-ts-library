import TravelStop from '../../TravelStop/entity/TravelStop';
import Stop from '../../Stop/entity/Stop';
import TravelStopType from '../../TravelStop/enums/TravelStopType';

export default class RouteStop extends TravelStop {
  static STOP_WAITING_TIME: number = 0;

  protected _stop_waiting_time: number = RouteStop.STOP_WAITING_TIME;

  static createFromStop(stop: Stop): RouteStop {
    const routeStop = new RouteStop();

    routeStop.name = stop.name;
    routeStop.type = TravelStopType.TYPE_PICKUP;
    routeStop.location = stop.locations[0];

    return routeStop;
  }

  isRouteStop(): boolean {
    return true;
  }
}
