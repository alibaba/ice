import { addAppLifeCycle } from './appLifeCycles';
import {
  SHOW,
  LAUNCH,
  ERROR,
  HIDE,
  TAB_ITEM_CLICK,
  NOT_FOUND,
  SHARE,
  UNHANDLED_REJECTION,
} from './constants';
import type { AppConfig } from './types';

export default function collectAppLifeCycle(appConfig: AppConfig) {
  const { onLaunch, onShow, onError, onHide, onTabItemClick } = appConfig.app;
  // multi-end valid lifecycle
  // Add app launch callback
  addAppLifeCycle(LAUNCH, onLaunch);
  // Add app show callback
  addAppLifeCycle(SHOW, onShow);
  // Add app error callback
  addAppLifeCycle(ERROR, onError);
  // Add app hide callback
  addAppLifeCycle(HIDE, onHide);
  // Add tab bar item click callback
  addAppLifeCycle(TAB_ITEM_CLICK, onTabItemClick);

  // Add lifecycle callbacks which only valid in Alibaba MiniApp
  const { onPageNotFound, onShareAppMessage, onUnhandledRejection } =
    appConfig.app;
  // Add global share callback
  addAppLifeCycle(SHARE, onShareAppMessage);
  // Add unhandledrejection callback
  addAppLifeCycle(UNHANDLED_REJECTION, onUnhandledRejection);
  // Add page not found callback
  addAppLifeCycle(NOT_FOUND, onPageNotFound);
}
