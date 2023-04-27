export default class StopIsNotEitherPickupOrDropoffException extends Error {
  constructor() {
    super('A stop has to be at least pickup or dropoff.');
  }
}