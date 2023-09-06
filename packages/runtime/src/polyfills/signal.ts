// Add polyfill of Request.prototype.signal for some browser compatibility.
// eslint-disable-next-line
if (import.meta.renderer === 'client' && window.Request && !window.Request.prototype.hasOwnProperty('signal')) {
  (function (self) {
      const OriginalRequest = window.Request;
      function Request(input: RequestInfo | URL, init?: RequestInit) {
        const request = new OriginalRequest(input, init);
        if (input instanceof OriginalRequest) {
          // @ts-ignore overwrite signal because singal is readonly in type Request.
          request.signal = input.signal;
        }
        // @ts-ignore overwrite signal because singal is readonly in type Request.
        request.signal = init.signal || request.signal || (function () {
          if ('AbortController' in window) {
            let ctrl = new AbortController();
            return ctrl.signal;
          }
        }());
        return request;
      }
      Request.prototype = Object.create(OriginalRequest.prototype);
      Request.prototype.constructor = Request;
      // @ts-expect-error for overwrite the original Request.
      self.Request = Request;
  })(window);
}
// Mark the current file as es module, otherwise the polyfill will be inject by require,
// it is not allowed to use require in `type: module` package.
export default {};
