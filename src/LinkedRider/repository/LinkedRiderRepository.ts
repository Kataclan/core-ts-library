import requestGet from '../../core/api/requestGet';
import adaptLinkedPass from '../adapter/adaptLinkedPass';
import LinkedRider from '../entity/LinkedRider';
import requestPatch from '../../core/api/requestPatch';
import { prepareLinkedPasses } from '../adapter/prepareLinkedPass';

export default {
  findLinkedPasses(userId: string, linkedRiderId: string) {
    return requestGet(`/users/${userId}/riders/${linkedRiderId}/linked_passes`, {
      adapt: adaptLinkedPass,
    });
  },

  saveLinkedPasses(userId: string, linkedRider: LinkedRider) {
    return requestPatch(`/users/${userId}/riders/${linkedRider.uuid.id}/linked_passes`, {
      data: prepareLinkedPasses(linkedRider),
    });
  },
};
