import Image from '../entity/Image';
import prepareFile from '../../File/adapter/prepareFile';

export default function prepareImage(instance: Image): any {
  return {
    id: instance.id,
    title: instance.title,
    description: instance.description,
    ...prepareFile(instance),
  };
}
