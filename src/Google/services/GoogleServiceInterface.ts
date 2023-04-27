import BaseEntityServiceInterface from '../../common/interfaces/BaseEntityServiceInterface';
import RequestPromise from '../../common/DTO/RequestPromise';

export default interface GoogleServiceInterface extends BaseEntityServiceInterface<any> {
  getTimezoneByLatLng(lat: string, lng: string): RequestPromise;
}
