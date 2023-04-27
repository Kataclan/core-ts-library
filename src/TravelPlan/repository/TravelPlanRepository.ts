import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import adaptTravelPlan from '../adapter/adaptTravelPlan';
import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import requestPatch from '../../core/api/requestPatch';
import PassengerAllocationAction from '../enums/PassengerAllocationAction';

export default {
  findByJourneyId(id) {
    return resolveAllPagesGet(`/journeys/${id}/travel-plans`, {
      adapt: adaptTravelPlan,
    });
  },

  findByUserId(userId) {
    return resolveAllPagesGet(`/users/${userId}/travel-plans`, {
      adapt: adaptTravelPlan,
    });
  },

  findByTravelProductId(travelProductId) {
    return resolveAllPagesGet(`/travels/${travelProductId}/travel-plans`, {
      adapt: adaptTravelPlan,
    });
  },

  findByTravelPassId(travelPassId) {
    return resolveAllPagesGet(`/products/${travelPassId}/travel-plans`, {
      adapt: adaptTravelPlan,
    });
  },

  findByJourneyVehicleId(journeyVehicleId) {
    return resolveAllPagesGet(`/journeys/vehicles/${journeyVehicleId}/travel-plans`, {
      adapt: adaptTravelPlan,
    });
  },

  hasFailedTravelPlansByProductId(travelPassId) {
    return promesify(async () => {
      const { data, ...rest } = await requestGet(`/products/${travelPassId}/travel-plans`, {
        qs: [['failed', true]],
        adapt: adaptTravelPlan,
      }).promise();

      return {
        data: data.length > 0,
        ...rest,
      };
    });
  },

  findPastByUserId(userId, qs = []) {
    return requestGet('/past-rides', {
      qs: [...qs, ['user_id', userId]],
      adapt: adaptTravelPlan,
    });
  },

  findUpcomingByUserId(userId, qs = []) {
    return requestGet('/upcoming-rides', {
      qs: [...qs, ['user_id', userId]],
      adapt: adaptTravelPlan,
    });
  },

  moveToVehicle(originVehicleId, originVehicleStopId, destinationId, travelPlans, marketId) {
    return requestPatch('/allocate-passengers', {
      data: {
        allocation_type: PassengerAllocationAction.TO_VEHICLE,
        origin_vehicle_id: originVehicleId,
        origin_vehicle_stop_id: originVehicleStopId,
        destination_id: destinationId, // Journey Vehicle
        travel_plans: travelPlans,
        market_id: marketId,
      },
    });
  },

  moveToStop(originVehicleId, originVehicleStopId, originStopId, destinationId, travelPlans, marketId, stopType) {
    return requestPatch('/allocate-passengers', {
      data: {
        allocation_type: PassengerAllocationAction.TO_STOP,
        origin_vehicle_stop_id: originVehicleStopId,
        origin_vehicle_id: originVehicleId,
        origin_stop_id: originStopId,
        destination_id: destinationId, // Journey Stop
        travel_plans: travelPlans,
        market_id: marketId,
        stop_type: stopType,
      },
    });
  },

  moveToJourney(originJourneyId, destinationJourneyId, travelPlans, marketId) {
    return requestPatch('/allocate-passengers', {
      data: {
        allocation_type: PassengerAllocationAction.TO_JOURNEY,
        origin_journey_id: originJourneyId,
        destination_id: destinationJourneyId,
        travel_plans: travelPlans,
        market_id: marketId,
      },
    });
  },

  notTravelling(travelPlans, marketId) {
    return requestPatch('/allocate-passengers', {
      data: {
        allocation_type: PassengerAllocationAction.TO_NOT_TRAVELLING,
        travel_plans: travelPlans,
        market_id: marketId,
      },
    });
  },

  unallocate(travelPlans, marketId) {
    return requestPatch('/allocate-passengers', {
      data: {
        allocation_type: PassengerAllocationAction.TO_UNALLOCATED,
        travel_plans: travelPlans,
        market_id: marketId,
      },
    });
  },
};
