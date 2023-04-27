import RecurringProduct from '../entity/RecurringProduct';
import adaptTravelProduct from '../../TravelProduct/adapter/adaptTravelProduct';
import BookableServiceConfigType from '../enums/BookableServiceConfigType';
import RouteGroupPurchaseLimits from '../entity/RouteGroupPurchaseLimits';
import RouteGroup from '../../RouteGroup/entity/RouteGroup';
import UUID from '../../UUID/UUID';

export default function adaptRecurringProduct(
  json: any,
  instance: RecurringProduct = new RecurringProduct()
): RecurringProduct {
  const instanceAdapted = <RecurringProduct>adaptTravelProduct(json, instance);

  instanceAdapted.route_groups = (json.route_groups || []).map((eachRouteGroupId) => {
    const routeGroup = new RouteGroup();
    routeGroup.uuid = UUID.fromString(eachRouteGroupId);
    routeGroup.id = eachRouteGroupId;

    return routeGroup;
  });

  const routeGroupsPurchaseLimits = (json.route_groups_purchase_limits || []).reduce(
    (acc, eachRouteGroupPurchaseLimit) => {
      acc[eachRouteGroupPurchaseLimit.route_group_id] = eachRouteGroupPurchaseLimit;

      return acc;
    },
    {}
  );

  instanceAdapted.routeGroupPurchaseLimits = instanceAdapted.route_groups.map((eachRouteGroup) => {
    const purchaseLimit = new RouteGroupPurchaseLimits();
    purchaseLimit.routeGroupId = eachRouteGroup.uuid.id;

    if (routeGroupsPurchaseLimits[eachRouteGroup.uuid.id]) {
      const { limit_purchase_multi_credit, limit_purchase_unlimited } = routeGroupsPurchaseLimits[
        eachRouteGroup.uuid.id
      ];

      if (typeof limit_purchase_multi_credit === 'number') {
        purchaseLimit.multiCreditPurchaseLimit = limit_purchase_multi_credit;
      }

      if (typeof limit_purchase_unlimited === 'number') {
        purchaseLimit.unlimitedPurchaseLimit = limit_purchase_unlimited;
      }
    }

    return purchaseLimit;
  });

  instanceAdapted.concessions = instanceAdapted.concessions.map((eachConcession) => {
    eachConcession.value = eachConcession.value * -1;
    return eachConcession;
  });

  instanceAdapted.timezone = json.timezone;

  instanceAdapted.one_way_purchase_on_sale = json.single_purchase_allowed;
  instanceAdapted.return_purchase_on_sale = json.return_purchase_allowed;

  instanceAdapted.single_return_pricing_matrix_type = json.prices_type;

  instanceAdapted.bookable_services_type = json.book_option.option_type;
  instanceAdapted.hidden_from_zeelo_live = json.hide_on_zeelo_live;

  if (instanceAdapted.bookable_services_type === BookableServiceConfigType.OPENED_FOR_NEXT_WEEKS) {
    instanceAdapted.bookable_services_next_weeks = json.book_option.weeks_in_advance;
  } else if (instanceAdapted.bookable_services_type === BookableServiceConfigType.OPENED_EVERY_SPECIFIC_DAY) {
    instanceAdapted.bookable_services_specific_day = json.book_option.day_of_the_week;
  }

  instanceAdapted.concessions = instanceAdapted.concessions.map((eachConcession) => {
    eachConcession.value *= -1;
    return eachConcession;
  });

  instanceAdapted.isShuttle = json.is_shuttle ?? false;
  instanceAdapted.isScanToBoard = json.scan_to_board ?? false;

  instanceAdapted.safeguardMode = json.safeguard_mode;

  instanceAdapted.waitingListEnabled = json.waitlist_enabled;

  instanceAdapted.allowRidersRequestStops = json.allow_riders_request_stops;

  return instanceAdapted;
}
