import City from '../entity/City';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareCity(instance: City): any {
  return {
    id: instance.id,
    name: instance.name,
    administrative_authority_lvl1_id: instance.administrative_authority_lvl1_id,
    administrative_authority_lvl1_name: instance.administrative_authority_lvl1_name,
    administrative_authority_lvl2_id: instance.administrative_authority_lvl2_id,
    administrative_authority_lvl2_name: instance.administrative_authority_lvl2_name,
    administrative_authority_lvl3_id: instance.administrative_authority_lvl3_id,
    administrative_authority_lvl3_name: instance.administrative_authority_lvl3_name,
    full_name: instance.full_name,
    latitude: instance.latitude,
    longitude: instance.longitude,
    population: instance.population,
    time_zone: instance.time_zone,
    ...prepareMarketTrait(instance),
  };
}
