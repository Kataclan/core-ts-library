export default class RequestPromise {
  protected _requestId: string;
  protected _promise: any;

  constructor(requestId: string, promise: any) {
    this._requestId = requestId;
    this._promise = promise;
  }

  get requestId(): string {
    return this._requestId;
  }

  set requestId(value: string) {
    this._requestId = value;
  }

  get promise(): any {
    return this._promise;
  }

  set promise(value: any) {
    this._promise = value;
  }
}