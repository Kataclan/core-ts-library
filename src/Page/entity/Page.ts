import BaseEntity from '../../common/entities/BaseEntity';
import Image from '../../Image/entity/Image';
import Perk from '../../Perk/entity/Perk';
import SeoFields from '../../SEO/entity/SeoFields';
import PageStatus from '../enums/PageStatus';
import PageType from '../enums/PageType';
import Market from '../../Market/entity/Market';

export default abstract class Page extends BaseEntity {
  market: Market;
  protected _title: string;
  protected _hide_from_search: boolean = false;
  protected _description: string;
  protected _slug: string;
  protected _page_type: PageType;
  protected _images: Array<Image> = [];
  protected _thumbnails: Array<Image> = [];
  protected _perks: Array<Perk> = [];
  protected _about_text: string;
  protected _about_images: Array<Image> = [];
  protected _seo: SeoFields = new SeoFields();
  protected _status: PageStatus = PageStatus.UNPUBLISHED;
  protected _type_label: string;
  private _previously_published: boolean;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get hide_from_search(): boolean {
    return this._hide_from_search;
  }

  set hide_from_search(value: boolean) {
    this._hide_from_search = value;
  }

  get slug(): string {
    return this._slug;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get thumbnails(): Array<Image> {
    return this._thumbnails;
  }

  set thumbnails(value: Array<Image>) {
    this._thumbnails = value;
  }

  get images(): Array<Image> {
    return this._images;
  }

  set images(value: Array<Image>) {
    this._images = value;
  }

  get perks(): Array<Perk> {
    return this._perks;
  }

  set perks(value: Array<Perk>) {
    this._perks = value;
  }

  get seo(): SeoFields {
    return this._seo;
  }

  set seo(value: SeoFields) {
    this._seo = value;
  }

  get about_text(): string {
    return this._about_text;
  }

  set about_text(value: string) {
    this._about_text = value;
  }

  get about_images(): Array<Image> {
    return this._about_images;
  }

  set about_images(value: Array<Image>) {
    this._about_images = value;
  }

  get status(): PageStatus {
    return this._status;
  }

  set status(value: PageStatus) {
    this._status = value;
  }

  get page_type(): PageType {
    return this._page_type;
  }

  set page_type(value: PageType) {
    this._page_type = value;
  }

  get type_label(): string {
    return this._type_label;
  }

  set type_label(value: string) {
    this._type_label = value;
  }

  get previously_published(): boolean {
    return this._previously_published;
  }

  set previously_published(value: boolean) {
    this._previously_published = value;
  }

  isPublished(): boolean {
    return this._status === PageStatus.PUBLISHED;
  }

  isUnpublished(): boolean {
    return this._status === PageStatus.UNPUBLISHED;
  }

  publish() {
    this._status = PageStatus.PUBLISHED;
  }

  unpublish() {
    this._status = PageStatus.UNPUBLISHED;
  }

  addPerk(item: Perk) {
    this.perks.push(item);
  }

  isEventProduct(): boolean {
    return this._page_type === PageType.EVENT;
  }

  isPrivateProduct(): boolean {
    return this._page_type === PageType.PRIVATE_BOOKING;
  }

  isTag(): boolean {
    return this._page_type === PageType.TAG;
  }

  isRecurringProduct(): boolean {
    return this._page_type === PageType.RECURRING_PRODUCT;
  }

  isTravelPass(): boolean {
    return this._page_type === PageType.TRAVEL_PASS;
  }

  isPrivateHireContent(): boolean {
    return this._page_type === PageType.PRIVATE_HIRE_CONTENT;
  }

  isTravelProduct(): boolean {
    return this.isEventProduct() || this.isRecurringProduct() || this.isPrivateProduct();
  }
}
