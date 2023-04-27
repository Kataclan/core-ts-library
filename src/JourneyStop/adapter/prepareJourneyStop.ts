import JourneyStop from '../entity/JourneyStop';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import TravelStopType from '../../TravelStop/enums/TravelStopType';
import prepareTravelStop from '../../TravelStop/adapter/prepareTravelStop';

export default function prepareJourneyStop(instance: JourneyStop): any {
  return {
    ...prepareTravelStop(instance),
    id: instance.id,
    departure_datetime: instance.departure_date ? prepareDateTimeZone(instance.departure_date) : void 0,
    arrival_datetime: instance.arrival_date ? prepareDateTimeZone(instance.arrival_date) : void 0,
    seats_available: instance.seats_available,
    pickup: instance.type === TravelStopType.TYPE_BOTH || instance.type === TravelStopType.TYPE_PICKUP,
    dropoff: instance.type === TravelStopType.TYPE_BOTH || instance.type === TravelStopType.TYPE_DROPOFF,
    stop_waiting_time: instance.stop_waiting_time,
    is_not_used: instance.isNotUsed,
    loop_id: instance.loopId,
  };
}
