import requestGet from '../../core/api/requestGet';
import requestPatch from '../../core/api/requestPatch';
import adaptSupplyCost from '../../SupplyCost/adapter/adaptSupplyCost';
import prepareSupplyCost from '../../SupplyCost/adapter/prepareSupplyCost';
import adaptSupplyCostLogItem from '../../SupplyCostLogItem/adapter/adaptSupplyCostLogItem';
import requestPost from '../../core/api/requestPost';

export default {
  findBy(qs) {
    return requestGet('/supply-costs', { qs, adapt: adaptSupplyCost });
  },

  updateMultiple(supplyCosts) {
    return requestPatch('/supply-costs', {
      data: supplyCosts.map((eachSupplyCost) => prepareSupplyCost(eachSupplyCost)),
    });
  },

  getChangesLog(journeyVehicleId) {
    return requestGet(`/supply-costs/${journeyVehicleId}/changelog`, { adapt: adaptSupplyCostLogItem });
  },

  addChangesLogNote(journeyVehicleId, note) {
    return requestPost(`/supply-costs/${journeyVehicleId}/note`, { data: { note: note } });
  },
};
