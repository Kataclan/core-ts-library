import BaseEntity from '../../common/entities/BaseEntity';
import Route from '../../Route/entity/Route';
import Market from '../../Market/entity/Market';

type RouteGroupOccupancy = {
  multiCreditOccupancy: number;
  unlimitedOccupancy: number;
};

export default class RouteGroup extends BaseEntity {
  protected _name: string;
  protected _number_of_journeys: number;
  protected _routes: Array<Route> = [];
  market: Market;
  routeGroupVersion: string;
  previousRouteGroupId: string;

  isLoop: boolean;
  isStarred: boolean;
  occupancy: Record<string, RouteGroupOccupancy>;
  waitingListOccupancy: Record<string, RouteGroupOccupancy>;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get number_of_journeys(): number {
    return this._number_of_journeys;
  }

  set number_of_journeys(value: number) {
    this._number_of_journeys = value;
  }

  get routes(): Array<Route> {
    return this._routes;
  }

  set routes(value: Array<Route>) {
    this._routes = value;
  }

  addRoute(item: Route) {
    this.routes.push(item);
  }

  removeRoute(index) {
    this.routes.splice(index, 1);
  }

  isFullReturn() {
    return this.routes.length === 2;
  }

  setWaitingTimeToAllStops(stopWaitingTime: number) {
    this.routes = this.routes.map((eachRoute: Route) => {
      eachRoute.setWaitingTimeToAllStops(stopWaitingTime);
      return eachRoute;
    });
  }
}
