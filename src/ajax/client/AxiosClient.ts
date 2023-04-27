import axios, { Method } from 'axios';
import HTTPClientInterface from './HTTPClientInterface';
import HTTPRequest from '../../Request/entity/HTTPRequest';
import RequestPromise from '../../common/DTO/RequestPromise';
import ZloApiUrlProviderInterface from '../../common/interfaces/ZloApiUrlProviderInterface';

export default abstract class AxiosClient implements HTTPClientInterface {
  basepath: string;
  private cancelTokens: {};

  constructor(fromParams: ZloApiUrlProviderInterface) {
    this.basepath = fromParams.provideUrl();
    this.cancelTokens = {};
  }

  get(httpRequest: HTTPRequest) {
    httpRequest.method = 'GET';
    return this.execute(httpRequest);
  }

  post(httpRequest: HTTPRequest) {
    httpRequest.method = 'POST';
    return this.execute(httpRequest);
  }

  put(httpRequest: HTTPRequest) {
    return this.execute(httpRequest);
  }

  patch(httpRequest: HTTPRequest) {
    httpRequest.method = 'PATCH';
    return this.execute(httpRequest);
  }

  execute(httpRequest: HTTPRequest): RequestPromise {
    return new RequestPromise(
      httpRequest.id.toString(),
      new Promise((resolve, reject) => {
        axios
          .request({
            method: <Method>httpRequest.method,
            url: this.basepath + httpRequest.url + (httpRequest.queryString || ''),
            data: httpRequest.data,
            headers: httpRequest.headers,
            cancelToken: new axios.CancelToken(c => {
              // An executor function receives a cancel function as a parameter
              this.cancelTokens[httpRequest.id.toString()] = c;
            })
          })
          .then(result => {
            this.removeTokenFromCancelTokens(httpRequest.id.toString());
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      })
    );
  }

  cancel(requestId: string): void {
    let c = this.cancelTokens[requestId];
    if (c !== undefined) {
      c();
    }
  }

  removeTokenFromCancelTokens(id: string) {
    this.cancelTokens[id] && this.cancelTokens[id].delete;
  }

  getBaseUrl(): string {
    return this.basepath;
  }
}
