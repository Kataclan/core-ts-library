import JourneyVehicleStop from '../entity/JourneyVehicleStop';
import UUID from '../../UUID/UUID';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import adaptTravelStopType from '../../TravelStop/adapter/adaptTravelStopType';
import adaptGeoPoint from '../../GeoPoint/adapter/adaptGeoPoint';
import adaptETA from '../../ETA/adapter/adaptETA';

export default function adaptJourneyVehicleStop(
  json: any,
  instance: JourneyVehicleStop = new JourneyVehicleStop()
): JourneyVehicleStop {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.name = json.name || json.location.name;
  instance.journey_stop_id = json.journey_stop_id;
  instance.type = adaptTravelStopType(json);
  instance.scheduled_arrival_time = adaptDateTimeZone(json.arrival_datetime);
  instance.scheduled_departure_time = adaptDateTimeZone(json.departure_datetime);
  instance.actual_arrival_time = adaptDateTimeZone(
    json.real_arrival_datetime,
    new DateTimeZone(),
    instance.scheduled_arrival_time.timezone
  );
  instance.actual_departure_time = adaptDateTimeZone(
    json.real_departure_datetime,
    new DateTimeZone(),
    instance.scheduled_departure_time.timezone
  );
  instance.geoPoint = adaptGeoPoint(json.location);
  instance.locationName = json.location.name;
  instance.ETA = adaptETA(json.ETA);

  instance.passengersCounter = Number(json.passengers_counter || 0);

  instance.isNotUsed = json.is_not_used;
  instance.loopId = json.loop_id;

  return instance;
}
