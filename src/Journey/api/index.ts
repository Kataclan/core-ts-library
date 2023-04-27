import requestGet from '../../core/api/requestGet';
import adaptJourney from '../adapter/adaptJourney';

export const getJourneyById = (id) =>
  requestGet(`/journeys/${id}`, {
    adapt: adaptJourney,
  });
