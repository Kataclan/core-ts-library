import BaseEntity from '../../common/entities/BaseEntity';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import Money from '../../Money/entity/Money';
import SupplyCostLogType from '../../SupplyCost/enums/SupplyCostLogType';

export default class SupplyCost extends BaseEntity {
  issueType: SupplyCostLogType;
  author: string;
  datetime: DateTimeZone;
  note: string | null;
  extraData: {
    previous: Money | null;
    newPrice: Money | null;
    clientFee: Money | null;
    supplyCost: Money | null;
  };
}
