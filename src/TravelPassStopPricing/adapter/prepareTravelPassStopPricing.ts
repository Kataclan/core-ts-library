import TravelPassStopPricing from '../entity/TravelPassStopPricing';
import prepareMoney from '../../Money/adapters/prepareMoney';

export default function prepareTravelPassStopPricing(instance: TravelPassStopPricing): any {
  let one_way_price = null;

  if (instance.leg_price) {
    one_way_price = prepareMoney(instance.leg_price);
  }

  return {
    destination_stop_id:
      instance.destination_stop && instance.destination_stop.stop
        ? instance.destination_stop.stop.id
        : instance.destination_stop_id,
    one_way_price,
  };
}
