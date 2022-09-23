import type {
  AppInstance,
  Func,
  PageLifeCycle,
} from '@ice/miniapp-runtime';
import { Current, getPageInstance,
  injectPageInstance,
} from '@ice/miniapp-runtime';
import { isArray, isFunction } from '@ice/shared';

import { reactMeta } from './react-meta.js';
import { HOOKS_APP_ID } from './utils.js';

const createIceMiniappHook = (lifecycle: keyof PageLifeCycle | keyof AppInstance) => {
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
    }, []);
  };
};

/** LifeCycle */
export const useDidHide = createIceMiniappHook('componentDidHide');
export const useDidShow = createIceMiniappHook('componentDidShow');

/** App */
export const useError = createIceMiniappHook('onError');
export const useLaunch = createIceMiniappHook('onLaunch');
export const usePageNotFound = createIceMiniappHook('onPageNotFound');

/** Page */
export const useLoad = createIceMiniappHook('onLoad');
export const usePageScroll = createIceMiniappHook('onPageScroll');
export const usePullDownRefresh = createIceMiniappHook('onPullDownRefresh');
export const usePullIntercept = createIceMiniappHook('onPullIntercept');
export const useReachBottom = createIceMiniappHook('onReachBottom');
export const useResize = createIceMiniappHook('onResize');
export const useUnload = createIceMiniappHook('onUnload');

/** Mini-Program */
export const useAddToFavorites = createIceMiniappHook('onAddToFavorites');
export const useOptionMenuClick = createIceMiniappHook('onOptionMenuClick');
export const useSaveExitState = createIceMiniappHook('onSaveExitState');
export const useShareAppMessage = createIceMiniappHook('onShareAppMessage');
export const useShareTimeline = createIceMiniappHook('onShareTimeline');
export const useTitleClick = createIceMiniappHook('onTitleClick');

/** Router */
export const useReady = createIceMiniappHook('onReady');
export const useRouter: any = (dynamic = false) => {
  const React = reactMeta.R;
  return dynamic ? Current.router : React.useMemo(() => Current.router, []);
};
export const useTabItemTap = createIceMiniappHook('onTabItemTap');

export const useScope = () => undefined;
