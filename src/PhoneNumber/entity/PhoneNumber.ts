import BaseEntity from '../../common/entities/BaseEntity';
import Market from '../../Market/entity/Market';

export default class PhoneNumber extends BaseEntity {
  number: string;
  prefix: string;
  country_code: string;
  verificationCode: string;

  format(): string {
    if (!this.prefix || !this.number) return '';

    return `+${this.prefix} ${this.number}`;
  }

  update({ number, prefix, country_code }: { number: string; prefix: string; country_code: string }) {
    this.number = number;
    this.prefix = prefix;
    this.country_code = country_code;
  }

  static fromValues({ number, prefix, countryCode }: { number: string; prefix: string; countryCode: string }) {
    const phoneNumber = new this();
    phoneNumber.number = number;
    phoneNumber.prefix = prefix;
    phoneNumber.country_code = countryCode;

    return phoneNumber;
  }

  isValid(): boolean {
    return !!this.number && !!this.prefix && !!this.country_code;
  }

  static defaultCountryCode(marketId: string) {
    switch (marketId) {
      case Market.UK:
        return 'gb';

      case Market.ZA:
        return 'za';

      case Market.US:
        return 'us';

      case Market.IRELAND:
        return 'ie';
    }
  }

  static createMarketPhone(marketId: string, number = '') {
    switch (marketId) {
      case Market.UK:
        return PhoneNumber.createUKPhone(number);

      case Market.ZA:
        return PhoneNumber.createZAPhone(number);

      case Market.US:
        return PhoneNumber.createUSPhone(number);

      case Market.IRELAND:
        return PhoneNumber.createIEPhone(number);
    }
  }

  static createUKPhone(number = '') {
    return PhoneNumber.fromValues({ number, prefix: '44', countryCode: 'gb' });
  }

  static createZAPhone(number = '') {
    return PhoneNumber.fromValues({ number, prefix: '27', countryCode: 'za' });
  }

  static createUSPhone(number = '') {
    return PhoneNumber.fromValues({ number, prefix: '1', countryCode: 'us' });
  }

  static createIEPhone(number = '') {
    return PhoneNumber.fromValues({ number, prefix: '353', countryCode: 'ie' });
  }
}
