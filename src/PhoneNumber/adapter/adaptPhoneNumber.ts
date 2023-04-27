import PhoneNumber from '../entity/PhoneNumber';

export default function adaptPhoneNumber(json: any, instance: PhoneNumber = new PhoneNumber()): PhoneNumber {
  // TODO: Backend sends [] if no phone. They have to fix it and send {} or null but for now this.
  if (Array.isArray(json) || !json || !json.number || !json.prefix || !json.country_code) {
    return instance;
  }

  instance.number = json.number.toString();
  instance.prefix = json.prefix.toString();
  instance.country_code = json.country_code.toLowerCase();
  instance.verificationCode = json.verification_code;

  return instance;
}

export function adaptNullablePhoneNumber(json: any, instance: PhoneNumber = new PhoneNumber()): PhoneNumber {
  // TODO: Backend sends [] if no phone. They have to fix it and send {} or null but for now this.
  if (Array.isArray(json) || !json || !json.number || !json.prefix || !json.country_code) {
    return null;
  }

  return adaptPhoneNumber(json, instance);
}
