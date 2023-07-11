const cache = {};

export const Storage = {
  setItem: (key, value) => {
    if (typeof window === 'object' && window.localStorage) {
      return localStorage.setItem(key, value);
    }

    return (cache[key] = value);
  },
  getItem: (key) => {
    if (typeof window === 'object' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return cache[key];
  },
};