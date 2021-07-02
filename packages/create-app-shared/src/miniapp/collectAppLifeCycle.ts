import { NOT_FOUND, SHARE, UNHANDLED_REJECTION } from '../constants';
import { isMiniAppPlatform } from '../env';
import { addAppLifeCycle } from '../appLifeCycles';
import type { AppConfig } from '../types';

export default function collectAppLifeCycle(appConfig: AppConfig) {
  // Add lifecycle callbacks which only valid in Alibaba MiniApp
  if (isMiniAppPlatform) {
    const { onPageNotFound, onShareAppMessage, onUnhandledRejection } = appConfig.app;
    // Add global share callback
    addAppLifeCycle(SHARE, onShareAppMessage);
    // Add unhandledrejection callback
    addAppLifeCycle(UNHANDLED_REJECTION, onUnhandledRejection);
    // Add page not found callback
    addAppLifeCycle(NOT_FOUND, onPageNotFound);
  }
}