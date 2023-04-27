import Market from '../entity/Market';
import { baseAdapter } from '../../common/adapters/baseAdapter';
import findCurrencyByIsoCode from '../../Currency/utils/findCurrencyByIsoCode';

export default function adaptMarket(json: any, instance: Market = new Market()): Market {
  baseAdapter(json.id, instance);

  instance.name = json.name;
  instance.english_name = json.english_name;
  instance.short_name = json.short_name;
  instance.currencies = json.currencies
    ? json.currencies.map((eachCurrency) => findCurrencyByIsoCode(eachCurrency.iso))
    : [];
  instance.timezones = json.timezones || [];
  instance.languages = json.languages || [];
  instance.payment_providers = json.payment_providers_preference || [];
  instance.phone_prefix = json.phone_numbers ? json.phone_numbers.prefix : null;
  instance.country_code = json.phone_numbers ? json.phone_numbers.country : null;
  instance.default_passenger_helpline_phone = instance.prepareDefaultPhoneNumberFromNumber(
    json.phone_numbers ? json.phone_numbers.default_passenger : null
  );
  instance.default_driver_helpline_phone = instance.prepareDefaultPhoneNumberFromNumber(
    json.phone_numbers ? json.phone_numbers.default_driver : null
  );
  instance.vehicle_certification_ids = json.vehicle_certification_ids;
  instance.tag_ids = json.tag_ids;

  instance.access_role = json.market_role;
  instance.consumers_url = json.url;
  instance.zeerideUrl = json.zeeride_url;
  instance.coach_hire_url = json.coach_hire_url;
  instance.drivers_app_url = json.driver_url;

  if (json.center_point) {
    instance.center_point = {
      lat: +json.center_point.lat,
      lng: +json.center_point.lng,
      zoom: +json.center_point.zoom,
    };
  }

  return instance;
}
