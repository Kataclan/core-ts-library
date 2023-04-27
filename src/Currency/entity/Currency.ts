import Money from '../../Money/entity/Money';

export default class Currency {
  private _name: string; // Euro / Pound
  private _iso_code: string; // EUR / GBP / ZAR
  private _symbol: string; // € / L / $
  private _decimal_precision: number; // divide by / multiply by
  private _country_iso: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get iso_code(): string {
    return this._iso_code;
  }

  set iso_code(value: string) {
    this._iso_code = value;
  }

  get symbol(): string {
    return this._symbol;
  }

  set symbol(value: string) {
    this._symbol = value;
  }

  get decimal_precision(): number {
    return this._decimal_precision;
  }

  set decimal_precision(value: number) {
    this._decimal_precision = value;
  }

  get country_iso(): string {
    return this._country_iso;
  }

  set country_iso(value: string) {
    this._country_iso = value;
  }

  static getNew(name, iso_code, symbol, decimal_precision, country_iso): Currency {
    const currency = new this();
    currency.name = name;
    currency.iso_code = iso_code;
    currency.symbol = symbol;
    currency.decimal_precision = decimal_precision;
    currency.country_iso = country_iso;
    return currency;
  }

  createMoney(amount: number): Money {
    const money = new Money();
    money.amount = amount;
    money.currency = this;
    return money;
  }

  multiplyDecimals(value: number) {
    return value * Math.pow(10, this.decimal_precision);
  }

  divideDecimals(value: number) {
    return value / Math.pow(10, this.decimal_precision);
  }
}
