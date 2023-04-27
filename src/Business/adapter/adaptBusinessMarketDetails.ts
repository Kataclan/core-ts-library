import BusinessMarketDetails from '../entity/BusinessMarketDetails';
import adaptContact from '../../Contact/adapter/adaptContact';
import adaptGeoPoint from '../../GeoPoint/adapter/adaptGeoPoint';
import Contact from '../../Contact/entity/Contact';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';
import OCRSScore from '../enums/OCRSScore';
import Euro6ComplianceType from '../enums/Euro6ComplianceType';
import ElectricVehiclesStance from '../enums/ElectricVehiclesStance';
import adaptAddress from '../../Address/adapter/adaptAddress';
import UnitedStatesState from '../enums/UnitedStatesState';
import ServiceType from '../enums/ServiceType';

export default function adaptBusinessMarketDetails(
  json: adaptBusinessMarketDetailsType,
  instance: BusinessMarketDetails = new BusinessMarketDetails()
): BusinessMarketDetails {
  instance.marketId = json.market_id;

  instance.mainContact = adaptContact(json.main_contact);
  instance.fullAddress = json.company_address?.full_address ?? '';
  instance.mpocQuotes = adaptContact(json.quotes_contact);
  instance.depotAddresses = (json.depot_location_address ?? []).map((eachAddress) => adaptAddress(eachAddress));
  instance.fleetSize = json.fleet_size ?? [];
  instance.ocrsScore = json.ocrs_score;
  instance.euro6Compliance = json.euro6_compliance;
  instance.electricVehiclesStance = json.electric_vehicles_stance;
  instance.stateOfIncorporation = json.state_of_incorporation;
  instance.serviceTypes = json.service_types || [];

  if (json.company_address?.latitude && json.company_address?.longitude) {
    instance.geolocation = adaptGeoPoint({
      latitude: json.company_address.latitude,
      longitude: json.company_address.longitude,
    });
  }

  instance.transportManagerContact = adaptContact({
    ...json.transport_manager_contact,
    first_name: json.transport_manager_contact
      ? `${json.transport_manager_contact.first_name ?? ''} ${json.transport_manager_contact.last_name ?? ''}`.trim()
      : '',
    last_name: '',
  });
  instance.trafficOfficeContact = adaptContact(json.traffic_office_contact);

  instance.emergencyContact = new Contact();
  instance.emergencyContact.phoneNumber = adaptPhoneNumber(json.emergency_contact);

  instance.riderHelpline = adaptContact(json.rider_helpline);

  instance.notificationContact = adaptPhoneNumber(json.notification_contact);

  instance.dispatchPhone = adaptPhoneNumber(json.dispatch_phone);

  return instance;
}

export type adaptBusinessMarketDetailsType = {
  market_id: string;
  main_contact: {
    first_name: string;
    last_name: string;
    email: string;
    phone: {
      number: string;
      prefix: string;
      country_code: string;
    };
  };
  quotes_contact: {
    first_name: string;
    email: string;
    phone: {
      number: string;
      prefix: string;
      country_code: string;
    };
  };
  company_address: {
    full_address: string;
    latitude: string;
    longitude: string;
  };
  depot_location_address: {
    full_address: string;
    latitude: string;
    longitude: string;
  }[];
  ocrs_score: OCRSScore;
  euro6_compliance: Euro6ComplianceType;
  electric_vehicles_stance: ElectricVehiclesStance;
  state_of_incorporation: UnitedStatesState;
  service_types: ServiceType[];
  fleet_size: any;
  transport_manager_contact?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: {
      number: string;
      prefix: string;
      country_code: string;
    };
  };
  traffic_office_contact: {
    first_name: string;
    last_name: string;
    email: string;
    phone: {
      number: string;
      prefix: string;
      country_code: string;
    };
  };
  emergency_contact: {
    phone: {
      number: string;
      prefix: string;
      country_code: string;
    };
  };
  rider_helpline: {
    email: string;
    phone: {
      number: string;
      prefix: string;
      country_code: string;
    };
  };
  notification_contact: {
    number: string;
    prefix: string;
    country_code: string;
  };
  dispatch_phone: {
    number: string;
    prefix: string;
    country_code: string;
  };
};
