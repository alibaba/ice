import { Workbox } from 'workbox-window';

declare const __ICE_PWA_SW__: string;
declare const __ICE_START_URL__: string;
declare const __ICE_SW_SCOPE__: string;
declare const __ICE_DYNAMIC_START_URL__: boolean;

if ('serviceWorker' in navigator && typeof caches !== 'undefined') {
  const workbox = new Workbox(__ICE_PWA_SW__, { scope: __ICE_SW_SCOPE__ });

  /**
  * Prefetch start-url when service worker installed for the first time.
  */
  if (__ICE_START_URL__) {
    workbox.addEventListener('installed', async (event) => {

      if (__ICE_DYNAMIC_START_URL__ || !event.isUpdate) {
        const cache = await caches.open('ice-start-url');
        const response = await fetch(__ICE_START_URL__);

        cache.put(__ICE_START_URL__, response);
      }

    });
  }

  workbox.register();
}
