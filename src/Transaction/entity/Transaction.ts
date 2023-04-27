import BaseEntity from '../../common/entities/BaseEntity';
import TransactionType from '../enums/TransactionType';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import Money from '../../Money/entity/Money';
import TransactionStatus from '../enums/TransactionStatus';
import PaymentMethod from '../../Payment/enums/PaymentMethod';
import { getCurrencyByIsoCode } from '../../Currency/utils/getCurrencies';

export default class Transaction extends BaseEntity {
  code: string;
  with_message: string;
  type: TransactionType;
  status: TransactionStatus;
  date: DateTimeZone = new DateTimeZone();
  amount: Money;
  method: PaymentMethod;

  isAuthorize(): boolean {
    return this.type === TransactionType.AUTHORIZE;
  }

  isCapture(): boolean {
    return this.type === TransactionType.CAPTURE;
  }

  isRefund(): boolean {
    return this.type === TransactionType.REFUND;
  }

  isRelease(): boolean {
    return this.type === TransactionType.RELEASE;
  }

  isSuccess(): boolean {
    return this.status === TransactionStatus.SUCCESS;
  }

  isPending(): boolean {
    return this.status === TransactionStatus.PAYMENT_PENDING;
  }

  isDirectDebit(): boolean {
    return this.method === PaymentMethod.BACS_DEBIT;
  }

  isError(): boolean {
    return this.status === TransactionStatus.ERROR;
  }

  static getNew(
    type: TransactionType,
    status: TransactionStatus,
    method: PaymentMethod,
    amount: number,
    currencyIso: string
  ): Transaction {
    const newTransaction = new this();

    newTransaction.type = type;
    newTransaction.status = status;
    newTransaction.method = method;
    newTransaction.amount = new Money();
    newTransaction.amount.amount = amount;
    newTransaction.amount.currency = getCurrencyByIsoCode(currencyIso);

    return newTransaction;
  }
}
