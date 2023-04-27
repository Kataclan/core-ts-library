import requestGet from '../../core/api/requestGet';
import adaptBusiness from '../adapter/adaptBusiness';
import requestPatch from '../../core/api/requestPatch';
import prepareBusiness from '../../Business/adapter/prepareBusiness';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import adaptUser from '../../User/adapter/adaptUser';
import User from '../../User/entity/User';
import { RequestPromise } from '../../common/types/RequestPromiseType';
import Business from '../entity/Business';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';
import requestPost from '../../core/api/requestPost';
import preparePhoneNumber from '../../PhoneNumber/adapter/preparePhoneNumber';
import prepareBusinessMarketDetails from '../adapter/prepareBusinessMarketDetails';

export default {
  find(id: string): RequestPromise<Business> {
    return requestGet(`/business/${id}`, { adapt: adaptBusiness });
  },

  findBy(qs = []): RequestPromise<Business[]> {
    return requestGet(`/business`, {
      qs,
      adapt: adaptBusiness,
    });
  },

  findAll(qs = []): RequestPromise<Business[]> {
    return resolveAllPagesGet(`/business`, { adapt: adaptBusiness, qs });
  },

  findSuppliers(qs = []): RequestPromise<Business[]> {
    return requestGet('/business/suppliers', { adapt: adaptBusiness, qs });
  },

  update(business: Business): RequestPromise<Business> {
    return requestPatch(`/business/${business.uuid.id}`, { data: prepareBusiness(business) });
  },

  updateMarketDetails(business, businessMarketDetails): RequestPromise<Business> {
    return requestPatch(`/business/${business.uuid.id}/markets/${businessMarketDetails.marketId}`, {
      data: prepareBusinessMarketDetails(businessMarketDetails),
    });
  },

  findUsers(qs = [], businessId): RequestPromise<User[]> {
    return requestGet('/users', {
      qs: [...qs, ['has_business_permissions_over', businessId]],
      adapt: adaptUser,
    });
  },

  findPhoneNumbers(businessId: string): RequestPromise<PhoneNumber[]> {
    return requestGet(`/business/${businessId}/phone_numbers`, {
      adapt: adaptPhoneNumber,
    });
  },

  addPhoneNumber(businessId: string, phoneNumber) {
    return requestPost(`/business/${businessId}/phone_number`, {
      phone_number: preparePhoneNumber(phoneNumber),
    });
  },

  signUp(signupToken: string, email: string, password: string) {
    return requestPost('/business/sign-up', {
      data: {
        email,
        password,
        business_sign_up_code: signupToken,
      },
    });
  },
};
