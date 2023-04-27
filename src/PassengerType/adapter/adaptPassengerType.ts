import PassengerType from '../entity/PassengerType';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import UUID from '../../UUID/UUID';

export default function adaptPassengerType(json: any, instance: PassengerType = new PassengerType()): PassengerType {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.name = json.name;
  adaptMarketTrait(json, instance);

  return instance;
}
