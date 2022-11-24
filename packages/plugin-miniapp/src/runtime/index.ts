import type { RuntimeAPI } from '@ice/runtime/esm/types';
import type { MiniappLifecycles } from '@ice/miniapp-runtime/esm/types';

let miniappLifecycles: MiniappLifecycles = {};

export function defineMiniappConfig(miniappConfigOrDefineMiniappConfig: MiniappLifecycles | (() => MiniappLifecycles)): void {
  if (typeof miniappConfigOrDefineMiniappConfig === 'function') {
    miniappLifecycles = miniappConfigOrDefineMiniappConfig();
  } else {
    miniappLifecycles = miniappConfigOrDefineMiniappConfig;
  }
}

declare type SetMiniappLifecycles = (miniappLifecycles: MiniappLifecycles) => void;

interface MiniappRuntimeAPI extends RuntimeAPI {
  setMiniappLifecycles?: SetMiniappLifecycles;
}


interface RuntimePlugin {
  (apis: MiniappRuntimeAPI, runtimeOptions?: Record<string, any>): Promise<void> | void;
}

const runtime: RuntimePlugin = ({ setMiniappLifecycles }) => {
  setMiniappLifecycles(miniappLifecycles);
};

export default runtime;
