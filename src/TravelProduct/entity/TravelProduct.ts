import Product from '../../Product/entity/Product';
import JourneyGroup from '../../JourneyGroup/entity/JourneyGroup';
import Concession from '../../Concession/entity/Concession';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import DBSValidCertificateType from '../../DBSCheck/enum/DBSValidCertificateType';
import Market from '../../Market/entity/Market';

type dbsCheckShape = {
  valid_certificate_types: DBSValidCertificateType[];
};

export default class TravelProduct extends Product {
  // TODO: This must be not initialized because of the BE logic. Check why and change it if needed.
  concessions: Array<Concession>;

  journey_groups: Array<JourneyGroup> = [];
  seats_on_sale: number = null;
  completed: boolean = false;
  first_journey_departure_date: DateTimeZone = new DateTimeZone();
  last_journey_departure_date: DateTimeZone = new DateTimeZone();
  next_journey_departure_date: DateTimeZone = new DateTimeZone();
  dbsCheck: dbsCheckShape;
  programCode: '';

  addJourneyGroup(item: JourneyGroup) {
    this.journey_groups.push(item);
  }

  setJourneyGroup(item: JourneyGroup) {
    this.journey_groups[this.journey_groups.findIndex((e) => e.id === item.id)] = item;
  }

  removeJourneyGroup(item: JourneyGroup) {
    this.journey_groups = this.journey_groups.filter((each: JourneyGroup) => each.id !== item.id);
  }

  activateDBSCheck(): void {
    if (this.market.uuid.id === Market.UK) {
      this.dbsCheck = {
        valid_certificate_types: [DBSValidCertificateType.ENHANCED],
      };
    }
  }

  deactivateDBSCheck(): void {
    this.dbsCheck = null;
  }

  hasDBSCheckEnabled(): boolean {
    return !!this.dbsCheck;
  }

  buildConcessionsArray() {
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

  isCompleted() {
    return this.completed;
  }
}
