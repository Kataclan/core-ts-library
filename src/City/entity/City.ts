import BaseEntity from '../../common/entities/BaseEntity';
import Market from '../../Market/entity/Market';

export default class City extends BaseEntity {
  protected _name: string;
  protected _administrative_authority_lvl1_id: number;
  protected _administrative_authority_lvl1_name: string;
  protected _administrative_authority_lvl2_id: number;
  protected _administrative_authority_lvl2_name: string;
  protected _administrative_authority_lvl3_id: number;
  protected _administrative_authority_lvl3_name: string;
  protected _full_name: string;
  protected _latitude: number;
  protected _longitude: number;
  protected _population: number;
  protected _time_zone: string;
  market: Market;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get administrative_authority_lvl1_id(): number {
    return this._administrative_authority_lvl1_id;
  }

  set administrative_authority_lvl1_id(value: number) {
    this._administrative_authority_lvl1_id = value;
  }

  get administrative_authority_lvl1_name(): string {
    return this._administrative_authority_lvl1_name;
  }

  set administrative_authority_lvl1_name(value: string) {
    this._administrative_authority_lvl1_name = value;
  }

  get administrative_authority_lvl2_id(): number {
    return this._administrative_authority_lvl2_id;
  }

  set administrative_authority_lvl2_id(value: number) {
    this._administrative_authority_lvl2_id = value;
  }

  get administrative_authority_lvl2_name(): string {
    return this._administrative_authority_lvl2_name;
  }

  set administrative_authority_lvl2_name(value: string) {
    this._administrative_authority_lvl2_name = value;
  }

  get administrative_authority_lvl3_id(): number {
    return this._administrative_authority_lvl3_id;
  }

  set administrative_authority_lvl3_id(value: number) {
    this._administrative_authority_lvl3_id = value;
  }

  get administrative_authority_lvl3_name(): string {
    return this._administrative_authority_lvl3_name;
  }

  set administrative_authority_lvl3_name(value: string) {
    this._administrative_authority_lvl3_name = value;
  }

  get full_name(): string {
    return this._full_name;
  }

  set full_name(value: string) {
    this._full_name = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get population(): number {
    return this._population;
  }

  set population(value: number) {
    this._population = value;
  }

  get time_zone(): string {
    return this._time_zone;
  }

  set time_zone(value: string) {
    this._time_zone = value;
  }
}
