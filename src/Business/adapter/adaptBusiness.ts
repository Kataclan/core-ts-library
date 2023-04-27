import Business from '../entity/Business';
import { baseAdapter } from '../../common/adapters/baseAdapter';
import adaptBusinessMarketDetails from './adaptBusinessMarketDetails';

export default function adaptBusiness(json: adaptBusinessType, instance: Business = new Business()): Business {
  baseAdapter(json.id, instance);

  instance.name = json.name;
  instance.operatorId = json.operator_id;
  instance.supplierId = json.supplier_id;
  instance.marketIds = Object.keys(json.markets ?? {});
  instance.suppliesForZeelo = json.supplies_for_zeelo ?? false;
  instance.usableSupplierIds = json.usable_supplier_ids ?? [];
  instance.isWhiteLabelBusiness = json.is_white_label ?? false;
  instance.fullyOnboarded = json.is_fully_onboarded ?? false;

  instance.details = Object.values(json.markets).map((eachBusinessMarketDetails) => {
    return adaptBusinessMarketDetails(eachBusinessMarketDetails);
  });

  return instance;
}

type adaptBusinessType = {
  id: string;
  name: string;
  operator_id: string;
  supplier_id: string;
  markets: object;
  supplies_for_zeelo: boolean;
  usable_supplier_ids: string[];
  is_white_label: boolean;
  is_fully_onboarded: boolean;
};
