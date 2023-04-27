import requestGet from '../../core/api/requestGet';

export const findResourceById = (id, adapt = (data) => data) => requestGet(`/resource/${id}`, { adapt });
