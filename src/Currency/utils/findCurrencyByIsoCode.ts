import getCurrencies from './getCurrencies';
import Currency from '../entity/Currency';

class CurrencyNotSupported extends Error {
  constructor(message: string) {
    super(`Currency '${message}' is not supported.`);
  }
}

export default function findCurrencyByIsoCode(iso_code): Currency {
  if (!iso_code) {
    // Because might not be set but this is a valid option
    return null;
  }

  const found = getCurrencies().find((e) => e.iso_code === iso_code);

  if (found) {
    return found;
  }

  throw new CurrencyNotSupported(iso_code);
}
