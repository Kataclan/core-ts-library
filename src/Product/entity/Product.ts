import Page from '../../Page/entity/Page';
import Tag from '../../Tag/entity/Tag';
import TagType from '../../Tag/enums/TagType';

export default class Product extends Page {
  protected _type_label: string;
  protected _tags: Array<Tag> = [];
  protected _excluded_from_list: boolean = false;
  enable_multiple_riders_purchase_flow = false;

  get tags(): Array<Tag> {
    return this._tags;
  }

  set tags(value: Array<Tag>) {
    this._tags = value;
  }

  get type_label(): string {
    return this._type_label;
  }

  set type_label(value: string) {
    this._type_label = value;
  }

  get excluded_from_list(): boolean {
    return this._excluded_from_list;
  }

  set excluded_from_list(value: boolean) {
    this._excluded_from_list = value;
  }

  hasTags() {
    return this.tags.length > 0;
  }

  getTags(type: TagType): Array<Tag> {
    if (!type) return this.tags;

    return this.tags.filter((eachTag) => eachTag.isOfType(type));
  }

  hasTagsOfType(type: TagType, minToHave: number = 1): boolean {
    return this.getTags(type).length >= minToHave;
  }

  replaceTagByType(tag: Tag): void {
    const index = this.tags.findIndex((eachTag) => eachTag.isOfType(tag.type));

    if (index !== -1) {
      this.tags.splice(index, 1);
    }

    this.tags.push(tag);
  }

  removeTagByType(type: TagType): void {
    const index = this.tags.findIndex((eachTag) => eachTag.isOfType(type));

    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  removeTag(tag: Tag): void {
    const index = this.tags.findIndex((eachTag) => eachTag.uuid.id === tag.uuid.id);

    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  addTag(tag: Tag): void {
    this.tags.push(tag);
  }
}
