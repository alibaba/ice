(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ 1182:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _icedesign_base_lib_switch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(713);
/* harmony import */ var _icedesign_base_lib_switch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_switch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1182);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);


var _dec, _class, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Extensions = (_dec = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__[/* inject */ "b"])('extensions'), _dec(_class = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__[/* observer */ "c"])(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inherits(Extensions, _Component);

  function Extensions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Extensions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Extensions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleExtensionCheckChange = function (name, value) {
      _this.props.extensions.switch(name, value);
    };

    return _this;
  }

  _createClass(Extensions, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var extensions = this.props.extensions;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "extensions"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "extensions-header"
      }, "\u63D2\u4EF6\u7BA1\u7406", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 20,
          fontWeight: 300
        }
      }, "\u5F00\u542F\u540E\u4F1A\u5728\u9879\u76EE\u9762\u677F\u4E2D\u5C55\u73B0")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "extensions-body"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "extensions-list"
      }, extensions.list.map(function (extension) {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          key: extension.name,
          className: "extensions-item"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "cover"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
          className: "cover",
          src: extension.cover
        })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "info"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "info-header"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "title"
        }, extension.title, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "version"
        }, extension.version), extension.extra && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "extra"
        }, extension.extra))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "desc"
        }, extension.description), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "info-footer"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "author"
        }, extension.author)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "extension-settings"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_icedesign_base_lib_switch__WEBPACK_IMPORTED_MODULE_0___default.a, {
          size: "small",
          checked: extensions.checked[extension.name],
          onChange: _this2.handleExtensionCheckChange.bind(_this2, extension.name)
        }))));
      }))));
    }
  }]);

  return Extensions;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]), _temp)) || _class) || _class);
/* harmony default export */ __webpack_exports__["default"] = (Extensions);

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(685);
module.exports = __webpack_require__(793);

/***/ }),

/***/ 713:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(685);
__webpack_require__(685);
module.exports = __webpack_require__(795);

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(794);

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Switch*/
var Switch = (_temp = _class = function (_React$Component) {
    _inherits(Switch, _React$Component);

    function Switch(props, context) {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        var checked = props.checked || props.defaultChecked;
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.state = {
            checked: checked
        };
        return _this;
    }

    Switch.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            className = _props.className,
            disabled = _props.disabled,
            size = _props.size,
            checkedChildren = _props.checkedChildren,
            unCheckedChildren = _props.unCheckedChildren,
            others = _objectWithoutProperties(_props, ['prefix', 'className', 'disabled', 'size', 'checkedChildren', 'unCheckedChildren']),
            status = this.state.checked ? 'on' : 'off',
            children = this.state.checked ? checkedChildren : unCheckedChildren;

        if (size !== 'small' && size !== 'medium') {
            size = 'medium';
        }

        prefix = this.context.prefix || prefix;
        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'switch', true), _defineProperty(_classNames, prefix + 'switch-' + status, true), _defineProperty(_classNames, prefix + 'switch-' + size, true), _defineProperty(_classNames, className, className), _classNames));
        var attrs = void 0;

        var triggerCls = (0, _classnames2['default'])(_defineProperty({}, this.props.prefix + 'switch-trigger', true));
        if (!disabled) {
            attrs = {
                onClick: this.onChange,
                tabIndex: 0,
                onKeyDown: this.onKeyDown,
                disabled: disabled
            };
        } else {
            attrs = {
                disabled: disabled
            };
        }

        if (size === 'small') {
            // size small不允许设置内容
            children = null;
        }

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: classes }, attrs, { 'aria-checked': this.state.checked }),
            _react2['default'].createElement('div', { className: triggerCls }),
            _react2['default'].createElement(
                'div',
                { className: this.props.prefix + 'switch-children' },
                children
            )
        );
    };

    Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps) {
            var checked = nextProps.checked;
            if (checked === undefined) {
                checked = false;
            }
            this.setState({
                checked: checked
            });
        }
    };

    Switch.prototype.onChange = function onChange(ev) {
        var checked = !this.state.checked;

        if (!('checked' in this.props)) {
            this.setState({
                checked: checked
            });
        }
        this.props.onChange(checked, ev);
        this.props.onClick && this.props.onClick(ev);
    };

    Switch.prototype.onKeyDown = function onKeyDown(e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            this.onChange(e);
        }
        this.props.onKeyDown && this.props.onKeyDown(e);
    };

    return Switch;
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
     * 打开时的内容
     */
    checkedChildren: _propTypes2['default'].any,
    /**
     * 关闭时的内容
     */
    unCheckedChildren: _propTypes2['default'].any,
    /**
     * 开关状态改变是触发此事件
     * @param {Boolean} checked 是否为打开状态
     * @param {Event} e DOM事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 开关当前的值(针对受控组件)
     */
    checked: _propTypes2['default'].bool,
    /**
     * 开关默认值 (针对非受控组件)
     */
    defaultChecked: _propTypes2['default'].bool,
    /**
     * 表示开关被禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * switch的尺寸
     * @enumdesc 正常大小, 缩小版大小
     */
    size: _propTypes2['default'].oneOf(['medium', 'small']),
    /**
     * 鼠标点击事件
     * @param {Event} e DOM事件对象
     */
    onClick: _propTypes2['default'].func,
    /**
     * 键盘按键事件
     * @param {Event} e DOM事件对象
     */
    onKeyDown: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    disabled: false,
    size: 'medium',
    onChange: function onChange() {}
}, _temp);
Switch.displayName = 'Switch';
exports['default'] = Switch;
module.exports = exports['default'];

/***/ })

}]);