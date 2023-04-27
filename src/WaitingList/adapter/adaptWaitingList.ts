import WaitingList from '../entity/WaitingList';

export default function adaptWaitingList(json: any, instance: WaitingList = new WaitingList()): WaitingList {
  instance.waitingListId = json.waitlist_id;
  instance.customerId = json.customer_id;
  instance.customerName = json.customer_name;
  instance.customerEmail = json.customer_email;
  instance.recurringProductId = json.recurring_product_id;
  instance.recurringProductName = json.recurring_product_name;
  instance.travelPassId = json.travel_pass_id;
  instance.isUnlimited = json.is_unlimited;
  instance.tierId = json.tier_id;
  instance.tierName = json.tier_name;
  instance.pickupStopId = json.pickup_stop_id;
  instance.pickupStopName = json.pickup_stop_name;
  instance.dropoffStopId = json.dropoff_stop_id;
  instance.dropoffStopName = json.dropoff_stop_name;
  instance.concessionsSelected = json.concessions_selected;
  instance.seats = json.seats;
  instance.isExpired = json.is_expired;
  instance.reservationExpiresAt = json.reservation_expires_at;
  instance.reservationId = json.reservation_id;
  instance.unsubscribedAt = json.unsubscribed_at;

  return instance;
}
