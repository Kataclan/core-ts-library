import request from '../utils/request';

export default function requestPatch(url, config = {}) {
  return request(url, {
    method: 'PATCH',
    ...config,
  });
}
