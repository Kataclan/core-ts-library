import HTTPRequest from '../../Request/entity/HTTPRequest';
import RequestPromise from '../../common/DTO/RequestPromise';

export default interface HTTPClientInterface {
  get(httprequest: HTTPRequest): RequestPromise;

  post(httprequest: HTTPRequest): RequestPromise;

  put(httprequest: HTTPRequest): RequestPromise;

  patch(httprequest: HTTPRequest): RequestPromise;

  execute(request: HTTPRequest): RequestPromise;

  cancel(id: string): void;

  getBaseUrl(): string;
}
