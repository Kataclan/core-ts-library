import EventProduct from '../entity/EventProduct';
import { slugify } from '../../common/utils/slugify';

export default function getEventProductRelativeSlug(product: EventProduct, readRemoteSlug: boolean = false): string {
  if (readRemoteSlug) return `/${product.slug}`;

  const pieces = [];

  const [primaryTag] = product.tags;
  pieces.push(`/${primaryTag ? primaryTag.slug : '[your primary tag goes here]'}/`);

  !product.slug && product.title ? pieces.push(slugify(product.title)) : pieces.push(product.slug);

  return pieces.join('');
}
