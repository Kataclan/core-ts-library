import Journey from '../../Journey/entity/Journey';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import preparePhoneNumber from '../../PhoneNumber/adapter/preparePhoneNumber';
import JourneyVehicle from '../../JourneyVehicle/entity/JourneyVehicle';
import RecurringProduct from '../entity/RecurringProduct';
import JourneyStop from '../../JourneyStop/entity/JourneyStop';
import prepareJourneyStop from '../../JourneyStop/adapter/prepareJourneyStop';
import Money from '../../Money/entity/Money';

export default function prepareCreateJourney(journey: Journey, product: RecurringProduct): any {
  return {
    journey_group: {
      journey_group_id: journey.journey_group_id,
      name: journey.route.name,
      date: prepareDateTimeZone(journey.departure_date, product.timezone),
      concessions: null,
    },
    id: journey.id,
    created_from_route: journey.route_id,
    name: journey.name,
    seats_on_sale: journey.seats_on_sale,
    type: journey.type,
    departure_datetime: prepareDateTimeZone(journey.departure_date),
    arrival_datetime: prepareDateTimeZone(journey.arrival_date),
    is_night_shift: journey.is_night_shift,
    is_loop: journey.isLoop,
    journey_stops: journey.stops.map((each: JourneyStop) => prepareJourneyStop(each)),
    schedule_journey_id: journey.scheduleJourneyId,
    vehicles: journey.journey_vehicles.map((each: JourneyVehicle) => {
      return {
        vehicle_id: each.id,
        supplier_id: each.supplier ? each.supplier.id : each.supplier_id ? each.supplier_id : void 0,
        seats_on_sale: each.seats_on_sale,
        passenger_helpline: preparePhoneNumber(each.passenger_helpline),
        driver_helpline: preparePhoneNumber(each.driver_helpline),
        vehicle_cost: prepareCost(each.supply_cost),
        vehicle_cost_currency: prepareCurrency(each.supply_cost),
        service_fee: prepareCost(each.service_fee),
        service_fee_currency: prepareCurrency(each.service_fee),
      };
    }),
  };
}

function prepareCost(fromValue: Money) {
  return fromValue && fromValue.amount ? fromValue.amount * Math.pow(10, fromValue.currency.decimal_precision) : null;
}

function prepareCurrency(fromValue: Money) {
  return fromValue && fromValue.amount ? fromValue.currency.iso_code : null;
}
