import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptMoney from '../../Money/adapters/adaptMoney';
import SupplyCost from '../../SupplyCost/entity/SupplyCost';
import adaptTag from '../../Tag/adapter/adaptTag';
import JourneyDirection from '../../Journey/enums/JourneyDirection';

export default function adaptSupplyCost(json: any): SupplyCost {
  const instance = new SupplyCost();

  instance.journeyId = json.journey_id;
  instance.journeyGroupId = json.journey_group_id;
  instance.journeyVehicleId = json.journey_vehicle_id;

  instance.departureDate = adaptDateTimeZone(json.departure_date);
  instance.arrivalDate = adaptDateTimeZone(json.arrival_date);

  instance.marketId = json.market_id;

  instance.supplierId = json.supplier_id;
  instance.supplierName = json.supplier_name;

  instance.productId = json.product_id;
  instance.productName = json.product_name;

  instance.routeId = json.route_id;
  instance.routeName = json.route_name;

  instance.vehicleId = json.vehicle_id;
  instance.vehicleType = json.vehicle_type;
  instance.vehicleDescription = json.vehicle_description;

  instance.supplyCost = adaptMoney(json.supply_cost);
  instance.clientFee = adaptMoney(json.client_fee);

  instance.tags = json.tags.map((eachTag) => adaptTag(eachTag));

  instance.journeyType = json.journey_type ? JourneyDirection[json.journey_type] : null;
  instance.clientName = json.client_name;

  return instance;
}
