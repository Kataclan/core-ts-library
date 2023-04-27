import cloneDeep from 'lodash/cloneDeep';

export default function clone(item) {
  return cloneDeep(item);

  // if (item === null || item === undefined) {
  //   return item;
  // }
  //
  // let cloned;
  //
  // if (typeof item === 'string') {
  //   cloned = item;
  // } else {
  //   cloned = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
  //
  //   Object.keys(item).map(each => {
  //     let method = each.slice(0, 0) + each.slice(1);
  //     let value = item[method];
  //
  //     if (Array.isArray(value)) {
  //       cloned[method] = value.map(e => clone(e));
  //     } else if (typeof value === 'object') {
  //       cloned[method] = clone(value);
  //     }
  //   });
  // }
  //
  // return cloned;
}
