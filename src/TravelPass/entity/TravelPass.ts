import Tier from '../../Tier/entity/Tier';
import Product from '../../Product/entity/Product';
import TravelPassEnding from '../enums/TravelPassEnding';
import TravelPassEndingWhatType from '../enums/TravelPassEndingWhatType';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import Concession from '../../Concession/entity/Concession';
import TravelPassStop from '../../TravelPassStop/entity/TravelPassStop';
import PageType from '../../Page/enums/PageType';
import clone from '../../common/utils/clone';
import PassengerType from '../../PassengerType/entity/PassengerType';

export default class TravelPass extends Product {
  private _allow_one_way_opt_in: boolean = false;
  private _auto_journey_opt_in: boolean = false;
  private _allow_repurchase: boolean = false;
  private _allow_edit: boolean = false;
  private _allow_guests: boolean = false;
  private _allow_auto_top_up: boolean = false;
  private _max_guests: number;
  private _start_date: DateTimeZone = new DateTimeZone();
  private _when_ends: TravelPassEnding = TravelPassEnding.INFINITE;
  private _end_date: DateTimeZone = new DateTimeZone();
  private _end_after_amount: number;
  private _end_after_what: TravelPassEndingWhatType;
  private _tiers: Array<Tier> = [];
  private _concessions: Array<Concession> = [];
  private _travel_pass_stops: Array<TravelPassStop> = [];
  private _products: Array<Product> = [];
  private _product_ids: Array<string> = [];
  private _number_of_products: number;
  private _show_departure_time: boolean = false;
  private _create_its_own_page: boolean = false;
  private _removed_tiers: Array<Tier> = [];

  scan_to_board = false;

  constructor() {
    super();
    this.page_type = PageType.TRAVEL_PASS;
  }

  get allow_one_way_opt_in(): boolean {
    return this._allow_one_way_opt_in;
  }

  set allow_one_way_opt_in(value: boolean) {
    this._allow_one_way_opt_in = value;
  }

  get auto_journey_opt_in(): boolean {
    return this._auto_journey_opt_in;
  }

  set auto_journey_opt_in(value: boolean) {
    this._auto_journey_opt_in = value;
  }

  get allow_repurchase(): boolean {
    return this._allow_repurchase;
  }

  set allow_repurchase(value: boolean) {
    this._allow_repurchase = value;
  }

  get allow_edit(): boolean {
    return this._allow_edit;
  }

  set allow_edit(value: boolean) {
    this._allow_edit = value;
  }

  get allow_guests(): boolean {
    return this._allow_guests;
  }

  set allow_guests(value: boolean) {
    this._allow_guests = value;
  }

  get allow_auto_top_up(): boolean {
    return this._allow_auto_top_up;
  }

  set allow_auto_top_up(value: boolean) {
    this._allow_auto_top_up = value;
  }

  get max_guests(): number {
    return this._max_guests;
  }

  set max_guests(value: number) {
    this._max_guests = value;
  }

  get start_date(): DateTimeZone {
    return this._start_date;
  }

  set start_date(value: DateTimeZone) {
    this._start_date = value;
  }

  get when_ends(): TravelPassEnding {
    return this._when_ends;
  }

  set when_ends(value: TravelPassEnding) {
    this._when_ends = value;
  }

  get end_date(): DateTimeZone {
    return this._end_date;
  }

  set end_date(value: DateTimeZone) {
    this._end_date = value;
  }

  get end_after_amount(): number {
    return this._end_after_amount;
  }

  set end_after_amount(value: number) {
    this._end_after_amount = value;
  }

  get end_after_what(): TravelPassEndingWhatType {
    return this._end_after_what;
  }

  set end_after_what(value: TravelPassEndingWhatType) {
    this._end_after_what = value;
  }

  get tiers(): Array<Tier> {
    return this._tiers;
  }

  set tiers(value: Array<Tier>) {
    this._tiers = value;
  }

  get concessions(): Array<Concession> {
    return this._concessions;
  }

  set concessions(value: Array<Concession>) {
    this._concessions = value;
  }

  get products(): Array<Product> {
    return this._products;
  }

  set products(value: Array<Product>) {
    this._products = value;
  }

  get product_ids(): Array<string> {
    return this._product_ids;
  }

  set product_ids(value: Array<string>) {
    this._product_ids = value;
  }

  get number_of_products(): number {
    return this._number_of_products;
  }

  set number_of_products(value: number) {
    this._number_of_products = value;
  }

  get show_departure_time(): boolean {
    return this._show_departure_time;
  }

  set show_departure_time(value: boolean) {
    this._show_departure_time = value;
  }

  get create_its_own_page(): boolean {
    return this._create_its_own_page;
  }

  set create_its_own_page(value: boolean) {
    this._create_its_own_page = value;
  }

  get travel_pass_stops(): Array<TravelPassStop> {
    return this._travel_pass_stops;
  }

  set travel_pass_stops(value: Array<TravelPassStop>) {
    this._travel_pass_stops = value;
  }

  get removed_tiers(): Array<Tier> {
    return this._removed_tiers;
  }

  set removed_tiers(value: Array<Tier>) {
    this._removed_tiers = value;
  }

  isUnlimited(): boolean {
    return this.tiers.every((tier) => tier.hasUnlimitedRides());
  }

  neverEnds(): boolean {
    return this._when_ends === TravelPassEnding.INFINITE;
  }

  endsAfter(): boolean {
    return this._when_ends === TravelPassEnding.AFTER;
  }

  endsOnSpecificDate(): boolean {
    return this._when_ends === TravelPassEnding.ON_SPECIFIC_DATE;
  }

  addTier(item: Tier = new Tier()) {
    item.market = this.market;
    this._tiers.push(item);
  }

  removeTier(tier: Tier) {
    const index = this._tiers.findIndex((each) => each.uuid.id === tier.uuid.id);

    // Splice returns an array with the subset of elements.
    const [tierToRemove] = this._tiers.splice(index, 1);

    if (tierToRemove.created) {
      this._removed_tiers.push(tierToRemove);
    }
  }

  setTier(tier: Tier) {
    const index = this._tiers.findIndex((eachTier: Tier) => eachTier.id === tier.id);
    this.tiers[index] = tier;
  }

  hasTiers(): boolean {
    return this.tiers.length > 0 ?? false;
  }

  hasTravelPassSamePriceForAllStops(): boolean {
    return this.tiers.every((eachTier) => eachTier.hasSamePriceForAllStops()) ?? true;
  }

  hasTravelPassDifferentPricePerStop(): boolean {
    return !this.hasTravelPassSamePriceForAllStops();
  }

  areSomeTiersOnSale(): boolean {
    return this.tiers.some((tier) => tier.show);
  }

  addConcession(item: Concession) {
    this._concessions.push(item);
  }

  removeConcession(index: number) {
    this._concessions.splice(index, 1);
  }

  addProduct(item: Product) {
    this._products.push(item);
    this._product_ids.push(item.id);
  }

  removeProduct(index: number) {
    this._products.splice(index, 1);
    this._product_ids.splice(index, 1);
  }

  isAutoJourneyOptIn(): boolean {
    return this._auto_journey_opt_in;
  }

  hasAssociatedProducts(): boolean {
    return this.product_ids.length > 0;
  }

  upgradeTierStops(travelPassStops: Array<TravelPassStop>) {
    this.tiers = clone(this).tiers.map((eachTier) => {
      eachTier.travel_pass_stops = [...travelPassStops].map((eachTravelPassStop) => {
        eachTravelPassStop.pricings = eachTravelPassStop.pricings.map((eachTravelPassStopPricing) => {
          // @ts-ignore
          const existingPricing = eachTier.findTravelStopPricing(eachTravelPassStop, {
            id: eachTravelPassStopPricing.destination_stop_id,
          });

          if (existingPricing) {
            eachTravelPassStopPricing.leg_price = existingPricing.leg_price;
          } else {
            if (eachTier.hasSamePriceForAllStops()) {
              eachTravelPassStopPricing.leg_price = eachTier.getPrice();
            } else {
              eachTravelPassStopPricing.leg_price = null;
            }
          }

          return clone(eachTravelPassStopPricing);
        });

        return eachTravelPassStop;
      });

      return clone(eachTier);
    });
  }

  getRecurringProductAssociated(): object {
    return this.products.find((product) => product.page_type === PageType.RECURRING_PRODUCT);
  }

  getAllPassengerTypes(): PassengerType[] {
    return Object.values(
      this.concessions.reduce((acc, eachConcession: Concession) => {
        acc[eachConcession.passenger_type.uuid.id] = eachConcession.passenger_type;
        return acc;
      }, {})
    );
  }

  hasPassengerType(passengerTypeId: string): boolean {
    return this.getAllPassengerTypes()
      .map((eachPassengerType: PassengerType) => {
        return eachPassengerType.uuid.id;
      })
      .includes(passengerTypeId);
  }
}
