import requestGet from '../../core/api/requestGet';
import buildPage from '../../Page/adapter/buildPage';
import promesify from '../../core/utils/promesify';
import JourneyGroupRepository from '../../JourneyGroup/repository/JourneyGroupRepository';
import JourneyRepository from '../../Journey/repository/JourneyRepository';
import DataLabelRepository from '../../DataLabel/repository/DataLabelRepository';

export default {
  find(id) {
    return requestGet(`/travels/${id}`, {
      adapt: buildPage,
    });
  },

  findBy(qs) {
    return requestGet('/travels', {
      qs,
      adapt: buildPage,
    });
  },

  findFull(id, { fetchJourneyTags = true } = {}) {
    return promesify(async () => {
      const { data: travelProduct, error: travelProductError, ...rest } = await this.find(id).promise();

      if (travelProductError) {
        return { error: travelProductError };
      }

      const { data: journeyGroupsFirst } = await JourneyGroupRepository.findByTravelProductId(id).promise();

      const journeyIds = journeyGroupsFirst.reduce((acc, each) => {
        return [...acc, ...each.journeys.map((eachJourney) => eachJourney.id).flat(1)];
      }, []);

      const journeysResult = await Promise.all(
        journeyIds.map((eachJourneyId) => JourneyRepository.find(eachJourneyId, { fetchTags: false }).promise())
      );

      let journeys = journeysResult.map((each) => each.data);

      if (fetchJourneyTags) {
        const tagIds = journeys.reduce((acc, eachJourney) => {
          eachJourney.tag_ids.forEach((eachTagId) => {
            if (!acc.includes(eachTagId)) {
              acc.push(eachTagId);
            }
          });

          return acc;
        }, []);

        const tagsDTO = await Promise.all(tagIds.map((eachTagId) => DataLabelRepository.find(eachTagId).promise()));
        const tags = tagsDTO.map((each) => each.data);
        journeys = journeys.map((eachJourney) => {
          eachJourney.data_labels.setList(
            tags.filter((eachTag) => {
              return eachJourney.tag_ids.includes(eachTag.id);
            })
          );

          return eachJourney;
        });
      }

      travelProduct.journey_groups = journeyGroupsFirst
        .map((eachJourneyGroup) => {
          eachJourneyGroup.travel_id = travelProduct.id;
          eachJourneyGroup.journeys = journeys
            .filter((eachJourney) => eachJourney.journey_group_id === eachJourneyGroup.id)
            .filter((eachJourney, eachJourneyIndex, journeysArray) => {
              return journeysArray.findIndex((e) => e.id === eachJourney.id) === eachJourneyIndex;
            });

          return eachJourneyGroup;
        })
        .sort((journeyGroup1, journeyGroup2) => {
          const outbounds1 = journeyGroup1.getOutboundJourneys(true);
          const inbounds1 = journeyGroup1.getInboundJourneys(true);
          const firstOutbound1 = outbounds1.length > 0 ? outbounds1[0] : false;
          const firstInbound1 = inbounds1.length > 0 ? inbounds1[0] : false;
          const comparing1 = firstOutbound1 || firstInbound1;

          const outbounds2 = journeyGroup2.getOutboundJourneys(true);
          const inbounds2 = journeyGroup2.getInboundJourneys(true);
          const firstOutbound2 = outbounds2.length > 0 ? outbounds2[0] : false;
          const firstInbound2 = inbounds2.length > 0 ? inbounds2[0] : false;
          const comparing2 = firstOutbound2 || firstInbound2;

          if (comparing1.departure_date.happensBefore(comparing2.departure_date)) {
            return -1;
          }

          if (comparing2.departure_date.happensBefore(comparing1.departure_date)) {
            return 1;
          }

          return 0;
        });

      return {
        data: travelProduct,
        ...rest,
      };
    });
  },

  findPendingAllocations(travelProductId, qs = []) {
    return requestGet(`/travels/${travelProductId}/pending-allocations`, {
      qs,
    });
  },
};
