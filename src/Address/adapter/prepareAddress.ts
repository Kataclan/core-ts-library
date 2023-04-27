import Address from '../entity/Address';

export default function prepareAddress(instance: Address): prepareAddressType {
  return {
    full_address: instance.fullAddress,
    latitude: instance.latitude,
    longitude: instance.longitude,
  };
}

type prepareAddressType = {
  full_address: string;
  latitude: string;
  longitude: string;
};
