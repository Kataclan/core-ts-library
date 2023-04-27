import BaseEntity from '../../common/entities/BaseEntity';
import PaymentProvider from '../../Payment/enums/PaymentProvider';
import Currency from '../../Currency/entity/Currency';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';

type centerPointShape = {
  center_lat: number;
  center_lng: number;
  zoom: number;
};

export default class Market extends BaseEntity {
  static UK = '7625e92d-b080-4d71-9b1f-2e24c0fb8cba';
  static ZA = '5af3a188-dd40-41bc-bfc9-c391d3f2ffbf';
  static IT = '09b48189-863b-4b33-afdb-a0e2b06c73ad';
  static US = '27674e05-229a-47b5-a173-db4b90321c1d';
  static IRELAND = '3c73b82a-e4d9-4e20-97a9-f90f54a03307';

  static getAllMarkets(): Array<string> {
    return [Market.UK, Market.ZA, Market.US, Market.IT, Market.IRELAND];
  }

  private _name: string;
  private _english_name: string;
  private _short_name: string;
  private _currencies: Array<Currency> = [];
  private _timezones: Array<string> = [];
  private _languages: Array<string> = [];
  private _payment_providers: Array<PaymentProvider> = [];
  private _phone_prefix: string;
  private _country_code: string;
  private _default_passenger_helpline_phone: PhoneNumber;
  private _default_driver_helpline_phone: PhoneNumber;
  private _consumers_url: string;
  private _drivers_app_url: string;
  private _coach_hire_url: string;
  private _vehicle_certification_ids: Array<string> = [];
  private _tag_ids: any = {};
  private _access_role: string;
  private _center_point: centerPointShape = {
    center_lat: null,
    center_lng: null,
    zoom: 11,
  };

  zeerideUrl: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get english_name(): string {
    return this._english_name;
  }

  set english_name(value: string) {
    this._english_name = value;
  }

  get short_name(): string {
    return this._short_name;
  }

  set short_name(value: string) {
    this._short_name = value;
  }

  get currencies(): Array<Currency> {
    return this._currencies;
  }

  set currencies(value: Array<Currency>) {
    this._currencies = value;
  }

  get timezones(): Array<string> {
    return this._timezones;
  }

  set timezones(value: Array<string>) {
    this._timezones = value;
  }

  get languages(): Array<string> {
    return this._languages;
  }

  set languages(value: Array<string>) {
    this._languages = value;
  }

  get payment_providers(): Array<PaymentProvider> {
    return this._payment_providers;
  }

  set payment_providers(value: Array<PaymentProvider>) {
    this._payment_providers = value;
  }

  get phone_prefix(): string {
    return this._phone_prefix;
  }

  set phone_prefix(value: string) {
    this._phone_prefix = value;
  }

  get country_code(): string {
    return this._country_code;
  }

  set country_code(value: string) {
    this._country_code = value;
  }

  get default_passenger_helpline_phone(): PhoneNumber {
    return this._default_passenger_helpline_phone;
  }

  set default_passenger_helpline_phone(value: PhoneNumber) {
    this._default_passenger_helpline_phone = value;
  }

  get default_driver_helpline_phone(): PhoneNumber {
    return this._default_driver_helpline_phone;
  }

  set default_driver_helpline_phone(value: PhoneNumber) {
    this._default_driver_helpline_phone = value;
  }

  get consumers_url(): string {
    return this._consumers_url;
  }

  set consumers_url(value: string) {
    this._consumers_url = value;
  }

  get coach_hire_url(): string {
    return this._coach_hire_url;
  }

  set coach_hire_url(value: string) {
    this._coach_hire_url = value;
  }

  get drivers_app_url(): string {
    return this._drivers_app_url;
  }

  set drivers_app_url(value: string) {
    this._drivers_app_url = value;
  }

  get vehicle_certification_ids(): Array<string> {
    return this._vehicle_certification_ids;
  }

  set vehicle_certification_ids(value: Array<string>) {
    this._vehicle_certification_ids = value;
  }

  get tag_ids(): Array<string> {
    return this._tag_ids;
  }

  set tag_ids(value: Array<string>) {
    this._tag_ids = value;
  }

  get access_role(): string {
    return this._access_role;
  }

  set access_role(value: string) {
    this._access_role = value;
  }

  get center_point(): any {
    return this._center_point;
  }

  set center_point(value: any) {
    this._center_point = value;
  }

  getDefaultCurrency(): Currency {
    return this.currencies[0];
  }

  getDefaultTimezone(): string {
    return this.timezones[0];
  }

  getFrontendConsumersURL(relative = ''): string {
    return `${this.consumers_url}${relative}`;
  }

  getTrackMyDriverURL(code = '', withAccessToken): string {
    const accessToken = withAccessToken ? `?accessToken=${withAccessToken}` : '';
    return `${this.consumers_url}/t/${code}${accessToken}`;
  }

  getDriverAppURL(code = ''): string {
    return `${this.drivers_app_url}/drivers/journey/${code}?inApp`;
  }

  getFrontendConsumersPrivateProductURL(relative = ''): string {
    return `${this.consumers_url}${this.coach_hire_url}/${relative}`;
  }

  prepareDefaultPhoneNumber(fromPhoneNumber: PhoneNumber = null): PhoneNumber {
    return this.prepareDefaultPhoneNumberFromNumber(fromPhoneNumber ? fromPhoneNumber.number : void 0);
  }

  prepareDefaultPhoneNumberFromNumber(number: string): PhoneNumber {
    const phoneNumber = new PhoneNumber();
    phoneNumber.country_code = this.country_code;
    phoneNumber.prefix = this.phone_prefix;
    phoneNumber.number = number;
    return phoneNumber;
  }

  isUK(): boolean {
    return this.uuid.id === Market.UK;
  }

  isZA(): boolean {
    return this.uuid.id === Market.ZA;
  }

  isIT(): boolean {
    return this.uuid.id === Market.IT;
  }

  isUS(): boolean {
    return this.uuid.id === Market.US;
  }

  isIreland(): boolean {
    return this.uuid.id === Market.IRELAND;
  }
}
