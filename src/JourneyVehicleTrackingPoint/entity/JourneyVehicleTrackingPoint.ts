import GeoPoint from '../../GeoPoint/entity/GeoPoint';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';

export default class JourneyVehicleTrackingPoint {
  geoPoint: GeoPoint;
  time: DateTimeZone;
  created_at: number;
  heading: number;
  journey_vehicle_id: string;
  device_id: string;

  constructor() {}

  getLatitude(): number {
    return this.geoPoint.latitude;
  }

  getLongitude(): number {
    return this.geoPoint.longitude;
  }
}
