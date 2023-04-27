export default function adaptTimeBetweenLocations(response: any): object {
  return {
    meters: response.meters,
    minutes: response.minutes
  };
}
