import requestGet from '../../core/api/requestGet';
import adaptPrivateHireContent from '../adapter/adaptPrivateHireContent';
import requestPost from '../../core/api/requestPost';
import preparePrivateHireContent from '../adapter/preparePrivateHireContent';
import requestPatch from '../../core/api/requestPatch';

export default {
  find(id) {
    return requestGet(`/private-contents/${id}`, {
      adapt: adaptPrivateHireContent,
    });
  },

  findBy(qs = []) {
    return requestGet('/private-contents', {
      qs,
      adapt: adaptPrivateHireContent,
    });
  },

  create(privateProduct) {
    return requestPost('/private-contents', {
      data: preparePrivateHireContent(privateProduct),
    });
  },

  update(privateProduct) {
    return requestPatch(`/private-contents/${privateProduct.id}`, {
      data: preparePrivateHireContent(privateProduct),
    });
  },

  delete(privateProductId) {
    return requestPatch(`/private-contents/${privateProductId}/delete`);
  },
};
