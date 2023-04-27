import Contact from '../entity/Contact';
import { preparePhoneNumberWithoutPhonePrefix } from '../../PhoneNumber/adapter/preparePhoneNumber';

export default function prepareContact(instance: Contact): prepareContactType {
  return {
    first_name: instance.firstName,
    last_name: instance.lastName,
    email: instance.email,
    phone: preparePhoneNumberWithoutPhonePrefix(instance.phoneNumber),
  };
}

type prepareContactType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: {
    number: string;
    prefix: string;
    country_code: string;
  };
};
