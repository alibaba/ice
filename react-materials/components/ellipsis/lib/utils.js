"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var throttle = exports.throttle = function throttle(func, wait, options) {
  // from underscore
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function later() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

var getWidthFromDOM = exports.getWidthFromDOM = function getWidthFromDOM(dom) {
  var styles = window.getComputedStyle(dom);
  var width = dom.offsetWidth;
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);
  var borderRightWidth = parseFloat(styles.borderRightWidth);
  var paddingLeft = parseFloat(styles.paddingLeft);
  var paddingRight = parseFloat(styles.paddingRight);

  return width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
};

var on = exports.on = function on(dom, event, callback) {
  dom.addEventListener(event, callback, false);
};

var off = exports.off = function off(dom, event, callback) {
  dom.removeEventListener(event, callback);
};