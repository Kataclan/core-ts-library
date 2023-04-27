import axios from 'axios';

let requestInterceptor;
let responseInterceptor;

export default function initCore({
  hostname,
  onBeforeSend,
  onRequestError,
  onResponseSuccess,
  onResponseError,
  headers = [],
}) {
  requestInterceptor !== undefined && axios.interceptors.request.eject(requestInterceptor);

  requestInterceptor = axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent

      if (config.url.startsWith('/') && !config.url.startsWith('/middleware')) {
        config.url = `${hostname}${config.url}`;
      }

      if (config.url.startsWith('/') && config.url.startsWith('/middleware')) {
        config.url = `${hostname.replace('/api', '')}${config.url}`;
      }

      headers.forEach(([headerKey, headerValue, dropHeader]) => {
        // If the header we are trying to inject is already coming from the original request
        // and it was configured as weak, then we do nothing so as to not overwrite it.
        if (headerKey in config.headers && dropHeader) {
          return;
        }

        config.headers[headerKey] = headerValue;
      });

      // Because BusinessId may be an empty string due to override (BusinessRepository's findAll's qs).
      if (!config.headers.BusinessId) {
        delete config.headers.BusinessId;
      }

      onBeforeSend && onBeforeSend(config);

      return config;
    },
    function (error) {
      // Do something with request error

      onRequestError && onRequestError(error);

      return Promise.reject(error);
    }
  );

  responseInterceptor !== undefined && axios.interceptors.response.eject(responseInterceptor);

  responseInterceptor = axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      onResponseSuccess && onResponseSuccess(response);

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      onResponseError && onResponseError(error);

      return Promise.reject(error);
    }
  );
}
