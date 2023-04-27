import RecurringProduct from '../entity/RecurringProduct';
import RouteGroupPurchaseLimits from '../entity/RouteGroupPurchaseLimits';

describe('Route Group Purchase Limit', () => {
  it("Should validate Recurring Product's util methods to check RouteGroupPurchaseLimits fields with 1 route group", () => {
    const rp = new RecurringProduct();

    const rgpl = new RouteGroupPurchaseLimits();
    rgpl.routeGroupId = '1';

    expect(rp.hasAnyRouteGroupWithLimitedMultiCreditPurchases()).toBeFalsy();
    expect(rp.hasEmptyMultiCreditLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoMultiCreditPurchaseLimits().length).toBe(0);

    expect(rp.hasAnyRouteGroupWithLimitedUnlimitedPurchases()).toBeFalsy();
    expect(rp.hasEmptyUnlimitedLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoUnlimitedPurchaseLimits().length).toBe(0);

    rp.routeGroupPurchaseLimits.push(rgpl);

    expect(rp.hasAnyRouteGroupWithLimitedMultiCreditPurchases()).toBeFalsy();
    expect(rp.hasEmptyMultiCreditLimitValues()).toBeTruthy();
    expect(rp.getRouteGroupIdsWithNoMultiCreditPurchaseLimits().length).toBe(1);

    expect(rp.hasAnyRouteGroupWithLimitedUnlimitedPurchases()).toBeFalsy();
    expect(rp.hasEmptyUnlimitedLimitValues()).toBeTruthy();
    expect(rp.getRouteGroupIdsWithNoUnlimitedPurchaseLimits().length).toBe(1);

    rp.routeGroupPurchaseLimits[0].multiCreditPurchaseLimit = 2;
    expect(rp.hasAnyRouteGroupWithLimitedMultiCreditPurchases()).toBeTruthy();
    expect(rp.hasEmptyMultiCreditLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoMultiCreditPurchaseLimits().length).toBe(0);

    rp.routeGroupPurchaseLimits[0].unlimitedPurchaseLimit = 3;
    expect(rp.hasAnyRouteGroupWithLimitedUnlimitedPurchases()).toBeTruthy();
    expect(rp.hasEmptyUnlimitedLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoUnlimitedPurchaseLimits().length).toBe(0);
  });

  it("Should validate Recurring Product's util methods to check RouteGroupPurchaseLimits fields with multiple route groups", () => {
    const rp = new RecurringProduct();

    const rgpl1 = new RouteGroupPurchaseLimits();
    rgpl1.routeGroupId = '1';

    const rgpl2 = new RouteGroupPurchaseLimits();
    rgpl2.routeGroupId = '2';

    expect(rp.hasAnyRouteGroupWithLimitedMultiCreditPurchases()).toBeFalsy();
    expect(rp.hasEmptyMultiCreditLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoMultiCreditPurchaseLimits().length).toBe(0);

    expect(rp.hasAnyRouteGroupWithLimitedUnlimitedPurchases()).toBeFalsy();
    expect(rp.hasEmptyUnlimitedLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoUnlimitedPurchaseLimits().length).toBe(0);

    rp.routeGroupPurchaseLimits.push(rgpl1);
    rp.routeGroupPurchaseLimits.push(rgpl2);

    expect(rp.hasAnyRouteGroupWithLimitedMultiCreditPurchases()).toBeFalsy();
    expect(rp.hasEmptyMultiCreditLimitValues()).toBeTruthy();
    expect(rp.getRouteGroupIdsWithNoMultiCreditPurchaseLimits().length).toBe(2);

    expect(rp.hasAnyRouteGroupWithLimitedUnlimitedPurchases()).toBeFalsy();
    expect(rp.hasEmptyUnlimitedLimitValues()).toBeTruthy();
    expect(rp.getRouteGroupIdsWithNoUnlimitedPurchaseLimits().length).toBe(2);

    rp.routeGroupPurchaseLimits[0].multiCreditPurchaseLimit = 2;
    expect(rp.hasAnyRouteGroupWithLimitedMultiCreditPurchases()).toBeTruthy();
    expect(rp.hasEmptyMultiCreditLimitValues()).toBeTruthy();
    expect(rp.getRouteGroupIdsWithNoMultiCreditPurchaseLimits().length).toBe(1);

    rp.routeGroupPurchaseLimits[0].unlimitedPurchaseLimit = 3;
    expect(rp.hasAnyRouteGroupWithLimitedUnlimitedPurchases()).toBeTruthy();
    expect(rp.hasEmptyUnlimitedLimitValues()).toBeTruthy();
    expect(rp.getRouteGroupIdsWithNoUnlimitedPurchaseLimits().length).toBe(1);

    rp.routeGroupPurchaseLimits[1].multiCreditPurchaseLimit = 4;
    expect(rp.hasAnyRouteGroupWithLimitedMultiCreditPurchases()).toBeTruthy();
    expect(rp.hasEmptyMultiCreditLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoMultiCreditPurchaseLimits().length).toBe(0);

    rp.routeGroupPurchaseLimits[1].unlimitedPurchaseLimit = 5;
    expect(rp.hasAnyRouteGroupWithLimitedUnlimitedPurchases()).toBeTruthy();
    expect(rp.hasEmptyUnlimitedLimitValues()).toBeFalsy();
    expect(rp.getRouteGroupIdsWithNoUnlimitedPurchaseLimits().length).toBe(0);
  });
});
