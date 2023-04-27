import Tag from './Tag';
import TagType from '../enums/TagType';

export default class DataLabelsList {
  private _list: Array<Tag> = [];

  add(tag: Tag) {
    this._list.push(tag);
    return this.getAll();
  }

  getAll() {
    return this._list;
  }

  getByType(tagType: TagType) {
    return this.getAll().filter((eachTag) => eachTag.type === tagType);
  }

  removeByType(tagType: TagType) {
    this._list = this._list.filter((eachTag) => eachTag.type !== tagType);
  }

  removeById(id: string) {
    this._list = this._list.filter((eachTag) => eachTag.id !== id);
  }

  setList(list: Array<Tag>) {
    this._list = list;
  }
}
