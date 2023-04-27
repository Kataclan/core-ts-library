import { findResourceById } from '../../common/api';
import requestGet from '../../core/api/requestGet';

export default {
  findResourceById,

  getRealApiUrl() {
    return requestGet('/middleware/get-real-api-url');
  },
};
