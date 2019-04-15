module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 637);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = window.React;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = window.ReactDOM;

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(652);


/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e41fe7f6806de93913f125420d84a734.png";

/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: external "electron"
var external_electron_ = __webpack_require__(4);

// EXTERNAL MODULE: ./renderer/src/pages/About/App.scss
var App = __webpack_require__(638);

// CONCATENATED MODULE: ./renderer/src/pages/About/About.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var appName = external_electron_["remote"].app.getName();
var version = external_electron_["remote"].app.getVersion();

var About_About =
/*#__PURE__*/
function (_Component) {
  _inherits(About, _Component);

  function About(props) {
    var _this;

    _classCallCheck(this, About);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(About).call(this, props));

    _this.openLink = function (event) {
      var link = event.target;
      event.preventDefault();
      external_electron_["shell"].openExternal(link.href);
    };

    return _this;
  }

  _createClass(About, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "about"
      }, external_window_React_default.a.createElement("div", {
        key: "r1",
        className: "about-body"
      }, external_window_React_default.a.createElement("div", {
        className: "logo"
      }, external_window_React_default.a.createElement("img", {
        src: __webpack_require__(639),
        height: 64
      })), external_window_React_default.a.createElement("div", {
        className: "appname"
      }, external_window_React_default.a.createElement("b", null, appName)), external_window_React_default.a.createElement("div", {
        className: "version"
      }, "\u7248\u672C ", version), external_window_React_default.a.createElement("div", {
        className: "copyright"
      }, "\u7248\u6743\u6240\u6709 \xA9 2018 \u963F\u91CC\u5DF4\u5DF4\u96C6\u56E2 \u4FDD\u7559\u6240\u6709\u6743\u5229")));
    }
  }]);

  return About;
}(external_window_React_["Component"]);

/* harmony default export */ var pages_About_About = (About_About);
// EXTERNAL MODULE: external "window.ReactDOM"
var external_window_ReactDOM_ = __webpack_require__(5);
var external_window_ReactDOM_default = /*#__PURE__*/__webpack_require__.n(external_window_ReactDOM_);

// CONCATENATED MODULE: ./renderer/src/pages/About/index.jsx
 // 当前 page 的主入口




var renderEntry = external_window_React_default.a.createElement(pages_About_About);
var app = document.createElement('div');
document.body.appendChild(app);
external_window_ReactDOM_default.a.render(renderEntry, app);

/***/ })

/******/ });