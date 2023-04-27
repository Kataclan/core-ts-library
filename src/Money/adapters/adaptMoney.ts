import Money from '../entity/Money';
import Currency from '../../Currency/entity/Currency';
import findCurrencyByIsoCode from '../../Currency/utils/findCurrencyByIsoCode';

export default function adaptMoney(json: moneyShape, instance: Money = new Money()): Money {
  if (!json || Array.isArray(json)) {
    return null;
  }

  const currency = new Currency();
  currency.iso_code = json.currency || json.currency_name;

  const found = findCurrencyByIsoCode(currency.iso_code);
  currency.decimal_precision = found.decimal_precision;
  currency.symbol = found.symbol;
  currency.country_iso = found.country_iso;
  currency.name = found.name;

  instance.amount = json.amount / Math.pow(10, currency.decimal_precision);

  instance.currency = currency;

  return instance;
}

export type moneyShape = {
  amount: number;
  currency: string;
  currency_name: string;
  currency_precision: number;
  currency_symbol: string;
  currency_symbol_side: string;
};
