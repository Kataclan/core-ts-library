import SupplyCostLogItem from '../../SupplyCostLogItem/entity/SupplyCostLogItem';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptMoney from '../../Money/adapters/adaptMoney';

export default function adaptSupplyCost(json: any): SupplyCostLogItem {
  const instance = new SupplyCostLogItem();

  instance.note = json.note;
  instance.issueType = json.issue_type;
  instance.author = json.author;
  instance.datetime = adaptDateTimeZone(json.datetime);
  instance.extraData = {
    previous: adaptMoney(json.extra_data.previous),
    newPrice: adaptMoney(json.extra_data.new),
    clientFee: adaptMoney(json.extra_data.client_fee),
    supplyCost: adaptMoney(json.extra_data.supply_cost),
  };

  return instance;
}
