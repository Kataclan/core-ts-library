enum JourneyMessagingTargetOptions {
  DRIVERS = 'DRIVERS',
  PASSENGERS = 'PASSENGERS',
  CLIENT_CONTACT = 'CLIENT_CONTACT',
}

export default JourneyMessagingTargetOptions;

export function isMessageTargetDrivers(selectedTarget) {
  return is(selectedTarget, JourneyMessagingTargetOptions.DRIVERS);
}

export function isMessageTargetPassengers(selectedTarget) {
  return is(selectedTarget, JourneyMessagingTargetOptions.PASSENGERS);
}

export function isMessageTargetClientContact(selectedTarget) {
  return is(selectedTarget, JourneyMessagingTargetOptions.CLIENT_CONTACT);
}

export function is(selectedTarget, compare) {
  return selectedTarget === compare;
}
