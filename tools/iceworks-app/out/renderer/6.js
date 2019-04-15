(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],Array(661).concat([
/* 661 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactCSS = exports.loop = exports.handleActive = exports.handleHover = exports.hover = undefined;

var _flattenNames = __webpack_require__(961);

var _flattenNames2 = _interopRequireDefault(_flattenNames);

var _mergeClasses = __webpack_require__(1032);

var _mergeClasses2 = _interopRequireDefault(_mergeClasses);

var _autoprefix = __webpack_require__(1052);

var _autoprefix2 = _interopRequireDefault(_autoprefix);

var _hover2 = __webpack_require__(1053);

var _hover3 = _interopRequireDefault(_hover2);

var _active = __webpack_require__(1054);

var _active2 = _interopRequireDefault(_active);

var _loop2 = __webpack_require__(1055);

var _loop3 = _interopRequireDefault(_loop2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.hover = _hover3.default;
exports.handleHover = _hover3.default;
exports.handleActive = _active2.default;
exports.loop = _loop3.default;
var ReactCSS = exports.ReactCSS = function ReactCSS(classes) {
  for (var _len = arguments.length, activations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    activations[_key - 1] = arguments[_key];
  }

  var activeNames = (0, _flattenNames2.default)(activations);
  var merged = (0, _mergeClasses2.default)(classes, activeNames);
  return (0, _autoprefix2.default)(merged);
};

exports.default = ReactCSS;

/***/ }),
/* 662 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Alpha = __webpack_require__(1056);

Object.defineProperty(exports, 'Alpha', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Alpha).default;
  }
});

var _Checkboard = __webpack_require__(790);

Object.defineProperty(exports, 'Checkboard', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Checkboard).default;
  }
});

var _EditableInput = __webpack_require__(1059);

Object.defineProperty(exports, 'EditableInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_EditableInput).default;
  }
});

var _Hue = __webpack_require__(1060);

Object.defineProperty(exports, 'Hue', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Hue).default;
  }
});

var _Raised = __webpack_require__(1062);

Object.defineProperty(exports, 'Raised', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Raised).default;
  }
});

var _Saturation = __webpack_require__(1076);

Object.defineProperty(exports, 'Saturation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Saturation).default;
  }
});

var _ColorWrap = __webpack_require__(851);

Object.defineProperty(exports, 'ColorWrap', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ColorWrap).default;
  }
});

var _Swatch = __webpack_require__(1083);

Object.defineProperty(exports, 'Swatch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Swatch).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 667 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(1063),
    createAssigner = __webpack_require__(1067);

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;


/***/ }),
/* 668 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 669 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(819);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 670 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.red = undefined;

var _each = __webpack_require__(1081);

var _each2 = _interopRequireDefault(_each);

var _tinycolor = __webpack_require__(312);

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  simpleCheckForValidColor: function simpleCheckForValidColor(data) {
    var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
    var checked = 0;
    var passed = 0;
    (0, _each2.default)(keysToCheck, function (letter) {
      if (data[letter]) {
        checked += 1;
        if (!isNaN(data[letter])) {
          passed += 1;
        }
        if (letter === 's' || letter === 'l') {
          var percentPatt = /^\d+%$/;
          if (percentPatt.test(data[letter])) {
            passed += 1;
          }
        }
      }
    });
    return checked === passed ? data : false;
  },
  toState: function toState(data, oldHue) {
    var color = data.hex ? (0, _tinycolor2.default)(data.hex) : (0, _tinycolor2.default)(data);
    var hsl = color.toHsl();
    var hsv = color.toHsv();
    var rgb = color.toRgb();
    var hex = color.toHex();
    if (hsl.s === 0) {
      hsl.h = oldHue || 0;
      hsv.h = oldHue || 0;
    }
    var transparent = hex === '000000' && rgb.a === 0;

    return {
      hsl: hsl,
      hex: transparent ? 'transparent' : '#' + hex,
      rgb: rgb,
      hsv: hsv,
      oldHue: data.h || oldHue || hsl.h,
      source: data.source
    };
  },
  isValidHex: function isValidHex(hex) {
    // disable hex4 and hex8
    var lh = String(hex).charAt(0) === '#' ? 1 : 0;
    return hex.length !== 4 + lh && hex.length < 7 + lh && (0, _tinycolor2.default)(hex).isValid();
  },
  getContrastingColor: function getContrastingColor(data) {
    if (!data) {
      return '#fff';
    }
    var col = this.toState(data);
    if (col.hex === 'transparent') {
      return 'rgba(0,0,0,0.4)';
    }
    var yiq = (col.rgb.r * 299 + col.rgb.g * 587 + col.rgb.b * 114) / 1000;
    return yiq >= 128 ? '#000' : '#fff';
  }
};
var red = exports.red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 }
};

/***/ }),
/* 671 */,
/* 672 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 673 */,
/* 674 */,
/* 675 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(826),
    baseIteratee = __webpack_require__(972),
    baseMap = __webpack_require__(1030),
    isArray = __webpack_require__(666);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;


/***/ }),
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(709),
    getRawTag = __webpack_require__(963),
    objectToString = __webpack_require__(964);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 682 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(985),
    getValue = __webpack_require__(988);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 683 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(683);
module.exports = __webpack_require__(744);

/***/ }),
/* 684 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var React = __webpack_require__(1);
var factory = __webpack_require__(1139);

if (typeof React === 'undefined') {
  throw Error(
    'create-react-class could not find the React object. If you are using script tags, ' +
      'make sure that React is being loaded before create-react-class.'
  );
}

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(818);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormError = exports.FormBinder = exports.FormBinderWrapper = undefined;

var _FormBinderWrapper = __webpack_require__(955);

var _FormBinderWrapper2 = _interopRequireDefault(_FormBinderWrapper);

var _FormBinder = __webpack_require__(956);

var _FormBinder2 = _interopRequireDefault(_FormBinder);

var _FormError = __webpack_require__(957);

var _FormError2 = _interopRequireDefault(_FormError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FormBinderWrapper2.default;
exports.FormBinderWrapper = _FormBinderWrapper2.default;
exports.FormBinder = _FormBinder2.default;
exports.FormError = _FormError2.default;

/***/ }),
/* 690 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(782),
    isLength = __webpack_require__(778);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 691 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(683);
__webpack_require__(683);
module.exports = __webpack_require__(747);

/***/ }),
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CreateForm = function CreateForm(WrappedComponent) {
  var _class, _temp;

  var Form = (_temp = _class = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
      _classCallCheck(this, Form);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props));

      _this.formChange = function (value) {
        _this.setState({
          value: value
        }, function () {
          _this.props.onChange(value);
        });
      };

      _this.handleColorChange = function (key, hex) {
        var value = _this.state.value;

        if (key === 'primary') {
          value.themeConfig.primaryColor = hex;
        } else {
          value.themeConfig.secondaryColor = hex;
        }

        _this.setState({
          value: value
        }, function () {
          _this.props.onChange(_this.state.value);
        });
      };

      _this.handlePresetColor = function (color) {
        var value = _this.state.value;

        value.themeConfig.primaryColor = color.primaryColor;
        value.themeConfig.secondaryColor = color.secondaryColor;

        _this.setState({
          value: value
        }, function () {
          _this.props.onChange(_this.state.value);
        });
      };

      _this.state = {
        value: props.value
      };
      return _this;
    }

    Form.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value
      });
    };

    /**
     * 表单改变时动态监听
     */


    Form.prototype.render = function render() {
      return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
        formChange: this.formChange,
        handleColorChange: this.handleColorChange,
        handlePresetColor: this.handlePresetColor
      }));
    };

    return Form;
  }(_react.Component), _class.displayName = 'Form', _temp);


  return Form;
};

exports.default = CreateForm;
module.exports = exports['default'];

/***/ }),
/* 709 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(669);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 710 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(822),
    baseKeys = __webpack_require__(970),
    isArrayLike = __webpack_require__(690);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 711 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 712 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(841),
    baseAssignValue = __webpack_require__(788);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(816);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewLayout = exports.AdvancedForm = exports.FooterForm = exports.AsideForm = exports.HeaderForm = exports.BasicForm = exports.LayoutBuilder = undefined;

var _BasicForm = __webpack_require__(817);

var _BasicForm2 = _interopRequireDefault(_BasicForm);

var _HeaderForm = __webpack_require__(853);

var _HeaderForm2 = _interopRequireDefault(_HeaderForm);

var _AsideForm = __webpack_require__(854);

var _AsideForm2 = _interopRequireDefault(_AsideForm);

var _FooterForm = __webpack_require__(855);

var _FooterForm2 = _interopRequireDefault(_FooterForm);

var _AdvancedForm = __webpack_require__(856);

var _AdvancedForm2 = _interopRequireDefault(_AdvancedForm);

var _LayoutBuilder = __webpack_require__(1127);

var _LayoutBuilder2 = _interopRequireDefault(_LayoutBuilder);

var _PreviewLayout = __webpack_require__(857);

var _PreviewLayout2 = _interopRequireDefault(_PreviewLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LayoutBuilder = _LayoutBuilder2.default;
exports.BasicForm = _BasicForm2.default;
exports.HeaderForm = _HeaderForm2.default;
exports.AsideForm = _AsideForm2.default;
exports.FooterForm = _FooterForm2.default;
exports.AdvancedForm = _AdvancedForm2.default;
exports.PreviewLayout = _PreviewLayout2.default;

/***/ }),
/* 726 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(669),
    stubFalse = __webpack_require__(968);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(727)(module)))

/***/ }),
/* 727 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 728 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 729 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(730),
    stackClear = __webpack_require__(980),
    stackDelete = __webpack_require__(981),
    stackGet = __webpack_require__(982),
    stackHas = __webpack_require__(983),
    stackSet = __webpack_require__(984);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 730 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(975),
    listCacheDelete = __webpack_require__(976),
    listCacheGet = __webpack_require__(977),
    listCacheHas = __webpack_require__(978),
    listCacheSet = __webpack_require__(979);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 731 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(711);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 732 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(682);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 733 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(997);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 734 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(1012),
    Map = __webpack_require__(784),
    Promise = __webpack_require__(1013),
    Set = __webpack_require__(1014),
    WeakMap = __webpack_require__(1015),
    baseGetTag = __webpack_require__(681),
    toSource = __webpack_require__(827);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 735 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(681),
    isObjectLike = __webpack_require__(672);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 736 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(735);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 737 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(822),
    baseKeysIn = __webpack_require__(1037),
    isArrayLike = __webpack_require__(690);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 738 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @ignore
 * some key-codes definition and utils from closure-library
 * @author yiminghe@gmail.com
 */

var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33, // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35, // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36, // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37, // also NUM_WEST
  /**
   * UP
   */
  UP: 38, // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39, // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40, // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45, // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46, // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63, // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91, // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186, // needs localization
  /**
   * DASH
   */
  DASH: 189, // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187, // needs localization
  /**
   * COMMA
   */
  COMMA: 188, // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190, // needs localization
  /**
   * SLASH
   */
  SLASH: 191, // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192, // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222, // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219, // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220, // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221, // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229
};

/*
 whether text and modified key is entered at the same time.
 */
KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
  var keyCode = e.keyCode;
  if (e.altKey && !e.ctrlKey || e.metaKey ||
  // Function keys don't generate text
  keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
    return false;
  }

  // The following keys are quite harmless, even in combination with
  // CTRL, ALT or SHIFT.
  switch (keyCode) {
    case KeyCode.ALT:
    case KeyCode.CAPS_LOCK:
    case KeyCode.CONTEXT_MENU:
    case KeyCode.CTRL:
    case KeyCode.DOWN:
    case KeyCode.END:
    case KeyCode.ESC:
    case KeyCode.HOME:
    case KeyCode.INSERT:
    case KeyCode.LEFT:
    case KeyCode.MAC_FF_META:
    case KeyCode.META:
    case KeyCode.NUMLOCK:
    case KeyCode.NUM_CENTER:
    case KeyCode.PAGE_DOWN:
    case KeyCode.PAGE_UP:
    case KeyCode.PAUSE:
    case KeyCode.PRINT_SCREEN:
    case KeyCode.RIGHT:
    case KeyCode.SHIFT:
    case KeyCode.UP:
    case KeyCode.WIN_KEY:
    case KeyCode.WIN_KEY_RIGHT:
      return false;
    default:
      return true;
  }
};

/*
 whether character is entered.
 */
KeyCode.isCharacterKey = function isCharacterKey(keyCode) {
  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
    return true;
  }

  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
    return true;
  }

  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
    return true;
  }

  // Safari sends zero key code for non-latin characters.
  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
    return true;
  }

  switch (keyCode) {
    case KeyCode.SPACE:
    case KeyCode.QUESTION_MARK:
    case KeyCode.NUM_PLUS:
    case KeyCode.NUM_MINUS:
    case KeyCode.NUM_PERIOD:
    case KeyCode.NUM_DIVISION:
    case KeyCode.SEMICOLON:
    case KeyCode.DASH:
    case KeyCode.EQUALS:
    case KeyCode.COMMA:
    case KeyCode.PERIOD:
    case KeyCode.SLASH:
    case KeyCode.APOSTROPHE:
    case KeyCode.SINGLE_QUOTE:
    case KeyCode.OPEN_SQUARE_BRACKET:
    case KeyCode.BACKSLASH:
    case KeyCode.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false;
  }
};

exports['default'] = KeyCode;
module.exports = exports['default'];

/***/ }),
/* 739 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.getKeyFromChildrenIndex = getKeyFromChildrenIndex;
exports.loopMenuItem = loopMenuItem;
exports.loopMenuItemRecusively = loopMenuItemRecusively;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {}

function getKeyFromChildrenIndex(child, menuEventKey, index) {
  var prefix = menuEventKey || '';
  return child.key || prefix + 'item_' + index;
}

function loopMenuItem(children, cb) {
  var index = -1;
  _react2['default'].Children.forEach(children, function (c) {
    index++;
    if (c && c.type && c.type.isMenuItemGroup) {
      _react2['default'].Children.forEach(c.props.children, function (c2) {
        index++;
        cb(c2, index);
      });
    } else {
      cb(c, index);
    }
  });
}

function loopMenuItemRecusively(children, keys, ret) {
  if (!children || ret.find) {
    return;
  }
  _react2['default'].Children.forEach(children, function (c) {
    if (ret.find) {
      return;
    }
    if (c) {
      var construt = c.type;
      if (!construt || !(construt.isSubMenu || construt.isMenuItem || construt.isMenuItemGroup)) {
        return;
      }
      if (keys.indexOf(c.key) !== -1) {
        ret.find = true;
      } else if (c.props.children) {
        loopMenuItemRecusively(c.props.children, keys, ret);
      }
    }
  });
}

/***/ }),
/* 740 */,
/* 741 */,
/* 742 */,
/* 743 */,
/* 744 */,
/* 745 */,
/* 746 */,
/* 747 */,
/* 748 */,
/* 749 */,
/* 750 */,
/* 751 */,
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */,
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */,
/* 764 */,
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */,
/* 769 */,
/* 770 */,
/* 771 */,
/* 772 */,
/* 773 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(950);


/***/ }),
/* 774 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(820),
    castFunction = __webpack_require__(824);

/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forOwn(object, iteratee) {
  return object && baseForOwn(object, castFunction(iteratee));
}

module.exports = forOwn;


/***/ }),
/* 775 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(967),
    isObjectLike = __webpack_require__(672);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 776 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 777 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(969),
    baseUnary = __webpack_require__(779),
    nodeUtil = __webpack_require__(780);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 778 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 779 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 780 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(819);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(727)(module)))

/***/ }),
/* 781 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 782 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(681),
    isObject = __webpack_require__(668);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 783 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(823);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 784 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(682),
    root = __webpack_require__(669);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 785 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(989),
    mapCacheDelete = __webpack_require__(996),
    mapCacheGet = __webpack_require__(998),
    mapCacheHas = __webpack_require__(999),
    mapCacheSet = __webpack_require__(1000);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 786 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(1011),
    stubArray = __webpack_require__(834);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 787 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(666),
    isSymbol = __webpack_require__(735);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 788 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(842);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 789 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(830);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 790 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkboard = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _checkboard = __webpack_require__(1058);

var checkboard = _interopRequireWildcard(_checkboard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkboard = exports.Checkboard = function Checkboard(_ref) {
  var white = _ref.white,
      grey = _ref.grey,
      size = _ref.size,
      renderers = _ref.renderers,
      borderRadius = _ref.borderRadius,
      boxShadow = _ref.boxShadow;

  var styles = (0, _reactcss2.default)({
    'default': {
      grid: {
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        absolute: '0px 0px 0px 0px',
        background: 'url(' + checkboard.get(white, grey, size, renderers.canvas) + ') center left'
      }
    }
  });

  return _react2.default.createElement('div', { style: styles.grid });
};

Checkboard.defaultProps = {
  size: 8,
  white: 'transparent',
  grey: 'rgba(0,0,0,.08)',
  renderers: {}
};

exports.default = Checkboard;

/***/ }),
/* 791 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Icon = __webpack_require__(1125);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Icon2.default;
module.exports = exports['default'];

/***/ }),
/* 792 */,
/* 793 */,
/* 794 */,
/* 795 */,
/* 796 */,
/* 797 */,
/* 798 */,
/* 799 */,
/* 800 */,
/* 801 */,
/* 802 */,
/* 803 */,
/* 804 */,
/* 805 */,
/* 806 */,
/* 807 */,
/* 808 */,
/* 809 */,
/* 810 */,
/* 811 */,
/* 812 */,
/* 813 */,
/* 814 */,
/* 815 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var toString = Object.prototype.toString;

var isBuffer = typeof Buffer !== 'undefined' ? function isBuffer(obj) {
  return Buffer.isBuffer(obj);
} : function isBuffer() {
  // always return false in browsers
  return false;
};

var getKeys = typeof Object.keys === 'function' ? function getKeys(obj) {
  return Object.keys(obj);
} : function getKeys(obj) {
  var objType = typeof obj;

  if (obj === null || objType !== 'function' && objType !== 'object') {
    throw new TypeError('obj must be an Object');
  }

  var resultKeys = [],
      key = void 0;

  for (key in obj) {
    Object.prototype.hasOwnProperty.call(obj, key) && resultKeys.push(key);
  }

  return resultKeys;
};

var getSymbols = typeof Symbol === 'function' ? function getSymbols(obj) {
  return Object.getOwnPropertySymbols(obj);
} : function getSymbols() {
  // always return empty Array when Symbol is not supported
  return [];
};

// NOTE:
//
//   Array.prototype.indexOf is cannot find NaN (in Chrome)
//   Array.prototype.includes is can find NaN (in Chrome)
//
//   this function can find NaN, because use SameValue algorithm
function indexOf(array, s) {
  if (toString.call(array) !== '[object Array]') {
    throw new TypeError('array must be an Array');
  }

  var i = void 0,
      len = void 0,
      value = void 0;

  for (i = 0, len = array.length; i < len; ++i) {
    value = array[i];

    // NOTE:
    //
    //   it is SameValue algorithm
    //   http://stackoverflow.com/questions/27144277/comparing-a-variable-with-itself
    //
    // eslint-disable-next-line no-self-compare
    if (value === s || value !== value && s !== s) {
      return i;
    }
  }

  return -1;
}

exports.getKeys = getKeys;
exports.getSymbols = getSymbols;
exports.indexOf = indexOf;
exports.isBuffer = isBuffer;

/***/ }),
/* 816 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(816);

      // 组件依赖样式
      

      // 组件自身样式
      __webpack_require__(952);
    

/***/ }),
/* 817 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BasicForm = __webpack_require__(953);

var _BasicForm2 = _interopRequireDefault(_BasicForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _BasicForm2.default;
module.exports = exports['default'];

/***/ }),
/* 818 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(818);
// 组件依赖样式


// 组件自身样式
__webpack_require__(954);


/***/ }),
/* 819 */
/***/ (function(module, exports) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ }),
/* 820 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(821),
    keys = __webpack_require__(710);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),
/* 821 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(965);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 822 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(966),
    isArguments = __webpack_require__(775),
    isArray = __webpack_require__(666),
    isBuffer = __webpack_require__(726),
    isIndex = __webpack_require__(776),
    isTypedArray = __webpack_require__(777);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 823 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 824 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(728);

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),
/* 825 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(681),
    getPrototype = __webpack_require__(783),
    isObjectLike = __webpack_require__(672);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 826 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 827 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 828 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(1001),
    isObjectLike = __webpack_require__(672);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 829 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(1002),
    arraySome = __webpack_require__(1005),
    cacheHas = __webpack_require__(1006);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 830 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(669);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 831 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(832),
    getSymbols = __webpack_require__(786),
    keys = __webpack_require__(710);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 832 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(833),
    isArray = __webpack_require__(666);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 833 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 834 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 835 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(668);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),
/* 836 */
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),
/* 837 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(838),
    toKey = __webpack_require__(736);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 838 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(666),
    isKey = __webpack_require__(787),
    stringToPath = __webpack_require__(1019),
    toString = __webpack_require__(1022);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 839 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(820),
    createBaseEach = __webpack_require__(1031);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),
/* 840 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 841 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(788),
    eq = __webpack_require__(711);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 842 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(682);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 843 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(669);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(727)(module)))

/***/ }),
/* 844 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 845 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(833),
    getPrototype = __webpack_require__(783),
    getSymbols = __webpack_require__(786),
    stubArray = __webpack_require__(834);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),
/* 846 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(789);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 847 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(1047),
    getPrototype = __webpack_require__(783),
    isPrototype = __webpack_require__(781);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 848 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(788),
    eq = __webpack_require__(711);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),
/* 849 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key`, unless `key` is "__proto__".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;


/***/ }),
/* 850 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(668),
    now = __webpack_require__(1078),
    toNumber = __webpack_require__(1079);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 851 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorWrap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _debounce = __webpack_require__(850);

var _debounce2 = _interopRequireDefault(_debounce);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorWrap = exports.ColorWrap = function ColorWrap(Picker) {
  var ColorPicker = function (_ref) {
    _inherits(ColorPicker, _ref);

    function ColorPicker(props) {
      _classCallCheck(this, ColorPicker);

      var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this));

      _this.handleChange = function (data, event) {
        var isValidColor = _color2.default.simpleCheckForValidColor(data);
        if (isValidColor) {
          var colors = _color2.default.toState(data, data.h || _this.state.oldHue);
          _this.setState(colors);
          _this.props.onChangeComplete && _this.debounce(_this.props.onChangeComplete, colors, event);
          _this.props.onChange && _this.props.onChange(colors, event);
        }
      };

      _this.handleSwatchHover = function (data, event) {
        var isValidColor = _color2.default.simpleCheckForValidColor(data);
        if (isValidColor) {
          var colors = _color2.default.toState(data, data.h || _this.state.oldHue);
          _this.setState(colors);
          _this.props.onSwatchHover && _this.props.onSwatchHover(colors, event);
        }
      };

      _this.state = _extends({}, _color2.default.toState(props.color, 0));

      _this.debounce = (0, _debounce2.default)(function (fn, data, event) {
        fn(data, event);
      }, 100);
      return _this;
    }

    _createClass(ColorPicker, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState(_extends({}, _color2.default.toState(nextProps.color, this.state.oldHue)));
      }
    }, {
      key: 'render',
      value: function render() {
        var optionalEvents = {};
        if (this.props.onSwatchHover) {
          optionalEvents.onSwatchHover = this.handleSwatchHover;
        }

        return _react2.default.createElement(Picker, _extends({}, this.props, this.state, {
          onChange: this.handleChange
        }, optionalEvents));
      }
    }]);

    return ColorPicker;
  }(_react.PureComponent || _react.Component);

  ColorPicker.propTypes = _extends({}, Picker.propTypes);

  ColorPicker.defaultProps = _extends({}, Picker.defaultProps, {
    color: {
      h: 250,
      s: 0.50,
      l: 0.20,
      a: 1
    }
  });

  return ColorPicker;
};

exports.default = ColorWrap;

/***/ }),
/* 852 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "red", function() { return red; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pink", function() { return pink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purple", function() { return purple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepPurple", function() { return deepPurple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indigo", function() { return indigo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blue", function() { return blue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightBlue", function() { return lightBlue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cyan", function() { return cyan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "teal", function() { return teal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "green", function() { return green; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightGreen", function() { return lightGreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lime", function() { return lime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yellow", function() { return yellow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "amber", function() { return amber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orange", function() { return orange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepOrange", function() { return deepOrange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brown", function() { return brown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grey", function() { return grey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blueGrey", function() { return blueGrey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkText", function() { return darkText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightText", function() { return lightText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkIcons", function() { return darkIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightIcons", function() { return lightIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "white", function() { return white; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "black", function() { return black; });
var red = {"50":"#ffebee","100":"#ffcdd2","200":"#ef9a9a","300":"#e57373","400":"#ef5350","500":"#f44336","600":"#e53935","700":"#d32f2f","800":"#c62828","900":"#b71c1c","a100":"#ff8a80","a200":"#ff5252","a400":"#ff1744","a700":"#d50000"};
var pink = {"50":"#fce4ec","100":"#f8bbd0","200":"#f48fb1","300":"#f06292","400":"#ec407a","500":"#e91e63","600":"#d81b60","700":"#c2185b","800":"#ad1457","900":"#880e4f","a100":"#ff80ab","a200":"#ff4081","a400":"#f50057","a700":"#c51162"};
var purple = {"50":"#f3e5f5","100":"#e1bee7","200":"#ce93d8","300":"#ba68c8","400":"#ab47bc","500":"#9c27b0","600":"#8e24aa","700":"#7b1fa2","800":"#6a1b9a","900":"#4a148c","a100":"#ea80fc","a200":"#e040fb","a400":"#d500f9","a700":"#aa00ff"};
var deepPurple = {"50":"#ede7f6","100":"#d1c4e9","200":"#b39ddb","300":"#9575cd","400":"#7e57c2","500":"#673ab7","600":"#5e35b1","700":"#512da8","800":"#4527a0","900":"#311b92","a100":"#b388ff","a200":"#7c4dff","a400":"#651fff","a700":"#6200ea"};
var indigo = {"50":"#e8eaf6","100":"#c5cae9","200":"#9fa8da","300":"#7986cb","400":"#5c6bc0","500":"#3f51b5","600":"#3949ab","700":"#303f9f","800":"#283593","900":"#1a237e","a100":"#8c9eff","a200":"#536dfe","a400":"#3d5afe","a700":"#304ffe"};
var blue = {"50":"#e3f2fd","100":"#bbdefb","200":"#90caf9","300":"#64b5f6","400":"#42a5f5","500":"#2196f3","600":"#1e88e5","700":"#1976d2","800":"#1565c0","900":"#0d47a1","a100":"#82b1ff","a200":"#448aff","a400":"#2979ff","a700":"#2962ff"};
var lightBlue = {"50":"#e1f5fe","100":"#b3e5fc","200":"#81d4fa","300":"#4fc3f7","400":"#29b6f6","500":"#03a9f4","600":"#039be5","700":"#0288d1","800":"#0277bd","900":"#01579b","a100":"#80d8ff","a200":"#40c4ff","a400":"#00b0ff","a700":"#0091ea"};
var cyan = {"50":"#e0f7fa","100":"#b2ebf2","200":"#80deea","300":"#4dd0e1","400":"#26c6da","500":"#00bcd4","600":"#00acc1","700":"#0097a7","800":"#00838f","900":"#006064","a100":"#84ffff","a200":"#18ffff","a400":"#00e5ff","a700":"#00b8d4"};
var teal = {"50":"#e0f2f1","100":"#b2dfdb","200":"#80cbc4","300":"#4db6ac","400":"#26a69a","500":"#009688","600":"#00897b","700":"#00796b","800":"#00695c","900":"#004d40","a100":"#a7ffeb","a200":"#64ffda","a400":"#1de9b6","a700":"#00bfa5"};
var green = {"50":"#e8f5e9","100":"#c8e6c9","200":"#a5d6a7","300":"#81c784","400":"#66bb6a","500":"#4caf50","600":"#43a047","700":"#388e3c","800":"#2e7d32","900":"#1b5e20","a100":"#b9f6ca","a200":"#69f0ae","a400":"#00e676","a700":"#00c853"};
var lightGreen = {"50":"#f1f8e9","100":"#dcedc8","200":"#c5e1a5","300":"#aed581","400":"#9ccc65","500":"#8bc34a","600":"#7cb342","700":"#689f38","800":"#558b2f","900":"#33691e","a100":"#ccff90","a200":"#b2ff59","a400":"#76ff03","a700":"#64dd17"};
var lime = {"50":"#f9fbe7","100":"#f0f4c3","200":"#e6ee9c","300":"#dce775","400":"#d4e157","500":"#cddc39","600":"#c0ca33","700":"#afb42b","800":"#9e9d24","900":"#827717","a100":"#f4ff81","a200":"#eeff41","a400":"#c6ff00","a700":"#aeea00"};
var yellow = {"50":"#fffde7","100":"#fff9c4","200":"#fff59d","300":"#fff176","400":"#ffee58","500":"#ffeb3b","600":"#fdd835","700":"#fbc02d","800":"#f9a825","900":"#f57f17","a100":"#ffff8d","a200":"#ffff00","a400":"#ffea00","a700":"#ffd600"};
var amber = {"50":"#fff8e1","100":"#ffecb3","200":"#ffe082","300":"#ffd54f","400":"#ffca28","500":"#ffc107","600":"#ffb300","700":"#ffa000","800":"#ff8f00","900":"#ff6f00","a100":"#ffe57f","a200":"#ffd740","a400":"#ffc400","a700":"#ffab00"};
var orange = {"50":"#fff3e0","100":"#ffe0b2","200":"#ffcc80","300":"#ffb74d","400":"#ffa726","500":"#ff9800","600":"#fb8c00","700":"#f57c00","800":"#ef6c00","900":"#e65100","a100":"#ffd180","a200":"#ffab40","a400":"#ff9100","a700":"#ff6d00"};
var deepOrange = {"50":"#fbe9e7","100":"#ffccbc","200":"#ffab91","300":"#ff8a65","400":"#ff7043","500":"#ff5722","600":"#f4511e","700":"#e64a19","800":"#d84315","900":"#bf360c","a100":"#ff9e80","a200":"#ff6e40","a400":"#ff3d00","a700":"#dd2c00"};
var brown = {"50":"#efebe9","100":"#d7ccc8","200":"#bcaaa4","300":"#a1887f","400":"#8d6e63","500":"#795548","600":"#6d4c41","700":"#5d4037","800":"#4e342e","900":"#3e2723"};
var grey = {"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121"};
var blueGrey = {"50":"#eceff1","100":"#cfd8dc","200":"#b0bec5","300":"#90a4ae","400":"#78909c","500":"#607d8b","600":"#546e7a","700":"#455a64","800":"#37474f","900":"#263238"};
var darkText = {"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","dividers":"rgba(0, 0, 0, 0.12)"};
var lightText = {"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","dividers":"rgba(255, 255, 255, 0.12)"};
var darkIcons = {"active":"rgba(0, 0, 0, 0.54)","inactive":"rgba(0, 0, 0, 0.38)"};
var lightIcons = {"active":"rgba(255, 255, 255, 1)","inactive":"rgba(255, 255, 255, 0.5)"};
var white = "#ffffff";
var black = "#000000";

/* harmony default export */ __webpack_exports__["default"] = ({
  red: red,
  pink: pink,
  purple: purple,
  deepPurple: deepPurple,
  indigo: indigo,
  blue: blue,
  lightBlue: lightBlue,
  cyan: cyan,
  teal: teal,
  green: green,
  lightGreen: lightGreen,
  lime: lime,
  yellow: yellow,
  amber: amber,
  orange: orange,
  deepOrange: deepOrange,
  brown: brown,
  grey: grey,
  blueGrey: blueGrey,
  darkText: darkText,
  lightText: lightText,
  darkIcons: darkIcons,
  lightIcons: lightIcons,
  white: white,
  black: black
});


/***/ }),
/* 853 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HeaderForm = __webpack_require__(1121);

var _HeaderForm2 = _interopRequireDefault(_HeaderForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _HeaderForm2.default;
module.exports = exports['default'];

/***/ }),
/* 854 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AsideForm = __webpack_require__(1122);

var _AsideForm2 = _interopRequireDefault(_AsideForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AsideForm2.default;
module.exports = exports['default'];

/***/ }),
/* 855 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FooterForm = __webpack_require__(1123);

var _FooterForm2 = _interopRequireDefault(_FooterForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FooterForm2.default;
module.exports = exports['default'];

/***/ }),
/* 856 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdvancedForm = __webpack_require__(1124);

var _AdvancedForm2 = _interopRequireDefault(_AdvancedForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AdvancedForm2.default;
module.exports = exports['default'];

/***/ }),
/* 857 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PreviewLayout = __webpack_require__(1129);

var _PreviewLayout2 = _interopRequireDefault(_PreviewLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PreviewLayout2.default;
module.exports = exports['default'];

/***/ }),
/* 858 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(858);
// 组件依赖样式


// 组件自身样式
__webpack_require__(1133);


/***/ }),
/* 859 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var aliCDNCropSuffix = ['16x16', '20x20', '24x24', '30x30', '36x36', '40x40', '48x48', '50x50', '60x30', '60x60', '60x90', '70x70', '70x1000', '72x72', '75x75', '75x100', '80x40', '80x60', '80x65', '81x65', '80x1000', '88x88', '90x45', '90x60', '90x90', '90x135', '96x54', '100x50', '100x75', '100x100', '100x150', '100x1000', '110x90', '110x110', '110x10000', '115x100', '120x0', '120x60', '120x97', '120x90', '120x160', '121x75', '125x125', '128x128', '130x130', '135x240', '140x70', '140x100', '140x140', '140x10000', '142x142', '145x145', '150x150', '150x200', '150x10000', '157x280', '160x0', '160x80', '160x90', '160x130', '160x180', '160x240', '165x5000', '170x170', '170x10000', '170x120', '180x90', '180x180', '180x230', '190x43', '190x190', '196x196', '200x0', '200x100', '200x200', '200x162', '210x140', '210x210', '210x1000', '220x178', '220x220', '220x330', '220x5000', '220x10000', '240x5000', '230x87', '230x230', '230x10000', '234x234', '240x180', '240x195', '240x240', '240x5000', '240x10000', '250x225', '250x250', '260x212', '260x260', '264x100', '270x0', '320x0', '270x180', '270x270', '270x450', '280x192', '280x410', '284x284', '288x480', '290x290', '290x10000', '292x292', '294x430', '300x1000', '300x10000', '310x310', '312x312', '300x300', '315x315', '320x260', '320x320', '320x480', '320x5000', '336x336', '350x350', '350x1000', '354x354', '360x234', '360x360', '360x10000', '375x280', '375x375', '400x152', '400x200', '400x400', '420x280', '430x430', '438x438', '440x440', '450x300', '450x600', '450x5000', '450x10000', '460x460', '468x468', '480x0', '480x420', '480x480', '485x175', '490x330', '490x490', '500x375', '500x450', '500x500', '500x1000', '540x540', '560x370', '560x560', '560x840', '568x568', '570x570', '570x10000', '580x580', '580x10000', '600x600', '600x800', '620x10000', '640x0', '640x360', '640x480', '640x640', '660x440', '667x667', '670x670', '720x720', '728x728', '750x388', '750x1000', '760x760', '790x420', '790x10000', '800x0', '800x800', '960x960', '970x970', '1080x0', '1080x1800', '1136x1136', '1152x1920', '1200x1200', '1280x0', '1280x960', '1280x1280', '2200x2200', '10000x220', '10000x340', '10000x170', '10000x500'];

function getBestMatchSize(width, height) {
  var currentDevicePixelRatio = parseInt(window.devicePixelRatio, 10) || 1;
  var matches = aliCDNCropSuffix.filter(function (item) {
    var splited = item.split('x');
    var itemWidth = parseInt(splited[0], 10);
    var itemHeight = parseInt(splited[1], 10);
    // for retina
    return itemWidth >= width * currentDevicePixelRatio && itemHeight >= height * currentDevicePixelRatio;
  });

  return matches[0] || '';
}

exports.default = function (_ref) {
  var width = _ref.width,
      height = _ref.height,
      _ref$quality = _ref.quality,
      quality = _ref$quality === undefined ? 90 : _ref$quality;

  width = parseFloat(width);
  height = parseFloat(height);
  // prevent string value cause error
  if (!width || !height) {
    return '';
  }

  var suffix = getBestMatchSize(width, height);

  return suffix ? '_' + suffix + 'q' + quality + '.jpg' : '';
};

/***/ }),
/* 860 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(861);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGroup = exports.SubMenu = exports.Item = exports.Divider = undefined;

var _rcMenu = __webpack_require__(862);

var _Menu = __webpack_require__(1155);

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Menu2.default.Divider = _rcMenu.Divider;
_Menu2.default.Item = _rcMenu.Item;
_Menu2.default.SubMenu = _rcMenu.SubMenu;
_Menu2.default.ItemGroup = _rcMenu.ItemGroup;

exports.default = _Menu2.default;
exports.Divider = _rcMenu.Divider;
exports.Item = _rcMenu.Item;
exports.SubMenu = _rcMenu.SubMenu;
exports.ItemGroup = _rcMenu.ItemGroup;

/***/ }),
/* 861 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(861);
// 组件依赖样式


// 组件自身样式
__webpack_require__(1137);


/***/ }),
/* 862 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divider = exports.ItemGroup = exports.MenuItemGroup = exports.MenuItem = exports.Item = exports.SubMenu = undefined;

var _Menu = __webpack_require__(1138);

var _Menu2 = _interopRequireDefault(_Menu);

var _SubMenu = __webpack_require__(1147);

var _SubMenu2 = _interopRequireDefault(_SubMenu);

var _MenuItem = __webpack_require__(1152);

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuItemGroup = __webpack_require__(1153);

var _MenuItemGroup2 = _interopRequireDefault(_MenuItemGroup);

var _Divider = __webpack_require__(1154);

var _Divider2 = _interopRequireDefault(_Divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.SubMenu = _SubMenu2['default'];
exports.Item = _MenuItem2['default'];
exports.MenuItem = _MenuItem2['default'];
exports.MenuItemGroup = _MenuItemGroup2['default'];
exports.ItemGroup = _MenuItemGroup2['default'];
exports.Divider = _Divider2['default'];
exports['default'] = _Menu2['default'];

/***/ }),
/* 863 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(48);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _KeyCode = __webpack_require__(738);

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _createChainedFunction = __webpack_require__(1142);

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _domScrollIntoView = __webpack_require__(1143);

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _util = __webpack_require__(739);

var _DOMWrap = __webpack_require__(1146);

var _DOMWrap2 = _interopRequireDefault(_DOMWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function allDisabled(arr) {
  if (!arr.length) {
    return true;
  }
  return arr.every(function (c) {
    return !!c.props.disabled;
  });
}

function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var children = props.children,
      eventKey = props.eventKey;

  if (activeKey) {
    var found = void 0;
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (c && !c.props.disabled && activeKey === (0, _util.getKeyFromChildrenIndex)(c, eventKey, i)) {
        found = true;
      }
    });
    if (found) {
      return activeKey;
    }
  }
  activeKey = null;
  if (props.defaultActiveFirst) {
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = (0, _util.getKeyFromChildrenIndex)(c, eventKey, i);
      }
    });
    return activeKey;
  }
  return activeKey;
}

function saveRef(index, subIndex, c) {
  if (c) {
    if (subIndex !== undefined) {
      this.instanceArray[index] = this.instanceArray[index] || [];
      this.instanceArray[index][subIndex] = c;
    } else {
      this.instanceArray[index] = c;
    }
  }
}

var MenuMixin = {
  propTypes: {
    focusable: _propTypes2['default'].bool,
    multiple: _propTypes2['default'].bool,
    style: _propTypes2['default'].object,
    defaultActiveFirst: _propTypes2['default'].bool,
    visible: _propTypes2['default'].bool,
    activeKey: _propTypes2['default'].string,
    selectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    defaultSelectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    defaultOpenKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    openKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    children: _propTypes2['default'].any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-menu',
      className: '',
      mode: 'vertical',
      level: 1,
      inlineIndent: 24,
      visible: true,
      focusable: true,
      style: {}
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    return {
      activeKey: getActiveKey(props, props.activeKey)
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var props = void 0;
    if ('activeKey' in nextProps) {
      props = {
        activeKey: getActiveKey(nextProps, nextProps.activeKey)
      };
    } else {
      var originalActiveKey = this.state.activeKey;
      var activeKey = getActiveKey(nextProps, originalActiveKey);
      // fix: this.setState(), parent.render(),
      if (activeKey !== originalActiveKey) {
        props = {
          activeKey: activeKey
        };
      }
    }
    if (props) {
      this.setState(props);
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },
  componentWillMount: function componentWillMount() {
    this.instanceArray = [];
  },


  // all keyboard events callbacks run from here at first
  onKeyDown: function onKeyDown(e, callback) {
    var _this = this;

    var keyCode = e.keyCode;
    var handled = void 0;
    this.getFlatInstanceArray().forEach(function (obj) {
      if (obj && obj.props.active) {
        handled = obj.onKeyDown(e);
      }
    });
    if (handled) {
      return 1;
    }
    var activeItem = null;
    if (keyCode === _KeyCode2['default'].UP || keyCode === _KeyCode2['default'].DOWN) {
      activeItem = this.step(keyCode === _KeyCode2['default'].UP ? -1 : 1);
    }
    if (activeItem) {
      e.preventDefault();
      this.setState({
        activeKey: activeItem.props.eventKey
      }, function () {
        (0, _domScrollIntoView2['default'])(_reactDom2['default'].findDOMNode(activeItem), _reactDom2['default'].findDOMNode(_this), {
          onlyScrollIfNeeded: true
        });
        if (callback) {
          callback(activeItem);
        }
      });
      return 1;
    } else if (activeItem === undefined) {
      e.preventDefault();
      this.setState({
        activeKey: null
      });
      return 1;
    }
  },
  getOpenChangesOnItemHover: function getOpenChangesOnItemHover(e) {
    var mode = this.props.mode;
    var key = e.key,
        hover = e.hover,
        trigger = e.trigger;

    var activeKey = this.state.activeKey;
    if (!trigger || hover || this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
      this.setState({
        activeKey: hover ? key : null
      });
    } else {}
    // keep active for sub menu for click active
    // empty

    // clear last open status
    if (hover && mode !== 'inline') {
      var activeItem = this.getFlatInstanceArray().filter(function (c) {
        return c && c.props.eventKey === activeKey;
      })[0];
      if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
        return {
          item: activeItem,
          originalEvent: e,
          key: activeItem.props.eventKey,
          open: false
        };
      }
    }
    return [];
  },
  getFlatInstanceArray: function getFlatInstanceArray() {
    var instanceArray = this.instanceArray;
    var hasInnerArray = instanceArray.some(function (a) {
      return Array.isArray(a);
    });
    if (hasInnerArray) {
      instanceArray = [];
      this.instanceArray.forEach(function (a) {
        if (Array.isArray(a)) {
          instanceArray.push.apply(instanceArray, a);
        } else {
          instanceArray.push(a);
        }
      });
      this.instanceArray = instanceArray;
    }
    return instanceArray;
  },
  renderCommonMenuItem: function renderCommonMenuItem(child, i, subIndex, extraProps) {
    var state = this.state;
    var props = this.props;
    var key = (0, _util.getKeyFromChildrenIndex)(child, props.eventKey, i);
    var childProps = child.props;
    var isActive = key === state.activeKey;
    var newChildProps = (0, _extends3['default'])({
      mode: props.mode,
      level: props.level,
      inlineIndent: props.inlineIndent,
      renderMenuItem: this.renderMenuItem,
      rootPrefixCls: props.prefixCls,
      index: i,
      parentMenu: this,
      ref: childProps.disabled ? undefined : (0, _createChainedFunction2['default'])(child.ref, saveRef.bind(this, i, subIndex)),
      eventKey: key,
      closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
      onItemHover: this.onItemHover,
      active: !childProps.disabled && isActive,
      multiple: props.multiple,
      onClick: this.onClick,
      openTransitionName: this.getOpenTransitionName(),
      openAnimation: props.openAnimation,
      onOpenChange: this.onOpenChange,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      onSelect: this.onSelect
    }, extraProps);
    if (props.mode === 'inline') {
      newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
    }
    return _react2['default'].cloneElement(child, newChildProps);
  },
  renderRoot: function renderRoot(props) {
    var _classes;

    this.instanceArray = [];
    var classes = (_classes = {}, (0, _defineProperty3['default'])(_classes, props.prefixCls, 1), (0, _defineProperty3['default'])(_classes, props.prefixCls + '-' + props.mode, 1), (0, _defineProperty3['default'])(_classes, props.className, !!props.className), _classes);
    var domProps = {
      className: (0, _classnames2['default'])(classes),
      role: 'menu',
      'aria-activedescendant': ''
    };
    if (props.id) {
      domProps.id = props.id;
    }
    if (props.focusable) {
      domProps.tabIndex = '0';
      domProps.onKeyDown = this.onKeyDown;
    }
    return (
      // ESLint is not smart enough to know that the type of `children` was checked.
      /* eslint-disable */
      _react2['default'].createElement(
        _DOMWrap2['default'],
        (0, _extends3['default'])({
          style: props.style,
          tag: 'ul',
          hiddenClassName: props.prefixCls + '-hidden',
          visible: props.visible
        }, domProps),
        _react2['default'].Children.map(props.children, this.renderMenuItem)
      )
      /*eslint-enable */

    );
  },
  step: function step(direction) {
    var children = this.getFlatInstanceArray();
    var activeKey = this.state.activeKey;
    var len = children.length;
    if (!len) {
      return null;
    }
    if (direction < 0) {
      children = children.concat().reverse();
    }
    // find current activeIndex
    var activeIndex = -1;
    children.every(function (c, ci) {
      if (c && c.props.eventKey === activeKey) {
        activeIndex = ci;
        return false;
      }
      return true;
    });
    if (!this.props.defaultActiveFirst && activeIndex !== -1) {
      if (allDisabled(children.slice(activeIndex, len - 1))) {
        return undefined;
      }
    }
    var start = (activeIndex + 1) % len;
    var i = start;
    for (;;) {
      var child = children[i];
      if (!child || child.props.disabled) {
        i = (i + 1 + len) % len;
        // complete a loop
        if (i === start) {
          return null;
        }
      } else {
        return child;
      }
    }
  }
};

exports['default'] = MenuMixin;
module.exports = exports['default'];

/***/ }),
/* 864 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(864);
// 组件依赖样式


// 组件自身样式
__webpack_require__(1157);


/***/ }),
/* 865 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Logo = __webpack_require__(1160);

var _Logo2 = _interopRequireDefault(_Logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Logo2.default;
module.exports = exports['default'];

/***/ }),
/* 866 */,
/* 867 */,
/* 868 */,
/* 869 */,
/* 870 */,
/* 871 */,
/* 872 */,
/* 873 */,
/* 874 */,
/* 875 */,
/* 876 */,
/* 877 */,
/* 878 */,
/* 879 */,
/* 880 */,
/* 881 */,
/* 882 */,
/* 883 */,
/* 884 */,
/* 885 */,
/* 886 */,
/* 887 */,
/* 888 */,
/* 889 */,
/* 890 */,
/* 891 */,
/* 892 */,
/* 893 */,
/* 894 */,
/* 895 */,
/* 896 */,
/* 897 */,
/* 898 */,
/* 899 */,
/* 900 */,
/* 901 */,
/* 902 */,
/* 903 */,
/* 904 */,
/* 905 */,
/* 906 */,
/* 907 */,
/* 908 */,
/* 909 */,
/* 910 */,
/* 911 */,
/* 912 */,
/* 913 */,
/* 914 */,
/* 915 */,
/* 916 */,
/* 917 */,
/* 918 */,
/* 919 */,
/* 920 */,
/* 921 */,
/* 922 */,
/* 923 */,
/* 924 */,
/* 925 */,
/* 926 */,
/* 927 */,
/* 928 */,
/* 929 */,
/* 930 */,
/* 931 */,
/* 932 */,
/* 933 */,
/* 934 */,
/* 935 */,
/* 936 */,
/* 937 */,
/* 938 */,
/* 939 */,
/* 940 */,
/* 941 */,
/* 942 */,
/* 943 */,
/* 944 */,
/* 945 */,
/* 946 */,
/* 947 */,
/* 948 */,
/* 949 */,
/* 950 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _copy = __webpack_require__(951);

var _polyfill = __webpack_require__(815);

function defaultCustomizer(target) {
  return void 0;
}

function deepcopy(target) {
  var customizer = arguments.length <= 1 || arguments[1] === void 0 ? defaultCustomizer : arguments[1];

  if (target === null) {
    // copy null
    return null;
  }

  var resultValue = (0, _copy.copyValue)(target);

  if (resultValue !== null) {
    // copy some primitive types
    return resultValue;
  }

  var resultCollection = (0, _copy.copyCollection)(target, customizer),
      clone = resultCollection !== null ? resultCollection : target;

  var visited = [target],
      reference = [clone];

  // recursively copy from collection
  return recursiveCopy(target, customizer, clone, visited, reference);
}

function recursiveCopy(target, customizer, clone, visited, reference) {
  if (target === null) {
    // copy null
    return null;
  }

  var resultValue = (0, _copy.copyValue)(target);

  if (resultValue !== null) {
    // copy some primitive types
    return resultValue;
  }

  var keys = (0, _polyfill.getKeys)(target).concat((0, _polyfill.getSymbols)(target));

  var i = void 0,
      len = void 0;

  var key = void 0,
      value = void 0,
      index = void 0,
      resultCopy = void 0,
      result = void 0,
      ref = void 0;

  for (i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    value = target[key];
    index = (0, _polyfill.indexOf)(visited, value);

    resultCopy = void 0;
    result = void 0;
    ref = void 0;

    if (index === -1) {
      resultCopy = (0, _copy.copy)(value, customizer);
      result = resultCopy !== null ? resultCopy : value;

      if (value !== null && /^(?:function|object)$/.test(typeof value)) {
        visited.push(value);
        reference.push(result);
      }
    } else {
      // circular reference
      ref = reference[index];
    }

    clone[key] = ref || recursiveCopy(value, customizer, result, visited, reference);
  }

  return clone;
}

exports['default'] = deepcopy;
module.exports = exports['default'];

/***/ }),
/* 951 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.copyValue = exports.copyCollection = exports.copy = void 0;

var _polyfill = __webpack_require__(815);

var toString = Object.prototype.toString;

function copy(target, customizer) {
  var resultValue = copyValue(target);

  if (resultValue !== null) {
    return resultValue;
  }

  return copyCollection(target, customizer);
}

function copyCollection(target, customizer) {
  if (typeof customizer !== 'function') {
    throw new TypeError('customizer is must be a Function');
  }

  if (typeof target === 'function') {
    var source = String(target);

    // NOTE:
    //
    //   https://gist.github.com/jdalton/5e34d890105aca44399f
    //
    //   - https://gist.github.com/jdalton/5e34d890105aca44399f#gistcomment-1283831
    //   - http://es5.github.io/#x15
    //
    //   native functions does not have prototype:
    //
    //       Object.toString.prototype  // => undefined
    //       (function() {}).prototype  // => {}
    //
    //   but cannot detect native constructor:
    //
    //       typeof Object     // => 'function'
    //       Object.prototype  // => {}
    //
    //   and cannot detect null binded function:
    //
    //       String(Math.abs)
    //         // => 'function abs() { [native code] }'
    //
    //     Firefox, Safari:
    //       String((function abs() {}).bind(null))
    //         // => 'function abs() { [native code] }'
    //
    //     Chrome:
    //       String((function abs() {}).bind(null))
    //         // => 'function () { [native code] }'
    if (/^\s*function\s*\S*\([^\)]*\)\s*{\s*\[native code\]\s*}/.test(source)) {
      // native function
      return target;
    } else {
      // user defined function
      return new Function('return ' + String(source))();
    }
  }

  var targetClass = toString.call(target);

  if (targetClass === '[object Array]') {
    return [];
  }

  if (targetClass === '[object Object]' && target.constructor === Object) {
    return {};
  }

  if (targetClass === '[object Date]') {
    // NOTE:
    //
    //   Firefox need to convert
    //
    //   Firefox:
    //     var date = new Date;
    //     +date;            // 1420909365967
    //     +new Date(date);  // 1420909365000
    //     +new Date(+date); // 1420909365967
    //
    //   Chrome:
    //     var date = new Date;
    //     +date;            // 1420909757913
    //     +new Date(date);  // 1420909757913
    //     +new Date(+date); // 1420909757913
    return new Date(target.getTime());
  }

  if (targetClass === '[object RegExp]') {
    // NOTE:
    //
    //   Chrome, Safari:
    //     (new RegExp).source => "(?:)"
    //
    //   Firefox:
    //     (new RegExp).source => ""
    //
    //   Chrome, Safari, Firefox:
    //     String(new RegExp) => "/(?:)/"
    var regexpText = String(target),
        slashIndex = regexpText.lastIndexOf('/');

    return new RegExp(regexpText.slice(1, slashIndex), regexpText.slice(slashIndex + 1));
  }

  if ((0, _polyfill.isBuffer)(target)) {
    var buffer = new Buffer(target.length);

    target.copy(buffer);

    return buffer;
  }

  var customizerResult = customizer(target);

  if (customizerResult !== void 0) {
    return customizerResult;
  }

  return null;
}

function copyValue(target) {
  var targetType = typeof target;

  // copy String, Number, Boolean, undefined and Symbol
  // without null and Function
  if (target !== null && targetType !== 'object' && targetType !== 'function') {
    return target;
  }

  return null;
}

exports.copy = copy;
exports.copyCollection = copyCollection;
exports.copyValue = copyValue;

/***/ }),
/* 952 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 953 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp; /* eslint react/jsx-no-bind: 0 */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _formBinder = __webpack_require__(689);

var _rcTooltip = __webpack_require__(99);

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

__webpack_require__(180);

var _CreateForm = __webpack_require__(708);

var _CreateForm2 = _interopRequireDefault(_CreateForm);

var _ColorPicker = __webpack_require__(958);

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Radio = __webpack_require__(691);

var Input = __webpack_require__(664);

var RadioGroup = Radio.Group;

var presetColors = [{
  primaryColor: '#DD2727',
  secondaryColor: '#2192D9',
  title: '天猫红'
}, {
  primaryColor: '#FF6A00',
  secondaryColor: '#2192D9',
  title: '淘宝橙'
}, {
  primaryColor: '#FF4766',
  secondaryColor: '#2192D9',
  title: '零售红'
}, {
  primaryColor: '#0077FF',
  secondaryColor: '#0073DC',
  title: '运动蓝'
}, {
  primaryColor: '#C7A47B',
  secondaryColor: '#313949',
  title: '黑金系'
}, {
  primaryColor: '#EE6E9F',
  secondaryColor: '#FEC9C9',
  title: '樱花粉'
}];

var BasicForm = (_temp = _class = function (_Component) {
  _inherits(BasicForm, _Component);

  function BasicForm() {
    _classCallCheck(this, BasicForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  BasicForm.prototype.render = function render() {
    var _this2 = this;

    var _props$value = this.props.value,
        value = _props$value === undefined ? {} : _props$value;


    return _react2.default.createElement(
      _formBinder.FormBinderWrapper,
      { value: value, onChange: this.props.formChange },
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        value.enableName ? _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            { style: styles.title },
            '\u6A21\u677F\u540D\u79F0\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            {
              name: 'name',
              rules: [{
                type: 'string',
                required: true,
                message: '布局名称必填'
              }, {
                validator: function validator(rule, val, callback) {
                  var errors = [];
                  var reg = /^[A-Z]+[A-Za-z0-9]+$/;
                  // 如果不符合规则，则输入 error
                  if (!val) {
                    return;
                  }

                  if (!reg.test(val)) {
                    errors = ['请输入正确的布局名称(如:BasicLayout)'];
                  }
                  callback(errors);
                }
              }]
            },
            _react2.default.createElement(Input, { size: 'large' })
          ),
          _react2.default.createElement(_formBinder.FormError, {
            style: { marginLeft: 70, marginTop: 10, display: 'block' },
            name: 'name'
          })
        ) : null,
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            { style: styles.title },
            '\u5E03\u5C40\u5BB9\u5668\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'layout' },
            _react2.default.createElement(
              RadioGroup,
              null,
              _react2.default.createElement(
                Radio,
                { id: 'fullWidth', value: 'fluid-layout' },
                '\u5168\u5C4F'
              ),
              _react2.default.createElement(
                Radio,
                { id: 'elasticWidth', value: 'boxed-layout' },
                '\u56FA\u5BBD'
              )
            )
          )
        ),
        value.enableTheme ? _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            { style: styles.title },
            '\u5B9A\u5236\u76AE\u80A4\uFF1A'
          ),
          _react2.default.createElement(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '12px',
                marginLeft: '12px'
              }
            },
            _react2.default.createElement(
              'span',
              { style: { paddingRight: 10, fontSize: 12 } },
              '\u4E3B\u8272'
            ),
            _react2.default.createElement(_ColorPicker2.default, {
              backgroundColor: value.themeConfig.primaryColor,
              onChange: function onChange(color) {
                return _this2.props.handleColorChange('primary', color);
              }
            }),
            _react2.default.createElement(
              'span',
              {
                style: { paddingLeft: 10, paddingRight: 10, fontSize: 12 }
              },
              '\u8F85\u8272'
            ),
            _react2.default.createElement(_ColorPicker2.default, {
              backgroundColor: value.themeConfig.secondaryColor,
              onChange: function onChange(color) {
                return _this2.props.handleColorChange('secondary', color);
              }
            })
          ),
          _react2.default.createElement(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '12px',
                marginLeft: '12px',
                fontSize: '12px'
              }
            },
            _react2.default.createElement(
              'span',
              { style: { paddingRight: 10 } },
              '\u63A8\u8350\u914D\u8272 '
            ),
            presetColors.map(function (c, k) {
              return _react2.default.createElement(
                _rcTooltip2.default,
                {
                  key: k,
                  placement: 'top',
                  overlay: _react2.default.createElement(
                    'span',
                    null,
                    c.title
                  )
                },
                _react2.default.createElement('div', {
                  onClick: function onClick() {
                    return _this2.props.handlePresetColor(c);
                  },
                  key: k,
                  style: {
                    cursor: 'pointer',
                    backgroundColor: c.primaryColor,
                    width: 14,
                    height: 14,
                    border: '2px solid #fff',
                    marginRight: 12,
                    boxShadow: '0 0 1px rgba(0,0,0,0.3)'
                  }
                })
              );
            })
          )
        ) : null
      )
    );
  };

  return BasicForm;
}(_react.Component), _class.displayName = 'BasicForm', _temp);
exports.default = (0, _CreateForm2.default)(BasicForm);


var styles = {
  formItem: {
    marginBottom: '20px'
  },
  title: {
    fontWeight: '500'
  }
};
module.exports = exports['default'];

/***/ }),
/* 954 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 955 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _asyncValidator = __webpack_require__(866);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REG_KEY = /\[(['"a-z_A-Z0-9]*)\]|\./gi;

var IceFormBinderWrapper = (_temp = _class = function (_Component) {
  _inherits(IceFormBinderWrapper, _Component);

  _createClass(IceFormBinderWrapper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        getter: this.getter,
        setter: this.setter,
        addValidate: this.addValidate,
        removeValidate: this.removeValidate,
        getError: this.getError,
        validate: this.validate
      };
    }
  }]);

  function IceFormBinderWrapper(props) {
    _classCallCheck(this, IceFormBinderWrapper);

    // all rules cache
    var _this = _possibleConstructorReturn(this, (IceFormBinderWrapper.__proto__ || Object.getPrototypeOf(IceFormBinderWrapper)).call(this, props));

    _this.addValidate = function (path, rules, fieldDOM) {
      _this.validateRules[path] = rules;
      _this.validateRefs[path] = fieldDOM;
    };

    _this.removeValidate = function (path) {
      delete _this.validateRules[path];
      delete _this.validateRefs[path];
    };

    _this.getter = function (path) {
      var value = _this.state.value;
      // from happy getter https://github.com/happy-codes/happy-getter/blob/master/src/index.js
      var pathArr = path.split(REG_KEY).filter(function (item) {
        return !!item;
      });
      var result = pathArr.reduce(function (result, currentPath, currentIndex) {
        if (!result.errorPath) {
          // get value
          var key = currentPath.replace(/[\'\"]/gi, '');
          result.value = result.value[key];

          // check value
          if (currentIndex !== pathArr.length - 1) {
            // can not get the next value
            var currentValueType = Object.prototype.toString.call(result.value);
            if (/String|Number|Boolean|Null|Undefined/.test(currentValueType)) {
              result.errorPath = currentPath;
            }
          }
        }

        return result;
      }, { value: value, errorPath: null });

      return result.value;
    };

    _this.setter = function (path, newValue) {
      var value = _this.state.value;
      var pathArr = path.split(REG_KEY).filter(function (item) {
        return !!item;
      });

      pathArr.reduce(function (pointer, currentPath, currentIndex) {
        if (pathArr.length === currentIndex + 1) {
          // last one
          pointer[currentPath] = newValue;
        }
        return pointer[currentPath];
      }, value);

      // state already update
      _this.setState({}, function () {
        _this.props.onChange && _this.props.onChange(_this.state.value);
      });
    };

    _this.validate = function (path) {
      var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var validator = new _asyncValidator2.default(_defineProperty({}, path, rules));

      validator.validate(_defineProperty({}, path, _this.getter(path)), function (errors) {
        if (errors && errors.length > 0) {
          _this.setState(function (state) {
            var formErrors = state.formErrors;
            formErrors = formErrors.filter(function (error) {
              return error.field !== errors[0].field;
            });
            Array.prototype.push.apply(formErrors, errors);
            return { formErrors: formErrors };
          });
        } else {
          _this.setState({
            formErrors: _this.state.formErrors.filter(function (error) {
              return error.field !== path;
            })
          });
        }

        validator = null;
      });
    };

    _this.validateAll = function (cb) {
      var validator = new _asyncValidator2.default(_this.validateRules);
      var needValidateValues = {};
      Object.keys(_this.validateRules).forEach(function (path) {
        needValidateValues[path] = _this.getter(path);
      });
      validator.validate(needValidateValues, function (errors) {
        if (cb && typeof cb === 'function') {
          cb(errors, _this.state.value);
        }

        if (_this.props.enableScrollErrorField && errors && errors.length > 0) {
          // todo 默认定位到第一个，最好有报错动效
          _this.validateRefs[errors[0].field].scrollIntoView && _this.validateRefs[errors[0].field].scrollIntoView();
          window.scroll(window.scrollX, window.scrollY - _this.props.scrollErrorFieldTopOffset);
        }

        if (errors) {
          _this.setState({ formErrors: errors });
        } else {
          _this.setState({ formErrors: [] });
        }
      });
    };

    _this.getError = function (path) {
      var formErrors = _this.state.formErrors;
      if (!formErrors.length) {
        return [];
      }
      return formErrors.filter(function (error) {
        return error.field === path;
      });
    };

    _this.validateRules = {};
    // scroll to the position when error happened
    _this.validateRefs = {};

    _this.state = {
      formErrors: [],
      value: props.value || {}
    };
    return _this;
  }

  _createClass(IceFormBinderWrapper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value || {}
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return IceFormBinderWrapper;
}(_react.Component), _class.displayName = 'IceFormBinderWrapper', _class.propTypes = {
  /**
   * 全局校验滚动到报错位置时，距离顶部的偏移值（适用于头部 fixed 的场景）
   */
  scrollErrorFieldTopOffset: _propTypes2.default.number,
  /**
   * 全局校验时，是否开启滚动到报错表单位置
   */
  enableScrollErrorField: _propTypes2.default.bool,
  /**
   * 当前表单的根 value 数据
   */
  value: _propTypes2.default.object,
  /**
   * 当前表单元素变更时触发
   */
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  value: undefined,
  scrollErrorFieldTopOffset: 37.5,
  enableScrollErrorField: true,
  onChange: function onChange() {}
}, _class.childContextTypes = {
  getter: _propTypes2.default.func,
  getError: _propTypes2.default.func,
  addValidate: _propTypes2.default.func,
  removeValidate: _propTypes2.default.func,
  setter: _propTypes2.default.func,
  validate: _propTypes2.default.func
}, _temp);
exports.default = IceFormBinderWrapper;

/***/ }),
/* 956 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// default return the first value
var defaultValueFormatter = function defaultValueFormatter() {
  return arguments.length <= 0 ? undefined : arguments[0];
};

// default return the first value
var defaultValueTransformer = function defaultValueTransformer(value) {
  return value;
};

var defaultErrorStatePropsGenerator = function defaultErrorStatePropsGenerator(errors, FormItemProps) {
  return {
    className: FormItemProps.className ? FormItemProps.className + ' this-field-has-error' : 'this-field-has-error'
  };
};

var FormBinder = (_temp2 = _class = function (_Component) {
  _inherits(FormBinder, _Component);

  function FormBinder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormBinder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormBinder.__proto__ || Object.getPrototypeOf(FormBinder)).call.apply(_ref, [this].concat(args))), _this), _this.currentRules = [], _this.getFormRules = function (props) {
      var FormItem = _react2.default.Children.only(props.children);
      var FormItemProps = FormItem.props;

      // rules has higher priority
      var rules = props.rules || FormItemProps.rules;
      if (rules) {
        return rules;
      }

      var result = [];
      var ruleKeys = ['required', 'pattern', 'min', 'max', 'len', 'enum', 'whitespace', 'fields', 'transform', 'message', 'validator', 'type'];
      ruleKeys.forEach(function (ruleKey) {
        var ruleValue = ruleKey in props ? props[ruleKey] : ruleKey in FormItemProps ? FormItemProps[ruleKey] : undefined;
        if (ruleValue !== undefined && ruleValue !== null) {
          result[0] ? result[0][ruleKey] = ruleValue : result.push(_defineProperty({}, ruleKey, ruleValue));
        }
      });

      return result;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // due to the props getter logic in render, do not add default value here.


  _createClass(FormBinder, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.currentRules = this.getFormRules(this.props);
      // this form item need validate
      if (this.currentRules.length) {
        var FormItem = _react2.default.Children.only(this.props.children);
        var currentName = this.props.name || FormItem.props.name;

        this.context.addValidate(currentName, this.currentRules, _reactDom2.default.findDOMNode(this));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.currentRules = this.getFormRules(this.props);
      // this form item need validate
      if (this.currentRules.length) {
        var FormItem = _react2.default.Children.only(this.props.children);
        var currentName = this.props.name || FormItem.props.name;

        this.context.removeValidate(currentName);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextRules = this.getFormRules(nextProps);
      // this form item need validate
      if (nextRules.length > 0 && JSON.stringify(nextRules) !== JSON.stringify(this.currentRules)) {
        this.currentRules = nextRules;

        var FormItem = _react2.default.Children.only(this.props.children);
        var currentName = this.props.name || FormItem.props.name;

        this.context.addValidate(currentName, this.currentRules, _reactDom2.default.findDOMNode(this));
      }
    }

    // get form rules from props

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _extends2;

      var FormItem = _react2.default.Children.only(this.props.children);
      var FormItemProps = FormItem.props;
      var FormItemDefaultProps = FormItem.type.defaultProps || {};

      var currentName = this.props.name || FormItem.props.name;
      var valueKey = this.props.valueKey || 'value';

      // handle form field error
      var formValueErrorProps = {};
      var errors = this.context.getError(currentName);
      if (errors.length !== 0) {
        var errorStatePropsGenerator = this.props.errorStatePropsGenerator || FormItem.props.errorStatePropsGenerator || defaultErrorStatePropsGenerator;

        formValueErrorProps = errorStatePropsGenerator(errors, FormItemProps);
      }

      var currentValidateTriggerType = this.props.triggerType || FormItemProps.triggerType || 'onChange';

      // handle value format
      var valueFormatter = this.props.valueFormatter || FormItem.props.valueFormatter || defaultValueFormatter;

      // handle value transform
      var valueTransformer = this.props.valueTransformer || FormItem.props.valueTransformer || defaultValueTransformer;

      var NewFormItem = _react2.default.cloneElement(FormItem, _extends({}, formValueErrorProps, (_extends2 = {}, _defineProperty(_extends2, currentValidateTriggerType, function () {
        FormItemProps[currentValidateTriggerType] && FormItemProps[currentValidateTriggerType]();

        if (currentValidateTriggerType !== 'onChange' && _this2.currentRules.length > 0) {
          _this2.context.validate(currentName, _this2.currentRules);
        }
      }), _defineProperty(_extends2, 'onChange', function onChange() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        FormItemProps.onChange && FormItemProps.onChange.apply(_this2, args);
        _this2.context.setter(currentName, valueFormatter.apply(undefined, args));
        if (currentValidateTriggerType === 'onChange' && _this2.currentRules.length > 0) {
          _this2.context.validate(currentName, _this2.currentRules);
        }
      }), _defineProperty(_extends2, valueKey, function () {
        var formItemValue = FormItemProps[valueKey];
        if (formItemValue && formItemValue !== FormItemDefaultProps[valueKey]) {
          return valueTransformer(FormItemProps[valueKey]);
        } else {
          var value = _this2.context.getter(currentName);
          return valueTransformer(value);
        }
      }()), _extends2)));

      return NewFormItem;
    }
  }]);

  return FormBinder;
}(_react.Component), _class.displayName = 'FormBinder', _class.propTypes = {
  /**
   * 当前表单绑定的数据层级
   */
  name: _propTypes2.default.string,
  /**
   * 当表单报错的时候，你可能要对报错的表单组件上面添加特殊的 props（比如报错的 className、style 等），此时就可以通过这个 function 来自定义返回的报错状态 props
   */
  errorStatePropsGenerator: _propTypes2.default.func,
  /**
   * 数据格式化方法，表单组件 onChange 之后，支持对数据做一层转换再进行后续操作
   */
  valueFormatter: _propTypes2.default.func,
  /**
   * 数据转换方法，表单组件接收值时可将其转换为其他类型
   */
  valueTransformer: _propTypes2.default.func,
  /**
   * 触发校验的事件，对于高频触发校验的 Input 可以设置为 'onBlur' 减少校验调用次数
   */
  triggerType: _propTypes2.default.string,
  /**
   * value 属性的 key, 默认 `value`
   */
  valueKey: _propTypes2.default.string,
  /**
   * 当前表单项是否必须有值
   */
  required: _propTypes2.default.bool,
  /**
   * 当前表单值正则表单校验
   */
  pattern: _propTypes2.default.object,
  /**
   * 当前表单值最小数（对字符串、数组、数值类型数据有效）
   */
  min: _propTypes2.default.number,
  /**
   * 当前表单值最大数（对字符串、数组、数值类型数据有效）
   */
  max: _propTypes2.default.number,
  /**
   * 当前表单值固定长度（对字符串、数组、数值类型数据有效）
   */
  len: _propTypes2.default.number,
  /**
   * 当前表单值枚举值
   */
  enum: _propTypes2.default.array,
  /**
   * 当前表单值是否允许纯空格（对字符串类型有效）
   */
  whitespace: _propTypes2.default.bool,
  /**
   * 声明当前表单项下层表单数据校验规则
   */
  fields: _propTypes2.default.object,
  /**
   * 当前表单值校验前的自定义数据转换方法
   */
  transform: _propTypes2.default.func,
  /**
   * 当前表单校验规则失败时的提示文案
   */
  message: _propTypes2.default.node,
  /**
   * 自定义表单校验方法，支持异步请求等校验
   */
  validator: _propTypes2.default.func,
  /**
   * 当前表单值的数据类型，支持配置 string、number、boolean、method、regexp、integer、float、array、object、enum、date、url、hex、email
   */
  type: _propTypes2.default.string,
  /**
   * 数组的方式配置当前表单校验规则，用于对一个表单执行多条校验规则
   */
  rules: _propTypes2.default.array
}, _class.defaultProps = {}, _class.contextTypes = {
  getError: _propTypes2.default.func,
  getter: _propTypes2.default.func,
  validate: _propTypes2.default.func,
  addValidate: _propTypes2.default.func,
  removeValidate: _propTypes2.default.func,
  setter: _propTypes2.default.func
}, _temp2);
exports.default = FormBinder;

/***/ }),
/* 957 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormError = (_temp = _class = function (_Component) {
  _inherits(FormError, _Component);

  function FormError() {
    _classCallCheck(this, FormError);

    return _possibleConstructorReturn(this, (FormError.__proto__ || Object.getPrototypeOf(FormError)).apply(this, arguments));
  }

  _createClass(FormError, [{
    key: 'render',
    value: function render() {
      var path = this.props.name;
      var errors = this.context.getError(path);
      if (errors.length === 0) return null;

      var render = this.props.render;
      if (render && typeof render === 'function') {
        return render(errors);
      }

      var _props = this.props,
          className = _props.className,
          style = _props.style;


      return _react2.default.createElement(
        'span',
        {
          className: className,
          style: _extends({ fontSize: 12, color: 'red' }, style)
        },
        errors.map(function (error) {
          return error.message;
        }).join('，')
      );
    }
  }]);

  return FormError;
}(_react.Component), _class.displayName = 'FormError', _class.propTypes = {
  /**
   * 自定义渲染报错的组件和处理逻辑
   */
  render: _propTypes2.default.func,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
}, _class.defaultProps = {
  render: undefined,
  className: '',
  style: {}
}, _class.contextTypes = {
  getError: _propTypes2.default.func
}, _temp);
exports.default = FormError;

/***/ }),
/* 958 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactColor = __webpack_require__(959);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ColorPicker = (_temp = _class = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = function () {
      _this.setState({ displayColorPicker: !_this.state.displayColorPicker });
    };

    _this.handleClose = function () {
      _this.setState({ displayColorPicker: false });
    };

    _this.handleChange = function (color) {
      _this.setState({ color: color.hex }, function () {
        _this.props.onChange(_this.state.color);
      });
    };

    _this.state = {
      displayColorPicker: false,
      color: props.backgroundColor
    };
    return _this;
  }

  ColorPicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.backgroundColor !== this.state.color) {
      this.setState({ color: nextProps.backgroundColor });
    }
  };

  ColorPicker.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', {
        onClick: this.handleClick,
        style: {
          border: '3px solid #fff',
          borderRadius: 2,
          height: 20,
          width: 50,
          backgroundColor: this.state.color,
          boxShadow: '0 0 1px rgba(0,0,0,0.5)'
        }
      }),
      this.state.displayColorPicker ? _react2.default.createElement(
        'div',
        { style: styles.popover },
        _react2.default.createElement('div', { style: styles.cover, onClick: this.handleClose }),
        _react2.default.createElement(_reactColor.SketchPicker, {
          disableAlpha: true,
          color: this.state.color,
          onChange: this.handleChange
        })
      ) : null
    );
  };

  return ColorPicker;
}(_react.Component), _class.defaultProps = {
  onChange: function onChange() {}
}, _temp);


var styles = {
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer'
  },
  popover: {
    position: 'fixed',
    zIndex: '999999',
    paddingTop: 5
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }
};

exports.default = ColorPicker;
module.exports = exports['default'];

/***/ }),
/* 959 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomPicker = exports.TwitterPicker = exports.SwatchesPicker = exports.SliderPicker = exports.SketchPicker = exports.PhotoshopPicker = exports.MaterialPicker = exports.HuePicker = exports.GithubPicker = exports.CompactPicker = exports.ChromePicker = exports.default = exports.CirclePicker = exports.BlockPicker = exports.AlphaPicker = undefined;

var _Alpha = __webpack_require__(960);

Object.defineProperty(exports, 'AlphaPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Alpha).default;
  }
});

var _Block = __webpack_require__(1086);

Object.defineProperty(exports, 'BlockPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Block).default;
  }
});

var _Circle = __webpack_require__(1088);

Object.defineProperty(exports, 'CirclePicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Circle).default;
  }
});

var _Chrome = __webpack_require__(1090);

Object.defineProperty(exports, 'ChromePicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Chrome).default;
  }
});

var _Compact = __webpack_require__(1095);

Object.defineProperty(exports, 'CompactPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Compact).default;
  }
});

var _Github = __webpack_require__(1098);

Object.defineProperty(exports, 'GithubPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Github).default;
  }
});

var _Hue = __webpack_require__(1100);

Object.defineProperty(exports, 'HuePicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Hue).default;
  }
});

var _Material = __webpack_require__(1102);

Object.defineProperty(exports, 'MaterialPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Material).default;
  }
});

var _Photoshop = __webpack_require__(1103);

Object.defineProperty(exports, 'PhotoshopPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Photoshop).default;
  }
});

var _Sketch = __webpack_require__(1109);

Object.defineProperty(exports, 'SketchPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Sketch).default;
  }
});

var _Slider = __webpack_require__(1112);

Object.defineProperty(exports, 'SliderPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Slider).default;
  }
});

var _Swatches = __webpack_require__(1116);

Object.defineProperty(exports, 'SwatchesPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Swatches).default;
  }
});

var _Twitter = __webpack_require__(1120);

Object.defineProperty(exports, 'TwitterPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Twitter).default;
  }
});

var _ColorWrap = __webpack_require__(851);

Object.defineProperty(exports, 'CustomPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ColorWrap).default;
  }
});

var _Chrome2 = _interopRequireDefault(_Chrome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Chrome2.default;

/***/ }),
/* 960 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlphaPicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _common = __webpack_require__(662);

var _AlphaPointer = __webpack_require__(1085);

var _AlphaPointer2 = _interopRequireDefault(_AlphaPointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlphaPicker = exports.AlphaPicker = function AlphaPicker(_ref) {
  var rgb = _ref.rgb,
      hsl = _ref.hsl,
      width = _ref.width,
      height = _ref.height,
      onChange = _ref.onChange,
      direction = _ref.direction,
      style = _ref.style,
      renderers = _ref.renderers,
      pointer = _ref.pointer,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        position: 'relative',
        width: width,
        height: height
      },
      alpha: {
        radius: '2px',
        style: style
      }
    }
  });

  return _react2.default.createElement(
    'div',
    { style: styles.picker, className: 'alpha-picker ' + className },
    _react2.default.createElement(_common.Alpha, _extends({}, styles.alpha, {
      rgb: rgb,
      hsl: hsl,
      pointer: pointer,
      renderers: renderers,
      onChange: onChange,
      direction: direction
    }))
  );
};

AlphaPicker.defaultProps = {
  width: '316px',
  height: '16px',
  direction: 'horizontal',
  pointer: _AlphaPointer2.default
};

exports.default = (0, _common.ColorWrap)(AlphaPicker);

/***/ }),
/* 961 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenNames = undefined;

var _isString2 = __webpack_require__(962);

var _isString3 = _interopRequireDefault(_isString2);

var _forOwn2 = __webpack_require__(774);

var _forOwn3 = _interopRequireDefault(_forOwn2);

var _isPlainObject2 = __webpack_require__(825);

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _map2 = __webpack_require__(675);

var _map3 = _interopRequireDefault(_map2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flattenNames = exports.flattenNames = function flattenNames() {
  var things = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var names = [];

  (0, _map3.default)(things, function (thing) {
    if (Array.isArray(thing)) {
      flattenNames(thing).map(function (name) {
        return names.push(name);
      });
    } else if ((0, _isPlainObject3.default)(thing)) {
      (0, _forOwn3.default)(thing, function (value, key) {
        value === true && names.push(key);
        names.push(key + '-' + value);
      });
    } else if ((0, _isString3.default)(thing)) {
      names.push(thing);
    }
  });

  return names;
};

exports.default = flattenNames;

/***/ }),
/* 962 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(681),
    isArray = __webpack_require__(666),
    isObjectLike = __webpack_require__(672);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),
/* 963 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(709);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 964 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 965 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 966 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 967 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(681),
    isObjectLike = __webpack_require__(672);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 968 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 969 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(681),
    isLength = __webpack_require__(778),
    isObjectLike = __webpack_require__(672);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 970 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(781),
    nativeKeys = __webpack_require__(971);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 971 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(823);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 972 */
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(973),
    baseMatchesProperty = __webpack_require__(1017),
    identity = __webpack_require__(728),
    isArray = __webpack_require__(666),
    property = __webpack_require__(1027);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),
/* 973 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(974),
    getMatchData = __webpack_require__(1016),
    matchesStrictComparable = __webpack_require__(836);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),
/* 974 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(729),
    baseIsEqual = __webpack_require__(828);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),
/* 975 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 976 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(731);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 977 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(731);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 978 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(731);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 979 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(731);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 980 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(730);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 981 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 982 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 983 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 984 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(730),
    Map = __webpack_require__(784),
    MapCache = __webpack_require__(785);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 985 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(782),
    isMasked = __webpack_require__(986),
    isObject = __webpack_require__(668),
    toSource = __webpack_require__(827);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 986 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(987);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 987 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(669);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 988 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 989 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(990),
    ListCache = __webpack_require__(730),
    Map = __webpack_require__(784);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 990 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(991),
    hashDelete = __webpack_require__(992),
    hashGet = __webpack_require__(993),
    hashHas = __webpack_require__(994),
    hashSet = __webpack_require__(995);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 991 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(732);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 992 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 993 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(732);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 994 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(732);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 995 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(732);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 996 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(733);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 997 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 998 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(733);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 999 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(733);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 1000 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(733);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 1001 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(729),
    equalArrays = __webpack_require__(829),
    equalByTag = __webpack_require__(1007),
    equalObjects = __webpack_require__(1010),
    getTag = __webpack_require__(734),
    isArray = __webpack_require__(666),
    isBuffer = __webpack_require__(726),
    isTypedArray = __webpack_require__(777);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 1002 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(785),
    setCacheAdd = __webpack_require__(1003),
    setCacheHas = __webpack_require__(1004);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 1003 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 1004 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 1005 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 1006 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 1007 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(709),
    Uint8Array = __webpack_require__(830),
    eq = __webpack_require__(711),
    equalArrays = __webpack_require__(829),
    mapToArray = __webpack_require__(1008),
    setToArray = __webpack_require__(1009);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 1008 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 1009 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 1010 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(831);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 1011 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 1012 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(682),
    root = __webpack_require__(669);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 1013 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(682),
    root = __webpack_require__(669);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 1014 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(682),
    root = __webpack_require__(669);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 1015 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(682),
    root = __webpack_require__(669);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 1016 */
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(835),
    keys = __webpack_require__(710);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),
/* 1017 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(828),
    get = __webpack_require__(1018),
    hasIn = __webpack_require__(1024),
    isKey = __webpack_require__(787),
    isStrictComparable = __webpack_require__(835),
    matchesStrictComparable = __webpack_require__(836),
    toKey = __webpack_require__(736);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),
/* 1018 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(837);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 1019 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(1020);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 1020 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(1021);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 1021 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(785);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 1022 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(1023);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 1023 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(709),
    arrayMap = __webpack_require__(826),
    isArray = __webpack_require__(666),
    isSymbol = __webpack_require__(735);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 1024 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(1025),
    hasPath = __webpack_require__(1026);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 1025 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 1026 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(838),
    isArguments = __webpack_require__(775),
    isArray = __webpack_require__(666),
    isIndex = __webpack_require__(776),
    isLength = __webpack_require__(778),
    toKey = __webpack_require__(736);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 1027 */
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(1028),
    basePropertyDeep = __webpack_require__(1029),
    isKey = __webpack_require__(787),
    toKey = __webpack_require__(736);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),
/* 1028 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),
/* 1029 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(837);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),
/* 1030 */
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(839),
    isArrayLike = __webpack_require__(690);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),
/* 1031 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(690);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),
/* 1032 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeClasses = undefined;

var _forOwn2 = __webpack_require__(774);

var _forOwn3 = _interopRequireDefault(_forOwn2);

var _cloneDeep2 = __webpack_require__(1033);

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeClasses = exports.mergeClasses = function mergeClasses(classes) {
  var activeNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var styles = classes.default && (0, _cloneDeep3.default)(classes.default) || {};
  activeNames.map(function (name) {
    var toMerge = classes[name];
    if (toMerge) {
      (0, _forOwn3.default)(toMerge, function (value, key) {
        if (!styles[key]) {
          styles[key] = {};
        }

        styles[key] = _extends({}, styles[key], toMerge[key]);
      });
    }

    return name;
  });
  return styles;
};

exports.default = mergeClasses;

/***/ }),
/* 1033 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(1034);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),
/* 1034 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(729),
    arrayEach = __webpack_require__(840),
    assignValue = __webpack_require__(841),
    baseAssign = __webpack_require__(1035),
    baseAssignIn = __webpack_require__(1036),
    cloneBuffer = __webpack_require__(843),
    copyArray = __webpack_require__(844),
    copySymbols = __webpack_require__(1039),
    copySymbolsIn = __webpack_require__(1040),
    getAllKeys = __webpack_require__(831),
    getAllKeysIn = __webpack_require__(1041),
    getTag = __webpack_require__(734),
    initCloneArray = __webpack_require__(1042),
    initCloneByTag = __webpack_require__(1043),
    initCloneObject = __webpack_require__(847),
    isArray = __webpack_require__(666),
    isBuffer = __webpack_require__(726),
    isMap = __webpack_require__(1048),
    isObject = __webpack_require__(668),
    isSet = __webpack_require__(1050),
    keys = __webpack_require__(710);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });

    return result;
  }

  if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });

    return result;
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),
/* 1035 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(712),
    keys = __webpack_require__(710);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 1036 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(712),
    keysIn = __webpack_require__(737);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),
/* 1037 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(668),
    isPrototype = __webpack_require__(781),
    nativeKeysIn = __webpack_require__(1038);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 1038 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 1039 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(712),
    getSymbols = __webpack_require__(786);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),
/* 1040 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(712),
    getSymbolsIn = __webpack_require__(845);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),
/* 1041 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(832),
    getSymbolsIn = __webpack_require__(845),
    keysIn = __webpack_require__(737);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),
/* 1042 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),
/* 1043 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(789),
    cloneDataView = __webpack_require__(1044),
    cloneRegExp = __webpack_require__(1045),
    cloneSymbol = __webpack_require__(1046),
    cloneTypedArray = __webpack_require__(846);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),
/* 1044 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(789);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),
/* 1045 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),
/* 1046 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(709);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),
/* 1047 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(668);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 1048 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMap = __webpack_require__(1049),
    baseUnary = __webpack_require__(779),
    nodeUtil = __webpack_require__(780);

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),
/* 1049 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(734),
    isObjectLike = __webpack_require__(672);

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),
/* 1050 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsSet = __webpack_require__(1051),
    baseUnary = __webpack_require__(779),
    nodeUtil = __webpack_require__(780);

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),
/* 1051 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(734),
    isObjectLike = __webpack_require__(672);

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),
/* 1052 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoprefix = undefined;

var _forOwn2 = __webpack_require__(774);

var _forOwn3 = _interopRequireDefault(_forOwn2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transforms = {
  borderRadius: function borderRadius(value) {
    return {
      msBorderRadius: value,
      MozBorderRadius: value,
      OBorderRadius: value,
      WebkitBorderRadius: value,
      borderRadius: value
    };
  },
  boxShadow: function boxShadow(value) {
    return {
      msBoxShadow: value,
      MozBoxShadow: value,
      OBoxShadow: value,
      WebkitBoxShadow: value,
      boxShadow: value
    };
  },
  userSelect: function userSelect(value) {
    return {
      WebkitTouchCallout: value,
      KhtmlUserSelect: value,
      MozUserSelect: value,
      msUserSelect: value,
      WebkitUserSelect: value,
      userSelect: value
    };
  },

  flex: function flex(value) {
    return {
      WebkitBoxFlex: value,
      MozBoxFlex: value,
      WebkitFlex: value,
      msFlex: value,
      flex: value
    };
  },
  flexBasis: function flexBasis(value) {
    return {
      WebkitFlexBasis: value,
      flexBasis: value
    };
  },
  justifyContent: function justifyContent(value) {
    return {
      WebkitJustifyContent: value,
      justifyContent: value
    };
  },

  transition: function transition(value) {
    return {
      msTransition: value,
      MozTransition: value,
      OTransition: value,
      WebkitTransition: value,
      transition: value
    };
  },

  transform: function transform(value) {
    return {
      msTransform: value,
      MozTransform: value,
      OTransform: value,
      WebkitTransform: value,
      transform: value
    };
  },
  absolute: function absolute(value) {
    var direction = value && value.split(' ');
    return {
      position: 'absolute',
      top: direction && direction[0],
      right: direction && direction[1],
      bottom: direction && direction[2],
      left: direction && direction[3]
    };
  },
  extend: function extend(name, otherElementStyles) {
    var otherStyle = otherElementStyles[name];
    if (otherStyle) {
      return otherStyle;
    }
    return {
      'extend': name
    };
  }
};

var autoprefix = exports.autoprefix = function autoprefix(elements) {
  var prefixed = {};
  (0, _forOwn3.default)(elements, function (styles, element) {
    var expanded = {};
    (0, _forOwn3.default)(styles, function (value, key) {
      var transform = transforms[key];
      if (transform) {
        expanded = _extends({}, expanded, transform(value));
      } else {
        expanded[key] = value;
      }
    });
    prefixed[element] = expanded;
  });
  return prefixed;
};

exports.default = autoprefix;

/***/ }),
/* 1053 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hover = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hover = exports.hover = function hover(Component) {
  var Span = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'span';

  return function (_React$Component) {
    _inherits(Hover, _React$Component);

    function Hover() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Hover);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Hover.__proto__ || Object.getPrototypeOf(Hover)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hover: false }, _this.handleMouseOver = function () {
        return _this.setState({ hover: true });
      }, _this.handleMouseOut = function () {
        return _this.setState({ hover: false });
      }, _this.render = function () {
        return _react2.default.createElement(
          Span,
          { onMouseOver: _this.handleMouseOver, onMouseOut: _this.handleMouseOut },
          _react2.default.createElement(Component, _extends({}, _this.props, _this.state))
        );
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Hover;
  }(_react2.default.Component);
};

exports.default = hover;

/***/ }),
/* 1054 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.active = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var active = exports.active = function active(Component) {
  var Span = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'span';

  return function (_React$Component) {
    _inherits(Active, _React$Component);

    function Active() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Active);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Active.__proto__ || Object.getPrototypeOf(Active)).call.apply(_ref, [this].concat(args))), _this), _this.state = { active: false }, _this.handleMouseDown = function () {
        return _this.setState({ active: true });
      }, _this.handleMouseUp = function () {
        return _this.setState({ active: false });
      }, _this.render = function () {
        return _react2.default.createElement(
          Span,
          { onMouseDown: _this.handleMouseDown, onMouseUp: _this.handleMouseUp },
          _react2.default.createElement(Component, _extends({}, _this.props, _this.state))
        );
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Active;
  }(_react2.default.Component);
};

exports.default = active;

/***/ }),
/* 1055 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var loopable = function loopable(i, length) {
  var props = {};
  var setProp = function setProp(name) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    props[name] = value;
  };

  i === 0 && setProp('first-child');
  i === length - 1 && setProp('last-child');
  (i === 0 || i % 2 === 0) && setProp('even');
  Math.abs(i % 2) === 1 && setProp('odd');
  setProp('nth-child', i);

  return props;
};

exports.default = loopable;

/***/ }),
/* 1056 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alpha = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _alpha = __webpack_require__(1057);

var alpha = _interopRequireWildcard(_alpha);

var _Checkboard = __webpack_require__(790);

var _Checkboard2 = _interopRequireDefault(_Checkboard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alpha = exports.Alpha = function (_ref) {
  _inherits(Alpha, _ref);

  function Alpha() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Alpha);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Alpha.__proto__ || Object.getPrototypeOf(Alpha)).call.apply(_ref2, [this].concat(args))), _this), _this.handleChange = function (e, skip) {
      var change = alpha.calculateChange(e, skip, _this.props, _this.container);
      change && _this.props.onChange && _this.props.onChange(change, e);
    }, _this.handleMouseDown = function (e) {
      _this.handleChange(e, true);
      window.addEventListener('mousemove', _this.handleChange);
      window.addEventListener('mouseup', _this.handleMouseUp);
    }, _this.handleMouseUp = function () {
      _this.unbindEventListeners();
    }, _this.unbindEventListeners = function () {
      window.removeEventListener('mousemove', _this.handleChange);
      window.removeEventListener('mouseup', _this.handleMouseUp);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Alpha, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindEventListeners();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var rgb = this.props.rgb;
      var styles = (0, _reactcss2.default)({
        'default': {
          alpha: {
            absolute: '0px 0px 0px 0px',
            borderRadius: this.props.radius
          },
          checkboard: {
            absolute: '0px 0px 0px 0px',
            overflow: 'hidden',
            borderRadius: this.props.radius
          },
          gradient: {
            absolute: '0px 0px 0px 0px',
            background: 'linear-gradient(to right, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0) 0%,\n           rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1) 100%)',
            boxShadow: this.props.shadow,
            borderRadius: this.props.radius
          },
          container: {
            position: 'relative',
            height: '100%',
            margin: '0 3px'
          },
          pointer: {
            position: 'absolute',
            left: rgb.a * 100 + '%'
          },
          slider: {
            width: '4px',
            borderRadius: '1px',
            height: '8px',
            boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
            background: '#fff',
            marginTop: '1px',
            transform: 'translateX(-2px)'
          }
        },
        'vertical': {
          gradient: {
            background: 'linear-gradient(to bottom, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0) 0%,\n           rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1) 100%)'
          },
          pointer: {
            left: 0,
            top: rgb.a * 100 + '%'
          }
        },
        'overwrite': _extends({}, this.props.style)
      }, {
        vertical: this.props.direction === 'vertical',
        overwrite: true
      });

      return _react2.default.createElement(
        'div',
        { style: styles.alpha },
        _react2.default.createElement(
          'div',
          { style: styles.checkboard },
          _react2.default.createElement(_Checkboard2.default, { renderers: this.props.renderers })
        ),
        _react2.default.createElement('div', { style: styles.gradient }),
        _react2.default.createElement(
          'div',
          {
            style: styles.container,
            ref: function ref(container) {
              return _this2.container = container;
            },
            onMouseDown: this.handleMouseDown,
            onTouchMove: this.handleChange,
            onTouchStart: this.handleChange
          },
          _react2.default.createElement(
            'div',
            { style: styles.pointer },
            this.props.pointer ? _react2.default.createElement(this.props.pointer, this.props) : _react2.default.createElement('div', { style: styles.slider })
          )
        )
      );
    }
  }]);

  return Alpha;
}(_react.PureComponent || _react.Component);

exports.default = Alpha;

/***/ }),
/* 1057 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculateChange = exports.calculateChange = function calculateChange(e, skip, props, container) {
  e.preventDefault();
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;
  var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (props.direction === 'vertical') {
    var a = void 0;
    if (top < 0) {
      a = 0;
    } else if (top > containerHeight) {
      a = 1;
    } else {
      a = Math.round(top * 100 / containerHeight) / 100;
    }

    if (props.hsl.a !== a) {
      return {
        h: props.hsl.h,
        s: props.hsl.s,
        l: props.hsl.l,
        a: a,
        source: 'rgb'
      };
    }
  } else {
    var _a = void 0;
    if (left < 0) {
      _a = 0;
    } else if (left > containerWidth) {
      _a = 1;
    } else {
      _a = Math.round(left * 100 / containerWidth) / 100;
    }

    if (props.a !== _a) {
      return {
        h: props.hsl.h,
        s: props.hsl.s,
        l: props.hsl.l,
        a: _a,
        source: 'rgb'
      };
    }
  }
  return null;
};

/***/ }),
/* 1058 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var checkboardCache = {};

var render = exports.render = function render(c1, c2, size, serverCanvas) {
  if (typeof document === 'undefined' && !serverCanvas) {
    return null;
  }
  var canvas = serverCanvas ? new serverCanvas() : document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size * 2;
  var ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  } // If no context can be found, return early.
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
};

var get = exports.get = function get(c1, c2, size, serverCanvas) {
  var key = c1 + '-' + c2 + '-' + size + (serverCanvas ? '-server' : '');
  var checkboard = render(c1, c2, size, serverCanvas);

  if (checkboardCache[key]) {
    return checkboardCache[key];
  }
  checkboardCache[key] = checkboard;
  return checkboard;
};

/***/ }),
/* 1059 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditableInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableInput = exports.EditableInput = function (_ref) {
  _inherits(EditableInput, _ref);

  function EditableInput(props) {
    _classCallCheck(this, EditableInput);

    var _this = _possibleConstructorReturn(this, (EditableInput.__proto__ || Object.getPrototypeOf(EditableInput)).call(this));

    _this.handleBlur = function () {
      if (_this.state.blurValue) {
        _this.setState({ value: _this.state.blurValue, blurValue: null });
      }
    };

    _this.handleChange = function (e) {
      if (_this.props.label) {
        _this.props.onChange && _this.props.onChange(_defineProperty({}, _this.props.label, e.target.value), e);
      } else {
        _this.props.onChange && _this.props.onChange(e.target.value, e);
      }

      _this.setState({ value: e.target.value });
    };

    _this.handleKeyDown = function (e) {
      // In case `e.target.value` is a percentage remove the `%` character
      // and update accordingly with a percentage
      // https://github.com/casesandberg/react-color/issues/383
      var stringValue = String(e.target.value);
      var isPercentage = stringValue.indexOf('%') > -1;
      var number = Number(stringValue.replace(/%/g, ''));
      if (!isNaN(number)) {
        var amount = _this.props.arrowOffset || 1;

        // Up
        if (e.keyCode === 38) {
          if (_this.props.label !== null) {
            _this.props.onChange && _this.props.onChange(_defineProperty({}, _this.props.label, number + amount), e);
          } else {
            _this.props.onChange && _this.props.onChange(number + amount, e);
          }

          if (isPercentage) {
            _this.setState({ value: number + amount + '%' });
          } else {
            _this.setState({ value: number + amount });
          }
        }

        // Down
        if (e.keyCode === 40) {
          if (_this.props.label !== null) {
            _this.props.onChange && _this.props.onChange(_defineProperty({}, _this.props.label, number - amount), e);
          } else {
            _this.props.onChange && _this.props.onChange(number - amount, e);
          }

          if (isPercentage) {
            _this.setState({ value: number - amount + '%' });
          } else {
            _this.setState({ value: number - amount });
          }
        }
      }
    };

    _this.handleDrag = function (e) {
      if (_this.props.dragLabel) {
        var newValue = Math.round(_this.props.value + e.movementX);
        if (newValue >= 0 && newValue <= _this.props.dragMax) {
          _this.props.onChange && _this.props.onChange(_defineProperty({}, _this.props.label, newValue), e);
        }
      }
    };

    _this.handleMouseDown = function (e) {
      if (_this.props.dragLabel) {
        e.preventDefault();
        _this.handleDrag(e);
        window.addEventListener('mousemove', _this.handleDrag);
        window.addEventListener('mouseup', _this.handleMouseUp);
      }
    };

    _this.handleMouseUp = function () {
      _this.unbindEventListeners();
    };

    _this.unbindEventListeners = function () {
      window.removeEventListener('mousemove', _this.handleDrag);
      window.removeEventListener('mouseup', _this.handleMouseUp);
    };

    _this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase()
    };
    return _this;
  }

  _createClass(EditableInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var input = this.input;
      if (nextProps.value !== this.state.value) {
        if (input === document.activeElement) {
          this.setState({ blurValue: String(nextProps.value).toUpperCase() });
        } else {
          this.setState({ value: String(nextProps.value).toUpperCase(), blurValue: !this.state.blurValue && String(nextProps.value).toUpperCase() });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindEventListeners();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = (0, _reactcss2.default)({
        'default': {
          wrap: {
            position: 'relative'
          }
        },
        'user-override': {
          wrap: this.props.style && this.props.style.wrap ? this.props.style.wrap : {},
          input: this.props.style && this.props.style.input ? this.props.style.input : {},
          label: this.props.style && this.props.style.label ? this.props.style.label : {}
        },
        'dragLabel-true': {
          label: {
            cursor: 'ew-resize'
          }
        }
      }, {
        'user-override': true
      }, this.props);

      return _react2.default.createElement(
        'div',
        { style: styles.wrap },
        _react2.default.createElement('input', {
          style: styles.input,
          ref: function ref(input) {
            return _this2.input = input;
          },
          value: this.state.value,
          onKeyDown: this.handleKeyDown,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          placeholder: this.props.placeholder,
          spellCheck: 'false'
        }),
        this.props.label && !this.props.hideLabel ? _react2.default.createElement(
          'span',
          { style: styles.label, onMouseDown: this.handleMouseDown },
          this.props.label
        ) : null
      );
    }
  }]);

  return EditableInput;
}(_react.PureComponent || _react.Component);

exports.default = EditableInput;

/***/ }),
/* 1060 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _hue = __webpack_require__(1061);

var hue = _interopRequireWildcard(_hue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hue = exports.Hue = function (_ref) {
  _inherits(Hue, _ref);

  function Hue() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Hue);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Hue.__proto__ || Object.getPrototypeOf(Hue)).call.apply(_ref2, [this].concat(args))), _this), _this.handleChange = function (e, skip) {
      var change = hue.calculateChange(e, skip, _this.props, _this.container);
      change && _this.props.onChange && _this.props.onChange(change, e);
    }, _this.handleMouseDown = function (e) {
      _this.handleChange(e, true);
      window.addEventListener('mousemove', _this.handleChange);
      window.addEventListener('mouseup', _this.handleMouseUp);
    }, _this.handleMouseUp = function () {
      _this.unbindEventListeners();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Hue, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindEventListeners();
    }
  }, {
    key: 'unbindEventListeners',
    value: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$direction = this.props.direction,
          direction = _props$direction === undefined ? 'horizontal' : _props$direction;


      var styles = (0, _reactcss2.default)({
        'default': {
          hue: {
            absolute: '0px 0px 0px 0px',
            borderRadius: this.props.radius,
            boxShadow: this.props.shadow
          },
          container: {
            padding: '0 2px',
            position: 'relative',
            height: '100%',
            borderRadius: this.props.radius
          },
          pointer: {
            position: 'absolute',
            left: this.props.hsl.h * 100 / 360 + '%'
          },
          slider: {
            marginTop: '1px',
            width: '4px',
            borderRadius: '1px',
            height: '8px',
            boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
            background: '#fff',
            transform: 'translateX(-2px)'
          }
        },
        'vertical': {
          pointer: {
            left: '0px',
            top: -(this.props.hsl.h * 100 / 360) + 100 + '%'
          }
        }
      }, { vertical: direction === 'vertical' });

      return _react2.default.createElement(
        'div',
        { style: styles.hue },
        _react2.default.createElement(
          'div',
          {
            className: 'hue-' + direction,
            style: styles.container,
            ref: function ref(container) {
              return _this2.container = container;
            },
            onMouseDown: this.handleMouseDown,
            onTouchMove: this.handleChange,
            onTouchStart: this.handleChange
          },
          _react2.default.createElement(
            'style',
            null,
            '\n            .hue-horizontal {\n              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0\n                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n              background: -webkit-linear-gradient(to right, #f00 0%, #ff0\n                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n            }\n\n            .hue-vertical {\n              background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,\n                #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n              background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,\n                #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n            }\n          '
          ),
          _react2.default.createElement(
            'div',
            { style: styles.pointer },
            this.props.pointer ? _react2.default.createElement(this.props.pointer, this.props) : _react2.default.createElement('div', { style: styles.slider })
          )
        )
      );
    }
  }]);

  return Hue;
}(_react.PureComponent || _react.Component);

exports.default = Hue;

/***/ }),
/* 1061 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculateChange = exports.calculateChange = function calculateChange(e, skip, props, container) {
  e.preventDefault();
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;
  var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (props.direction === 'vertical') {
    var h = void 0;
    if (top < 0) {
      h = 359;
    } else if (top > containerHeight) {
      h = 0;
    } else {
      var percent = -(top * 100 / containerHeight) + 100;
      h = 360 * percent / 100;
    }

    if (props.hsl.h !== h) {
      return {
        h: h,
        s: props.hsl.s,
        l: props.hsl.l,
        a: props.hsl.a,
        source: 'rgb'
      };
    }
  } else {
    var _h = void 0;
    if (left < 0) {
      _h = 0;
    } else if (left > containerWidth) {
      _h = 359;
    } else {
      var _percent = left * 100 / containerWidth;
      _h = 360 * _percent / 100;
    }

    if (props.hsl.h !== _h) {
      return {
        h: _h,
        s: props.hsl.s,
        l: props.hsl.l,
        a: props.hsl.a,
        source: 'rgb'
      };
    }
  }
  return null;
};

/***/ }),
/* 1062 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Raised = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Raised = exports.Raised = function Raised(_ref) {
  var zDepth = _ref.zDepth,
      radius = _ref.radius,
      background = _ref.background,
      children = _ref.children,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      wrap: {
        position: 'relative',
        display: 'inline-block'
      },
      content: {
        position: 'relative'
      },
      bg: {
        absolute: '0px 0px 0px 0px',
        boxShadow: '0 ' + zDepth + 'px ' + zDepth * 4 + 'px rgba(0,0,0,.24)',
        borderRadius: radius,
        background: background
      }
    },
    'zDepth-0': {
      bg: {
        boxShadow: 'none'
      }
    },

    'zDepth-1': {
      bg: {
        boxShadow: '0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)'
      }
    },
    'zDepth-2': {
      bg: {
        boxShadow: '0 6px 20px rgba(0,0,0,.19), 0 8px 17px rgba(0,0,0,.2)'
      }
    },
    'zDepth-3': {
      bg: {
        boxShadow: '0 17px 50px rgba(0,0,0,.19), 0 12px 15px rgba(0,0,0,.24)'
      }
    },
    'zDepth-4': {
      bg: {
        boxShadow: '0 25px 55px rgba(0,0,0,.21), 0 16px 28px rgba(0,0,0,.22)'
      }
    },
    'zDepth-5': {
      bg: {
        boxShadow: '0 40px 77px rgba(0,0,0,.22), 0 27px 24px rgba(0,0,0,.2)'
      }
    },
    'square': {
      bg: {
        borderRadius: '0'
      }
    },
    'circle': {
      bg: {
        borderRadius: '50%'
      }
    }
  }, passedStyles), { 'zDepth-1': zDepth === 1 });

  return _react2.default.createElement(
    'div',
    { style: styles.wrap },
    _react2.default.createElement('div', { style: styles.bg }),
    _react2.default.createElement(
      'div',
      { style: styles.content },
      children
    )
  );
};

Raised.propTypes = {
  background: _propTypes2.default.string,
  zDepth: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5]),
  radius: _propTypes2.default.number,
  styles: _propTypes2.default.object
};

Raised.defaultProps = {
  background: '#fff',
  zDepth: 1,
  radius: 2,
  styles: {}
};

exports.default = Raised;

/***/ }),
/* 1063 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(729),
    assignMergeValue = __webpack_require__(848),
    baseFor = __webpack_require__(821),
    baseMergeDeep = __webpack_require__(1064),
    isObject = __webpack_require__(668),
    keysIn = __webpack_require__(737),
    safeGet = __webpack_require__(849);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),
/* 1064 */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(848),
    cloneBuffer = __webpack_require__(843),
    cloneTypedArray = __webpack_require__(846),
    copyArray = __webpack_require__(844),
    initCloneObject = __webpack_require__(847),
    isArguments = __webpack_require__(775),
    isArray = __webpack_require__(666),
    isArrayLikeObject = __webpack_require__(1065),
    isBuffer = __webpack_require__(726),
    isFunction = __webpack_require__(782),
    isObject = __webpack_require__(668),
    isPlainObject = __webpack_require__(825),
    isTypedArray = __webpack_require__(777),
    safeGet = __webpack_require__(849),
    toPlainObject = __webpack_require__(1066);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),
/* 1065 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(690),
    isObjectLike = __webpack_require__(672);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),
/* 1066 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(712),
    keysIn = __webpack_require__(737);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),
/* 1067 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(1068),
    isIterateeCall = __webpack_require__(1075);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 1068 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(728),
    overRest = __webpack_require__(1069),
    setToString = __webpack_require__(1071);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 1069 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(1070);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 1070 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 1071 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(1072),
    shortOut = __webpack_require__(1074);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 1072 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(1073),
    defineProperty = __webpack_require__(842),
    identity = __webpack_require__(728);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 1073 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 1074 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 1075 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(711),
    isArrayLike = __webpack_require__(690),
    isIndex = __webpack_require__(776),
    isObject = __webpack_require__(668);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 1076 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Saturation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _throttle = __webpack_require__(1077);

var _throttle2 = _interopRequireDefault(_throttle);

var _saturation = __webpack_require__(1080);

var saturation = _interopRequireWildcard(_saturation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Saturation = exports.Saturation = function (_ref) {
  _inherits(Saturation, _ref);

  function Saturation(props) {
    _classCallCheck(this, Saturation);

    var _this = _possibleConstructorReturn(this, (Saturation.__proto__ || Object.getPrototypeOf(Saturation)).call(this, props));

    _this.handleChange = function (e, skip) {
      _this.props.onChange && _this.throttle(_this.props.onChange, saturation.calculateChange(e, skip, _this.props, _this.container), e);
    };

    _this.handleMouseDown = function (e) {
      _this.handleChange(e, true);
      window.addEventListener('mousemove', _this.handleChange);
      window.addEventListener('mouseup', _this.handleMouseUp);
    };

    _this.handleMouseUp = function () {
      _this.unbindEventListeners();
    };

    _this.throttle = (0, _throttle2.default)(function (fn, data, e) {
      fn(data, e);
    }, 50);
    return _this;
  }

  _createClass(Saturation, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.throttle.cancel();
      this.unbindEventListeners();
    }
  }, {
    key: 'unbindEventListeners',
    value: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _ref2 = this.props.style || {},
          color = _ref2.color,
          white = _ref2.white,
          black = _ref2.black,
          pointer = _ref2.pointer,
          circle = _ref2.circle;

      var styles = (0, _reactcss2.default)({
        'default': {
          color: {
            absolute: '0px 0px 0px 0px',
            background: 'hsl(' + this.props.hsl.h + ',100%, 50%)',
            borderRadius: this.props.radius
          },
          white: {
            absolute: '0px 0px 0px 0px',
            borderRadius: this.props.radius
          },
          black: {
            absolute: '0px 0px 0px 0px',
            boxShadow: this.props.shadow,
            borderRadius: this.props.radius
          },
          pointer: {
            position: 'absolute',
            top: -(this.props.hsv.v * 100) + 100 + '%',
            left: this.props.hsv.s * 100 + '%',
            cursor: 'default'
          },
          circle: {
            width: '4px',
            height: '4px',
            boxShadow: '0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),\n            0 0 1px 2px rgba(0,0,0,.4)',
            borderRadius: '50%',
            cursor: 'hand',
            transform: 'translate(-2px, -2px)'
          }
        },
        'custom': {
          color: color,
          white: white,
          black: black,
          pointer: pointer,
          circle: circle
        }
      }, { 'custom': !!this.props.style });

      return _react2.default.createElement(
        'div',
        {
          style: styles.color,
          ref: function ref(container) {
            return _this2.container = container;
          },
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleChange,
          onTouchStart: this.handleChange
        },
        _react2.default.createElement(
          'style',
          null,
          '\n          .saturation-white {\n            background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));\n            background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n          }\n          .saturation-black {\n            background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));\n            background: linear-gradient(to top, #000, rgba(0,0,0,0));\n          }\n        '
        ),
        _react2.default.createElement(
          'div',
          { style: styles.white, className: 'saturation-white' },
          _react2.default.createElement('div', { style: styles.black, className: 'saturation-black' }),
          _react2.default.createElement(
            'div',
            { style: styles.pointer },
            this.props.pointer ? _react2.default.createElement(this.props.pointer, this.props) : _react2.default.createElement('div', { style: styles.circle })
          )
        )
      );
    }
  }]);

  return Saturation;
}(_react.PureComponent || _react.Component);

exports.default = Saturation;

/***/ }),
/* 1077 */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(850),
    isObject = __webpack_require__(668);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),
/* 1078 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(669);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 1079 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(668),
    isSymbol = __webpack_require__(735);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 1080 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculateChange = exports.calculateChange = function calculateChange(e, skip, props, container) {
  e.preventDefault();

  var _container$getBoundin = container.getBoundingClientRect(),
      containerWidth = _container$getBoundin.width,
      containerHeight = _container$getBoundin.height;

  var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  } else if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  var saturation = left * 100 / containerWidth;
  var bright = -(top * 100 / containerHeight) + 100;

  return {
    h: props.hsl.h,
    s: saturation,
    v: bright,
    a: props.hsl.a,
    source: 'rgb'
  };
};

/***/ }),
/* 1081 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1082);


/***/ }),
/* 1082 */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(840),
    baseEach = __webpack_require__(839),
    castFunction = __webpack_require__(824),
    isArray = __webpack_require__(666);

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ }),
/* 1083 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swatch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _interaction = __webpack_require__(1084);

var _Checkboard = __webpack_require__(790);

var _Checkboard2 = _interopRequireDefault(_Checkboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENTER = 13;

var Swatch = exports.Swatch = function Swatch(_ref) {
  var color = _ref.color,
      style = _ref.style,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? function () {} : _ref$onClick,
      onHover = _ref.onHover,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? color : _ref$title,
      children = _ref.children,
      focus = _ref.focus,
      _ref$focusStyle = _ref.focusStyle,
      focusStyle = _ref$focusStyle === undefined ? {} : _ref$focusStyle;

  var transparent = color === 'transparent';
  var styles = (0, _reactcss2.default)({
    default: {
      swatch: _extends({
        background: color,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        outline: 'none'
      }, style, focus ? focusStyle : {})
    }
  });

  var handleClick = function handleClick(e) {
    return onClick(color, e);
  };
  var handleKeyDown = function handleKeyDown(e) {
    return e.keyCode === ENTER && onClick(color, e);
  };
  var handleHover = function handleHover(e) {
    return onHover(color, e);
  };

  var optionalEvents = {};
  if (onHover) {
    optionalEvents.onMouseOver = handleHover;
  }

  return _react2.default.createElement(
    'div',
    _extends({
      style: styles.swatch,
      onClick: handleClick,
      title: title,
      tabIndex: 0,
      onKeyDown: handleKeyDown
    }, optionalEvents),
    children,
    transparent && _react2.default.createElement(_Checkboard2.default, {
      borderRadius: styles.swatch.borderRadius,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
    })
  );
};

exports.default = (0, _interaction.handleFocus)(Swatch);

/***/ }),
/* 1084 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFocus = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-invalid-this */


var handleFocus = exports.handleFocus = function handleFocus(Component) {
  var Span = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'span';
  return function (_React$Component) {
    _inherits(Focus, _React$Component);

    function Focus() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Focus);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Focus.__proto__ || Object.getPrototypeOf(Focus)).call.apply(_ref, [this].concat(args))), _this), _this.state = { focus: false }, _this.handleFocus = function () {
        return _this.setState({ focus: true });
      }, _this.handleBlur = function () {
        return _this.setState({ focus: false });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Focus, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          Span,
          { onFocus: this.handleFocus, onBlur: this.handleBlur },
          _react2.default.createElement(Component, _extends({}, this.props, this.state))
        );
      }
    }]);

    return Focus;
  }(_react2.default.Component);
};

/***/ }),
/* 1085 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlphaPointer = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlphaPointer = exports.AlphaPointer = function AlphaPointer(_ref) {
  var direction = _ref.direction;

  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        transform: 'translate(-9px, -1px)',
        backgroundColor: 'rgb(248, 248, 248)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
      }
    },
    'vertical': {
      picker: {
        transform: 'translate(-3px, -9px)'
      }
    }
  }, { vertical: direction === 'vertical' });

  return _react2.default.createElement('div', { style: styles.picker });
};

exports.default = AlphaPointer;

/***/ }),
/* 1086 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

var _BlockSwatches = __webpack_require__(1087);

var _BlockSwatches2 = _interopRequireDefault(_BlockSwatches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Block = exports.Block = function Block(_ref) {
  var onChange = _ref.onChange,
      onSwatchHover = _ref.onSwatchHover,
      hex = _ref.hex,
      colors = _ref.colors,
      width = _ref.width,
      triangle = _ref.triangle,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var transparent = hex === 'transparent';
  var handleChange = function handleChange(hexCode, e) {
    _color2.default.isValidHex(hexCode) && onChange({
      hex: hexCode,
      source: 'hex'
    }, e);
  };

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      card: {
        width: width,
        background: '#fff',
        boxShadow: '0 1px rgba(0,0,0,.1)',
        borderRadius: '6px',
        position: 'relative'
      },
      head: {
        height: '110px',
        background: hex,
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      },
      body: {
        padding: '10px'
      },
      label: {
        fontSize: '18px',
        color: _color2.default.getContrastingColor(hex),
        position: 'relative'
      },
      triangle: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 10px 10px 10px',
        borderColor: 'transparent transparent ' + hex + ' transparent',
        position: 'absolute',
        top: '-10px',
        left: '50%',
        marginLeft: '-10px'
      },
      input: {
        width: '100%',
        fontSize: '12px',
        color: '#666',
        border: '0px',
        outline: 'none',
        height: '22px',
        boxShadow: 'inset 0 0 0 1px #ddd',
        borderRadius: '4px',
        padding: '0 7px',
        boxSizing: 'border-box'
      }
    },
    'hide-triangle': {
      triangle: {
        display: 'none'
      }
    }
  }, passedStyles), { 'hide-triangle': triangle === 'hide' });

  return _react2.default.createElement(
    'div',
    { style: styles.card, className: 'block-picker ' + className },
    _react2.default.createElement('div', { style: styles.triangle }),
    _react2.default.createElement(
      'div',
      { style: styles.head },
      transparent && _react2.default.createElement(_common.Checkboard, { borderRadius: '6px 6px 0 0' }),
      _react2.default.createElement(
        'div',
        { style: styles.label },
        hex
      )
    ),
    _react2.default.createElement(
      'div',
      { style: styles.body },
      _react2.default.createElement(_BlockSwatches2.default, { colors: colors, onClick: handleChange, onSwatchHover: onSwatchHover }),
      _react2.default.createElement(_common.EditableInput, {
        style: { input: styles.input },
        value: hex,
        onChange: handleChange
      })
    )
  );
};

Block.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  triangle: _propTypes2.default.oneOf(['top', 'hide']),
  styles: _propTypes2.default.object
};

Block.defaultProps = {
  width: 170,
  colors: ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8'],
  triangle: 'top',
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Block);

/***/ }),
/* 1087 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockSwatches = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = __webpack_require__(675);

var _map2 = _interopRequireDefault(_map);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockSwatches = exports.BlockSwatches = function BlockSwatches(_ref) {
  var colors = _ref.colors,
      onClick = _ref.onClick,
      onSwatchHover = _ref.onSwatchHover;

  var styles = (0, _reactcss2.default)({
    'default': {
      swatches: {
        marginRight: '-10px'
      },
      swatch: {
        width: '22px',
        height: '22px',
        float: 'left',
        marginRight: '10px',
        marginBottom: '10px',
        borderRadius: '4px'
      },
      clear: {
        clear: 'both'
      }
    }
  });

  return _react2.default.createElement(
    'div',
    { style: styles.swatches },
    (0, _map2.default)(colors, function (c) {
      return _react2.default.createElement(_common.Swatch, {
        key: c,
        color: c,
        style: styles.swatch,
        onClick: onClick,
        onHover: onSwatchHover,
        focusStyle: {
          boxShadow: '0 0 4px ' + c
        }
      });
    }),
    _react2.default.createElement('div', { style: styles.clear })
  );
};

exports.default = BlockSwatches;

/***/ }),
/* 1088 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = __webpack_require__(675);

var _map2 = _interopRequireDefault(_map);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _materialColors = __webpack_require__(852);

var material = _interopRequireWildcard(_materialColors);

var _common = __webpack_require__(662);

var _CircleSwatch = __webpack_require__(1089);

var _CircleSwatch2 = _interopRequireDefault(_CircleSwatch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Circle = exports.Circle = function Circle(_ref) {
  var width = _ref.width,
      onChange = _ref.onChange,
      onSwatchHover = _ref.onSwatchHover,
      colors = _ref.colors,
      hex = _ref.hex,
      circleSize = _ref.circleSize,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      circleSpacing = _ref.circleSpacing,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      card: {
        width: width,
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: -circleSpacing,
        marginBottom: -circleSpacing
      }
    }
  }, passedStyles));

  var handleChange = function handleChange(hexCode, e) {
    return onChange({ hex: hexCode, source: 'hex' }, e);
  };

  return _react2.default.createElement(
    'div',
    { style: styles.card, className: 'circle-picker ' + className },
    (0, _map2.default)(colors, function (c) {
      return _react2.default.createElement(_CircleSwatch2.default, {
        key: c,
        color: c,
        onClick: handleChange,
        onSwatchHover: onSwatchHover,
        active: hex === c.toLowerCase(),
        circleSize: circleSize,
        circleSpacing: circleSpacing
      });
    })
  );
};

Circle.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  circleSize: _propTypes2.default.number,
  circleSpacing: _propTypes2.default.number,
  styles: _propTypes2.default.object
};

Circle.defaultProps = {
  width: 252,
  circleSize: 28,
  circleSpacing: 14,
  colors: [material.red['500'], material.pink['500'], material.purple['500'], material.deepPurple['500'], material.indigo['500'], material.blue['500'], material.lightBlue['500'], material.cyan['500'], material.teal['500'], material.green['500'], material.lightGreen['500'], material.lime['500'], material.yellow['500'], material.amber['500'], material.orange['500'], material.deepOrange['500'], material.brown['500'], material.blueGrey['500']],
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Circle);

/***/ }),
/* 1089 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleSwatch = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CircleSwatch = exports.CircleSwatch = function CircleSwatch(_ref) {
  var color = _ref.color,
      onClick = _ref.onClick,
      onSwatchHover = _ref.onSwatchHover,
      hover = _ref.hover,
      active = _ref.active,
      circleSize = _ref.circleSize,
      circleSpacing = _ref.circleSpacing;

  var styles = (0, _reactcss2.default)({
    'default': {
      swatch: {
        width: circleSize,
        height: circleSize,
        marginRight: circleSpacing,
        marginBottom: circleSpacing,
        transform: 'scale(1)',
        transition: '100ms transform ease'
      },
      Swatch: {
        borderRadius: '50%',
        background: 'transparent',
        boxShadow: 'inset 0 0 0 ' + circleSize / 2 + 'px ' + color,
        transition: '100ms box-shadow ease'
      }
    },
    'hover': {
      swatch: {
        transform: 'scale(1.2)'
      }
    },
    'active': {
      Swatch: {
        boxShadow: 'inset 0 0 0 3px ' + color
      }
    }
  }, { hover: hover, active: active });

  return _react2.default.createElement(
    'div',
    { style: styles.swatch },
    _react2.default.createElement(_common.Swatch, {
      style: styles.Swatch,
      color: color,
      onClick: onClick,
      onHover: onSwatchHover,
      focusStyle: { boxShadow: styles.Swatch.boxShadow + ', 0 0 5px ' + color }
    })
  );
};

CircleSwatch.defaultProps = {
  circleSize: 28,
  circleSpacing: 14
};

exports.default = (0, _reactcss.handleHover)(CircleSwatch);

/***/ }),
/* 1090 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chrome = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _common = __webpack_require__(662);

var _ChromeFields = __webpack_require__(1091);

var _ChromeFields2 = _interopRequireDefault(_ChromeFields);

var _ChromePointer = __webpack_require__(1093);

var _ChromePointer2 = _interopRequireDefault(_ChromePointer);

var _ChromePointerCircle = __webpack_require__(1094);

var _ChromePointerCircle2 = _interopRequireDefault(_ChromePointerCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chrome = exports.Chrome = function Chrome(_ref) {
  var onChange = _ref.onChange,
      disableAlpha = _ref.disableAlpha,
      rgb = _ref.rgb,
      hsl = _ref.hsl,
      hsv = _ref.hsv,
      hex = _ref.hex,
      renderers = _ref.renderers,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      picker: {
        background: '#fff',
        borderRadius: '2px',
        boxShadow: '0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)',
        boxSizing: 'initial',
        width: '225px',
        fontFamily: 'Menlo'
      },
      saturation: {
        width: '100%',
        paddingBottom: '55%',
        position: 'relative',
        borderRadius: '2px 2px 0 0',
        overflow: 'hidden'
      },
      Saturation: {
        radius: '2px 2px 0 0'
      },
      body: {
        padding: '16px 16px 12px'
      },
      controls: {
        display: 'flex'
      },
      color: {
        width: '32px'
      },
      swatch: {
        marginTop: '6px',
        width: '16px',
        height: '16px',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden'
      },
      active: {
        absolute: '0px 0px 0px 0px',
        borderRadius: '8px',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
        background: 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + rgb.a + ')',
        zIndex: '2'
      },
      toggles: {
        flex: '1'
      },
      hue: {
        height: '10px',
        position: 'relative',
        marginBottom: '8px'
      },
      Hue: {
        radius: '2px'
      },
      alpha: {
        height: '10px',
        position: 'relative'
      },
      Alpha: {
        radius: '2px'
      }
    },
    'disableAlpha': {
      color: {
        width: '22px'
      },
      alpha: {
        display: 'none'
      },
      hue: {
        marginBottom: '0px'
      },
      swatch: {
        width: '10px',
        height: '10px',
        marginTop: '0px'
      }
    }
  }, passedStyles), { disableAlpha: disableAlpha });

  return _react2.default.createElement(
    'div',
    { style: styles.picker, className: 'chrome-picker ' + className },
    _react2.default.createElement(
      'div',
      { style: styles.saturation },
      _react2.default.createElement(_common.Saturation, {
        style: styles.Saturation,
        hsl: hsl,
        hsv: hsv,
        pointer: _ChromePointerCircle2.default,
        onChange: onChange
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.body },
      _react2.default.createElement(
        'div',
        { style: styles.controls, className: 'flexbox-fix' },
        _react2.default.createElement(
          'div',
          { style: styles.color },
          _react2.default.createElement(
            'div',
            { style: styles.swatch },
            _react2.default.createElement('div', { style: styles.active }),
            _react2.default.createElement(_common.Checkboard, { renderers: renderers })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.toggles },
          _react2.default.createElement(
            'div',
            { style: styles.hue },
            _react2.default.createElement(_common.Hue, {
              style: styles.Hue,
              hsl: hsl,
              pointer: _ChromePointer2.default,
              onChange: onChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.alpha },
            _react2.default.createElement(_common.Alpha, {
              style: styles.Alpha,
              rgb: rgb,
              hsl: hsl,
              pointer: _ChromePointer2.default,
              renderers: renderers,
              onChange: onChange
            })
          )
        )
      ),
      _react2.default.createElement(_ChromeFields2.default, {
        rgb: rgb,
        hsl: hsl,
        hex: hex,
        onChange: onChange,
        disableAlpha: disableAlpha
      })
    )
  );
};

Chrome.propTypes = {
  disableAlpha: _propTypes2.default.bool,
  styles: _propTypes2.default.object
};

Chrome.defaultProps = {
  disableAlpha: false,
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Chrome);

/***/ }),
/* 1091 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChromeFields = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

var _UnfoldMoreHorizontalIcon = __webpack_require__(1092);

var _UnfoldMoreHorizontalIcon2 = _interopRequireDefault(_UnfoldMoreHorizontalIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-did-mount-set-state, no-param-reassign */

var ChromeFields = exports.ChromeFields = function (_React$Component) {
  _inherits(ChromeFields, _React$Component);

  function ChromeFields() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ChromeFields);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChromeFields.__proto__ || Object.getPrototypeOf(ChromeFields)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      view: ''
    }, _this.toggleViews = function () {
      if (_this.state.view === 'hex') {
        _this.setState({ view: 'rgb' });
      } else if (_this.state.view === 'rgb') {
        _this.setState({ view: 'hsl' });
      } else if (_this.state.view === 'hsl') {
        if (_this.props.hsl.a === 1) {
          _this.setState({ view: 'hex' });
        } else {
          _this.setState({ view: 'rgb' });
        }
      }
    }, _this.handleChange = function (data, e) {
      if (data.hex) {
        _color2.default.isValidHex(data.hex) && _this.props.onChange({
          hex: data.hex,
          source: 'hex'
        }, e);
      } else if (data.r || data.g || data.b) {
        _this.props.onChange({
          r: data.r || _this.props.rgb.r,
          g: data.g || _this.props.rgb.g,
          b: data.b || _this.props.rgb.b,
          source: 'rgb'
        }, e);
      } else if (data.a) {
        if (data.a < 0) {
          data.a = 0;
        } else if (data.a > 1) {
          data.a = 1;
        }

        _this.props.onChange({
          h: _this.props.hsl.h,
          s: _this.props.hsl.s,
          l: _this.props.hsl.l,
          a: Math.round(data.a * 100) / 100,
          source: 'rgb'
        }, e);
      } else if (data.h || data.s || data.l) {
        // Remove any occurances of '%'.
        if (typeof data.s === 'string' && data.s.includes('%')) {
          data.s = data.s.replace('%', '');
        }
        if (typeof data.l === 'string' && data.l.includes('%')) {
          data.l = data.l.replace('%', '');
        }

        _this.props.onChange({
          h: data.h || _this.props.hsl.h,
          s: Number(data.s && data.s || _this.props.hsl.s),
          l: Number(data.l && data.l || _this.props.hsl.l),
          source: 'hsl'
        }, e);
      }
    }, _this.showHighlight = function (e) {
      e.currentTarget.style.background = '#eee';
    }, _this.hideHighlight = function (e) {
      e.currentTarget.style.background = 'transparent';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChromeFields, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.hsl.a === 1 && this.state.view !== 'hex') {
        this.setState({ view: 'hex' });
      } else if (this.state.view !== 'rgb' && this.state.view !== 'hsl') {
        this.setState({ view: 'rgb' });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.hsl.a !== 1 && this.state.view === 'hex') {
        this.setState({ view: 'rgb' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = (0, _reactcss2.default)({
        'default': {
          wrap: {
            paddingTop: '16px',
            display: 'flex'
          },
          fields: {
            flex: '1',
            display: 'flex',
            marginLeft: '-6px'
          },
          field: {
            paddingLeft: '6px',
            width: '100%'
          },
          alpha: {
            paddingLeft: '6px',
            width: '100%'
          },
          toggle: {
            width: '32px',
            textAlign: 'right',
            position: 'relative'
          },
          icon: {
            marginRight: '-4px',
            marginTop: '12px',
            cursor: 'pointer',
            position: 'relative'
          },
          iconHighlight: {
            position: 'absolute',
            width: '24px',
            height: '28px',
            background: '#eee',
            borderRadius: '4px',
            top: '10px',
            left: '12px',
            display: 'none'
          },
          input: {
            fontSize: '11px',
            color: '#333',
            width: '100%',
            borderRadius: '2px',
            border: 'none',
            boxShadow: 'inset 0 0 0 1px #dadada',
            height: '21px',
            textAlign: 'center'
          },
          label: {
            textTransform: 'uppercase',
            fontSize: '11px',
            lineHeight: '11px',
            color: '#969696',
            textAlign: 'center',
            display: 'block',
            marginTop: '12px'
          },
          svg: {
            fill: '#333',
            width: '24px',
            height: '24px',
            border: '1px transparent solid',
            borderRadius: '5px'
          }
        },
        'disableAlpha': {
          alpha: {
            display: 'none'
          }
        }
      }, this.props, this.state);

      var fields = void 0;
      if (this.state.view === 'hex') {
        fields = _react2.default.createElement(
          'div',
          { style: styles.fields, className: 'flexbox-fix' },
          _react2.default.createElement(
            'div',
            { style: styles.field },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'hex', value: this.props.hex,
              onChange: this.handleChange
            })
          )
        );
      } else if (this.state.view === 'rgb') {
        fields = _react2.default.createElement(
          'div',
          { style: styles.fields, className: 'flexbox-fix' },
          _react2.default.createElement(
            'div',
            { style: styles.field },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'r',
              value: this.props.rgb.r,
              onChange: this.handleChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.field },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'g',
              value: this.props.rgb.g,
              onChange: this.handleChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.field },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'b',
              value: this.props.rgb.b,
              onChange: this.handleChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.alpha },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'a',
              value: this.props.rgb.a,
              arrowOffset: 0.01,
              onChange: this.handleChange
            })
          )
        );
      } else if (this.state.view === 'hsl') {
        fields = _react2.default.createElement(
          'div',
          { style: styles.fields, className: 'flexbox-fix' },
          _react2.default.createElement(
            'div',
            { style: styles.field },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'h',
              value: Math.round(this.props.hsl.h),
              onChange: this.handleChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.field },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 's',
              value: Math.round(this.props.hsl.s * 100) + '%',
              onChange: this.handleChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.field },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'l',
              value: Math.round(this.props.hsl.l * 100) + '%',
              onChange: this.handleChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.alpha },
            _react2.default.createElement(_common.EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: 'a',
              value: this.props.hsl.a,
              arrowOffset: 0.01,
              onChange: this.handleChange
            })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { style: styles.wrap, className: 'flexbox-fix' },
        fields,
        _react2.default.createElement(
          'div',
          { style: styles.toggle },
          _react2.default.createElement(
            'div',
            { style: styles.icon, onClick: this.toggleViews, ref: function ref(icon) {
                return _this2.icon = icon;
              } },
            _react2.default.createElement(_UnfoldMoreHorizontalIcon2.default, {
              style: styles.svg,
              onMouseOver: this.showHighlight,
              onMouseEnter: this.showHighlight,
              onMouseOut: this.hideHighlight
            })
          )
        )
      );
    }
  }]);

  return ChromeFields;
}(_react2.default.Component);

exports.default = ChromeFields;

/***/ }),
/* 1092 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DEFAULT_SIZE = 24;

exports.default = function (_ref) {
  var _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'currentColor' : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? DEFAULT_SIZE : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? DEFAULT_SIZE : _ref$height,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      props = _objectWithoutProperties(_ref, ['fill', 'width', 'height', 'style']);

  return _react2.default.createElement(
    'svg',
    _extends({
      viewBox: '0 0 ' + DEFAULT_SIZE + ' ' + DEFAULT_SIZE,
      style: _extends({ fill: fill, width: width, height: height }, style)
    }, props),
    _react2.default.createElement('path', { d: 'M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z' })
  );
};

/***/ }),
/* 1093 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChromePointer = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChromePointer = exports.ChromePointer = function ChromePointer() {
  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        width: '12px',
        height: '12px',
        borderRadius: '6px',
        transform: 'translate(-6px, -1px)',
        backgroundColor: 'rgb(248, 248, 248)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  });

  return _react2.default.createElement('div', { style: styles.picker });
};

exports.default = ChromePointer;

/***/ }),
/* 1094 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChromePointerCircle = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChromePointerCircle = exports.ChromePointerCircle = function ChromePointerCircle() {
  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        width: '12px',
        height: '12px',
        borderRadius: '6px',
        boxShadow: 'inset 0 0 0 1px #fff',
        transform: 'translate(-6px, -6px)'
      }
    }
  });

  return _react2.default.createElement('div', { style: styles.picker });
};

exports.default = ChromePointerCircle;

/***/ }),
/* 1095 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compact = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = __webpack_require__(675);

var _map2 = _interopRequireDefault(_map);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

var _CompactColor = __webpack_require__(1096);

var _CompactColor2 = _interopRequireDefault(_CompactColor);

var _CompactFields = __webpack_require__(1097);

var _CompactFields2 = _interopRequireDefault(_CompactFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Compact = exports.Compact = function Compact(_ref) {
  var onChange = _ref.onChange,
      onSwatchHover = _ref.onSwatchHover,
      colors = _ref.colors,
      hex = _ref.hex,
      rgb = _ref.rgb,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      Compact: {
        background: '#f6f6f6',
        radius: '4px'
      },
      compact: {
        paddingTop: '5px',
        paddingLeft: '5px',
        boxSizing: 'initial',
        width: '240px'
      },
      clear: {
        clear: 'both'
      }
    }
  }, passedStyles));

  var handleChange = function handleChange(data, e) {
    if (data.hex) {
      _color2.default.isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: 'hex'
      }, e);
    } else {
      onChange(data, e);
    }
  };

  return _react2.default.createElement(
    _common.Raised,
    { style: styles.Compact, styles: passedStyles },
    _react2.default.createElement(
      'div',
      { style: styles.compact, className: 'compact-picker ' + className },
      _react2.default.createElement(
        'div',
        null,
        (0, _map2.default)(colors, function (c) {
          return _react2.default.createElement(_CompactColor2.default, {
            key: c,
            color: c,
            active: c.toLowerCase() === hex,
            onClick: handleChange,
            onSwatchHover: onSwatchHover
          });
        }),
        _react2.default.createElement('div', { style: styles.clear })
      ),
      _react2.default.createElement(_CompactFields2.default, { hex: hex, rgb: rgb, onChange: handleChange })
    )
  );
};

Compact.propTypes = {
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  styles: _propTypes2.default.object
};

Compact.defaultProps = {
  colors: ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'],
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Compact);

/***/ }),
/* 1096 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompactColor = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CompactColor = exports.CompactColor = function CompactColor(_ref) {
  var color = _ref.color,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? function () {} : _ref$onClick,
      onSwatchHover = _ref.onSwatchHover,
      active = _ref.active;

  var styles = (0, _reactcss2.default)({
    'default': {
      color: {
        background: color,
        width: '15px',
        height: '15px',
        float: 'left',
        marginRight: '5px',
        marginBottom: '5px',
        position: 'relative',
        cursor: 'pointer'
      },
      dot: {
        absolute: '5px 5px 5px 5px',
        background: _color2.default.getContrastingColor(color),
        borderRadius: '50%',
        opacity: '0'
      }
    },
    'active': {
      dot: {
        opacity: '1'
      }
    },
    'color-#FFFFFF': {
      color: {
        boxShadow: 'inset 0 0 0 1px #ddd'
      },
      dot: {
        background: '#000'
      }
    },
    'transparent': {
      dot: {
        background: '#000'
      }
    }
  }, { active: active, 'color-#FFFFFF': color === '#FFFFFF', 'transparent': color === 'transparent' });

  return _react2.default.createElement(
    _common.Swatch,
    {
      style: styles.color,
      color: color,
      onClick: onClick,
      onHover: onSwatchHover,
      focusStyle: { boxShadow: '0 0 4px ' + color }
    },
    _react2.default.createElement('div', { style: styles.dot })
  );
};

exports.default = CompactColor;

/***/ }),
/* 1097 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompactFields = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CompactFields = exports.CompactFields = function CompactFields(_ref) {
  var hex = _ref.hex,
      rgb = _ref.rgb,
      onChange = _ref.onChange;

  var styles = (0, _reactcss2.default)({
    'default': {
      fields: {
        display: 'flex',
        paddingBottom: '6px',
        paddingRight: '5px',
        position: 'relative'
      },
      active: {
        position: 'absolute',
        top: '6px',
        left: '5px',
        height: '9px',
        width: '9px',
        background: hex
      },
      HEXwrap: {
        flex: '6',
        position: 'relative'
      },
      HEXinput: {
        width: '80%',
        padding: '0px',
        paddingLeft: '20%',
        border: 'none',
        outline: 'none',
        background: 'none',
        fontSize: '12px',
        color: '#333',
        height: '16px'
      },
      HEXlabel: {
        display: 'none'
      },
      RGBwrap: {
        flex: '3',
        position: 'relative'
      },
      RGBinput: {
        width: '70%',
        padding: '0px',
        paddingLeft: '30%',
        border: 'none',
        outline: 'none',
        background: 'none',
        fontSize: '12px',
        color: '#333',
        height: '16px'
      },
      RGBlabel: {
        position: 'absolute',
        top: '3px',
        left: '0px',
        lineHeight: '16px',
        textTransform: 'uppercase',
        fontSize: '12px',
        color: '#999'
      }
    }
  });

  var handleChange = function handleChange(data, e) {
    if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb'
      }, e);
    } else {
      onChange({
        hex: data.hex,
        source: 'hex'
      }, e);
    }
  };

  return _react2.default.createElement(
    'div',
    { style: styles.fields, className: 'flexbox-fix' },
    _react2.default.createElement('div', { style: styles.active }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel },
      label: 'hex',
      value: hex,
      onChange: handleChange
    }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'r',
      value: rgb.r,
      onChange: handleChange
    }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'g',
      value: rgb.g,
      onChange: handleChange
    }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'b',
      value: rgb.b,
      onChange: handleChange
    })
  );
};

exports.default = CompactFields;

/***/ }),
/* 1098 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Github = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = __webpack_require__(675);

var _map2 = _interopRequireDefault(_map);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _common = __webpack_require__(662);

var _GithubSwatch = __webpack_require__(1099);

var _GithubSwatch2 = _interopRequireDefault(_GithubSwatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Github = exports.Github = function Github(_ref) {
  var width = _ref.width,
      colors = _ref.colors,
      onChange = _ref.onChange,
      onSwatchHover = _ref.onSwatchHover,
      triangle = _ref.triangle,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      card: {
        width: width,
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.2)',
        boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
        borderRadius: '4px',
        position: 'relative',
        padding: '5px',
        display: 'flex',
        flexWrap: 'wrap'
      },
      triangle: {
        position: 'absolute',
        border: '7px solid transparent',
        borderBottomColor: '#fff'
      },
      triangleShadow: {
        position: 'absolute',
        border: '8px solid transparent',
        borderBottomColor: 'rgba(0,0,0,0.15)'
      }
    },
    'hide-triangle': {
      triangle: {
        display: 'none'
      },
      triangleShadow: {
        display: 'none'
      }
    },
    'top-left-triangle': {
      triangle: {
        top: '-14px',
        left: '10px'
      },
      triangleShadow: {
        top: '-16px',
        left: '9px'
      }
    },
    'top-right-triangle': {
      triangle: {
        top: '-14px',
        right: '10px'
      },
      triangleShadow: {
        top: '-16px',
        right: '9px'
      }
    },
    'bottom-left-triangle': {
      triangle: {
        top: '35px',
        left: '10px',
        transform: 'rotate(180deg)'
      },
      triangleShadow: {
        top: '37px',
        left: '9px',
        transform: 'rotate(180deg)'
      }
    },
    'bottom-right-triangle': {
      triangle: {
        top: '35px',
        right: '10px',
        transform: 'rotate(180deg)'
      },
      triangleShadow: {
        top: '37px',
        right: '9px',
        transform: 'rotate(180deg)'
      }
    }
  }, passedStyles), {
    'hide-triangle': triangle === 'hide',
    'top-left-triangle': triangle === 'top-left',
    'top-right-triangle': triangle === 'top-right',
    'bottom-left-triangle': triangle == 'bottom-left',
    'bottom-right-triangle': triangle === 'bottom-right'
  });

  var handleChange = function handleChange(hex, e) {
    return onChange({ hex: hex, source: 'hex' }, e);
  };

  return _react2.default.createElement(
    'div',
    { style: styles.card, className: 'github-picker ' + className },
    _react2.default.createElement('div', { style: styles.triangleShadow }),
    _react2.default.createElement('div', { style: styles.triangle }),
    (0, _map2.default)(colors, function (c) {
      return _react2.default.createElement(_GithubSwatch2.default, {
        color: c,
        key: c,
        onClick: handleChange,
        onSwatchHover: onSwatchHover
      });
    })
  );
};

Github.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  triangle: _propTypes2.default.oneOf(['hide', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
  styles: _propTypes2.default.object
};

Github.defaultProps = {
  width: 200,
  colors: ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'],
  triangle: 'top-left',
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Github);

/***/ }),
/* 1099 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GithubSwatch = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GithubSwatch = exports.GithubSwatch = function GithubSwatch(_ref) {
  var hover = _ref.hover,
      color = _ref.color,
      onClick = _ref.onClick,
      onSwatchHover = _ref.onSwatchHover;

  var hoverSwatch = {
    position: 'relative',
    zIndex: '2',
    outline: '2px solid #fff',
    boxShadow: '0 0 5px 2px rgba(0,0,0,0.25)'
  };

  var styles = (0, _reactcss2.default)({
    'default': {
      swatch: {
        width: '25px',
        height: '25px',
        fontSize: '0'
      }
    },
    'hover': {
      swatch: hoverSwatch
    }
  }, { hover: hover });

  return _react2.default.createElement(
    'div',
    { style: styles.swatch },
    _react2.default.createElement(_common.Swatch, {
      color: color,
      onClick: onClick,
      onHover: onSwatchHover,
      focusStyle: hoverSwatch
    })
  );
};

exports.default = (0, _reactcss.handleHover)(GithubSwatch);

/***/ }),
/* 1100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HuePicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _common = __webpack_require__(662);

var _HuePointer = __webpack_require__(1101);

var _HuePointer2 = _interopRequireDefault(_HuePointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HuePicker = exports.HuePicker = function HuePicker(_ref) {
  var width = _ref.width,
      height = _ref.height,
      onChange = _ref.onChange,
      hsl = _ref.hsl,
      direction = _ref.direction,
      pointer = _ref.pointer,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      picker: {
        position: 'relative',
        width: width,
        height: height
      },
      hue: {
        radius: '2px'
      }
    }
  }, passedStyles));

  // Overwrite to provide pure hue color
  var handleChange = function handleChange(data) {
    return onChange({ a: 1, h: data.h, l: 0.5, s: 1 });
  };

  return _react2.default.createElement(
    'div',
    { style: styles.picker, className: 'hue-picker ' + className },
    _react2.default.createElement(_common.Hue, _extends({}, styles.hue, {
      hsl: hsl,
      pointer: pointer,
      onChange: handleChange,
      direction: direction
    }))
  );
};

HuePicker.propTypes = {
  styles: _propTypes2.default.object
};
HuePicker.defaultProps = {
  width: '316px',
  height: '16px',
  direction: 'horizontal',
  pointer: _HuePointer2.default,
  styles: {}
};

exports.default = (0, _common.ColorWrap)(HuePicker);

/***/ }),
/* 1101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderPointer = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderPointer = exports.SliderPointer = function SliderPointer(_ref) {
  var direction = _ref.direction;

  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        transform: 'translate(-9px, -1px)',
        backgroundColor: 'rgb(248, 248, 248)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
      }
    },
    'vertical': {
      picker: {
        transform: 'translate(-3px, -9px)'
      }
    }
  }, { vertical: direction === 'vertical' });

  return _react2.default.createElement('div', { style: styles.picker });
};

exports.default = SliderPointer;

/***/ }),
/* 1102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Material = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Material = exports.Material = function Material(_ref) {
  var onChange = _ref.onChange,
      hex = _ref.hex,
      rgb = _ref.rgb,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      material: {
        width: '98px',
        height: '98px',
        padding: '16px',
        fontFamily: 'Roboto'
      },
      HEXwrap: {
        position: 'relative'
      },
      HEXinput: {
        width: '100%',
        marginTop: '12px',
        fontSize: '15px',
        color: '#333',
        padding: '0px',
        border: '0px',
        borderBottom: '2px solid ' + hex,
        outline: 'none',
        height: '30px'
      },
      HEXlabel: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        fontSize: '11px',
        color: '#999999',
        textTransform: 'capitalize'
      },
      Hex: {
        style: {}
      },
      RGBwrap: {
        position: 'relative'
      },
      RGBinput: {
        width: '100%',
        marginTop: '12px',
        fontSize: '15px',
        color: '#333',
        padding: '0px',
        border: '0px',
        borderBottom: '1px solid #eee',
        outline: 'none',
        height: '30px'
      },
      RGBlabel: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        fontSize: '11px',
        color: '#999999',
        textTransform: 'capitalize'
      },
      split: {
        display: 'flex',
        marginRight: '-10px',
        paddingTop: '11px'
      },
      third: {
        flex: '1',
        paddingRight: '10px'
      }
    }
  }, passedStyles));

  var handleChange = function handleChange(data, e) {
    if (data.hex) {
      _color2.default.isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: 'hex'
      }, e);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb'
      }, e);
    }
  };

  return _react2.default.createElement(
    _common.Raised,
    { styles: passedStyles },
    _react2.default.createElement(
      'div',
      { style: styles.material, className: 'material-picker ' + className },
      _react2.default.createElement(_common.EditableInput, {
        style: { wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel },
        label: 'hex',
        value: hex,
        onChange: handleChange
      }),
      _react2.default.createElement(
        'div',
        { style: styles.split, className: 'flexbox-fix' },
        _react2.default.createElement(
          'div',
          { style: styles.third },
          _react2.default.createElement(_common.EditableInput, {
            style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
            label: 'r', value: rgb.r,
            onChange: handleChange
          })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.third },
          _react2.default.createElement(_common.EditableInput, {
            style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
            label: 'g',
            value: rgb.g,
            onChange: handleChange
          })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.third },
          _react2.default.createElement(_common.EditableInput, {
            style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
            label: 'b',
            value: rgb.b,
            onChange: handleChange
          })
        )
      )
    )
  );
};

exports.default = (0, _common.ColorWrap)(Material);

/***/ }),
/* 1103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Photoshop = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _common = __webpack_require__(662);

var _PhotoshopFields = __webpack_require__(1104);

var _PhotoshopFields2 = _interopRequireDefault(_PhotoshopFields);

var _PhotoshopPointerCircle = __webpack_require__(1105);

var _PhotoshopPointerCircle2 = _interopRequireDefault(_PhotoshopPointerCircle);

var _PhotoshopPointer = __webpack_require__(1106);

var _PhotoshopPointer2 = _interopRequireDefault(_PhotoshopPointer);

var _PhotoshopButton = __webpack_require__(1107);

var _PhotoshopButton2 = _interopRequireDefault(_PhotoshopButton);

var _PhotoshopPreviews = __webpack_require__(1108);

var _PhotoshopPreviews2 = _interopRequireDefault(_PhotoshopPreviews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photoshop = exports.Photoshop = function (_React$Component) {
  _inherits(Photoshop, _React$Component);

  function Photoshop(props) {
    _classCallCheck(this, Photoshop);

    var _this = _possibleConstructorReturn(this, (Photoshop.__proto__ || Object.getPrototypeOf(Photoshop)).call(this));

    _this.state = {
      currentColor: props.hex
    };
    return _this;
  }

  _createClass(Photoshop, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$styles = _props.styles,
          passedStyles = _props$styles === undefined ? {} : _props$styles,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className;

      var styles = (0, _reactcss2.default)((0, _merge2.default)({
        'default': {
          picker: {
            background: '#DCDCDC',
            borderRadius: '4px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)',
            boxSizing: 'initial',
            width: '513px'
          },
          head: {
            backgroundImage: 'linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)',
            borderBottom: '1px solid #B1B1B1',
            boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)',
            height: '23px',
            lineHeight: '24px',
            borderRadius: '4px 4px 0 0',
            fontSize: '13px',
            color: '#4D4D4D',
            textAlign: 'center'
          },
          body: {
            padding: '15px 15px 0',
            display: 'flex'
          },
          saturation: {
            width: '256px',
            height: '256px',
            position: 'relative',
            border: '2px solid #B3B3B3',
            borderBottom: '2px solid #F0F0F0',
            overflow: 'hidden'
          },
          hue: {
            position: 'relative',
            height: '256px',
            width: '19px',
            marginLeft: '10px',
            border: '2px solid #B3B3B3',
            borderBottom: '2px solid #F0F0F0'
          },
          controls: {
            width: '180px',
            marginLeft: '10px'
          },
          top: {
            display: 'flex'
          },
          previews: {
            width: '60px'
          },
          actions: {
            flex: '1',
            marginLeft: '20px'
          }
        }
      }, passedStyles));

      return _react2.default.createElement(
        'div',
        { style: styles.picker, className: 'photoshop-picker ' + className },
        _react2.default.createElement(
          'div',
          { style: styles.head },
          this.props.header
        ),
        _react2.default.createElement(
          'div',
          { style: styles.body, className: 'flexbox-fix' },
          _react2.default.createElement(
            'div',
            { style: styles.saturation },
            _react2.default.createElement(_common.Saturation, {
              hsl: this.props.hsl,
              hsv: this.props.hsv,
              pointer: _PhotoshopPointerCircle2.default,
              onChange: this.props.onChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.hue },
            _react2.default.createElement(_common.Hue, {
              direction: 'vertical',
              hsl: this.props.hsl,
              pointer: _PhotoshopPointer2.default,
              onChange: this.props.onChange
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.controls },
            _react2.default.createElement(
              'div',
              { style: styles.top, className: 'flexbox-fix' },
              _react2.default.createElement(
                'div',
                { style: styles.previews },
                _react2.default.createElement(_PhotoshopPreviews2.default, {
                  rgb: this.props.rgb,
                  currentColor: this.state.currentColor
                })
              ),
              _react2.default.createElement(
                'div',
                { style: styles.actions },
                _react2.default.createElement(_PhotoshopButton2.default, { label: 'OK', onClick: this.props.onAccept, active: true }),
                _react2.default.createElement(_PhotoshopButton2.default, { label: 'Cancel', onClick: this.props.onCancel }),
                _react2.default.createElement(_PhotoshopFields2.default, {
                  onChange: this.props.onChange,
                  rgb: this.props.rgb,
                  hsv: this.props.hsv,
                  hex: this.props.hex
                })
              )
            )
          )
        )
      );
    }
  }]);

  return Photoshop;
}(_react2.default.Component);

Photoshop.propTypes = {
  header: _propTypes2.default.string,
  styles: _propTypes2.default.object
};

Photoshop.defaultProps = {
  header: 'Color Picker',
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Photoshop);

/***/ }),
/* 1104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoshopPicker = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotoshopPicker = exports.PhotoshopPicker = function PhotoshopPicker(_ref) {
  var onChange = _ref.onChange,
      rgb = _ref.rgb,
      hsv = _ref.hsv,
      hex = _ref.hex;

  var styles = (0, _reactcss2.default)({
    'default': {
      fields: {
        paddingTop: '5px',
        paddingBottom: '9px',
        width: '80px',
        position: 'relative'
      },
      divider: {
        height: '5px'
      },
      RGBwrap: {
        position: 'relative'
      },
      RGBinput: {
        marginLeft: '40%',
        width: '40%',
        height: '18px',
        border: '1px solid #888888',
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC',
        marginBottom: '5px',
        fontSize: '13px',
        paddingLeft: '3px',
        marginRight: '10px'
      },
      RGBlabel: {
        left: '0px',
        width: '34px',
        textTransform: 'uppercase',
        fontSize: '13px',
        height: '18px',
        lineHeight: '22px',
        position: 'absolute'
      },
      HEXwrap: {
        position: 'relative'
      },
      HEXinput: {
        marginLeft: '20%',
        width: '80%',
        height: '18px',
        border: '1px solid #888888',
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC',
        marginBottom: '6px',
        fontSize: '13px',
        paddingLeft: '3px'
      },
      HEXlabel: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '14px',
        textTransform: 'uppercase',
        fontSize: '13px',
        height: '18px',
        lineHeight: '22px'
      },
      fieldSymbols: {
        position: 'absolute',
        top: '5px',
        right: '-7px',
        fontSize: '13px'
      },
      symbol: {
        height: '20px',
        lineHeight: '22px',
        paddingBottom: '7px'
      }
    }
  });

  var handleChange = function handleChange(data, e) {
    if (data['#']) {
      _color2.default.isValidHex(data['#']) && onChange({
        hex: data['#'],
        source: 'hex'
      }, e);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb'
      }, e);
    } else if (data.h || data.s || data.v) {
      onChange({
        h: data.h || hsv.h,
        s: data.s || hsv.s,
        v: data.v || hsv.v,
        source: 'hsv'
      }, e);
    }
  };

  return _react2.default.createElement(
    'div',
    { style: styles.fields },
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'h',
      value: Math.round(hsv.h),
      onChange: handleChange
    }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 's',
      value: Math.round(hsv.s * 100),
      onChange: handleChange
    }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'v',
      value: Math.round(hsv.v * 100),
      onChange: handleChange
    }),
    _react2.default.createElement('div', { style: styles.divider }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'r',
      value: rgb.r,
      onChange: handleChange
    }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'g',
      value: rgb.g,
      onChange: handleChange
    }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: 'b',
      value: rgb.b,
      onChange: handleChange
    }),
    _react2.default.createElement('div', { style: styles.divider }),
    _react2.default.createElement(_common.EditableInput, {
      style: { wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel },
      label: '#',
      value: hex.replace('#', ''),
      onChange: handleChange
    }),
    _react2.default.createElement(
      'div',
      { style: styles.fieldSymbols },
      _react2.default.createElement(
        'div',
        { style: styles.symbol },
        '\xB0'
      ),
      _react2.default.createElement(
        'div',
        { style: styles.symbol },
        '%'
      ),
      _react2.default.createElement(
        'div',
        { style: styles.symbol },
        '%'
      )
    )
  );
};

exports.default = PhotoshopPicker;

/***/ }),
/* 1105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoshopPointerCircle = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotoshopPointerCircle = exports.PhotoshopPointerCircle = function PhotoshopPointerCircle(_ref) {
  var hsl = _ref.hsl;

  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        width: '12px',
        height: '12px',
        borderRadius: '6px',
        boxShadow: 'inset 0 0 0 1px #fff',
        transform: 'translate(-6px, -6px)'
      }
    },
    'black-outline': {
      picker: {
        boxShadow: 'inset 0 0 0 1px #000'
      }
    }
  }, { 'black-outline': hsl.l > 0.5 });

  return _react2.default.createElement('div', { style: styles.picker });
};

exports.default = PhotoshopPointerCircle;

/***/ }),
/* 1106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoshopPointerCircle = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotoshopPointerCircle = exports.PhotoshopPointerCircle = function PhotoshopPointerCircle() {
  var styles = (0, _reactcss2.default)({
    'default': {
      triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6px',
        borderColor: 'transparent transparent transparent #fff',
        position: 'absolute',
        top: '1px',
        left: '1px'
      },
      triangleBorder: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8px',
        borderColor: 'transparent transparent transparent #555'
      },

      left: {
        Extend: 'triangleBorder',
        transform: 'translate(-13px, -4px)'
      },
      leftInside: {
        Extend: 'triangle',
        transform: 'translate(-8px, -5px)'
      },

      right: {
        Extend: 'triangleBorder',
        transform: 'translate(20px, -14px) rotate(180deg)'
      },
      rightInside: {
        Extend: 'triangle',
        transform: 'translate(-8px, -5px)'
      }
    }
  });

  return _react2.default.createElement(
    'div',
    { style: styles.pointer },
    _react2.default.createElement(
      'div',
      { style: styles.left },
      _react2.default.createElement('div', { style: styles.leftInside })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.right },
      _react2.default.createElement('div', { style: styles.rightInside })
    )
  );
};

exports.default = PhotoshopPointerCircle;

/***/ }),
/* 1107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoshopBotton = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotoshopBotton = exports.PhotoshopBotton = function PhotoshopBotton(_ref) {
  var onClick = _ref.onClick,
      label = _ref.label,
      children = _ref.children,
      active = _ref.active;

  var styles = (0, _reactcss2.default)({
    'default': {
      button: {
        backgroundImage: 'linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)',
        border: '1px solid #878787',
        borderRadius: '2px',
        height: '20px',
        boxShadow: '0 1px 0 0 #EAEAEA',
        fontSize: '14px',
        color: '#000',
        lineHeight: '20px',
        textAlign: 'center',
        marginBottom: '10px',
        cursor: 'pointer'
      }
    },
    'active': {
      button: {
        boxShadow: '0 0 0 1px #878787'
      }
    }
  }, { active: active });

  return _react2.default.createElement(
    'div',
    { style: styles.button, onClick: onClick },
    label || children
  );
};

exports.default = PhotoshopBotton;

/***/ }),
/* 1108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoshopPreviews = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotoshopPreviews = exports.PhotoshopPreviews = function PhotoshopPreviews(_ref) {
  var rgb = _ref.rgb,
      currentColor = _ref.currentColor;

  var styles = (0, _reactcss2.default)({
    'default': {
      swatches: {
        border: '1px solid #B3B3B3',
        borderBottom: '1px solid #F0F0F0',
        marginBottom: '2px',
        marginTop: '1px'
      },
      new: {
        height: '34px',
        background: 'rgb(' + rgb.r + ',' + rgb.g + ', ' + rgb.b + ')',
        boxShadow: 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000'
      },
      current: {
        height: '34px',
        background: currentColor,
        boxShadow: 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 -1px 0 #000'
      },
      label: {
        fontSize: '14px',
        color: '#000',
        textAlign: 'center'
      }
    }
  });

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { style: styles.label },
      'new'
    ),
    _react2.default.createElement(
      'div',
      { style: styles.swatches },
      _react2.default.createElement('div', { style: styles.new }),
      _react2.default.createElement('div', { style: styles.current })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.label },
      'current'
    )
  );
};

exports.default = PhotoshopPreviews;

/***/ }),
/* 1109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sketch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _common = __webpack_require__(662);

var _SketchFields = __webpack_require__(1110);

var _SketchFields2 = _interopRequireDefault(_SketchFields);

var _SketchPresetColors = __webpack_require__(1111);

var _SketchPresetColors2 = _interopRequireDefault(_SketchPresetColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sketch = exports.Sketch = function Sketch(_ref) {
  var width = _ref.width,
      rgb = _ref.rgb,
      hex = _ref.hex,
      hsv = _ref.hsv,
      hsl = _ref.hsl,
      onChange = _ref.onChange,
      onSwatchHover = _ref.onSwatchHover,
      disableAlpha = _ref.disableAlpha,
      presetColors = _ref.presetColors,
      renderers = _ref.renderers,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': _extends({
      picker: {
        width: width,
        padding: '10px 10px 0',
        boxSizing: 'initial',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)'
      },
      saturation: {
        width: '100%',
        paddingBottom: '75%',
        position: 'relative',
        overflow: 'hidden'
      },
      Saturation: {
        radius: '3px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)'
      },
      controls: {
        display: 'flex'
      },
      sliders: {
        padding: '4px 0',
        flex: '1'
      },
      color: {
        width: '24px',
        height: '24px',
        position: 'relative',
        marginTop: '4px',
        marginLeft: '4px',
        borderRadius: '3px'
      },
      activeColor: {
        absolute: '0px 0px 0px 0px',
        borderRadius: '2px',
        background: 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)'
      },
      hue: {
        position: 'relative',
        height: '10px',
        overflow: 'hidden'
      },
      Hue: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)'
      },

      alpha: {
        position: 'relative',
        height: '10px',
        marginTop: '4px',
        overflow: 'hidden'
      },
      Alpha: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)'
      }
    }, passedStyles),
    'disableAlpha': {
      color: {
        height: '10px'
      },
      hue: {
        height: '10px'
      },
      alpha: {
        display: 'none'
      }
    }
  }, passedStyles), { disableAlpha: disableAlpha });

  return _react2.default.createElement(
    'div',
    { style: styles.picker, className: 'sketch-picker ' + className },
    _react2.default.createElement(
      'div',
      { style: styles.saturation },
      _react2.default.createElement(_common.Saturation, {
        style: styles.Saturation,
        hsl: hsl,
        hsv: hsv,
        onChange: onChange
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.controls, className: 'flexbox-fix' },
      _react2.default.createElement(
        'div',
        { style: styles.sliders },
        _react2.default.createElement(
          'div',
          { style: styles.hue },
          _react2.default.createElement(_common.Hue, {
            style: styles.Hue,
            hsl: hsl,
            onChange: onChange
          })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.alpha },
          _react2.default.createElement(_common.Alpha, {
            style: styles.Alpha,
            rgb: rgb,
            hsl: hsl,
            renderers: renderers,
            onChange: onChange
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { style: styles.color },
        _react2.default.createElement(_common.Checkboard, null),
        _react2.default.createElement('div', { style: styles.activeColor })
      )
    ),
    _react2.default.createElement(_SketchFields2.default, {
      rgb: rgb,
      hsl: hsl,
      hex: hex,
      onChange: onChange,
      disableAlpha: disableAlpha
    }),
    _react2.default.createElement(_SketchPresetColors2.default, {
      colors: presetColors,
      onClick: onChange,
      onSwatchHover: onSwatchHover
    })
  );
};

Sketch.propTypes = {
  disableAlpha: _propTypes2.default.bool,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  styles: _propTypes2.default.object
};

Sketch.defaultProps = {
  disableAlpha: false,
  width: 200,
  styles: {},
  presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']
};

exports.default = (0, _common.ColorWrap)(Sketch);

/***/ }),
/* 1110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SketchFields = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */

var SketchFields = exports.SketchFields = function SketchFields(_ref) {
  var onChange = _ref.onChange,
      rgb = _ref.rgb,
      hsl = _ref.hsl,
      hex = _ref.hex,
      disableAlpha = _ref.disableAlpha;

  var styles = (0, _reactcss2.default)({
    'default': {
      fields: {
        display: 'flex',
        paddingTop: '4px'
      },
      single: {
        flex: '1',
        paddingLeft: '6px'
      },
      alpha: {
        flex: '1',
        paddingLeft: '6px'
      },
      double: {
        flex: '2'
      },
      input: {
        width: '80%',
        padding: '4px 10% 3px',
        border: 'none',
        boxShadow: 'inset 0 0 0 1px #ccc',
        fontSize: '11px'
      },
      label: {
        display: 'block',
        textAlign: 'center',
        fontSize: '11px',
        color: '#222',
        paddingTop: '3px',
        paddingBottom: '4px',
        textTransform: 'capitalize'
      }
    },
    'disableAlpha': {
      alpha: {
        display: 'none'
      }
    }
  }, { disableAlpha: disableAlpha });

  var handleChange = function handleChange(data, e) {
    if (data.hex) {
      _color2.default.isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: 'hex'
      }, e);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: 'rgb'
      }, e);
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }

      data.a /= 100;
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: 'rgb'
      }, e);
    }
  };

  return _react2.default.createElement(
    'div',
    { style: styles.fields, className: 'flexbox-fix' },
    _react2.default.createElement(
      'div',
      { style: styles.double },
      _react2.default.createElement(_common.EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: 'hex',
        value: hex.replace('#', ''),
        onChange: handleChange
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.single },
      _react2.default.createElement(_common.EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: 'r',
        value: rgb.r,
        onChange: handleChange,
        dragLabel: 'true',
        dragMax: '255'
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.single },
      _react2.default.createElement(_common.EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: 'g',
        value: rgb.g,
        onChange: handleChange,
        dragLabel: 'true',
        dragMax: '255'
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.single },
      _react2.default.createElement(_common.EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: 'b',
        value: rgb.b,
        onChange: handleChange,
        dragLabel: 'true',
        dragMax: '255'
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.alpha },
      _react2.default.createElement(_common.EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: 'a',
        value: Math.round(rgb.a * 100),
        onChange: handleChange,
        dragLabel: 'true',
        dragMax: '100'
      })
    )
  );
};

exports.default = SketchFields;

/***/ }),
/* 1111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SketchPresetColors = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SketchPresetColors = exports.SketchPresetColors = function SketchPresetColors(_ref) {
  var colors = _ref.colors,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? function () {} : _ref$onClick,
      onSwatchHover = _ref.onSwatchHover;

  var styles = (0, _reactcss2.default)({
    'default': {
      colors: {
        margin: '0 -10px',
        padding: '10px 0 0 10px',
        borderTop: '1px solid #eee',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative'
      },
      swatchWrap: {
        width: '16px',
        height: '16px',
        margin: '0 10px 10px 0'
      },
      swatch: {
        borderRadius: '3px',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)'
      }
    },
    'no-presets': {
      colors: {
        display: 'none'
      }
    }
  }, {
    'no-presets': !colors || !colors.length
  });

  var handleClick = function handleClick(hex, e) {
    onClick({
      hex: hex,
      source: 'hex'
    }, e);
  };

  return _react2.default.createElement(
    'div',
    { style: styles.colors, className: 'flexbox-fix' },
    colors.map(function (colorObjOrString) {
      var c = typeof colorObjOrString === 'string' ? { color: colorObjOrString } : colorObjOrString;
      var key = '' + c.color + (c.title || '');
      return _react2.default.createElement(
        'div',
        { key: key, style: styles.swatchWrap },
        _react2.default.createElement(_common.Swatch, _extends({}, c, {
          style: styles.swatch,
          onClick: handleClick,
          onHover: onSwatchHover,
          focusStyle: {
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ' + c.color
          }
        }))
      );
    })
  );
};

SketchPresetColors.propTypes = {
  colors: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    color: _propTypes2.default.string,
    title: _propTypes2.default.string
  })])).isRequired
};

exports.default = SketchPresetColors;

/***/ }),
/* 1112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _common = __webpack_require__(662);

var _SliderSwatches = __webpack_require__(1113);

var _SliderSwatches2 = _interopRequireDefault(_SliderSwatches);

var _SliderPointer = __webpack_require__(1115);

var _SliderPointer2 = _interopRequireDefault(_SliderPointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slider = exports.Slider = function Slider(_ref) {
  var hsl = _ref.hsl,
      onChange = _ref.onChange,
      pointer = _ref.pointer,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      hue: {
        height: '12px',
        position: 'relative'
      },
      Hue: {
        radius: '2px'
      }
    }
  }, passedStyles));

  return _react2.default.createElement(
    'div',
    { style: styles.wrap || '', className: 'slider-picker ' + className },
    _react2.default.createElement(
      'div',
      { style: styles.hue },
      _react2.default.createElement(_common.Hue, {
        style: styles.Hue,
        hsl: hsl,
        pointer: pointer,
        onChange: onChange
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.swatches },
      _react2.default.createElement(_SliderSwatches2.default, { hsl: hsl, onClick: onChange })
    )
  );
};

Slider.propTypes = {
  styles: _propTypes2.default.object
};
Slider.defaultProps = {
  pointer: _SliderPointer2.default,
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Slider);

/***/ }),
/* 1113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderSwatches = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _SliderSwatch = __webpack_require__(1114);

var _SliderSwatch2 = _interopRequireDefault(_SliderSwatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderSwatches = exports.SliderSwatches = function SliderSwatches(_ref) {
  var onClick = _ref.onClick,
      hsl = _ref.hsl;

  var styles = (0, _reactcss2.default)({
    'default': {
      swatches: {
        marginTop: '20px'
      },
      swatch: {
        boxSizing: 'border-box',
        width: '20%',
        paddingRight: '1px',
        float: 'left'
      },
      clear: {
        clear: 'both'
      }
    }
  });

  return _react2.default.createElement(
    'div',
    { style: styles.swatches },
    _react2.default.createElement(
      'div',
      { style: styles.swatch },
      _react2.default.createElement(_SliderSwatch2.default, {
        hsl: hsl,
        offset: '.80',
        active: Math.round(hsl.l * 100) / 100 === 0.80 && Math.round(hsl.s * 100) / 100 === 0.50,
        onClick: onClick,
        first: true
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.swatch },
      _react2.default.createElement(_SliderSwatch2.default, {
        hsl: hsl,
        offset: '.65',
        active: Math.round(hsl.l * 100) / 100 === 0.65 && Math.round(hsl.s * 100) / 100 === 0.50,
        onClick: onClick
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.swatch },
      _react2.default.createElement(_SliderSwatch2.default, {
        hsl: hsl,
        offset: '.50',
        active: Math.round(hsl.l * 100) / 100 === 0.50 && Math.round(hsl.s * 100) / 100 === 0.50,
        onClick: onClick
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.swatch },
      _react2.default.createElement(_SliderSwatch2.default, {
        hsl: hsl,
        offset: '.35',
        active: Math.round(hsl.l * 100) / 100 === 0.35 && Math.round(hsl.s * 100) / 100 === 0.50,
        onClick: onClick
      })
    ),
    _react2.default.createElement(
      'div',
      { style: styles.swatch },
      _react2.default.createElement(_SliderSwatch2.default, {
        hsl: hsl,
        offset: '.20',
        active: Math.round(hsl.l * 100) / 100 === 0.20 && Math.round(hsl.s * 100) / 100 === 0.50,
        onClick: onClick,
        last: true
      })
    ),
    _react2.default.createElement('div', { style: styles.clear })
  );
};

exports.default = SliderSwatches;

/***/ }),
/* 1114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderSwatch = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderSwatch = exports.SliderSwatch = function SliderSwatch(_ref) {
  var hsl = _ref.hsl,
      offset = _ref.offset,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? function () {} : _ref$onClick,
      active = _ref.active,
      first = _ref.first,
      last = _ref.last;

  var styles = (0, _reactcss2.default)({
    'default': {
      swatch: {
        height: '12px',
        background: 'hsl(' + hsl.h + ', 50%, ' + offset * 100 + '%)',
        cursor: 'pointer'
      }
    },
    'first': {
      swatch: {
        borderRadius: '2px 0 0 2px'
      }
    },
    'last': {
      swatch: {
        borderRadius: '0 2px 2px 0'
      }
    },
    'active': {
      swatch: {
        transform: 'scaleY(1.8)',
        borderRadius: '3.6px/2px'
      }
    }
  }, { active: active, first: first, last: last });

  var handleClick = function handleClick(e) {
    return onClick({
      h: hsl.h,
      s: 0.5,
      l: offset,
      source: 'hsl'
    }, e);
  };

  return _react2.default.createElement('div', { style: styles.swatch, onClick: handleClick });
};

exports.default = SliderSwatch;

/***/ }),
/* 1115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderPointer = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderPointer = exports.SliderPointer = function SliderPointer() {
  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        width: '14px',
        height: '14px',
        borderRadius: '6px',
        transform: 'translate(-7px, -1px)',
        backgroundColor: 'rgb(248, 248, 248)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  });

  return _react2.default.createElement('div', { style: styles.picker });
};

exports.default = SliderPointer;

/***/ }),
/* 1116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swatches = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = __webpack_require__(675);

var _map2 = _interopRequireDefault(_map);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _materialColors = __webpack_require__(852);

var material = _interopRequireWildcard(_materialColors);

var _common = __webpack_require__(662);

var _SwatchesGroup = __webpack_require__(1117);

var _SwatchesGroup2 = _interopRequireDefault(_SwatchesGroup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Swatches = exports.Swatches = function Swatches(_ref) {
  var width = _ref.width,
      height = _ref.height,
      onChange = _ref.onChange,
      onSwatchHover = _ref.onSwatchHover,
      colors = _ref.colors,
      hex = _ref.hex,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      picker: {
        width: width,
        height: height
      },
      overflow: {
        height: height,
        overflowY: 'scroll'
      },
      body: {
        padding: '16px 0 6px 16px'
      },
      clear: {
        clear: 'both'
      }
    }
  }, passedStyles));

  var handleChange = function handleChange(data, e) {
    _color2.default.isValidHex(data) && onChange({
      hex: data,
      source: 'hex'
    }, e);
  };

  return _react2.default.createElement(
    'div',
    { style: styles.picker, className: 'swatches-picker ' + className },
    _react2.default.createElement(
      _common.Raised,
      null,
      _react2.default.createElement(
        'div',
        { style: styles.overflow },
        _react2.default.createElement(
          'div',
          { style: styles.body },
          (0, _map2.default)(colors, function (group) {
            return _react2.default.createElement(_SwatchesGroup2.default, {
              key: group.toString(),
              group: group,
              active: hex,
              onClick: handleChange,
              onSwatchHover: onSwatchHover
            });
          }),
          _react2.default.createElement('div', { style: styles.clear })
        )
      )
    )
  );
};

Swatches.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  colors: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.string)),
  styles: _propTypes2.default.object

  /* eslint-disable max-len */
};Swatches.defaultProps = {
  width: 320,
  height: 240,
  colors: [[material.red['900'], material.red['700'], material.red['500'], material.red['300'], material.red['100']], [material.pink['900'], material.pink['700'], material.pink['500'], material.pink['300'], material.pink['100']], [material.purple['900'], material.purple['700'], material.purple['500'], material.purple['300'], material.purple['100']], [material.deepPurple['900'], material.deepPurple['700'], material.deepPurple['500'], material.deepPurple['300'], material.deepPurple['100']], [material.indigo['900'], material.indigo['700'], material.indigo['500'], material.indigo['300'], material.indigo['100']], [material.blue['900'], material.blue['700'], material.blue['500'], material.blue['300'], material.blue['100']], [material.lightBlue['900'], material.lightBlue['700'], material.lightBlue['500'], material.lightBlue['300'], material.lightBlue['100']], [material.cyan['900'], material.cyan['700'], material.cyan['500'], material.cyan['300'], material.cyan['100']], [material.teal['900'], material.teal['700'], material.teal['500'], material.teal['300'], material.teal['100']], ['#194D33', material.green['700'], material.green['500'], material.green['300'], material.green['100']], [material.lightGreen['900'], material.lightGreen['700'], material.lightGreen['500'], material.lightGreen['300'], material.lightGreen['100']], [material.lime['900'], material.lime['700'], material.lime['500'], material.lime['300'], material.lime['100']], [material.yellow['900'], material.yellow['700'], material.yellow['500'], material.yellow['300'], material.yellow['100']], [material.amber['900'], material.amber['700'], material.amber['500'], material.amber['300'], material.amber['100']], [material.orange['900'], material.orange['700'], material.orange['500'], material.orange['300'], material.orange['100']], [material.deepOrange['900'], material.deepOrange['700'], material.deepOrange['500'], material.deepOrange['300'], material.deepOrange['100']], [material.brown['900'], material.brown['700'], material.brown['500'], material.brown['300'], material.brown['100']], [material.blueGrey['900'], material.blueGrey['700'], material.blueGrey['500'], material.blueGrey['300'], material.blueGrey['100']], ['#000000', '#525252', '#969696', '#D9D9D9', '#FFFFFF']],
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Swatches);

/***/ }),
/* 1117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwatchesGroup = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = __webpack_require__(675);

var _map2 = _interopRequireDefault(_map);

var _SwatchesColor = __webpack_require__(1118);

var _SwatchesColor2 = _interopRequireDefault(_SwatchesColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwatchesGroup = exports.SwatchesGroup = function SwatchesGroup(_ref) {
  var onClick = _ref.onClick,
      onSwatchHover = _ref.onSwatchHover,
      group = _ref.group,
      active = _ref.active;

  var styles = (0, _reactcss2.default)({
    'default': {
      group: {
        paddingBottom: '10px',
        width: '40px',
        float: 'left',
        marginRight: '10px'
      }
    }
  });

  return _react2.default.createElement(
    'div',
    { style: styles.group },
    (0, _map2.default)(group, function (color, i) {
      return _react2.default.createElement(_SwatchesColor2.default, {
        key: color,
        color: color,
        active: color.toLowerCase() === active,
        first: i === 0,
        last: i === group.length - 1,
        onClick: onClick,
        onSwatchHover: onSwatchHover
      });
    })
  );
};

exports.default = SwatchesGroup;

/***/ }),
/* 1118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwatchesColor = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

var _CheckIcon = __webpack_require__(1119);

var _CheckIcon2 = _interopRequireDefault(_CheckIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwatchesColor = exports.SwatchesColor = function SwatchesColor(_ref) {
  var color = _ref.color,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? function () {} : _ref$onClick,
      onSwatchHover = _ref.onSwatchHover,
      first = _ref.first,
      last = _ref.last,
      active = _ref.active;

  var styles = (0, _reactcss2.default)({
    'default': {
      color: {
        width: '40px',
        height: '24px',
        cursor: 'pointer',
        background: color,
        marginBottom: '1px'
      },
      check: {
        color: _color2.default.getContrastingColor(color),
        marginLeft: '8px',
        display: 'none'
      }
    },
    'first': {
      color: {
        overflow: 'hidden',
        borderRadius: '2px 2px 0 0'
      }
    },
    'last': {
      color: {
        overflow: 'hidden',
        borderRadius: '0 0 2px 2px'
      }
    },
    'active': {
      check: {
        display: 'block'
      }
    },
    'color-#FFFFFF': {
      color: {
        boxShadow: 'inset 0 0 0 1px #ddd'
      },
      check: {
        color: '#333'
      }
    },
    'transparent': {
      check: {
        color: '#333'
      }
    }
  }, {
    first: first,
    last: last,
    active: active,
    'color-#FFFFFF': color === '#FFFFFF',
    'transparent': color === 'transparent'
  });

  return _react2.default.createElement(
    _common.Swatch,
    {
      color: color,
      style: styles.color,
      onClick: onClick,
      onHover: onSwatchHover,
      focusStyle: { boxShadow: '0 0 4px ' + color }
    },
    _react2.default.createElement(
      'div',
      { style: styles.check },
      _react2.default.createElement(_CheckIcon2.default, null)
    )
  );
};

exports.default = SwatchesColor;

/***/ }),
/* 1119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DEFAULT_SIZE = 24;

exports.default = function (_ref) {
  var _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'currentColor' : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? DEFAULT_SIZE : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? DEFAULT_SIZE : _ref$height,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      props = _objectWithoutProperties(_ref, ['fill', 'width', 'height', 'style']);

  return _react2.default.createElement(
    'svg',
    _extends({
      viewBox: '0 0 ' + DEFAULT_SIZE + ' ' + DEFAULT_SIZE,
      style: _extends({ fill: fill, width: width, height: height }, style)
    }, props),
    _react2.default.createElement('path', { d: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' })
  );
};

/***/ }),
/* 1120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Twitter = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactcss = __webpack_require__(661);

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = __webpack_require__(675);

var _map2 = _interopRequireDefault(_map);

var _merge = __webpack_require__(667);

var _merge2 = _interopRequireDefault(_merge);

var _color = __webpack_require__(670);

var _color2 = _interopRequireDefault(_color);

var _common = __webpack_require__(662);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Twitter = exports.Twitter = function Twitter(_ref) {
  var onChange = _ref.onChange,
      onSwatchHover = _ref.onSwatchHover,
      hex = _ref.hex,
      colors = _ref.colors,
      width = _ref.width,
      triangle = _ref.triangle,
      _ref$styles = _ref.styles,
      passedStyles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;

  var styles = (0, _reactcss2.default)((0, _merge2.default)({
    'default': {
      card: {
        width: width,
        background: '#fff',
        border: '0 solid rgba(0,0,0,0.25)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        borderRadius: '4px',
        position: 'relative'
      },
      body: {
        padding: '15px 9px 9px 15px'
      },
      label: {
        fontSize: '18px',
        color: '#fff'
      },
      triangle: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent #fff transparent',
        position: 'absolute'
      },
      triangleShadow: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
        position: 'absolute'
      },
      hash: {
        background: '#F0F0F0',
        height: '30px',
        width: '30px',
        borderRadius: '4px 0 0 4px',
        float: 'left',
        color: '#98A1A4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      input: {
        width: '100px',
        fontSize: '14px',
        color: '#666',
        border: '0px',
        outline: 'none',
        height: '28px',
        boxShadow: 'inset 0 0 0 1px #F0F0F0',
        boxSizing: 'content-box',
        borderRadius: '0 4px 4px 0',
        float: 'left',
        paddingLeft: '8px'
      },
      swatch: {
        width: '30px',
        height: '30px',
        float: 'left',
        borderRadius: '4px',
        margin: '0 6px 6px 0'
      },
      clear: {
        clear: 'both'
      }
    },
    'hide-triangle': {
      triangle: {
        display: 'none'
      },
      triangleShadow: {
        display: 'none'
      }
    },
    'top-left-triangle': {
      triangle: {
        top: '-10px',
        left: '12px'
      },
      triangleShadow: {
        top: '-11px',
        left: '12px'
      }
    },
    'top-right-triangle': {
      triangle: {
        top: '-10px',
        right: '12px'
      },
      triangleShadow: {
        top: '-11px',
        right: '12px'
      }
    }
  }, passedStyles), {
    'hide-triangle': triangle === 'hide',
    'top-left-triangle': triangle === 'top-left',
    'top-right-triangle': triangle === 'top-right'
  });

  var handleChange = function handleChange(hexcode, e) {
    _color2.default.isValidHex(hexcode) && onChange({
      hex: hexcode,
      source: 'hex'
    }, e);
  };

  return _react2.default.createElement(
    'div',
    { style: styles.card, className: 'twitter-picker ' + className },
    _react2.default.createElement('div', { style: styles.triangleShadow }),
    _react2.default.createElement('div', { style: styles.triangle }),
    _react2.default.createElement(
      'div',
      { style: styles.body },
      (0, _map2.default)(colors, function (c, i) {
        return _react2.default.createElement(_common.Swatch, {
          key: i,
          color: c,
          hex: c,
          style: styles.swatch,
          onClick: handleChange,
          onHover: onSwatchHover,
          focusStyle: {
            boxShadow: '0 0 4px ' + c
          }
        });
      }),
      _react2.default.createElement(
        'div',
        { style: styles.hash },
        '#'
      ),
      _react2.default.createElement(_common.EditableInput, {
        style: { input: styles.input },
        value: hex.replace('#', ''),
        onChange: handleChange
      }),
      _react2.default.createElement('div', { style: styles.clear })
    )
  );
};

Twitter.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  triangle: _propTypes2.default.oneOf(['hide', 'top-left', 'top-right']),
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  styles: _propTypes2.default.object
};

Twitter.defaultProps = {
  width: 276,
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
  triangle: 'top-left',
  styles: {}
};

exports.default = (0, _common.ColorWrap)(Twitter);

/***/ }),
/* 1121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _formBinder = __webpack_require__(689);

var _CreateForm = __webpack_require__(708);

var _CreateForm2 = _interopRequireDefault(_CreateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Checkbox = __webpack_require__(671);

var Radio = __webpack_require__(691);

var RadioGroup = Radio.Group;
var HeaderForm = (_temp = _class = function (_Component) {
  _inherits(HeaderForm, _Component);

  function HeaderForm() {
    _classCallCheck(this, HeaderForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  HeaderForm.prototype.render = function render() {
    var header = this.props.value.header;

    return _react2.default.createElement(
      _formBinder.FormBinderWrapper,
      {
        value: this.props.value,
        onChange: this.props.formChange
      },
      _react2.default.createElement(
        'div',
        { style: styles.formGroup },
        _react2.default.createElement(
          'div',
          { style: styles.formHead },
          _react2.default.createElement(
            'span',
            { style: styles.title },
            '\u9876\u90E8\u5BFC\u822A\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'header.enabled' },
            _react2.default.createElement(Checkbox, { size: 'large', checked: header.enabled })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u5B9A\u4F4D\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'header.position' },
            _react2.default.createElement(
              RadioGroup,
              null,
              _react2.default.createElement(
                Radio,
                {
                  id: 'positionFixed',
                  value: 'fixed',
                  disabled: !header.enabled
                },
                '\u56FA\u5B9A'
              ),
              _react2.default.createElement(
                Radio,
                {
                  id: 'positionStatic',
                  value: 'static',
                  disabled: !header.enabled
                },
                '\u9759\u6001'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u901A\u680F\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'header.width' },
            _react2.default.createElement(
              RadioGroup,
              null,
              _react2.default.createElement(
                Radio,
                {
                  id: 'fullWidth',
                  value: 'full-width',
                  disabled: !header.enabled
                },
                '\u662F'
              ),
              _react2.default.createElement(
                Radio,
                {
                  id: 'elasticWidth',
                  value: 'elastic-width',
                  disabled: !header.enabled
                },
                '\u5426'
              )
            )
          )
        )
      )
    );
  };

  return HeaderForm;
}(_react.Component), _class.displayName = 'HeaderForm', _temp);
exports.default = (0, _CreateForm2.default)(HeaderForm);


var styles = {
  formGroup: {
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #e8e8e8'
  },
  formHead: {
    marginBottom: '15px'
  },
  formItem: {
    marginBottom: '10px'
  },
  title: {
    fontWeight: '500'
  }
};
module.exports = exports['default'];

/***/ }),
/* 1122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _formBinder = __webpack_require__(689);

var _CreateForm = __webpack_require__(708);

var _CreateForm2 = _interopRequireDefault(_CreateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Checkbox = __webpack_require__(671);

var Radio = __webpack_require__(691);

var RadioGroup = Radio.Group;
var AsideForm = (_temp = _class = function (_Component) {
  _inherits(AsideForm, _Component);

  function AsideForm() {
    _classCallCheck(this, AsideForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  AsideForm.prototype.render = function render() {
    var aside = this.props.value.aside;


    return _react2.default.createElement(
      _formBinder.FormBinderWrapper,
      {
        value: this.props.value,
        onChange: this.props.formChange
      },
      _react2.default.createElement(
        'div',
        { style: styles.formGroup },
        _react2.default.createElement(
          'div',
          { style: styles.formHead },
          _react2.default.createElement(
            'span',
            { style: styles.title },
            '\u4FA7\u8FB9\u5BFC\u822A\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'aside.enabled' },
            _react2.default.createElement(Checkbox, { size: 'large', checked: aside.enabled })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u6298\u53E0\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'aside.collapsed' },
            _react2.default.createElement(Checkbox, {
              size: 'large',
              checked: aside.collapsed,
              disabled: !aside.enabled
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u5B9A\u4F4D\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'aside.position' },
            _react2.default.createElement(
              RadioGroup,
              null,
              _react2.default.createElement(
                Radio,
                {
                  id: 'fullWidth',
                  value: 'embed-fixed',
                  disabled: !aside.enabled
                },
                '\u56FA\u5B9A'
              ),
              _react2.default.createElement(
                Radio,
                {
                  id: 'elasticWidth',
                  value: 'static',
                  disabled: !aside.enabled
                },
                '\u9759\u6001'
              )
            )
          )
        )
      )
    );
  };

  return AsideForm;
}(_react.Component), _class.displayName = 'AsideForm', _temp);
exports.default = (0, _CreateForm2.default)(AsideForm);


var styles = {
  formGroup: {
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #e8e8e8'
  },
  formHead: {
    marginBottom: '15px'
  },
  formItem: {
    marginBottom: '10px'
  },
  title: {
    fontWeight: '500'
  }
};
module.exports = exports['default'];

/***/ }),
/* 1123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _formBinder = __webpack_require__(689);

var _CreateForm = __webpack_require__(708);

var _CreateForm2 = _interopRequireDefault(_CreateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Checkbox = __webpack_require__(671);

var Radio = __webpack_require__(691);

var RadioGroup = Radio.Group;
var FooterForm = (_temp = _class = function (_Component) {
  _inherits(FooterForm, _Component);

  function FooterForm() {
    _classCallCheck(this, FooterForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  FooterForm.prototype.render = function render() {
    var footer = this.props.value.footer;


    return _react2.default.createElement(
      _formBinder.FormBinderWrapper,
      {
        value: this.props.value,
        onChange: this.props.formChange
      },
      _react2.default.createElement(
        'div',
        { style: styles.formGroup },
        _react2.default.createElement(
          'div',
          { style: styles.formHead },
          _react2.default.createElement(
            'span',
            { style: styles.title },
            '\u9875\u811A\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'footer.enabled' },
            _react2.default.createElement(Checkbox, { size: 'large', checked: footer.enabled })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u5B9A\u4F4D\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'footer.position' },
            _react2.default.createElement(
              RadioGroup,
              null,
              _react2.default.createElement(
                Radio,
                {
                  id: 'positionFixed',
                  value: 'fixed',
                  disabled: !footer.enabled
                },
                '\u56FA\u5B9A'
              ),
              _react2.default.createElement(
                Radio,
                {
                  id: 'positionStatic',
                  value: 'static',
                  disabled: !footer.enabled
                },
                '\u9759\u6001'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u901A\u680F\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { required: true, name: 'footer.width' },
            _react2.default.createElement(
              RadioGroup,
              null,
              _react2.default.createElement(
                Radio,
                {
                  id: 'fullWidth',
                  value: 'full-width',
                  disabled: !footer.enabled
                },
                '\u662F'
              ),
              _react2.default.createElement(
                Radio,
                {
                  id: 'elasticWidth',
                  value: 'elastic-width',
                  disabled: !footer.enabled
                },
                '\u5426'
              )
            )
          )
        )
      )
    );
  };

  return FooterForm;
}(_react.Component), _class.displayName = 'FooterForm', _temp);
exports.default = (0, _CreateForm2.default)(FooterForm);


var styles = {
  formHead: {
    marginBottom: '15px'
  },
  formItem: {
    marginBottom: '10px'
  },
  title: {
    fontWeight: '500'
  }
};
module.exports = exports['default'];

/***/ }),
/* 1124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _formBinder = __webpack_require__(689);

var _foundationSymbol = __webpack_require__(791);

var _foundationSymbol2 = _interopRequireDefault(_foundationSymbol);

var _rcTooltip = __webpack_require__(99);

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _CreateForm = __webpack_require__(708);

var _CreateForm2 = _interopRequireDefault(_CreateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Checkbox = __webpack_require__(671);

var AdvancedForm = (_temp = _class = function (_Component) {
  _inherits(AdvancedForm, _Component);

  function AdvancedForm(props) {
    _classCallCheck(this, AdvancedForm);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {};
    return _this;
  }

  AdvancedForm.prototype.render = function render() {
    var redux = this.props.value.redux;


    return _react2.default.createElement(
      _formBinder.FormBinderWrapper,
      {
        value: this.props.value,
        onChange: this.props.formChange
      },
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'div',
          { style: styles.formHead },
          _react2.default.createElement(
            'span',
            { style: styles.title },
            'Redux \u914D\u7F6E',
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                overlayStyle: { width: '120px' },
                placement: 'top',
                trigger: ['hover'],
                overlay: _react2.default.createElement(
                  'span',
                  null,
                  '\u751F\u6210\u57FA\u7840\u7684 redux \u914D\u7F6E\u6587\u4EF6\uFF0C\u9ED8\u8BA4\u4F1A\u540C\u6B65\u8DEF\u7531\u4FE1\u606F\u5230 redux store'
                )
              },
              _react2.default.createElement(_foundationSymbol2.default, {
                type: 'bangzhu',
                size: 'xs',
                style: styles.icon
              })
            ),
            '\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { name: 'redux.enabled' },
            _react2.default.createElement(Checkbox, { size: 'large', checked: redux.enabled })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u6CE8\u518C\u767B\u5F55\u793A\u4F8B',
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                overlayStyle: { width: '100px' },
                placement: 'top',
                trigger: ['hover'],
                overlay: _react2.default.createElement(
                  'span',
                  null,
                  ' \u751F\u6210\u6CE8\u518C\u767B\u5F55\u7684\u793A\u4F8B\u4EE3\u7801'
                )
              },
              _react2.default.createElement(_foundationSymbol2.default, {
                type: 'bangzhu',
                size: 'xs',
                style: styles.icon
              })
            )
          ),
          '\uFF1A',
          _react2.default.createElement(
            _formBinder.FormBinder,
            { name: 'redux.registerLoginModule' },
            _react2.default.createElement(Checkbox, {
              size: 'large',
              checked: redux.registerLoginModule,
              disabled: !redux.enabled
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            '\u6743\u9650\u7BA1\u7406\u793A\u4F8B',
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                overlayStyle: { width: '100px' },
                placement: 'top',
                trigger: ['hover'],
                overlay: _react2.default.createElement(
                  'span',
                  null,
                  '\u751F\u6210\u6743\u9650\u7BA1\u7406\u7684\u793A\u4F8B\u4EE3\u7801'
                )
              },
              _react2.default.createElement(_foundationSymbol2.default, {
                type: 'bangzhu',
                size: 'xs',
                style: styles.icon
              })
            ),
            '\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { name: 'redux.authorityModule' },
            _react2.default.createElement(Checkbox, {
              size: 'large',
              checked: redux.authorityModule,
              disabled: !redux.enabled
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.formItem },
          _react2.default.createElement(
            'span',
            null,
            'Mock \u793A\u4F8B',
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                overlayStyle: { width: '100px' },
                placement: 'top',
                trigger: ['hover'],
                overlay: _react2.default.createElement(
                  'span',
                  null,
                  '\u751F\u6210\u7B80\u5355\u7684 Mock \u793A\u4F8B\u4EE3\u7801'
                )
              },
              _react2.default.createElement(_foundationSymbol2.default, {
                type: 'bangzhu',
                size: 'xs',
                style: styles.icon
              })
            ),
            '\uFF1A'
          ),
          _react2.default.createElement(
            _formBinder.FormBinder,
            { name: 'redux.mockModule' },
            _react2.default.createElement(Checkbox, {
              size: 'large',
              checked: redux.mockModule,
              disabled: !redux.enabled
            })
          )
        )
      )
    );
  };

  return AdvancedForm;
}(_react.Component), _class.displayName = 'AdvancedForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = (0, _CreateForm2.default)(AdvancedForm);


var styles = {
  title: {
    fontWeight: '500'
  },
  formHead: {
    marginBottom: '20px'
  },
  formItem: {
    marginBottom: '15px'
  },
  icon: {
    margin: '0 4px',
    color: 'rgba(0, 0, 0, 0.2)'
  }
};
module.exports = exports['default'];

/***/ }),
/* 1125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__(1126);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var linkTagCache = {};

var DynamicIcon = (_temp = _class = function (_Component) {
  _inherits(DynamicIcon, _Component);

  function DynamicIcon(props) {
    _classCallCheck(this, DynamicIcon);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {};
    return _this;
  }

  DynamicIcon.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  DynamicIcon.prototype.render = function render() {
    var _cx;

    var _props = this.props,
        className = _props.className,
        size = _props.size,
        type = _props.type,
        others = _objectWithoutProperties(_props, ['className', 'size', 'type']);

    var classes = (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, 'ice-icon-stable-' + size, !!size), _defineProperty(_cx, 'ice-icon-stable', true), _defineProperty(_cx, 'ice-icon-stable-' + type, !!type), _defineProperty(_cx, className, !!className), _cx));
    return _react2.default.createElement('i', _extends({}, others, { className: classes }));
  };

  return DynamicIcon;
}(_react.Component), _class.displayName = 'DynamicIcon', _class.propTypes = {
  /**
   * 指定显示哪种图标
   */
  type: _propTypes2.default.string,
  /**
   * 指定图标大小
   */
  size: _propTypes2.default.oneOf(['xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'])
}, _class.defaultProps = {
  size: 'medium'
}, _temp);
exports.default = DynamicIcon;
module.exports = exports['default'];

/***/ }),
/* 1126 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LayoutBuilder = __webpack_require__(1128);

var _LayoutBuilder2 = _interopRequireDefault(_LayoutBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LayoutBuilder2.default;
module.exports = exports['default'];

/***/ }),
/* 1128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _PreviewLayout = __webpack_require__(857);

var _PreviewLayout2 = _interopRequireDefault(_PreviewLayout);

var _Form = __webpack_require__(1174);

var BuilderForm = _interopRequireWildcard(_Form);

__webpack_require__(1175);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Icon = __webpack_require__(174);

var Tab = __webpack_require__(674);

// import BasicForm from '../Form/BasicForm';
// import AsideForm from '../Form/AsideForm';
// import HeaderForm from '../Form/HeaderForm';
// import FooterForm from '../Form/FooterForm';

var TabPane = Tab.TabPane;

var LayoutBuilder = (_temp = _class = function (_Component) {
  _inherits(LayoutBuilder, _Component);

  function LayoutBuilder(props) {
    _classCallCheck(this, LayoutBuilder);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.defaultLayoutConfig = function () {
      return {
        // 模板名称
        name: 'app',

        // 模板类型: layout、redux、mobx
        type: 'redux',

        // 下载到指定的目录
        directory: __dirname,

        // 是否启用自定义模板名称
        enableName: true,

        // 是否启用主题
        enableTheme: true,

        // 布局方式: fluid-layout、boxed-layout
        layout: 'fluid-layout',

        // 主题配置
        themeConfig: {
          theme: 'dark',
          primaryColor: 'red',
          secondaryColor: '#3080fe'
        },

        // 是否启用 Header
        header: {
          position: 'static',
          width: 'full-width',
          enabled: true
        },

        // 是否启用 Aside
        aside: {
          position: 'embed-fixed',
          mode: 'vertical',
          width: 200,
          collapsed: false,
          enabled: true
        },

        // 是否启用 Footer
        footer: {
          position: 'fixed',
          width: 'full-width',
          enabled: true
        },

        // Redux 配置
        redux: {
          enabled: true,
          mockModule: true,
          authorityModule: true,
          registerLoginModule: true
        },

        // Mobx 配置
        mobx: {}
      };
    };

    _this.toggleBuilder = function () {
      var toggle = _this.state.toggle;

      _this.setState({
        toggle: !toggle
      });
    };

    _this.onChange = function (value) {
      console.log('表单回调:', value);
      _this.setState({
        layoutConfig: value
      });
    };

    _this.state = {
      toggle: false,
      layoutConfig: _this.defaultLayoutConfig()
    };
    return _this;
  }

  /**
   * 切换 Builder 面板
   */


  /**
   * 表单回调
   */


  LayoutBuilder.prototype.render = function render() {
    var layoutConfig = this.state.layoutConfig;

    var formProps = {
      value: layoutConfig,
      onChange: this.onChange
    };
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('layout-builder-container', {
            open: this.state.toggle
          })
        },
        _react2.default.createElement(
          'div',
          { className: 'layout-builder-toggle', onClick: this.toggleBuilder },
          _react2.default.createElement(Icon, { type: 'set', className: 'fa-spin' })
        ),
        _react2.default.createElement(
          Tab,
          { onChange: this.handleChange },
          _react2.default.createElement(
            TabPane,
            { key: '1', tab: '\u4E3B\u9898' },
            _react2.default.createElement(BuilderForm.BasicForm, formProps)
          ),
          _react2.default.createElement(
            TabPane,
            { key: '2', tab: '\u5E03\u5C40' },
            _react2.default.createElement(BuilderForm.HeaderForm, formProps),
            _react2.default.createElement(BuilderForm.AsideForm, formProps),
            _react2.default.createElement(BuilderForm.FooterForm, formProps)
          ),
          _react2.default.createElement(
            TabPane,
            { key: '5', tab: '\u9AD8\u7EA7' },
            _react2.default.createElement(BuilderForm.AdvancedForm, formProps)
          )
        )
      ),
      _react2.default.createElement(
        'div',
        {
          style: {
            width: '576px',
            height: '432px',
            overflow: 'height',
            display: 'inline-block'
          }
        },
        _react2.default.createElement(_PreviewLayout2.default, {
          value: layoutConfig,
          scale: 0.6,
          width: 960,
          height: 720
        })
      )
    );
  };

  return LayoutBuilder;
}(_react.Component), _class.displayName = 'LayoutBuilder', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = LayoutBuilder;
module.exports = exports['default'];

/***/ }),
/* 1129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp; /* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0, react/default-props-match-prop-types: 0, no-restricted-syntax: 0, no-prototype-builtins: 0 */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _layout = __webpack_require__(98);

var _layout2 = _interopRequireDefault(_layout);

var _Header = __webpack_require__(1130);

var _Header2 = _interopRequireDefault(_Header);

var _Aside = __webpack_require__(1165);

var _Aside2 = _interopRequireDefault(_Aside);

var _Footer = __webpack_require__(1169);

var _Footer2 = _interopRequireDefault(_Footer);

__webpack_require__(1173);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var PreviewLayout = (_temp = _class = function (_Component) {
  _inherits(PreviewLayout, _Component);

  function PreviewLayout(props) {
    _classCallCheck(this, PreviewLayout);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.formatLayoutConfig = function () {
      var value = deepClone(_this.state.layoutConfig);
      Object.keys(value).forEach(function (key) {
        if (['header', 'aside', 'footer'].indexOf(key) !== -1) {
          if (!value[key].enabled) {
            value[key] = null;
          }
        }
      });

      return value;
    };

    _this.renderContent = function () {
      var layoutConfig = _this.formatLayoutConfig();
      var header = _react2.default.createElement(_Header2.default, { themeConfig: layoutConfig.themeConfig });
      var aside = _react2.default.createElement(
        _layout2.default.Aside,
        { theme: layoutConfig.themeConfig.theme, width: 'auto' },
        _react2.default.createElement(_Aside2.default, { layoutConfig: layoutConfig })
      );
      var footer = _react2.default.createElement(_Footer2.default, null);

      var layoutFixable = layoutConfig.header && layoutConfig.header.position === 'fixed' || layoutConfig.footer && layoutConfig.footer.position === 'fixed' || layoutConfig.aside && layoutConfig.aside.position === 'embed-fixed';

      if (layoutConfig.header && layoutConfig.aside && layoutConfig.footer) {
        if (layoutConfig.header.width === 'full-width' && layoutConfig.footer.width === 'full-width') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            header,
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.aside.position !== 'embed-fixed'
              },
              aside,
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.aside.position === 'embed-fixed'
                },
                _this.props.children
              )
            ),
            footer
          );
        } else if (layoutConfig.header.width === 'elastic-width' && layoutConfig.footer.width === 'elastic-width') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            aside,
            layoutConfig.header.position === 'static' && layoutConfig.footer.position === 'static' && _react2.default.createElement(
              _layout2.default.Section,
              { scrollable: true },
              _react2.default.createElement(
                _layout2.default.Main,
                null,
                header,
                _this.props.children,
                footer
              )
            ),
            layoutConfig.header.position === 'fixed' && layoutConfig.footer.position === 'static' && _react2.default.createElement(
              _layout2.default.Section,
              null,
              header,
              _react2.default.createElement(
                _layout2.default.Main,
                { scrollable: true },
                _this.props.children,
                footer
              )
            ),
            layoutConfig.header.position === 'fixed' && layoutConfig.footer.position === 'fixed' && _react2.default.createElement(
              _layout2.default.Section,
              null,
              header,
              _react2.default.createElement(
                _layout2.default.Main,
                { scrollable: true },
                _this.props.children
              ),
              footer
            ),
            layoutConfig.header.position === 'static' && layoutConfig.footer.position === 'fixed' && _react2.default.createElement(
              _layout2.default.Section,
              null,
              _react2.default.createElement(
                _layout2.default.Main,
                { scrollable: true },
                header,
                _this.props.children
              ),
              footer
            )
          );
        } else if (layoutConfig.header.width === 'full-width' && layoutConfig.footer.width === 'elastic-width') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            header,
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.aside.position !== 'embed-fixed'
              },
              aside,
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.aside.position === 'embed-fixed'
                },
                _this.props.children,
                footer
              )
            )
          );
        } else if (layoutConfig.header.width === 'elastic-width' && layoutConfig.footer.width === 'full-width') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.aside.position !== 'embed-fixed'
              },
              aside,
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.aside.position !== 'embed-fixed'
                },
                header,
                _this.props.children
              )
            ),
            footer
          );
        }
      } else if (layoutConfig.aside && layoutConfig.footer) {
        if (layoutConfig.footer.width === 'full-width') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.aside.position !== 'embed-fixed'
              },
              aside,
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.aside.position === 'embed-fixed'
                },
                _this.props.children
              )
            ),
            footer
          );
        } else if (layoutConfig.footer.width === 'elastic-width') {
          _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            aside,
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.aside.position !== 'embed-fixed'
              },
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.aside.position === 'embed-fixed'
                },
                _this.props.children
              ),
              footer
            )
          );
        }
      } else if (layoutConfig.header && layoutConfig.aside) {
        if (layoutConfig.header.width === 'full-width') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            header,
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.aside.position !== 'embed-fixed'
              },
              aside,
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.aside.position === 'embed-fixed'
                },
                _this.props.children
              )
            )
          );
        } else if (layoutConfig.header.width === 'elastic-width') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            aside,
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.header.position !== 'fixed'
              },
              header,
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.header.position === 'fixed'
                },
                _this.props.children
              )
            )
          );
        }
      } else if (layoutConfig.header && layoutConfig.footer) {
        if (layoutConfig.header.position === 'fixed' && layoutConfig.footer.position === 'fixed' || layoutConfig.header.position === 'static' && layoutConfig.footer.position === 'static') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            _react2.default.createElement(
              _layout2.default.Section,
              {
                scrollable: layoutConfig.header.position === 'static' && layoutConfig.footer.position === 'static'
              },
              header,
              _react2.default.createElement(
                _layout2.default.Main,
                {
                  scrollable: layoutConfig.header.position === 'fixed' && layoutConfig.footer.position === 'fixed'
                },
                _this.props.children
              ),
              footer
            )
          );
        } else if (layoutConfig.header.position === 'fixed' && layoutConfig.footer.position === 'static') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            header,
            _react2.default.createElement(
              _layout2.default.Section,
              { scrollable: true },
              _react2.default.createElement(
                _layout2.default.Main,
                null,
                _this.props.children
              ),
              footer
            )
          );
        } else if (layoutConfig.header.position === 'static' && layoutConfig.footer.position === 'fixed') {
          return _react2.default.createElement(
            _layout2.default,
            { fixable: layoutFixable },
            _react2.default.createElement(
              _layout2.default.Section,
              { scrollable: true },
              header,
              _react2.default.createElement(
                _layout2.default.Main,
                null,
                _this.props.children
              )
            ),
            footer
          );
        }
      } else if (layoutConfig.header) {
        return _react2.default.createElement(
          _layout2.default,
          { fixable: layoutFixable },
          _react2.default.createElement(
            _layout2.default.Section,
            null,
            header,
            _react2.default.createElement(
              _layout2.default.Main,
              { scrollable: true },
              _this.props.children
            )
          )
        );
      } else if (layoutConfig.aside) {
        return _react2.default.createElement(
          _layout2.default,
          { fixable: layoutFixable },
          aside,
          _react2.default.createElement(
            _layout2.default.Section,
            null,
            _react2.default.createElement(
              _layout2.default.Main,
              { scrollable: true },
              _this.props.children
            )
          )
        );
      } else if (layoutConfig.footer) {
        return _react2.default.createElement(
          _layout2.default,
          { fixable: layoutFixable },
          _react2.default.createElement(
            _layout2.default.Section,
            null,
            _react2.default.createElement(
              _layout2.default.Main,
              { scrollable: true },
              _this.props.children
            )
          ),
          footer
        );
      }
    };

    _this.state = {
      layoutConfig: props.value
    };
    return _this;
  }

  PreviewLayout.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      layoutConfig: nextProps.value
    });
  };

  PreviewLayout.prototype.render = function render() {
    var _state$layoutConfig = this.state.layoutConfig,
        layoutConfig = _state$layoutConfig === undefined ? {} : _state$layoutConfig;
    var theme = layoutConfig.themeConfig.theme;
    var _props$scale = this.props.scale,
        scale = _props$scale === undefined ? 1 : _props$scale;

    var layoutClassName = 'ice-layout-builder ice-design-layout-' + theme + ' ice-design-layout ice-design-' + layoutConfig.layout;

    return _react2.default.createElement(
      'div',
      {
        className: layoutClassName,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'left top',
          width: this.props.width,
          height: this.props.height
        }
      },
      this.renderContent()
    );
  };

  return PreviewLayout;
}(_react.Component), _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = PreviewLayout;


function deepClone(source) {
  if (!source || (typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  var targetObj = source.constructor === Array ? [] : {};
  for (var _keys in source) {
    if (source.hasOwnProperty(_keys)) {
      if (source[_keys] && _typeof(source[_keys]) === 'object') {
        targetObj[_keys] = source[_keys].constructor === Array ? [] : {};
        targetObj[_keys] = deepClone(source[_keys]);
      } else {
        targetObj[_keys] = source[_keys];
      }
    }
  }
  return targetObj;
}
module.exports = exports['default'];

/***/ }),
/* 1130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Header = __webpack_require__(1131);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Header2.default;
module.exports = exports['default'];

/***/ }),
/* 1131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _img = __webpack_require__(1132);

var _img2 = _interopRequireDefault(_img);

var _layout = __webpack_require__(98);

var _layout2 = _interopRequireDefault(_layout);

var _menu = __webpack_require__(860);

var _menu2 = _interopRequireDefault(_menu);

var _foundationSymbol = __webpack_require__(791);

var _foundationSymbol2 = _interopRequireDefault(_foundationSymbol);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _Logo = __webpack_require__(865);

var _Logo2 = _interopRequireDefault(_Logo);

__webpack_require__(1163);

__webpack_require__(1164);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Balloon = __webpack_require__(723);

var Icon = __webpack_require__(174);

var headerMenuConfig = [{
  name: '首页',
  icon: 'home'
}, {
  name: '反馈',
  icon: 'message'
}, {
  name: '帮助',
  icon: 'bangzhu'
}];

var Header = function (_PureComponent) {
  _inherits(Header, _PureComponent);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    var _props = this.props,
        themeConfig = _props.themeConfig,
        isMobile = _props.isMobile,
        className = _props.className,
        style = _props.style;


    return _react2.default.createElement(
      _layout2.default.Header,
      {
        theme: themeConfig.theme,
        className: (0, _classnames2.default)('ice-design-layout-header', className),
        style: _extends({}, style)
      },
      _react2.default.createElement(_Logo2.default, { color: themeConfig.primaryColor }),
      _react2.default.createElement(
        'div',
        { className: 'ice-design-layout-header-menu' },
        headerMenuConfig && headerMenuConfig.length > 0 ? _react2.default.createElement(
          _menu2.default,
          { mode: 'horizontal', selectedKeys: [] },
          headerMenuConfig.map(function (nav, idx) {
            return _react2.default.createElement(
              _menu2.default.Item,
              { key: idx },
              _react2.default.createElement(
                'a',
                null,
                nav.icon ? _react2.default.createElement(_foundationSymbol2.default, { type: nav.icon, size: 'small' }) : null,
                !isMobile ? nav.name : null
              )
            );
          })
        ) : null,
        _react2.default.createElement(
          Balloon,
          {
            trigger: _react2.default.createElement(
              'div',
              { className: 'ice-design-header-userpannel' },
              _react2.default.createElement(_img2.default, {
                height: 40,
                width: 40,
                src: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
                className: 'user-avatar'
              }),
              _react2.default.createElement(
                'div',
                { className: 'user-profile' },
                _react2.default.createElement(
                  'span',
                  { className: 'user-name' },
                  '\u6DD8\u5C0F\u5B9D'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'span',
                  { className: 'user-department' },
                  '\u6280\u672F\u90E8'
                )
              ),
              _react2.default.createElement(Icon, {
                type: 'arrow-down-filling',
                size: 'xxs',
                className: 'icon-down'
              })
            ),
            closable: false,
            className: 'user-profile-menu'
          },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { className: 'user-profile-menu-item' },
              _react2.default.createElement(
                'a',
                { href: '#' },
                _react2.default.createElement(_foundationSymbol2.default, { type: 'person', size: 'small' }),
                '\u6211\u7684\u4E3B\u9875'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'user-profile-menu-item' },
              _react2.default.createElement(
                'a',
                { href: '#' },
                _react2.default.createElement(_foundationSymbol2.default, { type: 'repair', size: 'small' }),
                '\u8BBE\u7F6E'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'user-profile-menu-item' },
              _react2.default.createElement(
                'a',
                { href: '#' },
                _react2.default.createElement(_foundationSymbol2.default, { type: 'compass', size: 'small' }),
                '\u9000\u51FA'
              )
            )
          )
        )
      )
    );
  };

  return Header;
}(_react.PureComponent);

exports.default = Header;
module.exports = exports['default'];

/***/ }),
/* 1132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(858);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Img = __webpack_require__(1134);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Img2.default;

/***/ }),
/* 1133 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cover = __webpack_require__(1135);

var _Cover2 = _interopRequireDefault(_Cover);

var _Contain = __webpack_require__(1136);

var _Contain2 = _interopRequireDefault(_Contain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IceImg = (_temp = _class = function (_Component) {
  _inherits(IceImg, _Component);

  function IceImg(props) {
    _classCallCheck(this, IceImg);

    var _this = _possibleConstructorReturn(this, (IceImg.__proto__ || Object.getPrototypeOf(IceImg)).call(this, props));

    _this.handleImgLoadError = function () {
      if (_this.props.errorImgSrc) {
        _this.setState({
          src: _this.props.errorImgSrc
        });
      }
      _this.props.onError && _this.props.onError();
    };

    _this.state = {
      src: props.src
    };
    return _this;
  }

  _createClass(IceImg, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('src' in nextProps) {
        this.setState({
          src: nextProps.src
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var type = this.props.type;


      if (type === 'contain') {
        return _react2.default.createElement(_Contain2.default, _extends({}, this.props, this.state, {
          onError: this.handleImgLoadError
        }));
      }

      return _react2.default.createElement(_Cover2.default, _extends({}, this.props, this.state, {
        onError: this.handleImgLoadError
      }));
    }
  }]);

  return IceImg;
}(_react.Component), _class.displayName = 'IceImg', _class.propTypes = {
  /**
   * 图片显示模式
   */
  type: _propTypes2.default.oneOf(['cover', 'contain']),
  /**
   * 图片 url
   */
  src: _propTypes2.default.string.isRequired,
  /**
   * 图片的 title，hover 上去会显示出来
   */
  title: _propTypes2.default.string,
  /**
   * 图片加载失败的兜底图片
   */
  errorImgSrc: _propTypes2.default.string,
  /**
   * 图片加载失败的回调方法
   */
  onError: _propTypes2.default.func,
  /**
   * 图片显示宽度
   */
  width: _propTypes2.default.number,
  /**
   * 图片显示高度
   */
  height: _propTypes2.default.number,
  /**
   * 图片的 alt 通常用于屏幕阅读器（盲人）识别
   */
  alt: _propTypes2.default.string,
  /**
   * 形状展现
   */
  shape: _propTypes2.default.string,
  /**
   * 启用阿里 CDN 图片优化压缩后缀
   */
  enableAliCDNSuffix: _propTypes2.default.bool
}, _class.defaultProps = {
  type: 'cover',
  alt: '',
  title: '',
  errorImgSrc: '',
  className: '',
  shape: 'sharp',
  enableAliCDNSuffix: false
}, _temp);
exports.default = IceImg;

/***/ }),
/* 1135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _aliCDNSuffix = __webpack_require__(859);

var _aliCDNSuffix2 = _interopRequireDefault(_aliCDNSuffix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cover = (_temp = _class = function (_Component) {
  _inherits(Cover, _Component);

  function Cover(props) {
    _classCallCheck(this, Cover);

    var _this = _possibleConstructorReturn(this, (Cover.__proto__ || Object.getPrototypeOf(Cover)).call(this, props));

    _this.imgOnload = function () {
      _this.setState({
        imgStyles: {
          display: 'block',
          maxWidth: 'none',
          wdith: 'auto',
          height: 'auto',
          // transition: 'opacity 0.2s ease',
          opacity: 0
        }
      }, function () {
        var imgDOM = _this.refs.img;
        var _this$props = _this.props,
            width = _this$props.width,
            height = _this$props.height;

        var imgWidth = imgDOM.width;
        var imgHeight = imgDOM.height;

        var imgStyles = getStyles(width, height, imgWidth, imgHeight);
        _this.setState({
          imgStyles: _extends({}, _this.state.imgStyles, imgStyles, {
            opacity: 1
          })
        });
      });
    };

    _this.state = {
      imgStyles: {
        display: 'block',
        maxWidth: 'none',
        wdith: 'auto',
        height: 'auto',
        // transition: 'opacity 0.2s ease',
        opacity: 0
      }
    };
    return _this;
  }

  _createClass(Cover, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
        this.imgOnload();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          alt = _props.alt,
          title = _props.title,
          src = _props.src,
          width = _props.width,
          height = _props.height,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          className = _props.className,
          onError = _props.onError,
          shape = _props.shape,
          enableAliCDNSuffix = _props.enableAliCDNSuffix;


      var styles = _extends({}, style, {
        display: 'inline-block',
        overflow: 'hidden',
        width: width,
        height: height
      });
      var imgStyles = this.state.imgStyles;


      var realSrc = enableAliCDNSuffix ? src + (0, _aliCDNSuffix2.default)({ width: width, height: height }) : src;

      var cls = (0, _classnames2.default)('ice-img', shape, className);

      return _react2.default.createElement(
        'div',
        { className: cls, style: styles },
        _react2.default.createElement('img', {
          style: imgStyles,
          onError: onError,
          ref: 'img',
          src: realSrc,
          alt: alt,
          title: title,
          onLoad: this.imgOnload
        })
      );
    }
  }]);

  return Cover;
}(_react.Component), _class.displayName = 'Cover', _class.propTypes = {
  src: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  alt: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onError: _propTypes2.default.func
}, _class.defaultProps = {
  onError: function onError() {},
  alt: ''
}, _temp);
exports.default = Cover;


var getStyles = function getStyles(wrapWidth, wrapHeight, imgWidth, imgHeight) {
  // 进行等比运算
  var wrapRatio = wrapWidth / wrapHeight;
  var imgRatio = imgWidth / imgHeight;

  var finalWidth = 0;
  var finalHeight = 0;
  var finalMarginTop = 0;
  var finalMarginLeft = 0;

  if (wrapRatio > imgRatio) {
    // 父框宽度更大，以父框的宽度为准，拉伸图片上移
    finalWidth = wrapWidth;
    finalHeight = finalWidth / imgRatio;
    finalMarginTop = (finalHeight - wrapHeight) / 2 * -1;
  } else {
    // 父框高度更大，以父框高度为准，拉伸图片左移动
    finalHeight = wrapHeight;
    finalWidth = finalHeight * imgRatio;
    finalMarginLeft = (finalWidth - wrapWidth) / 2 * -1;
  }

  return {
    height: finalHeight,
    width: finalWidth,
    marginLeft: finalMarginLeft,
    marginTop: finalMarginTop
  };
};

/***/ }),
/* 1136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _aliCDNSuffix = __webpack_require__(859);

var _aliCDNSuffix2 = _interopRequireDefault(_aliCDNSuffix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contain = (_temp2 = _class = function (_Component) {
  _inherits(Contain, _Component);

  function Contain() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Contain);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contain.__proto__ || Object.getPrototypeOf(Contain)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Contain, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          alt = _props.alt,
          title = _props.title,
          src = _props.src,
          width = _props.width,
          height = _props.height,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          className = _props.className,
          onError = _props.onError,
          shape = _props.shape,
          enableAliCDNSuffix = _props.enableAliCDNSuffix;


      var styles = _extends({}, style, {
        display: 'inline-block',
        width: width,
        height: height,
        overflow: 'hidden'
      });

      var centerStyles = {
        width: width,
        height: height,
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center'
      };

      var imgStyles = {
        width: 'auto',
        height: 'auto',
        maxWidth: width,
        maxHeight: height
      };

      var realSrc = enableAliCDNSuffix ? src + (0, _aliCDNSuffix2.default)({ width: width, height: height }) : src;

      var cls = (0, _classnames2.default)('ice-img', shape, className);

      return _react2.default.createElement(
        'div',
        { className: cls, style: styles },
        _react2.default.createElement(
          'div',
          { style: centerStyles },
          _react2.default.createElement('img', {
            style: imgStyles,
            onError: onError,
            ref: 'img',
            src: realSrc,
            alt: alt,
            title: title
          })
        )
      );
    }
  }]);

  return Contain;
}(_react.Component), _class.displayName = 'Contain', _class.propTypes = {
  src: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  alt: _propTypes2.default.string,
  onError: _propTypes2.default.func,
  style: _propTypes2.default.object,
  shape: _propTypes2.default.string
}, _class.defaultProps = {
  onError: function onError() {},
  alt: ''
}, _temp2);
exports.default = Contain;

/***/ }),
/* 1137 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = __webpack_require__(684);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _MenuMixin = __webpack_require__(863);

var _MenuMixin2 = _interopRequireDefault(_MenuMixin);

var _util = __webpack_require__(739);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import React from 'react';
var Menu = (0, _createReactClass2['default'])({
  displayName: 'Menu',

  propTypes: {
    openSubMenuOnMouseEnter: _propTypes2['default'].bool,
    closeSubMenuOnMouseLeave: _propTypes2['default'].bool,
    selectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    defaultSelectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    defaultOpenKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    openKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    mode: _propTypes2['default'].string,
    onClick: _propTypes2['default'].func,
    onSelect: _propTypes2['default'].func,
    onDeselect: _propTypes2['default'].func,
    onDestroy: _propTypes2['default'].func,
    openTransitionName: _propTypes2['default'].string,
    openAnimation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    level: _propTypes2['default'].number,
    eventKey: _propTypes2['default'].string,
    selectable: _propTypes2['default'].bool,
    children: _propTypes2['default'].any
  },

  mixins: [_MenuMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      openSubMenuOnMouseEnter: true,
      closeSubMenuOnMouseLeave: true,
      selectable: true,
      onClick: _util.noop,
      onSelect: _util.noop,
      onOpenChange: _util.noop,
      onDeselect: _util.noop,
      defaultSelectedKeys: [],
      defaultOpenKeys: []
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var selectedKeys = props.defaultSelectedKeys;
    var openKeys = props.defaultOpenKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }
    if ('openKeys' in props) {
      openKeys = props.openKeys || [];
    }
    return {
      selectedKeys: selectedKeys,
      openKeys: openKeys
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys || [];
    }
    if ('openKeys' in nextProps) {
      props.openKeys = nextProps.openKeys || [];
    }
    this.setState(props);
  },
  onDestroy: function onDestroy(key) {
    var state = this.state;
    var props = this.props;
    var selectedKeys = state.selectedKeys;
    var openKeys = state.openKeys;
    var index = selectedKeys.indexOf(key);
    if (!('selectedKeys' in props) && index !== -1) {
      selectedKeys.splice(index, 1);
    }
    index = openKeys.indexOf(key);
    if (!('openKeys' in props) && index !== -1) {
      openKeys.splice(index, 1);
    }
  },
  onItemHover: function onItemHover(e) {
    var item = e.item;
    var _props = this.props,
        mode = _props.mode,
        closeSubMenuOnMouseLeave = _props.closeSubMenuOnMouseLeave;
    var _e$openChanges = e.openChanges,
        openChanges = _e$openChanges === undefined ? [] : _e$openChanges;
    // special for top sub menu

    if (mode !== 'inline' && !closeSubMenuOnMouseLeave && item.isSubMenu) {
      var activeKey = this.state.activeKey;
      var activeItem = this.getFlatInstanceArray().filter(function (c) {
        return c && c.props.eventKey === activeKey;
      })[0];
      if (activeItem && activeItem.props.open) {
        openChanges = openChanges.concat({
          key: item.props.eventKey,
          item: item,
          originalEvent: e,
          open: true
        });
      }
    }
    openChanges = openChanges.concat(this.getOpenChangesOnItemHover(e));
    if (openChanges.length) {
      this.onOpenChange(openChanges);
    }
  },
  onSelect: function onSelect(selectInfo) {
    var props = this.props;
    if (props.selectable) {
      // root menu
      var selectedKeys = this.state.selectedKeys;
      var selectedKey = selectInfo.key;
      if (props.multiple) {
        selectedKeys = selectedKeys.concat([selectedKey]);
      } else {
        selectedKeys = [selectedKey];
      }
      if (!('selectedKeys' in props)) {
        this.setState({
          selectedKeys: selectedKeys
        });
      }
      props.onSelect((0, _extends3['default'])({}, selectInfo, {
        selectedKeys: selectedKeys
      }));
    }
  },
  onClick: function onClick(e) {
    this.props.onClick(e);
  },
  onOpenChange: function onOpenChange(e_) {
    var props = this.props;
    var openKeys = this.state.openKeys.concat();
    var changed = false;
    var processSingle = function processSingle(e) {
      var oneChanged = false;
      if (e.open) {
        oneChanged = openKeys.indexOf(e.key) === -1;
        if (oneChanged) {
          openKeys.push(e.key);
        }
      } else {
        var index = openKeys.indexOf(e.key);
        oneChanged = index !== -1;
        if (oneChanged) {
          openKeys.splice(index, 1);
        }
      }
      changed = changed || oneChanged;
    };
    if (Array.isArray(e_)) {
      // batch change call
      e_.forEach(processSingle);
    } else {
      processSingle(e_);
    }
    if (changed) {
      if (!('openKeys' in this.props)) {
        this.setState({ openKeys: openKeys });
      }
      props.onOpenChange(openKeys);
    }
  },
  onDeselect: function onDeselect(selectInfo) {
    var props = this.props;
    if (props.selectable) {
      var selectedKeys = this.state.selectedKeys.concat();
      var selectedKey = selectInfo.key;
      var index = selectedKeys.indexOf(selectedKey);
      if (index !== -1) {
        selectedKeys.splice(index, 1);
      }
      if (!('selectedKeys' in props)) {
        this.setState({
          selectedKeys: selectedKeys
        });
      }
      props.onDeselect((0, _extends3['default'])({}, selectInfo, {
        selectedKeys: selectedKeys
      }));
    }
  },
  getOpenTransitionName: function getOpenTransitionName() {
    var props = this.props;
    var transitionName = props.openTransitionName;
    var animationName = props.openAnimation;
    if (!transitionName && typeof animationName === 'string') {
      transitionName = props.prefixCls + '-open-' + animationName;
    }
    return transitionName;
  },
  isInlineMode: function isInlineMode() {
    return this.props.mode === 'inline';
  },
  lastOpenSubMenu: function lastOpenSubMenu() {
    var lastOpen = [];
    var openKeys = this.state.openKeys;

    if (openKeys.length) {
      lastOpen = this.getFlatInstanceArray().filter(function (c) {
        return c && openKeys.indexOf(c.props.eventKey) !== -1;
      });
    }
    return lastOpen[0];
  },
  renderMenuItem: function renderMenuItem(c, i, subIndex) {
    if (!c) {
      return null;
    }
    var state = this.state;
    var extraProps = {
      openKeys: state.openKeys,
      selectedKeys: state.selectedKeys,
      openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter
    };
    return this.renderCommonMenuItem(c, i, subIndex, extraProps);
  },
  render: function render() {
    var props = (0, _extends3['default'])({}, this.props);
    props.className += ' ' + props.prefixCls + '-root';
    return this.renderRoot(props);
  }
});

exports['default'] = Menu;
module.exports = exports['default'];

/***/ }),
/* 1139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(178);

var emptyObject = __webpack_require__(1140);
var _invariant = __webpack_require__(1141);

if (false) { var warning; }

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (false) {} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillMount`.
     *
     * @optional
     */
    UNSAFE_componentWillMount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillReceiveProps`.
     *
     * @optional
     */
    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillUpdate`.
     *
     * @optional
     */
    UNSAFE_componentWillUpdate: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Similar to ReactClassInterface but for static methods.
   */
  var ReactClassStaticInterface = {
    /**
     * This method is invoked after a component is instantiated and when it
     * receives new props. Return an object to update state in response to
     * prop changes. Return null to indicate no change to state.
     *
     * If an object is returned, its keys will be merged into the existing state.
     *
     * @return {object || null}
     * @optional
     */
    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (false) {}
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (false) {}
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (false) {}
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (false) {}
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (false) { var isMixinValid, typeofSpec; }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (false) {}
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }

    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isAlreadyDefined = name in Constructor;
      if (isAlreadyDefined) {
        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
          ? ReactClassStaticInterface[name]
          : null;

        _invariant(
          specPolicy === 'DEFINE_MANY_MERGED',
          'ReactClass: You are attempting to define ' +
            '`%s` on your component more than once. This conflict may be ' +
            'due to a mixin.',
          name
        );

        Constructor[name] = createMergedResultFunction(Constructor[name], property);

        return;
      }

      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (false) { var _bind, componentName; }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (false) {}
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (false) {}

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (false) {}
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (false) {}

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (false) {}

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;


/***/ }),
/* 1140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {}

module.exports = emptyObject;

/***/ }),
/* 1141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 1142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createChainedFunction;
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @returns {function|null}
 */
function createChainedFunction() {
  var args = [].slice.call(arguments, 0);
  if (args.length === 1) {
    return args[0];
  }

  return function chainedFunction() {
    for (var i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 1143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1144);

/***/ }),
/* 1144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(1145);

function scrollIntoView(elem, container, config) {
  config = config || {};
  // document 归一化到 window
  if (container.nodeType === 9) {
    container = util.getWindow(container);
  }

  var allowHorizontalScroll = config.allowHorizontalScroll;
  var onlyScrollIfNeeded = config.onlyScrollIfNeeded;
  var alignWithTop = config.alignWithTop;
  var alignWithLeft = config.alignWithLeft;
  var offsetTop = config.offsetTop || 0;
  var offsetLeft = config.offsetLeft || 0;
  var offsetBottom = config.offsetBottom || 0;
  var offsetRight = config.offsetRight || 0;

  allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

  var isWin = util.isWindow(container);
  var elemOffset = util.offset(elem);
  var eh = util.outerHeight(elem);
  var ew = util.outerWidth(elem);
  var containerOffset = undefined;
  var ch = undefined;
  var cw = undefined;
  var containerScroll = undefined;
  var diffTop = undefined;
  var diffBottom = undefined;
  var win = undefined;
  var winScroll = undefined;
  var ww = undefined;
  var wh = undefined;

  if (isWin) {
    win = container;
    wh = util.height(win);
    ww = util.width(win);
    winScroll = {
      left: util.scrollLeft(win),
      top: util.scrollTop(win)
    };
    // elem 相对 container 可视视窗的距离
    diffTop = {
      left: elemOffset.left - winScroll.left - offsetLeft,
      top: elemOffset.top - winScroll.top - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (winScroll.left + ww) + offsetRight,
      top: elemOffset.top + eh - (winScroll.top + wh) + offsetBottom
    };
    containerScroll = winScroll;
  } else {
    containerOffset = util.offset(container);
    ch = container.clientHeight;
    cw = container.clientWidth;
    containerScroll = {
      left: container.scrollLeft,
      top: container.scrollTop
    };
    // elem 相对 container 可视视窗的距离
    // 注意边框, offset 是边框到根节点
    diffTop = {
      left: elemOffset.left - (containerOffset.left + (parseFloat(util.css(container, 'borderLeftWidth')) || 0)) - offsetLeft,
      top: elemOffset.top - (containerOffset.top + (parseFloat(util.css(container, 'borderTopWidth')) || 0)) - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (containerOffset.left + cw + (parseFloat(util.css(container, 'borderRightWidth')) || 0)) + offsetRight,
      top: elemOffset.top + eh - (containerOffset.top + ch + (parseFloat(util.css(container, 'borderBottomWidth')) || 0)) + offsetBottom
    };
  }

  if (diffTop.top < 0 || diffBottom.top > 0) {
    // 强制向上
    if (alignWithTop === true) {
      util.scrollTop(container, containerScroll.top + diffTop.top);
    } else if (alignWithTop === false) {
      util.scrollTop(container, containerScroll.top + diffBottom.top);
    } else {
      // 自动调整
      if (diffTop.top < 0) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  } else {
    if (!onlyScrollIfNeeded) {
      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
      if (alignWithTop) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  }

  if (allowHorizontalScroll) {
    if (diffTop.left < 0 || diffBottom.left > 0) {
      // 强制向上
      if (alignWithLeft === true) {
        util.scrollLeft(container, containerScroll.left + diffTop.left);
      } else if (alignWithLeft === false) {
        util.scrollLeft(container, containerScroll.left + diffBottom.left);
      } else {
        // 自动调整
        if (diffTop.left < 0) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
        if (alignWithLeft) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    }
  }
}

module.exports = scrollIntoView;

/***/ }),
/* 1145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

function getClientPosition(elem) {
  var box = undefined;
  var x = undefined;
  var y = undefined;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
  box = elem.getBoundingClientRect();

  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top;

  // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.

  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.

  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;

  return {
    left: x,
    top: y
  };
}

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getScrollLeft(w) {
  return getScroll(w);
}

function getScrollTop(w) {
  return getScroll(w, true);
}

function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}
function _getComputedStyle(elem, name, computedStyle_) {
  var val = '';
  var d = elem.ownerDocument;
  var computedStyle = computedStyle_ || d.defaultView.getComputedStyle(elem, null);

  // https://github.com/kissyteam/kissy/issues/61
  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }

  return val;
}

var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = 'currentStyle';
var RUNTIME_STYLE = 'runtimeStyle';
var LEFT = 'left';
var PX = 'px';

function _getComputedStyleIE(elem, name) {
  // currentStyle maybe null
  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
  // 在 ie 下不对，需要直接用 offset 方式
  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels
  // exclude left right for relativity
  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    // Remember the original values
    var style = elem.style;
    var left = style[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT];

    // prevent flashing of content
    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

    // Put in the new values to get a computed value out
    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
    ret = style.pixelLeft + PX;

    // Revert the changed values
    style[LEFT] = left;

    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }
  return ret === '' ? 'auto' : ret;
}

var getComputedStyleX = undefined;
if (typeof window !== 'undefined') {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}

function each(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
}

var BOX_MODELS = ['margin', 'border', 'padding'];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;

function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name = undefined;

  // Remember the old values, and insert the new ones
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }

  callback.call(elem);

  // Revert the old values
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}

function getPBMWidth(elem, props, which) {
  var value = 0;
  var prop = undefined;
  var j = undefined;
  var i = undefined;
  for (j = 0; j < props.length; j++) {
    prop = props[j];
    if (prop) {
      for (i = 0; i < which.length; i++) {
        var cssProp = undefined;
        if (prop === 'border') {
          cssProp = prop + which[i] + 'Width';
        } else {
          cssProp = prop + which[i];
        }
        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value;
}

/**
 * A crude way of determining if an object is a window
 * @member util
 */
function isWindow(obj) {
  // must use == for ie8
  /* eslint eqeqeq:0 */
  return obj != null && obj == obj.window;
}

var domUtils = {};

each(['Width', 'Height'], function (name) {
  domUtils['doc' + name] = function (refWin) {
    var d = refWin.document;
    return Math.max(
    // firefox chrome documentElement.scrollHeight< body.scrollHeight
    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
    d.documentElement['scroll' + name],
    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
    d.body['scroll' + name], domUtils['viewport' + name](d));
  };

  domUtils['viewport' + name] = function (win) {
    // pc browser includes scrollbar in window.innerWidth
    var prop = 'client' + name;
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop];
    // 标准模式取 documentElement
    // backcompat 取 body
    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
  };
});

/*
 得到元素的大小信息
 @param elem
 @param name
 @param {String} [extra]  'padding' : (css width) + padding
 'border' : (css width) + padding + border
 'margin' : (css width) + padding + border + margin
 */
function getWH(elem, name, extra) {
  if (isWindow(elem)) {
    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
  var computedStyle = getComputedStyleX(elem);
  var isBorderBox = isBorderBoxFn(elem, computedStyle);
  var cssBoxValue = 0;
  if (borderBoxValue == null || borderBoxValue <= 0) {
    borderBoxValue = undefined;
    // Fall back to computed then un computed css if necessary
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue == null || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    // Normalize '', auto, and prepare for extra
    cssBoxValue = parseFloat(cssBoxValue) || 0;
  }
  if (extra === undefined) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
  var val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
    }
    return cssBoxValue;
  }
  if (borderBoxValueOrIsBorderBox) {
    var padding = extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle);
    return val + (extra === BORDER_INDEX ? 0 : padding);
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
}

var cssShow = {
  position: 'absolute',
  visibility: 'hidden',
  display: 'block'
};

// fix #119 : https://github.com/kissyteam/kissy/issues/119
function getWHIgnoreDisplay(elem) {
  var val = undefined;
  var args = arguments;
  // in case elem is window
  // elem.offsetWidth === undefined
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(undefined, args);
  } else {
    swap(elem, cssShow, function () {
      val = getWH.apply(undefined, args);
    });
  }
  return val;
}

function css(el, name, v) {
  var value = v;
  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }
    return undefined;
  }
  if (typeof value !== 'undefined') {
    if (typeof value === 'number') {
      value += 'px';
    }
    el.style[name] = value;
    return undefined;
  }
  return getComputedStyleX(el, name);
}

each(['width', 'height'], function (name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils['outer' + first] = function (el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

  domUtils[name] = function (elem, val) {
    if (val !== undefined) {
      if (elem) {
        var computedStyle = getComputedStyleX(elem);
        var isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
        }
        return css(elem, name, val);
      }
      return undefined;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});

// 设置 elem 相对 elem.ownerDocument 的坐标
function setOffset(elem, offset) {
  // set position first, in-case top/left are set even on static elem
  if (css(elem, 'position') === 'static') {
    elem.style.position = 'relative';
  }

  var old = getOffset(elem);
  var ret = {};
  var current = undefined;
  var key = undefined;

  for (key in offset) {
    if (offset.hasOwnProperty(key)) {
      current = parseFloat(css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key];
    }
  }
  css(elem, ret);
}

module.exports = _extends({
  getWindow: function getWindow(node) {
    var doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },
  offset: function offset(el, value) {
    if (typeof value !== 'undefined') {
      setOffset(el, value);
    } else {
      return getOffset(el);
    }
  },

  isWindow: isWindow,
  each: each,
  css: css,
  clone: function clone(obj) {
    var ret = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }
    var overflow = obj.overflow;
    if (overflow) {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
    }
    return ret;
  },
  scrollLeft: function scrollLeft(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollLeft(w);
      }
      window.scrollTo(v, getScrollTop(w));
    } else {
      if (v === undefined) {
        return w.scrollLeft;
      }
      w.scrollLeft = v;
    }
  },
  scrollTop: function scrollTop(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollTop(w);
      }
      window.scrollTo(getScrollLeft(w), v);
    } else {
      if (v === undefined) {
        return w.scrollTop;
      }
      w.scrollTop = v;
    }
  },

  viewportWidth: 0,
  viewportHeight: 0
}, domUtils);

/***/ }),
/* 1146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = __webpack_require__(684);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DOMWrap = (0, _createReactClass2['default'])({
  displayName: 'DOMWrap',

  propTypes: {
    tag: _propTypes2['default'].string,
    hiddenClassName: _propTypes2['default'].string,
    visible: _propTypes2['default'].bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      tag: 'div'
    };
  },
  render: function render() {
    var props = (0, _extends3['default'])({}, this.props);
    if (!props.visible) {
      props.className = props.className || '';
      props.className += ' ' + props.hiddenClassName;
    }
    var Tag = props.tag;
    delete props.tag;
    delete props.hiddenClassName;
    delete props.visible;
    return _react2['default'].createElement(Tag, props);
  }
});

exports['default'] = DOMWrap;
module.exports = exports['default'];

/***/ }),
/* 1147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(48);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = __webpack_require__(684);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _SubPopupMenu = __webpack_require__(1148);

var _SubPopupMenu2 = _interopRequireDefault(_SubPopupMenu);

var _KeyCode = __webpack_require__(738);

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _util = __webpack_require__(739);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var guid = 0;

/* eslint react/no-is-mounted:0 */

var SubMenu = (0, _createReactClass2['default'])({
  displayName: 'SubMenu',

  propTypes: {
    parentMenu: _propTypes2['default'].object,
    title: _propTypes2['default'].node,
    children: _propTypes2['default'].any,
    selectedKeys: _propTypes2['default'].array,
    openKeys: _propTypes2['default'].array,
    onClick: _propTypes2['default'].func,
    onOpenChange: _propTypes2['default'].func,
    rootPrefixCls: _propTypes2['default'].string,
    eventKey: _propTypes2['default'].string,
    multiple: _propTypes2['default'].bool,
    active: _propTypes2['default'].bool,
    onSelect: _propTypes2['default'].func,
    closeSubMenuOnMouseLeave: _propTypes2['default'].bool,
    openSubMenuOnMouseEnter: _propTypes2['default'].bool,
    onDeselect: _propTypes2['default'].func,
    onDestroy: _propTypes2['default'].func,
    onItemHover: _propTypes2['default'].func,
    onMouseEnter: _propTypes2['default'].func,
    onMouseLeave: _propTypes2['default'].func,
    onTitleMouseEnter: _propTypes2['default'].func,
    onTitleMouseLeave: _propTypes2['default'].func,
    onTitleClick: _propTypes2['default'].func
  },

  mixins: [__webpack_require__(1149)],

  getDefaultProps: function getDefaultProps() {
    return {
      onMouseEnter: _util.noop,
      onMouseLeave: _util.noop,
      onTitleMouseEnter: _util.noop,
      onTitleMouseLeave: _util.noop,
      onTitleClick: _util.noop,
      title: ''
    };
  },
  getInitialState: function getInitialState() {
    this.isSubMenu = 1;
    return {
      defaultActiveFirst: false
    };
  },
  componentWillUnmount: function componentWillUnmount() {
    var _props = this.props,
        onDestroy = _props.onDestroy,
        eventKey = _props.eventKey,
        parentMenu = _props.parentMenu;

    if (onDestroy) {
      onDestroy(eventKey);
    }
    if (parentMenu.subMenuInstance === this) {
      this.clearSubMenuTimers();
    }
  },
  onDestroy: function onDestroy(key) {
    this.props.onDestroy(key);
  },
  onKeyDown: function onKeyDown(e) {
    var keyCode = e.keyCode;
    var menu = this.menuInstance;
    var isOpen = this.isOpen();

    if (keyCode === _KeyCode2['default'].ENTER) {
      this.onTitleClick(e);
      this.setState({
        defaultActiveFirst: true
      });
      return true;
    }

    if (keyCode === _KeyCode2['default'].RIGHT) {
      if (isOpen) {
        menu.onKeyDown(e);
      } else {
        this.triggerOpenChange(true);
        this.setState({
          defaultActiveFirst: true
        });
      }
      return true;
    }
    if (keyCode === _KeyCode2['default'].LEFT) {
      var handled = void 0;
      if (isOpen) {
        handled = menu.onKeyDown(e);
      } else {
        return undefined;
      }
      if (!handled) {
        this.triggerOpenChange(false);
        handled = true;
      }
      return handled;
    }

    if (isOpen && (keyCode === _KeyCode2['default'].UP || keyCode === _KeyCode2['default'].DOWN)) {
      return menu.onKeyDown(e);
    }
  },
  onOpenChange: function onOpenChange(e) {
    this.props.onOpenChange(e);
  },
  onMouseEnter: function onMouseEnter(e) {
    var props = this.props;
    this.clearSubMenuLeaveTimer();
    props.onMouseEnter({
      key: props.eventKey,
      domEvent: e
    });
  },
  onMouseLeave: function onMouseLeave(e) {
    var _this = this;

    var props = this.props;
    var parentMenu = props.parentMenu,
        eventKey = props.eventKey;

    parentMenu.subMenuInstance = this;
    parentMenu.subMenuLeaveFn = function () {
      // leave whole sub tree
      // still active
      if (props.mode !== 'inline') {
        var isOpen = _this.isOpen();
        if (isOpen && props.closeSubMenuOnMouseLeave && props.active) {
          props.onItemHover({
            key: eventKey,
            item: _this,
            hover: false,
            trigger: 'mouseleave',
            openChanges: [{
              key: eventKey,
              item: _this,
              trigger: 'mouseleave',
              open: false
            }]
          });
        } else {
          if (props.active) {
            props.onItemHover({
              key: eventKey,
              item: _this,
              hover: false,
              trigger: 'mouseleave'
            });
          }
          if (isOpen && props.closeSubMenuOnMouseLeave) {
            _this.triggerOpenChange(false);
          }
        }
      }
      // trigger mouseleave
      props.onMouseLeave({
        key: eventKey,
        domEvent: e
      });
    };
    // prevent popup menu and submenu gap
    parentMenu.subMenuLeaveTimer = setTimeout(parentMenu.subMenuLeaveFn, 100);
  },
  onTitleMouseEnter: function onTitleMouseEnter(domEvent) {
    var props = this.props;
    var parentMenu = props.parentMenu,
        key = props.eventKey;

    var item = this;
    this.clearSubMenuTitleLeaveTimer();
    if (parentMenu.menuItemInstance) {
      parentMenu.menuItemInstance.clearMenuItemMouseLeaveTimer();
    }
    var openChanges = [];
    if (props.openSubMenuOnMouseEnter) {
      openChanges.push({
        key: key,
        item: item,
        trigger: 'mouseenter',
        open: true
      });
    }
    props.onItemHover({
      key: key,
      item: item,
      hover: true,
      trigger: 'mouseenter',
      openChanges: openChanges
    });
    this.setState({
      defaultActiveFirst: false
    });
    props.onTitleMouseEnter({
      key: key,
      domEvent: domEvent
    });
  },
  onTitleMouseLeave: function onTitleMouseLeave(e) {
    var _this2 = this;

    var props = this.props;
    var parentMenu = props.parentMenu,
        eventKey = props.eventKey;

    parentMenu.subMenuInstance = this;
    parentMenu.subMenuTitleLeaveFn = function () {
      // leave whole sub tree
      // still active
      if (props.mode === 'inline' && props.active) {
        props.onItemHover({
          key: eventKey,
          item: _this2,
          hover: false,
          trigger: 'mouseleave'
        });
      }
      props.onTitleMouseLeave({
        key: props.eventKey,
        domEvent: e
      });
    };
    parentMenu.subMenuTitleLeaveTimer = setTimeout(parentMenu.subMenuTitleLeaveFn, 100);
  },
  onTitleClick: function onTitleClick(e) {
    var props = this.props;

    props.onTitleClick({
      key: props.eventKey,
      domEvent: e
    });
    if (props.openSubMenuOnMouseEnter) {
      return;
    }
    this.triggerOpenChange(!this.isOpen(), 'click');
    this.setState({
      defaultActiveFirst: false
    });
  },
  onSubMenuClick: function onSubMenuClick(info) {
    this.props.onClick(this.addKeyPath(info));
  },
  onSelect: function onSelect(info) {
    this.props.onSelect(info);
  },
  onDeselect: function onDeselect(info) {
    this.props.onDeselect(info);
  },
  getPrefixCls: function getPrefixCls() {
    return this.props.rootPrefixCls + '-submenu';
  },
  getActiveClassName: function getActiveClassName() {
    return this.getPrefixCls() + '-active';
  },
  getDisabledClassName: function getDisabledClassName() {
    return this.getPrefixCls() + '-disabled';
  },
  getSelectedClassName: function getSelectedClassName() {
    return this.getPrefixCls() + '-selected';
  },
  getOpenClassName: function getOpenClassName() {
    return this.props.rootPrefixCls + '-submenu-open';
  },
  saveMenuInstance: function saveMenuInstance(c) {
    this.menuInstance = c;
  },
  addKeyPath: function addKeyPath(info) {
    return (0, _extends3['default'])({}, info, {
      keyPath: (info.keyPath || []).concat(this.props.eventKey)
    });
  },
  triggerOpenChange: function triggerOpenChange(open, type) {
    var key = this.props.eventKey;
    this.onOpenChange({
      key: key,
      item: this,
      trigger: type,
      open: open
    });
  },
  clearSubMenuTimers: function clearSubMenuTimers() {
    this.clearSubMenuLeaveTimer();
    this.clearSubMenuTitleLeaveTimer();
  },
  clearSubMenuTitleLeaveTimer: function clearSubMenuTitleLeaveTimer() {
    var parentMenu = this.props.parentMenu;
    if (parentMenu.subMenuTitleLeaveTimer) {
      clearTimeout(parentMenu.subMenuTitleLeaveTimer);
      parentMenu.subMenuTitleLeaveTimer = null;
      parentMenu.subMenuTitleLeaveFn = null;
    }
  },
  clearSubMenuLeaveTimer: function clearSubMenuLeaveTimer() {
    var parentMenu = this.props.parentMenu;
    if (parentMenu.subMenuLeaveTimer) {
      clearTimeout(parentMenu.subMenuLeaveTimer);
      parentMenu.subMenuLeaveTimer = null;
      parentMenu.subMenuLeaveFn = null;
    }
  },
  isChildrenSelected: function isChildrenSelected() {
    var ret = { find: false };
    (0, _util.loopMenuItemRecusively)(this.props.children, this.props.selectedKeys, ret);
    return ret.find;
  },
  isOpen: function isOpen() {
    return this.props.openKeys.indexOf(this.props.eventKey) !== -1;
  },
  renderChildren: function renderChildren(children) {
    var props = this.props;
    var baseProps = {
      mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
      visible: this.isOpen(),
      level: props.level + 1,
      inlineIndent: props.inlineIndent,
      focusable: false,
      onClick: this.onSubMenuClick,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      selectedKeys: props.selectedKeys,
      eventKey: props.eventKey + '-menu-',
      openKeys: props.openKeys,
      openTransitionName: props.openTransitionName,
      openAnimation: props.openAnimation,
      onOpenChange: this.onOpenChange,
      closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
      defaultActiveFirst: this.state.defaultActiveFirst,
      multiple: props.multiple,
      prefixCls: props.rootPrefixCls,
      id: this._menuId,
      ref: this.saveMenuInstance
    };
    return _react2['default'].createElement(
      _SubPopupMenu2['default'],
      baseProps,
      children
    );
  },
  render: function render() {
    var _classes;

    var isOpen = this.isOpen();
    this.haveOpen = this.haveOpen || isOpen;
    var props = this.props;
    var prefixCls = this.getPrefixCls();
    var classes = (_classes = {}, (0, _defineProperty3['default'])(_classes, props.className, !!props.className), (0, _defineProperty3['default'])(_classes, prefixCls + '-' + props.mode, 1), _classes);

    classes[this.getOpenClassName()] = isOpen;
    classes[this.getActiveClassName()] = props.active;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getSelectedClassName()] = this.isChildrenSelected();

    if (!this._menuId) {
      if (props.eventKey) {
        this._menuId = props.eventKey + '$Menu';
      } else {
        this._menuId = '$__$' + ++guid + '$Menu';
      }
    }

    classes[prefixCls] = true;
    classes[prefixCls + '-' + props.mode] = 1;
    var mouseEvents = {};
    var titleClickEvents = {};
    var titleMouseEvents = {};
    if (!props.disabled) {
      mouseEvents = {
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter
      };
      titleClickEvents = {
        onClick: this.onTitleClick
      };
      // only works in title, not outer li
      titleMouseEvents = {
        onMouseEnter: this.onTitleMouseEnter,
        onMouseLeave: this.onTitleMouseLeave
      };
    }
    var style = {};
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return _react2['default'].createElement(
      'li',
      (0, _extends3['default'])({ className: (0, _classnames2['default'])(classes) }, mouseEvents, { style: props.style }),
      _react2['default'].createElement(
        'div',
        (0, _extends3['default'])({
          style: style,
          className: prefixCls + '-title'
        }, titleMouseEvents, titleClickEvents, {
          'aria-expanded': isOpen,
          'aria-owns': this._menuId,
          'aria-haspopup': 'true',
          title: typeof props.title === 'string' ? props.title : undefined
        }),
        props.title,
        _react2['default'].createElement('i', { className: prefixCls + '-arrow' })
      ),
      this.renderChildren(props.children)
    );
  }
});

SubMenu.isSubMenu = 1;

exports['default'] = SubMenu;
module.exports = exports['default'];

/***/ }),
/* 1148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(101);

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = __webpack_require__(684);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _MenuMixin = __webpack_require__(863);

var _MenuMixin2 = _interopRequireDefault(_MenuMixin);

var _rcAnimate = __webpack_require__(79);

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SubPopupMenu = (0, _createReactClass2['default'])({
  displayName: 'SubPopupMenu',

  propTypes: {
    onSelect: _propTypes2['default'].func,
    onClick: _propTypes2['default'].func,
    onDeselect: _propTypes2['default'].func,
    onOpenChange: _propTypes2['default'].func,
    onDestroy: _propTypes2['default'].func,
    openTransitionName: _propTypes2['default'].string,
    openAnimation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    openKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    closeSubMenuOnMouseLeave: _propTypes2['default'].bool,
    visible: _propTypes2['default'].bool,
    children: _propTypes2['default'].any
  },

  mixins: [_MenuMixin2['default']],

  onDeselect: function onDeselect(selectInfo) {
    this.props.onDeselect(selectInfo);
  },
  onSelect: function onSelect(selectInfo) {
    this.props.onSelect(selectInfo);
  },
  onClick: function onClick(e) {
    this.props.onClick(e);
  },
  onOpenChange: function onOpenChange(e) {
    this.props.onOpenChange(e);
  },
  onDestroy: function onDestroy(key) {
    this.props.onDestroy(key);
  },
  onItemHover: function onItemHover(e) {
    var _e$openChanges = e.openChanges,
        openChanges = _e$openChanges === undefined ? [] : _e$openChanges;

    openChanges = openChanges.concat(this.getOpenChangesOnItemHover(e));
    if (openChanges.length) {
      this.onOpenChange(openChanges);
    }
  },
  getOpenTransitionName: function getOpenTransitionName() {
    return this.props.openTransitionName;
  },
  renderMenuItem: function renderMenuItem(c, i, subIndex) {
    if (!c) {
      return null;
    }
    var props = this.props;
    var extraProps = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
      openSubMenuOnMouseEnter: true
    };
    return this.renderCommonMenuItem(c, i, subIndex, extraProps);
  },
  render: function render() {
    var renderFirst = this.renderFirst;
    this.renderFirst = 1;
    this.haveOpened = this.haveOpened || this.props.visible;
    if (!this.haveOpened) {
      return null;
    }
    var transitionAppear = true;
    if (!renderFirst && this.props.visible) {
      transitionAppear = false;
    }
    var props = (0, _extends3['default'])({}, this.props);
    props.className += ' ' + props.prefixCls + '-sub';
    var animProps = {};
    if (props.openTransitionName) {
      animProps.transitionName = props.openTransitionName;
    } else if ((0, _typeof3['default'])(props.openAnimation) === 'object') {
      animProps.animation = (0, _extends3['default'])({}, props.openAnimation);
      if (!transitionAppear) {
        delete animProps.animation.appear;
      }
    }
    return _react2['default'].createElement(
      _rcAnimate2['default'],
      (0, _extends3['default'])({}, animProps, {
        showProp: 'visible',
        component: '',
        transitionAppear: transitionAppear
      }),
      this.renderRoot(props)
    );
  }
});

exports['default'] = SubPopupMenu;
module.exports = exports['default'];

/***/ }),
/* 1149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KeyCode = __webpack_require__(738);

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _addEventListener = __webpack_require__(1150);

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _contains = __webpack_require__(1151);

var _contains2 = _interopRequireDefault(_contains);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  componentDidMount: function componentDidMount() {
    this.componentDidUpdate();
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.props.mode !== 'inline') {
      if (this.props.open) {
        this.bindRootCloseHandlers();
      } else {
        this.unbindRootCloseHandlers();
      }
    }
  },
  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
    if (e.keyCode === _KeyCode2['default'].ESC) {
      this.props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: false
      });
    }
  },
  handleDocumentClick: function handleDocumentClick(e) {
    // If the click originated from within this component
    // don't do anything.
    if ((0, _contains2['default'])(_reactDom2['default'].findDOMNode(this), e.target)) {
      return;
    }
    var props = this.props;
    props.onItemHover({
      hover: false,
      item: this,
      key: this.props.eventKey
    });
    this.triggerOpenChange(false);
  },
  bindRootCloseHandlers: function bindRootCloseHandlers() {
    if (!this._onDocumentClickListener) {
      this._onDocumentClickListener = (0, _addEventListener2['default'])(document, 'click', this.handleDocumentClick);
      this._onDocumentKeyupListener = (0, _addEventListener2['default'])(document, 'keyup', this.handleDocumentKeyUp);
    }
  },
  unbindRootCloseHandlers: function unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
      this._onDocumentClickListener = null;
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
      this._onDocumentKeyupListener = null;
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
};
module.exports = exports['default'];

/***/ }),
/* 1150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = addEventListenerWrap;

var _addDomEventListener = __webpack_require__(266);

var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addEventListenerWrap(target, eventType, cb, option) {
  /* eslint camelcase: 2 */
  var callback = _reactDom2['default'].unstable_batchedUpdates ? function run(e) {
    _reactDom2['default'].unstable_batchedUpdates(cb, e);
  } : cb;
  return (0, _addDomEventListener2['default'])(target, eventType, callback, option);
}
module.exports = exports['default'];

/***/ }),
/* 1151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = contains;
function contains(root, n) {
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
module.exports = exports['default'];

/***/ }),
/* 1152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = __webpack_require__(684);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _KeyCode = __webpack_require__(738);

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _util = __webpack_require__(739);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint react/no-is-mounted:0 */

var MenuItem = (0, _createReactClass2['default'])({
  displayName: 'MenuItem',

  propTypes: {
    rootPrefixCls: _propTypes2['default'].string,
    eventKey: _propTypes2['default'].string,
    active: _propTypes2['default'].bool,
    children: _propTypes2['default'].any,
    selectedKeys: _propTypes2['default'].array,
    disabled: _propTypes2['default'].bool,
    title: _propTypes2['default'].string,
    onSelect: _propTypes2['default'].func,
    onClick: _propTypes2['default'].func,
    onDeselect: _propTypes2['default'].func,
    parentMenu: _propTypes2['default'].object,
    onItemHover: _propTypes2['default'].func,
    onDestroy: _propTypes2['default'].func,
    onMouseEnter: _propTypes2['default'].func,
    onMouseLeave: _propTypes2['default'].func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: _util.noop,
      onMouseEnter: _util.noop,
      onMouseLeave: _util.noop
    };
  },
  componentWillUnmount: function componentWillUnmount() {
    var props = this.props;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
    if (props.parentMenu.menuItemInstance === this) {
      this.clearMenuItemMouseLeaveTimer();
    }
  },
  onKeyDown: function onKeyDown(e) {
    var keyCode = e.keyCode;
    if (keyCode === _KeyCode2['default'].ENTER) {
      this.onClick(e);
      return true;
    }
  },
  onMouseLeave: function onMouseLeave(e) {
    var _this = this;

    var props = this.props;
    var eventKey = props.eventKey,
        parentMenu = props.parentMenu;

    parentMenu.menuItemInstance = this;
    parentMenu.menuItemMouseLeaveFn = function () {
      if (props.active) {
        props.onItemHover({
          key: eventKey,
          item: _this,
          hover: false,
          domEvent: e,
          trigger: 'mouseleave'
        });
      }
    };
    parentMenu.menuItemMouseLeaveTimer = setTimeout(parentMenu.menuItemMouseLeaveFn, 30);
    props.onMouseLeave({
      key: eventKey,
      domEvent: e
    });
  },
  onMouseEnter: function onMouseEnter(e) {
    var props = this.props;
    var eventKey = props.eventKey,
        parentMenu = props.parentMenu;

    this.clearMenuItemMouseLeaveTimer();
    if (parentMenu.subMenuInstance) {
      parentMenu.subMenuInstance.clearSubMenuTimers();
    }
    props.onItemHover({
      key: eventKey,
      item: this,
      hover: true,
      domEvent: e,
      trigger: 'mouseenter'
    });
    props.onMouseEnter({
      key: eventKey,
      domEvent: e
    });
  },
  onClick: function onClick(e) {
    var props = this.props;
    var selected = this.isSelected();
    var eventKey = props.eventKey;
    var info = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: e
    };
    props.onClick(info);
    if (props.multiple) {
      if (selected) {
        props.onDeselect(info);
      } else {
        props.onSelect(info);
      }
    } else if (!selected) {
      props.onSelect(info);
    }
  },
  getPrefixCls: function getPrefixCls() {
    return this.props.rootPrefixCls + '-item';
  },
  getActiveClassName: function getActiveClassName() {
    return this.getPrefixCls() + '-active';
  },
  getSelectedClassName: function getSelectedClassName() {
    return this.getPrefixCls() + '-selected';
  },
  getDisabledClassName: function getDisabledClassName() {
    return this.getPrefixCls() + '-disabled';
  },
  clearMenuItemMouseLeaveTimer: function clearMenuItemMouseLeaveTimer() {
    var props = this.props;
    var parentMenu = props.parentMenu;
    if (parentMenu.menuItemMouseLeaveTimer) {
      clearTimeout(parentMenu.menuItemMouseLeaveTimer);
      parentMenu.menuItemMouseLeaveTimer = null;
      parentMenu.menuItemMouseLeaveFn = null;
    }
  },
  isSelected: function isSelected() {
    return this.props.selectedKeys.indexOf(this.props.eventKey) !== -1;
  },
  render: function render() {
    var props = this.props;
    var selected = this.isSelected();
    var classes = {};
    classes[this.getActiveClassName()] = !props.disabled && props.active;
    classes[this.getSelectedClassName()] = selected;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getPrefixCls()] = true;
    classes[props.className] = !!props.className;
    var attrs = (0, _extends3['default'])({}, props.attribute, {
      title: props.title,
      className: (0, _classnames2['default'])(classes),
      role: 'menuitem',
      'aria-selected': selected,
      'aria-disabled': props.disabled
    });
    var mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter
      };
    }
    var style = (0, _extends3['default'])({}, props.style);
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return _react2['default'].createElement(
      'li',
      (0, _extends3['default'])({
        style: style
      }, attrs, mouseEvent),
      props.children
    );
  }
});

MenuItem.isMenuItem = 1;

exports['default'] = MenuItem;
module.exports = exports['default'];

/***/ }),
/* 1153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = __webpack_require__(684);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var MenuItemGroup = (0, _createReactClass2['default'])({
  displayName: 'MenuItemGroup',

  propTypes: {
    renderMenuItem: _propTypes2['default'].func,
    index: _propTypes2['default'].number,
    className: _propTypes2['default'].string,
    rootPrefixCls: _propTypes2['default'].string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: true
    };
  },
  renderInnerMenuItem: function renderInnerMenuItem(item, subIndex) {
    var _props = this.props,
        renderMenuItem = _props.renderMenuItem,
        index = _props.index;

    return renderMenuItem(item, index, subIndex);
  },
  render: function render() {
    var props = this.props;
    var _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className,
        rootPrefixCls = props.rootPrefixCls;

    var titleClassName = rootPrefixCls + '-item-group-title';
    var listClassName = rootPrefixCls + '-item-group-list';
    return _react2['default'].createElement(
      'li',
      { className: className + ' ' + rootPrefixCls + '-item-group' },
      _react2['default'].createElement(
        'div',
        {
          className: titleClassName,
          title: typeof props.title === 'string' ? props.title : undefined
        },
        props.title
      ),
      _react2['default'].createElement(
        'ul',
        { className: listClassName },
        _react2['default'].Children.map(props.children, this.renderInnerMenuItem)
      )
    );
  }
});

MenuItemGroup.isMenuItemGroup = true;

exports['default'] = MenuItemGroup;
module.exports = exports['default'];

/***/ }),
/* 1154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = __webpack_require__(684);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Divider = (0, _createReactClass2['default'])({
  displayName: 'Divider',

  propTypes: {
    disabled: _propTypes2['default'].bool,
    className: _propTypes2['default'].string,
    rootPrefixCls: _propTypes2['default'].string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: true
    };
  },
  render: function render() {
    var _props = this.props,
        _props$className = _props.className,
        className = _props$className === undefined ? '' : _props$className,
        rootPrefixCls = _props.rootPrefixCls;

    return _react2['default'].createElement('li', { className: className + ' ' + rootPrefixCls + '-item-divider' });
  }
});

exports['default'] = Divider;
module.exports = exports['default'];

/***/ }),
/* 1155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

// import for the iconfont arrow-down
// do not delete this because of the css iconfont


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcMenu = __webpack_require__(862);

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = __webpack_require__(1156);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line

// selectedKeys openKeys props 不要随便设置默认值，否则可能会触发一些值获取逻辑从而出现问题

var noop = function noop() {};

var IceMenu = (_temp = _class = function (_Component) {
  _inherits(IceMenu, _Component);

  function IceMenu(props) {
    _classCallCheck(this, IceMenu);

    var _this = _possibleConstructorReturn(this, (IceMenu.__proto__ || Object.getPrototypeOf(IceMenu)).call(this, props));

    _initialiseProps.call(_this);

    var openKeys = [].concat(_toConsumableArray(props.defaultOpenKeys), _toConsumableArray(props.openKeys || []));

    _this.state = {
      openKeys: openKeys
    };
    return _this;
  }

  _createClass(IceMenu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.mode === 'inline' && nextProps.mode !== 'inline') {
        this.switchModeFromInline = true;
      }
      if ('openKeys' in nextProps) {
        this.setState({ openKeys: nextProps.openKeys });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var props = {};

      var className = (0, _classnames2.default)(this.props.className, (_classNames = {}, _defineProperty(_classNames, this.props.prefixCls + '-' + this.props.color + '-' + this.props.theme, this.props.color), _defineProperty(_classNames, this.props.prefixCls + '-' + this.props.theme, !this.props.color), _defineProperty(_classNames, this.props.prefixCls + '-collapse', this.props.inlineCollapsed), _classNames));

      if (this.props.mode !== 'inline') {
        // There is this.state.openKeys for
        // closing vertical popup submenu after click it
        props = {
          openKeys: this.state.openKeys,
          onClick: this.handleClick,
          onOpenChange: this.handleOpenChange,
          className: className
        };
      } else if (this.props.inlineCollapsed) {
        props = {
          className: className,
          mode: 'vertical'
        };
      } else {
        props = {
          className: className
        };
      }

      return _react2.default.createElement(_rcMenu2.default, _extends({}, this.props, props));
    }
  }]);

  return IceMenu;
}(_react.Component), _class.displayName = 'IceMenu', _class.propTypes = {
  /**
   * className 前缀
   */
  prefixCls: _propTypes2.default.string,
  /**
   * 主题风格（暗色系、亮色系）
   */
  theme: _propTypes2.default.oneOf(['light', 'dark']),
  /**
   * 主题颜色
   */
  color: _propTypes2.default.oneOf(['', 'green', 'red', 'blue', 'orange', 'reseo']),
  /**
   * 当前选中的菜单项 key 数组
   */
  selectedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string), // eslint-disable-line
  /**
   * 初始选中的菜单项 key 数组
   */
  defaultSelectedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  /**
   * 初始展开的 SubMenu 菜单项 key 数组
   */
  defaultOpenKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  /**
   * 当前展开的 SubMenu 菜单项 key 数组
   */
  openKeys: _propTypes2.default.arrayOf(_propTypes2.default.string), // eslint-disable-line
  /**
   * 菜单类型，现在支持垂直、水平、和内嵌模式三种 string: vertical horizontal inline
   */
  mode: _propTypes2.default.string,
  /**
   * 是否允许多选
   */
  multiple: _propTypes2.default.bool,
  /**
   * inline 模式的菜单缩进宽度
   */
  inlineIndent: _propTypes2.default.number,
  /**
   * 点击 MenuItem 调用此函数
   * @param {object} clickItem - 被点击的 item 相关信息
   * @param {object} clickItem.item - 被点击的 item
   * @param {string} clickItem.key - 被点击的 item 的 key
   * @param {array} clickItem.keyPath  - 被点击的 item 的路径
   */
  onClick: _propTypes2.default.func,
  /**
   * SubMenu 展开/关闭的回调
   * @param {string} openKeys - 打开的 keys
   */
  onOpenChange: _propTypes2.default.func,
  /**
   * 被选中时调
   * @param {object} selectedItem - 被选中的 item 相关信息
   * todo
   * @param {object} selectedItem.item - 被选中的 item
   * @param {string} selectedItem.key - 被选中的 item 的 key
   * @param {array} selectedItem.selectedKeys  - 当前被选中的 keys
   */
  onSelect: _propTypes2.default.func,
  /**
   * 取消选中时调用，仅在 multiple 生效
   * @param {object} selectedItem - 被取消选中的 item 相关信息
   * @param {object} selectedItem.item - 被取消选中的 item
   * @param {string} selectedItem.key - 被取消选中的 item 的 key
   * @param {array} selectedItem.selectedKeys  - 当前被选中的 keys
   */
  onDeselect: _propTypes2.default.func,
  /**
   * inline 时菜单是否收起状态
   */
  inlineCollapsed: _propTypes2.default.bool,
  /**
   * className
   */
  className: _propTypes2.default.string,
  openSubMenuOnMouseEnter: _propTypes2.default.bool,
  closeSubMenuOnMouseLeave: _propTypes2.default.bool,
  selectable: _propTypes2.default.bool
}, _class.defaultProps = {
  prefixCls: 'ice-menu',
  className: '',
  color: '',
  mode: 'vertical',
  openSubMenuOnMouseEnter: true,
  closeSubMenuOnMouseLeave: true,
  selectable: true,
  inlineCollapsed: undefined,
  multiple: false,
  inlineIndent: 24,
  onClick: noop,
  onSelect: noop,
  onOpenChange: noop,
  onDeselect: noop,
  defaultSelectedKeys: [],
  defaultOpenKeys: [],
  theme: 'light'
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleClick = function (e) {
    _this2.setOpenKeys([]);

    var onClick = _this2.props.onClick;

    if (onClick) {
      onClick(e);
    }
  };

  this.handleOpenChange = function (openKeys) {
    _this2.setOpenKeys(openKeys);

    var onOpenChange = _this2.props.onOpenChange;

    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  };

  this.setOpenKeys = function (openKeys) {
    if (!('openKeys' in _this2.props)) {
      _this2.setState({ openKeys: openKeys });
    }
  };
}, _temp);
exports.default = IceMenu;
module.exports = exports['default'];

/***/ }),
/* 1156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(864);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Icon = __webpack_require__(1158);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Icon2.default;
module.exports = exports['default'];

/***/ }),
/* 1157 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _NextIcon = __webpack_require__(1159);

var _NextIcon2 = _interopRequireDefault(_NextIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IceIcon = (_temp = _class = function (_Component) {
  _inherits(IceIcon, _Component);

  function IceIcon() {
    _classCallCheck(this, IceIcon);

    return _possibleConstructorReturn(this, (IceIcon.__proto__ || Object.getPrototypeOf(IceIcon)).apply(this, arguments));
  }

  _createClass(IceIcon, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          type = _props.type,
          _props$size = _props.size,
          size = _props$size === undefined ? 'medium' : _props$size,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          className = _props.className,
          others = _objectWithoutProperties(_props, ['prefixCls', 'type', 'size', 'style', 'className']);

      var cls = (0, _classnames3.default)(_defineProperty({
        'ice-icon-stable': true
      }, className, className));
      return _react2.default.createElement(_NextIcon2.default, _extends({
        style: style,
        type: type,
        size: size,
        className: cls
      }, others));
    }
  }]);

  return IceIcon;
}(_react.Component), _class.displayName = 'IceIcon', _class.propTypes = {
  /**
   * 指定显示哪种图标
   */
  type: _propTypes2.default.string.isRequired,
  /**
   * 指定 size的大小
   */
  size: _propTypes2.default.oneOf(['xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'])
}, _class.defaultProps = {
  size: 'medium'
}, _temp);
exports.default = IceIcon;
module.exports = exports['default'];

/***/ }),
/* 1159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = (_temp = _class = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          prefix = _props.prefix,
          type = _props.type,
          className = _props.className,
          size = _props.size,
          style = _props.style,
          others = _objectWithoutProperties(_props, ['prefix', 'type', 'className', 'size', 'style']);

      var sizeCls = {
        xxs: 'xxs',
        xs: 'xs',
        small: 'small',
        medium: 'medium',
        large: 'large',
        xl: 'xl',
        xxl: 'xxl',
        xxxl: 'xxxl'
      }[size] || '';

      var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, prefix + 'icon-stable', true), _defineProperty(_classNames, prefix + 'icon-stable-' + type, type), _defineProperty(_classNames, prefix + 'icon-stable-' + sizeCls, size), _defineProperty(_classNames, className, className), _classNames));
      return _react2.default.createElement('i', _extends({ style: style, className: classes }, others));
    }
  }]);

  return Icon;
}(_react.Component), _class.propTypes = {
  prefix: _propTypes2.default.string,
  type: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.string
}, _class.defaultProps = {
  prefix: 'ice-',
  size: 'medium'
}, _temp);
exports.default = Icon;
module.exports = exports['default'];

/***/ }),
/* 1160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(1161);

__webpack_require__(1162);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint object-shorthand: 0 */


var Logo = function (_PureComponent) {
  _inherits(Logo, _PureComponent);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Logo.prototype.render = function render() {
    var color = this.props.color;

    var logoStyle = color ? { color: color } : {};

    return _react2.default.createElement(
      'div',
      { className: 'logo', style: {} },
      _react2.default.createElement(
        'a',
        { href: '#', className: 'logo-text', style: _extends({}, logoStyle) },
        'LOGO'
      )
    );
  };

  return Logo;
}(_react.PureComponent);

exports.default = Logo;
module.exports = exports['default'];

/***/ }),
/* 1161 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1162 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1163 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1164 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Aside = __webpack_require__(1166);

var _Aside2 = _interopRequireDefault(_Aside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Aside2.default;
module.exports = exports['default'];

/***/ }),
/* 1166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps; /* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _menu = __webpack_require__(860);

var _menu2 = _interopRequireDefault(_menu);

var _foundationSymbol = __webpack_require__(791);

var _foundationSymbol2 = _interopRequireDefault(_foundationSymbol);

__webpack_require__(1167);

__webpack_require__(1168);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Icon = __webpack_require__(174);

var asideMenuConfig = [{
  name: '首页',
  path: '/',
  icon: 'home'
}, {
  name: '用户管理',
  path: '/user',
  icon: 'yonghu'
}, {
  name: '系统设置',
  path: '/setting',
  icon: 'shezhi'
}];

var Aside = (_temp = _class = function (_Component) {
  _inherits(Aside, _Component);

  function Aside(props) {
    _classCallCheck(this, Aside);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var _this$props$layoutCon = _this.props.layoutConfig,
        layoutConfig = _this$props$layoutCon === undefined ? {} : _this$props$layoutCon;
    var collapsed = layoutConfig.aside.collapsed;

    _this.state = {
      collapsed: collapsed
    };
    return _this;
  }

  Aside.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _nextProps$layoutConf = nextProps.layoutConfig,
        layoutConfig = _nextProps$layoutConf === undefined ? {} : _nextProps$layoutConf;
    var collapsed = layoutConfig.aside.collapsed;

    if (collapsed !== this.state.collapsed) {
      this.setState({
        collapsed: collapsed
      });
    }
  };

  /**
   * 左侧菜单收缩切换
   */


  Aside.prototype.render = function render() {
    var _props$layoutConfig = this.props.layoutConfig,
        layoutConfig = _props$layoutConfig === undefined ? {} : _props$layoutConfig;
    var themeConfig = layoutConfig.themeConfig;

    return _react2.default.createElement(
      'div',
      { className: 'ice-design-layout-aside' },
      _react2.default.createElement(
        'a',
        { className: 'collapse-btn', onClick: this.toggleCollapse },
        _react2.default.createElement(Icon, {
          type: this.state.collapsed ? 'arrow-right' : 'arrow-left',
          size: 'small'
        })
      ),
      _react2.default.createElement(
        _menu2.default,
        {
          style: { width: this.state.collapsed ? 60 : 200 },
          inlineCollapsed: this.state.collapsed,
          mode: 'inline',
          openKeys: ['0'],
          defaultSelectedKeys: ['/']
        },
        asideMenuConfig && asideMenuConfig.length > 0 && asideMenuConfig.map(function (nav, index) {
          var selected = index === 0 ? {
            borderRadius: '6px',
            background: '' + themeConfig.primaryColor
          } : {};
          return _react2.default.createElement(
            _menu.Item,
            { key: nav.path, style: _extends({}, selected) },
            _react2.default.createElement(
              'a',
              null,
              _react2.default.createElement(
                'span',
                null,
                nav.icon ? _react2.default.createElement(_foundationSymbol2.default, { size: 'small', type: nav.icon }) : null,
                _react2.default.createElement(
                  'span',
                  { className: 'ice-menu-collapse-hide' },
                  nav.name
                )
              )
            )
          );
        })
      )
    );
  };

  return Aside;
}(_react.Component), _class.propTypes = {}, _class.defaultProps = {}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.toggleCollapse = function () {
    var collapsed = _this2.state.collapsed;

    _this2.setState({
      collapsed: !collapsed
    });
  };
}, _temp);
exports.default = Aside;
module.exports = exports['default'];

/***/ }),
/* 1167 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1168 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Footer = __webpack_require__(1170);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Footer2.default;
module.exports = exports['default'];

/***/ }),
/* 1170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _layout = __webpack_require__(98);

var _layout2 = _interopRequireDefault(_layout);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _Logo = __webpack_require__(865);

var _Logo2 = _interopRequireDefault(_Logo);

__webpack_require__(1171);

__webpack_require__(1172);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Footer = function (_PureComponent) {
  _inherits(Footer, _PureComponent);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Footer.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        style = _props.style;

    return _react2.default.createElement(
      _layout2.default.Footer,
      {
        className: (0, _classnames2.default)('ice-design-layout-footer', className),
        style: _extends({}, style, {
          lineHeight: '36px'
        })
      },
      _react2.default.createElement(
        'div',
        { className: 'ice-design-layout-footer-body' },
        _react2.default.createElement(
          'div',
          { style: { filter: 'grayscale(50%)' } },
          _react2.default.createElement(_Logo2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'copyright' },
          '\xA9 2018 Theme designed by',
          ' ',
          _react2.default.createElement(
            'a',
            {
              href: 'https://github.com/alibaba/ice',
              target: '_blank',
              className: 'copyright-link',
              rel: 'noopener noreferrer'
            },
            'ICE'
          )
        )
      )
    );
  };

  return Footer;
}(_react.PureComponent);

exports.default = Footer;
module.exports = exports['default'];

/***/ }),
/* 1171 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1172 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1173 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedForm = exports.FooterForm = exports.AsideForm = exports.HeaderForm = exports.BasicForm = undefined;

var _BasicForm = __webpack_require__(817);

var _BasicForm2 = _interopRequireDefault(_BasicForm);

var _HeaderForm = __webpack_require__(853);

var _HeaderForm2 = _interopRequireDefault(_HeaderForm);

var _AsideForm = __webpack_require__(854);

var _AsideForm2 = _interopRequireDefault(_AsideForm);

var _FooterForm = __webpack_require__(855);

var _FooterForm2 = _interopRequireDefault(_FooterForm);

var _AdvancedForm = __webpack_require__(856);

var _AdvancedForm2 = _interopRequireDefault(_AdvancedForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BasicForm = _BasicForm2.default;
exports.HeaderForm = _HeaderForm2.default;
exports.AsideForm = _AsideForm2.default;
exports.FooterForm = _FooterForm2.default;
exports.AdvancedForm = _AdvancedForm2.default;

/***/ }),
/* 1175 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
])]);