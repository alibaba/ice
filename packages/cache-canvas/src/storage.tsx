const cache = {};

export const Storage = {
  setItem: (key, value) => {
    try {
      if (
        typeof window !== 'undefined' &&
        window.__megability_bridge__ &&
        window.__megability_bridge__.syncCall
      ) {
        const canIUse = window.__megability_bridge__.syncCall('ability', 'available', {
          ability: 'KVStorage',
          api: 'setItem',
        });

        if (canIUse) {
          const res = window.__megability_bridge__.syncCall('KVStorage', 'setItem', {
            key,
            value,
          });
          if (res && res.statusCode === 0) {
            return;
          }
        }
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.setItem(key, value);
      }

      return (cache[key] = value);
    } catch (e) {
      console.error('Storage setItem error:', e);
    }
  },
  getItem: (key) => {
    try {
      if (
        typeof window !== 'undefined' &&
        window.__megability_bridge__ &&
        window.__megability_bridge__.syncCall
      ) {
        const canIUse = window.__megability_bridge__.syncCall('ability', 'available', {
          ability: 'KVStorage',
          api: 'getItem',
        });

        if (canIUse) {
          const res = window.__megability_bridge__.syncCall('KVStorage', 'getItem', { key });
          if (res && res.statusCode === 0 && res.data) {
            return res.data;
          }
        }
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }

      return cache[key] || '';
    } catch (e) {
      console.error('Storage getItem error:', e);
    }
  },
};