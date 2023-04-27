import BaseRequest from '../../BaseRequest/entity/BaseRequest';

export default class ArraySearchRequest extends BaseRequest {
  getQueryString() {
    let queryString = [];

    this._page && queryString.push(`page=${this._page}`);
    this._per_page && queryString.push(`per_page=${this._per_page}`);
    this._order_direction && queryString.push(`order_direction=${this._order_direction}`);
    this._order_by && queryString.push(`order_by=${this._order_by}`);
    this._from && queryString.push(`from=${this._from}`);
    this._to && queryString.push(`to=${this._to}`);
    this._search &&
      this._search.map(e => {
        queryString.push(`search[${e.key}]=${e.value}`);
      });

    return `?${queryString.join('&')}`;
  }
}
