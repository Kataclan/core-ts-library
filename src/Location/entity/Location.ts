import BaseEntity from '../../common/entities/BaseEntity';

export default class Location extends BaseEntity {
  protected _name: string;
  protected _administrative_authority_name: string;
  protected _administrative_authority_id: string;
  protected _administrative_authority_full_name: string;
  protected _passenger_description: string;
  protected _driver_description: string;
  protected _latitude: string;
  protected _longitude: string;
  protected _address: string;
  protected _postal_code: string;
  protected _images: Array<string> = [];
  protected _stop_id: string;
  protected _stop_name: string;
  protected _timezone: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get administrative_authority_name(): string {
    return this._administrative_authority_name;
  }

  set administrative_authority_name(value: string) {
    this._administrative_authority_name = value;
  }

  get administrative_authority_id(): string {
    return this._administrative_authority_id;
  }

  set administrative_authority_id(value: string) {
    this._administrative_authority_id = value;
  }

  get administrative_authority_full_name(): string {
    return this._administrative_authority_full_name;
  }

  set administrative_authority_full_name(value: string) {
    this._administrative_authority_full_name = value;
  }

  get passenger_description(): string {
    return this._passenger_description;
  }

  set passenger_description(value: string) {
    this._passenger_description = value;
  }

  get driver_description(): string {
    return this._driver_description;
  }

  set driver_description(value: string) {
    this._driver_description = value;
  }

  get latitude(): string {
    return this._latitude;
  }

  set latitude(value: string) {
    this._latitude = value;
  }

  get longitude(): string {
    return this._longitude;
  }

  set longitude(value: string) {
    this._longitude = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get postal_code(): string {
    return this._postal_code;
  }

  set postal_code(value: string) {
    this._postal_code = value;
  }

  get images(): Array<string> {
    return this._images;
  }

  set images(value: Array<string>) {
    this._images = value;
  }

  get stop_id(): string {
    return this._stop_id;
  }

  set stop_id(value: string) {
    this._stop_id = value;
  }

  get stop_name(): string {
    return this._stop_name;
  }

  set stop_name(value: string) {
    this._stop_name = value;
  }

  get timezone(): string {
    return this._timezone;
  }

  set timezone(value: string) {
    this._timezone = value;
  }

  getFullName(): string {
    if (this._stop_name) {
      return '[' + this._stop_name + ']' + ' ' + this._name;
    }

    return this._name;
  }
}
