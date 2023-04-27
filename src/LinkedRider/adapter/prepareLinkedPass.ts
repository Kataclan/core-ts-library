import LinkedPass from '../entity/LinkedPass';
import LinkedRider from '../entity/LinkedRider';

type payload = {
  product_purchase_id: string;
  passenger_type_id: string;
};

export default function prepareLinkedPass(linkedPass: LinkedPass): payload {
  return {
    product_purchase_id: linkedPass.product_purchase.uuid.id[0],
    passenger_type_id: linkedPass.passenger_type.uuid.id,
  };
}

export function prepareLinkedPasses(linkedRider: LinkedRider): payload[] {
  return linkedRider.linked_passes.map((eachLinkedPass) => {
    return prepareLinkedPass(eachLinkedPass);
  });
}
