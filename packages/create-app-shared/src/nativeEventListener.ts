// eslint-disable-next-line
export function registerNativeEventListeners(Klass, events) {
  // For rax miniapp runtime babel plugins prev compile
}

export function addNativeEventListener(eventName, callback) {
  window.addEventListener(eventName, callback);
}

export function removeNativeEventListener(evetName, callback) {
  window.removeEventListener(evetName, callback);
}
