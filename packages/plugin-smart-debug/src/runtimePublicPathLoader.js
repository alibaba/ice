module.exports = (content) => {
  return `
    if (!process.env.__IS_SERVER__ && window.ICE && window.ICE.debug) {
      var debug = window.ICE.debug;
      __webpack_public_path__ = '//' + debug.origin + ':' + debug.port + (debug.output ? ('/' + debug.output + '/') : '/');
    }
    ${content}
  `;
};
