export default class DiscountPercentage {
  private _value: number = 0;
  private _precision: number = 0;

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get precision(): number {
    return this._precision;
  }

  set precision(value: number) {
    this._precision = value;
  }
}
