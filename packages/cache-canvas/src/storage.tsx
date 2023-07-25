const cache = {};

export const Storage = {
  setItem: (key, value) => {
    try {
      if (typeof window === 'object' && window.localStorage) {
        return localStorage.setItem(key, value);
      }

      return (cache[key] = value);
    } catch (e) {
      console.error('Storage setItem error:', e);
    }
  },
  getItem: (key) => {
    try {
      if (typeof window === 'object' && window.localStorage) {
        return localStorage.getItem(key);
      }

      return cache[key] || '';
    } catch (e) {
      console.error('Storage getItem error:', e);
    }
  },
};