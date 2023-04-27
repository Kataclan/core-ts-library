import request from '../utils/request';

export default function requestPost(url, config = {}) {
  return request(url, {
    method: 'POST',
    ...config,
  });
}
