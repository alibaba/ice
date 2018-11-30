module.exports = function windows() {
  return {
    open(name) {
      if (windows[name].isVisible()) {
        windows[name].focus();
      } else {
        windows[name].show();
      }
    },
  };
};
