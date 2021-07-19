import { Workbox } from 'workbox-window';

declare const __ICE_PWA_SW__: string;
declare const __ICE_START_URL__: string;
declare const __ICE_SW_SCOPE__: string;

if ('serviceWorker' in navigator && typeof caches !== 'undefined') {
  const workbox = new Workbox(__ICE_PWA_SW__, { scope: __ICE_SW_SCOPE__ });

  /**
  * Prefetch start-url when service worker installed for the first time.
  */
  if (__ICE_START_URL__) {
    workbox.addEventListener('installed', async (event) => {
      if (!event.isUpdate) {
        const cache = await caches.open('ice-start-url');
        const response = await fetch(__ICE_START_URL__);

        cache.put(__ICE_START_URL__, response);
      }
    });
  }

  workbox.register();

  // 
  workbox.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      // inform offline is ready to use
    }
  });
}
