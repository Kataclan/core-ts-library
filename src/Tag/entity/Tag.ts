import Page from '../../Page/entity/Page';
import TagType from '../enums/TagType';
import PageType from '../../Page/enums/PageType';
import Market from '../../Market/entity/Market';

export default class Tag extends Page {
  protected _is_featured: boolean = false;
  protected _type: TagType = TagType.GENERIC;
  market: Market;

  constructor() {
    super();
    this.page_type = PageType.TAG;
  }

  get is_featured(): boolean {
    return this._is_featured;
  }

  set is_featured(value: boolean) {
    this._is_featured = value;
  }

  get type(): TagType {
    return this._type;
  }

  set type(value: TagType) {
    this._type = value;
  }

  isGeneric() {
    return this.isOfType(TagType.GENERIC);
  }

  isVertical() {
    return this.isOfType(TagType.VERTICAL);
  }

  isPartner() {
    return this.isOfType(TagType.PARTNER);
  }

  isRoute() {
    return this.isOfType(TagType.ROUTE);
  }

  isRegion() {
    return this.isOfType(TagType.REGION);
  }

  isFunding() {
    return this.isOfType(TagType.FUNDING);
  }

  isNotGeneric() {
    return !this.isGeneric();
  }

  isOfType(tagType: TagType): boolean {
    return this.type === tagType;
  }

  feature() {
    this._is_featured = true;
  }

  unfeature() {
    this._is_featured = false;
  }

  isMarketDependant(): boolean {
    return [TagType.GENERIC, TagType.ROUTE, TagType.REGION].includes(this.type);
  }
}
