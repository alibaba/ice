import type { RuntimeCaching } from 'workbox-build';

// workbox runtime config: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry
export default [
  /**
  * Sometimes it's need to cache opaque responses for images/fonts ...
  * And use StaleWhileRevalidate to handle opaque responses. Learn more at
  * https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests#force_caching_of_opaque_responses
  * */
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      return !isSameOrigin && ['.jpg', '.jpeg', '.gif', '.png', '.svg', '.ico', '.webp'].some(type => url.pathname.endsWith(type));
    },
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'ice-cross-origin-images-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      return !isSameOrigin && ['.eot', '.otf', '.ttc', '.woff', '.woff2', '.font.css'].some(type => url.pathname.endsWith(type));
    },
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'ice-cross-origin-fonts-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      return !isSameOrigin && url.pathname.endsWith('.css');
    },
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'ice-cross-origin-style-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      return !isSameOrigin && url.pathname.endsWith('.js');
    },
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'ice-cross-origin-js-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  /**
  * After providing runtimeCaches for opaque responses, we
  * enable same origin caches.
   */
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'ice-font-assets',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'ice-image-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: /\.(?:css)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'ice-style-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'ice-js-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },

  /**
   * For others
   */
  {
    urlPattern: /.*/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'others',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      },
      networkTimeoutSeconds: 10
    }
  },
] as RuntimeCaching[];
