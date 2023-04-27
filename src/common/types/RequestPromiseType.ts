export type RequestPromise<T> = {
  promise: Promise<any>;
  cancel: () => void;
};
