import BusinessMarketDetails from '../entity/BusinessMarketDetails';
import prepareContact from '../../Contact/adapter/prepareContact';
import { preparePhoneNumberWithoutPhonePrefix } from '../../PhoneNumber/adapter/preparePhoneNumber';
import OCRSScore from '../enums/OCRSScore';
import Euro6ComplianceType from '../enums/Euro6ComplianceType';
import ElectricVehiclesStance from '../enums/ElectricVehiclesStance';
import prepareAddress from '../../Address/adapter/prepareAddress';
import UnitedStatesState from '../enums/UnitedStatesState';
import ServiceType from '../enums/ServiceType';

export default function prepareBusinessMarketDetails(
  instance: BusinessMarketDetails
): prepareBusinessMarketDetailsType {
  return {
    main_contact: prepareContact(instance.mainContact),
    company_address: instance.fullAddress
      ? {
          full_address: instance.fullAddress,
          latitude: instance.geolocation?.latitude.toString(),
          longitude: instance.geolocation?.longitude.toString(),
        }
      : null,
    transport_manager_contact: prepareContact(instance.transportManagerContact),
    traffic_office_contact: prepareContact(instance.trafficOfficeContact),
    emergency_contact: prepareContact(instance.emergencyContact),
    rider_helpline: prepareContact(instance.riderHelpline),
    notification_contact: preparePhoneNumberWithoutPhonePrefix(instance.notificationContact),
    depot_location_address: instance.depotAddresses
      .filter((depotAddress) => depotAddress.fullAddress)
      .map((eachAddress) => prepareAddress(eachAddress)),
    quotes_contact: prepareContact(instance.mpocQuotes),
    fleet_size: instance.fleetSize.filter((eachFleetSize) => eachFleetSize.amount > 0),
    ocrs_score: instance.ocrsScore,
    euro6_compliance: instance.euro6Compliance,
    electric_vehicles_stance: instance.electricVehiclesStance,
    state_of_incorporation: instance.stateOfIncorporation,
    service_types: instance.serviceTypes,
    dispatch_phone: preparePhoneNumberWithoutPhonePrefix(instance.dispatchPhone),
  };
}

type prepareBusinessMarketDetailsType = {
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
    last_name: string;
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
  transport_manager_contact: {
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
