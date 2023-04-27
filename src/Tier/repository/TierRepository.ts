import requestPost from '../../core/api/requestPost';
import prepareTier from '../adapter/prepareTier';
import requestPatch from '../../core/api/requestPatch';
import requestGet from '../../core/api/requestGet';
import adaptTier from '../adapter/adaptTier';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';

export default {
  create(tier) {
    return requestPost('/tiers', {
      data: prepareTier(tier),
    });
  },

  update(tier) {
    return requestPatch(`/tiers/${tier.id}`, {
      data: prepareTier(tier),
    });
  },

  find(tierId) {
    return requestGet(`/tiers/${tierId}`, {
      adapt: adaptTier,
    });
  },

  findByTravelPassId(travelPassId) {
    return resolveAllPagesGet(`/travel-passes/${travelPassId}/tiers`, {
      adapt: adaptTier,
    });
  },

  disable(tierId) {
    return requestPatch(`/tiers/${tierId}/disable`);
  },

  hasPurchases(tierId) {
    return requestGet(`/tiers/${tierId}/has_purchases`);
  },
};
