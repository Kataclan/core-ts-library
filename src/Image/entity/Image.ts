import DigitalFile from '../../File/entity/File';
import StorageProvider from '../../File/enums/StorageProvider';

export default class Image extends DigitalFile {
  static SIZE_ORIGINAL = 'o';
  static SIZE_SMALL = 's';

  protected _title: string = '';
  protected _description: string = '';
  protected _image_resolution_letter: string = null;
  protected _image_resolution_width: number = null;
  protected _image_resolution_height: number = null;

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

  get image_resolution_letter(): string {
    return this._image_resolution_letter;
  }

  set image_resolution_letter(value: string) {
    this._image_resolution_letter = value;
  }

  get image_resolution_width(): number {
    return this._image_resolution_width;
  }

  set image_resolution_width(value: number) {
    this._image_resolution_width = value;
  }

  get image_resolution_height(): number {
    return this._image_resolution_height;
  }

  set image_resolution_height(value: number) {
    this._image_resolution_height = value;
  }

  getRelativeUrl(size = Image.SIZE_ORIGINAL) {
    return `/images/${this.id}/show/${size}`;
  }

  getUrl(getRequestUrl: string, size = Image.SIZE_ORIGINAL) {
    switch (this.storageProvider) {
      case StorageProvider.ZEELO:
        return this.prepareFullUrl(getRequestUrl, size);

      case StorageProvider.AMAZON:
        return this.url;

      default:
        throw new Error(`Storage provider '${this.storageProvider}' is not supported`);
    }
  }

  prepareFullUrl(appendTo: string = '', size = Image.SIZE_ORIGINAL) {
    return appendTo + this.getRelativeUrl(size);
  }
}
