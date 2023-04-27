import TravelStopType from '../enums/TravelStopType';
import StopIsNotEitherPickupOrDropoffException from '../../common/exceptions/StopIsNotEitherPickupOrDropoffException';

export default function adaptTravelStopType(json: any): TravelStopType {
  if (json.is_pickup && json.is_dropoff) {
    return TravelStopType.TYPE_BOTH;
  } else if (json.is_pickup && !json.is_dropoff) {
    return TravelStopType.TYPE_PICKUP;
  } else if (!json.is_pickup && json.is_dropoff) {
    return TravelStopType.TYPE_DROPOFF;
  }

  throw new StopIsNotEitherPickupOrDropoffException();
}
