import JourneyVehicleTrackingPoint from '../entity/JourneyVehicleTrackingPoint';
import adaptGeoPoint from '../../GeoPoint/adapter/adaptGeoPoint';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';

export default function adaptJourneyVehicleTrackingPoint(
  json: any,
  instance: JourneyVehicleTrackingPoint = new JourneyVehicleTrackingPoint()
): JourneyVehicleTrackingPoint {
  instance.geoPoint = adaptGeoPoint({ latitude: json.latitude, longitude: json.longitude });
  instance.time = adaptDateTimeZone(json.time);
  instance.created_at = Number(json.created_at);
  instance.heading = Number(json.heading);
  instance.journey_vehicle_id = json.journey_vehicle_id;
  instance.device_id = json.device_id;

  return instance;
}
