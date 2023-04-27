import requestGet from '../../core/api/requestGet';
import adaptOperator from '../adapter/adaptOperator';
import requestPost from '../../core/api/requestPost';

export default {
  findAllBy(qs = []) {
    return requestGet(`/operators`, {
      adapt: adaptOperator,
      qs,
    });
  },

  selectActiveOperator(operatorId) {
    return requestPost(`/operators/${operatorId}/select`);
  },
};
