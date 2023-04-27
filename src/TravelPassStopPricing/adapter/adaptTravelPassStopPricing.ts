import TravelPassStopPricing from '../entity/TravelPassStopPricing';
import adaptMoney from '../../Money/adapters/adaptMoney';

export default function adaptTravelPassStopPricing(
  json: any,
  instance: TravelPassStopPricing = new TravelPassStopPricing()
): TravelPassStopPricing {
  instance.leg_price = json.one_way_price;
  instance.destination_stop_id = json.destination_stop_id;

  if (json.one_way_price !== null) {
    instance.leg_price = adaptMoney(json.one_way_price);
  }

  return instance;
}
