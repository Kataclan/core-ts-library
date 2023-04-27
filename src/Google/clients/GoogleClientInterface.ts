import BaseEntityClientInterface from '../../common/interfaces/BaseEntityClientInterface';
import HTTPRequest from '../../Request/entity/HTTPRequest';
import RequestPromise from '../../common/DTO/RequestPromise';

export default interface GoogleClientInterface extends BaseEntityClientInterface {
  getTimezoneByLatLng(httpRequest: HTTPRequest): RequestPromise;
}
