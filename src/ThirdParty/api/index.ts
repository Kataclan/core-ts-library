import requestGet from '../../core/api/requestGet';

export const findEmailTemplates = () => requestGet('/mandrill/templates/list');
