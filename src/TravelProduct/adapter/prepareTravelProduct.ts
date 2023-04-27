import TravelProduct from '../entity/TravelProduct';
import prepareConcession from '../../Concession/adapter/prepareConcession';
import prepareProduct from '../../Product/adapter/prepareProduct';

export default function prepareTravelProduct(instance: TravelProduct): any {
  return {
    ...prepareProduct(instance),
    concessions: instance.concessions ? instance.concessions.map((each) => prepareConcession(each)) : void 0,
    outbound_seats_for_sale: instance.seats_on_sale,
    return_seats_for_sale: instance.seats_on_sale,
    dbs_check: prepareTravelProductDBSCheck(instance),
    program_code: instance.programCode,
  };
}

function prepareTravelProductDBSCheck(instance: TravelProduct) {
  if (!instance.dbsCheck) {
    return null;
  }

  return {
    valid_certificate_types: instance.dbsCheck.valid_certificate_types,
  };
}
