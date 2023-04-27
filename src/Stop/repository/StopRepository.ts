import requestGet from '../../core/api/requestGet';
import adaptStop from '../adapter/adaptStop';
import requestPost from '../../core/api/requestPost';
import prepareStop from '../adapter/prepareStop';
import requestPatch from '../../core/api/requestPatch';
import resolveAllPagesPost from '../../core/utils/resolveAllPagesPost';

export default {
  find(id) {
    return requestGet(`/stops/${id}`, {
      adapt: adaptStop,
    });
  },

  findBy(qs) {
    return requestGet('/stops', {
      qs,
      adapt: adaptStop,
    });
  },

  create(stop) {
    return requestPost('/stops', {
      data: prepareStop(stop),
    });
  },

  createMulti(stops) {
    return requestPost('/stops', {
      data: stops.map((eachStop) => prepareStop(eachStop)),
      headers: { MarketId: stops[0].market.id },
    });
  },

  update(stop) {
    return requestPatch(`/stops/${stop.id}`, {
      data: prepareStop(stop),
    });
  },

  delete(id) {
    return requestPatch(`/stops/${id}/disable`);
  },

  hideStop(id) {
    return requestPatch(`/stops/${id}/manage-visibility`, {
      data: { hide: true },
    });
  },

  unhideStop(id) {
    return requestPatch(`/stops/${id}/manage-visibility`, {
      data: { hide: false },
    });
  },

  findAllById(stopIds = []) {
    return resolveAllPagesPost('/stops/by_id', {
      data: stopIds,
      adapt: adaptStop,
    });
  },
};
