import BaseEntity from '../../common/entities/BaseEntity';
import PassengerType from '../../PassengerType/entity/PassengerType';
import ProductPurchase from '../../ProductPurchase/entity/ProductPurchase';
import TravelPass from '../../TravelPass/entity/TravelPass';
import Tier from '../../Tier/entity/Tier';
import Stop from '../../Stop/entity/Stop';

export default class LinkedPass extends BaseEntity {
  passenger_type: PassengerType;
  travel_pass: TravelPass;
  tier: Tier;
  pickup: Stop;
  dropoff: Stop;
  product_purchase: ProductPurchase;
}
