import moment from 'moment-timezone';
import requestGet from '../../core/api/requestGet';
import adaptLocation from '../adapters/adaptLocation';
import promesify from '../../core/utils/promesify';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';

export default {
  find(id) {
    return requestGet(`/locations/${id}`, {
      adapt: adaptLocation,
    });
  },

  findBy(qs) {
    return promesify(async () => {
      const { data } = await requestGet('/locations', {
        qs,
        adapt: adaptLocation,
      }).promise();

      return {
        data,
        withSearch: qs.find(([key]) => key === 'search')[1],
      };
    });
  },

  calculateTimeBetweenLocations(fromLocation, toLocation) {
    const fromLat = fromLocation.latitude;
    const fromLng = fromLocation.longitude;
    const toLat = toLocation.latitude;
    const toLng = toLocation.longitude;

    return requestGet(`/locations/${fromLat},${fromLng}/distance/${toLat},${toLng}`);
  },

  getTimezoneByLatLng(lat, lng) {
    return promesify(async () => {
      const { data: timezoneResponse, error } = await requestGet(
        `/maps/api/timezone/json?language=en&location=${lat}${encodeURIComponent(
          ','
        )}${lng}&timestamp=${moment().format('X')}`
      ).promise();

      if (error) {
        return { error };
      }

      return {
        data: {
          timezone: timezoneResponse.timeZoneId,
          name: timezoneResponse.timeZoneName,
        },
      };
    });
  },

  findCloseLocations: (lat, lng, radius, marketId) => {
    return resolveAllPagesGet(`/close-locations-and-stops`, {
      qs: [
        ['lat', lat],
        ['lng', lng],
        ['rad', radius],
      ],
      adapt: adaptLocation,
      headers: {
        MarketId: marketId,
      },
    });
  },
};
