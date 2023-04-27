import EventProduct from '../entity/EventProduct';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptTravelProduct from '../../TravelProduct/adapter/adaptTravelProduct';

export default function adaptEventProduct(json: any, instance: EventProduct = new EventProduct()): EventProduct {
  let instanceAdapted = <EventProduct>adaptTravelProduct(json, instance);

  instanceAdapted.from_date = adaptDateTimeZone(json.event_from_date);
  instanceAdapted.to_date = adaptDateTimeZone(json.event_to_date);

  return instanceAdapted;
}
