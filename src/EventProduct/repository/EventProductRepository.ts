import requestGet from '../../core/api/requestGet';
import adaptEventProduct from '../adapter/adaptEventProduct';
import requestPost from '../../core/api/requestPost';
import prepareEventProduct from '../adapter/prepareEventProduct';
import requestPatch from '../../core/api/requestPatch';

export default {
  find(id) {
    return requestGet(`/events/${id}`, {
      adapt: adaptEventProduct,
    });
  },

  findBy(qs) {
    return requestGet('/events', {
      qs,
      adapt: adaptEventProduct,
    });
  },

  create(eventProduct) {
    return requestPost('/events', {
      data: prepareEventProduct(eventProduct),
    });
  },

  update(eventProduct) {
    return requestPatch(`/events/${eventProduct.id}`, {
      data: prepareEventProduct(eventProduct),
    });
  },

  delete(eventProductId) {
    return requestPatch(`/events/${eventProductId}/delete`);
  },
};
