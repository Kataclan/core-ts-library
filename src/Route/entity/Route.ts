import BaseEntity from '../../common/entities/BaseEntity';
import ValidableInterface from '../../common/interfaces/ValidableInterface';
import RouteStop from '../../RouteStop/entity/RouteStop';
import TravelStopPricing from '../../TravelStopPricing/entity/TravelStopPricing';
import TravelStop from '../../TravelStop/entity/TravelStop';
import clone from '../../common/utils/clone';
import Currency from '../../Currency/entity/Currency';
import Money from '../../Money/entity/Money';
import DataLabelsList from '../../Tag/entity/DataLabelsList';
import TravelStopType from '../../TravelStop/enums/TravelStopType';

export default class Route extends BaseEntity implements ValidableInterface {
  protected _route_group_id: string;
  protected _name: string;
  private _locations: Array<RouteStop> = [];
  private _number_of_journeys: number;
  private _data_labels: DataLabelsList = new DataLabelsList();
  private _tag_ids: Array<string> = [];
  private _addressable_market: number;

  stopsWaitingTime: number;
  isLoop: boolean;

  get route_group_id(): string {
    return this._route_group_id;
  }

  set route_group_id(value: string) {
    this._route_group_id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get stops(): Array<RouteStop> {
    return this._locations;
  }

  set stops(value: Array<RouteStop>) {
    this._locations = value.map((e, i) => {
      e.location_order = i;
      return e;
    });
  }

  get number_of_journeys(): number {
    return this._number_of_journeys;
  }

  set number_of_journeys(value: number) {
    this._number_of_journeys = value;
  }

  get data_labels(): DataLabelsList {
    return this._data_labels;
  }

  set data_labels(value: DataLabelsList) {
    this._data_labels = value;
  }

  get tag_ids(): Array<string> {
    return this._tag_ids;
  }

  set tag_ids(value: Array<string>) {
    this._tag_ids = value;
  }

  get addressable_market(): number {
    return this._addressable_market;
  }

  set addressable_market(value: number) {
    this._addressable_market = value;
  }

  addRouteStop(item: RouteStop) {
    this.stops.push(item);
  }

  removeStop(index) {
    this.stops.splice(index, 1);
  }

  // Finds existing travelPricing inside pricing list.
  findTravelStopPricing(pickup: TravelStop, dropoff: TravelStop): TravelStopPricing {
    let pricing = null;

    pickup.pricings.map((eachPricing: TravelStopPricing) => {
      if (!pricing && eachPricing.destination_stop && eachPricing.destination_stop.id === dropoff.id) {
        pricing = eachPricing;
      }

      if (!pricing && eachPricing.destination_stop_id && eachPricing.destination_stop_id === dropoff.id) {
        pricing = eachPricing;
      }
    });

    return pricing;
  }

  // Just in case we want to reset the matrix.
  resetPricingMatrix() {
    this.stops = this.stops.map((eachRouteStop: RouteStop) => {
      eachRouteStop.pricings.length = 0;
      return eachRouteStop;
    });
  }

  preparePricingMatrix(withCurrency: Currency) {
    /*
      for each valid pickup =>
        for each valid dropoff =>
          if combination not exists =>
            add travel stop pricing with:
              travel stop destination = each dropoff
              both prices = null
          else
            do nothing
     */
    this.getValidPickupPoints().forEach((eachPickup: RouteStop) => {
      this.getValidDropoffPoints().forEach((eachDropoff: RouteStop) => {
        if (eachPickup.location_order > eachDropoff.location_order || eachPickup.isEqual(eachDropoff)) {
          return;
        }

        let travelStopPricing = this.findTravelStopPricing(eachPickup, eachDropoff);

        if (!travelStopPricing) {
          travelStopPricing = new TravelStopPricing();
          // TODO: clone the eachDropoff to avoid endless anidation (because of passed down by reference).
          travelStopPricing.destination_stop = clone(eachDropoff);
          travelStopPricing.one_leg_price.currency = withCurrency;
          travelStopPricing.two_legs_price.currency = withCurrency;
          // travelStopPricing.one_leg_price = null;
          // travelStopPricing.two_legs_price = null;

          eachPickup.addPricing(travelStopPricing);
        } else {
          this.prepareLegPrices(travelStopPricing, withCurrency);
        }
      });
    });

    this.optimizePricingMatrix();
  }

  prepareLegPrices(travelStopPricing: TravelStopPricing, withCurrency: Currency) {
    if (!travelStopPricing.one_leg_price) {
      travelStopPricing.one_leg_price = new Money();
    }

    if (!travelStopPricing.one_leg_price.currency || !travelStopPricing.one_leg_price.currency.iso_code) {
      travelStopPricing.one_leg_price.currency = withCurrency;
    }

    if (!travelStopPricing.two_legs_price) {
      travelStopPricing.two_legs_price = new Money();
    }

    if (!travelStopPricing.two_legs_price.currency || !travelStopPricing.two_legs_price.currency.iso_code) {
      travelStopPricing.two_legs_price.currency = withCurrency;
    }
  }

  optimizePricingMatrix() {
    let valid = [];

    this.getValidPickupPoints().forEach((eachPickup: RouteStop) => {
      this.getValidDropoffPoints().forEach((eachDropoff: RouteStop) => {
        if (eachPickup.location_order > eachDropoff.location_order || eachPickup.isEqual(eachDropoff)) {
          return;
        }

        let travelStopPricing = this.findTravelStopPricing(eachPickup, eachDropoff);
        travelStopPricing && valid.push(travelStopPricing);
      });
    });

    /*
      Inside every stop we look for all its pricings.
        Inside every pricing we look for that exact same pricing in the valid list.
     */

    this.stops = this.stops.map((eachRouteStop: RouteStop) => {
      eachRouteStop.pricings = eachRouteStop.pricings.filter((eachPricing: TravelStopPricing) => {
        let index = valid.findIndex((eachValidPricing: TravelStopPricing) => eachValidPricing.id === eachPricing.id);
        return index !== -1;
      });

      return eachRouteStop;
    });
  }

  getValidPickupPoints(): RouteStop[] {
    return this.stops.filter((each: RouteStop) => each.isPickup());
  }

  getValidDropoffPoints(): RouteStop[] {
    return this.stops.filter((each: RouteStop) => each.isDropoff());
  }

  getOnlyDropoffPoints(): RouteStop[] {
    return this.stops.filter((each: RouteStop) => each.type === TravelStopType.TYPE_DROPOFF);
  }

  isValid() {
    return this.invalidFields().length === 0;
  }

  invalidFields() {
    let fields = [];
    !this.name && fields.push('name');

    if (this.stops.length < 2) {
      fields.push('stops');
    }

    if (this.stops.length >= 2) {
      this.stops.map((routeStop, routeStopIndex) => {
        if (!routeStop.isValid()) {
          fields.push(`route_stop[${routeStopIndex}]__name`);
        }

        if (routeStopIndex < this.stops.length - 1) {
          !routeStop.time_to_reach && fields.push(`route_stop[${routeStopIndex}]__time_to_reach`);
          !routeStop.distance && fields.push(`route_stop[${routeStopIndex}]__distance`);
        }
      });
    }

    return fields;
  }

  setWaitingTimeToAllStops(stopWaitingTime: number) {
    this.stops = this.stops.map((eachRouteStop: RouteStop) => {
      eachRouteStop.stop_waiting_time = stopWaitingTime;

      return eachRouteStop;
    });
  }

  getTotalTime(): number {
    return this.stops.reduce((acc, eachRouteStop, index) => {
      acc += +eachRouteStop.time_to_reach || 0;

      if (this.isLoop || index < this.stops.length - 1) {
        acc += +eachRouteStop.stop_waiting_time;
      }

      return acc;
    }, 0);
  }
}
