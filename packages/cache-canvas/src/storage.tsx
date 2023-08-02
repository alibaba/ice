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
          ability: 'userKVStorage',
          api: 'setItem',
        });

        if (canIUse) {
          const res = window.__megability_bridge__.syncCall('userKVStorage', 'setItem', {
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
          ability: 'userKVStorage',
          api: 'getItem',
        });

        if (canIUse) {
          const res = window.__megability_bridge__.syncCall('userKVStorage', 'getItem', { key });
          if (res && res.statusCode === 0 && res.data && res.data.result) {
            return res.data.result;
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