export const LOCAL_STORAGE_PREFIX = 'beerpong-';

export const store = (key: any, value: any): void  => {
  return localStorage.setItem(LOCAL_STORAGE_PREFIX + key, value);
};
export const read = (key: any): string  => {
  return localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
};
export const clear = (): null  => {
  window.localStorage.clear();
  return null;
};
