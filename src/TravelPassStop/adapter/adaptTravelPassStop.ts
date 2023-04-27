import TravelPassStop from '../entity/TravelPassStop';
import adaptStop from '../../Stop/adapter/adaptStop';
import TravelStopType from '../../TravelStop/enums/TravelStopType';
import StopIsNotEitherPickupOrDropoffException from '../../common/exceptions/StopIsNotEitherPickupOrDropoffException';
import adaptTravelPassStopPricing from '../../TravelPassStopPricing/adapter/adaptTravelPassStopPricing';
import UUID from '../../UUID/UUID';

export default function adaptTravelPassStop(
  json: any,
  instance: TravelPassStop = new TravelPassStop()
): TravelPassStop {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.stop = adaptStop(json);
  instance.type = getTypeFromIsPickupIsDropoff(json);
  instance.pricings = (json.prices || []).map((each) => adaptTravelPassStopPricing(each));

  return instance;
}

function getTypeFromIsPickupIsDropoff(json) {
  if (json.is_pickup && json.is_dropoff) {
    return TravelStopType.TYPE_BOTH;
  } else if (json.is_pickup && !json.is_dropoff) {
    return TravelStopType.TYPE_PICKUP;
  } else if (!json.is_pickup && json.is_dropoff) {
    return TravelStopType.TYPE_DROPOFF;
  }

  throw new StopIsNotEitherPickupOrDropoffException();
}
