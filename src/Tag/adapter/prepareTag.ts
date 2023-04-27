import Tag from '../entity/Tag';
import preparePage from '../../Page/adapter/preparePage';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareTag(instance: Tag): any {
  return {
    ...preparePage(instance),
    featured: instance.is_featured,
    tag_type: instance.type,
    ...prepareMarketTrait(instance),
  };
}
