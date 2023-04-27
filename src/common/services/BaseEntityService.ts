import BaseEntityServiceInterface from '../interfaces/BaseEntityServiceInterface';
import BaseEntityClientInterface from '../interfaces/BaseEntityClientInterface';
import TransformerInterface from '../interfaces/TransformerInterface';
import BaseRequest from '../../Request/BaseRequest/entity/BaseRequest';
import DefinitiveFiltersRequest from '../../Request/DefinitiveFiltersRequest/entity/DefinitiveFiltersRequest';
import RequestPromise from '../DTO/RequestPromise';
import HTTPRequest from '../../Request/entity/HTTPRequest';
import clone from '../utils/clone';
import prepareMarketHeader from '../../Market/utils/prepareMarketHeader';

export default abstract class BaseEntityService<T> implements BaseEntityServiceInterface<T> {
  protected client: BaseEntityClientInterface;
  protected transformer: TransformerInterface<T>;

  constructor(client: BaseEntityClientInterface, transformer: TransformerInterface<T>) {
    this.client = client;
    this.transformer = transformer;
  }

  protected adaptPagination(responseFromAPI: any): object {
    const { data: dataToAdapt, ...paginationInfo } = responseFromAPI;

    return {
      paginationInfo,
      data: dataToAdapt.map((each) => this.transformer.transformToEntity(each)),
    };
  }

  protected adaptPaginationFromTransformer(responseFromAPI: any, transformer): object {
    const { data: dataToAdapt, ...paginationInfo } = responseFromAPI;

    return {
      paginationInfo,
      data: dataToAdapt.map((each) => transformer(each)),
    };
  }

  get(request: BaseRequest | DefinitiveFiltersRequest): RequestPromise {
    const httpRequest = new HTTPRequest();

    const clonedRequest = <DefinitiveFiltersRequest>clone(request);

    if (clonedRequest.filter_by) {
      httpRequest.headers = {
        ...prepareMarketHeader(clonedRequest.filter_by),
      };

      clonedRequest.filter_by = clonedRequest.filter_by.filter((each) => each.groupBy !== 'market');
    }

    httpRequest.queryString = clonedRequest.getQueryString();

    const requestPromise = this.client.getData(httpRequest);

    return new RequestPromise(
      requestPromise.requestId,
      new Promise(async (resolve, reject) => {
        try {
          const { data } = await requestPromise.promise;
          resolve(this.adaptPagination(data));
        } catch (err) {
          reject(err);
        }
      })
    );
  }

  getById(id: string, options: any = {}): RequestPromise {
    const httpRequest = new HTTPRequest();
    httpRequest.data = { id };

    const requestPromise = this.client.getById(httpRequest);

    return new RequestPromise(
      requestPromise.requestId,
      new Promise(async (resolve, reject) => {
        try {
          const { data } = await requestPromise.promise;
          resolve(this.transformer.transformToEntity(data.data));
        } catch (err) {
          reject(err);
        }
      })
    );
  }

  create(instance: T | any): RequestPromise {
    const httpRequest = new HTTPRequest();

    httpRequest.data = this.transformer.transformToPayload(instance);

    if (instance.market) {
      httpRequest.headers = {
        MarketId: instance.market.id,
      };
    }

    return this.client.create(httpRequest);
  }

  update(instance: T | any): RequestPromise {
    const httpRequest = new HTTPRequest();

    httpRequest.data = this.transformer.transformToPayload(instance);

    if (instance.market) {
      httpRequest.headers = {
        MarketId: instance.market.id,
      };
    }

    return this.client.update(httpRequest);
  }

  disable(id: string): RequestPromise {
    const httpRequest = new HTTPRequest();
    httpRequest.data = { id };

    return this.client.disable(httpRequest);
  }

  cancel(requestId: string) {
    this.client.cancel(requestId);
  }

  customResolveWithAdapt(reqPromise: RequestPromise, adaptMethod: Function): RequestPromise {
    return new RequestPromise(
      reqPromise.requestId,
      new Promise(async (res, rej) => {
        try {
          const { data } = await reqPromise.promise;
          res(adaptMethod(data));
        } catch (err) {
          rej(err);
        }
      })
    );
  }

  resolveAllPages(
    requestPromise: RequestPromise,
    method: any,
    httpRequest: HTTPRequest,
    jsonToFilterFrom: any,
    adapter: Function
  ): RequestPromise {
    return new RequestPromise(
      requestPromise.requestId,
      new Promise(async (resolve, reject) => {
        const list = [];
        const perPage = 200;

        try {
          const { data } = await requestPromise.promise;
          const total_pages = Math.ceil(data.total / perPage);
          const promises = [];

          for (let i = 0; i < total_pages; i++) {
            httpRequest.queryString = DefinitiveFiltersRequest.getQueryStringFromJson(
              Object.assign({}, jsonToFilterFrom, { per_page: perPage, page: i + 1 })
            );

            promises.push(method(httpRequest).promise);
          }

          const newList = await Promise.all(promises);
          newList.forEach((eachList) => {
            list.push(...eachList.data.data.map((e) => adapter(e)));
          });

          resolve(list.filter((each, index, array) => array.findIndex((e) => e.id === each.id) === index));
        } catch (err) {
          reject(err);
        }
      })
    );
  }
}
