import PromoCode from '../entity/PromoCode';
import DiscountType from '../../Discount/enums/DiscountType';
import prepareDiscountPercentage from '../../Discount/adapters/prepareDiscountPercentage';
import prepareMoney from '../../Money/adapters/prepareMoney';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function preparePromoCode(instance: PromoCode): object {
  let discount_percentage;
  let discount_amount;

  if (instance.discount_type === DiscountType.PERCENTAGE) {
    discount_percentage = prepareDiscountPercentage(instance.discount_percentage);
  } else {
    discount_amount = prepareMoney(instance.discount_amount);
  }

  return {
    id: instance.id,
    promo_code_group_id: instance.promo_code_group_id,
    slug: /\S/.test(instance.code) ? instance.code : null,
    used: instance.used,
    supply: instance.supply,
    discount_amount: discount_amount,
    discount_percentage: discount_percentage,
    department: instance.team,
    max_seats: instance.max_seats,
    min_seats: instance.min_seats,
    date_from: prepareDateTimeZone(instance.start_date),
    date_to: prepareDateTimeZone(instance.end_date),
    nr_usages_per_user: instance.number_of_usages_per_user || null,
    nr_global_usages: instance.number_of_max_usages || null,
    products_allowed_id: instance.associated_events.map((each) => each.id),
    number_of_promo_codes: instance.number_of_promo_codes || 1,
    type: instance.use_type,
    product_types_allowed: instance.product_types,
    platforms_available: instance.platforms,
    ...prepareMarketTrait(instance),
  };
}
