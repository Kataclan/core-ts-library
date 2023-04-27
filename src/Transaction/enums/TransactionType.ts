enum TransactionType {
  AUTHORIZE = 'AUTHORIZED', // This action can't be done but needed for listing.
  CAPTURE = 'CAPTURED',
  REFUND = 'REFUND',
  RELEASE = 'RELEASE'
}

export default TransactionType;
