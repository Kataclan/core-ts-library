import TravelStopType from '../enums/TravelStopType';
import StopIsNotEitherPickupOrDropoffException from '../../common/exceptions/StopIsNotEitherPickupOrDropoffException';

export default function prepareTravelStopType(type: TravelStopType): any {
  if (type === TravelStopType.TYPE_BOTH) {
    return { is_pickup: true, is_dropoff: true };
  } else if (type === TravelStopType.TYPE_PICKUP) {
    return { is_pickup: true, is_dropoff: false };
  } else if (type === TravelStopType.TYPE_DROPOFF) {
    return { is_pickup: false, is_dropoff: true };
  }

  throw new StopIsNotEitherPickupOrDropoffException();
}
