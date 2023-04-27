import TravelStopPricing from '../entity/TravelStopPricing';
import adaptMoney from '../../Money/adapters/adaptMoney';

export default function adaptTravelStopPricing(json: any, instance: TravelStopPricing): TravelStopPricing {
  instance.one_leg_price = adaptMoney(json.one_way_price);
  instance.two_legs_price = adaptMoney(json.return_price);
  instance.destination_stop_id = json.destination_stop_id;

  return instance;
}
