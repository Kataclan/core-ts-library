import BaseEntity from '../../../common/entities/BaseEntity';

export default abstract class BaseRequest extends BaseEntity {
  protected _page: number;
  protected _total_pages: number;
  protected _per_page: number;
  protected _search: any;
  protected _order_by: string;
  protected _order_direction: string;
  protected _from: string;
  protected _to: string;
  protected _promo_code_group_id: string;
  protected _fetch_options: object;

  constructor(json: any) {
    super();
    this._page = json.page || 1;
    this._total_pages = json.total_pages || undefined;
    this._per_page = json.per_page || 10;
    this._search = json.search || '';
    this._order_by = json.order_by || '';
    this._order_direction = json.order_direction || 'ASC';
    this._from = json.from || '';
    this._to = json.to || '';
    this._promo_code_group_id = json.promo_code_group_id || '';
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
    this._order_by = value;
  }

  get order_direction(): string {
    return this._order_direction;
  }

  set order_direction(value: string) {
    this._order_direction = value;
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

  get promo_code_group_id(): string {
    return this._promo_code_group_id;
  }

  set promo_code_group_id(value: string) {
    this._promo_code_group_id = value;
  }

  get fetch_options(): object {
    return this._fetch_options;
  }

  set fetch_options(value: object) {
    this._fetch_options = value;
  }

  getQueryString() {
    let query_string = [];

    this.page && query_string.push(`page=${this.page}`);
    this.per_page && query_string.push(`per_page=${this.per_page}`);
    this.order_direction && query_string.push(`order_direction=${this.order_direction}`);
    this.order_by && query_string.push(`order_by=${this.order_by}`);
    this.fetch_options &&
      Object.keys(this.fetch_options).map(eachFetchOption => {
        query_string.push(`filter_by[${eachFetchOption}]=${this.fetch_options[eachFetchOption]}`);
      });

    Array.isArray(this.search) &&
      this.search.map(e => {
        query_string.push(`search[${e.key}]=${e.value}`);
      });

    !Array.isArray(this.search) && query_string.push(`search=${this.search}`);
    return `?${query_string.join('&')}`;
  }
}
