import User from '../entity/User';
import { baseAdapter } from '../../common/adapters/baseAdapter';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';
import adaptRole from './adaptRole';

export default function adaptMe(json: any, instance: User = new User()): User {
  baseAdapter(json.user_id, instance);

  instance.name = json.name;
  instance.surname = json.surname;
  instance.email = json.email;
  instance.phone = adaptPhoneNumber(json.phone);

  const { business_permissions, general_permissions, permission_groups } = json.granted_permissions;

  if (business_permissions) {
    instance.businessPermissions = Object.entries(business_permissions).reduce(
      (acc, [businessId, businessPermissionsByMarketId]) => {
        acc[businessId] = Object.entries(businessPermissionsByMarketId).reduce(
          (acc2, [marketId, marketPermissions]) => {
            acc2[marketId] = marketPermissions.map((eachPermission) => eachPermission.toUpperCase());

            return acc2;
          },
          {}
        );

        return acc;
      },
      {}
    );
  }

  instance.grantedMarketIds = json.granted_markets;
  instance.roles = permission_groups;
  instance.globalPermissions = general_permissions.map((eachPermission) => {
    return eachPermission.toUpperCase();
  });
  instance.permissions = adaptRole(json);
  instance.mfaEnabled = json.mfa_enabled;

  return instance;
}
