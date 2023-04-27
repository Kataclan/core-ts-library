import SeoFields from '../entity/SeoFields';
import prepareImage from '../../Image/adapter/prepareImage';

export default function prepareSeoFields(instance: SeoFields) {
  const images = (instance.images || []).map(each => prepareImage(each));

  return {
    images,
    seo_title: instance.title,
    meta_description: instance.description,
    keywords: instance.keywords
  };
}
