import JourneyVehicle from '../../JourneyVehicle/entity/JourneyVehicle';
import prepareJourneyVehicle from '../../JourneyVehicle/adapter/prepareJourneyVehicle';
import Journey from '../entity/Journey';

export default function prepareUpdateVehicles(journey: Journey): any {
  return {
    journey_id: journey.id,
    journey_vehicles: journey.journey_vehicles.map((eachJourneyVehicle: JourneyVehicle) => {
      return prepareJourneyVehicle(eachJourneyVehicle, journey);
    }),
  };
}
