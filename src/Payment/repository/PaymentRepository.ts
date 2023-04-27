import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptPayment from '../adapter/adaptPayment';
import requestPatch from '../../core/api/requestPatch';
import prepareMoney from '../../Money/adapters/prepareMoney';
import ProductRepository from '../../Product/repository/ProductRepository';

export default {
  find(id, { fetchProducts = true } = {}) {
    return promesify(async () => {
      const { data: payment, error, ...rest } = await requestGet(`/payments/${id}`, {
        adapt: adaptPayment,
      }).promise();

      if (error) {
        return {
          error,
        };
      }

      if (fetchProducts) {
        const { data: product } = await ProductRepository.find(payment.product_purchase.product.id).promise();
        payment.product_purchase.product = product;
      }

      return { data: payment, ...rest };
    });
  },

  findBy(qs) {
    return requestGet('/payments', {
      qs,
      adapt: adaptPayment,
    });
  },

  refund(paymentId, amount) {
    return requestPatch(`/payments/${paymentId}/refund`, {
      data: {
        amount: prepareMoney(amount).amount,
      },
    });
  },

  release(paymentId) {
    return requestPatch(`/payments/${paymentId}/release`);
  },

  capture(paymentId) {
    return requestPatch(`/payments/${paymentId}/capture`);
  },
};
