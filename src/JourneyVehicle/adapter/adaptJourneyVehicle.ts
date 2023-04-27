import JourneyVehicle from '../entity/JourneyVehicle';
import adaptMoney from '../../Money/adapters/adaptMoney';
import JourneyVehicleStop from '../../JourneyVehicleStop/entity/JourneyVehicleStop';
import adaptJourneyVehicleStop from '../../JourneyVehicleStop/adapter/adaptJourneyVehicleStop';
import adaptPhoneNumber, { adaptNullablePhoneNumber } from '../../PhoneNumber/adapter/adaptPhoneNumber';
import Supplier from '../../Supplier/entity/Supplier';
import Vehicle from '../../Vehicle/entity/Vehicle';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import UUID from '../../UUID/UUID';
import adaptJourneyVehicleNote from './adaptJourneyVehicleNote';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptSupplier from '../../Supplier/adapter/adaptSupplier';
import Journey from '../../Journey/entity/Journey';
import JourneyVehicleIssueSeverity from '../enums/JourneyVehicleIssueSeverity';
import JourneyVehicleServiceMetrics from '../enums/JourneyVehicleServiceMetrics';
import Driver from '../../Driver/entity/Driver';

function extractCodeFromDriverLink(driverLink) {
  const splitted = driverLink.split('/');
  return splitted[splitted.length - 1];
}

export default function adaptJourneyVehicle(
  json: any,
  instance: JourneyVehicle = new JourneyVehicle()
): JourneyVehicle {
  instance.id = json.id || json.journey_vehicle_id;
  instance.uuid = UUID.fromString(instance.id);
  instance.code = json.code || extractCodeFromDriverLink(json.driver_link);
  adaptMarketTrait(json, instance);
  instance.dbsCheck = json.dbs_check;

  instance.seats = json.total_seats || json.seats;
  instance.seats_on_sale = json.seats_on_sale;

  instance.expected_delay = json.expected_delay;
  instance.real_arrival_date = json.real_arrival_date ? adaptDateTimeZone(json.real_arrival_date) : null;

  // Specific payload that comes from the /zeelo-live endpoint
  instance.seats_sold = json.seats_sold;

  instance.review_status = json.review_status;
  instance[JourneyVehicleServiceMetrics.FLAG_ESCALATED] = json.issue?.escalation_issue ?? false;
  instance[JourneyVehicleServiceMetrics.FLAG_FULL_APP_USAGE] = json.issue?.full_app_usage_issue ?? false;
  instance[JourneyVehicleServiceMetrics.FLAG_ON_TIME] = json.issue?.on_time_issue ?? false;
  instance[JourneyVehicleServiceMetrics.FLAG_TRACKING] = json.issue?.tracking_issue ?? false;
  instance[JourneyVehicleServiceMetrics.FLAG_VEHICLE_QUALITY] = json.issue?.vehicle_quality_issue ?? false;
  instance.current_journey_vehicle_stop_id = json.current_stop;
  instance.next_journey_vehicle_stop_id = json.next_stop;
  instance.jobsheet_sent = json.jobsheet_sent;
  instance.is_completed = json.is_completed;
  instance.isStarred = json.is_starred;
  instance.emergencyContactPhone = adaptNullablePhoneNumber(json.emergency_contact_number);

  if (json.driver_id) {
    instance.driver = new Driver();
    instance.driver.id = json.driver_id;
    instance.driver.uuid.id = json.driver_id;
    instance.driver.market = instance.market;
    instance.driver_id = json.driver_id;

    // Because it can come as "" which evaluates as false.
    if ('driver_name' in json) {
      instance.driver_name = json.driver_name;
      instance.driver.first_name = json.driver_name;
    } else if ('driver' in json) {
      instance.driver_name = json.driver.driver_name;
      instance.driver.first_name = json.driver.driver_name;
    }
  }

  if (json.driver?.driver_code) {
    instance.driverCode = json.driver.driver_code;
  }

  if (json.supplier_id) {
    instance.supplier = new Supplier();
    instance.supplier.id = json.supplier_id;
    instance.supplier.uuid = UUID.fromString(json.supplier_id);
    instance.supplier_id = json.supplier_id; // TODO: Unify every supplier_id thing to supplier.id.
  }

  // Specific payload that comes from the /zeelo-live endpoint
  if (json.supplier && json.supplier.id) {
    instance.supplier = adaptSupplier(json.supplier);
  }

  instance.journey_id = json.journey_id;

  // Specific payload that comes from the /zeelo-live endpoint
  instance.journey = new Journey();
  instance.journey.uuid = UUID.fromString(json.journey_id);
  instance.journey.id = json.journey_id;
  instance.journey.name = json.journey_name;
  instance.journey.is_night_shift = json.journey_is_night_shift;
  instance.journey.product_id = json.product_id;

  instance.way_status = json.way_status;

  if (json.driver_phone_number_number) {
    instance.driver_phone.number = json.driver_phone_number_number.toString();
    instance.driver_phone.prefix = json.driver_phone_number_prefix.toString();
    instance.driver_phone.country_code = json.driver_phone_number_country_code.toLowerCase();
  } else if (json.driver && json.driver.driver_phone_number) {
    instance.driver_phone = adaptPhoneNumber(json.driver.driver_phone_number);
  }

  if (json.on_the_day_contact_number_number) {
    instance.supplier_phone.number = json.on_the_day_contact_number_number.toString();
    instance.supplier_phone.prefix = json.on_the_day_contact_number_prefix.toString();
    instance.supplier_phone.country_code = json.on_the_day_contact_number_country_code.toLowerCase();
  } else if (json.driver && json.driver.on_the_day_contact_number) {
    instance.supplier_phone = adaptPhoneNumber(json.driver.on_the_day_contact_number);
  }

  if (json.passenger_helpline_number) {
    instance.passenger_helpline.number = json.passenger_helpline_number.toString();
    instance.passenger_helpline.prefix = json.passenger_helpline_prefix.toString();
    instance.passenger_helpline.country_code = json.passenger_helpline_country_code.toLowerCase();

    // TODO: This key does not come from the endpoint.
  } else if (json.driver && json.driver.passenger_helpline) {
    instance.passenger_helpline = adaptPhoneNumber(json.driver.passenger_helpline);
  }

  if (json.driver_helpline_number) {
    instance.driver_helpline.number = json.driver_helpline_number.toString();
    instance.driver_helpline.prefix = json.driver_helpline_prefix.toString();
    instance.driver_helpline.country_code = json.driver_helpline_country_code.toLowerCase();

    // TODO: Now the driver helpline is sitting at driver object key and should be sitting at the same level because it is not related with drivers themselves.
  } else if (json.driver && json.driver.driver_helpline) {
    instance.driver_helpline = adaptPhoneNumber(json.driver.driver_helpline);
  }

  instance.supply_cost = json.vehicle_cost ? adaptMoney(json.vehicle_cost) : null;
  instance.extras_cost = json.extras_cost ? adaptMoney(json.extras_cost) : null;
  instance.service_fee = json.service_fee ? adaptMoney(json.service_fee) : null;

  instance.journey_vehicle_stops = (json.journey_vehicle_stops || json.stops || []).map((item) =>
    adaptJourneyVehicleStop(item)
  );

  instance.journey_vehicle_stops = instance.journey_vehicle_stops.sort(
    (jvs1: JourneyVehicleStop, jvs2: JourneyVehicleStop) => {
      if (jvs1.scheduled_arrival_time.happensBefore(jvs2.scheduled_arrival_time)) return -1;
      if (jvs2.scheduled_arrival_time.happensBefore(jvs1.scheduled_arrival_time)) return 1;
      return 0;
    }
  );

  if (json.vehicle_id) {
    instance.vehicle = new Vehicle();
    instance.vehicle.id = json.vehicle_id;
    instance.vehicle.uuid.id = json.vehicle_id;
    instance.vehicle.reg_number = json.registration_number;
    instance.vehicle.description = json.vehicle_description;
  }

  instance.reg_number = json.registration_number;
  instance.vehicle_description = json.vehicle_description;

  if (json.departure_date) {
    instance.departure_date = adaptDateTimeZone(json.departure_date);
  } else {
    instance.calculateDepartureFromStops();
  }

  if (json.arrival_date) {
    instance.arrival_date = adaptDateTimeZone(json.arrival_date);
  } else {
    instance.calculateArrivalFromStops();
  }

  instance.is_muted = json.is_muted;
  instance.is_resolved = json.is_resolved;
  instance.follower_notifications_are_enabled = json.follower_notifications_enabled;
  instance.resolved_until = adaptDateTimeZone(json.resolved_until);

  if (json.operator_id) {
    instance.operatorId = UUID.fromString(json.operator_id);
  }

  adaptJourneyVehicleActivity(json.issues_list || [], instance);

  if (json.extra_data?.issue_severity_counters) {
    instance.severityCounters = {
      [JourneyVehicleIssueSeverity.MINOR]: json.extra_data.issue_severity_counters[JourneyVehicleIssueSeverity.MINOR],
      [JourneyVehicleIssueSeverity.MODERATE]:
        json.extra_data.issue_severity_counters[JourneyVehicleIssueSeverity.MODERATE],
      [JourneyVehicleIssueSeverity.IMPORTANT]:
        json.extra_data.issue_severity_counters[JourneyVehicleIssueSeverity.IMPORTANT],
      [JourneyVehicleIssueSeverity.CRITICAL]:
        json.extra_data.issue_severity_counters[JourneyVehicleIssueSeverity.CRITICAL],
    };
  }

  if (json.hasOwnProperty('is_shuttle') || json.extra_data?.hasOwnProperty('is_shuttle')) {
    // IMPORTANT NOTE: is_shuttle is a property which backend is only sending when the JourneyVehicle comes from a RecurringProduct
    // we need isRecurringProduct to identify the vehicle coming from a RecurringProduct service, this is why we need to keep this ugly if
    instance.isRecurringProduct = true;
    instance.isShuttle = json.is_shuttle || json.extra_data?.is_shuttle;
  }

  if (json.hasOwnProperty('scan_to_board') || json.extra_data?.hasOwnProperty('scan_to_board')) {
    instance.isRecurringProduct = true;
    instance.isScanToBoard = json.scan_to_board || json.extra_data?.scan_to_board;
  }

  instance.isLoop = json.is_loop || json.extra_data?.is_loop || false;

  instance.version = json.version;

  return instance;
}

export function adaptJourneyVehicleActivity(activityList, journeyVehicle) {
  journeyVehicle.issues_list = activityList.map((eachActivity) => {
    const note = adaptJourneyVehicleNote(eachActivity);
    note.journey_vehicle_id = journeyVehicle.uuid.id;
    return note;
  });

  return journeyVehicle;
}
