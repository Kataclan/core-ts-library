import Currency from '../entity/Currency';

export default function getCurrencies() {
  return [
    Currency.getNew('Pound', 'GBP', '£', 2, 'en-GB'),
    Currency.getNew('Euro', 'EUR', '€', 2, 'es-ES'),
    Currency.getNew('South African Rand', 'ZAR', 'R', 2, 'en-ZA'),
    Currency.getNew('United States Dollar', 'USD', '$', 2, 'en-US'),
  ];
}

export function getCurrencyByIsoCode(isoCode: string): Currency {
  return getCurrencies().find((eachCurrency: Currency) => eachCurrency.iso_code === isoCode);
}
