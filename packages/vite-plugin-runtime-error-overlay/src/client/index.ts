// inspired by https://github.com/facebook/create-react-app/blob/main/packages/react-error-overlay
import { registerUnhandledError, registerUnhandledRejection, unregisterUnhandledError, unregisterUnhandledRejection } from './errorHandler';
import getStackFrames from './getStackFrames';

const overlayId = 'vite-error-overlay';

interface ViteError extends Error {
  frame?: string;
  loc?: {
    file?: string
    line: number
    column: number
  }
}

const triggerErrorOverlay = (error: Error) => {
  getStackFrames(error).then((stackFrames) => {
    console.log('stackFrames', stackFrames);
    if (stackFrames !== null) {
      // vite-error-overlay only support to show one error at same time
      const starkFrame = stackFrames[0];
      (error as ViteError).frame = starkFrame.generateCodeFrame();
      (error as ViteError).loc = {
        file: starkFrame.originalFileName,
        line: starkFrame.originalLineNumber,
        column: starkFrame.originalColumnNumber,
      };
      if (document.querySelectorAll(overlayId).length === 0) {
        const ErrorOverlay = customElements.get(overlayId);
        // @ts-ignore
        document.body.append(new ErrorOverlay(error));
      }
    }
  });
};

function startReportingRuntimeError() {
  if (typeof customElements !== 'undefined' && customElements.get(overlayId)) {
    registerUnhandledError(window, error => triggerErrorOverlay(error));
    registerUnhandledRejection(window, error => triggerErrorOverlay(error));
  } else {
    console.warn('Warning: vite-error-overlay is not available');
  }
}

function stopReportingRuntimeError() {
  unregisterUnhandledRejection(window);
  unregisterUnhandledError(window);
}

export { startReportingRuntimeError, stopReportingRuntimeError };