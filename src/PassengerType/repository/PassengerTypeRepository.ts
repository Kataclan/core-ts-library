import requestGet from '../../core/api/requestGet';
import adaptPassengerType from '../adapter/adaptPassengerType';
import requestPost from '../../core/api/requestPost';
import preparePassengerType from '../adapter/preparePassengerType';
import requestPatch from '../../core/api/requestPatch';

export default {
  find(id) {
    return requestGet(`/passenger-types/${id}`, {
      adapt: adaptPassengerType,
    });
  },

  findBy(qs) {
    return requestGet('/passenger-types', { qs, adapt: adaptPassengerType });
  },

  create(passengerType) {
    return requestPost('/passenger-types', {
      data: preparePassengerType(passengerType),
    });
  },

  update(passengerType) {
    return requestPatch(`/passenger-types/${passengerType.id}`, {
      data: preparePassengerType(passengerType),
    });
  },

  delete(passengerTypeId) {
    return requestPatch(`/passenger-types/${passengerTypeId}/delete`);
  },
};
