import HTTPRequest from '../../Request/entity/HTTPRequest';
import RequestPromise from '../../common/DTO/RequestPromise';
import HTTPClientInterface from '../../ajax/client/HTTPClientInterface';

export default abstract class ZloApiClient {
  private http_client: HTTPClientInterface;

  constructor(http_client: HTTPClientInterface) {
    this.http_client = http_client;
  }

  get(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.headers = { ...httpRequest.headers, ...this.getAuthorizationHeader() };
    return this.http_client.get(httpRequest);
  }

  post(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.headers = { ...httpRequest.headers, ...this.getAuthorizationHeader() };
    return this.http_client.post(httpRequest);
  }

  put(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.headers = { ...httpRequest.headers, ...this.getAuthorizationHeader() };
    return this.http_client.put(httpRequest);
  }

  patch(httpRequest: HTTPRequest): RequestPromise {
    httpRequest.headers = { ...httpRequest.headers, ...this.getAuthorizationHeader() };
    return this.http_client.patch(httpRequest);
  }

  cancel(requestId: string) {
    return this.http_client.cancel(requestId);
  }

  getBaseUrl() {
    return this.http_client.getBaseUrl();
  }

  private getAuthorizationHeader() {
    let headers = {};
    const user_session_json = localStorage.getItem('zlo_admin_session');

    if (user_session_json) {
      const user_session = JSON.parse(user_session_json);
      headers['Authorization'] = this.prepareAuthorizationHeader(user_session);
    }

    return headers;
  }

  private prepareAuthorizationHeader(session) {
    return `${session.token_type} ${session.access_token}`;
  }
}
