import BaseEntity from '../../common/entities/BaseEntity';
import EventProduct from '../../EventProduct/entity/EventProduct';
import PromoCodeUseTypes from '../enums/PromoCodeUseTypes';
import DiscountPercentage from '../../Discount/entity/DiscountPercentage';
import PromoCodeTeamOptions from '../enums/PromoCodeTeamOptions';
import Money from '../../Money/entity/Money';
import PromoCodePlatformTypes from '../enums/PromoCodePlatformTypes';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import PromoCodeLimitedToProductTypes from '../enums/PromoCodeLimitedToProductTypes';
import DiscountType from '../../Discount/enums/DiscountType';
import Market from '../../Market/entity/Market';

export default class PromoCode extends BaseEntity {
  private _code: string = '';
  private _used: number;
  private _supply: number;
  private _discount_type: DiscountType = DiscountType.FIXED_AMOUNT;
  private _discount_amount: Money = new Money();
  private _discount_percentage: DiscountPercentage = new DiscountPercentage();
  private _value: number;
  private _max_seats: number;
  private _min_seats: number;
  private _start_date: DateTimeZone = new DateTimeZone();
  private _end_date: DateTimeZone = new DateTimeZone();
  private _team: PromoCodeTeamOptions = PromoCodeTeamOptions.TEAM_MARKETING;
  private _number_of_usages_per_user: number;
  private _number_of_max_usages: number;
  private _number_of_promo_codes: number;
  private _use_type: PromoCodeUseTypes;
  private _product_types: Array<PromoCodeLimitedToProductTypes> = [];
  private _associated_events: Array<EventProduct> = [];
  private _platforms: Array<PromoCodePlatformTypes> = [];
  private _promo_code_group_id: string;
  market: Market;

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get used(): number {
    return this._used;
  }

  set used(value: number) {
    this._used = value;
  }

  get supply(): number {
    return this._supply;
  }

  set supply(value: number) {
    this._supply = value;
  }

  get discount_type(): DiscountType {
    return this._discount_type;
  }

  set discount_type(value: DiscountType) {
    this._discount_type = value;
  }

  get discount_amount(): Money {
    return this._discount_amount;
  }

  set discount_amount(value: Money) {
    this._discount_amount = value;
  }

  get discount_percentage(): DiscountPercentage {
    return this._discount_percentage;
  }

  set discount_percentage(value: DiscountPercentage) {
    this._discount_percentage = value;
  }

  get max_seats(): number {
    return this._max_seats;
  }

  set max_seats(value: number) {
    this._max_seats = value;
  }

  get min_seats(): number {
    return this._min_seats;
  }

  set min_seats(value: number) {
    this._min_seats = value;
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

  get team(): PromoCodeTeamOptions {
    return this._team;
  }

  set team(value: PromoCodeTeamOptions) {
    this._team = value;
  }

  get number_of_usages_per_user(): number {
    return this._number_of_usages_per_user;
  }

  set number_of_usages_per_user(value: number) {
    this._number_of_usages_per_user = value;
  }

  get number_of_max_usages(): number {
    return this._number_of_max_usages;
  }

  set number_of_max_usages(value: number) {
    this._number_of_max_usages = value;
  }

  get number_of_promo_codes(): number {
    return this._number_of_promo_codes;
  }

  set number_of_promo_codes(value: number) {
    this._number_of_promo_codes = value;
  }

  get use_type(): PromoCodeUseTypes {
    return this._use_type;
  }

  set use_type(value: PromoCodeUseTypes) {
    this._use_type = value;
  }

  get associated_events(): Array<EventProduct> {
    return this._associated_events;
  }

  set associated_events(value: Array<EventProduct>) {
    this._associated_events = value;
  }

  get promo_code_group_id(): string {
    return this._promo_code_group_id;
  }

  set promo_code_group_id(value: string) {
    this._promo_code_group_id = value;
  }

  get platforms(): Array<PromoCodePlatformTypes> {
    return this._platforms;
  }

  set platforms(value: Array<PromoCodePlatformTypes>) {
    this._platforms = value;
  }

  get product_types(): Array<PromoCodeLimitedToProductTypes> {
    return this._product_types;
  }

  set product_types(value: Array<PromoCodeLimitedToProductTypes>) {
    this._product_types = value;
  }

  private isFixedAmount() {
    return this.discount_type === DiscountType.FIXED_AMOUNT;
  }

  private isPercentageDiscount() {
    return this.discount_type === DiscountType.PERCENTAGE;
  }

  hasPlatform(platform: PromoCodePlatformTypes): boolean {
    return this.platforms.indexOf(platform) !== -1;
  }

  addPlatform(platform: PromoCodePlatformTypes) {
    this.platforms.push(platform);
  }

  removePlatform(index: number) {
    this.platforms.splice(index, 1);
  }

  removePlatformByValue(item: PromoCodePlatformTypes) {
    this.removePlatform(this.platforms.findIndex((e) => e === item));
  }

  hasProductType(productType: PromoCodeLimitedToProductTypes): boolean {
    return this.product_types.indexOf(productType) !== -1;
  }

  addProductType(productType: PromoCodeLimitedToProductTypes) {
    this.product_types.push(productType);
  }

  emptyProductType() {
    this.product_types = [];
  }

  removeProductType(index: number) {
    this.product_types.splice(index, 1);
  }

  removeProductTypeByValue(item: PromoCodeLimitedToProductTypes) {
    this.removeProductType(this.product_types.findIndex((e) => e === item));
  }

  isUseTypeUnique() {
    return this.use_type === PromoCodeUseTypes.UNIQUE;
  }

  isUseTypeFirstTime() {
    return this.use_type === PromoCodeUseTypes.FIRST_TIME;
  }

  isUseTypeGeneric() {
    return this.use_type === PromoCodeUseTypes.GENERIC_MULTIPLE_USE;
  }

  get value() {
    // this._value is the actual input value, regardless the type.
    return this._value;
  }

  set value(value: number) {
    // this._value is the actual input value, regardless the type.
    this._value = value;

    // Then we save that value in both types so the input can render a value regardless the type.
    // Then depending on the discount type the sent value will be one or the other.
    this.discount_amount.amount = value;
    this.discount_percentage.value = value;
  }
}
