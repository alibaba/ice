module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		15: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([635,1,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = window.React;

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ 103:
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

module.exports = require("punycode");

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(request__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


/**
 * 获取物料请求
 * uri：string 资源路径
 * options：object 参数
 * ignoreReject：boolean 是否忽略reject，总是返回值
 */

function requestMaterial(uri) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ignoreReject = arguments.length > 2 ? arguments[2] : undefined;

  // 参数重置
  if (typeof options === 'boolean') {
    ignoreReject = options;
    options = {};
  }

  options = Object.assign({
    uri: uri.trim(),
    json: true,
    rejectUnauthorized: false,
    // 绕过 SSL 证书检测，主要是针对使用自签发证书的https资源无法访问的问题。
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 5000
  }, options);
  return new Promise(function (resolve, reject) {
    request__WEBPACK_IMPORTED_MODULE_0___default()(options, function (err, res, body) {
      var error = err || body.error;

      if (error) {
        error.message = "\u7269\u6599\u8BF7\u6C42\u5931\u8D25\uFF0C\u5730\u5740: ".concat(uri, "\uFF0C\u9519\u8BEF\uFF1A").concat(error.message);
        _logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].error(error);

        if (ignoreReject) {
          resolve(null);
        } else {
          var type = getMaterialType(options);
          error.message = "request-".concat(type, "-material-error: ").concat(JSON.stringify({
            uri: uri
          }));
          _logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].error(error);
          reject(error);
        }
      } else {
        resolve(body);
      }
    });
  });
}
/**
 * 获取物料类型，区分官方物料和自定义物料两类
 * @param {Object} options
 * @return {string} official: 官网物料 custom：自定义物料
 */


function getMaterialType() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var officialMaterial = options.uri.includes('ice.alicdn.com');

  if (officialMaterial) {
    return 'official';
  }

  return 'custom';
}

/* harmony default export */ __webpack_exports__["a"] = (requestMaterial);

/***/ }),

/***/ 49:
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = window.ReactDOM;

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(650);


/***/ }),

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 650:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/progress/index.js
var progress = __webpack_require__(125);
var progress_default = /*#__PURE__*/__webpack_require__.n(progress);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/button/index.js
var lib_button = __webpack_require__(65);
var button_default = /*#__PURE__*/__webpack_require__.n(lib_button);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: external "electron"
var external_electron_ = __webpack_require__(4);

// EXTERNAL MODULE: ./renderer/src/lib/request-material.js
var request_material = __webpack_require__(47);

// EXTERNAL MODULE: ./renderer/src/lib/logger.js
var logger = __webpack_require__(7);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/reset.scss
var base_reset = __webpack_require__(185);

// EXTERNAL MODULE: ./renderer/src/pages/Updater/App.scss
var App = __webpack_require__(636);

// CONCATENATED MODULE: ./renderer/src/pages/Updater/App.jsx



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var OSS_CDN_DOMAIN = "https://iceworks.oss-cn-hangzhou.aliyuncs.com"; // 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等




var App_Updater =
/*#__PURE__*/
function (_Component) {
  _inherits(Updater, _Component);

  function Updater(props) {
    var _this;

    _classCallCheck(this, Updater);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Updater).call(this, props));

    _this.handleUpdatesFound = function () {
      // 开始更新
      external_electron_["ipcRenderer"].send('updater-start');

      _this.setState({
        updating: true
      });
    };

    _this.handleUpdaterClose = function () {
      external_electron_["ipcRenderer"].send('updater-close');
    };

    _this.handleUpdaterInstall = function () {
      external_electron_["ipcRenderer"].send('app-quit-install');
      external_electron_["ipcRenderer"].send('updater-install');
    };

    _this.fetchVersionLog = function (meta) {
      if (meta.version) {
        var updateLogUrl = "".concat(OSS_CDN_DOMAIN, "/changelog/").concat(meta.version, ".json");
        Object(request_material["a" /* default */])(updateLogUrl).then(function (res) {
          if (_typeof(res) === 'object') {
            if (Array.isArray(res.log)) {
              _this.setState({
                log: res.log
              });
            }
          } else {
            logger["a" /* default */].info(res);
          }
        }).catch(function (err) {
          logger["a" /* default */].info(err);
        });
      }
    };

    _this.renderUpdater = function () {
      var _this$state = _this.state,
          event = _this$state.event,
          meta = _this$state.meta;

      if (event === 'update-available') {
        return external_window_React_default.a.createElement("div", {
          className: "updater-content"
        }, external_window_React_default.a.createElement("div", {
          className: "event-wrapper"
        }, "\u68C0\u67E5\u5230\u53EF\u7528\u7248\u672C (", meta.version, ")\uFF0C\u662F\u5426\u66F4\u65B0\uFF1F"), external_window_React_default.a.createElement("div", {
          className: "btn-wrapper"
        }, external_window_React_default.a.createElement(button_default.a, {
          onClick: _this.handleUpdaterClose,
          size: "small"
        }, "\u53D6\u6D88"), external_window_React_default.a.createElement(button_default.a, {
          onClick: _this.handleUpdatesFound,
          loading: _this.state.updating,
          size: "small",
          type: "primary"
        }, "\u786E\u5B9A")));
      } else if (event === 'update-not-available') {
        return external_window_React_default.a.createElement("div", {
          className: "updater-content"
        }, external_window_React_default.a.createElement("div", {
          className: "event-wrapper"
        }, "\u5F53\u524D\u5DF2\u7ECF\u662F\u6700\u65B0\u7684\u7248\u672C\u3002"), external_window_React_default.a.createElement("div", {
          className: "btn-wrapper"
        }, external_window_React_default.a.createElement(button_default.a, {
          onClick: _this.handleUpdaterClose,
          size: "small",
          type: "primary"
        }, "\u786E\u5B9A")));
      } else if (event === 'download-progress') {
        return external_window_React_default.a.createElement("div", {
          className: "updater-content"
        }, external_window_React_default.a.createElement("div", {
          className: "event-wrapper"
        }, "\u6B63\u5728\u4E0B\u8F7D\u66F4\u65B0..."), external_window_React_default.a.createElement(progress_default.a, {
          showInfo: false,
          percent: parseInt(meta.percent, 10),
          size: "medium"
        }));
      } else if (event === 'unpack-updater') {
        return external_window_React_default.a.createElement("div", {
          className: "updater-content"
        }, external_window_React_default.a.createElement("div", {
          className: "event-wrapper"
        }, "\u6B63\u5728\u89E3\u538B\u66F4\u65B0..."), external_window_React_default.a.createElement(progress_default.a, {
          showInfo: false,
          percent: 100,
          size: "medium"
        }));
      } else if (event === 'update-downloaded') {
        return external_window_React_default.a.createElement("div", {
          className: "updater-content"
        }, external_window_React_default.a.createElement("div", {
          className: "event-wrapper"
        }, "\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002"), external_window_React_default.a.createElement("div", {
          className: "btn-wrapper"
        }, external_window_React_default.a.createElement(button_default.a, {
          onClick: _this.handleUpdaterInstall,
          size: "small",
          type: "primary"
        }, "\u5B89\u88C5\u5E76\u91CD\u542F\u5E94\u7528")));
      } else if (event === 'error') {
        return external_window_React_default.a.createElement("div", {
          className: "updater-content"
        }, external_window_React_default.a.createElement("div", {
          className: "event-wrapper"
        }, "\u66F4\u65B0\u5931\u8D25!"), external_window_React_default.a.createElement("div", {
          className: "btn-wrapper"
        }, external_window_React_default.a.createElement(button_default.a, {
          onClick: _this.handleUpdaterClose,
          size: "small",
          type: "primary"
        }, "\u786E\u5B9A")));
      } else {
        return external_window_React_default.a.createElement("div", {
          className: "updater-content"
        }, external_window_React_default.a.createElement("div", {
          className: "event-wrapper"
        }, "\u6B63\u5728\u68C0\u67E5\u66F4\u65B0..."));
      }
    };

    _this.renderChangelog = function () {
      var _this$state2 = _this.state,
          log = _this$state2.log,
          meta = _this$state2.meta;

      if (log.length) {
        return external_window_React_default.a.createElement("div", {
          className: "changelog"
        }, external_window_React_default.a.createElement("strong", null, meta.version, " \u66F4\u65B0\u65E5\u5FD7"), external_window_React_default.a.createElement("ul", null, log.map(function (text, index) {
          return external_window_React_default.a.createElement("li", {
            key: index,
            dangerouslySetInnerHTML: {
              __html: text
            }
          });
        })));
      }

      return null;
    };

    _this.state = {
      event: 'init',
      updating: false,
      log: [],
      meta: {
        percent: 0
      }
    };
    return _this;
  }

  _createClass(Updater, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      external_electron_["ipcRenderer"].on('updater-message', function (e, data) {
        var event = data.event,
            meta = data.meta;

        if (event === 'download-progress' && meta && meta.percent > 99) {
          _this2.setState({
            event: 'unpack-updater',
            meta: {
              percent: 50
            }
          });
        } else {
          // 存在可用更新
          if (event === 'update-available' || event === 'update-not-available') {
            _this2.fetchVersionLog(meta);
          }

          _this2.setState({
            event: event,
            meta: meta
          });
        }
      });
      external_electron_["ipcRenderer"].send('updater-check');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      external_electron_["ipcRenderer"].removeAllListeners('message');
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // 更新视图窗口大小
      this.setUpdateWindowSize();
    }
  }, {
    key: "setUpdateWindowSize",
    value: function setUpdateWindowSize() {
      var width = document.documentElement.scrollWidth;
      var height = document.documentElement.scrollHeight;
      external_electron_["ipcRenderer"].send('set-updater-window-size', {
        width: width,
        height: height
      });
    }
  }, {
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "container"
      }, this.renderUpdater(), this.renderChangelog());
    }
  }]);

  return Updater;
}(external_window_React_["Component"]);

/* harmony default export */ var Updater_App = (App_Updater);
// EXTERNAL MODULE: external "window.ReactDOM"
var external_window_ReactDOM_ = __webpack_require__(5);
var external_window_ReactDOM_default = /*#__PURE__*/__webpack_require__.n(external_window_ReactDOM_);

// CONCATENATED MODULE: ./renderer/src/pages/Updater/index.jsx
 // 当前 page 的主入口




var renderEntry = external_window_React_default.a.createElement(Updater_App);
var app = document.createElement('div');
document.body.appendChild(app);
external_window_ReactDOM_default.a.render(renderEntry, app);

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron_log__WEBPACK_IMPORTED_MODULE_0__);

electron_log__WEBPACK_IMPORTED_MODULE_0___default.a.transports.file.fileName = 'renderer.log';
electron_log__WEBPACK_IMPORTED_MODULE_0___default.a.transports.file.level = 'info';

electron_log__WEBPACK_IMPORTED_MODULE_0___default.a.transports.arms = function (msg) {
  // eslint-disable-next-line
  window.__bl && __bl.error(msg.data[0]);
};

electron_log__WEBPACK_IMPORTED_MODULE_0___default.a.transports.arms.level = 'error';
/* harmony default export */ __webpack_exports__["a"] = (electron_log__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ })

/******/ });