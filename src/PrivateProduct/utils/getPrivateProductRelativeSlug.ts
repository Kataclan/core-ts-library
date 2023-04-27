import PrivateProduct from '../entity/PrivateProduct';
import { slugify } from '../../common/utils/slugify';

export default function getPrivateProductRelativeSlug(product: PrivateProduct, readRemoteSlug = false): string {
  if (readRemoteSlug) return `/${product.slug}`;

  return `${product.market.coach_hire_url}/${slugify(product.slug || product.title)}`;
}
