import JourneyVehicleNote from './JourneyVehicleNote';
import User from '../../User/entity/User';
import JourneyVehicleDriverAppReportType from '../enums/JourneyVehicleDriverAppReportType';
import JourneyVehicleIssueType from '../enums/JourneyVehicleIssueType';
import JourneyVehicleIssueSeverity from '../enums/JourneyVehicleIssueSeverity';
import JourneyVehicleIssueFault from '../enums/JourneyVehicleIssueFault';

export default class JourneyVehicleManualIssue extends JourneyVehicleNote {
  private _issue_id: JourneyVehicleIssueType;
  private _driver_app_report_type: JourneyVehicleDriverAppReportType;

  severity: JourneyVehicleIssueSeverity;
  fault_party: JourneyVehicleIssueFault;

  get issue_id(): JourneyVehicleIssueType {
    return this._issue_id;
  }

  set issue_id(value: JourneyVehicleIssueType) {
    this._issue_id = value;
  }

  get driver_app_report_type(): JourneyVehicleDriverAppReportType {
    return this._driver_app_report_type;
  }

  set driver_app_report_type(value: JourneyVehicleDriverAppReportType) {
    this._driver_app_report_type = value;
  }

  static create({
    issue_id,
    driver_app_report_type,
    journey_vehicle_id,
    user_id,
    user_name,
    created_at,
  }): JourneyVehicleManualIssue {
    const jvmi = new JourneyVehicleManualIssue();

    // Self
    jvmi.issue_id = issue_id;
    jvmi.driver_app_report_type = driver_app_report_type;

    // Parent
    jvmi.author = new User();
    jvmi.author.id = user_id;
    jvmi.author.uuid.id = user_id;
    jvmi.author.name = user_name;
    jvmi.journey_vehicle_id = journey_vehicle_id;
    jvmi.created_at = created_at;

    return jvmi;
  }

  isManualIssue(): boolean {
    return true;
  }

  isCustomManualV4Issue(): boolean {
    return this._issue_id === JourneyVehicleIssueType.CUSTOM_MANUAL_ISSUE_V4;
  }

  isDriverAppReport(): boolean {
    return this.issue_id === JourneyVehicleIssueType.DRIVER_APP_REPORT;
  }

  isMessageSent(): boolean {
    return this.issue_id === JourneyVehicleIssueType.MESSAGE_SENT;
  }

  isNewDriver(): boolean {
    return this.issue_id === JourneyVehicleIssueType.NEW_DRIVER;
  }
}
