import requestGet from '../../core/api/requestGet';
import buildPage from '../adapter/buildPage';

export default {
  getPageBySlug(slug) {
    return requestGet('/pages', {
      qs: [['slug', encodeURI(slug)]],
      adapt: buildPage,
    });
  },
};
