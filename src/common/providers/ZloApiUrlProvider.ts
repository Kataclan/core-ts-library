import ZloApiUrlProviderInterface from '../interfaces/ZloApiUrlProviderInterface';

export default class ZloApiUrlProvider implements ZloApiUrlProviderInterface {
  fromParams: any;
  
  constructor(fromParams) {
    this.fromParams = fromParams;
  }
  
  provideUrl(): string {
    return this.fromParams.getRequestUrl();
  }
}