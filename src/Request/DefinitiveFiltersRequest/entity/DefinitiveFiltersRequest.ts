export default class DefinitiveFiltersRequest {
  private _from_json: any;
  protected _page: number;
  protected _total_pages: number;
  protected _per_page: number;
  protected _search: any;
  protected _order_by: string;
  protected _order_direction: string;
  protected _filter_by: Array<any> = [];
  protected _from: string;
  protected _to: string;
  protected _fetch_options: object;

  constructor(json: any = {}) {
    this._from_json = json;
    this._page = json.page || 1;
    this._total_pages = json.total_pages || undefined;
    this._per_page = json.per_page || 10;
    this._search = json.search || '';
    this._order_by = json.order_by || '';
    this._order_direction = json.order_direction || 'ASC';
    this._filter_by = json.filter_by || [];
    this._from = json.from || '';
    this._to = json.to || '';
    this._fetch_options = json.fetch_options || {};
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get total_pages(): number {
    return this._total_pages;
  }

  set total_pages(value: number) {
    this._total_pages = value;
  }

  get per_page(): number {
    return this._per_page;
  }

  set per_page(value: number) {
    this._per_page = value;
  }

  get search(): any {
    return this._search;
  }

  set search(value: any) {
    this._search = value;
  }

  get order_by(): string {
    return this._order_by;
  }

  set order_by(value: string) {
    const split = value.split(',');

    if (split.length === 2) {
      this._order_by = split[0];
      this._order_direction = split[1];
    } else {
      this._order_by = value;
    }
  }

  get order_direction(): string {
    return this._order_direction;
  }

  set order_direction(value: string) {
    this._order_direction = value;
  }

  get filter_by(): Array<any> {
    return this._filter_by;
  }

  set filter_by(value: Array<any>) {
    this._filter_by = value;
  }

  get from(): string {
    return this._from;
  }

  set from(value: string) {
    this._from = value;
  }

  get to(): string {
    return this._to;
  }

  set to(value: string) {
    this._to = value;
  }

  get fetch_options(): object {
    return this._fetch_options;
  }

  set fetch_options(value: object) {
    this._fetch_options = value;
  }

  static getQueryStringFromArray(array, key, groupByKey, addEmptyArr = false) {
    return array.map((keyInsideEach) => {
      return `${key}[${keyInsideEach[groupByKey]}]${addEmptyArr ? '[]' : ''}=${keyInsideEach.value}`;
    });
  }

  getQueryString(prependWith = '?') {
    let query_string = [];

    Object.keys(this).forEach((each) => {
      const key = each.replace(/^\_/, '');
      if (this[key]) {
        if (Array.isArray(this[key])) {
          switch (key) {
            case 'search':
              query_string.push(...DefinitiveFiltersRequest.getQueryStringFromArray(this[key], key, 'key'));
              break;
            case 'filter_by':
              query_string.push(...DefinitiveFiltersRequest.getQueryStringFromArray(this[key], key, 'groupBy', true));
              break;
            default:
              query_string.push(...DefinitiveFiltersRequest.getQueryStringFromArray(this[key], key, 'key'));
              break;
          }
        } else if (key === 'fetch_options') {
          Object.keys(this[key]).forEach((eachFetchOption) => {
            this[key][eachFetchOption] &&
              query_string.push(`filter_by[${eachFetchOption}]=${this[key][eachFetchOption]}`);
          });
        } else {
          query_string.push(`${key}=${this[key]}`);
        }
      }
    });

    return `${prependWith}${query_string.join('&')}`;
  }

  static getQueryStringFromJson(json: any = {}) {
    let query_string = [];

    Object.keys(json).forEach((each) => {
      const key = each.replace(/^\_/, '');

      if (json[key]) {
        if (Array.isArray(json[key])) {
          switch (key) {
            case 'search':
              query_string.push(...DefinitiveFiltersRequest.getQueryStringFromArray(json[key], key, 'key'));
              break;
            case 'filter_by':
              query_string.push(...DefinitiveFiltersRequest.getQueryStringFromArray(json[key], key, 'groupBy', true));
              break;
            case 'filterBy':
              query_string.push(...DefinitiveFiltersRequest.getQueryStringFromArray(json[key], key, 'groupBy', true));
              break;
            default:
              query_string.push(...DefinitiveFiltersRequest.getQueryStringFromArray(json[key], key, 'key'));
              break;
          }
        } else {
          query_string.push(`${key}=${json[key]}`);
        }
      }
    });

    return `?${query_string.join('&')}`;
  }

  static getNew(json: any) {
    return new this(json);
  }
}
