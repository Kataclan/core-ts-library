import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import adaptFleetOption from '../adapter/adaptFleetOption';

export default {
  findByMarketId(marketId: string) {
    return resolveAllPagesGet('/markets/fleet_options', {
      adapt: adaptFleetOption,
      headers: {
        MarketId: marketId,
      },
    });
  },
};
