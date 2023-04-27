import Journey from '../entity/Journey';
import JourneyStop from '../../JourneyStop/entity/JourneyStop';
import clone from '../../common/utils/clone';
import JourneyVehicle from '../../JourneyVehicle/entity/JourneyVehicle';
import JourneyVehicleStop from '../../JourneyVehicleStop/entity/JourneyVehicleStop';
import adaptJourneyStop from '../../JourneyStop/adapter/adaptJourneyStop';
import adaptJourneyVehicle from '../../JourneyVehicle/adapter/adaptJourneyVehicle';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import UUID from '../../UUID/UUID';

export default function adaptJourney(json: any, instance: Journey = new Journey()): Journey {
  if (json.id || json.journey_id) {
    instance.id = json.journey_id || json.id;
    instance.uuid = UUID.fromString(instance.id);
    instance.name = json.name || json.journey_name || json.journey_group_name;
    instance.journey_group_id = json.journey_group_id;
    instance.product_name = json.product_name;
    instance.product_id = json.product_id;
    instance.tag_ids = json.tags || [];
    instance.is_night_shift = json.is_night_shift;
    adaptMarketTrait(json, instance);

    instance.occupancy_percentage = json.occupancy_percentage;
    instance.occupancy_value = json.occupancy_value;
    instance.profit_and_loss = json.profit_and_loss; // TODO: MoneyAdapter
    instance.margin_percentage = json.margin_percentage;

    instance.route_id = json.route_id;
    instance.type = json.journey_type;

    instance.stops = getJourneyStopsFromJSONJourney(json)
      .map((each: JourneyStop) => adaptJourneyStop(each))
      .sort((js1: JourneyStop, js2: JourneyStop) => {
        if (js1.departure_date.happensBefore(js2.departure_date)) return -1;
        if (js2.departure_date.happensBefore(js1.departure_date)) return 1;
        return 0;
      });

    instance.stops = instance.stops.map((each: JourneyStop, index) => {
      const newEach = clone(each);
      newEach.location_order = index;

      return newEach;
    });

    if (instance.stops.length >= 2) {
      const firstEnabledStop = instance.stops.find((eachStop) => !eachStop.isNotUsed) || instance.stops[0];
      const lastEnabledStop =
        instance.stops
          .slice()
          .reverse()
          .find((eachStop) => !eachStop.isNotUsed) || instance.stops[json.journey_stops.length - 1];

      instance.arrival_date = clone(lastEnabledStop.arrival_date);
      instance.departure_date = clone(firstEnabledStop.departure_date);
    }

    instance.journey_vehicles = (json.journey_vehicles || []).map((each: JourneyVehicle) => adaptJourneyVehicle(each));

    instance.seats_on_sale = json.seats_on_sale;

    instance.journey_vehicles = instance.journey_vehicles.map((eachJourneyVehicle: JourneyVehicle) => {
      eachJourneyVehicle.journey_id = instance.id;

      if (json.hasOwnProperty('is_shuttle')) {
        // IMPORTANT NOTE: is_shuttle is a property which backend is only sending when the Journey comes from a RecurringProduct
        eachJourneyVehicle.isRecurringProduct = true;
        eachJourneyVehicle.isShuttle = json.is_shuttle;
      }

      if (json.hasOwnProperty('scan_to_board')) {
        eachJourneyVehicle.isRecurringProduct = true;
        eachJourneyVehicle.isScanToBoard = json.scan_to_board;
      }

      eachJourneyVehicle.journey_vehicle_stops = eachJourneyVehicle.journey_vehicle_stops.map(
        (eachJourneyVehicleStop: JourneyVehicleStop) => {
          let found = null;
          (json.journey_vehicles || []).find((eachVehicle: any) => {
            found = eachVehicle.stops.find((each__unprocessed__JourneyVehicleStop: any) => {
              return each__unprocessed__JourneyVehicleStop.id === eachJourneyVehicleStop.id;
            });

            return found;
          });

          eachJourneyVehicleStop.journey_stop = instance.stops.find((each: any) => {
            return each.id === found.journey_stop_id;
          });

          return eachJourneyVehicleStop;
        }
      );

      eachJourneyVehicle.market = instance.market;

      return eachJourneyVehicle;
    });

    instance.isShuttle = json.is_shuttle;
    instance.isScanToBoard = json.scan_to_board;
    instance.isLoop = json.is_loop;
    instance.scheduleJourneyId = json.schedule_journey_id;

    instance.created = true;
    return instance;
  } else {
    return json;
  }
}

function getJourneyStopsFromJSONJourney(json) {
  return json.stops || json.journey_stops || [];
}
