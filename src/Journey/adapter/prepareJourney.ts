import Journey from '../entity/Journey';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import JourneyStop from '../../JourneyStop/entity/JourneyStop';
import JourneyVehicle from '../../JourneyVehicle/entity/JourneyVehicle';
import prepareJourneyStop from '../../JourneyStop/adapter/prepareJourneyStop';
import prepareJourneyVehicle from '../../JourneyVehicle/adapter/prepareJourneyVehicle';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareJourney(instance: Journey): any {
  if (instance.route && instance.route.stops.length >= 2) {
    instance.departure_date.timezone = instance.route.stops[0].location.timezone;
    instance.arrival_date.timezone = instance.route.stops[instance.route.stops.length - 1].location.timezone;
  } else if (instance.stops.length >= 2) {
    const firstEnabledStop = instance.stops.find((eachStop) => !eachStop.isNotUsed) || instance.stops[0];
    const lastEnabledStop =
      instance.stops
        .slice()
        .reverse()
        .find((eachStop) => !eachStop.isNotUsed) || instance.stops[instance.stops.length - 1];
    instance.departure_date = firstEnabledStop.departure_date;
    instance.arrival_date = lastEnabledStop.arrival_date;
  }

  return {
    id: instance.id,
    journey_id: instance.id,
    journey_name: instance.name,
    journey_group_id: instance.journey_group_id,
    route_id: instance.route ? instance.route.id : instance.route_id,
    departure_datetime: prepareDateTimeZone(instance.departure_date),
    arrival_datetime: prepareDateTimeZone(instance.arrival_date),
    is_night_shift: instance.is_night_shift,
    type: instance.type,
    seats_on_sale: instance.seats_on_sale,
    seats_available: instance.seats_on_sale,
    stops: instance.stops.map((each: JourneyStop) => prepareJourneyStop(each)),
    journey_vehicles: instance.journey_vehicles.map((eachJourneyVehicle: JourneyVehicle) => {
      return prepareJourneyVehicle(eachJourneyVehicle, instance);
    }),

    // Used when creating journey from route with no stop waiting times.
    stop_waiting_time: instance.stop_waiting_time,

    is_loop: instance.isLoop,
    schedule_journey_id: instance.scheduleJourneyId,

    new_journey: instance.new_journey ? instance.new_journey : void 0,
    tags: instance.data_labels.getAll().map((each) => each.id),
    ...prepareMarketTrait(instance),
  };
}
