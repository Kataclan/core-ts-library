import Page from '../entity/Page';
import prepareSeoFields from '../../SEO/adapter/prepareSeoFields';
import preparePerk from '../../Perk/adapter/preparePerk';

export default function preparePage(instance: Page): any {
  let object = {
    id: instance.id,
    title: instance.title,
    hide_from_search: instance.hide_from_search,
    product_type: instance.type_label,
    description: instance.description,
    slug: instance.slug,
    perks: instance.perks.map((each) => preparePerk(each)),
    about: instance.about_text,
    seo: prepareSeoFields(instance.seo),
    status: instance.status,
  };

  const keywords_adapted = instance.seo.keywords.join(',');

  // Not using the <prepare methods> due to the images are already created and we only need the <id>
  const about_images = instance.about_images.map((each) => each.id);
  const images_adapted = instance.images.map((each) => each.id);
  const thumbnails_adapted = instance.thumbnails.map((each) => each.id);
  const seo_images = instance.seo.images.map((each) => each.id);

  return {
    ...object,
    images: about_images,
    seo_title: instance.seo.title,
    meta_description: instance.seo.description,
    cover_images: images_adapted,
    thumbnails: thumbnails_adapted,
    graph_images: seo_images,
    keywords: keywords_adapted,
  };
}
