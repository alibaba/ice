// eslint-disable-next-line
export function registerNativeEventListeners(Klass, events) {
  // For rax miniapp runtime babel plugins prev compile
}

export function addNativeEventListener(eventName, callback) {
  document.addEventListener(eventName, callback);
}

export function removeNativeEventListener(eventName, callback) {
  document.removeEventListener(eventName, callback);
}
