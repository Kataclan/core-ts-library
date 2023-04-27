import BaseEntity from '../../common/entities/BaseEntity';
import PromoCode from '../../PromoCode/entity/PromoCode';
import TravelPlan from '../../TravelPlan/entity/TravelPlan';

export default abstract class BookedItem extends BaseEntity {
  private _price_per_seat: number; // Original price without applying any discounts (concessions or promos).
  private _promo_code: PromoCode;
  private _travel_plans: Array<TravelPlan> = [];

  get price_per_seat(): number {
    return this._price_per_seat;
  }

  set price_per_seat(value: number) {
    this._price_per_seat = value;
  }

  get promo_code(): PromoCode {
    return this._promo_code;
  }

  set promo_code(value: PromoCode) {
    this._promo_code = value;
  }

  get travel_plans(): Array<TravelPlan> {
    return this._travel_plans;
  }

  set travel_plans(value: Array<TravelPlan>) {
    this._travel_plans = value;
  }
}
