import Page from '../entity/Page';
import PageStatus from '../enums/PageStatus';
import adaptSeoFields from '../../SEO/adapter/adaptSeoFields';
import SeoFields from '../../SEO/entity/SeoFields';
import adaptImage from '../../Image/adapter/adaptImage';
import adaptPerk from '../../Perk/adapter/adaptPerk';
import UUID from '../../UUID/UUID';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';

export default function adaptPage(json: any, instance): Page {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.title = json.title;
  instance.hide_from_search = json.hide_from_search;
  instance.type_label = (json.product_type || json.type || '').toUpperCase();
  instance.page_type = json.page_type;
  instance.description = json.description;
  instance.slug = json.slug;
  instance.images = (json.cover_images || []).map((each) => adaptImage(each));
  instance.thumbnails = (json.thumbnails || []).map((each) => adaptImage(each));
  instance.perks = (json.perks || []).map((each) => adaptPerk(each));
  instance.about_text = json.about;
  instance.about_images = (json.images || []).map((each) => adaptImage(each));
  instance.previously_published = json.previously_publish;
  instance.created = true;

  adaptMarketTrait(json, instance);

  const seo_json = {
    title: json.seo_title,
    description: json.meta_description,
    keywords: json.keywords,
    images: json.graph_images,
  };

  instance.seo = adaptSeoFields(seo_json, new SeoFields());
  instance.status = json.status || PageStatus.UNPUBLISHED;

  return instance;
}
