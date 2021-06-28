import { NOT_FOUND, SHARE, UNHANDLED_REJECTION } from '../constants';
import { isMiniAppPlatform, isWeChatMiniProgram, isByteDanceMicroApp } from '../env';
import { addAppLifeCycle } from '../appLifeCycles';
import type { AppConfig } from '../types';

export default function collectAppLifeCycle(appConfig: AppConfig) {
  // Add lifecycle callbacks which only valid in Wechat MiniProgram and ByteDance MicroApp
  if (isWeChatMiniProgram || isByteDanceMicroApp) {
    const { onPageNotFound, onShareAppMessage } = appConfig.app;
    // Add global share callback
    addAppLifeCycle(SHARE, onShareAppMessage);
    // Add page not found callback
    addAppLifeCycle(NOT_FOUND, onPageNotFound);
  }
  // Add lifecycle callbacks which only valid in Alibaba MiniApp
  if (isMiniAppPlatform) {
    const { onShareAppMessage, onUnhandledRejection } = appConfig.app;
    // Add global share callback
    addAppLifeCycle(SHARE, onShareAppMessage);
    // Add unhandledrejection callback
    addAppLifeCycle(UNHANDLED_REJECTION, onUnhandledRejection);
  }
}