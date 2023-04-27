import BaseEntity from '../../common/entities/BaseEntity';
import Journey from '../../Journey/entity/Journey';
import Product from '../../Product/entity/Product';
import PassengerType from '../../PassengerType/entity/PassengerType';
import Stop from '../../Location/entity/Location';

type legsShape = {
  pickup: Stop;
  dropoff: Stop;
};

type passengerTypeShape = {
  passenger_type: PassengerType;
  number_of_seats: number;
};

export default class Booking extends BaseEntity {
  protected _journey: Journey;
  protected _event_product: Product;
  protected _date: string;
  protected _legs: Array<legsShape> = [];
  protected _original_price: number;
  protected _paid_amount: number;
  protected _number_of_passengers: Array<passengerTypeShape> = [];

  get journey(): Journey {
    return this._journey;
  }

  set journey(value: Journey) {
    this._journey = value;
  }

  get event_product(): Product {
    return this._event_product;
  }

  set event_product(value: Product) {
    this._event_product = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get legs(): Array<legsShape> {
    return this._legs;
  }

  set legs(value: Array<legsShape>) {
    this._legs = value;
  }

  get original_price(): number {
    return this._original_price;
  }

  set original_price(value: number) {
    this._original_price = value;
  }

  get paid_amount(): number {
    return this._paid_amount;
  }

  set paid_amount(value: number) {
    this._paid_amount = value;
  }

  get number_of_passengers(): Array<passengerTypeShape> {
    return this._number_of_passengers;
  }

  set number_of_passengers(value: Array<passengerTypeShape>) {
    this._number_of_passengers = value;
  }
}
