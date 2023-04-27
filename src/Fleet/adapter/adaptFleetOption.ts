import FleetOption from '../entity/FleetOption';
import { baseAdapter } from '../../common/adapters/baseAdapter';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';

export default function adaptFleetOption(json: adaptFleetType, instance: FleetOption = new FleetOption()): FleetOption {
  baseAdapter(json.id, instance);

  adaptMarketTrait(json, instance);

  instance.name = json.name;

  return instance;
}

type adaptFleetType = {
  id: string;
  market_id: string;
  name: string;
};
