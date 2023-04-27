import { debounce } from './debounce';

export default async function holdPromise(promise, minTime = 2000) {
  const initial = +new Date();
  const response = await promise();
  const final = +new Date();

  const promiseDuration = final - initial;

  if (promiseDuration > minTime) {
    return response;
  }

  await debounce(minTime - promiseDuration);
  return response;
}
