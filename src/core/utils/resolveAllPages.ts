import promesify from './promesify';
import request from './request';

type headerShape = {
  MarketId?: string;
  BusinessId?: string;
};

type requestType = {
  qs?: any[][];
  perPage?: number;
  headers?: headerShape;
  data?: object;
  adapt?: any;
  method?: any;
  parseResult?: any;
};

export default function resolveAllPages(
  url,
  {
    qs = [],
    perPage = 50,
    adapt = (data) => data,
    headers = {},
    method,
    parseResult = (data) => data,
    ...rest
  }: requestType = {}
) {
  return promesify(async () => {
    const adaptedList = [];
    const promises = [];

    try {
      const { data: dataFirstPage, totalPages, count } = await request(url, {
        qs: [...qs, ['per_page', perPage], ['page', 1]],
        headers,
        method,
        ...rest,
      }).promise();

      for (let currentPage = 1; currentPage < totalPages; currentPage++) {
        promises.push(
          request(url, {
            qs: [...qs, ['per_page', perPage], ['page', currentPage + 1]],
            headers,
            method,
            ...rest,
          }).promise()
        );
      }

      const resolvedList = await Promise.all(promises);
      adaptedList.push(...dataFirstPage.map((eachData) => adapt(eachData)));
      resolvedList.forEach((eachList) => {
        adaptedList.push(...eachList.data.map((eachData) => adapt(eachData)));
      });

      return {
        data: parseResult(adaptedList),
        page: 1,
        totalPages: 1,
        count,
        perPage: count,
      };
    } catch (error) {
      const toReturn = {
        error,
        status: -1,
        message: '',
      };

      if (error.response) {
        if (error.response.code) {
          toReturn.status = error.response.code;
        }

        if (error.response.message) {
          toReturn.message = error.response.message;
        }
      }

      return toReturn;
    }
  });
}
