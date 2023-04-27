import moment from 'moment';

import GoogleClientInterface from './GoogleClientInterface';
import BaseEntityClient from '../../common/clients/BaseEntityClient';
import RequestPromise from '../../common/DTO/RequestPromise';
import HTTPRequest from '../../Request/entity/HTTPRequest';

export default class GoogleClient extends BaseEntityClient implements GoogleClientInterface {
  private TIMEZONE_API = `/maps/api/timezone/json?language=en&location=:lat${encodeURIComponent(
    ','
  )}:lng&timestamp=${moment().format('X')}`;

  getBasepath() {
    return '/maps';
  }

  getTimezoneByLatLngPath(lat: string, lng: string): string {
    return this.TIMEZONE_API.replace(':lat', lat).replace(':lng', lng);
  }

  getTimezoneByLatLng(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.url = this.getTimezoneByLatLngPath(httpRequest.data.lat, httpRequest.data.lng);
    return super.get(httpRequest);
  }
}
