import requestGet from '../../core/api/requestGet';
import adaptPassengerType from '../adapter/adaptPassengerType';

export const getPassengerTypeById = (id) => requestGet(`/passenger-types/${id}`, { adapt: adaptPassengerType });
