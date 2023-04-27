export default function prepareJourneyVehicleTrackingPoint(data: {
  appVersion: string;
  osVersion: string;
  heading: string;
  accuracy: string;
  phoneCountryCode: string;
  phonePrefix: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  deviceId: string;
  locationTime: string;
}): unknown {
  return {
    appVersion: data.appVersion,
    osVersion: data.osVersion,
    heading: data.heading,
    accuracy: Number(data.accuracy),
    phone_country_code: data.phoneCountryCode,
    phone_prefix: Number(data.phonePrefix),
    phone_number: Number(data.phoneNumber),
    latitude: data.latitude?.toString(),
    longitude: data.longitude?.toString(),
    device_id: data.deviceId,
    location_time: data.locationTime,
  };
}
