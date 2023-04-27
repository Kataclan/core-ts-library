import Page from '../../Page/entity/Page';
import PageType from '../../Page/enums/PageType';
import Market from '../../Market/entity/Market';

export default class PrivateHireContent extends Page {
  protected _type_label: string;
  market: Market;

  constructor() {
    super();
    this.page_type = PageType.PRIVATE_HIRE_CONTENT;
  }

  get type_label(): string {
    return this._type_label;
  }

  set type_label(value: string) {
    this._type_label = value;
  }
}
