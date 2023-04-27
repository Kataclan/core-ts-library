import BaseEntity from '../../common/entities/BaseEntity';
import PromoCode from '../../PromoCode/entity/PromoCode';
import Money from '../../Money/entity/Money';
import ProductPurchase from '../../ProductPurchase/entity/ProductPurchase';
import Transaction from '../../Transaction/entity/Transaction';
import User from '../../User/entity/User';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import PaymentProvider from '../enums/PaymentProvider';
import Tier from '../../Tier/entity/Tier';
import Market from '../../Market/entity/Market';

export default class Payment extends BaseEntity {
  transactions: Array<Transaction> = [];
  product_purchase: ProductPurchase;
  amount_paid: Money;
  original_amount: Money;
  provider: PaymentProvider;
  promo_code: PromoCode;
  date: DateTimeZone = new DateTimeZone();
  user: User;
  tier: Tier;
  market: Market;

  addTransaction(item: Transaction) {
    this.transactions.push(item);
  }

  getSuccessTransactions() {
    return this.transactions.filter((each) => each.isSuccess());
  }

  hasBeenAuthorized() {
    return this.getSuccessTransactions().filter((each) => each.isAuthorize()).length > 0;
  }

  hasBeenPartiallyRefunded() {
    return this.getMaxRefundableAmount() > 0 && this.getMaxRefundableAmount() < this.amount_paid.amount;
  }

  hasBeenFullyRefunded() {
    return this.getMaxRefundableAmount() === 0;
  }

  hasBeenRefunded() {
    return this.hasBeenPartiallyRefunded() || this.hasBeenFullyRefunded();
  }

  hasBeenReleased() {
    return this.getSuccessTransactions().filter((each) => each.isRelease()).length > 0;
  }

  hasBeenCaptured() {
    return this.getSuccessTransactions().filter((each) => each.isCapture()).length > 0;
  }

  isRefundable(): boolean {
    return this.hasBeenCaptured() && !this.hasBeenReleased() && !this.hasBeenFullyRefunded();
  }

  isCapturable(): boolean {
    return this.hasBeenAuthorized() && !this.hasBeenCaptured() && !this.hasBeenReleased() && !this.hasBeenRefunded();
  }

  isReleaseable(): boolean {
    return this.hasBeenAuthorized() && !this.hasBeenCaptured() && !this.hasBeenReleased() && !this.hasBeenRefunded();
  }

  isDirectDebit(): boolean {
    return this.transactions.some((eachTransaction: Transaction) => {
      return eachTransaction.isDirectDebit();
    });
  }

  getMaxRefundableAmount(includeAll = false) {
    return this.getSuccessTransactions()
      .filter((each: Transaction) => (includeAll ? true : each.isRefund()))
      .reduce((value, each) => {
        return value - each.amount.amount;
      }, this.amount_paid.amount);
  }
}
