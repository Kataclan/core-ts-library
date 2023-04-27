import User from '../../User/entity/User';
import requestGet from '../../core/api/requestGet';
import adaptWaitingList from '../adapter/adaptWaitingList';
import requestPatch from '../../core/api/requestPatch';

export default {
  findUserWaitingLists(user: User) {
    return requestGet(`/user/${user.uuid.id}/waitlists`, {
      adapt: adaptWaitingList,
    });
  },

  unsubscribeFromWaitingList(waitingListId) {
    return requestPatch(`/waitlist/${waitingListId}/unsubscribe`);
  },
};
