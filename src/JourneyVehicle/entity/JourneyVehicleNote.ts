import BaseEntity from '../../common/entities/BaseEntity';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import UUID from '../../UUID/UUID';
import User from '../../User/entity/User';

export default abstract class JourneyVehicleNote extends BaseEntity {
  author: User;
  created_at: DateTimeZone = new DateTimeZone();
  updated_at: DateTimeZone = new DateTimeZone();
  journey_vehicle_id: UUID;
  extra_data: any = {};

  isManualIssue(): boolean {
    return false;
  }

  isCustomManualV4Issue(): boolean {
    return false;
  }

  isAutomaticIssue(): boolean {
    return false;
  }

  isNote(): boolean {
    return false;
  }
}
