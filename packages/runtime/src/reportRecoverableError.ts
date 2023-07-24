import type { ErrorStack } from './types.js';

interface ErrorOptions {
  ignoreRuntimeWarning?: boolean;
}

function isRuntimeWarning(error: unknown) {
  return error instanceof Error ? [
    'This Suspense boundary received an update before it finished hydrating.',
  ].some((message) => error?.message?.includes(message)) : false;
}


export const defaultOnRecoverableError = typeof reportError === 'function'
  ? reportError
  : function (error: unknown) {
    console['error'](error);
  };


const reportRecoverableError = (error: unknown, errorStack: ErrorStack, options?: ErrorOptions) => {
  const ignoreError = options?.ignoreRuntimeWarning && isRuntimeWarning(error);
  defaultOnRecoverableError(error);
  if (!ignoreError) {
    if (process.env.NODE_ENV === 'production') {
      // Report error stack in production by default.
      if (errorStack?.componentStack && error instanceof Error) {
        const detailError = new Error(error.message);
        detailError.name = error.name;
        detailError.stack = `${error.name}: ${error.message}${errorStack.componentStack}`;
        defaultOnRecoverableError(detailError);
        return;
      }
    }
    // Fallback to default error handler.
    defaultOnRecoverableError(error);
  }
};

export default reportRecoverableError;
