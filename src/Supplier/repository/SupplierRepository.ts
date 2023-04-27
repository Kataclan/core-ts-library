import requestGet from '../../core/api/requestGet';
import adaptSupplier from '../adapter/adaptSupplier';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import requestPost from '../../core/api/requestPost';
import prepareSupplier from '../adapter/prepareSupplier';
import preparePhoneNumber from '../../PhoneNumber/adapter/preparePhoneNumber';
import requestPatch from '../../core/api/requestPatch';

export default {
  find(id) {
    return requestGet(`/suppliers/${id}`, {
      adapt: adaptSupplier,
    });
  },

  findBy(qs) {
    return requestGet('/suppliers', {
      qs,
      adapt: adaptSupplier,
    });
  },

  findManageableSuppliers(qs = []) {
    return requestGet('/suppliers', {
      qs: [...qs, ['can_admin', true]],
      adapt: adaptSupplier,
    });
  },

  findAllBy: (qs) => {
    return resolveAllPagesGet('/suppliers', {
      qs,
      adapt: adaptSupplier,
    });
  },

  create(supplier) {
    return requestPost('/suppliers', {
      data: prepareSupplier(supplier),
    });
  },

  createPhoneNumber(phoneNumber, supplier) {
    return requestPost(`/suppliers/${supplier.id}/phone-number`, {
      data: preparePhoneNumber(phoneNumber),
    });
  },

  update(supplier) {
    return requestPatch(`/suppliers/${supplier.id}`, {
      data: prepareSupplier(supplier),
    });
  },

  delete(id) {
    return requestPatch(`/suppliers/${id}/disable`);
  },

  attachFiles(supplierId, filesConfig = {}) {
    return requestPatch(`/suppliers/${supplierId}/files`, {
      data: filesConfig,
    });
  },
};
