import BaseEntity from '../../common/entities/BaseEntity';
import JourneyVehicle from '../../JourneyVehicle/entity/JourneyVehicle';
import Route from '../../Route/entity/Route';
import JourneyDirection from '../enums/JourneyDirection';
import JourneyStop from '../../JourneyStop/entity/JourneyStop';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import TravelStop from '../../TravelStop/entity/TravelStop';
import TravelStopPricing from '../../TravelStopPricing/entity/TravelStopPricing';
import Money from '../../Money/entity/Money';
import Currency from '../../Currency/entity/Currency';
import DataLabelsList from '../../Tag/entity/DataLabelsList';
import Market from '../../Market/entity/Market';

export default class Journey extends BaseEntity {
  private _name: string = '';
  private _product_name: string;
  private _route: Route;
  private _route_id: string;
  private _type: JourneyDirection = null;
  private _journey_type: JourneyDirection = null;
  private _enabled: boolean = true;
  private _departure_date: DateTimeZone = new DateTimeZone();
  private _arrival_date: DateTimeZone = new DateTimeZone();
  private _seats_on_sale: number = null;
  private _journey_vehicles: Array<JourneyVehicle> = [];
  private _stops: Array<JourneyStop> = [];
  private _product_id: string;
  private _journey_group_id: string;
  private _occupancy_percentage: number;
  private _occupancy_value: number;
  private _profit_and_loss: Money = new Money();
  private _margin_percentage: number;
  private _new_journey: boolean;
  private _tag_ids: Array<string> = [];
  private _data_labels: DataLabelsList = new DataLabelsList();
  private _is_night_shift: boolean = false;
  market: Market;

  // Default value used when creating a journey from a route without stop waiting times.
  private _stop_waiting_time: number = JourneyStop.STOP_WAITING_TIME;

  isShuttle: boolean;
  isScanToBoard: boolean;
  isLoop: boolean;
  isStarred: boolean;
  scheduleJourneyId: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get route(): Route {
    return this._route;
  }

  set route(value: Route) {
    this._route = value;
  }

  get type(): JourneyDirection {
    return this._type;
  }

  set type(value: JourneyDirection) {
    this._type = value;
  }

  get journey_type(): JourneyDirection {
    return this._journey_type;
  }

  set journey_type(value: JourneyDirection) {
    this._journey_type = value;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get departure_date(): DateTimeZone {
    return this._departure_date;
  }

  set departure_date(value: DateTimeZone) {
    this._departure_date = value;
  }

  get arrival_date(): DateTimeZone {
    return this._arrival_date;
  }

  set arrival_date(value: DateTimeZone) {
    this._arrival_date = value;
  }

  get seats_on_sale(): number {
    return this._seats_on_sale;
  }

  set seats_on_sale(value: number) {
    this._seats_on_sale = value;
  }

  get journey_vehicles(): Array<JourneyVehicle> {
    return this._journey_vehicles;
  }

  set journey_vehicles(value: Array<JourneyVehicle>) {
    this._journey_vehicles = value;
  }

  get stops(): Array<JourneyStop> {
    return this._stops;
  }

  set stops(value: Array<JourneyStop>) {
    this._stops = value;
  }

  get route_id(): string {
    return this._route_id;
  }

  set route_id(value: string) {
    this._route_id = value;
  }

  get product_id(): string {
    return this._product_id;
  }

  set product_id(value: string) {
    this._product_id = value;
  }

  get product_name(): string {
    return this._product_name;
  }

  set product_name(value: string) {
    this._product_name = value;
  }

  get journey_group_id(): string {
    return this._journey_group_id;
  }

  set journey_group_id(value: string) {
    this._journey_group_id = value;
  }

  get occupancy_percentage(): number {
    return this._occupancy_percentage;
  }

  set occupancy_percentage(value: number) {
    this._occupancy_percentage = value;
  }

  get occupancy_value(): number {
    return this._occupancy_value;
  }

  set occupancy_value(value: number) {
    this._occupancy_value = value;
  }

  get profit_and_loss(): Money {
    return this._profit_and_loss;
  }

  set profit_and_loss(value: Money) {
    this._profit_and_loss = value;
  }

  get margin_percentage(): number {
    return this._margin_percentage;
  }

  set margin_percentage(value: number) {
    this._margin_percentage = value;
  }

  get new_journey(): boolean {
    return this._new_journey;
  }

  set new_journey(value: boolean) {
    this._new_journey = value;
  }

  get tag_ids(): Array<string> {
    return this._tag_ids;
  }

  set tag_ids(value: Array<string>) {
    this._tag_ids = value;
  }

  get data_labels(): DataLabelsList {
    return this._data_labels;
  }

  set data_labels(value: DataLabelsList) {
    this._data_labels = value;
  }

  get stop_waiting_time(): number {
    return this._stop_waiting_time;
  }

  set stop_waiting_time(value: number) {
    this._stop_waiting_time = value;
  }

  get is_night_shift(): boolean {
    return this._is_night_shift;
  }

  set is_night_shift(value: boolean) {
    this._is_night_shift = value;
  }

  // Custom methods :: Journey Vehicles ============================================================
  setJourneyVehicle(index, item: JourneyVehicle) {
    this.journey_vehicles[index] = item;
  }

  removeJourneyVehicle(index) {
    this.journey_vehicles.splice(index, 1);
  }

  addJourneyVehicle(item: JourneyVehicle) {
    this.journey_vehicles.push(item);
  }

  // Custom methods :: Journey Stops ===============================================================
  setJourneyStop(index, item: JourneyStop) {
    this.stops[index] = item;
  }

  removeJourneyStop(index) {
    this.stops.splice(index, 1);
  }

  addJourneyStop(item: JourneyStop) {
    this.stops.push(item);
  }

  findTravelStopPricing(pickup: TravelStop, dropoff: TravelStop): TravelStopPricing {
    let pricing = null;
    pickup.pricings.map((eachPricing: TravelStopPricing) => {
      if (!pricing && eachPricing.destination_stop_id && eachPricing.destination_stop_id === dropoff.id) {
        pricing = eachPricing;
      }
    });

    return pricing;
  }

  // Just in case we want to reset the matrix.
  resetPricingMatrix() {
    this.stops = this.stops.map((eachJourneyStop: JourneyStop) => {
      eachJourneyStop.pricings.length = 0;
      return eachJourneyStop;
    });
  }

  preparePricingMatrix(withCurrency: Currency, oneLegPrice: number, twoLegsPrice: number, forcePrice: boolean = false) {
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
    this.getValidPickupPoints().forEach((eachPickup: JourneyStop) => {
      this.getValidDropoffPoints().forEach((eachDropoff: JourneyStop) => {
        if (eachPickup.location_order > eachDropoff.location_order || eachPickup.isEqual(eachDropoff)) {
          return;
        }

        let travelStopPricing = this.findTravelStopPricing(eachPickup, eachDropoff);

        if (!travelStopPricing) {
          travelStopPricing = new TravelStopPricing();

          travelStopPricing.one_leg_price.amount = oneLegPrice;
          travelStopPricing.one_leg_price.currency = withCurrency;

          travelStopPricing.two_legs_price.amount = twoLegsPrice;
          travelStopPricing.two_legs_price.currency = withCurrency;

          travelStopPricing.destination_stop_id = eachDropoff.id;

          eachPickup.addPricing(travelStopPricing);
        } else {
          this.prepareLegPrices(
            travelStopPricing,
            withCurrency,
            forcePrice
              ? oneLegPrice
              : travelStopPricing.one_leg_price
              ? travelStopPricing.one_leg_price.amount
              : oneLegPrice,
            forcePrice
              ? twoLegsPrice
              : travelStopPricing.two_legs_price
              ? travelStopPricing.two_legs_price.amount
              : twoLegsPrice
          );
        }
      });
    });

    this.optimizePricingMatrix();
  }

  prepareLegPrices(
    travelStopPricing: TravelStopPricing,
    withCurrency: Currency,
    oneLegPrice: number,
    twoLegsPrice: number
  ) {
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

    travelStopPricing.one_leg_price.amount = oneLegPrice;
    travelStopPricing.two_legs_price.amount = twoLegsPrice;
  }

  optimizePricingMatrix() {
    let valid = [];

    this.getValidPickupPoints().forEach((eachPickup: JourneyStop) => {
      this.getValidDropoffPoints().forEach((eachDropoff: JourneyStop) => {
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

    this.stops = this.stops.map((eachJourneyStop: JourneyStop) => {
      eachJourneyStop.pricings = eachJourneyStop.pricings.filter((eachPricing: TravelStopPricing) => {
        let index = valid.findIndex((eachValidPricing: TravelStopPricing) => eachValidPricing.id === eachPricing.id);
        return index !== -1;
      });

      return eachJourneyStop;
    });
  }

  getValidPickupPoints() {
    return this.stops.filter((each: JourneyStop) => each.isPickup());
  }

  getValidDropoffPoints() {
    return this.stops.filter((each: JourneyStop) => each.isDropoff());
  }

  getJourneyVehiclesTotalSeatsAvailable(): number {
    const journey_vehicle_seats = this.journey_vehicles.reduce((total, each: JourneyVehicle) => {
      return total + each.seats_on_sale;
    }, 0);

    const journey_seats = this.seats_on_sale;

    return this.hasVehicles() ? journey_vehicle_seats : journey_seats;
  }

  getNumberOfVehicles() {
    return this.journey_vehicles.length;
  }

  hasVehicles() {
    return this.getNumberOfVehicles() > 0;
  }

  hasJourneyStops() {
    return this.stops.length > 0;
  }

  isOutbound(): boolean {
    return this.type === JourneyDirection.OUTBOUND;
  }

  isReturn(): boolean {
    return this.type === JourneyDirection.RETURN;
  }

  everyVehicleIsOk() {
    /*
      Supplier assigned
      Job sheet sent
      Registration number field not empty
      Vehicle type field not empty
      Driver name field not empty
      Driver contact number field not empty
      Coach price field not empty
    */
    return this.journey_vehicles.every(
      (eachJourneyVehicle: JourneyVehicle) => !eachJourneyVehicle.reviewIsRequired({ checkSupplierCost: true })
    );
  }

  reviewIsRequired() {
    return !this.hasVehicles() || !this.everyVehicleIsOk();
  }

  reasonsToReview() {
    const fields = [];
    !this.hasVehicles() && fields.push('no_vehicles');
    this.journey_vehicles.map((eachJourneyVehicle: JourneyVehicle) => {
      fields.push(...eachJourneyVehicle.reasonsToReview({ checkSupplierCost: true }));
    });
    return fields;
  }

  isNightShift(): boolean {
    return this.is_night_shift;
  }

  isCompleted(): boolean {
    if (this.journey_vehicles.length === 0) {
      return false;
    }

    return this.journey_vehicles.every((each) => each.is_completed);
  }

  hasJourneyStopId(journeyStopId: string) {
    return this.stops.map((eachJourneyStop: JourneyStop) => eachJourneyStop.uuid.id).includes(journeyStopId);
  }
}
