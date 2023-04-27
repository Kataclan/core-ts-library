import TravelStopPricing from '../entity/TravelStopPricing';
import Money from '../../Money/entity/Money';
import prepareMoney from '../../Money/adapters/prepareMoney';

export default function prepareTravelStopPricing(instance: TravelStopPricing): object {
  let one_way_price: Money = null;

  if (instance.one_leg_price) {
    one_way_price = prepareMoney(instance.one_leg_price);
  }

  let return_price: Money = null;
  if (instance.two_legs_price) {
    return_price = prepareMoney(instance.two_legs_price);
  }

  return {
    destination_stop_id:
      instance.destination_stop_id ||
      (instance.destination_stop ? instance.destination_stop.id : instance.destination_stop),
    one_way_price,
    return_price,
  };
}
