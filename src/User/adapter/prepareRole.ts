type permissionsShape = {
  general_permissions?: any;
  individual_permissions?: any;
  business_permission_groups?: any;
};

export default function prepareRole(permissions: any) {
  const updatedPermissions: permissionsShape = {};

  if (permissions.general_permissions) {
    updatedPermissions.general_permissions = permissions.general_permissions;
  }

  if (permissions.individual_permissions) {
    updatedPermissions.individual_permissions = permissions.individual_permissions;
  }

  if (permissions.business_permission_groups) {
    updatedPermissions.business_permission_groups = permissions.business_permission_groups;
  }

  return updatedPermissions;
}
