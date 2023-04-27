import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';

export default function prepareJourneyVehicleState(
  data: { id: string; boardedTravelPlans: unknown; arrivalTime?: DateTimeZone; departureTime: DateTimeZone }[],
  journeyVehicleVersion = '1'
): unknown {
  return {
    journey_vehicle_version: journeyVehicleVersion,
    stops: data.map((eachData) => ({
      id: eachData.id,
      boarded_travel_plans: eachData.boardedTravelPlans || [],
      real_arrival_datetime: prepareDateTimeZone(eachData.arrivalTime),
      real_departure_datetime: prepareDateTimeZone(eachData.departureTime),
    })),
  };
}
