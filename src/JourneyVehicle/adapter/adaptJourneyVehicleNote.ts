import JourneyVehicleComment from '../entity/JourneyVehicleComment';
import JourneyVehicleManualIssue from '../entity/JourneyVehicleManualIssue';
import User from '../../User/entity/User';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import UUID from '../../UUID/UUID';
import JourneyVehicleActivity from '../entity/JourneyVehicleActivity';

export default function adaptJourneyVehicleNote(
  json: any
): JourneyVehicleComment | JourneyVehicleManualIssue | JourneyVehicleActivity {
  /*
    arrival_date: "20161210135000 UTC"
    connection_id: "6f1c7651-5d24-4238-aefe-7ebacd20e27f"
    connection_type: "JOURNEY_VEHICLE_ISSUE"
    created_at: "20200612095928 Europe/London"
    departure_date: "20161210105000 UTC"
    extra_data: {comment: "First Note"}
    id: "0329cd48-3c84-46d3-8cb6-b66f464ad802"
    issue_type: "INTERNAL_NOTE"
    review_status: "ESCALATED"
    supplierId: null
    tags: []
    user_id: "bca71f2f-2b04-4c70-afc3-2aa5cb41c45d"
    */

  let instance = null;

  if (json.issue_type === 'INTERNAL_NOTE') {
    instance = new JourneyVehicleComment();
    instance.text = json.extra_data.comment;
  } else if (json.issue_type === 'MANUAL_ISSUE') {
    instance = new JourneyVehicleManualIssue();
    instance.issue_id = json.extra_data.issue_id;
    instance.driver_app_report_type = json.extra_data.issue_type;
    instance.severity = json.extra_data?.severity;
    instance.fault_party = json.extra_data?.fault_party;
  } else {
    instance = new JourneyVehicleActivity();
    instance.activity_type = json.issue_type;

    // It can happen for an activity to have no extra data.
    if (json.extra_data) {
      instance.journey_stop_id = UUID.fromString(json.extra_data.journey_stop_id);
      instance.journey_stop_name = json.extra_data.journey_stop_name;
      instance.journey_vehicle_stop_id = UUID.fromString(json.extra_data.journey_vehicle_stop_id);
      instance.minutes_difference = json.extra_data.minutes_difference;
      instance.total_services = json.extra_data.days_of_service; // BE decided to keep 'days_of_service' so as to not having to update the tests.
      instance.arrival_datetime = adaptDateTimeZone(json.extra_data.arrival_datetime);
    }
  }

  instance.id = json.note_id;
  instance.uuid = UUID.fromString(json.note_id);
  instance.journey_vehicle_id = json.connection_id;
  instance.created_at = adaptDateTimeZone(json.created_at);
  instance.updated_at = adaptDateTimeZone(json.updated_at);

  if (json.user_id) {
    instance.author = new User();
    instance.author.id = json.user_id;
    instance.author.uuid = UUID.fromString(json.user_id);
    instance.author.name = json.user_name;
    instance.author.surname = json.user_surname;
  }

  instance.extra_data = json.extra_data;

  return instance;
}
