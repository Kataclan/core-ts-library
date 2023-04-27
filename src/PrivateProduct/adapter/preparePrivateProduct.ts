import PrivateProduct from '../entity/PrivateProduct';
import prepareMoney from '../../Money/adapters/prepareMoney';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import prepareTravelProduct from '../../TravelProduct/adapter/prepareTravelProduct';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function preparePrivateProduct(instance: PrivateProduct): any {
  return {
    ...prepareTravelProduct(instance),
    outbound_seats_for_sale: instance.seats_on_sale,
    return_seats_for_sale: instance.seats_on_sale,
    lead_passenger: instance.lead_passenger,
    lead_passenger_id: instance.lead_passenger.id,

    price: prepareMoney(instance.price),
    per_seat_price: prepareMoney(instance.per_seat_price),

    // journey_groups: instance.journey_groups.map(each => this.journeyGroupAdapter.transformToPayload(each)),
    payment_limit_date: prepareDateTimeZone(instance.payment_limit_date),
    allow_book_once_paid: instance.allow_book_once_paid,
    ...prepareMarketTrait(instance),
  };
}
