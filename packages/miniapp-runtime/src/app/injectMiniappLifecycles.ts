import { hooks, isFunction } from '@ice/shared';

import {
  injectPageInstance,
  getPageInstance,
} from '../dsl/common.js';
import { HOOKS_APP_ID } from './utils.js';

const MINIAPP_LIFECYCLES = hooks.call('getMiniLifecycleImpl')!.app;

export default function injectMiniappLifecycles(miniappLifecycles) {
  let inst = getPageInstance(HOOKS_APP_ID);
  if (!inst) {
    inst = Object.create(null);
    injectPageInstance(inst!, HOOKS_APP_ID);
  }

  Object.keys(miniappLifecycles).forEach(key => {
    if (MINIAPP_LIFECYCLES.includes(key)) {
      if (isFunction(inst[key])) {
        (inst[key] as any) = [inst[key], miniappLifecycles[key]];
      } else {
        (inst[key] as any) = [
          ...((inst[key] as any) || []),
          miniappLifecycles[key],
        ];
      }
    }
  });
}
