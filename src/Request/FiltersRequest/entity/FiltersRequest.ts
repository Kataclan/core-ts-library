import BaseRequest from '../../BaseRequest/entity/BaseRequest';

export default class FiltersRequest extends BaseRequest {
  getQueryString() {
    let queryString = [];
    this._page && queryString.push(`page=${this._page}`);
    this._per_page && queryString.push(`per_page=${this._per_page}`);
    this._order_direction && queryString.push(`order_direction=${this._order_direction}`);
    this._order_by && queryString.push(`order_by=${this._order_by}`);
    // this._search && queryString.push(`search=${this._search}`);

    this._search &&
      Array.isArray(this.search) &&
      this.search.map(e => {
        queryString.push(`search[${Object.keys(e)[0]}]=${e[Object.keys(e)[0]]}`);
      });

    this._search && !Array.isArray(this.search) && queryString.push(`search=${this.search}`);
    return `?${queryString.join('&')}`;
  }
}
