export function arrayToMap<T>(
  array: T[],
  keySelector: (item: T) => any,
): Map<any, T> {
  return array.reduce((map, item) => {
    map.set(keySelector(item), item);
    return map;
  }, new Map<any, T>());
}

export function mapToArray<T>(map: Map<string, T>): T[] {
  return Array.from(map.values());
}

export function arrayToObject<T>(
  array: T[],
  keySelector: (item: T) => any,
): Record<any, T> {
  return array.reduce((obj: Record<any, T>, item) => {
    obj[keySelector(item)] = item;
    return obj;
  }, {});
}

export function objectToArray<T>(obj: Record<any, T>): T[] {
  return Object.values(obj);
}
