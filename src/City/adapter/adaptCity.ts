import City from '../entity/City';

export default function adaptCity(json: any, instance: City = new City()): City {
  instance.id = json.id;
  instance.name = json.name;
  instance.administrative_authority_lvl1_id = json.country_id;
  instance.administrative_authority_lvl1_name = json.country_name;
  instance.administrative_authority_lvl2_id = json.administrative_authority_lvl2_id;
  instance.administrative_authority_lvl2_name = json.administrative_authority_lvl2_name;
  instance.administrative_authority_lvl3_id = json.administrative_authority_lvl3_id;
  instance.administrative_authority_lvl3_name = json.administrative_authority_lvl3_name;
  instance.full_name = json.full_name;
  instance.latitude = json.latitude;
  instance.longitude = json.longitude;
  instance.population = json.population;
  instance.time_zone = json.time_zone;
  return instance;
}
