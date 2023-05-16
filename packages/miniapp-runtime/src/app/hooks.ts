import { isArray, isFunction, hooks } from '@ice/shared';
import type { PageLifeCycle } from '../dsl/instance.js';
import type { Func } from '../interface/index.js';
import {
  getPageInstance,
  injectPageInstance,
} from '../dsl/common.js';

import { reactMeta } from './react-meta.js';
import { HOOKS_APP_ID } from './utils.js';

const createIceMiniappHook = (lifecycle: keyof PageLifeCycle | string) => {
  return (fn: Func) => {
    const { R: React, PageContext } = reactMeta;
    const id = React.useContext(PageContext) || HOOKS_APP_ID;

    // hold fn ref and keep up to date
    const fnRef = React.useRef(fn);
    if (fnRef.current !== fn) fnRef.current = fn;
    React.useLayoutEffect(() => {
      let inst = getPageInstance(id);
      let first = false;
      if (inst == null) {
        first = true;
        inst = Object.create(null);
      }

      inst = inst!;

      // callback is immutable but inner function is up to date
      const callback = (...args: any) => fnRef.current(...args);

      if (isFunction(inst[lifecycle])) {
        (inst[lifecycle] as any) = [inst[lifecycle], callback];
      } else {
        (inst[lifecycle] as any) = [
          ...((inst[lifecycle] as any) || []),
          callback,
        ];
      }

      if (first) {
        injectPageInstance(inst!, id);
      }
      return () => {
        const inst = getPageInstance(id);
        const list = inst![lifecycle];
        if (list === callback) {
          (inst![lifecycle] as any) = undefined;
        } else if (isArray(list)) {
          (inst![lifecycle] as any) = list.filter(item => item !== callback);
        }
      };
    }, [id]);
  };
};

const pageLifecycle = hooks.call('getMiniLifecycleImpl')!.page;
const pgeLifecycleArray = pageLifecycle.toString().split(',') as Array<keyof PageLifeCycle | string>;
const pageLifecycleHooks = {};
pgeLifecycleArray.forEach(lifecycle => {
  pageLifecycleHooks[lifecycle] = createIceMiniappHook(lifecycle);
});

export {
  pageLifecycleHooks,
  pgeLifecycleArray,
};
