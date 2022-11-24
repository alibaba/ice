import { Runtime } from '@ice/runtime';
import type { AppContext, RuntimePlugin, CommonJsRuntime, RuntimeAPI } from '@ice/runtime/types';
import type { MiniappLifecycles } from '../types.js';

export default class MiniappRuntime extends Runtime {
  private miniappLifecycles: MiniappLifecycles;
  public getMiniappLifecycles = () => this.miniappLifecycles;
  public setMiniappLifecycles = (miniappLifecycles) => {
    this.miniappLifecycles = miniappLifecycles;
  };

  public constructor(appContext: AppContext) {
    super(appContext);
    this.miniappLifecycles = {};
  }
  public async loadModule(module: RuntimePlugin | CommonJsRuntime) {
    let runtimeAPI = {
      setMiniappLifecycles: this.setMiniappLifecycles,
    };

    const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
    if (module) {
      // @ts-ignore
      return await runtimeModule(runtimeAPI);
    }
  }
}
