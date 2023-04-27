import axios from 'axios';

import extractPaginationData from './extractPaginationData';
import promesify from './promesify';
import prepareQueryString from './prepareQueryString';

type headerShape = {
  MarketId?: string;
  BusinessId?: string;
};

type requestType = {
  qs?: any[][];
  headers?: headerShape;
  data?: object;
  adapt?: any;
  method?: any;
};

export default function request(
  url,
  { qs = [], adapt = (data) => data, headers = {}, data: body, ...rest }: requestType = {}
) {
  const glue = qs.length > 0 ? '?' : '';
  const withHeaders = { ...headers };

  const { marketHeader, businessHeader, actualQs } = qs.reduce(
    (acc, eachQS) => {
      const [qsKey, qsValue] = eachQS;

      if (qsKey === 'filter_by[market_id][]' || qsKey === 'market_id') {
        acc.marketHeader.push(qsValue);
      } else if (qsKey === 'filter_by[business_id][]' || qsKey === 'business_id') {
        acc.businessHeader.push(qsValue);
      } else {
        acc.actualQs.push(eachQS);
      }

      return acc;
    },
    {
      marketHeader: [],
      businessHeader: [],
      actualQs: [],
    }
  );

  const fullUrl = `${url}${glue}${prepareQueryString(actualQs)}`;

  const CancelToken = axios.CancelToken;
  const { token, cancel } = CancelToken.source();

  if (marketHeader.length > 0) {
    withHeaders.MarketId = marketHeader.join(',');
  }

  if (businessHeader.length > 0) {
    withHeaders.BusinessId = businessHeader.join(',');
  }

  if (body && 'market_id' in body) {
    withHeaders.MarketId = body.market_id.toString();
  }

  if ('MarketId' in headers) {
    withHeaders.MarketId = headers.MarketId;
  }

  return promesify(async () => {
    try {
      const { status, data } = await axios({
        url: fullUrl,
        cancelToken: token,
        headers: withHeaders,
        data: body,
        ...rest,
      });

      const paginationData = Object.entries(extractPaginationData(data))
        .filter(([, value]) => value !== undefined)
        .reduce(
          (acc, each) => ({
            ...acc,
            [each[0]]: each[1],
          }),
          {}
        );

      // Because data.data can be 0 and the || evaluates it as false but we want it to be 0.
      const fromData = data.data ?? data;

      const dataToReturn = Array.isArray(fromData) ? fromData.map((each) => adapt(each)) : adapt(fromData);

      return {
        ...paginationData,
        status,
        data: dataToReturn,
        ip_market: data.ip_market ?? void 0,
      };
    } catch (error) {
      return {
        error: {
          error,
          status: error.response?.status ?? -1,
          code: error.response?.data?.code ?? -1,
          message: error.response?.data?.message ?? '',
        },
        status: error.response?.status ?? -1,
      };
    }
  }, cancel);
}
