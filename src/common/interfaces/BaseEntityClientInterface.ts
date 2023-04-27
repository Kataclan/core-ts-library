import RequestPromise from '../../common/DTO/RequestPromise';
import HTTPRequest from '../../Request/entity/HTTPRequest';

export default interface BaseEntityClientInterface {
  getData(request: HTTPRequest): RequestPromise;

  getById(request: HTTPRequest): RequestPromise;

  create(request: HTTPRequest): RequestPromise;

  update(request: HTTPRequest): RequestPromise;

  disable(request: HTTPRequest): RequestPromise;

  cancel(requestId: string);

  getBaseUrl(): string;
}
