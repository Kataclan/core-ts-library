import Business from '../entity/Business';

export default function prepareBusiness(instance: Business): prepareBusinessType {
  return {
    id: instance.uuid.id,
    name: instance.name,
    operator_id: instance.operatorId,
    supplier_id: instance.supplierId,
  };
}

type prepareBusinessType = {
  id: string;
  name: string;
  operator_id: string;
  supplier_id: string;
};
