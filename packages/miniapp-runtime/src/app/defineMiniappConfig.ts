import { hooks, isFunction } from '@ice/shared';
import {
  injectPageInstance,
  getPageInstance,
} from '../dsl/common.js';
import { HOOKS_APP_ID } from './utils.js';

interface MiniappConfig {
  onLaunch?: (options: any) => void;
  onShow?: (options: any) => void;
  onHide?: () => void;
  onError?: (...rest) => void;
  onPageNotFound?: (options: any) => void;
  onUnhandledRejection?: (options: any) => void;
  onShareAppMessage?: (options: any) => Record<string, any>;
  [key: string]: any;
}

let miniappConfig: MiniappConfig = {};

const miniappLifecycles = hooks.call('getMiniLifecycleImpl')!.app;

export default function defineMiniappConfig(miniappConfigOrDefineMiniappConfig: MiniappConfig | (() => MiniappConfig)): void {
  if (typeof miniappConfigOrDefineMiniappConfig === 'function') {
    miniappConfig = miniappConfigOrDefineMiniappConfig();
  } else {
    miniappConfig = miniappConfigOrDefineMiniappConfig;
  }
  let inst = getPageInstance(HOOKS_APP_ID);
  if (!inst) {
    inst = Object.create(null);
    injectPageInstance(inst!, HOOKS_APP_ID);
  }

  Object.keys(miniappConfig).forEach(key => {
    if (miniappLifecycles.includes(key)) {
      if (isFunction(inst[key])) {
        (inst[key] as any) = [inst[key], miniappConfig[key]];
      } else {
        (inst[key] as any) = [
          ...((inst[key] as any) || []),
          miniappConfig[key],
        ];
      }
    }
  });
}

export const getMiniappConfig = () => miniappConfig;
