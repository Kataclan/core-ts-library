import Product from '../entity/Product';
import preparePage from '../../Page/adapter/preparePage';

export default function prepareProduct(instance: Product): any {
  return {
    ...preparePage(instance),

    // Not using the TagAdapter because it prepares the whole entity
    // and we need only an array of <id> when creating/editing a Product
    tags: instance.tags.map((each) => each.id),
    excluded_from_list: instance.excluded_from_list,
    allow_multiple_riders: instance.enable_multiple_riders_purchase_flow,
  };
}
