export default class GeoPoint {
  latitude: number;
  longitude: number;

  static fromLatLng(latitude: number, longitude: number) {
    const newGeoPoint = new GeoPoint();
    newGeoPoint.latitude = latitude;
    newGeoPoint.longitude = longitude;
    return newGeoPoint;
  }

  static fromString(coordinates: string) {
    const [latitude, longitude] = coordinates.split(',');
    return this.fromLatLng(Number(latitude), Number(longitude));
  }

  toString() {
    return `${this.latitude},${this.longitude}`;
  }
}
