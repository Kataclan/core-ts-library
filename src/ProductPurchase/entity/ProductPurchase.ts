import BaseEntity from '../../common/entities/BaseEntity';
import Product from '../../Product/entity/Product';
import PassengerTypesBooked from '../../PassengerTypeBooked/entity/PassengerTypeBooked';
import BookedItem from '../../BookedItem/entities/BookedItem';

export default class ProductPurchase extends BaseEntity {
  private _product: Product;
  private _concessions: Array<PassengerTypesBooked> = [];
  private _booked_items: Array<BookedItem> = [];

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }

  get concessions(): Array<PassengerTypesBooked> {
    return this._concessions;
  }

  set concessions(value: Array<PassengerTypesBooked>) {
    this._concessions = value;
  }

  get booked_items(): Array<BookedItem> {
    return this._booked_items;
  }

  set booked_items(value: Array<BookedItem>) {
    this._booked_items = value;
  }
}
