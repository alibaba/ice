/* eslint no-unused-vars:0, no-undef:0 */
export function registerNativeEventListeners(Klass, events) {
  // TODO: distinguish page configuration
}

export function addNativeEventListener(eventName, callback) {
  window.addEventListener(eventName, callback);
}

export function removeNativeEventListener(evetName, callback) {
  window.removeEventListener(evetName, callback);
}
