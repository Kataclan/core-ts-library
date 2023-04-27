import BaseEntity from '../../common/entities/BaseEntity';
import Journey from '../../Journey/entity/Journey';
import Concession from '../../Concession/entity/Concession';
import JourneyGroupType from '../enums/JourneyGroupType';
import JourneyDirection from '../../Journey/enums/JourneyDirection';
import Market from '../../Market/entity/Market';

export default class JourneyGroup extends BaseEntity {
  private _name: string;
  private _date: string;
  private _journeys: Array<Journey> = [];
  private _concessions: Array<Concession> = [];
  private _settings: any = {
    allow_outbound_only: true,
    allow_return_only: true,
    allow_return: true,
  };
  private _type: JourneyGroupType;
  private _has_concessions_edited: boolean;
  private _travel_id: string;
  market: Market;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get journeys(): Array<Journey> {
    return this._journeys;
  }

  set journeys(value: Array<Journey>) {
    this._journeys = value;
  }

  get concessions(): Array<Concession> {
    return this._concessions;
  }

  set concessions(value: Array<Concession>) {
    this._concessions = value;
  }

  get settings(): any {
    return this._settings;
  }

  set settings(value: any) {
    this._settings = value;
  }

  get type(): JourneyGroupType {
    return this._type;
  }

  set type(value: JourneyGroupType) {
    this._type = value;
  }

  get has_concessions_edited(): boolean {
    return this._has_concessions_edited;
  }

  set has_concessions_edited(value: boolean) {
    this._has_concessions_edited = value;
  }

  get travel_id(): string {
    return this._travel_id;
  }

  set travel_id(value: string) {
    this._travel_id = value;
  }

  allowsReturn() {
    return this._settings.allow_return;
  }

  allowsOnlyReturn() {
    return this._settings.allow_return && !this._settings.allow_outbound_only && !this._settings.allow_return_only;
  }

  allowsOutboundOnly() {
    return this._settings.allow_outbound_only;
  }

  allowsOnlyOutbound() {
    return !this._settings.allow_return && this._settings.allow_outbound_only && !this._settings.allow_return_only;
  }

  allowsReturnOnly() {
    return this._settings.allow_return_only;
  }

  allowsOnlyReturnOnly() {
    return !this._settings.allow_return && !this._settings.allow_outbound_only && this._settings.allow_return_only;
  }

  hasOutboundJourneys() {
    return this.getOutboundJourneys(true).length === 1;
  }

  hasInboundJourneys() {
    return this.getInboundJourneys(true).length === 1;
  }

  hasOutboundAndInboundJourneys() {
    return this.hasOutboundJourneys() && this.hasInboundJourneys();
  }

  hasOnlyOutboundJourneys() {
    return this.hasOutboundJourneys() && !this.hasInboundJourneys();
  }

  hasOnlyInboundJourneys() {
    return !this.hasOutboundJourneys() && this.hasInboundJourneys();
  }

  recalculateSettings() {
    this.settings = {
      allow_return: this.hasOutboundAndInboundJourneys(),
      allow_outbound_only: this.hasOnlyOutboundJourneys() || this.hasOutboundAndInboundJourneys(),
      allow_return_only: this.hasOnlyInboundJourneys() || this.hasOutboundAndInboundJourneys(),
    };
  }

  private buildConcessionsArray() {
    if (!Array.isArray(this.concessions)) {
      this.concessions = [];
    }
  }

  addConcession(item: Concession) {
    this.buildConcessionsArray();
    this.concessions.push(item);
  }

  setConcession(index, item: Concession) {
    this.buildConcessionsArray();
    this.concessions[index] = item;
  }

  removeConcession(index) {
    this.buildConcessionsArray();
    this.concessions.splice(index, 1);
  }

  addJourney(item: Journey) {
    item.type === JourneyDirection.RETURN ? this.journeys.push(item) : this.journeys.unshift(item);
  }

  removeJourney(index: number) {
    this._journeys.splice(index, 1);
  }

  setJourney(index, item: Journey) {
    this.journeys[index] = item;
  }

  hasOverridenConcessions() {
    return this.has_concessions_edited;
  }

  getOutboundJourneys(onlyEnabled = false) {
    return this.journeys.filter((each: Journey) => each.isOutbound() && (onlyEnabled ? each.enabled : true));
  }

  getInboundJourneys(onlyEnabled = false) {
    return this.journeys.filter((each: Journey) => each.isReturn() && (onlyEnabled ? each.enabled : true));
  }

  findJourneyById(id: string): Journey {
    return this.journeys.find((eachJourney: Journey) => eachJourney.uuid.id === id);
  }
}
