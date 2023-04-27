import moment from 'moment';

import JourneyGroup from '../../JourneyGroup/entity/JourneyGroup';
import Journey from '../../Journey/entity/Journey';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import JourneyStop from '../../JourneyStop/entity/JourneyStop';
import JourneyVehicle from '../../JourneyVehicle/entity/JourneyVehicle';
import Supplier from '../../Supplier/entity/Supplier';
import Vehicle from '../../Vehicle/entity/Vehicle';
import UUID from '../../UUID/UUID';
import Route from '../../Route/entity/Route';
import TravelStopType from '../../TravelStop/enums/TravelStopType';

export default function adaptJourneys(json: any): any {
  return json.reduce((acc, journey) => {
    const journeyGroupIndex = acc.findIndex(
      (journeyGroup) => journey.journey_group.journey_group_id === journeyGroup.id
    );

    const adaptedJourney = new Journey();
    adaptedJourney.id = journey.journey_id;
    adaptedJourney.uuid = UUID.fromString(adaptedJourney.id);
    adaptedJourney.name = journey.name;

    if (journey.from_route) {
      adaptedJourney.route_id = journey.from_route.id;
      adaptedJourney.route = new Route();
      adaptedJourney.route.id = journey.from_route.id;
      adaptedJourney.route.uuid = UUID.fromString(journey.from_route.id);
      adaptedJourney.route.name = journey.from_route.name;
    }

    adaptedJourney.type = journey.type;
    adaptedJourney.is_night_shift = journey.is_night_shift;

    adaptedJourney.isLoop = journey.is_loop;
    adaptedJourney.isStarred = journey.is_starred;
    adaptedJourney.scheduleJourneyId = journey.schedule_journey_id;

    // This one is computed for every vehicle.
    // adaptedJourney.seats_on_sale = journey.seats_on_sale;
    adaptedJourney.seats_on_sale = 0;
    adaptedJourney.occupancy_value = journey.seats_sold;

    adaptedJourney.stops = journey.journey_stops
      .map((journeyStop) => {
        const adaptedJourneyStop = new JourneyStop();

        adaptedJourneyStop.id = journeyStop.journey_stop_id;
        adaptedJourneyStop.uuid = UUID.fromString(adaptedJourneyStop.id);
        adaptedJourneyStop.name = journeyStop.name;
        adaptedJourneyStop.dropoff = journeyStop.is_dropoff;
        adaptedJourneyStop.pickup = journeyStop.is_pickup;

        adaptedJourneyStop.arrival_date = adaptDateTimeZone(journeyStop.arrival_time);
        adaptedJourneyStop.departure_date = adaptDateTimeZone(journeyStop.departure_time);

        if (adaptedJourneyStop.pickup && adaptedJourneyStop.dropoff) {
          adaptedJourneyStop.type = TravelStopType.TYPE_BOTH;
        } else if (adaptedJourneyStop.pickup) {
          adaptedJourneyStop.type = TravelStopType.TYPE_PICKUP;
        } else if (adaptedJourneyStop.dropoff) {
          adaptedJourneyStop.type = TravelStopType.TYPE_DROPOFF;
        }

        adaptedJourneyStop.isNotUsed = journeyStop.is_not_used;
        adaptedJourneyStop.loopId = journeyStop.loop_id;

        return adaptedJourneyStop;
      })
      .sort((js1: JourneyStop, js2: JourneyStop) => {
        if (js1.departure_date.happensBefore(js2.departure_date)) return -1;
        if (js2.departure_date.happensBefore(js1.departure_date)) return 1;
        return 0;
      });

    const firstEnabledStop = adaptedJourney.stops.find((eachStop) => !eachStop.isNotUsed) || adaptedJourney.stops[0];
    const lastEnabledStop =
      adaptedJourney.stops
        .slice()
        .reverse()
        .find((eachStop) => !eachStop.isNotUsed) || adaptedJourney.stops[adaptedJourney.stops.length - 1];
    adaptedJourney.departure_date = firstEnabledStop.departure_date;
    adaptedJourney.arrival_date = lastEnabledStop.arrival_date;

    adaptedJourney.journey_vehicles = journey.journey_vehicles.map((journeyVehicle) => {
      const adaptedJourneyVehicle = new JourneyVehicle();
      adaptedJourneyVehicle.id = journeyVehicle.journey_vehicle_id;
      adaptedJourneyVehicle.uuid = UUID.fromString(adaptedJourneyVehicle.id);
      adaptedJourneyVehicle.seats_on_sale = +(journeyVehicle.vehicle.capacity || 0);
      adaptedJourneyVehicle.seats_sold = +(journeyVehicle.vehicle.allocated_people || 0);
      adaptedJourneyVehicle.is_completed = journeyVehicle.is_completed;

      adaptedJourney.seats_on_sale += +journeyVehicle.vehicle.capacity;

      if (journeyVehicle.supplier.supplier_id) {
        const adaptedSupplier = new Supplier();
        adaptedSupplier.name = journeyVehicle.supplier.name;
        adaptedSupplier.id = journeyVehicle.supplier.supplier_id;
        adaptedSupplier.uuid = UUID.fromString(adaptedSupplier.id);
        adaptedJourneyVehicle.supplier = adaptedSupplier;
      }

      const adaptedVehicle = new Vehicle();
      adaptedVehicle.id = journeyVehicle.vehicle.vehicle_id;
      adaptedVehicle.uuid = UUID.fromString(adaptedVehicle.id);
      adaptedVehicle.reg_number = journeyVehicle.vehicle.registration_number;
      adaptedJourneyVehicle.vehicle = adaptedVehicle;

      return adaptedJourneyVehicle;
    });

    if (journeyGroupIndex === -1) {
      const newJG = new JourneyGroup();
      newJG.id = journey.journey_group.journey_group_id;
      newJG.uuid = UUID.fromString(newJG.id);

      const mom = moment(journey.journey_group.date_time.split(' ')[0], 'YYYYMMDDHHmmss');
      newJG.date = mom.format('YYYY-MM-DD');

      newJG.journeys = [adaptedJourney];
      acc.push(newJG);
    } else {
      acc[journeyGroupIndex].journeys.push(adaptedJourney);
    }

    return acc;
  }, []);
}
