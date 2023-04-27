import prepareMoney from '../../Money/adapters/prepareMoney';
import SupplyCost from '../../SupplyCost/entity/SupplyCost';

export default function prepareSupplyCost(supplyCost: SupplyCost) {
  return {
    journey_vehicle_id: supplyCost.journeyVehicleId,
    supply_cost: prepareMoney(supplyCost.supplyCost),
    client_fee: prepareMoney(supplyCost.clientFee),
    note: supplyCost.note,
  };
}
