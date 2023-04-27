import DiscountPercentage from '../entity/DiscountPercentage';

export default function adaptDiscountPercentage(json: any): DiscountPercentage {
  const instance = new DiscountPercentage();

  if (json) {
    instance.precision = json.precision;
    instance.value = json.value / Math.pow(10, instance.precision);
  }

  return instance;
}
