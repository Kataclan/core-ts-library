import TravelProduct from '../../TravelProduct/entity/TravelProduct';
import Payment from '../../Payment/entity/Payment';
import Money from '../../Money/entity/Money';
import User from '../../User/entity/User';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import PageType from '../../Page/enums/PageType';

export default class PrivateProduct extends TravelProduct {
  private _price: Money = new Money();
  private _per_seat_price: Money = new Money();
  private _lead_passenger: User;
  private _lead_passenger_id: string;
  private _payment_limit_date: DateTimeZone = new DateTimeZone();
  private _payments: Array<Payment> = [];
  private _allow_book_once_paid: boolean = false;
  private _outbound_seats_for_sale: number;
  private _outbound_seats_bought: number;
  private _return_seats_for_sale: number;
  private _return_seats_bought: number;

  constructor() {
    super();
    this.page_type = PageType.PRIVATE_BOOKING;
  }

  get price(): Money {
    return this._price;
  }

  set price(value: Money) {
    this._price = value;
  }

  get per_seat_price(): Money {
    return this._per_seat_price;
  }

  set per_seat_price(value: Money) {
    this._per_seat_price = value;
  }

  get lead_passenger_id(): string {
    return this._lead_passenger_id;
  }

  set lead_passenger_id(value: string) {
    this._lead_passenger_id = value;
  }

  get lead_passenger(): User {
    return this._lead_passenger;
  }

  set lead_passenger(value: User) {
    this._lead_passenger = value;
  }

  get payment_limit_date(): DateTimeZone {
    return this._payment_limit_date;
  }

  set payment_limit_date(value: DateTimeZone) {
    this._payment_limit_date = value;
  }

  get payments(): Array<Payment> {
    return this._payments;
  }

  set payments(value: Array<Payment>) {
    this._payments = value;
  }

  get allow_book_once_paid(): boolean {
    return this._allow_book_once_paid;
  }

  set allow_book_once_paid(value: boolean) {
    this._allow_book_once_paid = value;
  }

  get return_seats_bought(): number {
    return this._return_seats_bought;
  }

  set return_seats_bought(value: number) {
    this._return_seats_bought = value;
  }
  get return_seats_for_sale(): number {
    return this._return_seats_for_sale;
  }

  set return_seats_for_sale(value: number) {
    this._return_seats_for_sale = value;
  }
  get outbound_seats_for_sale(): number {
    return this._outbound_seats_for_sale;
  }

  set outbound_seats_for_sale(value: number) {
    this._outbound_seats_for_sale = value;
  }

  get outbound_seats_bought(): number {
    return this._outbound_seats_bought;
  }

  set outbound_seats_bought(value: number) {
    this._outbound_seats_bought = value;
  }
}
