const cache = {};

export const Storage = {
  setItem: (key, value, { bizID = '' }) => {
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
          // The base64 of canvans may be too large, and the syncCall will block the thread.
          const res = window.__megability_bridge__.asyncCall('userKVStorage', 'setItem', {
            key,
            value,
            bizID,
          });
          return res;
        }
      }

      return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          resolve(localStorage.setItem(key, value));
        } else {
          reject();
        }
      });
    } catch (e) {
      console.error('Storage setItem error:', e);
      return Promise.reject(e);
    }
  },
  getItem: (key, { bizID = '' }) => {
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
          const res = window.__megability_bridge__.syncCall(
            'userKVStorage',
            'getItem',
            {
              key,
              bizID,
            });
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