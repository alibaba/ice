export const throttle = (func, wait, options) => {
  // from underscore
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
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

export const getWidthFromDOM = dom => {
  const styles = window.getComputedStyle(dom);
  const width = dom.offsetWidth;
  const borderLeftWidth = parseFloat(styles.borderLeftWidth);
  const borderRightWidth = parseFloat(styles.borderRightWidth);
  const paddingLeft = parseFloat(styles.paddingLeft);
  const paddingRight = parseFloat(styles.paddingRight);

  return (
    width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight
  );
};

export const on = (dom, event, callback) => {
  dom.addEventListener(event, callback, false);
};

export const off = (dom, event, callback) => {
  dom.removeEventListener(event, callback);
};
