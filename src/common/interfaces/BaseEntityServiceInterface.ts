import BaseRequest from '../../Request/BaseRequest/entity/BaseRequest';
import RequestPromise from '../DTO/RequestPromise';

export default interface BaseEntityServiceInterface<T> {
  get(request: BaseRequest): RequestPromise;

  getById(id: string, options?: any): RequestPromise;

  create(instance: T): RequestPromise;

  update(instance: T): RequestPromise;

  disable(id: string): RequestPromise;

  cancel(requestId: string);
}
