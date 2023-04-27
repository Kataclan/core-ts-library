import adaptMe from '../adapter/adaptMe';
import promesify from '../../core/utils/promesify';
import requestPost from '../../core/api/requestPost';
import prepareLinkedRider from '../../LinkedRider/adapter/prepareLinkedRider';
import LinkedRiderRepository from '../../LinkedRider/repository/LinkedRiderRepository';
import clone from '../../common/utils/clone';
import requestPatch from '../../core/api/requestPatch';
import requestGet from '../../core/api/requestGet';
import prepareLoginRequest from '../../Authenticator/adapters/prepareLoginRequest';
import adaptLoginResponse from '../../Authenticator/adapters/adaptLoginResponse';
import adaptUser from '../adapter/adaptUser';
import adaptRole from '../adapter/adaptRole';
import prepareRole from '../adapter/prepareRole';
import prepareUser from '../adapter/prepareUser';
import RoleScopeType from '../../Authenticator/enums/RoleScopeType';
import SendNotificationType from '../../Notification/enums/SendNotificationType';
import TierRepository from '../../Tier/repository/TierRepository';
import PassengerTypeRepository from '../../PassengerType/repository/PassengerTypeRepository';
import StopRepository from '../../Stop/repository/StopRepository';
import TravelPassRepository from '../../TravelPass/repository/TravelPassRepository';
import prepareProcessAllocations from '../adapter/prepareProcessAllocations';
import User from '../entity/User';

export default {
  login(params) {
    return requestPost('/login', {
      data: prepareLoginRequest(params),
      adapt: adaptLoginResponse,
    });
  },

  logout() {
    return requestPost('/logout');
  },

  me() {
    return requestGet('/me', { adapt: adaptMe });
  },

  find(id) {
    return promesify(async () => {
      const { data: user, error: userError } = await requestGet(`/users/${id}`, {
        adapt: adaptUser,
      }).promise();

      if (userError) {
        return { error: userError };
      }

      const { data: userRoles, error: userRolesError } = await this.getRoles(id).promise();

      if (userRolesError) {
        return { error: userRolesError };
      }

      user.roles = Array.isArray(userRoles.business_permission_groups) ? {} : userRoles.business_permission_groups;
      user.globalPermissions = userRoles.general_permissions.map((eachPermission) => {
        return eachPermission.toUpperCase();
      });

      return { data: user };
    });
  },

  findLinkedRiders(user: User) {
    return promesify(async () => {
      const linkedPassesResponse = await Promise.all(
        user.linked_riders.map((eachLinkedRider) => {
          return LinkedRiderRepository.findLinkedPasses(user.uuid.id, eachLinkedRider.uuid.id).promise();
        })
      );

      const responsesWithError = linkedPassesResponse.filter((eachResponse) => eachResponse.error);

      if (responsesWithError.length > 0) {
        return { error: responsesWithError[0] };
      }

      const data = linkedPassesResponse.map((eachLinkedPassResponse: any, index) => {
        const linkedRider = user.linked_riders[index];

        eachLinkedPassResponse.data.forEach((eachLinkedPass) => {
          linkedRider.setLinkedPass(eachLinkedPass);
        });

        return linkedRider;
      });

      return { data };
    });
  },

  findBy(qs) {
    return requestGet('/users', {
      qs,
      adapt: adaptUser,
    });
  },

  checkEmailExists(email) {
    return requestGet(`/users/check?email=${email}`);
  },

  create(user) {
    return requestPost('/users', {
      data: prepareUser(user),
    });
  },

  update(user) {
    return requestPatch(`/users/${user.id}`, {
      data: prepareUser(user),
    });
  },

  anonymize(userId) {
    return requestPatch(`/users/${userId}/anonymize`);
  },

  getBookings(userId) {
    return requestGet(`/users/${userId}/journeys`);
  },

  changeRoles(user) {
    return requestPatch(`/users/${user.id}/role`, {
      data: {
        roles: user.role.join(','),
        operators_id: user.hasRole(RoleScopeType.OPERATOR) ? user.operators.map((eachOperator) => eachOperator.id) : [],
      },
    });
  },

  sendEmail(userId, message, subject) {
    return requestPost(`/users/${userId}/notify`, {
      data: {
        user_id: userId,
        message_type: SendNotificationType.EMAIL,
        message,
        message_subject: subject,
      },
    });
  },

  sendPush(userId, message, subject) {
    return requestPost(`/users/${userId}/notify`, {
      data: {
        user_id: userId,
        message_type: SendNotificationType.PUSH,
        message,
        message_subject: subject,
      },
    });
  },

  uploadTestTravelPassAllocations(content) {
    return promesify(async () => {
      const result = await requestPost(`/allocate/test`, {
        data: content,
      }).promise();

      const tierIds = [];
      const passengerTypeIds = [];
      const stopIds = [];

      Object.values(content).forEach((eachResultObject: any) => {
        if (!tierIds.includes(eachResultObject.tier_id)) {
          tierIds.push(eachResultObject.tier_id);
        }

        if (!passengerTypeIds.includes(eachResultObject.passenger_type_id)) {
          passengerTypeIds.push(eachResultObject.passenger_type_id);
        }

        if (!stopIds.includes(eachResultObject.journey.pickup_id)) {
          stopIds.push(eachResultObject.journey.pickup_id);
        }

        if (!stopIds.includes(eachResultObject.journey.dropoff_id)) {
          stopIds.push(eachResultObject.journey.dropoff_id);
        }
      });

      const tiersPassengerTypesAndStops = await Promise.all([
        ...tierIds.map((eachTierId) => TierRepository.find(eachTierId).promise()),
        ...passengerTypeIds.map((eachPassengerTypeId) => PassengerTypeRepository.find(eachPassengerTypeId).promise()),
        ...stopIds.map((eachStopId) => StopRepository.find(eachStopId).promise()),
      ]);

      const travelPassesFromTiers = await Promise.all(
        tiersPassengerTypesAndStops.reduce((acc, each) => {
          if (tierIds.includes(each.data?.id)) {
            acc.push(TravelPassRepository.find(each.data.travel_pass_id).promise());
          }

          return acc;
        }, [])
      );

      return {
        ...result,
        data: {
          errors: result.data,
          resolved: [...tiersPassengerTypesAndStops, ...travelPassesFromTiers].reduce((acc, each) => {
            if (each.data) {
              acc[each.data.id] = each.data;
            }

            return acc;
          }, {}),
        },
      };
    });
  },

  uploadTestUsers(content) {
    return promesify(async () => {
      const result = await requestPost(`/allocate/test`, {
        data: content,
      }).promise();

      return {
        ...result,
        data: {
          errors: result.data,
        },
      };
    });
  },

  processAllocations(data) {
    return requestPost(`/allocate/upload`, {
      data: prepareProcessAllocations(data),
    });
  },

  saveLinkedRider(userId, linkedRider) {
    if (linkedRider.isRemotelyCreated()) {
      return this.updateLinkedRider(userId, linkedRider);
    } else {
      return this.createLinkedRider(userId, linkedRider);
    }
  },

  createLinkedRider(userId, linkedRider) {
    return promesify(async () => {
      const { error: createLinkedRiderError } = await requestPost(`/users/${userId}/riders`, {
        data: [prepareLinkedRider(linkedRider)],
      }).promise();

      if (createLinkedRiderError) {
        return { error: createLinkedRiderError };
      }

      const { error: saveLinkedPassesError } = await LinkedRiderRepository.saveLinkedPasses(
        userId,
        linkedRider
      ).promise();

      if (saveLinkedPassesError) {
        return { error: saveLinkedPassesError };
      }

      const newLinkedRider = clone(linkedRider);
      newLinkedRider.created = true;

      return { data: newLinkedRider };
    });
  },

  updateLinkedRider(userId, linkedRider) {
    return promesify(async () => {
      const { error: updateLinkedRiderError } = await requestPatch(`/users/${userId}/riders/${linkedRider.uuid.id}`, {
        data: prepareLinkedRider(linkedRider),
      }).promise();

      if (updateLinkedRiderError) {
        return { error: updateLinkedRiderError };
      }

      const { error: saveLinkedPassesError } = await LinkedRiderRepository.saveLinkedPasses(
        userId,
        linkedRider
      ).promise();

      if (saveLinkedPassesError) {
        return { error: saveLinkedPassesError };
      }

      return { data: linkedRider };
    });
  },

  removeLinkedRider(userId, linkedRider) {
    return requestPatch(`/users/${userId}/riders/${linkedRider.uuid.id}/disable`);
  },

  getRoles(userId) {
    return requestGet(`/users/${userId}/role`, {
      adapt: adaptRole,
    });
  },

  updateRoles(userId, permissionsConfig) {
    return requestPatch(`/users/${userId}/role`, {
      data: prepareRole(permissionsConfig),
    });
  },

  deleteRolesFromBusiness(userId, businessId) {
    return requestPatch(`/users/${userId}/role`, {
      data: {
        business_permission_groups: { [businessId]: [] },
      },
    });
  },

  enableMFA(userId) {
    return requestPatch(`/users/${userId}/mfa/enable`);
  },

  disableMFA(userId) {
    return requestPatch(`/users/${userId}/mfa/disable`);
  },

  toggleMFA(userId, isEnabled) {
    if (isEnabled) {
      return this.disableMFA(userId);
    } else {
      return this.enableMFA(userId);
    }
  },

  revealActiveOtp(userId) {
    return requestGet(`/users/${userId}/active_otp`, {
      adapt: (data) => {
        return {
          active_otp: data.code_otp,
        };
      },
    });
  },

  revokeToken(userId) {
    return requestPost('/users/tokens/revoke', {
      data: [userId],
    });
  },

  verifyPhoneNumber(userId) {
    return requestPatch(`/users/${userId}/phone-number/verify`);
  },

  unverifyPhoneNumber(userId) {
    return requestPatch(`/users/${userId}/phone-number/unverify`);
  },
};
