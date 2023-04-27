import BaseEntity from '../../common/entities/BaseEntity';
import Contact from '../../Contact/entity/Contact';
import GeoPoint from '../../GeoPoint/entity/GeoPoint';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import OCRSScore from '../enums/OCRSScore';
import Euro6ComplianceType from '../enums/Euro6ComplianceType';
import ElectricVehiclesStance from '../enums/ElectricVehiclesStance';
import Address from '../../Address/entity/Address';
import UnitedStatesState from '../enums/UnitedStatesState';
import ServiceType from '../enums/ServiceType';

export default class BusinessMarketDetails extends BaseEntity {
  marketId: string;

  mainContact: Contact = new Contact();
  mpocQuotes: Contact = new Contact();
  fullAddress: string;
  geolocation: GeoPoint;
  transportManagerContact: Contact = new Contact();
  trafficOfficeContact: Contact = new Contact();
  emergencyContact: Contact = new Contact();
  riderHelpline: Contact = new Contact();
  notificationContact: PhoneNumber = new PhoneNumber();
  depotAddresses: Address[] = [];
  fleetSize: {
    id: string;
    amount: number;
  }[] = [];
  ocrsScore: OCRSScore;
  euro6Compliance: Euro6ComplianceType;
  electricVehiclesStance: ElectricVehiclesStance;
  stateOfIncorporation: UnitedStatesState;
  serviceTypes: ServiceType[] = [];
  dispatchPhone: PhoneNumber = new PhoneNumber();

  addDepotAddress(fullAddress = '', latitude = '', longitude = '') {
    this.depotAddresses = [
      ...this.depotAddresses,
      {
        fullAddress,
        latitude,
        longitude,
      },
    ];
  }

  setDepotAddress(index, fullAddress = '', latitude = '', longitude = '') {
    this.depotAddresses[index] = {
      fullAddress,
      latitude,
      longitude,
    };
  }

  removeDepotAddress(index) {
    this.depotAddresses.splice(index, 1);
  }

  clearDepotAddresses() {
    this.depotAddresses = [];
  }

  hasDepotAddresses(): boolean {
    return this.depotAddresses.length > 0;
  }
}
