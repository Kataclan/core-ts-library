import Market from '../entity/Market';
import adaptMarket from './adaptMarket';

export default function adaptMarketTrait(json: any, instance: any): Market {
  if (!json.market_id) return instance;

  instance.market = adaptMarket({
    ...json,
    id: json.market_id,
  });

  return instance;
}
