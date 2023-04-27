import request from '../utils/request';

export default function requestGet(url, config = {}) {
  return request(url, {
    method: 'GET',
    ...config,
  });
}
