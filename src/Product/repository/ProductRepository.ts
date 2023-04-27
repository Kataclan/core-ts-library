import requestGet from '../../core/api/requestGet';
import buildPage from '../../Page/adapter/buildPage';

export default {
  find(id) {
    return requestGet(`/products/${id}`, {
      adapt: buildPage,
    });
  },

  findBy(qs) {
    return requestGet('/products', {
      qs,
      adapt: buildPage,
    });
  },
};
