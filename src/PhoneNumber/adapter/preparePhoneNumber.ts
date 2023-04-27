import PhoneNumber from '../entity/PhoneNumber';

export default function preparePhoneNumber(instance: PhoneNumber): any {
  if (!instance) return null;

  let phone_number = null;

  if (instance.number) {
    if (typeof instance.number === 'string') {
      phone_number = parseInt(instance.number.replace(/\D/g, ''));
    } else {
      phone_number = instance.number;
    }
  }

  if (!phone_number) {
    return null;
  }

  return {
    phone_number,
    phone_prefix: parseInt(instance.prefix),
    phone_country_code: (instance.country_code || '').toUpperCase(),
  };
}

export function preparePhoneNumberWithoutPhonePrefix(instance: PhoneNumber): any {
  if (!instance || !instance.number) return null;

  return {
    number: instance.number ? parseInt(instance.number.replace(/\D/g, '')) : null,
    prefix: parseInt(instance.prefix),
    country_code: (instance.country_code || '').toUpperCase(),
  };
}
