import DiscountPercentage from '../entity/DiscountPercentage';

export default function prepareDiscountPercentage(discountPercentage: DiscountPercentage): any {
  return {
    value: discountPercentage.value * Math.pow(10, discountPercentage.precision),
    precision: discountPercentage.precision,
  };
}
