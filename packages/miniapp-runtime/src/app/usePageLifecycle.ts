import { pageLifecycleHooks, pgeLifecycleArray } from './hooks.js';

export default function usePageLifecycle(lifecycle, callback) {
  if (pgeLifecycleArray.includes(lifecycle)) {
    return pageLifecycleHooks[lifecycle](callback);
  }
  return;
}
