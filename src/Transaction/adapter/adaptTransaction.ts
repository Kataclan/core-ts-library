import Transaction from '../entity/Transaction';
import adaptMoney, { moneyShape } from '../../Money/adapters/adaptMoney';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import TransactionType from '../enums/TransactionType';
import PaymentMethod from '../../Payment/enums/PaymentMethod';
import TransactionStatus from '../enums/TransactionStatus';

export default function adaptTransaction(json: transactionShape, transaction = new Transaction()): Transaction {
  transaction.id = json.id;
  transaction.code = json.transaction_code;
  transaction.type = json.transaction_type;
  transaction.status = json.payment_status;
  transaction.date = adaptDateTimeZone(json.created_at);
  transaction.amount = adaptMoney(json.transaction_amount);
  transaction.method = json.payment_method;
  transaction.with_message = json.error_message;

  return transaction;
}

type transactionShape = {
  id: string;
  transaction_code: string;
  transaction_type: TransactionType;
  created_at: string;
  transaction_amount: moneyShape;
  payment_method: PaymentMethod;
  payment_provider: string;
  payment_status: TransactionStatus;
  error_message: string;
};
