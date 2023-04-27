import BaseEntityService from '../../common/services/BaseEntityService';
import GoogleServiceInterface from './GoogleServiceInterface';
import RequestPromise from '../../common/DTO/RequestPromise';
import HTTPRequest from '../../Request/entity/HTTPRequest';
import GoogleClientInterface from '../clients/GoogleClientInterface';

export default class GoogleService extends BaseEntityService<any> implements GoogleServiceInterface {
  protected client: GoogleClientInterface;

  getTimezoneByLatLng(lat: string, lng: string): RequestPromise {
    const httpRequest = new HTTPRequest();
    httpRequest.data = {
      lat,
      lng,
    };

    return this.client.getTimezoneByLatLng(httpRequest);
  }
}
