import BaseEntity from '../entities/BaseEntity';

export function getNormalized(list: BaseEntity[], normalizeBy?: string): object {
  return list.reduce((acc, eachItem) => {
    return {
      ...acc,
      [normalizeBy ?? eachItem.uuid.id]: eachItem,
    };
  }, {});
}

export function removeFromList(list: BaseEntity[], item: BaseEntity, normalizeBy?: string): BaseEntity[] {
  const normalized = getNormalized(list, normalizeBy);

  delete normalized[normalizeBy ?? item.uuid.id];

  return Object.values(normalized);
}

export function setElementToList(list: BaseEntity[], item: BaseEntity, normalizeBy?: string): BaseEntity[] {
  const normalized = getNormalized(list, normalizeBy);

  normalized[normalizeBy ?? item.uuid.id] = item;

  return Object.values(normalized);
}

export function removeDuplicated<T>(each: T, index: number, array: T[]): boolean {
  return array.indexOf(each) === index;
}
