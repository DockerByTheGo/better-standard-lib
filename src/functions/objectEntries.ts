export function objectEntries<T extends Record<string, unknown>>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.keys(obj).map(key => [key, obj[key]] as [keyof T, T[keyof T]]);
}
