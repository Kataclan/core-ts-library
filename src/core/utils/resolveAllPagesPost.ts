import resolveAllPages from './resolveAllPages';

export default function resolveAllPagesPost(url, config) {
  return resolveAllPages(url, {
    method: 'POST',
    ...config,
    parseResult: (data) => data.filter((each, index, array) => array.findIndex((e) => e.id === each.id) === index),
  });
}
