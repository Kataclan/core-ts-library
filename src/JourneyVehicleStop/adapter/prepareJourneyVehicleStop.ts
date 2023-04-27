import JourneyVehicleStop from '../entity/JourneyVehicleStop';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';

export default function prepareJourneyVehicleStop(instance: JourneyVehicleStop): any {
  return {
    journey_stop_id: instance.journey_stop ? instance.journey_stop.id : instance.journey_stop_id,
    journey_vehicle_stop_id: instance.id,
    seats_available: instance.journey_stop ? instance.journey_stop.seats_available : 0,
    departure_datetime: prepareDateTimeZone(instance.scheduled_departure_time),
    arrival_datetime: prepareDateTimeZone(instance.scheduled_arrival_time),
  };
}
