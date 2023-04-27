import JourneyVehicleNote from './JourneyVehicleNote';
import JourneyVehicleActivityType from '../enums/JourneyVehicleActivityType';
import UUID from '../../UUID/UUID';
import User from '../../User/entity/User';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';

export default class JourneyVehicleActivity extends JourneyVehicleNote {
  activity_type: JourneyVehicleActivityType;
  journey_stop_id: UUID;
  journey_stop_name: string;
  journey_vehicle_stop_id: UUID;
  minutes_difference: number;
  total_services: number;
  arrival_datetime: DateTimeZone;

  isOfType(type: JourneyVehicleActivityType): boolean {
    return this.activity_type === type;
  }

  isDriverHasStartedJourney(): boolean {
    return this.isOfType(JourneyVehicleActivityType.DRIVER_STARTED_JOURNEY);
  }

  static create({
    type,
    journey_vehicle_id,
    journey_stop_id,
    journey_stop_name,
    minutes,
    user_id,
    user_name,
    created_at,
  }): JourneyVehicleActivity {
    const jva = new JourneyVehicleActivity();

    // Self
    jva.activity_type = type;
    jva.journey_stop_id = journey_stop_id;
    jva.journey_stop_name = journey_stop_name;
    jva.minutes_difference = minutes;

    // Parent
    jva.author = new User();
    jva.author.id = user_id;
    jva.author.uuid.id = user_id;
    jva.author.name = user_name;
    jva.journey_vehicle_id = journey_vehicle_id;
    jva.created_at = created_at;

    return jva;
  }

  isAutomaticIssue(): boolean {
    return true;
  }

  isNewDriver(): boolean {
    return this.activity_type === JourneyVehicleActivityType.NEW_DRIVER;
  }

  getETAArrivalTime() {
    if (!this.arrival_datetime) return null;

    return this.arrival_datetime.momentify().add(this.minutes_difference, 'minutes').format('HH:mm');
  }
}
