import Supplier from '../entity/Supplier';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';
import UUID from '../../UUID/UUID';
import Vehicle from '../../Vehicle/entity/Vehicle';
import Driver from '../../Driver/entity/Driver';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';
import adaptInternalNote from '../../InternalNote/adapter/adaptInternalNote';
import adaptDocument from '../../File/adapter/adaptDocument';

export default function adaptSupplier(json: any, instance: Supplier = new Supplier()): Supplier {
  if (!json.id && !json.supplier_id) return null;

  instance.id = json.id ?? json.supplier_id;
  instance.created = true;
  instance.uuid = UUID.fromString(json.id ?? json.supplier_id);
  instance.name = json.name;

  instance.mpocName = json.mpoc_firstname;
  instance.mpocEmail = json.email;
  instance.mpocPhone = adaptPhoneNumber(json.mpoc_phone);

  instance.mpocQuotesName = json.mpoc_quotes_firstname;
  instance.mpocQuotesEmail = json.mpoc_quotes_email;
  instance.mpocQuotesPhone = adaptPhoneNumber(json.mpoc_quotes_phone);

  instance.phones = (json.phone_numbers || []).map((eachPhone) => adaptPhoneNumber(eachPhone));
  instance.address_line_1 = json.address_line_1 || '';
  instance.address_line_2 = json.address_line_2 || '';
  instance.address_line_3 = json.address_line_3 || '';
  instance.postcode = json.post_code || '';
  instance.internalNotes = (json.internal_notes ?? []).map((each) => adaptInternalNote(each));
  adaptMarketTrait(json, instance);

  instance.vehicles = (json.vehicles || []).map((eachVehicle) => {
    const vehicle = new Vehicle();
    vehicle.id = eachVehicle;
    vehicle.uuid.id = eachVehicle;
    return vehicle;
  });

  instance.drivers = (json.drivers || []).map((eachDriver) => {
    const driver = new Driver();
    driver.id = eachDriver;
    driver.uuid.id = eachDriver;
    return driver;
  });

  instance.files = (json.document_files || []).map((eachFile) => adaptDocument(eachFile));

  return instance;
}
