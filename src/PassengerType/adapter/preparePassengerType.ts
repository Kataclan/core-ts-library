import PassengerType from '../entity/PassengerType';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function preparePassengerType(instance: PassengerType): any {
  return {
    id: instance.uuid.id,
    name: instance.name,
    ...prepareMarketTrait(instance),
  };
}
