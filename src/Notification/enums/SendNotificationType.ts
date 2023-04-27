enum SendNotificationType {
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
}

export default SendNotificationType;

export function isMessageTypeEmail(selectedTarget) {
  return is(selectedTarget, SendNotificationType.EMAIL);
}

export function isMessageTypePush(selectedTarget) {
  return is(selectedTarget, SendNotificationType.PUSH);
}

export function is(selectedType, compare) {
  return selectedType === compare;
}
