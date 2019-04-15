(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(302);

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
__webpack_require__(122);
module.exports = __webpack_require__(303);

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(306);

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _progressLine = __webpack_require__(307);

var _progressLine2 = _interopRequireDefault(_progressLine);

var _progressCircle = __webpack_require__(308);

var _progressCircle2 = _interopRequireDefault(_progressCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Progress
 */
var Progress = (_temp = _class = function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Progress.prototype.render = function render() {
    var _props = this.props,
        prefix = _props.prefix,
        shape = _props.shape,
        suffix = _props.suffix,
        percent = _props.percent,
        others = _objectWithoutProperties(_props, ['prefix', 'shape', 'suffix', 'percent']);

    var newSuffix = suffix ? suffix : percent + '%';
    var newPrefix = this.context.prefix || prefix;
    var props = _extends({}, others, { percent: percent, suffix: newSuffix, prefix: newPrefix });
    return shape === 'circle' ? _react2['default'].createElement(_progressCircle2['default'], props) : _react2['default'].createElement(_progressLine2['default'], props);
  };

  return Progress;
}(_react.Component), _class.propTypes = {
  /**
   * 样式的品牌前缀
   */
  prefix: _propTypes2['default'].string,
  /**
   * 形态
   */
  shape: _propTypes2['default'].oneOf(['circle', 'line']),
  /**
   * 类型
   */
  type: _propTypes2['default'].oneOf(['normal', 'progressive']),
  /**
   * 尺寸
   */
  size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
  /**
   * 所占百分比
   */
  percent: _propTypes2['default'].number,
  /**
   * 进度条上的说明内容
   */
  suffix: _propTypes2['default'].node,
  /**
   * 是否展示内容
   */
  showInfo: _propTypes2['default'].bool,
  /**
   * 状态
   */
  state: _propTypes2['default'].oneOf(['success', 'error']),
  /**
   * 自定义样式名
   */
  className: _propTypes2['default'].string,
  /**
   * 是否开启动效
   */
  animation: _propTypes2['default'].bool
}, _class.defaultProps = {
  prefix: 'next-',
  shape: 'line',
  type: 'normal',
  size: 'medium',
  percent: 0,
  showInfo: true,
  animation: true
}, _class.contextTypes = {
  prefix: _propTypes2['default'].string
}, _temp);
Progress.displayName = 'Progress';
exports['default'] = Progress;
module.exports = exports['default'];

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Line = (_temp = _class = function (_Component) {
    _inherits(Line, _Component);

    function Line() {
        _classCallCheck(this, Line);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Line.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.line && this.props.animation) {
            // 延迟设置样式，为了增加一个默认的载入动效
            this.timeout = setTimeout(function () {
                _this2.line.style.width = _this2.props.percent + '%';
            }, 100);
        }
    };

    Line.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.percent !== this.props.percent && this.line) {
            this.line.style.width = this.props.percent + '%';
        }
    };

    Line.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };

    Line.prototype._lineRefHandler = function _lineRefHandler(ref) {
        this.line = ref;
    };

    Line.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props,
            prefix = _props.prefix,
            size = _props.size,
            showInfo = _props.showInfo,
            type = _props.type,
            suffix = _props.suffix,
            state = _props.state,
            percent = _props.percent,
            animation = _props.animation,
            className = _props.className,
            others = _objectWithoutProperties(_props, ['prefix', 'size', 'showInfo', 'type', 'suffix', 'state', 'percent', 'animation', 'className']);

        var wrapCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'progress-line', true), _defineProperty(_classNames, prefix + 'progress-line-' + size, size), _defineProperty(_classNames, prefix + 'progress-line-show-info', showInfo), _defineProperty(_classNames, prefix + 'progress-line-' + type, type), _defineProperty(_classNames, className, className), _classNames));
        var lineCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'progress-line-overlay', true), _defineProperty(_classNames2, prefix + 'progress-line-overlay-normal', true), _defineProperty(_classNames2, prefix + 'progress-line-overlay-' + state, state), _defineProperty(_classNames2, prefix + 'progress-line-overlay-started', type === 'progressive' && percent <= 30), _defineProperty(_classNames2, prefix + 'progress-line-overlay-middle', type === 'progressive' && percent > 30 && percent < 80), _defineProperty(_classNames2, prefix + 'progress-line-overlay-almostfinished', type === 'progressive' && percent >= 80), _classNames2));

        var lineStyle = animation ? { width: '0%' } : { width: percent + '%' };

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: wrapCls }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'progress-line-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'progress-line-underlay' },
                    _react2['default'].createElement('div', { className: lineCls, style: lineStyle, ref: this._lineRefHandler.bind(this) })
                )
            ),
            showInfo ? _react2['default'].createElement(
                'div',
                { className: prefix + 'progress-line-text' },
                suffix
            ) : null
        );
    };

    return Line;
}(_react.Component), _class.propTypes = {
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    percent: _propTypes2['default'].number,
    showInfo: _propTypes2['default'].bool,
    type: _propTypes2['default'].oneOf(['normal', 'progressive']),
    suffix: _propTypes2['default'].any,
    state: _propTypes2['default'].oneOf(['success', 'error'])
}, _class.defaultProps = {
    size: 'medium',
    percent: 0,
    showInfo: true,
    type: 'normal'
}, _temp);
Line.displayName = 'Line';
exports['default'] = Line;
module.exports = exports['default'];

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Circle = (_temp = _class = function (_Component) {
    _inherits(Circle, _Component);

    function Circle(props) {
        _classCallCheck(this, Circle);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            underlayStrokeWidth: 8,
            overlayStrokeWidth: 8
        };
        return _this;
    }

    Circle.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.underlay && this.overlay) {
            this.setState({
                underlayStrokeWidth: this._getCssValue(this.underlay, 'stroke-width') || 8,
                overlayStrokeWidth: this._getCssValue(this.overlay, 'stroke-width') || 8
            });

            // 如果开启了动效，延迟设置样式，为了增加一个默认的载入动效
            if (this.props.animation) {
                this.timeout = setTimeout(function () {
                    _this2.overlay.style.strokeDashoffset = _this2._computeOverlayStrokeDashOffset() + 'px';
                }, 100);
            }
        }
    };

    Circle.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.animation && prevProps.percent !== this.props.percent && this.overlay) {
            this.overlay.style.strokeDashoffset = this._computeOverlayStrokeDashOffset() + 'px';
        }
    };

    Circle.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };

    Circle.prototype._getCssValue = function _getCssValue(dom, name) {
        var css = window.getComputedStyle(dom).getPropertyValue(name);
        var regExp = /(\d*)px/g;
        var result = regExp.exec(css);

        return result instanceof Array ? Number(result[1]) : 0;
    };

    Circle.prototype._underlayRefHandler = function _underlayRefHandler(ref) {
        this.underlay = ref;
    };

    Circle.prototype._overlayRefHandler = function _overlayRefHandler(ref) {
        this.overlay = ref;
    };

    Circle.prototype._computeOverlayStrokeDashOffset = function _computeOverlayStrokeDashOffset() {
        var _state = this.state,
            underlayStrokeWidth = _state.underlayStrokeWidth,
            overlayStrokeWidth = _state.overlayStrokeWidth;

        var overlayRadius = 50 - overlayStrokeWidth / 2 - (underlayStrokeWidth - overlayStrokeWidth) / 2;
        var overlayLen = Math.PI * 2 * overlayRadius;
        return (100 - this.props.percent) / 100 * overlayLen;
    };

    Circle.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props,
            prefix = _props.prefix,
            className = _props.className,
            animation = _props.animation,
            others = _objectWithoutProperties(_props, ['prefix', 'className', 'animation']);

        var size = others.size,
            showInfo = others.showInfo,
            type = others.type,
            suffix = others.suffix,
            state = others.state,
            percent = others.percent;
        var _state2 = this.state,
            underlayStrokeWidth = _state2.underlayStrokeWidth,
            overlayStrokeWidth = _state2.overlayStrokeWidth;

        // underlay path

        var underlayRadius = 50 - underlayStrokeWidth / 2;
        var underlayPathString = 'M 50,50 m 0,-' + underlayRadius + '\n            a ' + underlayRadius + ',' + underlayRadius + ' 0 1 1 0,' + 2 * underlayRadius + '\n            a ' + underlayRadius + ',' + underlayRadius + ' 0 1 1 0,-' + 2 * underlayRadius;

        // overlay path (为居中，减去相对于underlay的宽度)
        var overlayRadius = 50 - overlayStrokeWidth / 2 - (underlayStrokeWidth - overlayStrokeWidth) / 2;
        var overlayLen = Math.PI * 2 * overlayRadius;
        var overlayPathString = 'M 50,50 m 0,-' + overlayRadius + '\n            a ' + overlayRadius + ',' + overlayRadius + ' 0 1 1 0,' + 2 * overlayRadius + '\n            a ' + overlayRadius + ',' + overlayRadius + ' 0 1 1 0,-' + 2 * overlayRadius;
        var overlayPathStyle = {
            strokeDasharray: overlayLen + 'px ' + overlayLen + 'px',
            strokeDashoffset: animation ? // 根据动效是否开启，决定是否设置 dom 的实际取值
            overlayLen + 'px' : this._computeOverlayStrokeDashOffset() + 'px'
        };

        var wrapCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'progress-circle', true), _defineProperty(_classNames, prefix + 'progress-circle-' + size, size), _defineProperty(_classNames, prefix + 'progress-circle-show-info', showInfo), _defineProperty(_classNames, prefix + 'progress-circle-' + type, type), _defineProperty(_classNames, className, className), _classNames));
        var pathCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'progress-circle-overlay', true), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-normal', true), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-' + state, state), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-started', type === 'progressive' && percent <= 30), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-middle', type === 'progressive' && percent > 30 && percent < 80), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-almostfinished', type === 'progressive' && percent >= 80), _classNames2));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: wrapCls }),
            _react2['default'].createElement(
                'svg',
                { className: prefix + 'progress-circle-container', viewBox: '0 0 100 100' },
                _react2['default'].createElement('path', { className: prefix + 'progress-circle-underlay', d: underlayPathString, fillOpacity: '0', ref: this._underlayRefHandler.bind(this) }),
                _react2['default'].createElement('path', { className: pathCls, d: overlayPathString, fillOpacity: '0', style: overlayPathStyle, ref: this._overlayRefHandler.bind(this) })
            ),
            showInfo ? _react2['default'].createElement(
                'div',
                { className: prefix + 'progress-circle-text' },
                suffix
            ) : null
        );
    };

    return Circle;
}(_react.Component), _class.propTypes = {
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    percent: _propTypes2['default'].number,
    showInfo: _propTypes2['default'].bool,
    type: _propTypes2['default'].oneOf(['normal', 'progressive']),
    suffix: _propTypes2['default'].any,
    state: _propTypes2['default'].oneOf(['success', 'error'])
}, _class.defaultProps = {
    size: 'medium',
    percent: 0,
    showInfo: true,
    type: 'normal'
}, _temp);
Circle.displayName = 'Circle';
exports['default'] = Circle;
module.exports = exports['default'];

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(742);
__webpack_require__(742);
module.exports = __webpack_require__(872);

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(891);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof window !== 'undefined') {
  // Polyfills for intersection-observer
  __webpack_require__(890);
}





var isStateless = function isStateless(Component) {
  return !Component.prototype.render;
};

function handleViewport(Component, options) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { disconnectOnLeave: false };

  var InViewport = function (_PureComponent) {
    _inherits(InViewport, _PureComponent);

    function InViewport(props) {
      _classCallCheck(this, InViewport);

      var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

      _this.observer = null;
      _this.node = null;
      _this.state = {
        inViewport: false,
        enterCount: 0,
        leaveCount: 0
      };
      _this.intersected = false;
      _this.handleIntersection = _this.handleIntersection.bind(_this);
      _this.initIntersectionObserver = _this.initIntersectionObserver.bind(_this);
      _this.setRef = _this.setRef.bind(_this);
      _this.setInnerRef = _this.setInnerRef.bind(_this);
      return _this;
    }

    InViewport.prototype.componentDidMount = function componentDidMount() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.initIntersectionObserver();
      this.startObserver(this.node, this.observer);
    };

    InViewport.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      // reset observer on update, to fix race condition that when observer init,
      // the element is not in viewport, such as in animation
      if (!this.intersected && !prevState.inViewport) {
        if (this.observer && this.node) {
          this.observer.unobserve(this.node);
          this.observer.observe(this.node);
        }
      }
    };

    InViewport.prototype.initIntersectionObserver = function initIntersectionObserver() {
      if (!this.observer) {
        this.observer = new IntersectionObserver(this.handleIntersection, options);
      }
    };

    InViewport.prototype.componentWillUnmount = function componentWillUnmount() {
      this.stopObserver(this.node, this.observer);
    };

    InViewport.prototype.startObserver = function startObserver(node, observer) {
      if (node && observer) {
        observer.observe(node);
      }
    };

    InViewport.prototype.stopObserver = function stopObserver(node, observer) {
      if (node && observer) {
        observer.unobserve(node);
        observer.disconnect();
        this.observer = null;
      }
    };

    InViewport.prototype.handleIntersection = function handleIntersection(entries) {
      var _props = this.props,
          onEnterViewport = _props.onEnterViewport,
          onLeaveViewport = _props.onLeaveViewport;

      var entry = entries[0] || {};
      var isIntersecting = entry.isIntersecting,
          intersectionRatio = entry.intersectionRatio;

      var inViewport = typeof isIntersecting !== 'undefined' ? isIntersecting : intersectionRatio > 0;

      // enter
      if (!this.intersected && inViewport) {
        this.intersected = true;
        onEnterViewport && onEnterViewport();
        this.setState({
          inViewport: inViewport,
          enterCount: this.state.enterCount + 1
        });
        return;
      }

      // leave
      if (this.intersected && !inViewport) {
        this.intersected = false;
        onLeaveViewport && onLeaveViewport();
        if (config.disconnectOnLeave) {
          // disconnect obsever on leave
          this.observer && this.observer.disconnect();
        }
        this.setState({
          inViewport: inViewport,
          leaveCount: this.state.leaveCount + 1
        });
      }
    };

    InViewport.prototype.setRef = function setRef(node) {
      this.node = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(node);
    };

    InViewport.prototype.setInnerRef = function setInnerRef(node) {
      if (node && !this.node) {
        // handle stateless
        this.node = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(node);
        this.initIntersectionObserver();
        this.startObserver(this.node, this.observer);
      }
    };

    InViewport.prototype.render = function render() {
      var _props2 = this.props,
          onEnterViewport = _props2.onEnterViewport,
          onLeaveViewport = _props2.onLeaveViewport,
          others = _objectWithoutProperties(_props2, ['onEnterViewport', 'onLeaveViewport']);
      // pass ref to class and innerRef for stateless component

      var refProps = isStateless(Component) ? { innerRef: this.setInnerRef } : { ref: this.setRef };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, others, {
        inViewport: this.state.inViewport,
        enterCount: this.state.enterCount,
        leaveCount: this.state.leaveCount
      }, refProps));
    };

    return InViewport;
  }(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default()(InViewport, Component);
}

/* harmony default export */ __webpack_exports__["a"] = (handleViewport);

/***/ }),

/***/ 723:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(768);
__webpack_require__(768);
module.exports = __webpack_require__(917);

/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(742);
module.exports = __webpack_require__(867);

/***/ }),

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(767);
__webpack_require__(767);
module.exports = __webpack_require__(121);

/***/ }),

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(767);
module.exports = __webpack_require__(173);

/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(768);
module.exports = __webpack_require__(915);

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWidth = getWidth;
exports.getHeight = getHeight;
exports.isIE8 = isIE8;
exports.getTransformPropertyName = getTransformPropertyName;
// 获取元素的宽
function getWidth(elem) {
    if (!elem) {
        return 0;
    }
    return elem.offsetWidth;
}

// 获取元素的高度
function getHeight(elem) {
    if (!elem) {
        return 0;
    }
    return elem.offsetHeight;
}

// 是否为 IE8 浏览器
function isIE8() {
    /* istanbul ignore if  */
    if (!document || typeof document === 'undefined') {
        return false;
    }
    var documentMode = document.documentMode || 0;
    return documentMode === 8;
}

var transformPropertyName = void 0;

function getTransformPropertyName() {
    /* istanbul ignore if  */
    if (!window.getComputedStyle) {
        return false;
    }
    if (transformPropertyName !== undefined) {
        return transformPropertyName;
    }
    var el = document.createElement('p');
    var has3d = void 0;
    var transforms = {
        webkitTransform: '-webkit-transform',
        OTransform: '-o-transform',
        msTransform: '-ms-transform',
        MozTransform: '-moz-transform',
        transform: 'transform'
    };
    // Add it to the body to get the computed style.
    document.body.insertBefore(el, null);
    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = 'translate3d(1px,1px,1px)';
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            if (has3d !== undefined && has3d.length > 0 && has3d !== 'none') {
                transformPropertyName = t;
            }
        }
    }
    document.body.removeChild(el);
    return transformPropertyName;
}

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextOverlay = __webpack_require__(121);

var _nextUtil = __webpack_require__(39);

var _inner = __webpack_require__(808);

var _inner2 = _interopRequireDefault(_inner);

var _alignMap = __webpack_require__(809);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

var alignMap = _alignMap.normalMap;

/** Balloon */
var Balloon = (_temp = _class = function (_React$Component) {
    _inherits(Balloon, _React$Component);

    function Balloon(props, context) {
        _classCallCheck(this, Balloon);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            align: props.align,
            visible: 'visible' in props ? props.visible : props.defaultVisible
        };
        return _this;
    }

    Balloon.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
        }
    };

    Balloon.prototype._onVisibleChange = function _onVisibleChange(visible) {
        // Not Controlled
        if (!('visible' in this.props)) {
            this.setState({
                visible: visible
            });
        }
        var onVisibleChange = this.props.onVisibleChange;
        if (this.props.onChange) {
            // 存在onChange即提示
            _nextUtil.log.deprecated('onChange', 'onVisibleChange', 'balloon');
            // 如果没有onVisibleChange, 用老的onChange api
            if (onVisibleChange === undefined) {
                onVisibleChange = this.props.onChange;
            }
        }
        //既没有onChange,也没有onVisibleChange
        if (onVisibleChange === undefined) {
            onVisibleChange = noop;
        }
        onVisibleChange(visible);
    };

    Balloon.prototype._onClose = function _onClose(e) {
        //this.props.onClose();
        this._onVisibleChange(false);
        this.props.onCloseClick();
        //必须加上preventDefault,否则单测IE下报错,出现full page reload 异常
        e.preventDefault();
    };

    Balloon.prototype._onPosition = function _onPosition(res) {
        alignMap = this.props.alignment === 'normal' ? _alignMap.normalMap : _alignMap.edgeMap;
        var newAlign = res.align.join(' ');
        var resAlign = void 0;

        for (var key in alignMap) {
            if (alignMap[key].align === newAlign) {
                resAlign = key;

                break;
            }
        }
        resAlign = resAlign || this.state.align;
        if (resAlign !== this.state.align) {
            this.setState({
                align: resAlign
            });
        }
    };

    Balloon.prototype.render = function render() {
        var _props = this.props,
            type = _props.type,
            _prefix = _props.prefix,
            className = _props.className,
            alignment = _props.alignment,
            trigger = _props.trigger,
            triggerType = _props.triggerType,
            children = _props.children,
            closable = _props.closable,
            shouldUpdatePosition = _props.shouldUpdatePosition,
            delay = _props.delay,
            needAdjust = _props.needAdjust,
            safeId = _props.safeId,
            autoFocus = _props.autoFocus,
            safeNode = _props.safeNode,
            onClick = _props.onClick,
            onHover = _props.onHover,
            animation = _props.animation,
            _offset = _props.offset,
            _style = _props.style,
            __isTooltip = _props.__isTooltip,
            container = _props.container,
            cache = _props.cache,
            others = _objectWithoutProperties(_props, ['type', 'prefix', 'className', 'alignment', 'trigger', 'triggerType', 'children', 'closable', 'shouldUpdatePosition', 'delay', 'needAdjust', 'safeId', 'autoFocus', 'safeNode', 'onClick', 'onHover', 'animation', 'offset', 'style', '__isTooltip', 'container', 'cache']),
            align = this.state.align;

        alignMap = alignment === 'normal' ? _alignMap.normalMap : _alignMap.edgeMap;
        var prefix = this.context.prefix || _prefix;

        var offset = [alignMap[align].offset[0] + _offset[0], alignMap[align].offset[1] + _offset[1]];
        var transformOrigin = alignMap[align].trOrigin;
        var style = _extends({ transformOrigin: transformOrigin }, _style);
        var content = _react2['default'].createElement(
            _inner2['default'],
            _extends({
                prefix: prefix,
                closable: closable,
                onClose: this._onClose.bind(this),
                __isTooltip: __isTooltip,
                className: className,
                style: style,
                align: align,
                type: type,
                alignment: alignment
            }, (0, _nextUtil.pickAttrs)(others)),
            children
        );

        return _react2['default'].createElement(
            _nextOverlay.Popup,
            { trigger: trigger,
                cache: cache,
                safeId: safeId,
                triggerType: triggerType,
                align: alignMap[align].align,
                offset: offset,
                visible: this.state.visible,
                onPosition: this._onPosition.bind(this),
                onClick: onClick,
                onHover: onHover,
                onClose: this.props.onClose,
                afterClose: this.props.afterClose,
                onVisibleChange: this._onVisibleChange.bind(this),
                shouldUpdatePosition: shouldUpdatePosition,
                needAdjust: needAdjust,
                animation: animation,
                delay: delay,
                autoFocus: autoFocus,
                safeNode: safeNode,
                container: container
            },
            content
        );
    };

    return Balloon;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * 浮层的内容
     */
    children: _propTypes2['default'].any,
    size: _propTypes2['default'].string,
    /**
     * 样式类型
     */
    type: _propTypes2['default'].oneOf(['normal', 'primary']),
    /**
     * 弹层当前显示的状态
     */
    visible: _propTypes2['default'].bool,
    /**
     * 弹层默认显示的状态
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 弹层在显示和隐藏触发的事件
     * @param {Boolean} visible 弹层是否隐藏和显示
     */
    onVisibleChange: _propTypes2['default'].func,
    /**
     * 弹出层对齐方式
     * @enumdesc 普通对齐 箭头居中, 边缘对齐 箭头可在trigger的边缘
     */
    alignment: _propTypes2['default'].oneOf(['normal', 'edge']),
    /**
     * 是否显示关闭按钮
     */
    closable: _propTypes2['default'].bool,
    /**
     * 弹出层位置
     * @enumdesc 上, 右, 下, 左, 上左, 上右, 下左, 下右, 左上, 左下, 右上, 右下
     */
    align: _propTypes2['default'].oneOf(['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br', 'lt', 'lb', 'rt', 'rb']),
    /**
     * 弹层相对于trigger的定位的微调
     */
    offset: _propTypes2['default'].array,
    /**
     * 触发元素
     */
    trigger: _propTypes2['default'].any,
    /**
     * 触发行为
     * @enumdesc 鼠标悬浮, 获取到焦点, 鼠标点击
     */
    triggerType: _propTypes2['default'].oneOf(['hover', 'focus', 'click']),
    onChange: _propTypes2['default'].func,

    onClick: _propTypes2['default'].func,
    /**
     * 任何visible为false时会触发的事件
     */
    onClose: _propTypes2['default'].func,
    /**
     * 点击关闭按钮的click事件
     */
    onCloseClick: _propTypes2['default'].func,
    onHover: _propTypes2['default'].func,
    /**
     * 是否进行自动位置调整
     */
    needAdjust: _propTypes2['default'].bool,
    /**
     * 弹层在触发以后的延时显示
     */
    delay: _propTypes2['default'].number,
    /**
     * 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
     */
    afterClose: _propTypes2['default'].func,
    /**
     * 强制更新定位信息
     */
    shouldUpdatePosition: _propTypes2['default'].bool,
    /**
     * 弹层出现后是否自动focus到内部第一个元素
     */
    autoFocus: _propTypes2['default'].bool,
    /**
     * 安全节点:对于triggetType为click的浮层,会在点击除了浮层外的其它区域时关闭浮层.safeNode用于添加不触发关闭的节点, 值可以是dom节点的id或者是节点的dom对象
     */
    safeNode: _propTypes2['default'].string,
    /**
     * 用来指定safeNode节点的id，和safeNode配合使用
     */
    safeId: _propTypes2['default'].string,
    /**
     * 配置动画的播放方式
     * @param {String} in 进场动画
     * @param {String} out 出场动画
     */
    animation: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].bool]),

    /**
     * 弹层的dom节点关闭时是否删除
     */
    cache: _propTypes2['default'].bool,
    /**
     * 指定浮层渲染的父节点, 可以为节点id的字符串，也可以返回节点的函数。
     */
    container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    __isTooltip: _propTypes2['default'].bool

}, _class.defaultProps = {
    prefix: 'next-',
    type: 'normal',
    closable: true,
    defaultVisible: false,
    size: 'medium',
    alignment: 'normal',
    align: 'b',
    offset: [0, 0],
    trigger: _react2['default'].createElement('span', null),
    onClose: noop,
    onCloseClick: noop,
    afterClose: noop,
    needAdjust: false,
    triggerType: 'hover',
    safeNode: undefined,
    safeId: null,
    autoFocus: false,
    animation: {
        'in': 'zoomIn',
        out: 'zoomOut'
    },
    cache: false,
    __isTooltip: false
}, _temp);
Balloon.displayName = 'Balloon';
exports['default'] = Balloon;
module.exports = exports['default'];

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /**
                    * Created by xiachi on 17/2/10.
                    */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _alignMap = __webpack_require__(809);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var alignMap = _alignMap.normalMap;

var noop = function noop() {};

var BalloonInner = (_temp = _class = function (_React$Component) {
    _inherits(BalloonInner, _React$Component);

    function BalloonInner() {
        _classCallCheck(this, BalloonInner);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    BalloonInner.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            _prefix = _props.prefix,
            closable = _props.closable,
            className = _props.className,
            style = _props.style,
            __isTooltip = _props.__isTooltip,
            align = _props.align,
            type = _props.type,
            onClose = _props.onClose,
            alignment = _props.alignment,
            children = _props.children,
            others = _objectWithoutProperties(_props, ['prefix', 'closable', 'className', 'style', '__isTooltip', 'align', 'type', 'onClose', 'alignment', 'children']);

        alignMap = alignment === 'normal' ? _alignMap.normalMap : _alignMap.edgeMap;
        var prefix = this.context.prefix || _prefix;
        prefix = prefix + 'balloon';
        if (__isTooltip) {
            prefix = prefix + '-tooltip';
        }
        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, '' + prefix, true), _defineProperty(_classNames, prefix + '-' + type, type), _defineProperty(_classNames, prefix + '-medium', true), _defineProperty(_classNames, prefix + '-' + alignMap[align].arrow, alignMap[align]), _defineProperty(_classNames, prefix + '-closable', closable), _defineProperty(_classNames, className, className), _classNames));
        return _react2['default'].createElement(
            'div',
            _extends({ className: classes, style: style }, others),
            closable ? _react2['default'].createElement(
                'a',
                { href: 'javascript:void(0);', className: prefix + '-close',
                    onClick: onClose },
                _react2['default'].createElement(_nextIcon2['default'], { type: 'close', size: 'small' })
            ) : null,
            children
        );
    };

    return BalloonInner;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    prefix: _propTypes2['default'].string,
    closable: _propTypes2['default'].bool,
    children: _propTypes2['default'].any,
    className: _propTypes2['default'].string,
    alignment: _propTypes2['default'].string,
    onClose: _propTypes2['default'].func,
    style: _propTypes2['default'].any,
    align: _propTypes2['default'].oneOf(['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br', 'lt', 'lb', 'rt', 'rb']),
    type: _propTypes2['default'].string,
    __isTooltip: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-',
    closable: true,
    onClose: noop,
    align: 'b',
    type: 'normal',
    alignment: 'normal'
}, _temp);
BalloonInner.displayName = 'BalloonInner';
exports['default'] = BalloonInner;
module.exports = exports['default'];

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by xiachi on 17/1/17.
 */

var alignMap = {
    normalMap: {
        t: {
            align: 'bc tc',
            arrow: 'bottom',
            trOrigin: 'bottom',
            offset: [0, -12]
        },
        r: {
            align: 'cl cr',
            arrow: 'left',
            trOrigin: 'left',
            offset: [12, 0]
        },
        b: {
            align: 'tc bc',
            arrow: 'top',
            trOrigin: 'top',
            offset: [0, 12]
        },
        l: {
            align: 'cr cl',
            arrow: 'right',
            trOrigin: 'right',
            offset: [-12, 0]
        },
        tl: {
            align: 'br tc',
            arrow: 'bottom-right',
            trOrigin: 'bottom right',
            offset: [20, -12]
        },
        tr: {
            align: 'bl tc',
            arrow: 'bottom-left',
            trOrigin: 'bottom left',
            offset: [-20, -12]
        },
        rt: {
            align: 'bl cr',
            arrow: 'left-bottom',
            trOrigin: 'bottom left',
            offset: [12, 20]
        },
        rb: {
            align: 'tl cr',
            arrow: 'left-top',
            trOrigin: 'top left',
            offset: [12, -20]
        },
        bl: {
            align: 'tr bc',
            arrow: 'top-right',
            trOrigin: 'top right',
            offset: [20, 12]
        },
        br: {
            align: 'tl bc',
            arrow: 'top-left',
            trOrigin: 'top left',
            offset: [-20, 12]
        },
        lt: {
            align: 'br cl',
            arrow: 'right-bottom',
            trOrigin: 'bottom right',
            offset: [-12, 20]
        },
        lb: {
            align: 'tr cl',
            arrow: 'right-top',
            trOrigin: 'top right',
            offset: [-12, -20]
        }
    },
    edgeMap: {
        t: {
            align: 'bc tc',
            arrow: 'bottom',
            trOrigin: 'bottom',
            offset: [0, -12]
        },
        r: {
            align: 'cl cr',
            arrow: 'left',
            trOrigin: 'left',
            offset: [12, 0]
        },
        b: {
            align: 'tc bc',
            arrow: 'top',
            trOrigin: 'top',
            offset: [0, 12]
        },
        l: {
            align: 'cr cl',
            arrow: 'right',
            trOrigin: 'right',
            offset: [-12, 0]
        },
        tl: {
            align: 'bl tl',
            arrow: 'bottom-left',
            trOrigin: 'bottom left',
            offset: [0, -12]
        },
        tr: {
            align: 'br tr',
            arrow: 'bottom-right',
            trOrigin: 'bottom right',
            offset: [0, -12]
        },
        rt: {
            align: 'tl tr',
            arrow: 'left-top',
            trOrigin: 'top left',
            offset: [12, 0]
        },
        rb: {
            align: 'bl br',
            arrow: 'left-bottom',
            trOrigin: 'bottom left',
            offset: [12, 0]
        },
        bl: {
            align: 'tl bl',
            arrow: 'top-left',
            trOrigin: 'top left',
            offset: [0, 12]
        },
        br: {
            align: 'tr br',
            arrow: 'top-right',
            trOrigin: 'top right',
            offset: [0, 12]
        },
        lt: {
            align: 'tr tl',
            arrow: 'right-top',
            trOrigin: 'top right',
            offset: [-12, 0]
        },
        lb: {
            align: 'br bl',
            arrow: 'right-bottom',
            trOrigin: 'bottom right',
            offset: [-12, 0]
        }
    }
};
exports['default'] = alignMap;
module.exports = exports['default'];

/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
__webpack_require__(83);
__webpack_require__(743);
__webpack_require__(871);

/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = __webpack_require__(39);

var _nextUtil2 = _interopRequireDefault(_nextUtil);

var _tabs = __webpack_require__(873);

var _tabs2 = _interopRequireDefault(_tabs);

var _tabPane = __webpack_require__(888);

var _tabPane2 = _interopRequireDefault(_tabPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/** Tab */
var NextTabs = (_temp = _class = function (_Component) {
  _inherits(NextTabs, _Component);

  function NextTabs() {
    _classCallCheck(this, NextTabs);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  NextTabs.prototype.handleRemove = function handleRemove(key, e) {
    e.stopPropagation();
    if (!key) {
      return;
    }
    this.props.onClose(key);
  };

  NextTabs.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        prefix = _props.prefix,
        type = _props.type,
        closeable = _props.closeable,
        children = _props.children,
        others = _objectWithoutProperties(_props, ['prefix', 'type', 'closeable', 'children']);

    var tabPrefix = this.context.prefix || prefix;
    var filteredChildren = _nextUtil2['default'].children.toArray(children).filter(_react2['default'].isValidElement);

    // only bar and wrapped tab could closable
    if (/^bar|wrapped$/i.test(type) && closeable === true) {
      filteredChildren = filteredChildren.map(function (child, index) {
        var childCloseable = child.props.closeable;

        var tabTail = childCloseable ? _react2['default'].createElement(_nextIcon2['default'], { type: 'close', onClick: function onClick(e) {
            return _this2.handleRemove(child.key, e);
          } }) : null;
        var tabInnerStyle = tabPrefix + 'tabs-tab-inner-content';
        return _react2['default'].cloneElement(child, {
          tab: _react2['default'].createElement(
            'div',
            { className: tabInnerStyle },
            child.props.tab,
            tabTail
          ),
          key: child.key || index
        });
      });
    }

    var tabsProps = _extends({
      prefix: tabPrefix,
      type: type,
      closeable: closeable
    }, others);
    return _react2['default'].createElement(
      _tabs2['default'],
      tabsProps,
      filteredChildren
    );
  };

  return NextTabs;
}(_react.Component), _class.contextTypes = {
  prefix: _propTypes2['default'].string
}, _class.propTypes = {
  /**
   * 样式前缀
   */
  prefix: _propTypes2['default'].string,
  /**
   * 被激活的选项卡的 key（受控）
   */
  activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  /**
   * 初始化时被激活的选项卡的 key（非受控）
   */
  defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  /**
   * 类型
   */
  type: _propTypes2['default'].oneOf(['bar', 'wrapped', 'text', 'capsule']),
  /**
   * 是否开启动效
   */
  animation: _propTypes2['default'].bool,
  /**
   * 多余项的展现方向
   */
  resDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
  /**
   * 导航选项卡的位置，只适用于包裹型（wrapped）选项卡
   */
  tabPosition: _propTypes2['default'].oneOf(['top', 'bottom', 'left', 'right']),
  /**
   * 尺寸
   */
  size: _propTypes2['default'].oneOf(['small', 'medium']),
  /**
   * 是否可关闭选项卡，只支持 `bar` 和 `wrapped` 两种类型
   */
  closeable: _propTypes2['default'].bool,
  /**
   * 触发选项卡的方式
   */
  triggerType: _propTypes2['default'].oneOf(['hover', 'click']),
  /**
   * 是否提前渲染好所有 TabPane 的内容
   */
  lazyLoad: _propTypes2['default'].bool,
  destroyInactiveTabPane: _propTypes2['default'].bool,
  /**
   * 导航条的附加样式
   */
  navStyle: _propTypes2['default'].object,
  /**
   * 内容区的附加样式
   */
  contentStyle: _propTypes2['default'].object,
  /**
   * 导航栏附加内容
   */
  tabBarExtraContent: _propTypes2['default'].node,
  /**
   * 选项卡发生切换时的事件回调
   * @param {String} key 改变后的 key
   */
  onChange: _propTypes2['default'].func,
  /**
   * 选项卡被关闭时的事件回调
   * @param {String} key   关闭的选项卡的 key
   * @param {Object} event Event 对象
   */
  onClose: _propTypes2['default'].func,
  children: _propTypes2['default'].any
}, _class.defaultProps = {
  prefix: 'next-',
  type: 'bar',
  size: 'medium',
  animation: true,
  tabPosition: 'top',
  resDirection: 'horizontal',
  triggerType: 'click',
  tabBarExtraContent: null,
  closeable: false,
  lazyLoad: true,
  navStyle: {},
  contentStyle: {},
  destroyInactiveTabPane: false,
  style: {},
  onChange: noop,
  onClose: noop
}, _temp);
NextTabs.displayName = 'NextTabs';


NextTabs.TabPane = _tabPane2['default'];

exports['default'] = NextTabs;
module.exports = exports['default'];

/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _keyCode = __webpack_require__(874);

var _keyCode2 = _interopRequireDefault(_keyCode);

var _nav = __webpack_require__(875);

var _nav2 = _interopRequireDefault(_nav);

var _utils = __webpack_require__(804);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function noop() {}

var Tabs = (_temp = _class = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props, context) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            activeKey: _this._getDefaultActiveKey(props),
            contentHeight: 0
        };
        return _this;
    }

    Tabs.prototype.componentDidMount = function componentDidMount() {
        this._setContentHeight(this.props);
    };

    Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('activeKey' in nextProps) {
            var newActiveKey = nextProps.activeKey;
            /* eslint-disable eqeqeq */
            if (newActiveKey != undefined) {
                this.setState({
                    activeKey: newActiveKey
                });
            }
        }
        if ('tabPosition' in nextProps && nextProps.tabPosition !== this.props.tabPosition) {
            this._setContentHeight(nextProps);
        }
    };

    Tabs.prototype.componentDidUpdate = function componentDidUpdate() {
        this._setContentHeight(this.props);
    };

    Tabs.prototype.onNavKeyDown = function onNavKeyDown(e) {
        var eventKeyCode = e.keyCode;
        if (eventKeyCode >= _keyCode2['default'].LEFT && eventKeyCode <= _keyCode2['default'].DOWN) {
            e.preventDefault();
        }
        if (eventKeyCode === _keyCode2['default'].RIGHT || eventKeyCode === _keyCode2['default'].DOWN) {
            var nextKey = this._getNextActiveKey(true);
            this.handleUserBehavior(this.props.triggerType, nextKey);
        } else if (eventKeyCode === _keyCode2['default'].LEFT || eventKeyCode === _keyCode2['default'].UP) {
            var previousKey = this._getNextActiveKey(false);
            this.handleUserBehavior(this.props.triggerType, previousKey);
        }
    };

    Tabs.prototype.handleUserBehavior = function handleUserBehavior(eventType, key) {
        var triggerType = this.props.triggerType;

        if (triggerType === eventType) {
            this._setActiveKey(key);
            if (this.state.activeKey !== key) {
                this.props.onChange(key);
            }
        }
    };

    // 设置 content 的最小高度


    Tabs.prototype._setContentHeight = function _setContentHeight(_ref) {
        var tabPosition = _ref.tabPosition,
            contentStyle = _ref.contentStyle;

        var contentHeight = (0, _utils.getHeight)(this.tabContent);
        if ((tabPosition === 'left' || tabPosition === 'right') && !contentStyle.minHeight) {
            var navHeight = (0, _utils.getHeight)(_reactDom2['default'].findDOMNode(this.tabNav));
            this.tabContent.style.minHeight = navHeight + 'px';
        }
        if (this.state.contentHeight !== contentHeight) {
            this.setState({ contentHeight: contentHeight });
        }
    };

    Tabs.prototype._setActiveKey = function _setActiveKey(key) {
        var currentActiveKey = this.state.activeKey;
        if (currentActiveKey === key || 'activeKey' in this.props) {
            return;
        }
        if (!currentActiveKey) {
            this.setState({
                activeKey: key
            });
        } else {
            var _getIndexPair2 = this._getIndexPair(this.props, currentActiveKey, key),
                currentIndex = _getIndexPair2.currentIndex,
                nextIndex = _getIndexPair2.nextIndex;

            var tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
            this.setState({
                activeKey: key,
                tabMovingDirection: tabMovingDirection
            });
        }
    };

    // 获取索引对 currentIndex 和 nextIndex


    Tabs.prototype._getIndexPair = function _getIndexPair(props, currentActiveKey, activeKey) {
        var keys = [];
        _react2['default'].Children.forEach(props.children, function (child) {
            keys.push(child.key);
        });
        var currentIndex = keys.indexOf(currentActiveKey);
        var nextIndex = keys.indexOf(activeKey);
        return {
            currentIndex: currentIndex, nextIndex: nextIndex
        };
    };

    Tabs.prototype._getDefaultActiveKey = function _getDefaultActiveKey(props) {
        var activeKey = void 0;
        if ('activeKey' in props) {
            activeKey = props.activeKey;
        } else if ('defaultActiveKey' in props) {
            activeKey = props.defaultActiveKey;
        } else {
            _react2['default'].Children.forEach(props.children, function (child) {
                if (activeKey == undefined && !child.props.disabled) {
                    activeKey = child.key;
                }
            });
        }
        return activeKey;
    };

    // 获取 content 下的 tabpane 列表


    Tabs.prototype._getTabPanes = function _getTabPanes() {
        var activeKey = this.state.activeKey;
        var _props = this.props,
            children = _props.children,
            prefix = _props.prefix,
            lazyLoad = _props.lazyLoad;

        var newChildren = [];
        _react2['default'].Children.forEach(children, function (child) {
            // react 会将整型的 key 转为字符串，而 preact 不会，这里使用 == 判断
            var active = activeKey == child.key;
            newChildren.push(_react2['default'].cloneElement(child, {
                active: active,
                prefix: prefix,
                lazyLoad: lazyLoad,

                // reset tab-content events
                onClick: noop,
                onMouseEnter: noop,
                onMouseLeave: noop
            }));
        });
        return newChildren;
    };

    Tabs.prototype._getNextActiveKey = function _getNextActiveKey(isNext) {
        var _this2 = this;

        var children = [];
        _react2['default'].Children.forEach(this.props.children, function (child) {
            if (!child.props.disabled) {
                if (isNext) {
                    children.push(child);
                } else {
                    children.unshift(child);
                }
            }
        });

        var length = children.length;
        var ret = length && children[0].key;
        children.forEach(function (child, i) {
            if (child.key === _this2.state.activeKey) {
                if (i === length - 1) {
                    ret = children[0].key;
                } else {
                    ret = children[i + 1].key;
                }
            }
        });
        return ret;
    };

    Tabs.prototype._contentRefHandler = function _contentRefHandler(ref) {
        this.tabContent = ref;
    };

    Tabs.prototype._navRefHandler = function _navRefHandler(ref) {
        this.tabNav = ref;
    };

    Tabs.prototype.render = function render() {
        var _classnames;

        var _props2 = this.props,
            prefix = _props2.prefix,
            type = _props2.type,
            size = _props2.size,
            animation = _props2.animation,
            tabPosition = _props2.tabPosition,
            resDirection = _props2.resDirection,
            tabBarExtraContent = _props2.tabBarExtraContent,
            navStyle = _props2.navStyle,
            contentStyle = _props2.contentStyle,
            destroyInactiveTabPane = _props2.destroyInactiveTabPane,
            lazyLoad = _props2.lazyLoad,
            style = _props2.style,
            className = _props2.className,
            children = _props2.children;


        var state = this.state;
        var tabPrefix = prefix + 'tabs';
        var shape = type === 'bar' ? 'strip' : type; // bar 类型 和组件内的 bar 组件有冲突, 这里使用 strip 替代 bar

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, tabPrefix, true), _defineProperty(_classnames, tabPrefix + '-' + shape, shape), _defineProperty(_classnames, tabPrefix + '-' + size, size), _defineProperty(_classnames, tabPrefix + '-vertical', ['left', 'right'].indexOf(tabPosition) >= 0), _defineProperty(_classnames, tabPrefix + '-' + tabPosition, true), _defineProperty(_classnames, className, !!className), _classnames));

        var tabPanes = this._getTabPanes();

        if (destroyInactiveTabPane) {
            tabPanes = tabPanes.filter(function (panel) {
                return panel.props.active;
            });
        }

        var navProps = {
            prefix: tabPrefix,
            activeKey: state.activeKey,
            type: type,
            size: size,
            animation: animation,
            tabBarExtraContent: tabBarExtraContent,
            tabPosition: tabPosition,
            resDirection: resDirection,
            lazyLoad: lazyLoad,
            style: navStyle,
            panels: children,
            contentHeight: state.contentHeight,
            onKeyDown: this.onNavKeyDown.bind(this),
            onTabEvent: this.handleUserBehavior.bind(this)
        };

        var contents = [_react2['default'].createElement(_nav2['default'], _extends({}, navProps, { key: 'tab-nav', ref: this._navRefHandler.bind(this) })), _react2['default'].createElement(
            'div',
            { key: 'tab-content', className: tabPrefix + '-content', style: contentStyle, ref: this._contentRefHandler.bind(this) },
            tabPanes
        )];

        if (tabPosition === 'bottom') {
            contents.reverse();
        }

        return _react2['default'].createElement(
            'div',
            { className: cls, style: style },
            contents
        );
    };

    return Tabs;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    type: _propTypes2['default'].oneOf(['bar', 'wrapped', 'wrapped-detached', 'text', 'capsule']),
    animation: _propTypes2['default'].bool,
    resDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    tabPosition: _propTypes2['default'].oneOf(['top', 'bottom', 'left', 'right']),
    size: _propTypes2['default'].oneOf(['small', 'medium']),
    closeable: _propTypes2['default'].bool,
    triggerType: _propTypes2['default'].oneOf(['hover', 'click']),
    lazyLoad: _propTypes2['default'].bool,
    /**
     * 销毁非活跃的 TabPane
     * TODO: 1.x 重构去掉或重命名
     */
    destroyInactiveTabPane: _propTypes2['default'].bool,
    navStyle: _propTypes2['default'].object,
    contentStyle: _propTypes2['default'].object,
    tabBarExtraContent: _propTypes2['default'].node,
    onChange: _propTypes2['default'].func,
    onClose: _propTypes2['default'].func,
    style: _propTypes2['default'].object,
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].any
}, _temp);
Tabs.displayName = 'Tabs';
exports['default'] = Tabs;
module.exports = exports['default'];

/***/ }),

/***/ 874:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
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
  DOWN: 40 // also NUM_SOUTH
};
module.exports = exports["default"];

/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames6 = __webpack_require__(8);

var _classnames7 = _interopRequireDefault(_classnames6);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextDropdown = __webpack_require__(304);

var _nextDropdown2 = _interopRequireDefault(_nextDropdown);

var _nextMenu = __webpack_require__(745);

var _nextMenu2 = _interopRequireDefault(_nextMenu);

var _nextAnimate = __webpack_require__(746);

var _nextAnimate2 = _interopRequireDefault(_nextAnimate);

var _nextDom = __webpack_require__(120);

var _nextDom2 = _interopRequireDefault(_nextDom);

var _nextUtil = __webpack_require__(39);

var _nextUtil2 = _interopRequireDefault(_nextUtil);

var _utils = __webpack_require__(804);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var tabTriggerEvents = {
    CLICK: 'click',
    HOVER: 'hover'
};

function noop() {}

var Nav = (_temp = _class = function (_React$Component) {
    _inherits(Nav, _React$Component);

    function Nav(props, context) {
        _classCallCheck(this, Nav);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this._navRefHandler = function (ref) {
            _this.nav = (0, _reactDom.findDOMNode)(ref);
        };

        _this._activeTabRefHandler = function (ref) {
            _this.activeTab = ref;
        };

        _this.onPrevClick = function () {
            var navWrapNodeWH = _this._getOffsetWH(_this.navWrap);
            _this._setOffset(_this.state.offset + navWrapNodeWH);
        };

        _this.onNextClick = function () {
            var navWrapNodeWH = _this._getOffsetWH(_this.navWrap);
            _this._setOffset(_this.state.offset - navWrapNodeWH);
        };

        _this.handleWindowResized = function () {
            /* istanbul ignore if */
            if (_this.updateTimer) {
                clearTimeout(_this.updateTimer);
            }
            /* istanbul ignore next */
            _this.updateTimer = setTimeout(function () {
                _this._update(_this.props);
                _this._getDropdownItems(_this.props);
                _this._setupStylesForExtraContent(_this.props);
            }, 100);
        };

        _this.state = {
            next: false,
            prev: false,
            offset: 0,
            dropdownTabs: []
        };
        return _this;
    }

    Nav.prototype.componentDidMount = function componentDidMount() {
        this._getDropdownItems(this.props); // 设置下拉菜单
        this._setupStylesForExtraContent(this.props);
        _nextDom2['default'].events.on(window, 'resize', this.handleWindowResized);
    };

    Nav.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _props = this.props,
            tabPosition = _props.tabPosition,
            resDirection = _props.resDirection;

        if (nextProps.tabPosition !== tabPosition && nextProps.resDirection !== resDirection) {
            this._setOffset(0);
            this._update();
        }
    };

    Nav.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.props.resDirection === 'horizontal' && this._isNextPrevShown(this.state) !== this._isNextPrevShown(prevState)) {
            this._scrollToActiveTab();
        }
        if (this.props.resDirection === 'vertical' && prevProps.panels && this.props.panels && prevProps.panels.length !== this.props.panels.length) {
            this._getDropdownItems(this.props);
        }
        this._update();
    };

    Nav.prototype.componentWillUnmount = function componentWillUnmount() {
        _nextDom2['default'].events.off(window, 'resize', this.handleWindowResized);
    };

    Nav.prototype._update = function _update() {
        var navNodeWH = this._getOffsetWH(this.nav);
        var navWrapNodeWH = this._getOffsetWH(this.navWrap);

        var minOffset = navWrapNodeWH - navNodeWH;
        var _state = this.state,
            next = _state.next,
            prev = _state.prev,
            offset = _state.offset;

        if (minOffset >= 0) {
            next = false;
            this._setOffset(0);
            offset = 0;
        } else if (minOffset < offset) {
            next = true;
        } else {
            next = false;
            this._setOffset(minOffset);
            offset = minOffset;
        }

        if (offset < 0) {
            prev = true;
        } else {
            prev = false;
        }

        this._setNext(next);
        this._setPrev(prev);

        var nextPrev = {
            next: next,
            prev: prev
        };

        return nextPrev;
    };

    // 如果存在 tabBarExtraContent 则为其设置默认样式，以满足其展示需求


    Nav.prototype._setupStylesForExtraContent = function _setupStylesForExtraContent(_ref) {
        var tabPosition = _ref.tabPosition,
            contentHeight = _ref.contentHeight,
            tabBarExtraContent = _ref.tabBarExtraContent;

        if (tabBarExtraContent && !(0, _utils.isIE8)()) {
            var scrollHeight = (0, _utils.getHeight)(this.navScroll);
            if (tabPosition === 'left' || tabPosition === 'right') {
                var extraHeight = (0, _utils.getHeight)(this.extra);
                var newBarHeight = void 0;
                if (contentHeight > scrollHeight + extraHeight) {
                    newBarHeight = contentHeight;
                } else {
                    newBarHeight = scrollHeight + extraHeight;
                }
                this.tabBar.style.height = newBarHeight + 'px';
                this.extra.style.position = 'absolute';
                this.extra.style.bottom = 0;
            } else {
                this.extra.style.float = 'right';
                this.extra.style.lineHeight = scrollHeight + 'px';
            }
        }
    };

    // 获取导航的项目


    Nav.prototype._getTabs = function _getTabs() {
        var _this2 = this;

        var _props2 = this.props,
            prefix = _props2.prefix,
            panels = _props2.panels,
            activeKey = _props2.activeKey;

        var rst = [];

        _react2['default'].Children.forEach(panels, function (child) {
            var _classnames;

            /*eslint-disable eqeqeq*/
            var isActive = activeKey == child.key;
            var cls = (0, _classnames7['default'])((_classnames = {}, _defineProperty(_classnames, prefix + '-tab', true), _defineProperty(_classnames, 'disabled', child.props.disabled), _defineProperty(_classnames, 'active', isActive), _defineProperty(_classnames, child.props.tabClassName, !!child.props.tabClassName), _classnames));

            var events = {};

            if (!child.props.disabled) {
                events = {
                    onClick: _this2.onNavItemClick.bind(_this2, child.key, child.props.onClick),
                    onMouseEnter: _this2.onNavItemMouseEnter.bind(_this2, child.key, child.props.onMouseEnter),
                    onMouseLeave: _this2.onNavItemMouseLeave.bind(_this2, child.key, child.props.onMouseLeave)
                };
            }

            // [1.x] itemStyle 废弃，使用 tabStyle 替代
            if (child.props.itemStyle) {
                _nextUtil2['default'].log.deprecated('itemStyle', 'tabStyle', 'TabPane');
            }

            var tabInnerStyle = child.props.tabStyle || child.props.itemStyle || null;

            rst.push(_react2['default'].createElement(
                'div',
                _extends({
                    role: 'tab',
                    key: child.key,
                    ref: isActive ? _this2._activeTabRefHandler : undefined,
                    'aria-disabled': child.props.disabled ? 'true' : 'false',
                    'aria-selected': isActive ? 'true' : 'false',
                    className: cls
                }, events),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + '-tab-inner', style: tabInnerStyle },
                    child.props.tab
                )
            ));
        });
        return rst;
    };

    Nav.prototype._getDropdownItems = function _getDropdownItems(_ref2) {
        var resDirection = _ref2.resDirection,
            panels = _ref2.panels;

        if (resDirection !== 'vertical') {
            return;
        }

        var wrapperWidth = (0, _utils.getWidth)(this.navWrap);
        var childNodes = this.nav.childNodes;

        var index = void 0;
        var total = panels.length;
        var tabsWidth = 0;
        for (index = 0; index < total; index++) {
            tabsWidth += childNodes[index].offsetWidth;
            if (tabsWidth > wrapperWidth) {
                break;
            }
        }

        if (index > 1) {
            this.setState({
                dropdownTabs: panels.slice(index)
            });
        }
    };

    Nav.prototype._getOffsetWH = function _getOffsetWH(node) {
        var tabPosition = this.props.tabPosition;

        var prop = void 0;
        if (tabPosition === 'left' || tabPosition === 'right') {
            prop = 'offsetHeight';
        } else {
            prop = 'offsetWidth';
        }
        return node[prop];
    };

    Nav.prototype._getOffsetLT = function _getOffsetLT(node) {
        var tabPosition = this.props.tabPosition;

        var prop = void 0;
        if (tabPosition === 'top' || tabPosition === 'bottom') {
            prop = 'left';
        } else {
            prop = 'top';
        }
        return node.getBoundingClientRect()[prop];
    };

    // 设置 nav 在点击 next/prev 时的偏移


    Nav.prototype._setOffset = function _setOffset(offset) {
        var tabPosition = this.props.tabPosition;

        var state = this.state;
        var target = Math.min(0, offset);
        if (state.offset !== target) {
            this.setState({
                offset: target
            });
        }

        var navOffset = void 0;
        var transformPropery = (0, _utils.getTransformPropertyName)();
        if (tabPosition === 'left' || tabPosition === 'right') {
            if (transformPropery) {
                navOffset = {
                    name: transformPropery,
                    value: 'translate3d(0, ' + target + 'px, 0)'
                };
            } else {
                navOffset = {
                    name: 'top',
                    value: target + 'px'
                };
            }
        } else if (transformPropery) {
            navOffset = {
                name: transformPropery,
                value: 'translate3d(' + target + 'px, 0, 0)'
            };
        } else {
            navOffset = {
                name: 'top',
                value: target + 'px'
            };
        }
        this.nav.style[navOffset.name] = navOffset.value;
    };

    Nav.prototype._setNext = function _setNext(v) {
        if (this.state.next !== v) {
            this.setState({
                next: v
            });
        }
    };

    Nav.prototype._setPrev = function _setPrev(v) {
        if (this.state.prev !== v) {
            this.setState({
                prev: v
            });
        }
    };

    Nav.prototype._isNextPrevShown = function _isNextPrevShown(state) {
        if (state) {
            return state.next || state.prev;
        }
        return this.state.next || this.state.prev;
    };

    Nav.prototype._setNextPrev = function _setNextPrev(nextPrev, callback) {
        this.setState(nextPrev, callback);
    };

    Nav.prototype._scrollToActiveTab = function _scrollToActiveTab() {
        if (this.activeTab) {
            var activeTabWH = this._getOffsetWH(this.activeTab);
            var navWrapNodeWH = this._getOffsetWH(this.navWrap);
            var offset = this.state.offset;

            var wrapOffset = this._getOffsetLT(this.navWrap);
            var activeTabOffset = this._getOffsetLT(this.activeTab);
            if (wrapOffset > activeTabOffset) {
                offset += wrapOffset - activeTabOffset;
                this._setOffset(offset);
            } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
                offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
                this._setOffset(offset);
            }
        }
    };

    Nav.prototype._instanceRefHandler = function _instanceRefHandler(attr, ref) {
        this[attr] = ref;
    };

    Nav.prototype.onNavItemClick = function onNavItemClick(key, callback, e) {
        e.stopPropagation();
        this.props.onTabEvent(tabTriggerEvents.CLICK, key);
        if (callback) {
            callback(key);
        }
    };

    Nav.prototype.onMenuItemClick = function onMenuItemClick(callback, key) {
        this.props.onTabEvent(tabTriggerEvents.CLICK, key);
        if (callback) {
            callback(key);
        }
    };

    Nav.prototype.onNavItemMouseEnter = function onNavItemMouseEnter(key, callback, e) {
        e.stopPropagation();
        this.props.onTabEvent(tabTriggerEvents.HOVER, key);
        if (callback) {
            callback(key, e);
        }
    };

    Nav.prototype.onNavItemMouseLeave = function onNavItemMouseLeave(key, callback, e) {
        e.stopPropagation();
        if (callback) {
            callback(key, e);
        }
    };

    Nav.prototype._renderDropdownMenus = function _renderDropdownMenus() {
        var _this3 = this,
            _classnames2;

        var tabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (!tabs.length) {
            return null;
        }

        var menus = tabs.map(function (panel) {
            var selected = panel.key === _this3.props.activeKey;
            return _react2['default'].createElement(
                _nextMenu2['default'].Item,
                { key: panel.key, onClick: _this3.onMenuItemClick.bind(_this3, panel.props.onClick), selected: selected },
                panel.props.tab
            );
        });

        var restBtnCls = (0, _classnames7['default'])((_classnames2 = {}, _defineProperty(_classnames2, this.props.prefix + '-tab-down', 1), _defineProperty(_classnames2, 'disabled', !this.state.next), _classnames2));

        var triggerBtn = _react2['default'].createElement(
            'span',
            { unselectable: 'unselectable', className: restBtnCls },
            _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-down' })
        );

        return _react2['default'].createElement(
            _nextDropdown2['default'],
            { align: 'tr br', triggerType: 'click', trigger: triggerBtn },
            _react2['default'].createElement(
                _nextMenu2['default'],
                null,
                menus
            )
        );
    };

    Nav.prototype.render = function render() {
        var _classnames5;

        var _props3 = this.props,
            prefix = _props3.prefix,
            resDirection = _props3.resDirection,
            tabBarExtraContent = _props3.tabBarExtraContent,
            onKeyDown = _props3.onKeyDown,
            animation = _props3.animation,
            style = _props3.style;

        var state = this.state;

        var tabs = this._getTabs();

        var nextButton = void 0;
        var prevButton = void 0;
        var restButton = void 0;

        var showNextPrev = state.prev || state.next;

        if (resDirection === 'vertical' && state.next) {
            restButton = this._renderDropdownMenus(state.dropdownTabs);
            prevButton = null;
            nextButton = null;
        } else if (showNextPrev) {
            var _classnames3, _classnames4;

            var prevBtnCls = (0, _classnames7['default'])((_classnames3 = {}, _defineProperty(_classnames3, prefix + '-tab-prev', 1), _defineProperty(_classnames3, 'disabled', !state.prev), _classnames3));
            var nextBtnCls = (0, _classnames7['default'])((_classnames4 = {}, _defineProperty(_classnames4, prefix + '-tab-next', 1), _defineProperty(_classnames4, 'disabled', !state.next), _classnames4));

            prevButton = _react2['default'].createElement(
                'span',
                {
                    onClick: state.prev ? this.onPrevClick : noop,
                    unselectable: 'unselectable',
                    className: prevBtnCls },
                _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-left' })
            );

            nextButton = _react2['default'].createElement(
                'span',
                {
                    onClick: state.next ? this.onNextClick : noop,
                    unselectable: 'unselectable',
                    className: nextBtnCls },
                _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-right' })
            );
            restButton = null;
        } else {
            nextButton = null;
            prevButton = null;
            restButton = null;
        }

        var containerCls = (0, _classnames7['default'])((_classnames5 = {}, _defineProperty(_classnames5, prefix + '-nav-container', true), _defineProperty(_classnames5, prefix + '-nav-container-scrolling', showNextPrev), _classnames5));

        return _react2['default'].createElement(
            'div',
            { role: 'tablist', className: prefix + '-bar', tabIndex: '0', onKeyDown: onKeyDown, ref: this._instanceRefHandler.bind(this, 'tabBar') },
            tabBarExtraContent ? _react2['default'].createElement(
                'div',
                { className: prefix + '-nav-extra', ref: this._instanceRefHandler.bind(this, 'extra') },
                tabBarExtraContent
            ) : null,
            _react2['default'].createElement(
                'div',
                { className: containerCls, style: style },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + '-nav-wrap', ref: this._instanceRefHandler.bind(this, 'navWrap') },
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + '-nav-scroll', ref: this._instanceRefHandler.bind(this, 'navScroll') },
                        animation ? _react2['default'].createElement(
                            _nextAnimate2['default'],
                            { animation: prefix + '-nav', singleMode: false, component: 'div', className: prefix + '-nav', ref: this._navRefHandler },
                            tabs
                        ) : _react2['default'].createElement(
                            'div',
                            { className: prefix + '-nav', ref: this._navRefHandler },
                            tabs
                        )
                    )
                ),
                prevButton,
                nextButton,
                restButton
            )
        );
    };

    return Nav;
}(_react2['default'].Component), _class.propTypes = {
    animation: _propTypes2['default'].bool,
    resDirection: _propTypes2['default'].string,
    tabPosition: _propTypes2['default'].string,
    tabBarExtraContent: _propTypes2['default'].any,
    onTabEvent: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    panels: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].object]),
    activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    prefix: _propTypes2['default'].string,
    children: _propTypes2['default'].any,
    style: _propTypes2['default'].object,
    contentHeight: _propTypes2['default'].number
}, _temp);
Nav.displayName = 'Nav';
exports['default'] = Nav;
module.exports = exports['default'];

/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/** Tab.TabPane */
var TabPane = (_temp = _class = function (_React$Component) {
    _inherits(TabPane, _React$Component);

    function TabPane() {
        _classCallCheck(this, TabPane);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    TabPane.prototype.render = function render() {
        var _classnames;

        var _props = this.props,
            prefix = _props.prefix,
            active = _props.active,
            className = _props.className,
            lazyLoad = _props.lazyLoad,
            onClick = _props.onClick,
            children = _props.children,
            others = _objectWithoutProperties(_props, ['prefix', 'active', 'className', 'lazyLoad', 'onClick', 'children']);

        this._isActived = this._isActived || active;
        if (!this._isActived && lazyLoad) {
            return null;
        }
        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'tabs-tabpane', true), _defineProperty(_classnames, '' + (active ? 'active' : 'hidden'), true), _defineProperty(_classnames, className, !!className), _classnames));
        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { role: 'tabpanel', 'aria-hidden': active ? 'false' : 'true', className: cls, onClick: onClick }),
            children
        );
    };

    return TabPane;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    active: _propTypes2['default'].bool,
    /**
     * 选项卡标题
     */
    tab: _propTypes2['default'].any,
    /**
     * 单个选项卡是否可关闭
     */
    closeable: _propTypes2['default'].bool,
    /**
     * 单个选项卡的补充样式
     */
    tabStyle: _propTypes2['default'].object, // 用于控制 next-tabs-tab-inner 的样式
    /**
     * 单个选项卡的附加样式类
     */
    tabClassName: _propTypes2['default'].string, // 用于控制 next-tabs-tab 的样式
    className: _propTypes2['default'].string, // 用于控制 next-tabs-tabpane 的样式
    children: _propTypes2['default'].any,
    /**
     * 点击单个选项卡时触发的回调
     * @param {String} key 选项卡的 key
     */
    onClick: _propTypes2['default'].func,
    /**
     * 鼠标进入时触发的回调
     * @param {String} key 选项卡的 key
     */
    onMouseEnter: _propTypes2['default'].func,
    /**
     * 鼠标离开时出发的回调
     * @param {String} key 选项卡的 key
     */
    onMouseLeave: _propTypes2['default'].func,
    lazyLoad: _propTypes2['default'].bool // 由 Tab 传入，用户不要传
}, _class.defaultProps = {
    prefix: 'next-',
    closeable: true, // 默认为可关闭，标记单个 tabpane 是否可关闭
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop
}, _temp);
TabPane.displayName = 'TabPane';
exports['default'] = TabPane;
module.exports = exports['default'];

/***/ }),

/***/ 890:
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

(function(window, document) {
'use strict';


// Exits early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }
  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}(window, document));


/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 915:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(83);
__webpack_require__(916);

/***/ }),

/***/ 916:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 917:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _balloon = __webpack_require__(807);

var _balloon2 = _interopRequireDefault(_balloon);

var _tooltip = __webpack_require__(918);

var _tooltip2 = _interopRequireDefault(_tooltip);

var _inner = __webpack_require__(808);

var _inner2 = _interopRequireDefault(_inner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_balloon2['default'].Tooltip = _tooltip2['default']; /**
                                                      * Created by xiachi on 16/5/29.
                                                      */

_balloon2['default'].Inner = _inner2['default'];

exports['default'] = _balloon2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 918:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _balloon = __webpack_require__(807);

var _balloon2 = _interopRequireDefault(_balloon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Balloon.Tooltip */
var Tooltip = (_temp = _class = function (_React$Component) {
    _inherits(Tooltip, _React$Component);

    function Tooltip() {
        _classCallCheck(this, Tooltip);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Tooltip.prototype.render = function render() {
        var _props = this.props,
            className = _props.className,
            align = _props.align,
            trigger = _props.trigger,
            text = _props.text,
            others = _objectWithoutProperties(_props, ['className', 'align', 'trigger', 'text']);

        return _react2['default'].createElement(
            _balloon2['default'],
            _extends({}, others, {
                triggerType: 'hover',
                closable: false,
                __isTooltip: true,
                className: className,
                align: align,
                trigger: trigger,
                delay: 0
            }),
            text
        );
    };

    return Tooltip;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * 弹出层位置
     * @enumdesc 上, 右, 下, 左, 上左, 上右, 下左, 下右, 左上, 左下, 右上, 右下
     */
    align: _propTypes2['default'].oneOf(['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br', 'lt', 'lb', 'rt', 'rb']),
    /**
     * tooltip 内部内容文案
     */
    text: _propTypes2['default'].node,
    /**
     * 触发元素
     */
    trigger: _propTypes2['default'].any
}, _class.defaultProps = {
    align: 'b',
    text: '',
    trigger: _react2['default'].createElement('span', null)
}, _temp);
Tooltip.displayName = 'Tooltip';
exports['default'] = Tooltip;
module.exports = exports['default'];

/***/ })

}]);