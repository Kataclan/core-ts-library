import Supplier from '../entity/Supplier';
import preparePhoneNumber, { preparePhoneNumberWithoutPhonePrefix } from '../../PhoneNumber/adapter/preparePhoneNumber';
import prepareInternalNotes from '../../InternalNote/adapter/prepareInternalNotes';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareSupplier(instance: Supplier): any {
  return {
    id: instance.id,
    name: instance.name,
    phone_numbers: instance.phones.map((eachPhone) => preparePhoneNumber(eachPhone)),
    address_line_1: instance.address_line_1,
    address_line_2: instance.address_line_2,
    address_line_3: instance.address_line_3,
    post_code: instance.postcode,

    mpoc_firstname: instance.mpocName,
    email: instance.mpocEmail,
    mpoc_phone: preparePhoneNumberWithoutPhonePrefix(instance.mpocPhone),

    mpoc_quotes_firstname: instance.mpocQuotesName,
    mpoc_quotes_email: instance.mpocQuotesEmail,
    mpoc_phone_for_quotes: preparePhoneNumberWithoutPhonePrefix(instance.mpocQuotesPhone),

    ...prepareInternalNotes(instance),
    ...prepareMarketTrait(instance),
  };
}
