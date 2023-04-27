import Product from '../entity/Product';
import Tag from '../../Tag/entity/Tag';
import adaptPage from '../../Page/adapter/adaptPage';
import adaptTag from '../../Tag/adapter/adaptTag';

export default function adaptProduct(json: any, instance: Product = new Product()): Product {
  const adapted = adaptPage(json, instance);

  const instanceAdapted = adapted as Product;
  instanceAdapted.tags = (json.tags || []).map((each) => adaptTag(each, new Tag()));
  instanceAdapted.type_label = (json.product_type || json.type || '').toUpperCase();
  instanceAdapted.excluded_from_list = json.excluded_from_list;
  instanceAdapted.enable_multiple_riders_purchase_flow = json.allow_multiple_riders;

  return instanceAdapted;
}
