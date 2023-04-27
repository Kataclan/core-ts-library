import Tag from '../entity/Tag';
import { slugify } from '../../common/utils/slugify';

export default function getTagRelativeSlug(tag: Tag, readRemoteSlug: boolean = true): string {
  if (readRemoteSlug) return `/${tag.slug}`;

  const pieces = ['/rides/', slugify(tag.slug || tag.title || '')];

  switch (true) {
    case tag.isPartner():
      pieces.push(`-partner-${tag.id}`);
      break;

    case tag.isVertical():
      pieces.push(`-vertical-${tag.id}`);
      break;
  }

  return pieces.join('');
}
