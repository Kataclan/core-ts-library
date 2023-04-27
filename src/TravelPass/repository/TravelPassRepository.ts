import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptTravelPass from '../adapter/adaptTravelPass';
import TierRepository from '../../Tier/repository/TierRepository';
import TravelProductRepository from '../../TravelProduct/repository/TravelProductRepository';
import requestPost from '../../core/api/requestPost';
import prepareTravelPass from '../adapter/prepareTravelPass';
import requestPatch from '../../core/api/requestPatch';
import resolveAllPages from '../../core/utils/resolveAllPages';
import adaptTravelPassUser from '../adapter/adaptTravelPassUser';
import { removeDuplicated } from '../../common/utils/arrays';
import PassengerTypeRepository from '../../PassengerType/repository/PassengerTypeRepository';

export default {
  find(id, { fetchProducts = true } = {}) {
    return promesify(async () => {
      const { data: travelPass, error, ...rest } = await requestGet(`/travel-passes/${id}`, {
        adapt: adaptTravelPass,
      }).promise();

      if (error) {
        return { error };
      }

      const { data: tiers, error: findByTravelPassIdError } = await TierRepository.findByTravelPassId(
        travelPass.id
      ).promise();
      if (findByTravelPassIdError) {
        return {
          error: findByTravelPassIdError,
        };
      }

      travelPass.tiers = tiers.map((eachTier) => {
        eachTier.market = travelPass.market;
        return eachTier;
      });

      travelPass.travel_pass_stops = travelPass.tiers[0] ? travelPass.tiers[0].travel_pass_stops : [];

      if (fetchProducts) {
        const products = await Promise.all(
          travelPass.product_ids.map((eachProductId) => TravelProductRepository.find(eachProductId).promise())
        );
        travelPass.products = products.map((each) => each.data);
      }

      return { data: travelPass, ...rest };
    });
  },

  findBy(qs) {
    return requestGet('/travel-passes', {
      qs,
      adapt: adaptTravelPass,
    });
  },

  create(travelPass) {
    return promesify(async () => {
      const { error: createTravelPassError } = await requestPost('/travel-passes', {
        data: prepareTravelPass(travelPass),
      }).promise();

      if (createTravelPassError) {
        return { error: createTravelPassError };
      }

      travelPass.created = true;

      const responses = await Promise.all(
        travelPass.tiers.map((eachTier) => {
          return TierRepository.create(eachTier).promise();
        })
      );

      if (responses.some((each) => each.error)) {
        return {
          error: responses.filter((each) => !!each.error)[0].error,
        };
      }

      travelPass.tiers = travelPass.tiers.map((eachTier) => {
        eachTier.created = true;
        return eachTier;
      });

      return { data: travelPass };
    });
  },

  update(travelPass) {
    return promesify(async () => {
      const responses = await Promise.all([
        requestPatch(`/travel-passes/${travelPass.id}`, {
          data: prepareTravelPass(travelPass),
        }).promise(),

        ...travelPass.tiers.map((eachTier) => {
          if (eachTier.isRemotelyCreated()) {
            return TierRepository.update(eachTier).promise();
          } else {
            return TierRepository.create(eachTier).promise();
          }
        }),

        ...travelPass.removed_tiers.map((eachRemovedTier) => {
          return TierRepository.disable(eachRemovedTier.uuid.id).promise();
        }),
      ]);

      if (responses[0].error) {
        return { error: responses[0].error };
      }

      responses.shift();

      travelPass.tiers = travelPass.tiers.map((eachTier, i) => {
        if (!eachTier.created) {
          eachTier.created = !responses[i].error;
        }

        return eachTier;
      });

      const removedTiersResponses = responses.slice(travelPass.tiers.length, responses.length);
      travelPass.removed_tiers = travelPass.removed_tiers.filter((eachRemovedTier, i) => {
        return removedTiersResponses[i].error;
      });

      return { data: travelPass, error: responses.find((each) => each.error) };
    });
  },

  updateTier(tier) {
    return promesify(async () => {
      return TierRepository.update(tier).promise();
    });
  },

  delete(travelPassId) {
    return requestPatch(`/travel-passes/${travelPassId}/delete`);
  },

  retryAllocate(travelPassId) {
    return requestPatch(`/travel-passes/${travelPassId}/retry-auto-allocation`);
  },

  findByUserId(userId, qs = [], { fetchAll = false, fetchDeprecated = true, fetchHidden = false } = {}) {
    return promesify(async () => {
      let userTravelPasses = [];
      let rest = {};

      const finalQs = [
        ['user_id', userId],
        ['include_deprecated', fetchDeprecated],
        ['show_hidden', fetchHidden],
        ...qs,
      ];

      if (fetchAll) {
        const { data, ...restData } = await resolveAllPages('/travel-passes/user', {
          adapt: adaptTravelPassUser,
          qs: finalQs,
        }).promise();

        userTravelPasses = data;
        rest = restData;
      } else {
        const { data, ...restData } = await requestGet('/travel-passes/user', {
          adapt: adaptTravelPassUser,
          qs: finalQs,
        }).promise();

        userTravelPasses = data;
        rest = restData;
      }

      const travelPassIds = userTravelPasses
        .map((eachTravelPassUser) => eachTravelPassUser.travel_pass.id)
        .filter(removeDuplicated);

      const travelPassesResult = await Promise.all(
        travelPassIds.map((eachTravelPassId) => this.find(eachTravelPassId, { fetchProducts: false }).promise())
      );

      const travelPasses = travelPassesResult.map((each) => each.data);

      const passengerTypeIds = [
        ...travelPasses.reduce((acc, eachTravelPass) => {
          eachTravelPass.concessions.forEach((eachConcession) => {
            if (!acc.includes(eachConcession.passenger_type_id)) {
              acc.push(eachConcession.passenger_type_id);
            }
          });

          return acc;
        }, []),
        ...userTravelPasses.reduce((acc, eachTravelPassUser) => {
          eachTravelPassUser.concessions.forEach((eachConcession) => {
            if (!acc.includes(eachConcession.concession.passenger_type_id)) {
              acc.push(eachConcession.concession.passenger_type_id);
            }
          });

          return acc;
        }, []),
      ].filter(removeDuplicated);

      const passengerTypesResponse = await Promise.all(
        passengerTypeIds.map((eachPassengerTypeId) => {
          return PassengerTypeRepository.find(eachPassengerTypeId).promise();
        })
      );

      const passengerTypes = passengerTypesResponse.map((each) => each.data);

      return {
        data: userTravelPasses.map((eachTravelPassUser) => {
          eachTravelPassUser.travel_pass = travelPasses.find((eachTravelPass) => {
            return eachTravelPass.uuid.id === eachTravelPassUser.travel_pass.uuid.id;
          });

          eachTravelPassUser.concessions = eachTravelPassUser.concessions.map((eachConcession) => {
            eachConcession.concession.passenger_type = passengerTypes.find((eachPassengerType) => {
              return eachPassengerType.uuid.id === eachConcession.concession.passenger_type.uuid.id;
            });

            return eachConcession;
          });

          eachTravelPassUser.travel_pass.concessions = eachTravelPassUser.travel_pass.concessions.map(
            (eachConcession) => {
              eachConcession.passenger_type = passengerTypes.find((eachPassengerType) => {
                return eachPassengerType.uuid.id === eachConcession.passenger_type.uuid.id;
              });

              return eachConcession;
            }
          );

          return eachTravelPassUser;
        }),
        ...rest,
      };
    });
  },

  findByTravelProductId(travelProductId) {
    return promesify(async () => {
      const { data: travelPasses, error: errorTravelPass } = await requestGet(
        `/travel-passes/travel/${travelProductId}`,
        {
          adapt: adaptTravelPass,
        }
      ).promise();

      if (errorTravelPass) {
        return { error: errorTravelPass };
      }

      const tierPromises = travelPasses.map((eachTravelPass) => {
        return TierRepository.findByTravelPassId(eachTravelPass.uuid.id).promise();
      });

      const tiersData = await Promise.all(tierPromises);

      const tiers = tiersData.map((each) => each.data).flat(1);

      const travelPassesWithTiers = travelPasses.map((eachTravelPass) => {
        eachTravelPass.tiers = tiers.filter((eachTier) => {
          return eachTier.travel_pass_id === eachTravelPass.uuid.id;
        });

        return eachTravelPass;
      });

      return {
        data: travelPassesWithTiers,
      };
    });
  },
};
