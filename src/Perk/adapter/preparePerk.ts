import Perk from '../entity/Perk';

export default function preparePerk(instance: Perk): object {
  let perk_image = instance.image ? instance.image.id : false;

  return {
    title: instance.title,
    description: instance.description,
    image_id: perk_image
  };
}
