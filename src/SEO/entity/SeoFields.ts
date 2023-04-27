import Image from '../../Image/entity/Image';
import ValidableInterface from '../../common/interfaces/ValidableInterface';

export default class SeoFields implements ValidableInterface {
  protected _title: string;
  protected _description: string;
  protected _keywords: Array<String> = [];
  protected _images: Array<Image> = [];

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get keywords(): Array<String> {
    return this._keywords;
  }

  set keywords(value: Array<String>) {
    this._keywords = value;
  }

  get images(): Array<Image> {
    return this._images;
  }

  set images(value: Array<Image>) {
    this._images = value;
  }
  
  isValid() {
    return this.invalidFields().length === 0;
  }
  
  invalidFields() {
    let fields = [];
    !this.title && fields.push('title');
    !this.description && fields.push('description');
    this.keywords.length === 0 && fields.push('keywords');
    return fields;
  }
}

