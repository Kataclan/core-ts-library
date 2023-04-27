export default class NoTransformerSupportedException extends Error {
  constructor() {
    super('There is no transformer supported.');
  }
}