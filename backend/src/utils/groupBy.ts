export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
): { [key: string | number]: T[] } =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
