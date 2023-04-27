import BaseEntity from '../../common/entities/BaseEntity';

export default class WaitingList extends BaseEntity {
  waitingListId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  recurringProductId: string;
  recurringProductName: string;
  travelPassId: string;
  isUnlimited: boolean;
  tierId: string;
  tierName: string;
  pickupStopId: string;
  pickupStopName: string;
  dropoffStopId: string;
  dropoffStopName: string;
  concessionsSelected: string;
  seats: number;
  isExpired: boolean;
  reservationExpiresAt: string;
  reservationId: string;
  unsubscribedAt: string;
}
