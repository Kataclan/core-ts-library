import resolveAllPages from './resolveAllPages';

export default function resolveAllPagesGet(url, config) {
  return resolveAllPages(url, { method: 'GET', ...config });
}
