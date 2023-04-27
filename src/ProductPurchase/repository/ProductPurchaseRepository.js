import requestPost from '../../core/api/requestPost';
import requestPatch from '../../core/api/requestPatch';

export default {
  changeStops(stop_pickup_id, stop_dropoff_id, travel_pass_id, product_purchase_id) {
    return requestPost(`/product-purchases/${product_purchase_id}/change-travel-pass-stop`, {
      data: {
        stop_pickup_id,
        stop_dropoff_id,
        travel_pass_id,
        product_purchase_id, // TODO: Check if necessary here or just for the URL.
      },
    });
  },

  removeCredits(productPurchaseId, credits) {
    return requestPatch(`/product-purchases/${productPurchaseId}/credits`, {
      data: { credits: Math.abs(credits) * -1 },
    });
  },

  disableAutoTopUp(product_purchase_id) {
    return requestPatch(`/product-purchases/${product_purchase_id}/top_up/disable`);
  },

  unpurchase(productPurchaseId) {
    return requestPatch(`/product-purchases/${productPurchaseId}/unpurchase`);
  },

  suspend(productPurchaseId) {
    return requestPatch(`/product-purchases/${productPurchaseId}/suspend`);
  },

  reactivate(productPurchaseId) {
    return requestPatch(`/product-purchases/${productPurchaseId}/reactivate`);
  },
};
