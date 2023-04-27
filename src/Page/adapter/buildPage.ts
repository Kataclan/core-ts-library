import Page from '../entity/Page';
import PageType from '../enums/PageType';
import adaptTag from '../../Tag/adapter/adaptTag';
import adaptEventProduct from '../../EventProduct/adapter/adaptEventProduct';
import adaptPrivateProduct from '../../PrivateProduct/adapter/adaptPrivateProduct';
import adaptRecurringProduct from '../../RecurringProduct/adapter/adaptRecurringProduct';
import adaptTravelPass from '../../TravelPass/adapter/adaptTravelPass';
import NoTransformerSupportedException from '../../common/exceptions/NoTransformerSupportedException';

export default function buildPage(json: any): Page {
  switch (json.page_type) {
    case PageType.TAG:
      return adaptTag(json);

    case PageType.EVENT:
      return adaptEventProduct(json);

    case PageType.PRIVATE_BOOKING:
      return adaptPrivateProduct(json);

    case PageType.RECURRING_PRODUCT:
      return adaptRecurringProduct(json);

    case PageType.TRAVEL_PASS:
      return adaptTravelPass(json);
  }

  throw new NoTransformerSupportedException();
}
