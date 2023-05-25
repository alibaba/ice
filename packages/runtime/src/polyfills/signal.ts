// Add polyfill of Request.prototype.signal for some browser compatibility.
if (import.meta.renderer === 'client' && window.Request && !window.Request.prototype.hasOwnProperty('signal')) {
  (function (self) {
      const OriginalRequest = window.Request;
      function Request(input: RequestInfo | URL, init?: RequestInit) {
        if (input instanceof OriginalRequest) {
          this.signal = input.signal;
        }
        this.signal = init.signal || this.signal || (function () {
          if ('AbortController' in window) {
            let ctrl = new AbortController();
            return ctrl.signal;
          }
        }());
        OriginalRequest.call(this, input, init);
      }
      Request.prototype = Object.create(OriginalRequest.prototype);
      Request.prototype.constructor = Request;
      // @ts-expect-error for overwrite the original Request.
      self.Request = Request;
  })(window);
}
