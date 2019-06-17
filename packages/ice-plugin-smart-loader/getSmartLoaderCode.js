module.exports = ({ outputDir, outputAssetsPath }) => {
  return `
window.ICE = window.ICE || {};
var protocol = window.location.protocol;
// 如果是 file:, about:, 等等其它的协议
if (!/^http/.test(protocol)) {
  protocol = 'http:';
}
window.ICE.protocol = protocol || '';

// smart-loader
var searchStr = window.location.search.replace(/^\\?/, '');
var searchSplited = searchStr.split('&');
var search = searchSplited.reduce(function(prev, current) {
  if (current) {
    var tuple = current.split('=');
    prev[tuple[0]] = tuple[1];
  }
  return prev;
}, {});
if (search.debug) {
  var originValue = '127.0.0.1'; // can not be override
  var originPort = search.debugPort || '3333';
  var originPath = search.debugPath || '/${outputDir}/${outputAssetsPath.js ? `${outputAssetsPath.js}/index.js` : 'index.js'}';
  var outputPath = search.ouputPath || '${outputDir}';
  if (window.ICE.debug) {
    window.ICE.debug.origin = originValue;
    window.ICE.debug.port = originPort;
    window.ICE.debug.path = originPath;
    window.ICE.debug.output = outputPath;
  } else {
    window.ICE.debug = {
      origin: originValue,
      port: originPort,
      path: originPath,
      output: outputPath
    };
  }
}
var iceScript = document.getElementById('ice-script') || document.currentScript;
if (iceScript === null) {
  console.error('!您正在使用 ICE 智能调试服务, 但是页面上的 script 节点找不到 ice-script 的 id, 请检查!');
} else if (window.ICE.debug && window.ICE.debug.origin) {
  var scriptPath = window.ICE.debug.path || iceScript.src.replace(/(https?:)?\\/\\/(\\w+)(:\\d+)?/, '') || '/index.js';
  var cssOutputPath = '${outputAssetsPath.css}';
  var jsOutputPath = '${outputAssetsPath.js}';
  window.ICE.debug.customJS = window.ICE.protocol + '//' + window.ICE.debug.origin + ':' + window.ICE.debug.port + scriptPath;
  var cssPath = scriptPath.replace(/\\.js$/i, '.css').replace(/(\\.js)(?=[?#])/i, '.css');
  if (!!jsOutputPath) {
    cssPath = cssPath.replace('/${outputAssetsPath.js}/', cssOutputPath ? '/${outputAssetsPath.css}/' : '');
  } else if (!!cssOutputPath) {
    cssPath = '/' + cssOutputPath + cssPath;
  }
  var cssLink = window.ICE.protocol + '//' + window.ICE.debug.origin + ':' + window.ICE.debug.port + cssPath;
  var didStyleLoaded = document.querySelector('link[data-ice-style-loaded]');
  var currentLink = document.querySelector('link[href$="' + cssLink + '"]');
  if (currentLink) {
    // debug 下, 移除原先加载的 css
    console.log('remove css');
    currentLink.parentElement.removeChild(currentLink);
  }
}

if (iceScript !== null && window.ICE.debug && window.ICE.debug.customJS && !window.ICE.debug.skip) {
  window.ICE.debug.skip = true;
  var urls = [window.ICE.debug.customJS];
  if (!didStyleLoaded && !currentLink) {
    urls.push(cssLink);
  }
  __loadUrls__(urls, function() {
    console.warn('您正在使用 ICE 智能调试服务, 目前加载的 JS 和 CSS 路径为:' );
    console.warn(window.ICE.debug.customJS + "\\n" + cssLink);
  });
  window.__stopLoadUrls__ = true;
} else {
  window.__stopLoadUrls__ = false;
}
  `;
};
