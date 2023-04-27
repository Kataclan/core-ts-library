import Stop from '../entity/Stop';
import prepareLocation from '../../Location/adapters/prepareLocation';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareStop(instance: Stop): any {
  return {
    id: instance.id,
    name: instance.name,
    site_code: instance.site_code,
    locations: (instance.locations || []).map((location) => prepareLocation(location)),
    ...prepareMarketTrait(instance),
  };
}
