import PrivateProduct from '../entity/PrivateProduct';
import adaptMoney from '../../Money/adapters/adaptMoney';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptTravelProduct from '../../TravelProduct/adapter/adaptTravelProduct';
import adaptUser from '../../User/adapter/adaptUser';
import adaptPayment from '../../Payment/adapter/adaptPayment';

export default function adaptPrivateProduct(
  json: any,
  instance: PrivateProduct = new PrivateProduct()
): PrivateProduct {
  let instanceAdapted = <PrivateProduct>adaptTravelProduct(json, instance);
  instanceAdapted.lead_passenger = adaptUser(json.lead_passenger);

  instanceAdapted.price = adaptMoney(json.price);
  instanceAdapted.per_seat_price = adaptMoney(json.price);
  instanceAdapted.per_seat_price.amount =
    instanceAdapted.per_seat_price.amount / (instanceAdapted.seats_on_sale || json.outbound_seats_for_sale);
  instanceAdapted.per_seat_price.amount = +(instanceAdapted.per_seat_price.amount + 0.004).toFixed(2);

  instanceAdapted.payment_limit_date = adaptDateTimeZone(json.payment_limit_date);
  instanceAdapted.payments = (json.payments || []).map((each) => adaptPayment(each));
  instanceAdapted.outbound_seats_for_sale = json.outbound_seats_for_sale;
  instanceAdapted.outbound_seats_bought = json.outbound_seats_bought;
  instanceAdapted.return_seats_for_sale = json.return_seats_for_sale;
  instanceAdapted.return_seats_bought = json.return_seats_bought;
  instanceAdapted.allow_book_once_paid = json.allow_book_once_paid;

  return instanceAdapted;
}
