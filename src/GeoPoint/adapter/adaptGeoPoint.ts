import GeoPoint from '../entity/GeoPoint';

export default function adaptGeoPoint(json: any, instance: GeoPoint = new GeoPoint()): GeoPoint {
  if (!json) return instance;

  if (typeof json === 'string') {
    // backend sends us a string for the geo-position
    return GeoPoint.fromString(json);
  }

  if (json.latitude && json.longitude) {
    // backend sends us an object with `latitude` and `longitude` properties
    return GeoPoint.fromLatLng(Number(json.latitude), Number(json.longitude));
  }
}
