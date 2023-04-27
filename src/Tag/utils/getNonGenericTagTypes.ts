import TagType from '../enums/TagType';

export default function getNonGenericTagTypes(): TagType[] {
  return [TagType.REGION, TagType.PARTNER, TagType.ROUTE, TagType.FUNDING, TagType.VERTICAL];
}
