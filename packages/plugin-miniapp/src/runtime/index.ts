import type { RuntimePlugin } from '@ice/runtime/types';
import type { MiniappLifecycles } from '@ice/miniapp-runtime/esm/types';

export function defineMiniappConfig(miniappConfigOrDefineMiniappConfig: MiniappLifecycles | (() => MiniappLifecycles)): MiniappLifecycles {
  let miniappLifecycles: MiniappLifecycles = {};
  if (typeof miniappConfigOrDefineMiniappConfig === 'function') {
    miniappLifecycles = miniappConfigOrDefineMiniappConfig();
  } else {
    miniappLifecycles = miniappConfigOrDefineMiniappConfig;
  }

  return miniappLifecycles;
}

const runtime: RuntimePlugin = ({}) => {};
export default runtime;
