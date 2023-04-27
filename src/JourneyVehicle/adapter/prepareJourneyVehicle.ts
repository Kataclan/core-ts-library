import JourneyVehicle from '../entity/JourneyVehicle';
import JourneyVehicleStop from '../../JourneyVehicleStop/entity/JourneyVehicleStop';
import preparePhoneNumber from '../../PhoneNumber/adapter/preparePhoneNumber';
import Money from '../../Money/entity/Money';
import prepareJourneyVehicleStop from '../../JourneyVehicleStop/adapter/prepareJourneyVehicleStop';
import Journey from '../../Journey/entity/Journey';

export default function prepareJourneyVehicle(instance: JourneyVehicle, journey: Journey): object {
  const driver_phone_number = preparePhoneNumber(instance.driver_phone);
  const passenger_helpline = preparePhoneNumber(instance.passenger_helpline);
  const driver_helpline = preparePhoneNumber(instance.driver_helpline);
  const on_the_day_contact_number = preparePhoneNumber(instance.supplier_phone);

  // TODO: Technical debt: cost + currency should be Money in 1 field, not in 2 fields.
  // TODO: Technical debt: phone number should be 1 field, not 3.
  return {
    id: instance.id, // Needed for the adapter.
    journey_vehicle_id: instance.id,
    seats: instance.seats,
    seats_on_sale: instance.seats_on_sale,
    journey_vehicle_linked: '',
    extras_cost: prepareCost(instance.extras_cost),
    extras_cost_currency: prepareCurrency(instance.extras_cost),
    vehicle_cost: prepareCost(instance.supply_cost),
    vehicle_cost_currency: prepareCurrency(instance.supply_cost),
    service_fee: prepareCost(instance.service_fee),
    service_fee_currency: prepareCurrency(instance.service_fee),
    stops: (instance.journey_vehicle_stops || [])
      .filter((eachJourneyVehicleStop: JourneyVehicleStop) => {
        return journey.hasJourneyStopId(eachJourneyVehicleStop.journey_stop_id);
      })
      .map((eachJourneyVehicleStop: JourneyVehicleStop) => {
        return prepareJourneyVehicleStop(eachJourneyVehicleStop);
      }),
    supplier_id: instance.supplier ? instance.supplier.id : instance.supplier_id ? instance.supplier_id : void 0,
    vehicle_id: instance.vehicle ? instance.vehicle.id : void 0,
    registration_number: instance.reg_number,
    vehicle_description: instance.vehicle_description,
    driver_id: instance.driver_id,
    driver_name: instance.driver_name,
    driver_phone_number_number: driver_phone_number ? driver_phone_number.phone_number : void 0,
    driver_phone_number_prefix: driver_phone_number ? driver_phone_number.phone_prefix : void 0,
    driver_phone_number_country_code: driver_phone_number ? driver_phone_number.phone_country_code : void 0,
    passenger_helpline_number: passenger_helpline ? passenger_helpline.phone_number : void 0,
    passenger_helpline_prefix: passenger_helpline ? passenger_helpline.phone_prefix : void 0,
    passenger_helpline_country_code: passenger_helpline ? passenger_helpline.phone_country_code : void 0,
    driver_helpline_number: driver_helpline ? driver_helpline.phone_number : void 0,
    driver_helpline_prefix: driver_helpline ? driver_helpline.phone_prefix : void 0,
    driver_helpline_country_code: driver_helpline ? driver_helpline.phone_country_code : void 0,
    on_the_day_contact_number_number: on_the_day_contact_number ? on_the_day_contact_number.phone_number : void 0,
    on_the_day_contact_number_prefix: on_the_day_contact_number ? on_the_day_contact_number.phone_prefix : void 0,
    on_the_day_contact_number_country_code: on_the_day_contact_number
      ? on_the_day_contact_number.phone_country_code
      : void 0,
  };
}

function prepareCost(fromValue: Money) {
  return fromValue && fromValue.amount ? fromValue.amount * Math.pow(10, fromValue.currency.decimal_precision) : null;
}

function prepareCurrency(fromValue: Money) {
  return fromValue && fromValue.amount ? fromValue.currency.iso_code : null;
}
