import PromoCode from '../entity/PromoCode';
import DiscountType from '../../Discount/enums/DiscountType';
import adaptMoney from '../../Money/adapters/adaptMoney';
import adaptDiscountPercentage from '../../Discount/adapters/adaptDiscountPercentage';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import EventProduct from '../../EventProduct/entity/EventProduct';

export default function adaptPromoCode(json: any, instance: PromoCode = new PromoCode()): PromoCode {
  if (!json) {
    return null;
  }

  instance.id = json.id;
  instance.used = json.times_used;
  instance.code = json.slug;
  instance.supply = json.supply;
  instance.use_type = json.type;
  instance.team = json.department;

  // Conditionals because the object GIVEN by backend has different format for each
  if (json.discount_amount) {
    instance.discount_type = DiscountType.FIXED_AMOUNT;
    instance.discount_amount = adaptMoney(json.discount_amount);
    instance.value = instance.discount_amount.amount;
  } else if (json.discount_percentage) {
    instance.discount_type = DiscountType.PERCENTAGE;
    instance.discount_percentage = adaptDiscountPercentage(json.discount_percentage);
    instance.value = instance.discount_percentage.value;
  }

  instance.min_seats = json.min_seats;
  instance.max_seats = json.max_seats;
  instance.start_date = adaptDateTimeZone(json.date_from);
  instance.end_date = adaptDateTimeZone(json.date_to);
  instance.number_of_usages_per_user = json.nr_usages_per_user || void 0;
  instance.number_of_max_usages = json.nr_global_usages || void 0;
  instance.associated_events = (json.product_allowed_ids || []).map((each) => {
    const eventProduct = new EventProduct();
    eventProduct.id = each;
    eventProduct.uuid.id = each;
    return eventProduct;
  });
  instance.number_of_promo_codes = json.number_of_promo_codes;
  instance.product_types = json.product_types_allowed || [];
  instance.platforms = json.platforms_available || [];
  instance.promo_code_group_id = json.promo_code_group_id;
  adaptMarketTrait(json, instance);

  return instance;
}
