import TravelProduct from '../../TravelProduct/entity/TravelProduct';
import PageType from '../../Page/enums/PageType';
import RouteGroup from '../../RouteGroup/entity/RouteGroup';
import BookableServiceConfigType from '../enums/BookableServiceConfigType';
import TravelPass from '../../TravelPass/entity/TravelPass';
import PricingMatrixType from '../enums/PricingMatrixType';
import Stop from '../../Stop/entity/Stop';
import TravelPassStop from '../../TravelPassStop/entity/TravelPassStop';
import TravelPassStopPricing from '../../TravelPassStopPricing/entity/TravelPassStopPricing';
import Money from '../../Money/entity/Money';
import Route from '../../Route/entity/Route';
import clone from '../../common/utils/clone';
import RouteGroupPurchaseLimits from './RouteGroupPurchaseLimits';
import UUID from '../../UUID/UUID';
import { isInteger } from '../../common/utils/numbers';
import SafeguardMode from '../../Product/enums/SafeguardMode';
import RouteStop from '../../RouteStop/entity/RouteStop';

export default class RecurringProduct extends TravelProduct {
  private _route_groups: Array<RouteGroup> = [];
  routeGroupPurchaseLimits: Array<RouteGroupPurchaseLimits> = [];
  private _bookable_services_type: BookableServiceConfigType = BookableServiceConfigType.OPENED_EVERY_SPECIFIC_DAY;
  private _bookable_services_next_weeks: number = 2;
  private _bookable_services_specific_day: number = 5;
  private _timezone: string;
  private _single_return_pricing_matrix_type: PricingMatrixType;
  private _multi_credit_travel_pass: TravelPass;
  private _unlimited_travel_pass: TravelPass;
  private _one_way_purchase_on_sale: boolean = false;
  private _return_purchase_on_sale: boolean = false;
  private _hidden_from_zeelo_live: boolean = false;

  isShuttle: boolean;
  isScanToBoard: boolean;
  safeguardMode: SafeguardMode = SafeguardMode.NONE;
  waitingListEnabled = false;
  allowRidersRequestStops = true;

  constructor({ isShuttle = false, isScanToBoard = false } = {}) {
    super();
    this.page_type = PageType.RECURRING_PRODUCT;
    this.isShuttle = isShuttle;
    this.isScanToBoard = isScanToBoard;

    if (isShuttle) {
      // be sure shuttle have this values initialized
      this.enable_multiple_riders_purchase_flow = false;
    }
  }

  get route_groups(): Array<RouteGroup> {
    return this._route_groups;
  }

  set route_groups(value: Array<RouteGroup>) {
    this._route_groups = value;
  }

  get bookable_services_type(): BookableServiceConfigType {
    return this._bookable_services_type;
  }

  set bookable_services_type(value: BookableServiceConfigType) {
    this._bookable_services_type = value;
  }

  get bookable_services_next_weeks(): number {
    return this._bookable_services_next_weeks;
  }

  set bookable_services_next_weeks(value: number) {
    this._bookable_services_next_weeks = value;
  }

  get bookable_services_specific_day(): number {
    return this._bookable_services_specific_day;
  }

  set bookable_services_specific_day(value: number) {
    this._bookable_services_specific_day = value;
  }

  get timezone(): string {
    return this._timezone;
  }

  set timezone(value: string) {
    this._timezone = value;
  }

  get single_return_pricing_matrix_type(): PricingMatrixType {
    return this._single_return_pricing_matrix_type;
  }

  set single_return_pricing_matrix_type(value: PricingMatrixType) {
    this._single_return_pricing_matrix_type = value;
  }

  get multi_credit_travel_pass(): TravelPass {
    return this._multi_credit_travel_pass;
  }

  set multi_credit_travel_pass(value: TravelPass) {
    this._multi_credit_travel_pass = value;
  }

  get unlimited_travel_pass(): TravelPass {
    return this._unlimited_travel_pass;
  }

  set unlimited_travel_pass(value: TravelPass) {
    this._unlimited_travel_pass = value;
  }

  get one_way_purchase_on_sale(): boolean {
    return this._one_way_purchase_on_sale;
  }

  set one_way_purchase_on_sale(value: boolean) {
    this._one_way_purchase_on_sale = value;
  }

  get return_purchase_on_sale(): boolean {
    return this._return_purchase_on_sale;
  }

  set return_purchase_on_sale(value: boolean) {
    this._return_purchase_on_sale = value;
  }

  get hidden_from_zeelo_live(): boolean {
    return this._hidden_from_zeelo_live;
  }

  set hidden_from_zeelo_live(value: boolean) {
    this._hidden_from_zeelo_live = value;
  }

  areAllServicesBookable(): boolean {
    return this.bookable_services_type === BookableServiceConfigType.ALL_SERVICES;
  }

  areBookableServicesStartingWithinWeeks(): boolean {
    return this.bookable_services_type === BookableServiceConfigType.OPENED_FOR_NEXT_WEEKS;
  }

  areBookableServicesStartingEveryDayOfWeek(): boolean {
    return this.bookable_services_type === BookableServiceConfigType.ALL_SERVICES;
  }

  setRouteGroup(routeGroup: RouteGroup) {
    const routeGroups = this.route_groups.reduce((acc, eachRouteGroup: RouteGroup) => {
      acc[eachRouteGroup.uuid.id] = eachRouteGroup;
      return acc;
    }, {});

    routeGroups[routeGroup.uuid.id] = routeGroup;

    this.route_groups = Object.values(routeGroups);

    this.prepareRouteGroupSalesLimits(routeGroup);
  }

  removeRouteGroupById(routeGroupId: string) {
    const normalizedRouteGroups = this.route_groups.reduce((acc, eachRouteGroup) => {
      acc[eachRouteGroup.uuid.id] = eachRouteGroup;
      return acc;
    }, {});

    delete normalizedRouteGroups[routeGroupId];

    this.route_groups = Object.values(normalizedRouteGroups);

    this.routeGroupPurchaseLimits = this.routeGroupPurchaseLimits.filter(
      (eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
        return eachRouteGroupPurchaseLimit.routeGroupId in normalizedRouteGroups;
      }
    );
  }

  findRouteById(routeId: string): Route {
    return this.route_groups
      .map((eachRouteGroup) => eachRouteGroup.routes)
      .flat(1)
      .find((eachRoute) => eachRoute.uuid.id === routeId);
  }

  getTravelPassStopsFromRoutes(): Array<TravelPassStop> {
    const routeStops = clone(this).route_groups.reduce(
      (acc, eachRouteGroup: RouteGroup) => {
        const [fromLeg1] = eachRouteGroup.routes;

        const TPSPickups = fromLeg1.getValidPickupPoints().map((eachValidPickup: RouteStop) => {
          const tps = new TravelPassStop();
          tps.id = eachValidPickup.location.stop_id;
          tps.uuid = UUID.fromString(eachValidPickup.location.stop_id);

          const newStop = new Stop();
          newStop.id = eachValidPickup.location.stop_id;
          newStop.uuid = UUID.fromString(eachValidPickup.location.stop_id);
          newStop.name = eachValidPickup.location.stop_name;

          tps.stop = newStop;
          tps.type = eachValidPickup.type;
          tps.from_route_id = fromLeg1.id;

          tps.pricings = fromLeg1
            .getValidDropoffPoints()
            .filter((eachValidDropoff) => {
              return (
                eachValidDropoff.location.stop_id !== eachValidPickup.location.stop_id &&
                eachValidDropoff.location_order > eachValidPickup.location_order
              );
            })
            .map((eachValidDropoff: RouteStop) => {
              const newStop = new Stop();
              newStop.id = eachValidDropoff.location.stop_id;
              newStop.uuid = UUID.fromString(eachValidDropoff.location.stop_id);
              newStop.name = eachValidDropoff.location.stop_name;

              const tps = new TravelPassStop();
              tps.id = eachValidDropoff.location.stop_id;
              tps.uuid = UUID.fromString(eachValidDropoff.location.stop_id);
              tps.stop = newStop;
              tps.type = eachValidDropoff.type;

              const tpsp = new TravelPassStopPricing();
              tpsp.destination_stop = tps;
              tpsp.destination_stop_id = tps.id;

              tpsp.leg_price = Money.getNew(null, this.market.getDefaultCurrency());
              return tpsp;
            });

          return tps;
        });

        const TPSDropoffs = fromLeg1.getOnlyDropoffPoints().map((eachDropoffPoint: RouteStop) => {
          const newStop = new Stop();
          newStop.id = eachDropoffPoint.location.stop_id;
          newStop.uuid = UUID.fromString(eachDropoffPoint.location.stop_id);
          newStop.name = eachDropoffPoint.location.stop_name;

          const tps = new TravelPassStop();
          tps.id = eachDropoffPoint.location.stop_id;
          tps.uuid = UUID.fromString(eachDropoffPoint.location.stop_id);
          tps.stop = newStop;
          tps.type = eachDropoffPoint.type;
          tps.pricings = [];

          return tps;
        });

        acc.pickups = [...acc.pickups, ...TPSPickups];
        acc.dropoffs = [...acc.dropoffs, ...TPSDropoffs];

        return acc;
      },
      { pickups: [], dropoffs: [] }
    );

    const uniquePickups = routeStops.pickups.reduce((acc, eachPickup: TravelPassStop) => {
      if (acc[eachPickup.id]) {
        const allPickupsWithSameId = routeStops.pickups.filter((each) => each.id === eachPickup.id);
        const allPricingsFromAllPickups = allPickupsWithSameId.map((eachEqual) => eachEqual.pricings).flat();

        const groupedPricings = allPricingsFromAllPickups.reduce((acc2, eachPricing) => {
          if (!acc2[eachPricing.destination_stop_id]) {
            acc2[eachPricing.destination_stop_id] = eachPricing;
          }

          return acc2;
        }, {});

        acc[eachPickup.id].pricings = Object.values(groupedPricings);
      } else {
        acc[eachPickup.id] = eachPickup;
      }

      return acc;
    }, {});

    const uniqueDropoffs = routeStops.dropoffs.reduce((acc, eachDropoff: TravelPassStop) => {
      if (!acc[eachDropoff.id] && !uniquePickups[eachDropoff.id]) {
        acc[eachDropoff.id] = eachDropoff;
      }

      return acc;
    }, {});

    // @ts-ignore
    return [...Object.values(uniquePickups), ...Object.values(uniqueDropoffs)];
  }

  areSingleOrReturnOnSale(): boolean {
    return this.one_way_purchase_on_sale || this.return_purchase_on_sale;
  }

  hasSamePriceForAllStops(): boolean {
    return this.single_return_pricing_matrix_type === PricingMatrixType.SIMPLE;
  }

  hasDifferentPricePerStop(): boolean {
    return this.single_return_pricing_matrix_type === PricingMatrixType.COMPLEX;
  }

  isRouteOutbound(routeId: string): boolean {
    return this.findRouteIndexWithinAllRouteGroups(routeId) === 0;
  }

  isRouteInbound(routeId: string): boolean {
    return this.findRouteIndexWithinAllRouteGroups(routeId) === 1;
  }

  findRouteIndexWithinAllRouteGroups(routeId: string): number {
    const route = this.route_groups
      .map((eachRouteGroup: RouteGroup) => eachRouteGroup.routes)
      .flat(1)
      .find((eachRoute: Route) => eachRoute.uuid.id === routeId);
    const routeGroup = this.route_groups.find(
      (eachRouteGroup: RouteGroup) => eachRouteGroup.uuid.id === route?.route_group_id
    );
    return routeGroup?.routes.findIndex((eachRoute: Route) => eachRoute.uuid.id === routeId);
  }

  getNormalizedRouteGroupPurchaseLimits() {
    return this.routeGroupPurchaseLimits.reduce((acc, eachRouteGroupPurchaseLimits) => {
      acc[eachRouteGroupPurchaseLimits.routeGroupId] = eachRouteGroupPurchaseLimits;
      return acc;
    }, {});
  }

  prepareRouteGroupSalesLimits(routeGroup: RouteGroup) {
    const routeGroupPurchaseLimits = this.getNormalizedRouteGroupPurchaseLimits();

    if (!routeGroupPurchaseLimits[routeGroup.uuid.id]) {
      const newRouteGroupPurchaseLimits = new RouteGroupPurchaseLimits();
      newRouteGroupPurchaseLimits.routeGroupId = routeGroup.uuid.id;

      routeGroupPurchaseLimits[routeGroup.uuid.id] = newRouteGroupPurchaseLimits;
      this.routeGroupPurchaseLimits = Object.values(routeGroupPurchaseLimits);
    }
  }

  hasAnyRouteGroupWithLimitedMultiCreditPurchases(): boolean {
    if (this.routeGroupPurchaseLimits.length === 0) {
      return false;
    }

    return this.routeGroupPurchaseLimits.some((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
      return isInteger(eachRouteGroupPurchaseLimit.multiCreditPurchaseLimit);
    });
  }

  hasEmptyMultiCreditLimitValues(): boolean {
    if (this.routeGroupPurchaseLimits.length === 0) {
      return false;
    }

    return this.routeGroupPurchaseLimits.some((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
      return !isInteger(eachRouteGroupPurchaseLimit.multiCreditPurchaseLimit);
    });
  }

  getRouteGroupIdsWithNoMultiCreditPurchaseLimits(): Array<string> {
    return this.routeGroupPurchaseLimits
      .filter((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
        return !isInteger(eachRouteGroupPurchaseLimit.multiCreditPurchaseLimit);
      })
      .map((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
        return eachRouteGroupPurchaseLimit.routeGroupId;
      });
  }

  hasAnyRouteGroupWithLimitedUnlimitedPurchases(): boolean {
    if (this.routeGroupPurchaseLimits.length === 0) {
      return false;
    }

    return this.routeGroupPurchaseLimits.some((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
      return isInteger(eachRouteGroupPurchaseLimit.unlimitedPurchaseLimit);
    });
  }

  hasEmptyUnlimitedLimitValues(): boolean {
    if (this.routeGroupPurchaseLimits.length === 0) {
      return false;
    }

    return this.routeGroupPurchaseLimits.some((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
      return !isInteger(eachRouteGroupPurchaseLimit.unlimitedPurchaseLimit);
    });
  }

  getRouteGroupPurchaseLimit(routeGroupId: string) {
    return this.routeGroupPurchaseLimits.find((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
      return eachRouteGroupPurchaseLimit.routeGroupId === routeGroupId;
    });
  }

  getRouteGroupIdsWithNoUnlimitedPurchaseLimits(): Array<string> {
    return this.routeGroupPurchaseLimits
      .filter((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
        return !isInteger(eachRouteGroupPurchaseLimit.unlimitedPurchaseLimit);
      })
      .map((eachRouteGroupPurchaseLimit: RouteGroupPurchaseLimits) => {
        return eachRouteGroupPurchaseLimit.routeGroupId;
      });
  }
}
