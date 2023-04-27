import Role from '../../Authenticator/enums/Role';
import Permission from '../../Authenticator/enums/Permission';
import GlobalPermission from '../../Authenticator/enums/GlobalPermission';

export default function adaptRole(json: rolesType) {
  return {
    general_permissions: json.general_permissions,
    business_permission_groups: json.business_permission_groups,
    individual_permissions: json.individual_permissions,
  };
}

type BusinessPermissionGroup = {
  [key: string]: Role[];
};

type IndividualPermission = {
  [key: string]: Permission[];
};

type rolesType = {
  general_permissions: GlobalPermission[];
  business_permission_groups: BusinessPermissionGroup;
  individual_permissions: IndividualPermission;
};
