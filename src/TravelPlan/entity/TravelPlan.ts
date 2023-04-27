import BaseEntity from '../../common/entities/BaseEntity';
import User from '../../User/entity/User';
import PassengerType from '../../PassengerType/entity/PassengerType';
import UUID from '../../UUID/UUID';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import Money from '../../Money/entity/Money';
import Product from '../../Product/entity/Product';
import LinkedRider from '../../LinkedRider/entity/LinkedRider';
import ProductPurchaseType from '../../ProductPurchase/enums/ProductPurchaseType';

export default class TravelPlan extends BaseEntity {
  private _journey_stop_id__pickup: string;
  private _journey_stop_name__pickup: string;
  private _journey_stop_id__dropoff: string;
  private _journey_stop_name__dropoff: string;
  private _journey_vehicle_id: string;
  private _journey_vehicle_stop_id__pickup: string;
  private _journey_vehicle_stop_id__dropoff: string;
  private _customer: User;
  private _rider: LinkedRider;
  private _passenger_type: PassengerType;
  private _not_traveling: boolean;
  private _product_purchase_id: string;
  private _journey_id: UUID;
  private _journey_name: string;
  private _product: Product;
  private _arrival_date: DateTimeZone;
  private _departure_date: DateTimeZone;
  private _original_amount: Money;
  private _paid_amount: Money;
  private _is_completed: boolean;
  private _is_used: boolean;
  private _is_live: boolean;
  private _is_reservation: boolean;
  private _has_failed: boolean;
  private _payment_ids: Array<string> = [];
  private _notification_sent: boolean;
  purchaseType: ProductPurchaseType;
  journey_vehicle_stop_id_boarded_at: string;
  journey_vehicle_stop_id_unboarded_at: string;
  compulsory_scan: boolean;

  get journey_stop_id__pickup(): string {
    return this._journey_stop_id__pickup;
  }

  set journey_stop_id__pickup(value: string) {
    this._journey_stop_id__pickup = value;
  }

  get journey_stop_name__pickup(): string {
    return this._journey_stop_name__pickup;
  }

  set journey_stop_name__pickup(value: string) {
    this._journey_stop_name__pickup = value;
  }

  get journey_stop_id__dropoff(): string {
    return this._journey_stop_id__dropoff;
  }

  set journey_stop_id__dropoff(value: string) {
    this._journey_stop_id__dropoff = value;
  }

  get journey_stop_name__dropoff(): string {
    return this._journey_stop_name__dropoff;
  }

  set journey_stop_name__dropoff(value: string) {
    this._journey_stop_name__dropoff = value;
  }

  get journey_vehicle_id(): string {
    return this._journey_vehicle_id;
  }

  set journey_vehicle_id(value: string) {
    this._journey_vehicle_id = value;
  }

  get journey_vehicle_stop_id__pickup(): string {
    return this._journey_vehicle_stop_id__pickup;
  }

  set journey_vehicle_stop_id__pickup(value: string) {
    this._journey_vehicle_stop_id__pickup = value;
  }

  get journey_vehicle_stop_id__dropoff(): string {
    return this._journey_vehicle_stop_id__dropoff;
  }

  set journey_vehicle_stop_id__dropoff(value: string) {
    this._journey_vehicle_stop_id__dropoff = value;
  }

  get customer(): User {
    return this._customer;
  }

  set customer(value: User) {
    this._customer = value;
  }

  get rider(): LinkedRider {
    return this._rider;
  }

  set rider(value: LinkedRider) {
    this._rider = value;
  }

  get passenger_type(): PassengerType {
    return this._passenger_type;
  }

  set passenger_type(value: PassengerType) {
    this._passenger_type = value;
  }

  get not_traveling(): boolean {
    return this._not_traveling;
  }

  set not_traveling(value: boolean) {
    this._not_traveling = value;
  }

  get product_purchase_id(): string {
    return this._product_purchase_id;
  }

  set product_purchase_id(value: string) {
    this._product_purchase_id = value;
  }

  get journey_id(): UUID {
    return this._journey_id;
  }

  set journey_id(value: UUID) {
    this._journey_id = value;
  }

  get journey_name(): string {
    return this._journey_name;
  }

  set journey_name(value: string) {
    this._journey_name = value;
  }

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }

  get arrival_date(): DateTimeZone {
    return this._arrival_date;
  }

  set arrival_date(value: DateTimeZone) {
    this._arrival_date = value;
  }

  get departure_date(): DateTimeZone {
    return this._departure_date;
  }

  set departure_date(value: DateTimeZone) {
    this._departure_date = value;
  }

  get original_amount(): Money {
    return this._original_amount;
  }

  set original_amount(value: Money) {
    this._original_amount = value;
  }

  get paid_amount(): Money {
    return this._paid_amount;
  }

  set paid_amount(value: Money) {
    this._paid_amount = value;
  }

  get is_completed(): boolean {
    return this._is_completed;
  }

  set is_completed(value: boolean) {
    this._is_completed = value;
  }

  get is_used(): boolean {
    return this._is_used;
  }

  set is_used(value: boolean) {
    this._is_used = value;
  }

  get is_live(): boolean {
    return this._is_live;
  }

  set is_live(value: boolean) {
    this._is_live = value;
  }

  get is_reservation(): boolean {
    return this._is_reservation;
  }

  set is_reservation(value: boolean) {
    this._is_reservation = value;
  }

  get has_failed(): boolean {
    return this._has_failed;
  }

  set has_failed(value: boolean) {
    this._has_failed = value;
  }

  get payment_ids(): Array<string> {
    return this._payment_ids;
  }

  set payment_ids(value: Array<string>) {
    this._payment_ids = value;
  }

  get notification_sent(): boolean {
    return this._notification_sent;
  }

  set notification_sent(value: boolean) {
    this._notification_sent = value;
  }

  notificationHasBeenSent() {
    return this.notification_sent;
  }

  isUnallocated() {
    return !this.isNotTraveling() && !this.journey_vehicle_stop_id__pickup && !this.journey_vehicle_stop_id__dropoff;
  }

  isUnallocatedForPickup() {
    return !this.isNotTraveling() && !this.journey_vehicle_stop_id__pickup;
  }

  isUnallocatedForDropoff() {
    return !this.isNotTraveling() && !this.journey_vehicle_stop_id__dropoff;
  }

  isUnallocatedFor(_for: 'pickup' | 'dropoff') {
    return !this.isNotTraveling() && !this[`journey_vehicle_stop_id__${_for}`];
  }

  isNotTraveling() {
    return this.not_traveling;
  }

  isAllocated() {
    return !this.isUnallocated() && !this.isNotTraveling();
  }

  isReservation() {
    return this.is_reservation;
  }

  isUsed() {
    return this.is_used;
  }

  hasFailed() {
    return this.has_failed;
  }
}
