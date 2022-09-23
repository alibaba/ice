import { Current } from './current.js';
import type { RootElement } from './dom/root.js';
import env from './env.js';
import type { Func } from './interface/index.js';

export const nextTick = (cb: Func, ctx?: Record<string, any>) => {
  const { router } = Current;
  const timerFunc = () => {
    setTimeout(() => {
      ctx ? cb.call(ctx) : cb();
    }, 1);
  };

  if (router !== null) {
    let pageElement: RootElement | null = null;
    const path = router.$icePath;
    pageElement = env.document.getElementById<RootElement>(path);
    if (pageElement?.pendingUpdate) {
      pageElement.enqueueUpdateCallback(cb, ctx);
    } else {
      timerFunc();
    }
  } else {
    timerFunc();
  }
};
