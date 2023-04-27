import moment from 'moment';
import JourneyStop from '../entity/JourneyStop';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptTravelStop from '../../TravelStop/adapter/adaptTravelStop';
import TravelStopType from '../../TravelStop/enums/TravelStopType';
import UUID from '../../UUID/UUID';

export default function adaptJourneyStop(json: any, instance: JourneyStop = new JourneyStop()): JourneyStop {
  const adapted = <JourneyStop>adaptTravelStop(json, instance);
  adapted.id = json.journey_stop_id || json.id;
  adapted.uuid = UUID.fromString(adapted.id);
  adapted.arrival_date = adaptDateTimeZone(json.arrival_datetime);
  adapted.departure_date = adaptDateTimeZone(json.departure_datetime);
  instance.stop_waiting_time = !json.loop_id
    ? moment(adapted.departure_date.datetime).diff(moment(adapted.arrival_date.datetime), 'minutes')
    : json.stop_waiting_time;
  adapted.seats_available = json.seats_available;
  adapted.dropoff = json.is_dropoff;
  adapted.pickup = json.is_pickup;
  adapted.isNotUsed = json.is_not_used;
  adapted.loopId = json.loop_id;

  if (adapted.pickup && adapted.dropoff) {
    instance.type = TravelStopType.TYPE_BOTH;
  } else if (adapted.pickup) {
    instance.type = TravelStopType.TYPE_PICKUP;
  } else if (adapted.dropoff) {
    instance.type = TravelStopType.TYPE_DROPOFF;
  }

  return adapted;
}
