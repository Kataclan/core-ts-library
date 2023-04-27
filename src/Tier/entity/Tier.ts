import Image from '../../Image/entity/Image';
import BaseEntity from '../../common/entities/BaseEntity';
import TravelPassStop from '../../TravelPassStop/entity/TravelPassStop';
import TravelPassStopPricing from '../../TravelPassStopPricing/entity/TravelPassStopPricing';
import clone from '../../common/utils/clone';
import Currency from '../../Currency/entity/Currency';
import Money from '../../Money/entity/Money';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import Market from '../../Market/entity/Market';
import { removeDuplicated } from '../../common/utils/arrays';

export default class Tier extends BaseEntity {
  private _travel_pass_id: string;
  private _title: string;
  private _description: string;
  private _image: Image = null;
  private _one_way_rides: number;
  private _unlimited_rides: boolean = false;
  private _show: boolean = true;
  private _travel_pass_stops: Array<TravelPassStop> = [];
  private _start_date: DateTimeZone = null;
  private _end_date: DateTimeZone = null;
  market: Market;

  isOneWay = false;

  get travel_pass_id(): string {
    return this._travel_pass_id;
  }

  set travel_pass_id(value: string) {
    this._travel_pass_id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get image(): Image {
    return this._image;
  }

  set image(value: Image) {
    this._image = value;
  }

  get one_way_rides(): number {
    return this._one_way_rides;
  }

  set one_way_rides(value: number) {
    this._one_way_rides = value;
  }

  get unlimited_rides(): boolean {
    return this._unlimited_rides;
  }

  set unlimited_rides(value: boolean) {
    this._unlimited_rides = value;
  }

  get show(): boolean {
    return this._show;
  }

  set show(value: boolean) {
    this._show = value;
  }

  get travel_pass_stops(): Array<TravelPassStop> {
    return this._travel_pass_stops;
  }

  set travel_pass_stops(value: Array<TravelPassStop>) {
    this._travel_pass_stops = value.map((e, i) => {
      e.stop_order = i;
      return e;
    });
  }

  get start_date(): DateTimeZone {
    return this._start_date;
  }

  set start_date(value: DateTimeZone) {
    this._start_date = value;
  }

  get end_date(): DateTimeZone {
    return this._end_date;
  }

  set end_date(value: DateTimeZone) {
    this._end_date = value;
  }

  hasUnlimitedRides(): boolean {
    return this._unlimited_rides;
  }

  addTravelPassStop(item: TravelPassStop) {
    this._travel_pass_stops.push(item);

    // We re-set the values so we can re-index the stop order.
    this.travel_pass_stops = this._travel_pass_stops;
  }

  removeTravelPassStop(index: number) {
    this._travel_pass_stops.splice(index, 1);

    // We re-set the values so we can re-index the stop order.
    this.travel_pass_stops = this._travel_pass_stops;
  }

  getValidPickupPoints() {
    return this._travel_pass_stops.filter((each: TravelPassStop) => each.isPickup());
  }

  getValidDropoffPoints() {
    return this._travel_pass_stops.filter((each: TravelPassStop) => each.isDropoff());
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

    this.getValidPickupPoints().forEach((eachPickup: TravelPassStop) => {
      this.getValidDropoffPoints().forEach((eachDropoff: TravelPassStop) => {
        if (eachPickup.isEqual(eachDropoff)) {
          return;
        }

        let travelStopPricing = this.findTravelStopPricing(eachPickup, eachDropoff);

        if (!travelStopPricing) {
          travelStopPricing = new TravelPassStopPricing();

          travelStopPricing.leg_price.currency = withCurrency;

          // TODO: clone the eachDropoff to avoid endless anidation (because of passed down by reference).
          travelStopPricing.destination_stop = clone(eachDropoff);
          travelStopPricing.destination_stop_id = travelStopPricing.destination_stop.id;

          eachPickup.addPricing(travelStopPricing);
        } else {
          this.prepareLegPrices(travelStopPricing, withCurrency);
        }
      });
    });
  }

  isUnlimited(): boolean {
    return this.unlimited_rides;
  }

  prepareLegPrices(travelStopPricing: TravelPassStopPricing, withCurrency: Currency) {
    if (!travelStopPricing.leg_price) {
      travelStopPricing.leg_price = new Money();
    }

    if (!travelStopPricing.leg_price.currency || !travelStopPricing.leg_price.currency.iso_code) {
      travelStopPricing.leg_price.currency = withCurrency;
    }
  }

  // Finds existing travelPricing inside pricing list.
  findTravelStopPricing(pickup: TravelPassStop, dropoff: TravelPassStop): TravelPassStopPricing {
    let pricing = null;

    this.travel_pass_stops
      .find((eachTravelPassStop) => {
        return eachTravelPassStop.id === pickup.id;
      })
      ?.pricings.map((eachPricing: TravelPassStopPricing) => {
        if (!pricing && eachPricing.destination_stop && eachPricing.destination_stop.id === dropoff.id) {
          pricing = eachPricing;
        } else if (!pricing && eachPricing.destination_stop_id && eachPricing.destination_stop_id === dropoff.id) {
          pricing = eachPricing;
        }
      });

    return pricing;
  }

  setPriceToAllCombinations(amount: number, currency: Currency): void {
    this.travel_pass_stops = this.travel_pass_stops.map((eachTravelPassStop: TravelPassStop) => {
      eachTravelPassStop.pricings = eachTravelPassStop.pricings.map(
        (eachTravelPassStopPricing: TravelPassStopPricing) => {
          if (!eachTravelPassStopPricing.leg_price) {
            eachTravelPassStopPricing.leg_price = Money.getNew(amount, currency);
          } else {
            eachTravelPassStopPricing.leg_price.amount = amount;
          }
          return eachTravelPassStopPricing;
        }
      );

      return eachTravelPassStop;
    });
  }

  areAllPricesSet(): boolean {
    const prices = this.travel_pass_stops.map((eachTravelPassStop: TravelPassStop) => {
      return eachTravelPassStop.pricings.map((eachTravelPassStopPricing: TravelPassStopPricing) => {
        return eachTravelPassStopPricing.leg_price.amount;
      });
    });

    return prices.flat(1).filter((each) => each !== undefined).length === prices.flat(1).length;
  }

  hasSamePriceForAllStops(): boolean {
    const prices = this.travel_pass_stops.map((eachTravelPassStop) => {
      return eachTravelPassStop.pricings.map((eachTravelPassStopPricing) => {
        return eachTravelPassStopPricing.leg_price?.amount;
      });
    });

    return prices.flat(2).filter(removeDuplicated).length === 1;
  }

  getUniquePrices(): Array<number> {
    return this.travel_pass_stops.reduce((acc, eachTravelPassStop: TravelPassStop) => {
      eachTravelPassStop.pricings.forEach((eachTravelPassStopPricing: TravelPassStopPricing) => {
        if (!acc.find((eachInAcc) => eachInAcc === eachTravelPassStopPricing.leg_price?.amount)) {
          acc.push(eachTravelPassStopPricing.leg_price?.amount);
        }
      });

      return acc;
    }, []);
  }

  hasSomeNonZeroOrEmptyPrices(): boolean {
    // @ts-ignore
    return this.getUniquePrices().some((eachUniquePrice) => eachUniquePrice !== '' && +eachUniquePrice !== 0);
  }

  getPrice(): Money {
    if (!this.hasSamePriceForAllStops()) {
      throw new Error('Prices are different between stops.');
    }

    return this.travel_pass_stops[0]?.pricings[0]?.leg_price;
  }

  hasDifferentPricePerStop(): boolean {
    return !this.hasSamePriceForAllStops();
  }

  areDatesFlipped(): boolean {
    return this.start_date && this.end_date && this.end_date.happensBefore(this.start_date);
  }
}
