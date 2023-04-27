import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptJourney from '../adapter/adaptJourney';
import { removeDuplicated } from '../../common/utils/arrays';
import DataLabelRepository from '../../DataLabel/repository/DataLabelRepository';
import requestPost from '../../core/api/requestPost';
import prepareSendNotificationPayload from '../adapter/prepareSendNotification';
import requestPatch from '../../core/api/requestPatch';
import prepareUpdateVehicles from '../adapter/prepareUpdateVehicles';
import prepareJourney from '../adapter/prepareJourney';

export default {
  find(id, { fetchTags = true } = {}) {
    return promesify(async () => {
      const { data: journey, ...rest } = await requestGet(`/journeys/${id}`, {
        adapt: adaptJourney,
      }).promise();

      if (fetchTags) {
        const tags = await Promise.all(
          journey.tag_ids.filter(removeDuplicated).map((eachId) => DataLabelRepository.find(eachId).promise())
        );

        journey.data_labels.setList(
          tags.map((eachTag) => eachTag.data).filter((eachTag) => journey.tag_ids.includes(eachTag.id))
        );
      }

      return { data: journey, ...rest };
    });
  },

  findBy(qs) {
    return requestGet('/journeys', {
      qs,
      adapt: adaptJourney,
    });
  },

  sendNotification(journeyId, target, messageType, vehicles, stops, message, subject, recipients, attachPassengers) {
    return requestPost(`/journeys/${journeyId}/notify`, {
      data: prepareSendNotificationPayload(
        journeyId,
        target,
        messageType,
        vehicles,
        stops,
        message,
        subject,
        recipients,
        attachPassengers
      ),
    });
  },

  updateVehicles(journey) {
    return requestPatch('/journeys/vehicles', {
      data: [prepareUpdateVehicles(journey)],
      headers: {
        MarketId: journey.market.id,
      },
    });
  },

  update(journey) {
    return requestPatch(`/journeys/${journey.id}`, {
      data: prepareJourney(journey),
    });
  },

  updateMultipleJourneyWithVehicles(journeys) {
    return requestPatch('/journeys/vehicles', {
      data: journeys.map((eachJourney) => prepareUpdateVehicles(eachJourney)),
      headers: {
        MarketId: journeys[0].market.id,
      },
    });
  },

  sendJobSheet(journeyVehicleId, qs = []) {
    return requestPost(`/journeys/vehicles/${journeyVehicleId}/send-jobsheet`, {
      qs,
    });
  },

  reissueTickets(journeyId, productPurchaseIds) {
    return requestPost(`/journeys/${journeyId}/reissue-tickets`, {
      data: {
        product_purchase_ids: productPurchaseIds.filter(removeDuplicated),
      },
    });
  },

  disable(journeyId) {
    return requestPatch(`/journeys/${journeyId}/disable`);
  },

  testJourneyVehicleStops(journey) {
    return requestPatch(`/journeys/${journey.id}/journey_vehicles/stops/test`, {
      data: prepareJourney(journey),
    });
  },

  adaptJourneyVehicleStops(journey) {
    return requestPatch(`/journeys/${journey.id}/journey_vehicles/stops/adapt`, {
      data: prepareJourney(journey),
    });
  },

  startJourney(journeyVehicleId, journeyVehicleStopId, config) {
    return requestPatch(`/journeys/vehicles/${journeyVehicleId}/going-to-stop/${journeyVehicleStopId}`, {
      ...config,
    });
  },
};
