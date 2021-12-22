import { AppConfig } from './types';

export const SHOW = 'show';
export const HIDE = 'hide';
export const LAUNCH = 'launch';
export const ERROR = 'error';
export const NOT_FOUND = 'notfound';
export const SHARE = 'share';
export const TAB_ITEM_CLICK = 'tabitemclick';
export const UNHANDLED_REJECTION = 'unhandledrejection';

export const MINIAPP_PAGE_LIFECYCLE = {
  [SHOW]: 'miniapp_pageshow',
  [HIDE]: 'miniapp_pagehide'
};

export const DEFAULT_APP_CONFIG: AppConfig = {
  app: {
    rootId: 'root'
  },
  router: {
    type: 'hash'
  }
};
