import SeoFields from '../entity/SeoFields';
import adaptImage from '../../Image/adapter/adaptImage';

export default function adaptSeoFields(json: any, instance: SeoFields): SeoFields {
  instance.title = json.title;
  instance.description = json.description;

  // Ternary stuff because of split of empty string is array of empty string -> [""].
  instance.keywords = json.keywords ? json.keywords.split(',') : [];

  instance.images = (json.images || []).map(each => adaptImage(each));

  return instance;
}
