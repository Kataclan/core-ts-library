import BaseEntity from '../../common/entities/BaseEntity';
import Vehicle from '../../Vehicle/entity/Vehicle';
import JourneyVehicleStop from '../../JourneyVehicleStop/entity/JourneyVehicleStop';
import Money from '../../Money/entity/Money';
import Supplier from '../../Supplier/entity/Supplier';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import Journey from '../../Journey/entity/Journey';
import TravelPlan from '../../TravelPlan/entity/TravelPlan';
import JourneyVehicleReviewStatus from '../enums/JourneyVehicleReviewStatus';
import JourneyVehicleManualIssue from './JourneyVehicleManualIssue';
import JourneyVehicleComment from './JourneyVehicleComment';
import JourneyVehicleActivity from './JourneyVehicleActivity';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import DBSValidCertificateType from '../../DBSCheck/enum/DBSValidCertificateType';
import JourneyVehicleIssueSeverity from '../enums/JourneyVehicleIssueSeverity';
import Driver from '../../Driver/entity/Driver';
import clone from '../../common/utils/clone';
import UUID from '../../UUID/UUID';
import Market from '../../Market/entity/Market';

type dbsCheckShape = {
  valid_certificate_types: DBSValidCertificateType[];
};

export default class JourneyVehicle extends BaseEntity {
  private _code: string;
  private _vehicle: Vehicle;
  private _seats: number;
  private _seats_on_sale: number;
  private _seats_sold: number; // This comes only when using a specific endpoint.
  private _journey_vehicle_stops: Array<JourneyVehicleStop> = [];
  private _extras_cost: Money = new Money();
  private _supply_cost: Money = new Money();
  private _service_fee: Money = new Money();
  private _supplier_id: string; // Adding the field to make second calls.
  private _supplier: Supplier;
  private _supplier_phone: PhoneNumber = new PhoneNumber();
  driver: Driver;
  private _driver_id: string;
  private _driver_name: string;
  private _driver_phone: PhoneNumber = new PhoneNumber();
  private _jobsheet_sent: boolean;
  private _passenger_helpline: PhoneNumber = new PhoneNumber();
  private _driver_helpline: PhoneNumber = new PhoneNumber();
  private _reg_number: string;
  private _vehicle_description: string;
  private _journey_id: string;
  private _journey: Journey;
  private _notes: Array<JourneyVehicleManualIssue | JourneyVehicleComment> = [];
  private _activity: Array<JourneyVehicleActivity> = [];
  private _way_status: string;
  private _travel_plans: Array<TravelPlan> = [];
  private _review_status: JourneyVehicleReviewStatus;
  private _flag_on_time: boolean = false;
  private _flag_vehicle_quality: boolean = false;
  private _flag_tracking: boolean = false;
  private _flag_full_app_usage: boolean = false;
  private _flag_escalated: boolean = false;
  private _current_journey_vehicle_stop_id: string;
  private _next_journey_vehicle_stop_id: string;
  private _departure_date: DateTimeZone;
  private _arrival_date: DateTimeZone;
  private _is_muted: boolean = false;
  private _is_resolved: boolean = false;
  private _follower_notifications_are_enabled: boolean = false;
  private _resolved_until: DateTimeZone;
  private _issues_list: Array<JourneyVehicleComment | JourneyVehicleManualIssue | JourneyVehicleActivity> = [];
  emergencyContactPhone: PhoneNumber;
  market: Market;
  driverCode: string;

  severityCounters: any = {};
  dbsCheck: dbsCheckShape;
  expected_delay: number;
  real_arrival_date: DateTimeZone;
  operatorId: UUID;
  is_completed: boolean;
  isStarred: boolean;

  isRecurringProduct = false;
  isShuttle = false;
  isScanToBoard = false;
  isLoop = false;

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get vehicle(): Vehicle {
    return this._vehicle;
  }

  set vehicle(value: Vehicle) {
    this._vehicle = value;
  }

  get seats(): number {
    return this._seats;
  }

  set seats(value: number) {
    this._seats = value;
  }

  get seats_on_sale(): number {
    return this._seats_on_sale;
  }

  set seats_on_sale(value: number) {
    this._seats_on_sale = value;
  }

  get seats_sold(): number {
    return this._seats_sold;
  }

  set seats_sold(value: number) {
    this._seats_sold = value;
  }

  get journey_vehicle_stops(): Array<JourneyVehicleStop> {
    return this._journey_vehicle_stops;
  }

  set journey_vehicle_stops(value: Array<JourneyVehicleStop>) {
    this._journey_vehicle_stops = value;
  }

  get extras_cost(): Money {
    return this._extras_cost;
  }

  set extras_cost(value: Money) {
    this._extras_cost = value;
  }

  get supply_cost(): Money {
    return this._supply_cost;
  }

  set supply_cost(value: Money) {
    this._supply_cost = value;
  }

  get service_fee(): Money {
    return this._service_fee;
  }

  set service_fee(value: Money) {
    this._service_fee = value;
  }

  get supplier_id(): string {
    return this._supplier_id;
  }

  set supplier_id(value: string) {
    this._supplier_id = value;
  }

  get supplier(): Supplier {
    return this._supplier;
  }

  set supplier(value: Supplier) {
    this._supplier = value;
  }

  get supplier_phone(): PhoneNumber {
    return this._supplier_phone;
  }

  set supplier_phone(value: PhoneNumber) {
    this._supplier_phone = value;
  }

  get driver_id(): string {
    return this._driver_id;
  }

  set driver_id(value: string) {
    this._driver_id = value;
  }

  get driver_name(): string {
    return this._driver_name;
  }

  set driver_name(value: string) {
    this._driver_name = value;
  }

  get driver_phone(): PhoneNumber {
    return this._driver_phone;
  }

  set driver_phone(value: PhoneNumber) {
    this._driver_phone = value;
  }

  get jobsheet_sent(): boolean {
    return this._jobsheet_sent;
  }

  set jobsheet_sent(value: boolean) {
    this._jobsheet_sent = value;
  }

  get passenger_helpline(): PhoneNumber {
    return this._passenger_helpline;
  }

  set passenger_helpline(value: PhoneNumber) {
    this._passenger_helpline = value;
  }

  get driver_helpline(): PhoneNumber {
    return this._driver_helpline;
  }

  set driver_helpline(value: PhoneNumber) {
    this._driver_helpline = value;
  }

  get reg_number(): string {
    return this._reg_number;
  }

  set reg_number(value: string) {
    this._reg_number = value;
  }

  get vehicle_description(): string {
    return this._vehicle_description;
  }

  set vehicle_description(value: string) {
    this._vehicle_description = value;
  }

  get journey_id(): string {
    return this._journey_id;
  }

  set journey_id(value: string) {
    this._journey_id = value;
  }

  get journey(): Journey {
    return this._journey;
  }

  set journey(value: Journey) {
    this._journey = value;
  }

  get notes(): Array<JourneyVehicleManualIssue | JourneyVehicleComment> {
    return this._notes;
  }

  set notes(value: Array<JourneyVehicleManualIssue | JourneyVehicleComment>) {
    this._notes = value;
  }

  get activity(): Array<JourneyVehicleActivity> {
    return this._activity;
  }

  set activity(value: Array<JourneyVehicleActivity>) {
    this._activity = value;
  }

  get way_status(): string {
    return this._way_status;
  }

  set way_status(value: string) {
    this._way_status = value;
  }

  get travel_plans(): Array<TravelPlan> {
    return this._travel_plans;
  }

  set travel_plans(value: Array<TravelPlan>) {
    this._travel_plans = value;
  }

  get review_status(): JourneyVehicleReviewStatus {
    return this._review_status;
  }

  set review_status(value: JourneyVehicleReviewStatus) {
    this._review_status = value;
  }

  get flag_on_time(): boolean {
    return this._flag_on_time;
  }

  set flag_on_time(value: boolean) {
    this._flag_on_time = value;
  }

  get flag_vehicle_quality(): boolean {
    return this._flag_vehicle_quality;
  }

  set flag_vehicle_quality(value: boolean) {
    this._flag_vehicle_quality = value;
  }

  get flag_tracking(): boolean {
    return this._flag_tracking;
  }

  set flag_tracking(value: boolean) {
    this._flag_tracking = value;
  }

  get flag_full_app_usage(): boolean {
    return this._flag_full_app_usage;
  }

  set flag_full_app_usage(value: boolean) {
    this._flag_full_app_usage = value;
  }

  get flag_escalated(): boolean {
    return this._flag_escalated;
  }

  set flag_escalated(value: boolean) {
    this._flag_escalated = value;
  }

  get current_journey_vehicle_stop_id(): string {
    return this._current_journey_vehicle_stop_id;
  }

  set current_journey_vehicle_stop_id(value: string) {
    this._current_journey_vehicle_stop_id = value;
  }

  get next_journey_vehicle_stop_id(): string {
    return this._next_journey_vehicle_stop_id;
  }

  set next_journey_vehicle_stop_id(value: string) {
    this._next_journey_vehicle_stop_id = value;
  }

  get departure_date(): DateTimeZone {
    return this._departure_date;
  }

  set departure_date(value: DateTimeZone) {
    this._departure_date = value;
  }

  get arrival_date(): DateTimeZone {
    return this._arrival_date;
  }

  set arrival_date(value: DateTimeZone) {
    this._arrival_date = value;
  }

  get is_muted(): boolean {
    return this._is_muted;
  }

  set is_muted(value: boolean) {
    this._is_muted = value;
  }

  get is_resolved(): boolean {
    return this._is_resolved;
  }

  set is_resolved(value: boolean) {
    this._is_resolved = value;
  }

  get follower_notifications_are_enabled(): boolean {
    return this._follower_notifications_are_enabled;
  }

  set follower_notifications_are_enabled(value: boolean) {
    this._follower_notifications_are_enabled = value;
  }

  get resolved_until(): DateTimeZone {
    return this._resolved_until;
  }

  set resolved_until(value: DateTimeZone) {
    this._resolved_until = value;
  }

  get issues_list(): Array<JourneyVehicleComment | JourneyVehicleManualIssue | JourneyVehicleActivity> {
    return this._issues_list;
  }

  set issues_list(value: Array<JourneyVehicleComment | JourneyVehicleManualIssue | JourneyVehicleActivity>) {
    this._issues_list = value;
  }

  addIssue(value: JourneyVehicleComment | JourneyVehicleManualIssue | JourneyVehicleActivity) {
    this._issues_list.push(value);
  }

  isJobsheetSent(): boolean {
    return this.jobsheet_sent;
  }

  reviewIsRequired({ checkSupplierCost }): boolean {
    return this.reasonsToReview({ checkSupplierCost }).length > 0;
  }

  reasonsToReview({ checkSupplierCost }): Array<string> {
    const fields = [];

    !this.supplier_id && !this.supplier && fields.push('supplier');
    !this.reg_number && fields.push('reg_number');
    !this.vehicle_description && fields.push('vehicle_description');
    !this.driver_name && fields.push('driver_name');
    !this.driver_phone.number && fields.push('driver_phone');
    checkSupplierCost && (!this.supply_cost || !this.supply_cost.amount) && fields.push('supply_cost');

    return fields;
  }

  getValidPickups(): Array<JourneyVehicleStop> {
    return this.journey_vehicle_stops.filter((each: JourneyVehicleStop) => each.isValidPickup());
  }

  getValidDropoffs(): Array<JourneyVehicleStop> {
    return this.journey_vehicle_stops.filter((each: JourneyVehicleStop) => each.isValidDropoff());
  }

  removeJourneyVehicleStop(index) {
    this.journey_vehicle_stops.splice(index, 1);
  }

  resetJob() {
    this.journey_vehicle_stops = this.journey_vehicle_stops.map((eachJVS: JourneyVehicleStop) => {
      eachJVS.actual_arrival_time = null;
      eachJVS.actual_departure_time = null;
      return eachJVS;
    });
  }

  hasStarted(): boolean {
    return this.way_status !== 'NOT_STARTED';
  }

  hasFinished(): boolean {
    return this.way_status === 'COMPLETED';
  }

  hasFullAllocationData(): boolean {
    const fields = [];
    const allocationChecks = ['supplier', 'driver', 'driver_phone', 'reg_number', 'vehicle_description'];

    this.supplier && this.supplier.id && fields.push('supplier');
    (this.driver_id || this.driver_name) && fields.push('driver');
    this.driver_phone && this.driver_phone.number && fields.push('driver_phone');
    this.reg_number && fields.push('reg_number');
    this.vehicle_description && fields.push('vehicle_description');

    return fields.length === allocationChecks.length;
  }

  getFirstStopScheduledDepartureTime(): DateTimeZone {
    return this.journey_vehicle_stops[0].scheduled_departure_time;
  }

  getLastStopScheduledArrivalTime(): DateTimeZone {
    return this.journey_vehicle_stops[this.journey_vehicle_stops.length - 1].scheduled_arrival_time;
  }

  hasInternalNotes(): boolean {
    return this.notes.length > 0;
  }

  hasActivity(): boolean {
    return this.activity.length > 0;
  }

  getFirstActivity(): JourneyVehicleActivity {
    return this.activity[0];
  }

  getLastActivity(): JourneyVehicleActivity {
    return this.activity[this.activity.length - 1];
  }

  getLastIssue(): JourneyVehicleComment | JourneyVehicleManualIssue | JourneyVehicleActivity {
    return this.issues_list[this.issues_list.length - 1];
  }

  getFirstIssue(): JourneyVehicleComment | JourneyVehicleManualIssue | JourneyVehicleActivity {
    return this.issues_list[0];
  }

  hasIssues(): boolean {
    return this.issues_list.length > 0;
  }

  isMuted(): boolean {
    return this._is_muted;
  }

  isResolved(): boolean {
    return this._is_resolved;
  }

  hasUnresolvedIssues(): boolean {
    if (!this.hasIssues()) return false;

    return !this.isResolved();
  }

  getPreviousStop(): JourneyVehicleStop {
    if (this.current_journey_vehicle_stop_id) {
      const currentStopIndex = this.journey_vehicle_stops.findIndex(
        (eachJVS) => eachJVS.uuid.id === this.current_journey_vehicle_stop_id
      );
      return this.journey_vehicle_stops[currentStopIndex - 1];
    }

    if (this.next_journey_vehicle_stop_id) {
      const currentStopIndex = this.journey_vehicle_stops.findIndex(
        (eachJVS) => eachJVS.uuid.id === this.next_journey_vehicle_stop_id
      );
      return this.journey_vehicle_stops[currentStopIndex - 1];
    }
  }

  getFirstStop(): JourneyVehicleStop {
    return this.journey_vehicle_stops[0];
  }

  getLastStop(): JourneyVehicleStop {
    return this.journey_vehicle_stops[this.journey_vehicle_stops.length - 1];
  }

  getCurrentStop(): JourneyVehicleStop {
    if (this.current_journey_vehicle_stop_id) {
      const currentStopIndex = this.journey_vehicle_stops.findIndex(
        (eachJVS) => eachJVS.uuid.id === this.current_journey_vehicle_stop_id
      );
      return this.journey_vehicle_stops[currentStopIndex];
    }

    if (this.next_journey_vehicle_stop_id) {
      const currentStopIndex = this.journey_vehicle_stops.findIndex(
        (eachJVS) => eachJVS.uuid.id === this.next_journey_vehicle_stop_id
      );
      return this.journey_vehicle_stops[currentStopIndex - 1];
    }
  }

  getNextStop(): JourneyVehicleStop {
    if (this.current_journey_vehicle_stop_id) {
      const currentStopIndex = this.journey_vehicle_stops.findIndex(
        (eachJVS) => eachJVS.uuid.id === this.current_journey_vehicle_stop_id
      );
      return this.journey_vehicle_stops[currentStopIndex + 1];
    }

    if (this.next_journey_vehicle_stop_id) {
      const currentStopIndex = this.journey_vehicle_stops.findIndex(
        (eachJVS) => eachJVS.uuid.id === this.next_journey_vehicle_stop_id
      );
      return this.journey_vehicle_stops[currentStopIndex + 1];
    }
  }

  getBoardedTravelPlansAtJourneyVehicleStopCount(journeyVehicleStopId: string): number {
    return this.travel_plans
      .filter((eachTravelPlan: TravelPlan) => {
        return eachTravelPlan.journey_vehicle_stop_id__pickup === journeyVehicleStopId;
      })
      .filter((eachTravelPlan: TravelPlan) => {
        return eachTravelPlan.isUsed();
      }).length;
  }

  getTotalTravelPlansByJourneyVehicleStopId(journeyVehicleStopId: string): number {
    return this.travel_plans.filter((eachTravelPlan: TravelPlan) => {
      return eachTravelPlan.journey_vehicle_stop_id__pickup === journeyVehicleStopId;
    }).length;
  }

  getTravelPlansToDisembarkAtJourneyVehicleStopCount(journeyVehicleStopId: string): number {
    return this.travel_plans
      .filter((eachTravelPlan: TravelPlan) => {
        return eachTravelPlan.journey_vehicle_stop_id__dropoff === journeyVehicleStopId;
      })
      .filter((eachTravelPlan: TravelPlan) => {
        return eachTravelPlan.isUsed();
      }).length;
  }

  areFollowerNotificationsEnabled(): boolean {
    return this.follower_notifications_are_enabled;
  }

  hasDBSCheckEnabled(): boolean {
    return !!this.dbsCheck;
  }

  calculateDepartureFromStops(): void {
    this.departure_date = clone(this.journey_vehicle_stops[0].scheduled_departure_time);
  }

  calculateArrivalFromStops(): void {
    this.arrival_date = clone(
      this.journey_vehicle_stops[this.journey_vehicle_stops.length - 1].scheduled_departure_time
    );
  }

  getMinorIssuesCount(): number {
    return this.geIssuesCountBySeverity(JourneyVehicleIssueSeverity.MINOR);
  }

  getModerateIssuesCount(): number {
    return this.geIssuesCountBySeverity(JourneyVehicleIssueSeverity.MODERATE);
  }

  getImportantIssuesCount(): number {
    return this.geIssuesCountBySeverity(JourneyVehicleIssueSeverity.IMPORTANT);
  }

  getCriticalIssuesCount(): number {
    return this.geIssuesCountBySeverity(JourneyVehicleIssueSeverity.CRITICAL);
  }

  geIssuesCountBySeverity(severity: JourneyVehicleIssueSeverity): number {
    return this.severityCounters[severity] ?? 0;
  }

  belongsToOperatorId(operatorId: string): boolean {
    return this.operatorId?.id === operatorId;
  }

  isJourneyLoop(): boolean {
    return !!this.journey_vehicle_stops?.[0]?.loopId;
  }
}
