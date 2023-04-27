import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptRecurringProduct from '../adapter/adaptRecurringProduct';
import MarketRepository from '../../Market/repository/MarketRepository';
import RouteGroupRepository from '../../RouteGroup/repository/RouteGroupRepository';
import PassengerTypeRepository from '../../PassengerType/repository/PassengerTypeRepository';
import TravelPassRepository from '../../TravelPass/repository/TravelPassRepository';
import requestPatch from '../../core/api/requestPatch';
import requestPost from '../../core/api/requestPost';
import prepareCreateJourney from '../adapter/prepareCreateJourney';
import prepareRecurringProduct from '../adapter/prepareRecurringProduct';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import adaptJourneys from '../adapter/adaptJourneys';
import { filterFullReturnCombinations, findMirrorCombination } from '../../common/utils/pricing_matrix';
import findCurrencyByIsoCode from '../../Currency/utils/findCurrencyByIsoCode';
import Money from '../../Money/entity/Money';
import { divideAndSpreadRemainder } from '../../common/utils/amounts';
import prepareMoney from '../../Money/adapters/prepareMoney';
import clone from '../../common/utils/clone';

function parseTravelPass(travelPass, recurringProduct, passengerTypes) {
  travelPass.concessions = travelPass.concessions.map((eachConcession) => {
    eachConcession.passenger_type = passengerTypes.find((eachPassengerType) => {
      return eachPassengerType.uuid.id === eachConcession.passenger_type.uuid.id;
    });

    eachConcession.passenger_type_id = eachConcession.passenger_type?.uuid.id;

    return eachConcession;
  });

  return travelPass;
}

export default {
  find(id) {
    return promesify(async () => {
      const { data: product, error: findByIdError, ...rest } = await requestGet(`/recurring-products/${id}`, {
        adapt: adaptRecurringProduct,
      }).promise();

      if (findByIdError) {
        return { error: findByIdError };
      }

      // MarketRepository.findAll is cached.
      const marketList = await MarketRepository.findAll({ includeHidden: true }).promise();
      product.market = marketList.data.find((eachMarket) => eachMarket.uuid.id === product.market.uuid.id);

      // = Route Groups ============================================================================
      const routeGroupDTOs = await Promise.all(
        product.route_groups.map((eachRouteGroup) => {
          return RouteGroupRepository.findByRecurringProduct(eachRouteGroup.uuid.id, id).promise();
        })
      );

      product.route_groups = routeGroupDTOs.map((each) => each.data);
      // ===========================================================================================

      // = Passenger Types =========================================================================
      const passengerTypesData = await Promise.all(
        product.concessions.map((eachConcession) => {
          return PassengerTypeRepository.find(eachConcession.passenger_type.uuid.id).promise();
        })
      );

      const passengerTypes = passengerTypesData.map((each) => each.data);

      product.concessions = product.concessions.map((eachConcession) => {
        eachConcession.passenger_type = passengerTypes.find((eachPassengerType) => {
          return eachPassengerType.uuid.id === eachConcession.passenger_type.uuid.id;
        });

        eachConcession.passenger_type_id = eachConcession.passenger_type?.uuid.id;

        return eachConcession;
      });
      // ===========================================================================================

      // = Travel Passes ===========================================================================
      const { data: travelPasses, error } = await TravelPassRepository.findByTravelProductId(id).promise();
      if (error) {
        return { error };
      }

      travelPasses.forEach((eachTravelPass) => {
        if (eachTravelPass.isUnlimited()) {
          product.unlimited_travel_pass = parseTravelPass(eachTravelPass, product, passengerTypes);
        } else {
          product.multi_credit_travel_pass = parseTravelPass(eachTravelPass, product, passengerTypes);
        }
      });

      // ===========================================================================================

      console.log(clone(product));
      return { data: product, ...rest };
    });
  },

  findBy(qs) {
    return requestGet('/recurring-products', {
      qs,
      adapt: adaptRecurringProduct,
    });
  },

  create(recurringProduct) {
    return requestPost('/recurring-products', {
      data: prepareRecurringProduct(recurringProduct),
    });
  },

  update(recurringProduct) {
    return requestPatch(`/recurring-products/${recurringProduct.id}`, {
      data: prepareRecurringProduct(recurringProduct),
    });
  },

  disable(recurringProductId) {
    return requestPatch(`/recurring-products/${recurringProductId}/disable`);
  },

  createJourneys(journeys, recurringProduct) {
    return requestPost(`/recurring-products/${recurringProduct.uuid.id}/journeys`, {
      data: journeys.map((journey) => prepareCreateJourney(journey, recurringProduct)),
      headers: {
        MarketId: journeys[0].market.uuid.id,
      },
    });
  },

  getJourneys(id, marketId, fromDate, toDate) {
    return promesify(async () => {
      const { data, ...rest } = await resolveAllPagesGet(`/recurring-products/${id}/journeys`, {
        qs: [
          ['from', fromDate],
          ['to', toDate],
        ],
        headers: { MarketId: marketId },
        perPage: 500,
      }).promise();

      return {
        data: adaptJourneys(data),
        ...rest,
      };
    });
  },

  getJourneyGroups(id, marketId, fromDate, toDate) {
    return promesify(async () => {
      const { data, ...rest } = await resolveAllPagesGet(`/recurring-products/${id}/journey-groups`, {
        qs: [
          ['from', fromDate],
          ['to', toDate],
        ],
        headers: { MarketId: marketId },
        perPage: 500,
      }).promise();

      return {
        data,
        ...rest,
      };
    });
  },

  replicateServices(journeyGroups, recurringProduct) {
    return requestPost(`/journey-groups/clone`, {
      data: journeyGroups,
      headers: {
        MarketId: recurringProduct.market.uuid.id,
      },
    });
  },

  getPricingMatrix(recurringProductId) {
    return promesify(async () => {
      const { data, ...rest } = await requestGet(`/recurring-products/${recurringProductId}/pricing-matrix`).promise();

      const fullReturnCombinations = filterFullReturnCombinations(data);

      return {
        data: data.map((eachData) => {
          let oneWayCurrency = null;
          let oneWayPrice = null;

          let returnCurrency = null;
          let returnPrice = null;

          if (eachData.one_way_price) {
            oneWayCurrency = findCurrencyByIsoCode(eachData.one_way_price.currency.name);
            oneWayPrice = Money.getNew(oneWayCurrency.divideDecimals(+eachData.one_way_price.amount), oneWayCurrency);
          }

          if (eachData.return_price) {
            returnCurrency = findCurrencyByIsoCode(eachData.return_price.currency.name);

            const mirrorCombination = findMirrorCombination(
              fullReturnCombinations,
              eachData.origin_stop_id,
              eachData.destination_stop_id,
              eachData.route_id
            );

            if (mirrorCombination) {
              returnPrice = Money.getNew(
                returnCurrency.divideDecimals(+eachData.return_price.amount + +mirrorCombination.return_price.amount),
                returnCurrency
              );
            } else {
              returnPrice = Money.getNew(
                returnCurrency.divideDecimals(+eachData.return_price.amount * 2),
                returnCurrency
              );
            }
          }

          return {
            ...eachData,
            one_way_price: oneWayPrice,
            return_price: returnPrice,
          };
        }),
        ...rest,
      };
    });
  },

  updateSimplePricingMatrix(recurringProductId, singlePrice, returnPrice) {
    const [retOutboundPrice, retInboundPrice] = divideAndSpreadRemainder(returnPrice ? +returnPrice.amount : 0);

    return requestPatch(`/recurring-products/${recurringProductId}/simple-prices`, {
      data: {
        one_way_price: prepareMoney(singlePrice),
        return_price_outbound: returnPrice ? prepareMoney(Money.getNew(retOutboundPrice, returnPrice.currency)) : null,
        return_price_inbound: returnPrice ? prepareMoney(Money.getNew(retInboundPrice, returnPrice.currency)) : null,
      },
    });
  },

  updateComplexPricingMatrix(recurringProductId, data) {
    const payload = data.map((eachPrice) => {
      let newOneWayPrice = null;
      let newReturnPrice = null;

      if (eachPrice.one_way_price) {
        newOneWayPrice = prepareMoney(eachPrice.one_way_price);
      }

      if (eachPrice.return_price) {
        const [retOutboundPrice, retInboundPrice] = divideAndSpreadRemainder(+eachPrice.return_price.amount);

        if (eachPrice.__is_outbound) {
          newReturnPrice = prepareMoney(Money.getNew(retOutboundPrice, eachPrice.return_price.currency));
        } else if (eachPrice.__is_inbound) {
          newReturnPrice = prepareMoney(Money.getNew(retInboundPrice, eachPrice.return_price.currency));
        }
      }

      return {
        ...eachPrice,
        one_way_price: newOneWayPrice,
        return_price: newReturnPrice,
      };
    });

    return requestPatch(`/recurring-products/${recurringProductId}/prices`, {
      data: payload,
    });
  },

  updateRoutes(recurringProductId, routeGroupChanges) {
    return requestPost(`/recurring-products/${recurringProductId}/swap-route-groups`, {
      data: { route_groups: routeGroupChanges },
    });
  },
};
