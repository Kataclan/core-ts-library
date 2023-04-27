import requestGet from '../../core/api/requestGet';
import adaptMarket from '../adapter/adaptMarket';

export default {
  find(id) {
    return requestGet(`/markets/${id}`, {
      adapt: adaptMarket,
      qs: [['includeHidden', true]],
    });
  },

  findAll({ includeHidden = true, qs = [] } = {}) {
    return requestGet(`/markets`, {
      adapt: adaptMarket,
      qs: [...qs, ['includeHidden', includeHidden]],
    });
  },
};
