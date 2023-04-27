import BaseEntity from '../../common/entities/BaseEntity';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import BusinessMarketDetails from './BusinessMarketDetails';
import { setElementToList } from '../../common/utils/arrays';

export default class Business extends BaseEntity {
  name: string;
  operatorId: string;
  supplierId: string;
  marketIds: string[] = [];
  suppliesForZeelo = false;
  usableSupplierIds: string[] = [];
  isWhiteLabelBusiness = false;
  phoneNumbers: PhoneNumber[] = [];
  details: BusinessMarketDetails[] = [];
  fullyOnboarded = false;

  isZeeloSupplier(): boolean {
    return false;
  }

  doesSupplyForBusinessId(supplierId: string): boolean {
    return this.usableSupplierIds.includes(supplierId);
  }

  // We cannot use the first method because this field is computed from BE and refreshed every time we call the endpoint.
  doesSupplyForZeelo(): boolean {
    return this.suppliesForZeelo;
  }

  isTransportManager(): boolean {
    return !!this.operatorId;
  }

  // OperatorId relates to Transport Manager. We check this way because all Transport Managers have both SupplierId and OperatorId.
  isOperator(): boolean {
    return !this.operatorId;
  }

  setPhoneNumber(phoneNumber: PhoneNumber) {
    const newPhones = this.phoneNumbers.reduce((acc, eachPhoneNumber: PhoneNumber) => {
      return {
        ...acc,
        [eachPhoneNumber.uuid.id]: eachPhoneNumber,
      };
    }, {});

    newPhones[phoneNumber.uuid.id] = phoneNumber;

    this.phoneNumbers = Object.values(newPhones);
  }

  removePhoneNumber(phoneNumber: PhoneNumber) {
    const newPhones = this.phoneNumbers.reduce((acc, eachPhoneNumber: PhoneNumber) => {
      return {
        ...acc,
        [eachPhoneNumber.uuid.id]: eachPhoneNumber,
      };
    }, {});

    delete newPhones[phoneNumber.uuid.id];

    this.phoneNumbers = Object.values(newPhones);
  }

  isWhiteLabel(): boolean {
    return this.isWhiteLabelBusiness;
  }

  getDetailsForMarket(marketId: string): BusinessMarketDetails {
    const found = this.details.find((eachBusinessMarketDetails: BusinessMarketDetails) => {
      return eachBusinessMarketDetails.marketId === marketId;
    });

    if (found) {
      return found;
    }

    const businessMarketDetails = new BusinessMarketDetails();
    businessMarketDetails.marketId = marketId;

    return businessMarketDetails;
  }

  setDetailsForMarket(newBusinessMarketDetails: BusinessMarketDetails): void {
    this.details = setElementToList(this.details, newBusinessMarketDetails) as BusinessMarketDetails[];
  }

  getMarketIdsWithDetails(): string[] {
    return this.details.map((each) => each.marketId);
  }

  isFullyOnboarded(): boolean {
    return this.fullyOnboarded;
  }
}
