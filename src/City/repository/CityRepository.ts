import requestGet from '../../core/api/requestGet';
import adaptCity from '../adapter/adaptCity';
import requestPost from '../../core/api/requestPost';
import prepareCity from '../adapter/prepareCity';

export default {
  findBy(qs = []) {
    return requestGet('/administrative-authorities-lvl4', {
      qs,
      adapt: adaptCity,
    });
  },

  create(city) {
    return requestPost('/administrative-authorities-lvl4', {
      data: prepareCity(city),
    });
  },
};
