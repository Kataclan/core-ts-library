import TravelPassStop from '../entity/TravelPassStop';
import TravelPassStopPricing from '../../TravelPassStopPricing/entity/TravelPassStopPricing';
import TravelStopType from '../../TravelStop/enums/TravelStopType';
import StopIsNotEitherPickupOrDropoffException from '../../common/exceptions/StopIsNotEitherPickupOrDropoffException';
import prepareTravelPassStopPricing from '../../TravelPassStopPricing/adapter/prepareTravelPassStopPricing';

export default function prepareTravelPassStop(instance: TravelPassStop): any {
  return {
    id: instance.stop.id,
    ...getIsPickupIsDropoffConfigJson(instance),
    prices: instance.pricings.map((each: TravelPassStopPricing) => prepareTravelPassStopPricing(each)),
  };
}

function getIsPickupIsDropoffConfigJson(instance: any) {
  if (instance.type === TravelStopType.TYPE_BOTH) {
    return { is_pickup: true, is_dropoff: true };
  } else if (instance.type === TravelStopType.TYPE_PICKUP) {
    return { is_pickup: true, is_dropoff: false };
  } else if (instance.type === TravelStopType.TYPE_DROPOFF) {
    return { is_pickup: false, is_dropoff: true };
  }

  throw new StopIsNotEitherPickupOrDropoffException();
}
