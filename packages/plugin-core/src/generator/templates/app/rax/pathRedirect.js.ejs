// In a Single-Page Application, sometimes we need to jump to a specific route.
// It is very simple in the Web application, url like #/xxx can jump to the corresponding page.

// Things seem to be very complicated in Weex, because using `MemoryHistory`,
// which is used as a reference implementation and may also be used in non-DOM environments.
// We cannot jump directly through url.

import { isWeex, isWeb } from 'universal-env';

// We want to control applications on different platforms to jump to specific pages through unified parameters.
// Like https://xxx.com?_path=/page1, use `_path` to jump to the specific route.
const TARGET_PATH_REG = /[?&]_path=([^&#]+)/i;

export default function pathRedirect(history, routes) {
  let targetPath = '';
  let targetQuery = null;

  // In Web, use location.search first
  if (isWeb && TARGET_PATH_REG.test(window.location.search)) {
    targetQuery = window.location.search.match(TARGET_PATH_REG);
  }

  // In Weex, use location.href first. Support by rax-weex framework
  if (isWeex && TARGET_PATH_REG.test(window.location.href)) {
    targetQuery = window.location.href.match(TARGET_PATH_REG);
  }

  // If there is no `_path` in url search, try history.location.
  if (!targetQuery && TARGET_PATH_REG.test(history.location.search)) {
    targetQuery = history.location.search.match(TARGET_PATH_REG);
  }

  let isConfirmed = false;
  targetPath = targetQuery ? targetQuery[1] : '';

  for (let i = 0, l = routes.length; i < l; i++) {
    if (targetPath === routes[i].path) {
      isConfirmed = true;
      break;
    }
  }

  if (targetPath && !isConfirmed) {
    console.warn('Warning: url query `_path` should be an exist path in app.json, see: https://rax.js.org/docs/guide/routes ');
    return false;
  }

  // If `targetPath` exists, jump to the specific route.
  if (targetPath) {
    history.replace(targetPath + history.location.search);
  }
}