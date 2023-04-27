import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import ProductRepository from '../../Product/repository/ProductRepository';
import requestPost from '../../core/api/requestPost';
import requestPatch from '../../core/api/requestPatch';
import adaptPromoCode from '../adapter/adaptPromoCode';
import preparePromoCode from '../adapter/preparePromoCode';

export default {
  find(id) {
    return promesify(async () => {
      const { data: promocode, error } = await requestGet(`/promo-codes/${id}`, {
        adapt: adaptPromoCode,
      }).promise();

      if (error) {
        return {
          ...error,
        };
      }

      const products = await Promise.all(
        promocode.associated_events.map((eachEventProduct) => ProductRepository.find(eachEventProduct.id).promise())
      );

      promocode.associated_events = products.map((eachProductDTO) => eachProductDTO.data);

      return {
        data: promocode,
      };
    });
  },

  findBy(qs = []) {
    return requestGet('/promo-codes', {
      qs,
      adapt: adaptPromoCode,
    });
  },

  create(vehicle) {
    return requestPost('/promo-codes', {
      data: preparePromoCode(vehicle),
    });
  },

  update(vehicle) {
    return requestPatch(`/promo-codes/${vehicle.id}`, {
      data: preparePromoCode(vehicle),
    });
  },

  delete(vehicleId) {
    return requestPatch(`/promo-codes/${vehicleId}/delete`);
  },
};
