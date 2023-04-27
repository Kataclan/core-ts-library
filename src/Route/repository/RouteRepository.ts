import requestGet from '../../core/api/requestGet';
import adaptRoute from '../adapter/adaptRoute';

export default {
  find(id) {
    return requestGet(`/routes/${id}`, {
      adapt: adaptRoute,
    });
  },

  findBy(qs) {
    return requestGet('/routes', {
      adapt: adaptRoute,
      qs,
    });
  },
};
