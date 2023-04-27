import Money from '../entity/Money';

export default function prepareMoney(money: Money): any {
  // We have to specifically check for null or empty string since these can be valid inputs from the forms.
  if (!money || (typeof money.amount === 'string' && money.amount === '') || Object.is(money.amount, null)) {
    return null;
  }

  return {
    amount: +(money.amount * Math.pow(10, money.currency.decimal_precision)).toFixed(0),
    currency: money.currency.iso_code,
    currency_iso: money.currency.iso_code,
    currency_name: money.currency.iso_code, // ????????????
    // currency_precision: money.currency.decimal_precision,
    // currency_symbol: money.currency.symbol
  };
}
