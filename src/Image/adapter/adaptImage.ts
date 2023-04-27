import Image from '../entity/Image';
import adaptFile from '../../File/adapter/adaptFile';

export default function adaptImage(json: any, instance: Image = new Image()): Image {
  let instanceAdapted = <Image>adaptFile(json, instance);

  instanceAdapted.title = json.title;
  instanceAdapted.description = json.description;
  instanceAdapted.image_resolution_letter = json.image_resolution_letter;
  instanceAdapted.image_resolution_width = json.image_resolution_width;
  instanceAdapted.image_resolution_height = json.image_resolution_height;
  instanceAdapted.storageProvider = json.storage_provider;

  return instanceAdapted;
}
