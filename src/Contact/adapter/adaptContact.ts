import Contact from '../entity/Contact';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';

export default function adaptContact(json: adaptContactType, instance: Contact = new Contact()): Contact {
  if (!json) {
    return instance;
  }

  instance.firstName = json.first_name;
  instance.lastName = json.last_name;
  instance.email = json.email;
  instance.phoneNumber = adaptPhoneNumber(json.phone);

  return instance;
}

type adaptContactType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone: {
    number: string;
    prefix: string;
    country_code: string;
  };
};
