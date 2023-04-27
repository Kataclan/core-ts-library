import Address from '../entity/Address';

export default function adaptAddress(json: adaptAddressType, instance: Address = new Address()): Address {
  if (!json) {
    return instance;
  }

  instance.fullAddress = json.full_address;
  instance.latitude = json.latitude;
  instance.longitude = json.longitude;

  return instance;
}

type adaptAddressType = {
  full_address: string;
  latitude: string;
  longitude: string;
};
