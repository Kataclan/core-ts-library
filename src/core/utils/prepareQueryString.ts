export default function prepareQueryString(fromArray = []) {
  return fromArray
    .filter(([, value]) => value !== '' && value !== undefined)
    .map((eachBit) => eachBit.join('='))
    .join('&');
}
