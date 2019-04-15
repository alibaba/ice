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
/******/ 		12: 0
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
/******/ 	deferredModules.push([640,1,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = window.React;

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(642);
var objectAssign = __webpack_require__(178);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var BrowserLink =
/*#__PURE__*/
function (_Component) {
  _inherits(BrowserLink, _Component);

  function BrowserLink() {
    _classCallCheck(this, BrowserLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(BrowserLink).apply(this, arguments));
  }

  _createClass(BrowserLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          href = _this$props.href,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", _extends({}, this.props, {
        style: _objectSpread({
          textDecoration: 'none'
        }, style),
        onClick: function onClick(event) {
          event.preventDefault();
          electron__WEBPACK_IMPORTED_MODULE_0__["shell"].openExternal(href);
        }
      }));
    }
  }]);

  return BrowserLink;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (BrowserLink);

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _iconfont_iconfont_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(163);
/* harmony import */ var _iconfont_iconfont_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_iconfont_iconfont_css__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=568722&keyword=
// 使用 custom 生成自定义 ICON 组件



var fontFamily = 'iceworks';
var prefix = 'iceworks';


var Icon =
/*#__PURE__*/
function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, _getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: "render",
    value: function render() {
      var _cx;

      var _this$props = this.props,
          className = _this$props.className,
          size = _this$props.size,
          type = _this$props.type,
          other = _objectWithoutProperties(_this$props, ["className", "size", "type"]);

      var classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()((_cx = {}, _defineProperty(_cx, "".concat(prefix, "-").concat(size), !!size), _defineProperty(_cx, "".concat(fontFamily), true), _defineProperty(_cx, "".concat(prefix, "-").concat(type), !!type), _defineProperty(_cx, className, !!className), _cx));
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", _extends({}, other, {
        className: classes
      }));
    }
  }]);

  return Icon;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

Icon.propTypes = {
  /**
   * 指定显示哪种图标
   */
  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * 指定图标大小
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'])
};
Icon.defaultProps = {
  size: 'medium'
};
/* harmony default export */ __webpack_exports__["a"] = (Icon);

/***/ }),

/***/ 290:
/***/ (function(module, exports) {

module.exports = {
	MODE_NUMBER :		1 << 0,
	MODE_ALPHA_NUM : 	1 << 1,
	MODE_8BIT_BYTE : 	1 << 2,
	MODE_KANJI :		1 << 3
};


/***/ }),

/***/ 291:
/***/ (function(module, exports) {

module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};



/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

var math = __webpack_require__(293);

function QRPolynomial(num, shift) {

	if (num.length == undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] == 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= math.gexp(math.glog(this.get(i) ) + math.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = math.glog(this.get(0) ) - math.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var i = 0; i < e.getLength(); i++) {
			num[i] ^= math.gexp(math.glog(e.get(i) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;


/***/ }),

/***/ 293:
/***/ (function(module, exports) {

var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;


/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var React = __webpack_require__(1);

var PropTypes = __webpack_require__(2); // qr.js doesn't handle error level of zero (M) so we need to do it right,
// thus the deep require.


var QRCodeImpl = __webpack_require__(643);

var ErrorCorrectLevel = __webpack_require__(291);

function getBackingStorePixelRatio(ctx) {
  return (// $FlowFixMe
    ctx.webkitBackingStorePixelRatio || // $FlowFixMe
    ctx.mozBackingStorePixelRatio || // $FlowFixMe
    ctx.msBackingStorePixelRatio || // $FlowFixMe
    ctx.oBackingStorePixelRatio || // $FlowFixMe
    ctx.backingStorePixelRatio || 1
  );
} // Convert from UTF-16, forcing the use of byte-mode encoding in our QR Code.
// This allows us to encode Hanji, Kanji, emoji, etc. Ideally we'd do more
// detection and not resort to byte-mode if possible, but we're trading off
// a smaller library for a smaller amount of data we can potentially encode.
// Based on http://jonisalonen.com/2012/from-utf-16-to-utf-8-in-javascript/


function convertStr(str) {
  var out = '';

  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);

    if (charcode < 0x0080) {
      out += String.fromCharCode(charcode);
    } else if (charcode < 0x0800) {
      out += String.fromCharCode(0xc0 | charcode >> 6);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      out += String.fromCharCode(0xe0 | charcode >> 12);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else {
      // This is a surrogate pair, so we'll reconsitute the pieces and work
      // from that
      i++;
      charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
      out += String.fromCharCode(0xf0 | charcode >> 18);
      out += String.fromCharCode(0x80 | charcode >> 12 & 0x3f);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    }
  }

  return out;
}

var DEFAULT_PROPS = {
  size: 128,
  level: 'L',
  bgColor: '#FFFFFF',
  fgColor: '#000000'
};
var PROP_TYPES = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
  bgColor: PropTypes.string,
  fgColor: PropTypes.string
};

var QRCodeCanvas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(QRCodeCanvas, _React$Component);

  function QRCodeCanvas() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, QRCodeCanvas);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = QRCodeCanvas.__proto__ || Object.getPrototypeOf(QRCodeCanvas)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "_canvas", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    }), _temp));
  }

  _createClass(QRCodeCanvas, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      return Object.keys(QRCodeCanvas.propTypes).some(function (k) {
        return _this2.props[k] !== nextProps[k];
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var _props = this.props,
          value = _props.value,
          size = _props.size,
          level = _props.level,
          bgColor = _props.bgColor,
          fgColor = _props.fgColor; // We'll use type===-1 to force QRCode to automatically pick the best type

      var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
      qrcode.addData(convertStr(value));
      qrcode.make();

      if (this._canvas != null) {
        var canvas = this._canvas;
        var ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        }

        var cells = qrcode.modules;

        if (cells === null) {
          return;
        }

        var tileW = size / cells.length;
        var tileH = size / cells.length;
        var scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
        canvas.height = canvas.width = size * scale;
        ctx.scale(scale, scale);
        cells.forEach(function (row, rdx) {
          row.forEach(function (cell, cdx) {
            ctx && (ctx.fillStyle = cell ? fgColor : bgColor);
            var w = Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW);
            var h = Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH);
            ctx && ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          value = _props2.value,
          size = _props2.size,
          level = _props2.level,
          bgColor = _props2.bgColor,
          fgColor = _props2.fgColor,
          style = _props2.style,
          otherProps = _objectWithoutProperties(_props2, ["value", "size", "level", "bgColor", "fgColor", "style"]);

      var canvasStyle = _extends({
        height: size,
        width: size
      }, style);

      return React.createElement("canvas", _extends({
        style: canvasStyle,
        height: size,
        width: size,
        ref: function ref(_ref2) {
          return _this3._canvas = _ref2;
        }
      }, otherProps));
    }
  }]);

  return QRCodeCanvas;
}(React.Component);

Object.defineProperty(QRCodeCanvas, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: DEFAULT_PROPS
});
Object.defineProperty(QRCodeCanvas, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: PROP_TYPES
});

var QRCodeSVG =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(QRCodeSVG, _React$Component2);

  function QRCodeSVG() {
    _classCallCheck(this, QRCodeSVG);

    return _possibleConstructorReturn(this, (QRCodeSVG.__proto__ || Object.getPrototypeOf(QRCodeSVG)).apply(this, arguments));
  }

  _createClass(QRCodeSVG, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this4 = this;

      return Object.keys(QRCodeCanvas.propTypes).some(function (k) {
        return _this4.props[k] !== nextProps[k];
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          value = _props3.value,
          size = _props3.size,
          level = _props3.level,
          bgColor = _props3.bgColor,
          fgColor = _props3.fgColor,
          otherProps = _objectWithoutProperties(_props3, ["value", "size", "level", "bgColor", "fgColor"]); // We'll use type===-1 to force QRCode to automatically pick the best type


      var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
      qrcode.addData(convertStr(value));
      qrcode.make();
      var cells = qrcode.modules;

      if (cells === null) {
        return;
      } // Drawing strategy: instead of a rect per module, we're going to create a
      // single path for the dark modules and layer that on top of a light rect,
      // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
      // way faster than DOM ops.
      // For level 1, 441 nodes -> 2
      // For level 40, 31329 -> 2


      var ops = [];
      cells.forEach(function (row, y) {
        var lastIsDark = false;
        var start = null;
        row.forEach(function (cell, x) {
          if (!cell && start !== null) {
            // M0 0h7v1H0z injects the space with the move and dropd the comma,
            // saving a char per operation
            ops.push("M".concat(start, " ").concat(y, "h").concat(x - start, "v1H").concat(start, "z"));
            start = null;
            return;
          } // end of row, clean up or skip


          if (x === row.length - 1) {
            if (!cell) {
              // We would have closed the op above already so this can only mean
              // 2+ light modules in a row.
              return;
            }

            if (start === null) {
              // Just a single dark module.
              ops.push("M".concat(x, ",").concat(y, " h1v1H").concat(x, "z"));
            } else {
              // Otherwise finish the current line.
              ops.push("M".concat(start, ",").concat(y, " h").concat(x + 1 - start, "v1H").concat(start, "z"));
            }

            return;
          }

          if (cell && start === null) {
            start = x;
          }
        });
      });
      return React.createElement("svg", _extends({
        shapeRendering: "crispEdges",
        height: size,
        width: size,
        viewBox: "0 0 ".concat(cells.length, " ").concat(cells.length)
      }, otherProps), React.createElement("path", {
        fill: bgColor,
        d: "M0,0 h".concat(cells.length, "v").concat(cells.length, "H0z")
      }), React.createElement("path", {
        fill: fgColor,
        d: ops.join('')
      }));
    }
  }]);

  return QRCodeSVG;
}(React.Component);

Object.defineProperty(QRCodeSVG, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: DEFAULT_PROPS
});
Object.defineProperty(QRCodeSVG, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: PROP_TYPES
});

var QRCode = function QRCode(props) {
  var renderAs = props.renderAs,
      otherProps = _objectWithoutProperties(props, ["renderAs"]);

  var Component = renderAs === 'svg' ? QRCodeSVG : QRCodeCanvas;
  return React.createElement(Component, otherProps);
};

QRCode.defaultProps = _extends({
  renderAs: 'canvas'
}, DEFAULT_PROPS);
module.exports = QRCode;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = window.ReactDOM;

/***/ }),

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(651);


/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ 643:
/***/ (function(module, exports, __webpack_require__) {

var BitByte = __webpack_require__(644);
var RSBlock = __webpack_require__(645);
var BitBuffer = __webpack_require__(646);
var util = __webpack_require__(647);
var Polynomial = __webpack_require__(292);

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

// for client side minification
var proto = QRCode.prototype;

proto.addData = function(data) {
	var newData = new BitByte(data);
	this.dataList.push(newData);
	this.dataCache = null;
};

proto.isDark = function(row, col) {
	if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
		throw new Error(row + "," + col);
	}
	return this.modules[row][col];
};

proto.getModuleCount = function() {
	return this.moduleCount;
};

proto.make = function() {
	// Calculate automatically typeNumber if provided is < 1
	if (this.typeNumber < 1 ){
		var typeNumber = 1;
		for (typeNumber = 1; typeNumber < 40; typeNumber++) {
			var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

			var buffer = new BitBuffer();
			var totalDataCount = 0;
			for (var i = 0; i < rsBlocks.length; i++) {
				totalDataCount += rsBlocks[i].dataCount;
			}

			for (var i = 0; i < this.dataList.length; i++) {
				var data = this.dataList[i];
				buffer.put(data.mode, 4);
				buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
				data.write(buffer);
			}
			if (buffer.getLengthInBits() <= totalDataCount * 8)
				break;
		}
		this.typeNumber = typeNumber;
	}
	this.makeImpl(false, this.getBestMaskPattern() );
};

proto.makeImpl = function(test, maskPattern) {
	
	this.moduleCount = this.typeNumber * 4 + 17;
	this.modules = new Array(this.moduleCount);
	
	for (var row = 0; row < this.moduleCount; row++) {
		
		this.modules[row] = new Array(this.moduleCount);
		
		for (var col = 0; col < this.moduleCount; col++) {
			this.modules[row][col] = null;//(col + row) % 3;
		}
	}

	this.setupPositionProbePattern(0, 0);
	this.setupPositionProbePattern(this.moduleCount - 7, 0);
	this.setupPositionProbePattern(0, this.moduleCount - 7);
	this.setupPositionAdjustPattern();
	this.setupTimingPattern();
	this.setupTypeInfo(test, maskPattern);
	
	if (this.typeNumber >= 7) {
		this.setupTypeNumber(test);
	}

	if (this.dataCache == null) {
		this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
	}

	this.mapData(this.dataCache, maskPattern);
};

proto.setupPositionProbePattern = function(row, col)  {
	
	for (var r = -1; r <= 7; r++) {
		
		if (row + r <= -1 || this.moduleCount <= row + r) continue;
		
		for (var c = -1; c <= 7; c++) {
			
			if (col + c <= -1 || this.moduleCount <= col + c) continue;
			
			if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
					|| (0 <= c && c <= 6 && (r == 0 || r == 6) )
					|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
				this.modules[row + r][col + c] = true;
			} else {
				this.modules[row + r][col + c] = false;
			}
		}		
	}		
};

proto.getBestMaskPattern = function() {

	var minLostPoint = 0;
	var pattern = 0;

	for (var i = 0; i < 8; i++) {
		
		this.makeImpl(true, i);

		var lostPoint = util.getLostPoint(this);

		if (i == 0 || minLostPoint >  lostPoint) {
			minLostPoint = lostPoint;
			pattern = i;
		}
	}

	return pattern;
};

proto.createMovieClip = function(target_mc, instance_name, depth) {

	var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
	var cs = 1;

	this.make();

	for (var row = 0; row < this.modules.length; row++) {
		
		var y = row * cs;
		
		for (var col = 0; col < this.modules[row].length; col++) {

			var x = col * cs;
			var dark = this.modules[row][col];
		
			if (dark) {
				qr_mc.beginFill(0, 100);
				qr_mc.moveTo(x, y);
				qr_mc.lineTo(x + cs, y);
				qr_mc.lineTo(x + cs, y + cs);
				qr_mc.lineTo(x, y + cs);
				qr_mc.endFill();
			}
		}
	}
	
	return qr_mc;
};

proto.setupTimingPattern = function() {
	
	for (var r = 8; r < this.moduleCount - 8; r++) {
		if (this.modules[r][6] != null) {
			continue;
		}
		this.modules[r][6] = (r % 2 == 0);
	}

	for (var c = 8; c < this.moduleCount - 8; c++) {
		if (this.modules[6][c] != null) {
			continue;
		}
		this.modules[6][c] = (c % 2 == 0);
	}
};

proto.setupPositionAdjustPattern = function() {

	var pos = util.getPatternPosition(this.typeNumber);
	
	for (var i = 0; i < pos.length; i++) {
	
		for (var j = 0; j < pos.length; j++) {
		
			var row = pos[i];
			var col = pos[j];
			
			if (this.modules[row][col] != null) {
				continue;
			}
			
			for (var r = -2; r <= 2; r++) {
			
				for (var c = -2; c <= 2; c++) {
				
					if (r == -2 || r == 2 || c == -2 || c == 2
							|| (r == 0 && c == 0) ) {
						this.modules[row + r][col + c] = true;
					} else {
						this.modules[row + r][col + c] = false;
					}
				}
			}
		}
	}
};

proto.setupTypeNumber = function(test) {

	var bits = util.getBCHTypeNumber(this.typeNumber);

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
	}

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
	}
};

proto.setupTypeInfo = function(test, maskPattern) {

	var data = (this.errorCorrectLevel << 3) | maskPattern;
	var bits = util.getBCHTypeInfo(data);

	// vertical		
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);

		if (i < 6) {
			this.modules[i][8] = mod;
		} else if (i < 8) {
			this.modules[i + 1][8] = mod;
		} else {
			this.modules[this.moduleCount - 15 + i][8] = mod;
		}
	}

	// horizontal
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);
		
		if (i < 8) {
			this.modules[8][this.moduleCount - i - 1] = mod;
		} else if (i < 9) {
			this.modules[8][15 - i - 1 + 1] = mod;
		} else {
			this.modules[8][15 - i - 1] = mod;
		}
	}

	// fixed module
	this.modules[this.moduleCount - 8][8] = (!test);
};

proto.mapData = function(data, maskPattern) {
	
	var inc = -1;
	var row = this.moduleCount - 1;
	var bitIndex = 7;
	var byteIndex = 0;
	
	for (var col = this.moduleCount - 1; col > 0; col -= 2) {

		if (col == 6) col--;

		while (true) {

			for (var c = 0; c < 2; c++) {
				
				if (this.modules[row][col - c] == null) {
					
					var dark = false;

					if (byteIndex < data.length) {
						dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
					}

					var mask = util.getMask(maskPattern, row, col - c);

					if (mask) {
						dark = !dark;
					}
					
					this.modules[row][col - c] = dark;
					bitIndex--;

					if (bitIndex == -1) {
						byteIndex++;
						bitIndex = 7;
					}
				}
			}
							
			row += inc;

			if (row < 0 || this.moduleCount <= row) {
				row -= inc;
				inc = -inc;
				break;
			}
		}
	}
};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new BitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalDataCount += rsBlocks[i].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. ("
			+ buffer.getLengthInBits()
			+ ">"
			+  totalDataCount * 8
			+ ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 != 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = util.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new Polynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
			ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalCodeCount += rsBlocks[i].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var i = 0; i < maxDcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < dcdata[r].length) {
				data[index++] = dcdata[r][i];
			}
		}
	}

	for (var i = 0; i < maxEcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < ecdata[r].length) {
				data[index++] = ecdata[r][i];
			}
		}
	}

	return data;
};

module.exports = QRCode;



/***/ }),

/***/ 644:
/***/ (function(module, exports, __webpack_require__) {

var mode = __webpack_require__(290);

function QR8bitByte(data) {
	this.mode = mode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function(buffer) {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;



/***/ }),

/***/ 645:
/***/ (function(module, exports, __webpack_require__) {

// ErrorCorrectLevel
var ECL = __webpack_require__(291);

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock == undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = new Array();
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
}

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case ECL.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case ECL.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case ECL.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case ECL.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
}

module.exports = QRRSBlock;


/***/ }),

/***/ 646:
/***/ (function(module, exports) {

function QRBitBuffer() {
	this.buffer = new Array();
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;


/***/ }),

/***/ 647:
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(290);
var Polynomial = __webpack_require__(292);
var math = __webpack_require__(293);

var QRMaskPattern = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

var QRUtil = {

    PATTERN_POSITION_TABLE : [
	    [],
	    [6, 18],
	    [6, 22],
	    [6, 26],
	    [6, 30],
	    [6, 34],
	    [6, 22, 38],
	    [6, 24, 42],
	    [6, 26, 46],
	    [6, 28, 50],
	    [6, 30, 54],		
	    [6, 32, 58],
	    [6, 34, 62],
	    [6, 26, 46, 66],
	    [6, 26, 48, 70],
	    [6, 26, 50, 74],
	    [6, 30, 54, 78],
	    [6, 30, 56, 82],
	    [6, 30, 58, 86],
	    [6, 34, 62, 90],
	    [6, 28, 50, 72, 94],
	    [6, 26, 50, 74, 98],
	    [6, 30, 54, 78, 102],
	    [6, 28, 54, 80, 106],
	    [6, 32, 58, 84, 110],
	    [6, 30, 58, 86, 114],
	    [6, 34, 62, 90, 118],
	    [6, 26, 50, 74, 98, 122],
	    [6, 30, 54, 78, 102, 126],
	    [6, 26, 52, 78, 104, 130],
	    [6, 30, 56, 82, 108, 134],
	    [6, 34, 60, 86, 112, 138],
	    [6, 30, 58, 86, 114, 142],
	    [6, 34, 62, 90, 118, 146],
	    [6, 30, 54, 78, 102, 126, 150],
	    [6, 24, 50, 76, 102, 128, 154],
	    [6, 28, 54, 80, 106, 132, 158],
	    [6, 32, 58, 84, 110, 136, 162],
	    [6, 26, 54, 82, 110, 138, 166],
	    [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
	    var d = data << 10;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
		    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) ); 	
	    }
	    return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
	    var d = data << 12;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
		    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) ); 	
	    }
	    return (data << 12) | d;
    },

    getBCHDigit : function(data) {

	    var digit = 0;

	    while (data != 0) {
		    digit++;
		    data >>>= 1;
	    }

	    return digit;
    },

    getPatternPosition : function(typeNumber) {
	    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
	    
	    switch (maskPattern) {
		    
	    case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
	    case QRMaskPattern.PATTERN001 : return i % 2 == 0;
	    case QRMaskPattern.PATTERN010 : return j % 3 == 0;
	    case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
	    case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
	    case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
	    case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
	    case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

	    default :
		    throw new Error("bad maskPattern:" + maskPattern);
	    }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

	    var a = new Polynomial([1], 0);

	    for (var i = 0; i < errorCorrectLength; i++) {
		    a = a.multiply(new Polynomial([1, math.gexp(i)], 0) );
	    }

	    return a;
    },

    getLengthInBits : function(mode, type) {

	    if (1 <= type && type < 10) {

		    // 1 - 9

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 10;
		    case Mode.MODE_ALPHA_NUM 	: return 9;
		    case Mode.MODE_8BIT_BYTE	: return 8;
		    case Mode.MODE_KANJI  	: return 8;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 27) {

		    // 10 - 26

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 12;
		    case Mode.MODE_ALPHA_NUM 	: return 11;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 10;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 41) {

		    // 27 - 40

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 14;
		    case Mode.MODE_ALPHA_NUM	: return 13;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 12;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else {
		    throw new Error("type:" + type);
	    }
    },

    getLostPoint : function(qrCode) {
	    
	    var moduleCount = qrCode.getModuleCount();
	    
	    var lostPoint = 0;
	    
	    // LEVEL1
	    
	    for (var row = 0; row < moduleCount; row++) {

		    for (var col = 0; col < moduleCount; col++) {

			    var sameCount = 0;
			    var dark = qrCode.isDark(row, col);

				for (var r = -1; r <= 1; r++) {

				    if (row + r < 0 || moduleCount <= row + r) {
					    continue;
				    }

				    for (var c = -1; c <= 1; c++) {

					    if (col + c < 0 || moduleCount <= col + c) {
						    continue;
					    }

					    if (r == 0 && c == 0) {
						    continue;
					    }

					    if (dark == qrCode.isDark(row + r, col + c) ) {
						    sameCount++;
					    }
				    }
			    }

			    if (sameCount > 5) {
				    lostPoint += (3 + sameCount - 5);
			    }
		    }
	    }

	    // LEVEL2

	    for (var row = 0; row < moduleCount - 1; row++) {
		    for (var col = 0; col < moduleCount - 1; col++) {
			    var count = 0;
			    if (qrCode.isDark(row,     col    ) ) count++;
			    if (qrCode.isDark(row + 1, col    ) ) count++;
			    if (qrCode.isDark(row,     col + 1) ) count++;
			    if (qrCode.isDark(row + 1, col + 1) ) count++;
			    if (count == 0 || count == 4) {
				    lostPoint += 3;
			    }
		    }
	    }

	    // LEVEL3

	    for (var row = 0; row < moduleCount; row++) {
		    for (var col = 0; col < moduleCount - 6; col++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row, col + 1)
					    &&  qrCode.isDark(row, col + 2)
					    &&  qrCode.isDark(row, col + 3)
					    &&  qrCode.isDark(row, col + 4)
					    && !qrCode.isDark(row, col + 5)
					    &&  qrCode.isDark(row, col + 6) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount - 6; row++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row + 1, col)
					    &&  qrCode.isDark(row + 2, col)
					    &&  qrCode.isDark(row + 3, col)
					    &&  qrCode.isDark(row + 4, col)
					    && !qrCode.isDark(row + 5, col)
					    &&  qrCode.isDark(row + 6, col) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    // LEVEL4
	    
	    var darkCount = 0;

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount; row++) {
			    if (qrCode.isDark(row, col) ) {
				    darkCount++;
			    }
		    }
	    }
	    
	    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
	    lostPoint += ratio * 10;

	    return lostPoint;		
    }
};

module.exports = QRUtil;


/***/ }),

/***/ 651:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: external "window.ReactDOM"
var external_window_ReactDOM_ = __webpack_require__(5);
var external_window_ReactDOM_default = /*#__PURE__*/__webpack_require__.n(external_window_ReactDOM_);

// EXTERNAL MODULE: ./renderer/src/pages/PreviewLoading/index.scss
var pages_PreviewLoading = __webpack_require__(641);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/loading/index.js
var loading = __webpack_require__(184);
var loading_default = /*#__PURE__*/__webpack_require__.n(loading);

// EXTERNAL MODULE: ./renderer/node_modules/classnames/index.js
var classnames = __webpack_require__(8);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./renderer/node_modules/react-document-title/index.js
var react_document_title = __webpack_require__(118);
var react_document_title_default = /*#__PURE__*/__webpack_require__.n(react_document_title);

// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(119);
var query_string_default = /*#__PURE__*/__webpack_require__.n(query_string);

// EXTERNAL MODULE: ./renderer/node_modules/rc-tooltip/es/index.js + 28 modules
var es = __webpack_require__(99);

// EXTERNAL MODULE: ./renderer/node_modules/rc-tooltip/assets/bootstrap.css
var bootstrap = __webpack_require__(180);

// EXTERNAL MODULE: ./renderer/node_modules/qrcode.react/lib/index.js
var lib = __webpack_require__(300);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./renderer/src/components/BrowserLink.jsx
var BrowserLink = __webpack_require__(176);

// EXTERNAL MODULE: ./renderer/src/components/Icon/index.jsx
var Icon = __webpack_require__(22);

// CONCATENATED MODULE: ./renderer/src/pages/PreviewLoading/App.jsx


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var App_PreviewLoading =
/*#__PURE__*/
function (_Component) {
  _inherits(PreviewLoading, _Component);

  function PreviewLoading(props) {
    var _this;

    _classCallCheck(this, PreviewLoading);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PreviewLoading).call(this, props));

    _this.changePageSize = function (type) {
      if (type !== _this.state.dervice) {
        _this.setState({
          dervice: type
        }, function () {
          var dervice = _this.state.dervice;

          if (dervice === 'mobile') {
            _this.enableDeviceEmulation({
              width: 375,
              height: 667
            });
          } else if (dervice === 'pad') {
            _this.enableDeviceEmulation({
              width: 768,
              height: 1024
            }, 0.75);
          } else {
            _this.disableDeviceEmulation();
          }
        });
      }
    };

    _this.handleDebugger = function () {
      var wc = _this.webview.getWebContents();

      wc.openDevTools();
    };

    _this.handleReload = function () {
      var wc = _this.webview.getWebContents();

      wc.reload();
    };

    var queryObject = query_string_default.a.parse(window.location.search);
    var isMobile = decodeURIComponent(queryObject.mobile) === 'true';
    _this.state = {
      dervice: isMobile ? 'mobile' : 'desktop'
    };
    return _this;
  }

  _createClass(PreviewLoading, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var queryObject = query_string_default.a.parse(window.location.search);
      var isMobile = decodeURIComponent(queryObject.mobile) === 'true';
      this.webviewLoaded = false;

      if (this.webview && isMobile) {
        this.webview.addEventListener('did-finish-load', function () {
          if (!_this2.webviewLoaded) {
            _this2.webviewLoaded = true;

            _this2.enableDeviceEmulation({
              width: 375,
              height: 667
            }, 1);
          }
        });
      }
    }
  }, {
    key: "disableDeviceEmulation",
    value: function disableDeviceEmulation() {
      var wc = this.webview.getWebContents();
      wc.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36');
      wc.disableDeviceEmulation();
      var isDebuggerAttached = wc.debugger.isAttached();

      if (isDebuggerAttached) {
        wc.debugger.detach();
      }

      wc.reload();
    }
  }, {
    key: "enableDeviceEmulation",
    value: function enableDeviceEmulation(size) {
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var wc = this.webview.getWebContents();
      wc.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
      wc.enableDeviceEmulation({
        screenPosition: 'mobile',
        deviceScaleFactor: 0,
        screenSize: size,
        viewSize: size,
        scale: scale,
        fitToView: true
      });
      var isDebuggerAttached = wc.debugger.isAttached();

      if (!isDebuggerAttached) {
        try {
          wc.debugger.attach();
        } catch (e) {}
      }

      wc.debugger.sendCommand('Emulation.setTouchEmulationEnabled', {
        enabled: true,
        configuration: 'mobile'
      });
      wc.reload();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var queryObject = query_string_default.a.parse(window.location.search);
      var hasIframeUrl = !!queryObject.iframeUrl;
      var iframeUrl = decodeURIComponent(queryObject.iframeUrl);
      return external_window_React_default.a.createElement(react_document_title_default.a, {
        title: hasIframeUrl ? '' : '预览启动中...'
      }, hasIframeUrl ? external_window_React_default.a.createElement("div", {
        className: classnames_default()({
          'previewer-wrapper': true,
          'previewer-wrapper-mobile': this.state.dervice === 'mobile',
          'previewer-wrapper-pad': this.state.dervice === 'pad',
          'previewer-wrapper-desktop': this.state.dervice === 'desktop'
        })
      }, external_window_React_default.a.createElement("div", {
        className: "previewer-header"
      }, external_window_React_default.a.createElement("div", {
        className: "previewer-switcher"
      }, external_window_React_default.a.createElement(es["default"], {
        placement: "bottomLeft",
        overlay: external_window_React_default.a.createElement("div", {
          style: {
            width: 200
          }
        }, external_window_React_default.a.createElement(lib_default.a, {
          size: 200,
          value: iframeUrl
        }), external_window_React_default.a.createElement("div", {
          style: {
            wordBreak: 'break-all'
          }
        }, external_window_React_default.a.createElement(BrowserLink["a" /* default */], {
          href: iframeUrl,
          target: "_blank"
        }, iframeUrl)))
      }, external_window_React_default.a.createElement("div", {
        className: "previewer-tools-item"
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        size: "large",
        type: "qr-code"
      })))), external_window_React_default.a.createElement("div", {
        className: "previewer-switcher"
      }, external_window_React_default.a.createElement("div", {
        className: "previewer-tools-item",
        onClick: this.changePageSize.bind(this, 'mobile')
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        size: "large",
        type: "mobile"
      })), external_window_React_default.a.createElement("div", {
        className: "previewer-tools-item",
        onClick: this.changePageSize.bind(this, 'pad')
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        size: "large",
        type: "ipad"
      })), external_window_React_default.a.createElement("div", {
        className: "previewer-tools-item",
        onClick: this.changePageSize.bind(this, 'desktop')
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        size: "large",
        type: "pc"
      }))), external_window_React_default.a.createElement("div", {
        className: "previewer-debugger"
      }, external_window_React_default.a.createElement("div", {
        className: "previewer-tools-item",
        onClick: this.handleReload
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        size: "large",
        type: "reload"
      })), external_window_React_default.a.createElement("div", {
        className: "previewer-tools-item",
        onClick: this.handleDebugger
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        size: "large",
        type: "debug"
      })))), external_window_React_default.a.createElement("div", {
        className: "previewer-body"
      }, external_window_React_default.a.createElement("webview", {
        ref: function ref(webview) {
          _this3.webview = webview;
        },
        src: iframeUrl,
        className: "previewer-content"
      }))) : external_window_React_default.a.createElement("div", {
        className: "loading-wrapper"
      }, external_window_React_default.a.createElement(loading_default.a, {
        shape: "fusion-reactor",
        size: "large",
        color: "#2077ff"
      }, external_window_React_default.a.createElement("div", {
        style: {
          width: 200,
          height: 60
        }
      })), external_window_React_default.a.createElement("div", {
        style: {
          paddingTop: 30
        }
      }, "\u6B63\u5728\u4E0B\u8F7D\u533A\u5757\u4F9D\u8D56\uFF0C\u8BF7\u7A0D\u7B49...")));
    }
  }]);

  return PreviewLoading;
}(external_window_React_["Component"]);

/* harmony default export */ var App = (App_PreviewLoading);
// CONCATENATED MODULE: ./renderer/src/pages/PreviewLoading/index.jsx




var container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

var PreviewLoading_render = function render(Component) {
  external_window_ReactDOM_default.a.render(external_window_React_default.a.createElement(Component, null), container);
};

PreviewLoading_render(App);

/***/ })

/******/ });