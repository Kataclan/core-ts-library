import requestGet from '../../core/api/requestGet';
import adaptPrivateProduct from '../adapter/adaptPrivateProduct';
import requestPost from '../../core/api/requestPost';
import preparePrivateProduct from '../adapter/preparePrivateProduct';
import requestPatch from '../../core/api/requestPatch';

export default {
  find(id) {
    return requestGet(`/private-bookings/${id}`, {
      adapt: adaptPrivateProduct,
    });
  },

  findBy(qs) {
    return requestGet('/private-bookings', {
      qs,
      adapt: adaptPrivateProduct,
    });
  },

  create(privateProduct) {
    return requestPost('/private-bookings', {
      data: preparePrivateProduct(privateProduct),
    });
  },

  update(privateProduct) {
    return requestPatch(`/private-bookings/${privateProduct.id}`, {
      data: preparePrivateProduct(privateProduct),
    });
  },

  delete(privateProductId) {
    return requestPatch(`/private-bookings/${privateProductId}/delete`);
  },
};
