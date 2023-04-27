import TravelPass from '../entity/TravelPass';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import adaptProduct from '../../Product/adapter/adaptProduct';
import adaptConcession from '../../Concession/adapter/adaptConcession';

export default function adaptTravelPass(json: any, instance: TravelPass = new TravelPass()): TravelPass {
  const instanceAdapted = <TravelPass>adaptProduct(json, instance);

  instanceAdapted.allow_one_way_opt_in = json.allow_one_way_optin;
  instanceAdapted.auto_journey_opt_in = json.auto_journey_optin;
  instanceAdapted.allow_repurchase = json.allow_repurchase;
  instanceAdapted.allow_edit = json.allow_edit_booking;
  instanceAdapted.allow_guests = json.allow_guests_on_board;
  instanceAdapted.allow_auto_top_up = json.top_up_allowed;
  instanceAdapted.max_guests = json.max_number_passengers || 0;
  instanceAdapted.start_date = adaptDateTimeZone(json.start_date);
  instanceAdapted.concessions = (json.concessions || []).map((each) => adaptConcession(each));
  instanceAdapted.when_ends = json.when_ends;
  instanceAdapted.end_date = adaptDateTimeZone(json.end_date);
  instanceAdapted.end_after_amount = json.end_after_amount;
  instanceAdapted.end_after_what = json.end_after_unit;
  instanceAdapted.when_ends = json.end_when;
  instanceAdapted.product_ids = json.associate_products || [];
  instanceAdapted.show_departure_time = json.show_departure_time;
  instanceAdapted.create_its_own_page = json.create_own_page;
  instanceAdapted.scan_to_board = json.scan_to_board;

  return instanceAdapted;
}
