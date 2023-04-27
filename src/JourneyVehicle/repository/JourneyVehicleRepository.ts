import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptJourneyVehicle, { adaptJourneyVehicleActivity } from '../adapter/adaptJourneyVehicle';
import { removeDuplicated } from '../../common/utils/arrays';
import { getJourneyById } from '../../Journey/api';
import SupplierRepository from '../../Supplier/repository/SupplierRepository';
import JourneyVehicleActivity from '../entity/JourneyVehicleActivity';
import requestPost from '../../core/api/requestPost';
import requestPatch from '../../core/api/requestPatch';
import resolveAllPagesPost from '../../core/utils/resolveAllPagesPost';
import UserRepository from '../../User/repository/UserRepository';
import adaptJourneyVehicleNote from '../adapter/adaptJourneyVehicleNote';
import JourneyVehicleServiceMetrics from '../enums/JourneyVehicleServiceMetrics';
import adaptSupplier from '../../Supplier/adapter/adaptSupplier';
import adaptJourneyVehicleTrackingPoint from '../../JourneyVehicleTrackingPoint/adapter/adaptJourneyVehicleTrackingPoint';
import adaptJourneyVehicleStop from '../../JourneyVehicleStop/adapter/adaptJourneyVehicleStop';
import prepareJourneyVehicleState from '../adapter/prepareJourneyVehicleState';
import { preparePhoneNumberWithoutPhonePrefix } from '../../PhoneNumber/adapter/preparePhoneNumber';

export default {
  find(journeyVehicleId, { fetchJourney = true, fetchNotes = true, fetchSupplier = true } = {}) {
    return promesify(async () => {
      const { data: journeyVehicle, error } = await requestGet(`/journey-vehicles/${journeyVehicleId}`, {
        adapt: adaptJourneyVehicle,
      }).promise();

      if (error) {
        return { error };
      }

      const journeyVehiclesToReturn = await this.getJourneyVehiclesInformation({
        journeyVehicles: [journeyVehicle],
        fetchJourneys: fetchJourney,
        fetchSuppliers: fetchSupplier,
      }).promise();

      return { data: journeyVehiclesToReturn };
    });
  },

  getJourneyVehiclesInformation({ journeyVehicles, fetchJourneys, fetchSuppliers }) {
    return promesify(async () => {
      const journeyIds = journeyVehicles
        .map((each) => each.journey_id)
        .filter((each) => typeof each === 'string')
        .filter(removeDuplicated);

      const supplierIds = journeyVehicles
        .map((each) => each.supplier_id)
        .filter((each) => typeof each === 'string')
        .filter(removeDuplicated);

      let promises = [];
      if (fetchJourneys) {
        promises.push(...journeyIds.map((eachId) => getJourneyById(eachId).promise()));
      }

      if (fetchSuppliers) {
        promises.push(...supplierIds.map((eachId) => SupplierRepository.find(eachId).promise()));
      }

      const resolvedPromises = await Promise.all(promises);
      const promisesData = resolvedPromises.map((each) => each.data);

      let journeyVehiclesToReturn = journeyVehicles.map((eachJourneyVehicle) => {
        eachJourneyVehicle.journey = promisesData.find(
          (eachJourney) => eachJourney.id === eachJourneyVehicle.journey_id
        );
        eachJourneyVehicle.supplier = promisesData.find(
          (eachSupplier) => eachSupplier.id === eachJourneyVehicle.supplier_id
        );
        eachJourneyVehicle.travel_plans = [];

        return eachJourneyVehicle;
      });

      if (journeyVehiclesToReturn.length > 0) {
        const { data: journeyVehicleNotes } = await this.getJourneyVehicleNotes(
          journeyVehiclesToReturn.map((eachJourneyVehicle) => {
            return eachJourneyVehicle.uuid.id;
          }),
          journeyVehiclesToReturn.map((eachJV) => eachJV.market.id).join(',')
        ).promise();

        journeyVehiclesToReturn = journeyVehiclesToReturn.map((eachJourneyVehicle) => {
          eachJourneyVehicle.notes = journeyVehicleNotes
            .filter((eachJourneyVehicleNote) => {
              return !(eachJourneyVehicleNote instanceof JourneyVehicleActivity);
            })
            .filter((eachNote) => {
              return eachNote.journey_vehicle_id === eachJourneyVehicle.uuid.id;
            });

          eachJourneyVehicle.activity = journeyVehicleNotes
            .filter((eachJourneyVehicleNote) => {
              return eachJourneyVehicleNote instanceof JourneyVehicleActivity;
            })
            .filter((eachNote) => {
              return eachNote.journey_vehicle_id === eachJourneyVehicle.uuid.id;
            });

          return eachJourneyVehicle;
        });
      }

      return journeyVehiclesToReturn;
    });
  },

  saveComment(journeyVehicleId, journeyVehicleComment, marketId) {
    return requestPost(`/journey-vehicles/${journeyVehicleId}/note`, {
      data: {
        id: journeyVehicleComment.uuid.id,
        type: 'INTERNAL_NOTE',
        comment: journeyVehicleComment.text,
      },
      headers: {
        MarketId: marketId,
      },
    });
  },

  deleteComment(journeyVehicleId, commentId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/note/${commentId}/disable`);
  },

  saveManualIssue(journeyVehicleId, journeyVehicleManualIssue, marketId) {
    return requestPost(`/journey-vehicles/${journeyVehicleId}/note`, {
      data: {
        id: journeyVehicleManualIssue.id,
        type: 'MANUAL_ISSUE',
        issue_id: journeyVehicleManualIssue.issue_id,
        data: journeyVehicleManualIssue.extra_data,
      },
      headers: {
        MarketId: marketId,
      },
    });
  },

  updateManualIssue(journeyVehicleId, journeyVehicleManualIssue, marketId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/notes/${journeyVehicleManualIssue.id}`, {
      data: {
        issue_type: 'MANUAL_ISSUE',
        issue_id: journeyVehicleManualIssue.issue_id,
        severity: journeyVehicleManualIssue.extra_data.severity,
        fault_party: journeyVehicleManualIssue.extra_data.fault_party,
        data: journeyVehicleManualIssue.extra_data,
      },
      headers: {
        MarketId: marketId,
      },
    });
  },

  mute(journeyVehicleId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/mute`);
  },

  unmute(journeyVehicleId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/unmute`);
  },

  resolve(journeyVehicleId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/resolve`);
  },

  resetJob(journeyVehicleId) {
    return requestPatch(`/journeys/vehicles/${journeyVehicleId}/reset-job`);
  },

  wipeIssuesList(journeyVehicleId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/issues/wipe`);
  },

  getJourneyVehicleNotes(journeyVehicleIds, market_id) {
    return promesify(async () => {
      const { data } = await resolveAllPagesPost(`/journey-vehicles/notes`, {
        data: [...journeyVehicleIds],
        adapt: adaptJourneyVehicleNote,
        headers: {
          MarketId: market_id,
        },
      }).promise();

      const userIds = data
        .filter((eachJourneyVehicleNote) => {
          return !!eachJourneyVehicleNote.author;
        })
        .map((eachJourneyVehicleNote) => {
          return eachJourneyVehicleNote.author.uuid.id;
        })
        .filter(removeDuplicated);

      const usersDTO = await Promise.all(userIds.map((eachUserId) => UserRepository.find(eachUserId).promise()));
      const users = usersDTO.map((each) => each.data);

      return {
        data: data
          .map((eachJourneyVehicleNote) => {
            if (eachJourneyVehicleNote.author) {
              eachJourneyVehicleNote.author = users.find((eachUser) => {
                return eachJourneyVehicleNote.author.uuid.id === eachUser.uuid.id;
              });
            }

            return eachJourneyVehicleNote;
          })
          .sort((note1, note2) => {
            if (note1.updated_at.happensBefore(note2.updated_at)) return -1;
            if (note2.updated_at.happensBefore(note1.updated_at)) return 1;
            return 0;
          }),
      };
    });
  },

  changeReviewStatus(journeyVehicles, marketId) {
    return requestPost('/journey-vehicles/review-status', {
      data: journeyVehicles.map((eachJourneyVehicle) => {
        return {
          journey_vehicle_id: eachJourneyVehicle.uuid.id,
          review_status: eachJourneyVehicle.review_status,
          on_time: eachJourneyVehicle[JourneyVehicleServiceMetrics.FLAG_ON_TIME],
          vehicle_quality: eachJourneyVehicle[JourneyVehicleServiceMetrics.FLAG_VEHICLE_QUALITY],
          tracking: eachJourneyVehicle[JourneyVehicleServiceMetrics.FLAG_TRACKING],
          full_app_usage: eachJourneyVehicle[JourneyVehicleServiceMetrics.FLAG_FULL_APP_USAGE],
          escalated: eachJourneyVehicle[JourneyVehicleServiceMetrics.FLAG_ESCALATED],
        };
      }),
      headers: {
        MarketId: marketId,
      },
    });
  },

  getZeeloLive(qs) {
    return requestGet('/zeelo-live', { qs, adapt: adaptJourneyVehicle });
  },

  saveSnapshot(journeyVehicleId, payload) {
    return requestPost(`/zeelo-live/${journeyVehicleId}/snapshot`, { data: payload });
  },

  getResolvedJourneyVehicles(qs) {
    return promesify(async () => {
      const { data, ...rest } = await requestGet('/journey-vehicles/extended', {
        qs,
        adapt: (eachJourneyVehicleJSON) => {
          const jv = adaptJourneyVehicle(eachJourneyVehicleJSON);
          jv.journey.name = eachJourneyVehicleJSON.extra_data.journey_name;
          jv.journey.type = eachJourneyVehicleJSON.extra_data.journey_type;
          jv.supplier = adaptSupplier(eachJourneyVehicleJSON.extra_data.supplier);
          jv.seats_sold = +eachJourneyVehicleJSON.extra_data.seats_sold;

          adaptJourneyVehicleActivity(eachJourneyVehicleJSON.extra_data.notes, jv);

          return jv;
        },
      }).promise();

      const sorted = data.sort((jv1, jv2) => {
        if (jv1.getFirstStopScheduledDepartureTime().happensBefore(jv2.getFirstStopScheduledDepartureTime())) return -1;
        if (jv2.getFirstStopScheduledDepartureTime().happensBefore(jv1.getFirstStopScheduledDepartureTime())) return 1;
        return 0;
      });

      return { data: sorted, ...rest };
    });
  },

  getTravelTimeline(journeyVehicleId, qs) {
    return requestGet(`/journey-vehicles/${journeyVehicleId}/timeline`, {
      qs,
      adapt: (json) => {
        const adapterFn = (eachTrackingPoint) => adaptJourneyVehicleTrackingPoint(eachTrackingPoint);
        return {
          ...json,
          journey_vehicle_stops: json.stops
            .map((eachJourneyVehicleStop) => {
              return adaptJourneyVehicleStop(eachJourneyVehicleStop);
            })
            .sort((jvs1, jvs2) => {
              if (jvs1.scheduled_arrival_time.happensBefore(jvs2.scheduled_arrival_time)) return -1;
              if (jvs2.scheduled_arrival_time.happensBefore(jvs1.scheduled_arrival_time)) return 1;
              return 0;
            }),
          previous_vehicle_tracking: json.previous?.map(adapterFn) || [],
          ongoing_vehicle_tracking: json.ongoing?.map(adapterFn) || [],
          vehicle_last_position: json.last_position?.map(adapterFn) || [],
          rawTimeline: json,
        };
      },
    });
  },

  getJourneyVehicleTracking(journeyVehicleId, qs) {
    return requestGet(`/journey-vehicles/${journeyVehicleId}/tracking`, {
      qs,
      adapt: (data) => {
        const adapterFn = (eachTrackingPoint) => adaptJourneyVehicleTrackingPoint(eachTrackingPoint);
        return {
          previous_vehicle_tracking: data.previous?.map(adapterFn) || [],
          ongoing_vehicle_tracking: data.ongoing?.map(adapterFn) || [],
          vehicle_last_position: data.last_position?.map(adapterFn) || [],
        };
      },
    });
  },

  getRelatedJourneys(journeyVehicleId, qs) {
    return requestGet(`/journey-vehicles/${journeyVehicleId}/related-journey-vehicles`, {
      adapt: adaptJourneyVehicle,
      qs,
    });
  },

  enableFollowerNotifications(journeyVehicleId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/follower-notifications/enable`);
  },

  disableFollowerNotifications(journeyVehicleId) {
    return requestPatch(`/journey-vehicles/${journeyVehicleId}/follower-notifications/disable`);
  },

  updateJourneyVehicleState(journeyVehicleId, data, journeyVehicleVersion, config) {
    return requestPatch(`/journeys/vehicles/${journeyVehicleId}/state`, {
      data: prepareJourneyVehicleState(data, journeyVehicleVersion),
      ...config,
    });
  },

  allocate(eachJourneyVehicle) {
    return requestPatch(`/journey-vehicles/${eachJourneyVehicle.uuid.id}/allocate`, {
      data: {
        supplier_id: eachJourneyVehicle.supplier?.uuid.id,
        driver_id: eachJourneyVehicle.driver_id,
        vehicle_id: eachJourneyVehicle.vehicle?.uuid.id,
        driver_phone: preparePhoneNumberWithoutPhonePrefix(eachJourneyVehicle.driver_phone),
      },
    });
  },
};
