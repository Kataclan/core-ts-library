import LinkedPass from '../entity/LinkedPass';
import TravelPass from '../../TravelPass/entity/TravelPass';
import UUID from '../../UUID/UUID';
import PassengerType from '../../PassengerType/entity/PassengerType';
import Tier from '../../Tier/entity/Tier';
import Stop from '../../Stop/entity/Stop';
import ProductPurchase from '../../ProductPurchase/entity/ProductPurchase';

type response = {
  product_id: string;
  product_name: string;
  passenger_type_id: string;
  passenger_type_name: string;
  tier_id: string;
  tier_name: string;
  unlimited: boolean;
  product_purchase_id: string;
  pickup_stop_id: string;
  pickup_stop_name: string;
  dropoff_stop_id: string;
  dropoff_stop_name: string;
};

export default function adaptLinkedPass(json: response, linkedPass: LinkedPass = new LinkedPass()): LinkedPass {
  linkedPass.created = true;

  linkedPass.travel_pass = new TravelPass();
  linkedPass.travel_pass.uuid = UUID.fromString(json.product_id);
  linkedPass.travel_pass.id = json.product_id;
  linkedPass.travel_pass.title = json.product_name;

  linkedPass.passenger_type = new PassengerType();
  linkedPass.passenger_type.uuid = UUID.fromString(json.passenger_type_id);
  linkedPass.passenger_type.id = json.passenger_type_id;
  linkedPass.passenger_type.name = json.passenger_type_name;

  linkedPass.product_purchase = new ProductPurchase();
  linkedPass.product_purchase.uuid = UUID.fromString(json.product_purchase_id);
  // @ts-ignore
  linkedPass.product_purchase.uuid.id = [json.product_purchase_id];
  // @ts-ignore
  linkedPass.product_purchase.id = [json.product_purchase_id];

  if (json.tier_id) {
    linkedPass.tier = new Tier();
    linkedPass.tier.uuid = UUID.fromString(json.tier_id);
    linkedPass.tier.id = json.tier_id;
    linkedPass.tier.title = json.tier_name;
    linkedPass.tier.unlimited_rides = json.unlimited;
    linkedPass.tier.travel_pass_id = json.product_id;
  }

  linkedPass.pickup = new Stop();
  linkedPass.pickup.uuid = UUID.fromString(json.pickup_stop_id);
  linkedPass.pickup.id = json.pickup_stop_id;
  linkedPass.pickup.name = json.pickup_stop_name;

  linkedPass.dropoff = new Stop();
  linkedPass.dropoff.uuid = UUID.fromString(json.dropoff_stop_id);
  linkedPass.dropoff.id = json.dropoff_stop_id;
  linkedPass.dropoff.name = json.dropoff_stop_name;

  return linkedPass;
}
