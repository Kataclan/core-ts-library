import ZloApiClient from '../../common/clients/ZloApiClient';
import HTTPRequest from '../../Request/entity/HTTPRequest';
import RequestPromise from '../../common/DTO/RequestPromise';
import BaseEntityClientInterface from '../../common/interfaces/BaseEntityClientInterface';

export default abstract class BaseEntityClient extends ZloApiClient implements BaseEntityClientInterface {
  protected GET_BY_ID = this.getBasepath() + '/:id';
  protected EDIT_BY_ID = this.getBasepath() + '/:id';
  protected REMOVE_BY_ID = this.GET_BY_ID + '/disable';

  // To retrieve the actual base path.
  abstract getBasepath();

  protected urlGetById(id: string): string {
    return this.GET_BY_ID.replace(':id', id);
  }

  protected urlEditById(id: string): string {
    return this.EDIT_BY_ID.replace(':id', id);
  }

  protected getRemoveByIdUrl(id: string): string {
    return this.REMOVE_BY_ID.replace(':id', id);
  }

  getData(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.url = this.getBasepath();

    return super.get(httpRequest);
  }

  getById(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.url = this.urlGetById(httpRequest.data.id);

    return super.get(httpRequest);
  }

  create(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.url = this.getBasepath();

    return super.post(httpRequest);
  }

  update(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.url = this.urlEditById(httpRequest.data.id);

    return super.patch(httpRequest);
  }

  disable(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.url = this.getRemoveByIdUrl(httpRequest.data.id);

    return super.patch(httpRequest);
  }
}
