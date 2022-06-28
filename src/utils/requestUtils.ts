import { browser } from '$app/env';

export const localStorageGet = (key: string): string | null => {
  if (browser) {
    const item = localStorage.getItem(key);
    if (item) {
      return item;
    }
  }
  return null;
};

export const localStorageSet = (key: string, value: string): void => {
  if (browser) {
    localStorage.setItem(key, value);
  }
};
