// eslint-disable-next-line no-console
export default function promesify(promise, withCancel = () => console.log('Cannot be canceled.')) {
  return {
    promise,
    cancel: withCancel,
  };
}
