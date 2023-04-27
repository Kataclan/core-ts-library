import TravelPlan from '../entity/TravelPlan';
import UUID from '../../UUID/UUID';
import User from '../../User/entity/User';
import adaptPassengerType from '../../PassengerType/adapter/adaptPassengerType';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptMoney from '../../Money/adapters/adaptMoney';
import Product from '../../Product/entity/Product';
import LinkedRider from '../../LinkedRider/entity/LinkedRider';

export default function adaptTravelPlan(json: any, instance = new TravelPlan()): TravelPlan {
  instance.id = json.travel_plan_id;
  instance.uuid = UUID.fromString(json.travel_plan_id);
  instance.journey_stop_id__pickup = json.pickup.journey_stop_id;
  instance.journey_stop_name__pickup = json.pickup.stop.name;
  instance.journey_vehicle_stop_id__pickup = json.pickup.journey_vehicle_stop_id;
  if (json.dropoff) {
    instance.journey_stop_id__dropoff = json.dropoff.journey_stop_id;
    instance.journey_stop_name__dropoff = json.dropoff.stop.name;
    instance.journey_vehicle_stop_id__dropoff = json.dropoff.journey_vehicle_stop_id;
  }
  instance.journey_vehicle_id = json.journey_vehicle_id;
  instance.journey_id = UUID.fromString(json.journey.id);
  instance.journey_name = json.journey.name;
  instance.not_traveling = json.not_travelling;
  instance.is_completed = json.completed;
  instance.is_live = json.live;
  instance.is_used = json.used;
  instance.is_reservation = json.is_reservation;
  instance.has_failed = json.failed;
  instance.product_purchase_id = json.product_purchase_id;
  instance.payment_ids = json.payments;
  instance.notification_sent = json.notification_send;
  instance.purchaseType = json.travel_pass_type;
  instance.journey_vehicle_stop_id_boarded_at = json.boarded_at;
  instance.journey_vehicle_stop_id_unboarded_at = json.unboarded_at;
  instance.compulsory_scan = json.compulsory_scan;

  const product = new Product();
  product.id = json.product_id;
  product.uuid = UUID.fromString(json.product_id);
  product.title = json.product_name;
  product.page_type = json.page.type;
  instance.product = product;
  // instance.product = adaptProduct(json.product);

  instance.departure_date = adaptDateTimeZone(json.pickup.departure_date);
  instance.arrival_date = json.dropoff ? adaptDateTimeZone(json.dropoff.arrival_date) : null;
  instance.original_amount = adaptMoney(json.original_amount);
  instance.paid_amount = adaptMoney(json.amount_paid);

  const customer = new User();
  customer.id = json.user.id;
  customer.uuid = UUID.fromString(json.user.id);
  customer.name = json.user.name;
  instance.customer = customer;
  instance.passenger_type = adaptPassengerType(json.passenger_type);

  const rider = new LinkedRider();
  rider.id = json.rider_id;
  rider.uuid = UUID.fromString(json.rider_id);
  instance.rider = rider;

  return instance;
}
