import { LocalStorageFieldsValuesType } from 'src/utils/types/LocalStorageFieldsValuesType';

export const localStorageGetValue = <
  T extends keyof LocalStorageFieldsValuesType
>(
  key: T
): LocalStorageFieldsValuesType[T] | null => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const localStorageSetValue = <
  T extends keyof LocalStorageFieldsValuesType
>(
  key: T,
  value: LocalStorageFieldsValuesType[T]
): void => {
  localStorage.setItem(key as string, JSON.stringify(value));
};
