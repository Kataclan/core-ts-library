import Currency from '../../Currency/entity/Currency';
import clone from '../../common/utils/clone';

export default class Money {
  private _currency: Currency = new Currency();
  private _amount: number;

  get currency(): Currency {
    return this._currency;
  }

  set currency(value: Currency) {
    this._currency = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  static getNew(amount: number, currency: Currency) {
    const money = new this();
    money.amount = amount;
    money.currency = currency;
    return money;
  }

  getPrettyString(): string {
    return Intl.NumberFormat(this.currency.country_iso, {
      style: 'currency',
      currency: this.currency.iso_code,
    }).format(this.amount);
  }

  divide(by: number): Money {
    if (by === 0) {
      throw new Error('Cannot divide by 0!');
    }

    const cloned = clone(this);
    cloned.amount = cloned.amount / by;
    return cloned;
  }

  multiply(by: number): Money {
    const cloned = clone(this);
    cloned.amount = cloned.amount * by;
    return cloned;
  }
}
