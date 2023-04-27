import TravelPassUser, { AvailablePassengerType } from '../entity/TravelPassUser';
import User from '../../User/entity/User';
import UUID from '../../UUID/UUID';
import ProductPurchase from '../../ProductPurchase/entity/ProductPurchase';
import adaptTravelPass from './adaptTravelPass';
import Tier from '../../Tier/entity/Tier';
import adaptConcession from '../../Concession/adapter/adaptConcession';
import adaptLocation from '../../Location/adapters/adaptLocation';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import PassengerType from '../../PassengerType/entity/PassengerType';
import LinkedRider from '../../LinkedRider/entity/LinkedRider';

export default function adaptTravelPassUser(
  json: any,
  instance: TravelPassUser = new TravelPassUser()
): TravelPassUser {
  instance.available_passenger_types = json.available_passenger_types.map((eachAvailablePassengerType) => {
    const availablePassengerType = new AvailablePassengerType();

    availablePassengerType.passengerType = new PassengerType();
    availablePassengerType.passengerType.uuid = UUID.fromString(eachAvailablePassengerType.passenger_type_id);
    availablePassengerType.passengerType.id = eachAvailablePassengerType.passenger_type_id;
    availablePassengerType.passengerType.name = eachAvailablePassengerType.passenger_type_name;

    if (eachAvailablePassengerType.rider_id) {
      availablePassengerType.rider = new LinkedRider();
      availablePassengerType.rider.uuid = UUID.fromString(eachAvailablePassengerType.rider_id);
      availablePassengerType.rider.id = eachAvailablePassengerType.rider_id;
    }

    availablePassengerType.seats = eachAvailablePassengerType.seats;

    return availablePassengerType;
  });

  instance.user = new User();
  instance.user.id = json.user_id;
  instance.user.uuid = UUID.fromString(json.user_id);

  instance.product_purchase = new ProductPurchase();
  instance.product_purchase.id = json.product_purchase_id;
  instance.product_purchase.uuid = UUID.fromString(json.product_purchase_id);

  instance.travel_pass = adaptTravelPass(json.travel_pass);

  instance.concessions = (json.passenger_types_selected || []).map((e) => ({
    concession: adaptConcession(e),
    seats: e.seats,
  }));

  instance.available_rides = json.available_rides;
  instance.used_rides = json.used_rides;
  instance.total_rides = json.total_rides;
  instance.remaining_rides = json.remaining_rides;
  instance.total_expired = json.total_rides - instance.remaining_rides - instance.used_rides;

  instance.pickup = json.origin[0] ? adaptLocation(json.origin[0]) : null;
  instance.dropoff = json.destination[0] ? adaptLocation(json.destination[0]) : null;

  instance.origins = json.origin.map((each) => adaptLocation(each));
  instance.destinations = json.destination.map((each) => adaptLocation(each));

  instance.is_unlimited = json.unlimited;
  instance.is_suspended = json.is_suspended;
  instance.stored_payment_id = json.store_payment_id;

  instance.tier = new Tier();
  instance.tier.id = json.tier_id;
  instance.tier.uuid = UUID.fromString(json.tier_id);
  instance.tier.start_date = json.from_date ? adaptDateTimeZone(json.from_date) : null;
  instance.tier.end_date = json.to_date ? adaptDateTimeZone(json.to_date) : null;
  instance.tier.title = json.tier_title;
  instance.tier.unlimited_rides = json.unlimited;
  instance.isOneWay = json.is_one_way;

  return instance;
}
