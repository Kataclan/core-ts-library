import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptJourneyGroup from '../adapter/adaptJourneyGroup';
import JourneyRepository from '../../Journey/repository/JourneyRepository';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import prepareJourneyGroup from '../adapter/prepareJourneyGroup';
import preparePhoneNumber from '../../PhoneNumber/adapter/preparePhoneNumber';
import requestPost from '../../core/api/requestPost';
import requestPatch from '../../core/api/requestPatch';
import TravelProductRepository from '../../TravelProduct/repository/TravelProductRepository';

export default {
  find(journeyGroupId, { fetchJourneys = true } = {}) {
    return promesify(async () => {
      const { data: journeyGroup } = await requestGet(`/journey-groups/${journeyGroupId}`, {
        adapt: adaptJourneyGroup,
      }).promise();

      if (fetchJourneys) {
        const journeys = await Promise.all(
          journeyGroup.journeys.map((each) => {
            return JourneyRepository.find(each.id).promise();
          })
        );

        journeyGroup.journeys = journeys.map((each) => each.data);
      }

      return {
        data: journeyGroup,
      };
    });
  },

  findByTravelProductId(travelProductId) {
    return promesify(async () => {
      const { data: travelProduct } = await TravelProductRepository.find(travelProductId).promise();

      const { data: journeyGroups } = await resolveAllPagesGet(`/travels/${travelProductId}/journey-groups`, {
        qs: [['market_id', travelProduct.market.id]],
        adapt: adaptJourneyGroup,
      }).promise();

      return {
        data: journeyGroups.filter((eachJourneyGroup) => eachJourneyGroup.journeys.length > 0),
      };
    });
  },

  createWithJourneyVehicles(journeyGroup, passengerHelpline, driverHelpline, numberOfJourneyVehiclesToCreateWith = 1) {
    const data = prepareJourneyGroup(journeyGroup);

    data.journeys.map((eachJourney) => {
      eachJourney.create_with_journey_vehicles = numberOfJourneyVehiclesToCreateWith;
      eachJourney.passenger_helpline = preparePhoneNumber(passengerHelpline);
      eachJourney.driver_helpline = preparePhoneNumber(driverHelpline);

      return eachJourney;
    });

    return requestPost('/journey-groups', {
      data,
    });
  },

  updateWithJourneyVehicles(journeyGroup, passengerHelpline, driverHelpline, numberOfJourneyVehiclesToCreateWith = 1) {
    const data = prepareJourneyGroup(journeyGroup);

    data.journeys.map((eachJourney) => {
      if (eachJourney.new_journey) {
        eachJourney.create_with_journey_vehicles = numberOfJourneyVehiclesToCreateWith;
        eachJourney.passenger_helpline = preparePhoneNumber(passengerHelpline);
        eachJourney.driver_helpline = preparePhoneNumber(driverHelpline);
      }

      return eachJourney;
    });

    return requestPatch(`/journey-groups/${journeyGroup.id}`, {
      data,
    });
  },

  update(journeyGroup) {
    return requestPatch(`/journey-groups/${journeyGroup.id}`, {
      data: prepareJourneyGroup(journeyGroup),
    });
  },

  disable(journeyGroupId) {
    return requestPatch(`/journey-groups/${journeyGroupId}/disable`);
  },

  fullDisable(journeyGroupId) {
    return requestPatch(`/journey-groups/${journeyGroupId}/full-disable`);
  },

  testJourneyVehicleStops(journeyGroup) {
    return requestPatch(`/journey-groups/${journeyGroup.id}/journey_vehicles/stops/test`, {
      data: prepareJourneyGroup(journeyGroup),
    });
  },

  adaptJourneyVehicleStops(journeyGroup) {
    return requestPatch(`/journey-groups/${journeyGroup.id}/journey_vehicles/stops/adapt`, {
      data: prepareJourneyGroup(journeyGroup),
    });
  },

  createMultiple(journeyGroups, passengerHelpline, driverHelpline) {
    return requestPost('/journey-groups', {
      headers: {
        MarketId: journeyGroups[0].market.uuid.id,
      },
      data: journeyGroups.map((eachJourneyGroup) => {
        const preparedJourneyGroup = prepareJourneyGroup(eachJourneyGroup);

        preparedJourneyGroup.journeys = preparedJourneyGroup.journeys.map((eachJourney) => {
          eachJourney.create_with_journey_vehicles = 0;
          eachJourney.passenger_helpline = preparePhoneNumber(passengerHelpline);
          eachJourney.driver_helpline = preparePhoneNumber(driverHelpline);

          return eachJourney;
        });

        return preparedJourneyGroup;
      }),
    });
  },
};
