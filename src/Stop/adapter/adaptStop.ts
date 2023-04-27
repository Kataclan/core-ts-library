import Stop from '../entity/Stop';
import UUID from '../../UUID/UUID';
import adaptLocation from '../../Location/adapters/adaptLocation';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';

export default function adaptStop(json: any, instance: Stop = new Stop()): Stop {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.name = json.name;
  instance.locations = (json.locations || []).map((location) => adaptLocation(location));
  instance.is_hidden = json.is_hidden;
  instance.site_code = json.site_code;
  adaptMarketTrait(json, instance);

  return instance;
}
