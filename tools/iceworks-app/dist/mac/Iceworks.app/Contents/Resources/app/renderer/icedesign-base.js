(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(302);

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = __webpack_require__(183);

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
module.exports = __webpack_require__(309);

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
__webpack_require__(122);
module.exports = __webpack_require__(303);

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
module.exports = __webpack_require__(506);

/***/ }),

/***/ 157:
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

var _nextOverlay2 = _interopRequireDefault(_nextOverlay);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _inner = __webpack_require__(243);

var _inner2 = _interopRequireDefault(_inner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {},
    limitTabRange = _nextUtil.focus.limitTabRange,
    parseComboOption = function parseComboOption(option) {
    if (option === true || option === false) {
        return option;
    }
    var res = {};
    option.split(',').forEach(function (o) {
        var key = o.replace(/^\s*|\s*$/g, '');
        res[key] = true;
    });
    return res;
};

// <Dialog>
//      <Dialog.Header></Dialog.Header>
//      <Dialog.Body></Dialog.Body>
//      <Dialog.Footer></Dialog.Footer>
// </Dialog>

var Dialog = (_temp = _class = function (_React$Component) {
    _inherits(Dialog, _React$Component);

    Dialog.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    function Dialog(props, context) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.adjustPosition = _this.adjustPosition.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        _this.onCloseButtonClick = _this.onCloseButtonClick.bind(_this);
        _this.beforePosition = _this.beforePosition.bind(_this);
        _this.onWindowResize = _this.onWindowResize.bind(_this);
        return _this;
    }

    Dialog.prototype.componentDidMount = function componentDidMount() {
        _nextDom.events.on(document, 'keydown', this.onKeyDown);
        /*eslint-disable react/prop-types */
        if (!this.props.isFullScreen) {
            _nextDom.events.on(window, 'resize', this.onWindowResize);
            this.adjustPosition();
        }
    };

    Dialog.prototype.componentDidUpdate = function componentDidUpdate() {
        if (!this.props.isFullScreen) {
            this.adjustPosition();
        }
    };

    Dialog.prototype.componentWillUnmount = function componentWillUnmount() {
        _nextDom.events.off(document, 'keydown', this.onKeyDown);
        _nextDom.events.off(window, 'resize', this.onWindowResize);
    };

    Dialog.prototype.onWindowResize = function onWindowResize() {
        this._hasWindowResize = true;
    };

    Dialog.prototype.render = function render() {
        var _classnames;

        /* eslint-disable no-unused-vars, react/prop-types */
        var _props = this.props,
            prefix = _props.prefix,
            closable = _props.closable,
            children = _props.children,
            className = _props.className,
            footerAlign = _props.footerAlign,
            onClose = _props.onClose,
            style = _props.style,
            role = _props.role,
            wrapperClassName = _props.wrapperClassName,
            align = _props.align,
            isFullScreen = _props.isFullScreen,
            others = _objectWithoutProperties(_props, ['prefix', 'closable', 'children', 'className', 'footerAlign', 'onClose', 'style', 'role', 'wrapperClassName', 'align', 'isFullScreen']),
            props = _extends({}, others, this.mapClosableToConfig(closable));

        delete props.closable;
        var prefixCls = this.getPrefix();
        var wrapperClassNameMix = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefixCls + 'dialog-wrapper', true), _defineProperty(_classnames, wrapperClassName, wrapperClassName), _classnames));

        props.wrapperClassName = wrapperClassNameMix;

        others = (0, _nextUtil.pickAttrs)(others);

        var dialogInner = _react2['default'].createElement(
            _inner2['default'],
            _extends({}, others, {
                prefix: prefix,
                onClose: this.onCloseButtonClick,
                className: className,
                footerAlign: footerAlign,
                closable: closable,
                style: style,
                role: role,
                ref: 'inner',
                'aria-hidden': !this.props.visible }),
            children
        );

        var useCss = align === 'cc cc' && isFullScreen;

        var positionAttrs = {};

        if (!useCss) {
            positionAttrs = {
                onPosition: this.adjustPosition,
                beforePosition: this.beforePosition
            };
        }

        return _react2['default'].createElement(
            _nextOverlay2['default'],
            _extends({}, props, {
                prefix: prefix,
                align: useCss ? false : align,
                onRequestClose: this.onClose,
                canCloseByOutSideClick: false,
                needAdjust: false,
                disableScroll: true
            }, positionAttrs, {
                ref: 'overlay' }),
            useCss ? _react2['default'].createElement(
                'div',
                { className: prefixCls + 'dialog-container' },
                dialogInner
            ) : dialogInner
        );
    };

    Dialog.prototype.onClose = function onClose() {
        this.props.onClose('fromKeyboard');
    };

    Dialog.prototype.onCloseButtonClick = function onCloseButtonClick() {
        var res = this.mapClosableToConfig(this.props.closable);

        if (res.canCloseByCloseClick) {
            this.props.onClose('fromCloseBtn');
        }
    };

    Dialog.prototype.onKeyDown = function onKeyDown(e) {
        var node = this.refs.overlay.getContentNode();
        if (node) {
            limitTabRange(node, e);
        }
    };

    Dialog.prototype.beforePosition = function beforePosition() {
        if (this.props.visible) {
            var content = this.refs.overlay ? this.refs.overlay.getContent() : '';
            if (content) {
                var body = content.getBody();
                var node = this.refs.overlay.getContentNode();
                if (this._lastDialogHeight !== node.clientHeight || this._hasWindowResize) {
                    this.revertSize(node, body);
                    this._hasWindowResize = false;
                }
            }
        }
    };

    Dialog.prototype.adjustPosition = function adjustPosition() {
        var minMargin = this.props.minMargin;

        if (this.props.visible) {
            var content = this.refs.overlay ? this.refs.overlay.getContent() : '',
                dialogHeight = void 0;

            if (content) {
                var body = content.getBody();
                var node = this.refs.overlay.getContentNode();
                var top = _nextDom.style.get(node, 'top');
                var height = _nextDom.style.get(node, 'height'),
                    clientHeight = window.innerHeight || document.documentElement.clientHeight;

                if (top <= minMargin) {
                    _nextDom.style.set(node, 'top', minMargin + 'px');
                    if (clientHeight <= height + minMargin) {
                        dialogHeight = clientHeight - minMargin * 2;
                        this.adjustSize(node, dialogHeight);
                    } else if (body.scrollHeight === body.clientHeight) {
                        this.revertSize(node, body);
                    }
                } else if (clientHeight <= height + top) {
                    dialogHeight = clientHeight - top;
                    this.adjustSize(node, dialogHeight);
                }
                this._lastDialogHeight = node.clientHeight;
            }
        }
    };

    Dialog.prototype.adjustSize = function adjustSize(node, dialogHeight) {
        var content = this.refs.overlay.getContent(),
            body = content.getBody(),
            header = content.getHeader(),
            footer = content.getFooter();

        var headerHeight = 0,
            footerHeight = 0;

        if (header) {
            headerHeight = _nextDom.style.get(header, 'height');
        }
        if (footer) {
            footerHeight = _nextDom.style.get(footer, 'height');
        }
        var dialogPadding = _nextDom.style.get(node, 'padding-top') + _nextDom.style.get(node, 'padding-bottom'),
            maxBodyHeight = dialogHeight - headerHeight - footerHeight - dialogPadding;

        if (maxBodyHeight < 0) {
            maxBodyHeight = 1;
        }
        _nextDom.style.set(body, {
            'max-height': maxBodyHeight + 'px',
            'overflow-y': 'auto'
        });
    };

    Dialog.prototype.revertSize = function revertSize(node, body) {

        _nextDom.style.set(node, 'height', 'auto');
        _nextDom.style.set(body, {
            'max-height': 'none'
        });
    };

    Dialog.prototype.mapClosableToConfig = function mapClosableToConfig(closable) {
        var res = {},
            map = ['esc', 'outSide', 'close', 'mask'];

        closable = parseComboOption(closable);
        map.forEach(function (o) {
            var value = closable === true ? true : closable[o] || false;
            var key = o.charAt(0).toUpperCase() + o.substr(1);
            if (o === 'esc' || o === 'mask') {
                res['canCloseBy' + key] = value;
            } else {
                res['canCloseBy' + key + 'Click'] = value;
            }
        });
        return res;
    };

    return Dialog;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    hasMask: _propTypes2['default'].bool,
    onClose: _propTypes2['default'].func,
    closable: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
    minMargin: _propTypes2['default'].number
}, _class.defaultProps = {
    prefix: 'next-',
    hasMask: true,
    animation: {
        'in': 'fadeInDown',
        out: 'fadeOutUp'
    },
    onClose: noop,
    closable: 'esc,close',
    align: 'cc cc',
    autoFocus: true,
    minMargin: 40
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Dialog.displayName = 'Dialog';
exports['default'] = Dialog;
module.exports = exports['default'];

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var toUpperCase = function toUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
};

['header', 'footer', 'body'].forEach(function (cls) {
    var _class, _temp;

    exports[toUpperCase(cls)] = (_temp = _class = function (_Component) {
        _inherits(_class, _Component);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        _class.prototype.render = function render() {
            var _props = this.props,
                propsPrefix = _props.prefix,
                children = _props.children,
                others = _objectWithoutProperties(_props, ['prefix', 'children']);

            var prefix = this.context.prefix || propsPrefix;
            return _react2['default'].createElement(
                'div',
                _extends({}, others, { className: prefix + 'dialog-' + cls }),
                children
            );
        };

        return _class;
    }(_react.Component), _class.propTypes = {
        prefix: _propTypes2['default'].string,
        children: _propTypes2['default'].any
    }, _class.defaultProps = {
        prefix: 'next-'
    }, _class.contextTypes = {
        prefix: _propTypes2['default'].string
    }, _class.dialogMark = cls, _temp);
});

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(160);
module.exports = __webpack_require__(235);

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
__webpack_require__(508);

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
__webpack_require__(69);
module.exports = __webpack_require__(82);

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _deepMerge = __webpack_require__(530);

var _deepMerge2 = _interopRequireDefault(_deepMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var LOCALE_CACHE = 'zh-cn';

var COMPONENTS_LOCALE_CACHE = {};

var getDisplayName = function getDisplayName(Component) {
    return Component.displayName || Component.name || (typeof Component === 'string' ? Component : 'Component');
};

var Locale = function Locale(Component) {
    var _class, _temp;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var LocaleProvider = (_temp = _class = function (_React$Component) {
        _inherits(LocaleProvider, _React$Component);

        function LocaleProvider() {
            _classCallCheck(this, LocaleProvider);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        LocaleProvider.prototype._getInstance = function _getInstance(componentInstance) {
            if (componentInstance) {
                this.refs = componentInstance.refs;
                this._instance = componentInstance;
            }
        };

        LocaleProvider.prototype.getInstance = function getInstance() {
            return this._instance;
        };

        LocaleProvider.prototype.render = function render() {
            var _props = this.props,
                language = _props.language,
                _props$locale = _props.locale,
                locale = _props$locale === undefined ? {} : _props$locale,
                others = _objectWithoutProperties(_props, ['language', 'locale']);

            var defaultLocale = void 0,
                displayName = void 0,
                cacheLocale = void 0,
                resultLocale = void 0;

            if (!language) {
                language = Locale.get();
            }

            // 获取组件挂载的默认多语言文案，增加英文兜底
            defaultLocale = LocaleProvider.LOCALE && (LocaleProvider.LOCALE[language] || LocaleProvider.LOCALE['en-us']);

            // 组件名称
            displayName = getDisplayName(Component);

            // 缓存的多语言文案
            cacheLocale = COMPONENTS_LOCALE_CACHE[displayName] ? COMPONENTS_LOCALE_CACHE[displayName] : {};

            // 最终的多语言文案
            if (options.deepMerge) {
                resultLocale = (0, _deepMerge2['default'])(defaultLocale, cacheLocale, locale);
            } else {
                resultLocale = _extends({}, defaultLocale, cacheLocale, locale);
            }

            others.ref = this._getInstance.bind(this);

            return _react2['default'].createElement(Component, _extends({ locale: resultLocale, language: language }, others));
        };

        return LocaleProvider;
    }(_react2['default'].Component), _class.propTypes = {
        language: _propTypes2['default'].string,
        locale: _propTypes2['default'].object
    }, _temp);
    LocaleProvider.displayName = 'LocaleProvider';


    Locale.init(LocaleProvider);
    LocaleProvider.displayName = 'LocaleProvider(' + getDisplayName(Component) + ')';

    return LocaleProvider;
};

Locale.init = function (Component) {
    Component.LOCALE = Component.LOCALE || {};
};

Locale.set = function (lang) {
    LOCALE_CACHE = lang;
};

Locale.get = function () {
    return LOCALE_CACHE;
};

Locale.setComponents = function (locales) {
    COMPONENTS_LOCALE_CACHE = _extends({}, COMPONENTS_LOCALE_CACHE, locales);
};

exports['default'] = Locale;
module.exports = exports['default'];

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
__webpack_require__(124);
module.exports = __webpack_require__(311);

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(173);
__webpack_require__(509);

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
__webpack_require__(156);
module.exports = __webpack_require__(512);

/***/ }),

/***/ 243:
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

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Children = _react2['default'].Children,
    noop = function noop() {},
    getPrivateDialogProperty = function getPrivateDialogProperty(name) {
    return '_dialog' + (name.charAt(0).toUpperCase() + name.substr(1)) + 'Id';
};
var uuid = 0;

var DialogInner = (_temp = _class = function (_React$Component) {
    _inherits(DialogInner, _React$Component);

    function DialogInner(props, context) {
        _classCallCheck(this, DialogInner);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        ['header', 'body', 'footer'].forEach(function (name) {
            _this[getPrivateDialogProperty(name)] = 'dialog-' + name + '-' + uuid++;
        });
        return _this;
    }

    DialogInner.prototype.render = function render() {
        var _classNames;

        /* eslint-disable no-unused-vars, react/prop-types */
        var _props = this.props,
            children = _props.children,
            className = _props.className,
            footerAlign = _props.footerAlign,
            closable = _props.closable,
            role = _props.role,
            others = _objectWithoutProperties(_props, ['children', 'className', 'footerAlign', 'closable', 'role']),
            prefix = this.context.prefix || this.props.prefix,
            content = this._getContent(),
            cls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'dialog', true), _defineProperty(_classNames, footerAlign, footerAlign), _defineProperty(_classNames, className, className), _classNames)),
            closeContent = closable ? _react2['default'].createElement(
            'a',
            { href: 'javascript:;', className: prefix + 'dialog-close',
                onClick: this.onClose.bind(this) },
            _react2['default'].createElement(_nextIcon2['default'], { prefix: prefix, type: 'close', size: 'small' })
        ) : null;

        others = (0, _nextUtil.pickAttrs)(others);

        return _react2['default'].createElement(
            'div',
            _extends({}, others, {
                className: cls,
                role: role,
                'aria-labelledby': content.header ? content.header.props.id : '' }),
            content.header,
            content.body,
            content.footer,
            closeContent
        );
    };

    DialogInner.prototype._getContent = function _getContent() {
        var _this2 = this;

        var children = this.props.children,
            result = {};

        Children.forEach(children, function (child) {
            if (child && child.type.dialogMark) {
                var name = child.type.dialogMark.toLowerCase();
                result[name] = _react2['default'].cloneElement(child, {
                    ref: name,
                    id: _this2[getPrivateDialogProperty(name)]
                });
            }
        });
        return result;
    };

    DialogInner.prototype.getHeader = function getHeader() {
        return _reactDom2['default'].findDOMNode(this.refs.header);
    };

    DialogInner.prototype.getBody = function getBody() {
        return _reactDom2['default'].findDOMNode(this.refs.body);
    };

    DialogInner.prototype.getFooter = function getFooter() {
        return _reactDom2['default'].findDOMNode(this.refs.footer);
    };

    DialogInner.prototype.onClose = function onClose(e) {
        this.props.onClose('fromCloseBtn');
        e.preventDefault();
    };

    return DialogInner;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    footerAlign: _propTypes2['default'].oneOf(['left', 'center', 'right']),
    className: _propTypes2['default'].string,
    closable: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].string]),
    children: _propTypes2['default'].any,
    onClose: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    onClose: noop,
    footerAlign: 'right',
    role: 'dialog',
    closable: true
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
DialogInner.displayName = 'DialogInner';
exports['default'] = DialogInner;
module.exports = exports['default'];

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feedback = __webpack_require__(245);

var _feedback2 = _interopRequireDefault(_feedback);

var _toast = __webpack_require__(532);

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_feedback2['default'].toast = _toast2['default'];

exports['default'] = _feedback2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 245:
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

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var typesMap = {
  success: 'success',
  prompt: 'warning',
  error: 'error',
  help: 'help',
  loading: 'loading'
};

var ieVersion = typeof document === 'undefined' ? false : document.documentMode;

/**
 * Feedback
 */
var Feedback = (_temp = _class = function (_Component) {
  _inherits(Feedback, _Component);

  function Feedback() {
    _classCallCheck(this, Feedback);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Feedback.prototype.render = function render() {
    var _classNames;

    var prefix = this.context.prefix || this.props.prefix;
    /* eslint-disable no-unused-vars */

    var _props = this.props,
        propsPrefix = _props.prefix,
        type = _props.type,
        shape = _props.shape,
        size = _props.size,
        visible = _props.visible,
        title = _props.title,
        children = _props.children,
        className = _props.className,
        others = _objectWithoutProperties(_props, ['prefix', 'type', 'shape', 'size', 'visible', 'title', 'children', 'className']);
    /* eslint-enable */


    var feedbackPrefix = prefix + 'feedback';
    var iconType = typesMap[type];
    var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, feedbackPrefix, true), _defineProperty(_classNames, feedbackPrefix + '-' + type, type), _defineProperty(_classNames, feedbackPrefix + '-' + shape, shape), _defineProperty(_classNames, feedbackPrefix + '-' + size, size), _defineProperty(_classNames, feedbackPrefix + '-title-content', !!title), _defineProperty(_classNames, feedbackPrefix + '-only-content', !title && !!children), _defineProperty(_classNames, feedbackPrefix + '-ie8', ieVersion === 8), _defineProperty(_classNames, feedbackPrefix + '-hide', !visible), _defineProperty(_classNames, className, className), _classNames));

    return _react2['default'].createElement(
      'div',
      _extends({}, others, { className: classes }),
      _react2['default'].createElement(_nextIcon2['default'], { prefix: prefix, className: feedbackPrefix + '-symbol', type: iconType }),
      title && _react2['default'].createElement(
        'div',
        { className: feedbackPrefix + '-title' },
        title
      ),
      children && _react2['default'].createElement(
        'div',
        { className: feedbackPrefix + '-content' },
        children
      )
    );
  };

  return Feedback;
}(_react.Component), _class.contextTypes = {
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
   * 自定义内联样式
   */
  style: _propTypes2['default'].object,
  /**
   * 反馈类型
   */
  type: _propTypes2['default'].oneOf(['success', 'error', 'prompt', 'help', 'loading']),
  /**
   * 反馈外观
   */
  shape: _propTypes2['default'].oneOf(['inline', 'addon', 'toast']),
  /**
   * 反馈大小
   */
  size: _propTypes2['default'].oneOf(['medium', 'large']),
  /**
   * 标题
   */
  title: _propTypes2['default'].node,
  /**
   * 内容
   */
  children: _propTypes2['default'].node,
  /**
   * 是否显示
   */
  visible: _propTypes2['default'].bool
}, _class.defaultProps = {
  prefix: 'next-',
  type: 'success',
  shape: 'inline',
  size: 'medium',
  visible: true,
  title: ''
}, _temp);
Feedback.displayName = 'Feedback';
exports['default'] = Feedback;
module.exports = exports['default'];

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = {
    'en-us': {
        ok: 'Ok',
        cancel: 'Cancel'
    },
    'zh-cn': {
        ok: '确认',
        cancel: '取消'
    },
    'zh-tw': {
        ok: '確認',
        cancel: '取消'
    }
};
module.exports = exports['default'];

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(160);
__webpack_require__(160);
module.exports = __webpack_require__(244);

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

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(172);
__webpack_require__(310);

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Loading */
var Loading = (_temp = _class = function (_React$Component) {
    _inherits(Loading, _React$Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Loading.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            tip = _props.tip,
            state = _props.state,
            _props$visible = _props.visible,
            visible = _props$visible === undefined ? state !== 'off' : _props$visible,
            children = _props.children,
            className = _props.className,
            style = _props.style,
            shape = _props.shape,
            color = _props.color;


        state && _nextUtil.log.deprecated('state', 'visible', 'Loading');

        var prefix = this.context.prefix || this.props.prefix;

        var tipDom = null;
        var dotCls = prefix + 'loading-dot';

        switch (shape) {
            case 'flower':
                tipDom = _react2['default'].createElement(
                    'span',
                    { className: prefix + 'loading-flower' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'loading', className: prefix + 'loading-icon', style: { color: color } })
                );
                break;
            case 'fusion-reactor':
                tipDom = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'loading-fusion-reactor' },
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } })
                );
                break;
            case 'dot-circle':
                tipDom = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'loading-dot-circle' },
                    _react2['default'].createElement(
                        'div',
                        { className: dotCls, style: { color: color } },
                        'loading...'
                    )
                );
                break;
        }

        var loadingCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'loading', true), _defineProperty(_classNames, 'loading', visible), _defineProperty(_classNames, className, className), _classNames));

        return _react2['default'].createElement(
            'div',
            { className: loadingCls, style: style },
            visible ? _react2['default'].createElement(
                'div',
                { className: prefix + 'loading-tip' },
                tipDom,
                tip
            ) : null,
            _react2['default'].createElement(
                'div',
                { className: prefix + 'loading-component' },
                visible ? _react2['default'].createElement('div', { className: prefix + 'loading-masker' }) : null,
                children
            )
        );
    };

    return Loading;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义内容
     */
    tip: _propTypes2['default'].any,
    state: _propTypes2['default'].oneOf(['', 'on', 'off']),
    /**
     * loading 状态, 默认 true
     */
    visible: _propTypes2['default'].bool,
    /**
     * 自定义class
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 动画类型
     * @enumdesc 无, icon, fusion矢量, 点圈
     */
    shape: _propTypes2['default'].oneOf(['', 'flower', 'fusion-reactor', 'dot-circle']),
    /**
     * 动画颜色
     */
    color: _propTypes2['default'].string,
    /**
     * 子元素
     */
    children: _propTypes2['default'].any
}, _class.defaultProps = {
    prefix: 'next-',
    state: '', //TODO: deprecated in 1.0 release
    shape: ''
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Loading.displayName = 'Loading';
exports['default'] = Loading;
module.exports = exports['default'];

/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(173);
__webpack_require__(235);
__webpack_require__(183);
__webpack_require__(83);
__webpack_require__(511);

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dialog = __webpack_require__(513);

var _dialog2 = _interopRequireDefault(_dialog);

var _base = __webpack_require__(157);

var _base2 = _interopRequireDefault(_base);

var _content = __webpack_require__(158);

var _inner = __webpack_require__(243);

var _inner2 = _interopRequireDefault(_inner);

var _util = __webpack_require__(531);

var _index = __webpack_require__(246);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_dialog2['default'].Header = _content.Header;
_dialog2['default'].Body = _content.Body;
_dialog2['default'].Footer = _content.Footer;
_dialog2['default'].alert = _util.alert;
_dialog2['default'].confirm = _util.confirm;
_dialog2['default'].Inner = _inner2['default'];
_dialog2['default'].Base = _base2['default'];
_dialog2['default'].LOCALE = _index2['default'];

exports['default'] = _dialog2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 513:
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

var _nextButton = __webpack_require__(126);

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextLocaleProvider = __webpack_require__(177);

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _base = __webpack_require__(157);

var _base2 = _interopRequireDefault(_base);

var _content = __webpack_require__(158);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * Dialog
 * @description 继承 Overlay 的 API，除非特别说明
 */
var Dialog = (_temp = _class = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Dialog.prototype.render = function render() {
    /* eslint-disable no-unused-vars, react/prop-types */
    var _props = this.props,
        title = _props.title,
        children = _props.children,
        footer = _props.footer,
        onOk = _props.onOk,
        onCancel = _props.onCancel,
        locale = _props.locale,
        visible = _props.visible,
        others = _objectWithoutProperties(_props, ['title', 'children', 'footer', 'onOk', 'onCancel', 'locale', 'visible']),
        prefix = this.context.prefix || this.props.prefix,
        buttons = _react2['default'].createElement(
      'span',
      null,
      _react2['default'].createElement(
        _nextButton2['default'],
        { prefix: prefix, type: 'primary', onClick: visible ? onOk : noop },
        locale.ok
      ),
      _react2['default'].createElement(
        _nextButton2['default'],
        { prefix: prefix, onClick: visible ? onCancel : noop },
        locale.cancel
      )
    ),
        headerNode = title ? _react2['default'].createElement(
      _content.Header,
      { prefix: prefix },
      title
    ) : null,
        footerNode = footer === false ? null : _react2['default'].createElement(
      _content.Footer,
      { prefix: prefix },
      footer ? footer : buttons
    );

    return _react2['default'].createElement(
      _base2['default'],
      _extends({ visible: visible }, others),
      headerNode,
      _react2['default'].createElement(
        _content.Body,
        { prefix: prefix },
        children
      ),
      footerNode
    );
  };

  return Dialog;
}(_react.Component), _class.propTypes = {
  /**
   * 样式类名的品牌前缀
   */
  prefix: _propTypes2['default'].string,
  /**
   * 自定义类名
   */
  className: _propTypes2['default'].string,
  /**
   * 自定义内联样式
   */
  style: _propTypes2['default'].object,
  /**
   * 对话框的标题
   */
  title: _propTypes2['default'].any,
  /**
   * 传入底部的内容
   */
  footer: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].string, _propTypes2['default'].node]),
  /**
   * 底部按钮的对齐方式
   */
  footerAlign: _propTypes2['default'].oneOf(['left', 'center', 'right']),
  /**
   * 控制对话框是否可见
   */
  visible: _propTypes2['default'].bool,
  /**
   * 是否需要mask
   */
  hasMask: _propTypes2['default'].bool,
  /**
   * 'esc, mask, close', 详见[closable](#closable)
   */
  closable: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
  /**
   * 是否强制更新dialog的位置，在`isFullScreen`为true且align为`cc cc`的时候无效
   */
  shouldUpdatePosition: _propTypes2['default'].bool,
  /**
   * 浮层自定义位置
   */
  align: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
  /**
   * 配置动画的播放方式
   * @param {String} in 进场动画
   * @param {String} out 出场动画
   */
  animation: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].bool]),
  /**
   * 在点击关闭按钮的时候触发的函数
   */
  onClose: _propTypes2['default'].func,
  /**
   * 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
   */
  afterClose: _propTypes2['default'].func,
  /**
   * 在点击Ok按钮的时候触发的函数
   */
  onOk: _propTypes2['default'].func,
  /**
   * 在点击Cancel按钮的时候触发的函数
   */
  onCancel: _propTypes2['default'].func,
  /**
   * 当dialog过高的时候距离viewport的最小边距,在`isFullScreen`下无效。
   */
  minMargin: _propTypes2['default'].number,
  /**
   * 当dialog弹出的时候是否自动获取焦点
   */
  autoFocus: _propTypes2['default'].bool,
  /**
   * 自定义国际化文案对象
   * @property {String} ok 确认按钮文案
   * @property {String} cancel 取消按钮文案
   */
  locale: _propTypes2['default'].object,
  /**
   * 自定义国际化语言
   */
  language: _propTypes2['default'].oneOf(['en-us', 'zh-cn', 'zh-tw']),
  /**
   * 是否是启用使用CSS定位模式的对话框, 在该模式下面无需通过`shouldUpdatePosition`来进行重新定位。
   */
  isFullScreen: _propTypes2['default'].bool
}, _class.defaultProps = {
  prefix: 'next-',
  footerAlign: 'right',
  hasMask: true,
  closable: 'esc,close',
  align: 'cc cc',
  animation: {
    'in': 'fadeInDown',
    out: 'fadeOutUp'
  },
  onOk: noop,
  onCancel: noop,
  minMargin: 40,
  autoFocus: true,
  isFullScreen: false
}, _class.contextTypes = {
  prefix: _propTypes2['default'].string
}, _temp);
Dialog.displayName = 'Dialog';
exports['default'] = (0, _nextLocaleProvider2['default'])(Dialog);
module.exports = exports['default'];

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */



/**
 * Recursive cloning array.
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = function deepExtend() /*obj_1, [obj_2], [obj_N]*/{
	if (arguments.length < 1 || _typeof(arguments[0]) !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src, clone;

	args.forEach(function (obj) {
		// skip argument if isn't an object, is null, or is an array
		if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = target[key]; // source value
			val = obj[key]; // new value

			// recursion prevention
			if (val === target) {
				return;

				/**
     * if new value isn't object then just overwrite by new value
     * instead of extending.
     */
			} else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object' || val === null) {
				target[key] = val;
				return;

				// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;
			} else if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

				// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};

exports['default'] = deepExtend;
module.exports = exports['default'];

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _nextButton = __webpack_require__(126);

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextFeedback = __webpack_require__(244);

var _nextFeedback2 = _interopRequireDefault(_nextFeedback);

var _nextLocaleProvider = __webpack_require__(177);

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _base = __webpack_require__(157);

var _base2 = _interopRequireDefault(_base);

var _content = __webpack_require__(158);

var _index = __webpack_require__(246);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

var wrapper = function wrapper(fn, callback) {
    return function () {
        var res = void 0;
        if (typeof fn === 'function') {
            res = fn();
        }
        if (res && res.then) {
            res.then(function (result) {
                if (result !== false) {
                    callback();
                }
            });
        } else if (res !== false) {
            callback();
        }
    };
},
    feedbackMaps = {
    alert: 'prompt',
    confirm: 'help'
};

var Modal = (_temp = _class = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            visible: false
        };
        _this.close = _this.close.bind(_this);
        return _this;
    }

    /* eslint-disable react/no-did-mount-set-state */
    // preact compat
    // see https://github.com/developit/preact/issues/556
    // 我们通过触发componentWillReceiveProps绕过这个问题


    Modal.prototype.componentDidMount = function componentDidMount() {
        this.setState({
            visible: true
        });
    };

    Modal.prototype.render = function render() {
        /* eslint-disable react/prop-types */
        var _props = this.props,
            prefix = _props.prefix,
            onOk = _props.onOk,
            onCancel = _props.onCancel,
            afterClose = _props.afterClose,
            className = _props.className,
            title = _props.title,
            type = _props.type,
            content = _props.content,
            locale = _props.locale,
            onClose = _props.onClose,
            needWrapper = _props.needWrapper,
            footer = _props.footer,
            others = _objectWithoutProperties(_props, ['prefix', 'onOk', 'onCancel', 'afterClose', 'className', 'title', 'type', 'content', 'locale', 'onClose', 'needWrapper', 'footer']);

        locale = locale || {
            ok: 'Ok',
            cancel: 'Cancel'
        };

        var Ok = wrapper(onOk, this.close),
            Cancel = wrapper(onCancel, this.close),
            Close = wrapper(onClose, this.close);

        return _react2['default'].createElement(
            _base2['default'],
            _extends({ prefix: prefix,
                onClose: Close,
                visible: this.state.visible,
                className: className,
                afterClose: afterClose,
                role: 'alertdialog'
            }, others),
            _react2['default'].createElement(
                _content.Header,
                { prefix: prefix },
                title
            ),
            _react2['default'].createElement(
                _content.Body,
                { prefix: prefix },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'dialog-' + type },
                    needWrapper ? _react2['default'].createElement(_nextFeedback2['default'], { prefix: prefix, type: feedbackMaps[type], size: 'large', shape: 'addon', title: content }) : content
                )
            ),
            _react2['default'].createElement(
                _content.Footer,
                { prefix: prefix },
                footer ? footer : [_react2['default'].createElement(
                    _nextButton2['default'],
                    { prefix: prefix, type: 'primary', onClick: this.state.visible ? Ok : noop, key: 'ok' },
                    locale.ok
                ), type === 'confirm' ? _react2['default'].createElement(
                    _nextButton2['default'],
                    { prefix: prefix, type: 'normal', onClick: this.state.visible ? Cancel : noop, key: 'cancel' },
                    locale.cancel
                ) : null]
            )
        );
    };

    Modal.prototype.close = function close() {
        if (this.state.visible) {
            this.setState({
                visible: false
            });
        }
    };

    return Modal;
}(_react2['default'].Component), _class.propTypes = {
    needWrapper: _propTypes2['default'].bool,
    prefix: _propTypes2['default'].string
}, _class.defaultProps = {
    needWrapper: true,
    prefix: 'next-'
}, _temp);
Modal.displayName = 'Modal';


var LocaleModal = (0, _nextLocaleProvider2['default'])(Modal);
LocaleModal.LOCALE = _index2['default'];

var render = function render(config) {
    var container = document.createElement('div');
    var unMount = function unMount() {
        if (config && config.afterClose && typeof config.afterClose === 'function') {
            config.afterClose();
        }
        _reactDom2['default'].unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
    };
    var instance = void 0;
    document.body.appendChild(container);
    _reactDom2['default'].render(_react2['default'].createElement(LocaleModal, _extends({}, config, { afterClose: unMount })), container, function () {
        instance = this;
    });
    return {
        hide: function hide() {
            var inc = instance && instance.getInstance();
            inc && inc.close();
        }
    };
};

Object.keys(feedbackMaps).forEach(function (method) {
    exports[method] = function (config) {
        config = config || {};
        config.type = method;
        return render(config);
    };
});

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _mask = __webpack_require__(533);

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var instance = void 0;
var hidingToast = void 0;

function handleConfig(config, type) {
    var newConfig = {};

    if (typeof config === 'string' || (0, _react.isValidElement)(config)) {
        newConfig.content = config;
    } else if (isObject(config)) {
        newConfig = _extends({}, config);
    }
    if (typeof newConfig.duration !== 'number') {
        newConfig.duration = 3000;
    }
    if (type) {
        newConfig.type = type;
    }

    return newConfig;
}

function isObject(obj) {
    return {}.toString.call(obj) === '[object Object]';
}

function open(config, type) {
    close();
    config = handleConfig(config, type);
    instance = _mask2['default'].create(config);
    if (config.duration > 0) {
        hidingToast && clearTimeout(hidingToast);
        hidingToast = setTimeout(close, config.duration);
    }
}

function close() {
    instance && instance.destroy();
    instance = null;
}

var toast = {
    show: function show(config) {
        open(config);
    },
    hide: function hide() {
        close();
    }
};
var types = ['success', 'prompt', 'error', 'help', 'loading'];
types.forEach(function (type) {
    toast[type] = function (config) {
        return open(config, type);
    };
});

exports['default'] = toast;
module.exports = exports['default'];

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextOverlay = __webpack_require__(121);

var _nextOverlay2 = _interopRequireDefault(_nextOverlay);

var _feedback = __webpack_require__(245);

var _feedback2 = _interopRequireDefault(_feedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Mask = (_temp2 = _class = function (_React$Component) {
    _inherits(Mask, _React$Component);

    function Mask() {
        var _temp, _this, _ret;

        _classCallCheck(this, Mask);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
            visible: true
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Mask.prototype.render = function render() {
        var prefix = this.context.prefix || this.props.prefix;
        /* eslint-disable no-unused-vars */

        var _props = this.props,
            propsPrefix = _props.prefix,
            type = _props.type,
            content = _props.content,
            align = _props.align,
            offset = _props.offset,
            hasMask = _props.hasMask,
            afterClose = _props.afterClose,
            animation = _props.animation,
            others = _objectWithoutProperties(_props, ['prefix', 'type', 'content', 'align', 'offset', 'hasMask', 'afterClose', 'animation']);
        /* eslint-enable */


        var visible = this.state.visible;

        return _react2['default'].createElement(
            _nextOverlay2['default'],
            { prefix: prefix, animation: animation, visible: visible, align: align, offset: offset, hasMask: hasMask, afterClose: afterClose },
            _react2['default'].createElement(_feedback2['default'], _extends({}, others, { prefix: prefix, type: type, shape: 'toast',
                title: content, className: prefix + 'feedback-wrapper' }))
        );
    };

    return Mask;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    prefix: _propTypes2['default'].string,
    type: _propTypes2['default'].string,
    content: _propTypes2['default'].node,
    align: _propTypes2['default'].string,
    offset: _propTypes2['default'].array,
    hasMask: _propTypes2['default'].bool,
    afterClose: _propTypes2['default'].func,
    animation: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    align: 'cc cc',
    offset: [0, 0],
    hasMask: false,
    animation: {
        'in': 'pulse',
        out: 'zoomOut'
    }
}, _temp2);
Mask.displayName = 'Mask';
exports['default'] = Mask;


Mask.create = function (props) {
    /* eslint-disable no-unused-vars */
    var duration = props.duration,
        afterClose = props.afterClose,
        others = _objectWithoutProperties(props, ['duration', 'afterClose']);
    /* eslint-enable no-unused-vars */

    var div = document.createElement('div');
    document.body.appendChild(div);

    var closeChain = function closeChain() {
        _reactDom2['default'].unmountComponentAtNode(div);
        document.body.removeChild(div);

        afterClose && afterClose();
    };

    var mask = void 0;
    _reactDom2['default'].render(_react2['default'].createElement(Mask, _extends({ afterClose: closeChain }, others)), div, function () {
        mask = this;
    });

    return {
        component: mask,
        destroy: function destroy() {
            return mask && mask.setState({
                visible: false
            });
        }
    };
};
module.exports = exports['default'];

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
__webpack_require__(123);
module.exports = __webpack_require__(126);

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
__webpack_require__(69);
module.exports = __webpack_require__(83);

/***/ })

}]);