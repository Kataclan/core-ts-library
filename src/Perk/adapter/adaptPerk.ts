import Perk from '../entity/Perk';
import Image from '../../Image/entity/Image';
import adaptImage from '../../Image/adapter/adaptImage';

export default function adaptPerk(json: any, instance: Perk = new Perk()): Perk {
  instance.title = json.title;
  instance.description = json.description;
  instance.image = json.image ? <Image>adaptImage(json.image) : null;

  return instance;
}
