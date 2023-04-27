import BaseEntity from '../../common/entities/BaseEntity';
import User from '../../User/entity/User';
import ProductPurchase from '../../ProductPurchase/entity/ProductPurchase';
import TravelPass from './TravelPass';
import Concession from '../../Concession/entity/Concession';
import Tier from '../../Tier/entity/Tier';
import Stop from '../../Location/entity/Location';
import PassengerType from '../../PassengerType/entity/PassengerType';
import LinkedRider from '../../LinkedRider/entity/LinkedRider';

export class AvailablePassengerType {
  seats: number;
  passengerType: PassengerType;
  rider: LinkedRider;
}

export default class TravelPassUser extends BaseEntity {
  private _available_passenger_types: Array<AvailablePassengerType>;
  private _user: User;
  private _product_purchase: ProductPurchase;
  private _travel_pass: TravelPass;
  private _tier: Tier;
  private _concessions: Array<Concession>;
  private _available_rides: number;
  private _used_rides: number;
  private _total_rides: number;
  private _remaining_rides: number;
  private _total_expired: number;
  private _pickup: Stop;
  private _origins: Array<Stop> = [];
  private _dropoff: Stop;
  private _destinations: Array<Stop> = [];
  private _is_unlimited: boolean;
  private _stored_payment_id: string;
  is_suspended: boolean;
  isOneWay: boolean;

  get available_passenger_types(): Array<AvailablePassengerType> {
    return this._available_passenger_types;
  }

  set available_passenger_types(value: Array<AvailablePassengerType>) {
    this._available_passenger_types = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get product_purchase(): ProductPurchase {
    return this._product_purchase;
  }

  set product_purchase(value: ProductPurchase) {
    this._product_purchase = value;
  }

  get travel_pass(): TravelPass {
    return this._travel_pass;
  }

  set travel_pass(value: TravelPass) {
    this._travel_pass = value;
  }

  get tier(): Tier {
    return this._tier;
  }

  set tier(value: Tier) {
    this._tier = value;
  }

  get concessions(): Array<Concession> {
    return this._concessions;
  }

  set concessions(value: Array<Concession>) {
    this._concessions = value;
  }

  get available_rides(): number {
    return this._available_rides;
  }

  set available_rides(value: number) {
    this._available_rides = value;
  }

  get used_rides(): number {
    return this._used_rides;
  }

  set used_rides(value: number) {
    this._used_rides = value;
  }

  get total_rides(): number {
    return this._total_rides;
  }

  set total_rides(value: number) {
    this._total_rides = value;
  }

  get remaining_rides(): number {
    return this._remaining_rides;
  }

  set remaining_rides(value: number) {
    this._remaining_rides = value;
  }

  get total_expired(): number {
    return this._total_expired;
  }

  set total_expired(value: number) {
    this._total_expired = value;
  }

  get pickup(): Stop {
    return this._pickup;
  }

  set pickup(value: Stop) {
    this._pickup = value;
  }

  get dropoff(): Stop {
    return this._dropoff;
  }

  set dropoff(value: Stop) {
    this._dropoff = value;
  }

  get is_unlimited(): boolean {
    return this._is_unlimited;
  }

  set is_unlimited(value: boolean) {
    this._is_unlimited = value;
  }

  get origins(): Array<Stop> {
    return this._origins;
  }

  set origins(value: Array<Stop>) {
    this._origins = value;
  }

  get destinations(): Array<Stop> {
    return this._destinations;
  }

  set destinations(value: Array<Stop>) {
    this._destinations = value;
  }

  get stored_payment_id(): string {
    return this._stored_payment_id;
  }

  set stored_payment_id(value: string) {
    this._stored_payment_id = value;
  }

  isUnlimited(): boolean {
    return this._is_unlimited;
  }

  isAutoTopUpEnabled(): boolean {
    return !!this.stored_payment_id;
  }

  isSuspended(): boolean {
    return this.is_suspended;
  }

  disableAutoTopUp() {
    this.stored_payment_id = null;
  }

  isPassengerTypeAvailable(passengerTypeId: string): boolean {
    return this.getAvailablePassengerTypeCount(passengerTypeId) > 0;
  }

  getAvailablePassengerTypeCount(passengerTypeId: string): number {
    return this.available_passenger_types
      .filter((eachAvailablePassengerType: AvailablePassengerType) => {
        return eachAvailablePassengerType.passengerType.uuid.id === passengerTypeId;
      })
      .filter((eachAvailablePassengerType: AvailablePassengerType) => {
        return !eachAvailablePassengerType.rider;
      })
      .reduce((acc, eachAvailablePassengerType) => {
        acc += eachAvailablePassengerType.seats;
        return acc;
      }, 0);
  }
}
