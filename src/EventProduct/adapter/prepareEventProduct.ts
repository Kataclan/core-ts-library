import EventProduct from '../entity/EventProduct';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import prepareTravelProduct from '../../TravelProduct/adapter/prepareTravelProduct';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareEventProduct(instance: EventProduct): any {
  return {
    ...prepareTravelProduct(instance),
    event_from_date: prepareDateTimeZone(instance.from_date),
    event_to_date: prepareDateTimeZone(instance.to_date),
    ...prepareMarketTrait(instance),
  };
}
