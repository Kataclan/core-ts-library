export default function extractUserBusinessRole(permissions, businessId) {
  if (!permissions || !businessId) {
    return {};
  }

  const marketIds = Object.keys(permissions.business_permission_groups[businessId]);

  return marketIds.reduce((acc, eachMarketId) => {
    const marketRoleIds = permissions.business_permission_groups[businessId][eachMarketId];

    marketRoleIds.forEach((eachRoleId) => {
      if (!acc[eachRoleId]) {
        acc[eachRoleId] = [eachMarketId];
      } else {
        acc[eachRoleId].push(eachMarketId);
      }
    });

    return acc;
  }, {});
}
