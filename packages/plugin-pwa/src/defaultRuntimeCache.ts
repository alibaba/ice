// workbox runtime config: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry

export default [
  // cache config for Font
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'ice-font-assets',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  // cache config for Image
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

  // cache config for Styles
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

  // cache config for JavaScript
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
];
