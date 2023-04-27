import BaseEntity from '../../common/entities/BaseEntity';
import Money from '../../Money/entity/Money';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import UUID from '../../UUID/UUID';
import Tag from '../../Tag/entity/Tag';
import VehicleType from '../../Vehicle/enums/VehicleType';
import JourneyDirection from '../../Journey/enums/JourneyDirection';

export default class SupplyCost extends BaseEntity {
  journeyId: UUID;
  journeyGroupId: UUID;
  journeyVehicleId: UUID;
  arrivalDate: DateTimeZone;
  departureDate: DateTimeZone;
  tags: Tag[] = [];
  marketId: UUID;
  supplierId: UUID;
  supplierName: string;
  vehicleId: UUID;
  vehicleType: VehicleType;
  vehicleDescription: string | null;
  productId: UUID;
  productName: string;
  clientName: string;
  routeId: UUID;
  routeName: string;
  journeyType: JourneyDirection = null;
  clientFee: Money | null;
  supplyCost: Money | null;
  note: string | null;
}
