import TravelPass from '../entity/TravelPass';
import prepareConcession from '../../Concession/adapter/prepareConcession';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';
import prepareProduct from '../../Product/adapter/prepareProduct';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareTravelPass(instance: TravelPass): any {
  return {
    ...prepareProduct(instance),
    allow_one_way_optin: instance.allow_one_way_opt_in,
    auto_journey_optin: instance.auto_journey_opt_in,
    allow_repurchase: instance.allow_repurchase,
    allow_edit_booking: instance.allow_edit,
    allow_guests_on_board: instance.allow_guests,
    top_up_allowed: instance.allow_auto_top_up,
    max_number_passengers: instance.max_guests,
    concessions: instance.concessions.map((each) => prepareConcession(each)),
    start_date: prepareDateTimeZone(instance.start_date),
    end_when: instance.when_ends,
    end_date: prepareDateTimeZone(instance.end_date),
    end_after_amount: +instance.end_after_amount,
    end_after_unit: instance.end_after_what,

    // We cannot iterate through products because we have all the products for 1 travel pass
    // but not when adding travel passes to a duplicate event and journeys.
    associate_products: instance.product_ids,
    show_departure_time: instance.show_departure_time,
    create_own_page: instance.create_its_own_page,
    ...prepareMarketTrait(instance),
  };
}
