import { SHOW, HIDE, ERROR, LAUNCH, NOT_FOUND, SHARE, TAB_ITEM_CLICK, UNHANDLED_REJECTION } from '../constants';
import { emit } from '../appLifeCycles';

function initAppLifeCycles() {
  window.addEventListener(LAUNCH, ({ options, context }: any) => {
    emit(LAUNCH, context, options);
  });
  window.addEventListener('appshow', ({ options, context }: any) => {
    emit(SHOW, context, options);
  });
  window.addEventListener('apphide', ({ context }: any) => {
    emit(HIDE, context);
  });
  window.addEventListener('apperror', ({ context, error }: any) => {
    emit(ERROR, context, error);
  });
  window.addEventListener('pagenotfound', ({ context, options }: any) => {
    emit(NOT_FOUND, context, options);
  });
  window.addEventListener('appshare', ({ context, shareInfo, options }: any) => {
    emit(SHARE, context, shareInfo, options);
  });
  window.addEventListener('tabitemclick', ({ options, context }: any) => {
    emit(TAB_ITEM_CLICK, context, options);
  });

  window.addEventListener('unhandledrejection', ({ options, context }: any) => {
    emit(UNHANDLED_REJECTION, context, options);
  });
}

export default initAppLifeCycles;
