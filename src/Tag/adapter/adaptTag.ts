import Tag from '../entity/Tag';
import TagType from '../enums/TagType';
import adaptPage from '../../Page/adapter/adaptPage';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';

export default function adaptTag(json: any, instance: Tag = new Tag()): Tag {
  const instanceAdapted = <Tag>adaptPage(json, instance);

  instanceAdapted.is_featured = json.featured;
  instanceAdapted.type = json.tag_type || TagType.GENERIC;
  adaptMarketTrait(json, instanceAdapted);

  return instanceAdapted;
}
