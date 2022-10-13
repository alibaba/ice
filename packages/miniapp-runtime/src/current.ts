import type { AppInstance, PageInstance } from './dsl/instance.js';

export interface Router {
  params: Record<string, unknown>;
  path: string;
  $icePath: string;
  onReady: string;
  onHide: string;
  onShow: string;
  exitState?: any;
}

interface Current {
  app: AppInstance | null;
  router: Router | null;
  page: PageInstance | null;
  preloadData?: any;
}

export const Current: Current = {
  app: null,
  router: null,
  page: null,
};

export const getCurrentInstance = () => Current;
