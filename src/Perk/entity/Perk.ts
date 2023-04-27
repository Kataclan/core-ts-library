import ValidableInterface from '../../common/interfaces/ValidableInterface';
import Image from '../../Image/entity/Image';

export default class Perk implements ValidableInterface {
  protected _title: string;
  protected _description: string;
  protected _image: Image = null;

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

  get image(): Image {
    return this._image;
  }

  set image(value: Image) {
    this._image = value;
  }

  isValid() {
    return this.invalidFields().length === 0;
  }

  invalidFields(prefix: string = '') {
    let fields = [];

    !this.title && fields.push(`${prefix}title`);
    !this.description && fields.push(`${prefix}description`);

    return fields;
  }
}

