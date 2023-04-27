import JourneyVehicleNote from './JourneyVehicleNote';
import User from '../../User/entity/User';

export default class JourneyVehicleComment extends JourneyVehicleNote {
  private _text: string;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  static create({ text, journey_vehicle_id, user_id, user_name, created_at }): JourneyVehicleComment {
    const jvmi = new JourneyVehicleComment();

    // Self
    jvmi.text = text;

    // Parent
    jvmi.author = new User();
    jvmi.author.id = user_id;
    jvmi.author.uuid.id = user_id;
    jvmi.author.name = user_name;
    jvmi.journey_vehicle_id = journey_vehicle_id;
    jvmi.created_at = created_at;

    return jvmi;
  }

  isNote(): boolean {
    return true;
  }
}
