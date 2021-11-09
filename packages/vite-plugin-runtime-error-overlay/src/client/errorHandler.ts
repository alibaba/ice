type Callback = (error: Error) => void;

let boundErrorHandler = null;
let boundRejectionHandler = null;

function errorHandler(callback: Callback, e: any): void {
  if (!e.error) {
    return;
  }
  const { error } = e;
  if (error instanceof Error) {
    callback(error);
  } else {
    // A non-error was thrown, we don't have a trace. :(
    // Look in your browser's devtools for more information
    callback(new Error(error));
  }
}

function registerUnhandledError(target: EventTarget, callback: Callback) {
  if (boundErrorHandler !== null) {
    return;
  }
  boundErrorHandler = errorHandler.bind(undefined, callback);
  target.addEventListener('error', boundErrorHandler);
}

function unregisterUnhandledError(target: EventTarget) {
  if (boundErrorHandler === null) {
    return;
  }
  target.removeEventListener('error', boundErrorHandler);
  boundErrorHandler = null;
}

function rejectionHandler(
  callback: Callback,
  e: PromiseRejectionEvent
): void {
  if (e == null || e.reason == null) {
    return callback(new Error('Unknown'));
  }
  const { reason } = e;
  if (reason instanceof Error) {
    return callback(reason);
  }
  // A non-error was rejected, we don't have a trace :(
  // Look in your browser's devtools for more information
  return callback(new Error(reason));
}

function registerUnhandledRejection(
  target: EventTarget,
  callback: Callback
) {
  if (boundRejectionHandler !== null) {
    return;
  }
  boundRejectionHandler = rejectionHandler.bind(undefined, callback);
  // $FlowFixMe
  target.addEventListener('unhandledrejection', boundRejectionHandler);
}

function unregisterUnhandledRejection(target: EventTarget) {
  if (boundRejectionHandler === null) {
    return;
  }
  // $FlowFixMe
  target.removeEventListener('unhandledrejection', boundRejectionHandler);
  boundRejectionHandler = null;
}

export {
  registerUnhandledError,
  unregisterUnhandledError,
  registerUnhandledRejection,
  unregisterUnhandledRejection,
};
