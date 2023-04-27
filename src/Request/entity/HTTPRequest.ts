import BaseEntity from '../../common/entities/BaseEntity';

export default class HTTPRequest extends BaseEntity {
  protected _url: string;
  protected _queryString: string;
  protected _method: string;
  protected _data: any;
  protected _headers: any;

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get queryString(): string {
    return this._queryString;
  }

  set queryString(value: string) {
    this._queryString = value;
  }

  get method(): string {
    return this._method;
  }

  set method(value: string) {
    this._method = value;
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  get headers(): any {
    return this._headers;
  }

  set headers(value: any) {
    this._headers = value;
  }
}
