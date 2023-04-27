import Payment from '../entity/Payment';
import adaptMoney from '../../Money/adapters/adaptMoney';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptUser from '../../User/adapter/adaptUser';
import PromoCode from '../../PromoCode/entity/PromoCode';
import adaptPromoCode from '../../PromoCode/adapter/adaptPromoCode';
import adaptTransaction from '../../Transaction/adapter/adaptTransaction';
import ProductPurchase from '../../ProductPurchase/entity/ProductPurchase';
import BookedItemJourney from '../../BookedItem/entities/BookedItemJourney';
import TravelPlan from '../../TravelPlan/entity/TravelPlan';
import Product from '../../Product/entity/Product';
import PageType from '../../Page/enums/PageType';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import { baseAdapter } from '../../common/adapters/baseAdapter';
import Tier from '../../Tier/entity/Tier';

export default function adaptPayment(json: any, instance: Payment = new Payment()): Payment {
  baseAdapter(json.id, instance);
  instance.provider = json.provider;
  instance.original_amount = adaptMoney(json.original_price);
  instance.amount_paid = adaptMoney(json.real_price);
  instance.date = adaptDateTimeZone(json.created_at);

  instance.user = adaptUser(json.user);

  instance.promo_code = new PromoCode();
  instance.promo_code.id = json.promo_code_id;
  instance.promo_code.code = json.promo_code_name;

  instance.promo_code = adaptPromoCode(json.promo_code);
  instance.transactions = (json.payment_transactions || []).map((eachTransaction) => adaptTransaction(eachTransaction));

  instance.product_purchase = new ProductPurchase();

  const bookedItem = new BookedItemJourney();

  (json.journeys || []).map((each) => {
    const travelPlan = new TravelPlan();
    travelPlan.journey_id = each.id;
    travelPlan.journey_name = each.name;

    bookedItem.travel_plans.push(travelPlan);
  });

  if (json.tier?.id) {
    const tier = new Tier();
    tier.id = json.tier.id;
    tier.title = json.tier.name;

    instance.tier = tier;
  }

  instance.product_purchase.booked_items.push(bookedItem);
  instance.product_purchase.product = new Product();
  instance.product_purchase.product.id = json.product.id;
  instance.product_purchase.product.title = json.product.name;
  instance.product_purchase.product.page_type = json.product.page_type || PageType.EVENT;

  adaptMarketTrait(json, instance);

  return instance;
}
