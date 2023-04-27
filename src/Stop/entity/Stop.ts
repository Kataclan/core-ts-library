import BaseEntity from '../../common/entities/BaseEntity';
import Location from '../../Location/entity/Location';
import Market from '../../Market/entity/Market';

export default class Stop extends BaseEntity {
  protected _name: string = '';
  protected _locations: Array<Location> = [];
  protected _is_hidden: boolean = false;
  protected _site_code: string = '';
  market: Market;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get locations(): Array<Location> {
    return this._locations;
  }

  set locations(value: Array<Location>) {
    this._locations = value;
  }

  get is_hidden(): boolean {
    return this._is_hidden;
  }

  set is_hidden(value: boolean) {
    this._is_hidden = value;
  }

  get site_code(): string {
    return this._site_code;
  }

  set site_code(value: string) {
    this._site_code = value;
  }

  addLocation(instance: Location) {
    this._locations.push(instance);
  }

  replaceLocation(instance: Location, _with: Location) {
    const index = this.locations.findIndex((each) => each.id === instance.id);
    this.locations[index] = _with;
  }

  removeLocation(index: number) {
    this.locations.splice(index, 1);
  }

  isHidden(): boolean {
    return this.is_hidden;
  }
}
