import RecurringProduct from '../entity/RecurringProduct';
import prepareTravelProduct from '../../TravelProduct/adapter/prepareTravelProduct';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';
import BookableServiceConfigType from '../enums/BookableServiceConfigType';
import RouteGroupPurchaseLimits from '../entity/RouteGroupPurchaseLimits';

export default function prepareRecurringProduct(instance: RecurringProduct): any {
  return {
    ...(<RecurringProduct>prepareTravelProduct(instance)),
    route_groups: (instance.route_groups || []).map((each) => each.id),
    route_groups_purchase_limits: instance.routeGroupPurchaseLimits.map(
      (eachProductPurchaseLimit: RouteGroupPurchaseLimits) => {
        return {
          route_group_id: eachProductPurchaseLimit.routeGroupId,
          limit_purchase_multi_credit: eachProductPurchaseLimit.multiCreditPurchaseLimit,
          limit_purchase_unlimited: eachProductPurchaseLimit.unlimitedPurchaseLimit,
        };
      }
    ),
    timezone: instance.timezone,
    single_purchase_allowed: instance.one_way_purchase_on_sale,
    return_purchase_allowed: instance.return_purchase_on_sale,
    hide_on_zeelo_live: instance.hidden_from_zeelo_live,
    sales_options: {
      outbound_only: instance.one_way_purchase_on_sale,
      return_only: instance.one_way_purchase_on_sale,
      return_and_outbound: instance.return_purchase_on_sale,
    },
    book_option: {
      option_type: instance.bookable_services_type,
      weeks_in_advance:
        instance.bookable_services_type === BookableServiceConfigType.OPENED_FOR_NEXT_WEEKS
          ? instance.bookable_services_next_weeks
          : void 0,
      day_of_the_week:
        instance.bookable_services_type === BookableServiceConfigType.OPENED_EVERY_SPECIFIC_DAY
          ? instance.bookable_services_specific_day
          : void 0,
    },
    is_shuttle: instance.isShuttle,
    scan_to_board: instance.isScanToBoard,
    safeguard_mode: instance.safeguardMode,
    waitlist_enabled: instance.waitingListEnabled,
    allow_riders_request_stops: instance.allowRidersRequestStops,
    ...prepareMarketTrait(instance),
  };
}
