(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = __webpack_require__(183);

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
__webpack_require__(123);
module.exports = __webpack_require__(126);

/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(748);
__webpack_require__(748);
module.exports = __webpack_require__(806);

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Container = (_temp = _class = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container() {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Container.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };
    /**
     * 获取当前组件的父节点的实例
     */


    Container.prototype.getParent = function getParent() {
        return this.props.parent;
    };
    /**
     * 获取当前组件的根节点
     */


    Container.prototype.getRoot = function getRoot() {
        var instance = this.props.parent;
        while (instance.props.parent) {
            instance = instance.props.parent;
        }
        return instance;
    };
    /**
     * 为child建立和当前实例的父子级关系
     * @param child {ReactElement}
     */


    Container.prototype.addRelation = function addRelation(child) {
        return _react2['default'].cloneElement(child, {
            parent: this
        });
    };
    /**
     * 根据type获取父级的实例
     * @param type {Class}
     */


    Container.prototype.getParentBy = function getParentBy(func) {
        var instance = this.props.parent,
            result = func(instance) ? [instance] : [];

        while (instance.props.parent) {
            instance = instance.props.parent;
            if (func(instance)) {
                result.push(instance);
            }
        }
        return result;
    };

    Container.prototype.getParentByFlag = function getParentByFlag(flag) {
        return this.getParentBy(function (inc) {
            return inc.constructor[flag];
        });
    };

    Container.prototype.getParentByType = function getParentByType(type) {
        return this.getParentBy(function (inc) {
            return inc instanceof type;
        });
    };
    /**
     * 获取当前组件的孩子节点的实例
     */


    Container.prototype.getChildrenInc = function getChildrenInc() {
        var _this2 = this;

        return Object.keys(this.refs).map(function (key) {
            return _this2.refs[key];
        });
    };
    /**
     * 根据类型获取当前组件的孩子节点的实例
     * @param type {Class}
     */


    Container.prototype.getChildrenIncByType = function getChildrenIncByType(type) {
        return this.getChildrenIncBy(function (child) {
            return child instanceof type;
        });
    };

    Container.prototype.getChildrenIncByFlag = function getChildrenIncByFlag(flag) {
        return this.getChildrenIncBy(function (child) {
            return child.constructor[flag];
        });
    };

    Container.prototype.getChildrenIncBy = function getChildrenIncBy(func) {
        var result = [],
            loop = function loop(children) {
            children.forEach(function (child) {
                if (child.getChildrenInc) {
                    loop(child.getChildrenInc());
                }
                result.push(child);
            });
        };
        loop(this.getChildrenInc());
        return result.filter(func);
    };
    /**
     * 获取当前组件的孩子节点
     * @return {Array<ReactElement>}
     */


    Container.prototype.getChildren = function getChildren() {
        return this.props.children;
    };
    /**
     * 根据类型获取当前组件的孩子节点
     * @param type {Class}
     * @return {Array<ReactElement>}
     */


    Container.prototype.getChildrenByType = function getChildrenByType(type) {
        return this.getChildrenBy(function (child) {
            return child.type === type;
        });
    };

    Container.prototype.getChildrenByFlag = function getChildrenByFlag(flag) {
        return this.getChildrenBy(function (child) {
            return child.type && child.type[flag];
        });
    };

    Container.prototype.getChildrenBy = function getChildrenBy(func) {
        var result = [],
            loop = function loop(children) {
            _react.Children.forEach(children, function (child) {
                if (child.props && child.props.children) {
                    loop(child.props.children);
                }
                result.push(child);
            });
        };
        loop(this.props.children);
        return result.filter(func);
    };

    return Container;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    parent: _propTypes2['default'].any,
    children: _propTypes2['default'].any
}, _temp);
Container.displayName = 'Container';
exports['default'] = Container;
module.exports = exports['default'];

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = __webpack_require__(39);

var _nextOverlay = __webpack_require__(121);

var _nextAnimate = __webpack_require__(746);

var _nextAnimate2 = _interopRequireDefault(_nextAnimate);

var _container = __webpack_require__(686);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Component = _container2['default'];
var noop = function noop() {};

/**
 * Menu.Item
 * @order 1
 **/
var MenuItem = (_temp = _class = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem(props, context) {
        _classCallCheck(this, MenuItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        ['onClick', 'onKeyDown', 'onFocus', 'onMouseEnter', 'onMouseLeave'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        var root = _this.getRoot();
        if (!root) {
            throw new Error('MenuItem should use under Menu.');
        }
        _this.root = root;
        _this.Menu = root.constructor;
        _this.SubMenu = root.constructor.SubMenu;
        return _this;
    }

    MenuItem.prototype.componentDidMount = function componentDidMount() {
        this._meta = _extends({
            node: _reactDom2['default'].findDOMNode(this)
        }, this.props);
        this.pushMetaToParent();
    };

    MenuItem.prototype.componentDidUpdate = function componentDidUpdate() {
        // We need update parent ref to avoid root update.
        this.root = this.getRoot();
        this.pushMetaToParent();
    };

    // If it have a parentMenu, we push meta to the parentMenu for keyboard navigation.


    MenuItem.prototype.pushMetaToParent = function pushMetaToParent() {
        var menu = this.getParentByFlag('_menu')[0];
        menu && menu.addChildMeta(this._meta);
    };

    MenuItem.prototype.componentWillUnmount = function componentWillUnmount() {
        var menu = this.getParentByFlag('_menu')[0];
        menu && menu.removeChildMeta(this._meta);
    };

    MenuItem.prototype.render = function render() {
        var _classnames;

        var _props = this.props,
            focused = _props.focused,
            selected = _props.selected,
            disabled = _props.disabled,
            helper = _props.helper,
            className = _props.className,
            indentSize = _props.indentSize,
            children = _props.children,
            focusedKey = _props.focusedKey,
            hasSelectedIcon = _props.hasSelectedIcon,
            index = _props.index,
            needIndent = _props.needIndent,
            _props$style = _props.style,
            style = _props$style === undefined ? {} : _props$style,
            others = _objectWithoutProperties(_props, ['focused', 'selected', 'disabled', 'helper', 'className', 'indentSize', 'children', 'focusedKey', 'hasSelectedIcon', 'index', 'needIndent', 'style']),
            prefix = this.getPrefix();

        if (typeof selected === 'undefined') {
            selected = this.root.state.selectedKeys.indexOf(index) > -1;
        }

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'menu-item', true), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, 'selected', selected), _defineProperty(_classnames, 'focused', index && focusedKey === index), _defineProperty(_classnames, className, className), _classnames)),
            events = {
            onClick: this.onClick,
            onKeyDown: this.onKeyDown,
            onFocus: this.onFocus,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
        },
            icon = _react2['default'].createElement(
            _nextAnimate2['default'],
            { animation: {
                    appear: 'zoomIn',
                    enter: 'zoomIn',
                    leave: 'zoomOut'
                } },
            hasSelectedIcon && selected ? _react2['default'].createElement(_nextIcon2['default'], { type: 'select', className: prefix + 'menu-icon-select', size: 'xs', style: { left: (indentSize || 20) - 16 + 'px' } }) : null
        );

        helper = helper ? _react2['default'].createElement(
            'em',
            { className: prefix + 'menu-item-helper' },
            helper
        ) : null;
        if (disabled) {
            events = {
                // // Avoid trigger menu onSelect events
                onSelect: function onSelect(e) {
                    e.stopPropagation();
                },
                onClick: function onClick(e) {
                    e.stopPropagation();
                }
            };
        }
        others = (0, _nextUtil.pickAttrs)(others);
        if (indentSize && needIndent === true) {
            style.paddingLeft = indentSize;
        }
        return _react2['default'].createElement(
            'li',
            _extends({}, others, events, {
                style: style,
                tabIndex: disabled ? null : focused ? 0 : -1,
                role: 'menuitem',
                className: cls }),
            children,
            icon,
            helper
        );
    };

    MenuItem.prototype.onClick = function onClick(e) {
        this.root.onItemClick(e, this.props.index, 'click', this);
        // It will crash Popup or others component.
        // We will adjust order of params at 2.x
        this.props.onClick(this.props.index, e);
        e.stopPropagation();
    };

    MenuItem.prototype.onKeyDown = function onKeyDown(e) {
        var keyCode = e.keyCode;
        this.props.onKeyDown(e);
        if (keyCode === 32 || keyCode === 13) {
            this.onClick(e);
        }
    };

    MenuItem.prototype.onFocus = function onFocus(e) {
        e.stopPropagation();
    };

    MenuItem.prototype.onMouseEnter = function onMouseEnter(e) {
        this.root.onKeyNavNodeFocus(e);
        this.root.focusChild(this._meta);
        var parentMenu = this.getParentByType(this.Menu)[0];
        if (parentMenu) {
            var subMenu = parentMenu.getChildrenIncByType(this.SubMenu);
            var popup = parentMenu.getChildrenIncByType(_nextOverlay.Popup);
            subMenu.forEach(function (menu) {
                menu.onContentMouseEnter();
                if (menu.props.triggerType === 'hover') {
                    menu.onSubMenuMouseLeave(e);
                }
            });
            popup.forEach(function (p) {
                p._onContentMouseEnter();
                if (p.props.triggerType === 'hover') {
                    p._onTriggerMouseLeave(e);
                }
            });
        }
        this.props.onMouseEnter(e);
    };

    MenuItem.prototype.onMouseLeave = function onMouseLeave(e) {
        this.root.unFocusChild(this._meta);
        this.props.onMouseLeave(e);
    };

    return MenuItem;
}(Component), _class._menuItem = true, _class.propTypes = {
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
     * 显示在菜单右侧的帮助文本，通常用于一些附加信息
     */
    helper: _propTypes2['default'].string,
    /**
     * 禁用当前菜单项, 被禁用不会触发事件, 也无法选中Checkbox/Radio
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 当前的菜单项是否被选中, 优先级比Menu传入的selectedKeys要高
     */
    selected: _propTypes2['default'].bool,
    focused: _propTypes2['default'].bool,
    /**
     * 点击了菜单项触发的事件
     * @param {String} key 当前菜单项的key值
     * @param {Event} e DOM事件
     */
    onClick: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    parent: _propTypes2['default'].any,
    /**
     * 是否显示选中图标
     */
    hasSelectedIcon: _propTypes2['default'].bool,
    /**
     * 是否显示缩进
     */
    needIndent: _propTypes2['default'].bool
}, _class.defaultProps = {
    helper: null,
    disabled: false,
    prefix: 'next-',
    hasSelectedIcon: true,
    needIndent: true,
    onClick: noop,
    onKeyDown: noop,
    onMouseEnter: noop,
    onMouseLeave: noop
}, _class.contextTypes = {
    parentIndex: _propTypes2['default'].array,
    parentLabel: _propTypes2['default'].array,
    prefix: _propTypes2['default'].string
}, _temp);
MenuItem.displayName = 'MenuItem';
exports['default'] = MenuItem;
module.exports = exports['default'];

/***/ }),

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(172);
__webpack_require__(868);

/***/ }),

/***/ 716:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkbox = __webpack_require__(801);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkboxGroup = __webpack_require__(884);

var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_checkbox2['default'].Group = _checkboxGroup2['default'];

exports['default'] = _checkbox2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(715);
__webpack_require__(744);
__webpack_require__(172);
__webpack_require__(870);

/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
__webpack_require__(869);

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menu = __webpack_require__(876);

var _menu2 = _interopRequireDefault(_menu);

var _menuItem = __webpack_require__(692);

var _menuItem2 = _interopRequireDefault(_menuItem);

var _popupMenuItem = __webpack_require__(881);

var _popupMenuItem2 = _interopRequireDefault(_popupMenuItem);

var _menuDivider = __webpack_require__(882);

var _menuDivider2 = _interopRequireDefault(_menuDivider);

var _checkboxMenuItem = __webpack_require__(883);

var _checkboxMenuItem2 = _interopRequireDefault(_checkboxMenuItem);

var _radioMenuItem = __webpack_require__(885);

var _radioMenuItem2 = _interopRequireDefault(_radioMenuItem);

var _menuGroup = __webpack_require__(887);

var _menuGroup2 = _interopRequireDefault(_menuGroup);

var _subMenu = __webpack_require__(800);

var _subMenu2 = _interopRequireDefault(_subMenu);

var _container = __webpack_require__(686);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_menu2['default'].Item = _menuItem2['default'];
_menu2['default'].Divider = _menuDivider2['default'];
_menu2['default'].CheckboxItem = _checkboxMenuItem2['default'];
_menu2['default'].RadioItem = _radioMenuItem2['default'];
_menu2['default'].PopupItem = _popupMenuItem2['default'];
_menu2['default'].Group = _menuGroup2['default'];
_menu2['default'].SubMenu = _subMenu2['default'];
_menu2['default'].Container = _container2['default'];

exports['default'] = _menu2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp2, _class3, _temp3;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _TransitionGroup = __webpack_require__(877);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

var _names = __webpack_require__(880);

var _names2 = _interopRequireDefault(_names);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};
var on = _nextDom.events.on;
var addClass = _nextDom.classList.addClass;
var removeClass = _nextDom.classList.removeClass;

var AnimateChild = (_temp = _class = function (_React$Component) {
    _inherits(AnimateChild, _React$Component);

    function AnimateChild() {
        _classCallCheck(this, AnimateChild);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    AnimateChild.prototype.componentDidMount = function componentDidMount() {
        this.node = (0, _reactDom.findDOMNode)(this);
        this.onAnimateEnd = this.onAnimateEnd.bind(this);
        if (this.props.useTransition && _nextUtil.support.transition) {
            this._animation = on(this.node, _nextUtil.support.transition.end, this.onAnimateEnd);
        } else if (_nextUtil.support.animation) {
            this._animation = on(this.node, _nextUtil.support.animation.end, this.onAnimateEnd);
        }
    };

    AnimateChild.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.node !== (0, _reactDom.findDOMNode)(this)) {
            if (this._animation && this._animation.off) {
                this._animation.off();
            }
            this.componentDidMount();
        }
    };

    AnimateChild.prototype.fakeAnimationEvent = function fakeAnimationEvent() {
        if (!_nextUtil.support.animation || this.props.useTransition && !_nextUtil.support.transition) {
            this.timeoutEnd = setTimeout(this.onAnimateEnd, 10);
        }
    };

    AnimateChild.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this._animation && this._animation.off) {
            this._animation.off();
        }
        clearTimeout(this.timeoutEnd);
    };

    AnimateChild.prototype.componentWillAppear = function componentWillAppear(done) {
        if (this.props.animationAppear) {
            this.playAction('appear', done);
        } else {
            done();
        }
        this.props.beforeAppear();
        this.fakeAnimationEvent();
    };

    AnimateChild.prototype.componentDidAppear = function componentDidAppear() {
        this.props.afterAppear();
    };

    AnimateChild.prototype.componentWillEnter = function componentWillEnter(done) {
        this.playAction('enter', done);
        this.props.beforeEnter();
        this.fakeAnimationEvent();
    };

    AnimateChild.prototype.componentDidEnter = function componentDidEnter() {
        this.props.afterEnter();
    };

    AnimateChild.prototype.componentWillLeave = function componentWillLeave(done) {
        this.playAction('leave', done);
        this.props.beforeLeave();
        this.fakeAnimationEvent();
    };

    AnimateChild.prototype.componentDidLeave = function componentDidLeave() {
        this.props.afterLeave();
    };

    AnimateChild.prototype.onAnimateEnd = function onAnimateEnd(e) {
        if (e && e.target !== this.node) {
            return;
        }
        clearTimeout(this.timeout);
        if (this._done) {
            this._done();
        }
        e && e.stopPropagation();
    };

    AnimateChild.prototype.playAction = function playAction(type, done) {
        var node = (0, _reactDom.findDOMNode)(this),
            animation = this.props.animation,
            res = animation[type];

        if (typeof res === 'string') {
            Object.keys(animation).forEach(function (key) {
                if (typeof animation[key] === 'string') {
                    removeClass(node, animation[key]);
                    removeClass(node, animation[key] + '-active');
                }
            });
            addClass(node, res);
            this.addActiveClass(node, res + '-active');
            this._done = done;
        } else if (typeof res === 'function') {
            res(node, done);
        } else {
            done();
        }
        this.node = node;
    };

    AnimateChild.prototype.addActiveClass = function addActiveClass(node, className) {
        this.timeout = setTimeout(function () {
            addClass(node, className);
        }, 20);
    };

    AnimateChild.prototype.render = function render() {
        return this.props.children;
    };

    return AnimateChild;
}(_react2['default'].Component), _class.propTypes = {
    beforeAppear: _propTypes2['default'].func,
    afterAppear: _propTypes2['default'].func,
    beforeEnter: _propTypes2['default'].func,
    afterEnter: _propTypes2['default'].func,
    beforeLeave: _propTypes2['default'].func,
    afterLeave: _propTypes2['default'].func,
    children: _propTypes2['default'].any,
    useTransition: _propTypes2['default'].bool,
    animationAppear: _propTypes2['default'].bool
}, _class.defaultProps = {
    animationAppear: true
}, _temp);

/* eslint-disable react/no-multi-comp*/

AnimateChild.displayName = 'AnimateChild';
var SingeChildWrapper = (_temp2 = _class2 = function (_React$Component2) {
    _inherits(SingeChildWrapper, _React$Component2);

    function SingeChildWrapper() {
        _classCallCheck(this, SingeChildWrapper);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    SingeChildWrapper.prototype.render = function render() {
        var children = _react2['default'].Children.toArray(this.props.children);
        return children[0] || null;
    };

    return SingeChildWrapper;
}(_react2['default'].Component), _class2.propTypes = {
    children: _propTypes2['default'].any
}, _temp2);

/**
 * Animate
 */

SingeChildWrapper.displayName = 'SingeChildWrapper';
var Animate = (_temp3 = _class3 = function (_React$Component3) {
    _inherits(Animate, _React$Component3);

    function Animate() {
        _classCallCheck(this, Animate);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    Animate.prototype.render = function render() {
        var _props = this.props,
            animation = _props.animation,
            children = _props.children,
            component = _props.component,
            animationAppear = _props.animationAppear,
            afterAppear = _props.afterAppear,
            afterEnter = _props.afterEnter,
            afterLeave = _props.afterLeave,
            singleMode = _props.singleMode,
            useTransition = _props.useTransition,
            beforeAppear = _props.beforeAppear,
            beforeEnter = _props.beforeEnter,
            beforeLeave = _props.beforeLeave,
            others = _objectWithoutProperties(_props, ['animation', 'children', 'component', 'animationAppear', 'afterAppear', 'afterEnter', 'afterLeave', 'singleMode', 'useTransition', 'beforeAppear', 'beforeEnter', 'beforeLeave']),
            attrs = {
            afterAppear: afterAppear,
            afterEnter: afterEnter,
            afterLeave: afterLeave,
            beforeAppear: beforeAppear,
            beforeEnter: beforeEnter,
            beforeLeave: beforeLeave,
            animationAppear: animationAppear,
            animation: this.normalizeAnimation(animation)
        },
            length = _react2['default'].Children.count(children),
            animateChildren = _react2['default'].Children.map(children, function (child, index) {
            var key = child.key;
            if (!key) {
                key = 'animate-' + index;
            }
            return _react2['default'].createElement(
                AnimateChild,
                _extends({}, attrs, { key: key, useTransition: useTransition }),
                child
            );
        });

        if (!component && length <= 1 && singleMode) {
            component = SingeChildWrapper;
        }

        return _react2['default'].createElement(
            _TransitionGroup2['default'],
            _extends({ component: component }, others),
            animateChildren
        );
    };

    Animate.prototype.normalizeAnimation = function normalizeAnimation(animation) {
        if (typeof animation === 'string') {
            return { appear: animation + '-appear', enter: animation + '-enter', leave: animation + '-leave' };
        }
        return animation;
    };

    return Animate;
}(_react2['default'].Component), _class3.propTypes = {
    children: _propTypes2['default'].any,
    /**
    * 配置动画的播放方式, 详见[animation](#animation)
    */
    animation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    beforeAppear: _propTypes2['default'].func,
    /**
    * 在初始动画播放完毕触发的事件
    */
    afterAppear: _propTypes2['default'].func,
    beforeEnter: _propTypes2['default'].func,
    /**
    * 在进场动画播放完毕触发的事件
    */
    afterEnter: _propTypes2['default'].func,
    beforeLeave: _propTypes2['default'].func,
    /**
    * 在离开动画播放完毕触发的事件
    */
    afterLeave: _propTypes2['default'].func,
    /**
    * 在针对多个子节点播放动画的时候包裹的标签
    */
    component: _propTypes2['default'].any,
    /**
    * 是否是有单个节点，如果有多个动画的孩子节点，设置该选项为false
    */
    singleMode: _propTypes2['default'].bool,
    useTransition: _propTypes2['default'].bool,
    /**
    * 是否在初始的时候播放动画
    */
    animationAppear: _propTypes2['default'].bool
}, _class3.defaultProps = {
    animation: {
        appear: noop,
        enter: noop,
        leave: noop
    },
    beforeAppear: noop,
    afterAppear: noop,
    beforeEnter: noop,
    afterEnter: noop,
    beforeLeave: noop,
    afterLeave: noop,
    singleMode: true,
    animationAppear: true,
    useTransition: false
}, _temp3);
Animate.displayName = 'Animate';
exports['default'] = Animate;


Animate.names = _names2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 747:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _radio = __webpack_require__(803);

var _radio2 = _interopRequireDefault(_radio);

var _radioGroup = __webpack_require__(886);

var _radioGroup2 = _interopRequireDefault(_radioGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_radio2['default'].Group = _radioGroup2['default'];

exports['default'] = _radio2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(748);
module.exports = __webpack_require__(805);

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextAnimate = __webpack_require__(746);

var _nextAnimate2 = _interopRequireDefault(_nextAnimate);

var _container = __webpack_require__(686);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Component = _container2['default'];

/**
 * Menu.SubMenu
 * @order 2
 **/
var SubMenu = (_temp = _class = function (_Component) {
    _inherits(SubMenu, _Component);

    SubMenu.prototype.getChildContext = function getChildContext() {
        var parentIndex = normalizeInfo(this.context, 'parentIndex', this.props.index),
            parentLabel = normalizeInfo(this.context, 'parentLabel', this.props.label || this.props.children);

        return {
            parentIndex: parentIndex,
            parentLabel: parentLabel
        };
    };

    function SubMenu(props) {
        _classCallCheck(this, SubMenu);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        ['onDocumentClick', 'onSubMenuClick', 'onSubMenuMouseEnter', 'onSubMenuMouseLeave', 'onContentMouseEnter', 'onContentMouseLeave', 'onKeyDown'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        var root = _this.getRoot();
        if (!root) {
            throw new Error('SubMenu should use under Menu.');
        }
        _this.root = root;
        _this.Menu = root.constructor;
        _this.MenuItem = root.constructor.Item;
        return _this;
    }

    SubMenu.prototype.normalizeVisible = function normalizeVisible() {
        return 'visible' in this.props ? this.props.visible : this.props.openKeys.indexOf(this.props.index) > -1;
    };

    SubMenu.prototype.render = function render() {
        var _classnames,
            _this2 = this;

        var _props = this.props,
            className = _props.className,
            label = _props.label,
            animation = _props.animation,
            disabled = _props.disabled,
            children = _props.children,
            indentSize = _props.indentSize,
            mode = _props.mode,
            triggerType = _props.triggerType,
            selectable = _props.selectable,
            align = _props.align,
            index = _props.index,
            hasSelectedIcon = _props.hasSelectedIcon,
            selected = _props.selected,
            others = _objectWithoutProperties(_props, ['className', 'label', 'animation', 'disabled', 'children', 'indentSize', 'mode', 'triggerType', 'selectable', 'align', 'index', 'hasSelectedIcon', 'selected']),
            prefix = this.getPrefix(),
            visible = this.normalizeVisible(),
            cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'menu-submenu-item', mode === 'inline'), _defineProperty(_classnames, prefix + 'menu-submenu-item-popup', mode === 'popup'), _defineProperty(_classnames, 'opened', visible), _defineProperty(_classnames, align, align), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, className, className), _classnames)),
            Menu = this.Menu,
            MenuItem = this.MenuItem,
            child = _react2['default'].createElement(Menu, null),
            icon = void 0,
            events = void 0,
            contentEvents = void 0;

        if (mode === 'inline') {
            icon = _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-down', className: visible ? 'opened' : '', size: 'xs' });
        } else {
            icon = _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-right', size: 'xs' });
        }

        if (triggerType === 'click') {
            events = {
                onClick: function onClick(e) {
                    _this2.onSubMenuClick(e);
                    _this2.props.onClick(e);
                }
            };
        } else {
            events = {
                onMouseEnter: this.onSubMenuMouseEnter,
                onMouseLeave: this.onSubMenuMouseLeave,
                onClick: function onClick(e) {
                    e && e.stopPropagation();
                    if (selectable) {
                        _this2.root.onItemClick(e, index, 'click', _this2);
                    }
                    _this2.props.onClick(e);
                }
            };
            contentEvents = {
                onMouseEnter: this.onContentMouseEnter,
                onMouseLeave: this.onContentMouseLeave
            };
        }

        child = _react2['default'].cloneElement(child, _extends({
            mode: mode
        }, others, contentEvents, {
            indentSize: mode === 'inline' ? indentSize + child.props.indentSize : indentSize,
            ref: 'content',
            children: children,
            hasSubMenu: true,
            parent: this
        }));

        if (animation) {
            var oneTransitionEnd = function oneTransitionEnd(node, done) {
                var timeout = void 0;
                var handler = function handler() {
                    [animation['in'], animation['in'] + '-active', animation.out, animation.out + '-active'].forEach(function (className) {
                        _nextDom.classList.removeClass(node, className);
                    });
                    _nextDom.style.set(node, 'height', null);
                    clearTimeout(timeout);
                    done();
                };
                timeout = setTimeout(handler, 250);
            };
            var enterHook = function enterHook(node, done) {
                _nextDom.classList.addClass(node, 'out-screen');
                _nextDom.classList.removeClass(node, 'hide');
                var height = node.offsetHeight + 'px';
                _nextDom.classList.addClass(node, animation['in']);
                _nextDom.classList.removeClass(node, 'out-screen');
                setTimeout(function () {
                    _nextDom.classList.addClass(node, animation['in'] + '-active');
                    _nextDom.style.set(node, 'height', height);
                }, 1);

                oneTransitionEnd(node, done);
            };
            var leaveHook = function leaveHook(node, done) {
                var height = node.offsetHeight + 'px';
                _nextDom.style.set(node, 'height', height);
                _nextDom.classList.addClass(node, animation.out);
                setTimeout(function () {
                    _nextDom.classList.addClass(node, animation.out + '-active');
                    _nextDom.style.set(node, 'height', 0);
                }, 1);

                oneTransitionEnd(node, done);
            };
            var animationConfig = void 0;
            if (mode === 'inline') {
                animationConfig = {
                    enter: enterHook,
                    leave: leaveHook,
                    appear: enterHook
                };
            } else {
                animationConfig = {
                    enter: animation['in'],
                    leave: animation.out,
                    appear: animation['in']
                };
            }
            if (mode === 'popup') {
                child = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'menu-wrapper' },
                    child
                );
            }
            child = _react2['default'].createElement(
                _nextAnimate2['default'],
                { animationAppear: false, animation: animationConfig, useTransition: true },
                visible ? child : null
            );
        } else {
            child = _react2['default'].cloneElement(child, {
                style: {
                    display: visible ? '' : 'none'
                }
            });
        }

        if (selectable && triggerType === 'click') {
            icon = _react2['default'].cloneElement(icon, events);
            return (
                // 设置needIndent为false
                // 使用subMenu的title来控制
                _react2['default'].createElement(
                    MenuItem,
                    _extends({}, others, {
                        index: index,
                        hasSelectedIcon: hasSelectedIcon,
                        selected: selected,
                        className: cls,
                        'aria-haspopup': true,
                        parent: this,
                        onKeyDown: this.onKeyDown,
                        indentSize: indentSize,
                        needIndent: false,
                        label: label }),
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'menu-submenu-title',
                            style: { paddingLeft: indentSize } },
                        label,
                        icon
                    ),
                    child
                )
            );
        } else {
            if (typeof selected === 'undefined') {
                selected = this.root.state.selectedKeys.indexOf(index) > -1;
            }

            var selectedIcon = hasSelectedIcon && selectable ? _react2['default'].createElement(
                _nextAnimate2['default'],
                { animation: {
                        appear: 'zoomIn',
                        enter: 'zoomIn',
                        leave: 'zoomOut'
                    } },
                selected ? _react2['default'].createElement(_nextIcon2['default'], { type: 'select', className: prefix + 'menu-icon-select', size: 'xs', style: { left: (indentSize || 20) - 16 + 'px' } }) : null
            ) : null;

            return _react2['default'].createElement(
                'li',
                { className: cls,
                    'aria-haspopup': true,
                    onKeyDown: this.onKeyDown },
                _react2['default'].createElement(
                    'div',
                    _extends({ className: prefix + 'menu-submenu-title'
                    }, events, {
                        style: { paddingLeft: indentSize } }),
                    label,
                    icon
                ),
                selectedIcon,
                child
            );
        }
    };

    SubMenu.prototype.componentDidMount = function componentDidMount() {
        if (this.props.mode === 'popup') {
            _nextDom.events.on(document, 'click', this.onDocumentClick);
        }
    };

    SubMenu.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.props.mode === 'popup') {
            _nextDom.events.off(document, 'click', this.onDocumentClick);
        }
    };

    SubMenu.prototype.onDocumentClick = function onDocumentClick(e) {
        var node = (0, _reactDom.findDOMNode)(this.root),
            target = e.target;

        if (!(node && node.contains(target))) {
            this.onVisibleChange(false, 'fromDoc');
        }
    };

    SubMenu.prototype.onSubMenuClick = function onSubMenuClick(index, e) {
        var visible = !this.normalizeVisible();
        this.onVisibleChange(visible);
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            index.stopPropagation();
        }
    };

    SubMenu.prototype.onSubMenuMouseEnter = function onSubMenuMouseEnter(e, type) {
        var _this3 = this;

        this.onContentMouseEnter();
        this._subMenuEnterTimeout = setTimeout(function () {
            _this3.onVisibleChange(true, type);
        }, 150);
    };

    SubMenu.prototype.onSubMenuMouseLeave = function onSubMenuMouseLeave(e, type) {
        var _this4 = this;

        this._subMenuEnterTimeout && clearTimeout(this._subMenuEnterTimeout);
        this._subMenuTimeout = setTimeout(function () {
            _this4.onVisibleChange(false, type);
        }, 150);
    };

    SubMenu.prototype.onContentMouseEnter = function onContentMouseEnter() {
        this._subMenuTimeout && clearTimeout(this._subMenuTimeout);
    };

    SubMenu.prototype.onContentMouseLeave = function onContentMouseLeave(e) {
        this._subMenuEnterTimeout && clearTimeout(this._subMenuEnterTimeout);
        this.onSubMenuMouseLeave(e, 'fromContent');
    };

    SubMenu.prototype.onVisibleChange = function onVisibleChange(visible, type) {
        var _this5 = this;

        if (type === 'fromDoc') {
            this.root.onOpen(this.props.index, visible);
        } else {
            var parentIndexes = this.getParentByType(SubMenu).map(function (parent) {
                return parent.props.index || parent.key;
            });
            var indexes = [this.props.index];

            if (!visible && !this._openByKeyBoard && type === 'fromContent') {
                indexes = indexes.concat(parentIndexes);
            }
            indexes.forEach(function (index) {
                _this5.root.onOpen(index, visible);
            });
            this._openByKeyBoard = false;
        }
    };

    SubMenu.prototype.onKeyDown = function onKeyDown(e) {
        if (e.keyCode === _nextUtil.keyCode.ENTER || e.keyCode === _nextUtil.keyCode.SPACE) {
            this.onSubMenuClick(e);
        }
    };

    SubMenu.prototype.getContentNode = function getContentNode() {
        return _reactDom2['default'].findDOMNode(this.refs.content);
    };

    return SubMenu;
}(Component), _class._menuItem = true, _class._subMenu = true, _class.propTypes = {
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
     * 子菜单的标签
     */
    label: _propTypes2['default'].any,
    visible: _propTypes2['default'].bool,
    /**
     * 设置子菜单表现的形式
     */
    mode: _propTypes2['default'].oneOf(['inline', 'popup']),
    /**
     * 设置子菜单显示触发的类型
     */
    triggerType: _propTypes2['default'].oneOf(['click', 'hover']),
    /**
     * 设置子菜单的label是否可以被选中
     */
    selectable: _propTypes2['default'].bool,
    /**
     * 设置子菜单的跟随类型
     */
    align: _propTypes2['default'].oneOf(['outside', 'follow']),
    onClick: _propTypes2['default'].func,
    hasSelectedIcon: _propTypes2['default'].bool
}, _class.defaultProps = {
    label: 'sub-item',
    animation: { 'in': 'slide-down', out: 'slide-up' },
    mode: 'inline',
    triggerType: 'click',
    selectable: false,
    align: 'follow',
    prefix: 'next-',
    onClick: function onClick() {},
    hasSelectedIcon: true
}, _class.contextTypes = {
    parentIndex: _propTypes2['default'].array,
    parentLabel: _propTypes2['default'].array,
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    parentIndex: _propTypes2['default'].array,
    parentLabel: _propTypes2['default'].array
}, _temp);
SubMenu.displayName = 'SubMenu';
exports['default'] = SubMenu;


function normalizeInfo(context, name, value) {
    var meta = void 0;
    if (context[name]) {
        meta = [].concat(_toConsumableArray(context[name]));
        meta.push(value);
    } else {
        meta = [value];
    }
    return meta;
}
module.exports = exports['default'];

/***/ }),

/***/ 801:
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

var _classnames3 = __webpack_require__(8);

var _classnames4 = _interopRequireDefault(_classnames3);

var _nextMixinUiState = __webpack_require__(802);

var _nextMixinUiState2 = _interopRequireDefault(_nextMixinUiState);

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

function isChecked(selectedValue, value) {
    return selectedValue.indexOf(value) > -1;
}
/** Checkbox */
var Checkbox = (_temp = _class = function (_UIState) {
    _inherits(Checkbox, _UIState);

    function Checkbox(props, context) {
        _classCallCheck(this, Checkbox);

        var _this = _possibleConstructorReturn(this, _UIState.call(this, props));

        var checked = void 0,
            indeterminate = void 0,
            disabled = void 0;
        if (context.__group__) {
            indeterminate = false;
            checked = isChecked(context.selectedValue, props.value);
            disabled = context.disabled;
        } else {
            if ('checked' in props) {
                checked = props.checked;
            } else {
                checked = props.defaultChecked;
            }

            if ('indeterminate' in props) {
                indeterminate = props.indeterminate;
            } else {
                indeterminate = props.defaultIndeterminate;
            }
        }

        _this.state = {
            checked: checked,
            indeterminate: indeterminate,
            disabled: disabled
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    Checkbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.__group__) {
            var selectedValue = nextContext.selectedValue,
                disabled = nextContext.disabled;

            if ('selectedValue' in nextContext && 'disabled' in nextContext) {
                this.setState({
                    checked: isChecked(selectedValue, nextProps.value),
                    disabled: disabled
                });
            } else if ('selectedValue' in nextContext) {
                this.setState({
                    checked: isChecked(selectedValue, nextProps.value)
                });
            } else if ('disabled' in nextContext) {
                this.setState({
                    disabled: disabled
                });
            }
        } else {
            if ('checked' in nextProps) {
                this.setState({
                    checked: nextProps.checked
                });
            }
            if ('indeterminate' in nextProps) {
                this.setState({
                    indeterminate: nextProps.indeterminate
                });
            }
        }
    };

    Checkbox.prototype.onChange = function onChange(e) {
        var checked = e.target.checked;
        var value = this.props.value;

        if (this.state.disabled || this.props.disabled) {
            return;
        }

        if (this.context.__group__) {
            this.context.onChange(value, e);
        } else {
            if (!('checked' in this.props)) {
                this.setState({
                    checked: checked
                });
            }

            if (!('indeterminate' in this.props)) {
                this.setState({
                    indeterminate: false
                });
            }
            this.props.onChange(checked, e);
        }
    };

    Checkbox.prototype.render = function render() {
        var _classnames;

        var _props = this.props,
            className = _props.className,
            children = _props.children,
            defaultChecked = _props.defaultChecked,
            style = _props.style,
            others = _objectWithoutProperties(_props, ['className', 'children', 'defaultChecked', 'style']);

        var checked = this.state.checked;
        var disabled = this.state.disabled || this.props.disabled;
        var indeterminate = this.state.indeterminate;
        var newOthers = (0, _nextUtil.pickAttrs)(others);
        var prefix = this.context.prefix || this.props.prefix;

        var checkedAttr = {};
        if ('checked' in this.props) {
            checkedAttr = {
                checked: checked
            };
        } else if ('defaultChecked' in this.props) {
            checkedAttr = {
                defaultChecked: defaultChecked
            };
        }
        var input = _react2['default'].createElement('input', _extends({
            type: 'checkbox'
        }, newOthers, checkedAttr, {
            onChange: this.onChange,
            'aria-checked': checked
        }));

        var child = this.getStateElement(input);
        var cls = (0, _classnames4['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'checkbox', true), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'checked', checked), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, 'indeterminate', indeterminate), _defineProperty(_classnames, this.getStateClassName(), true), _classnames));
        var childrenCls = (0, _classnames4['default'])(_defineProperty({}, prefix + 'checkbox-label', !!children));
        var type = indeterminate ? 'semi-select' : 'select';

        return children ? _react2['default'].createElement(
            'label',
            { htmlFor: this.props.id },
            _react2['default'].createElement(
                'span',
                { className: cls, style: style },
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'checkbox-inner' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: type, size: 'xs', className: indeterminate ? 'zoomIn' : '' })
                ),
                child
            ),
            _react2['default'].createElement(
                'span',
                { className: childrenCls },
                children
            )
        ) : _react2['default'].createElement(
            'label',
            { className: cls, style: style },
            _react2['default'].createElement(
                'span',
                { className: prefix + 'checkbox-inner' },
                _react2['default'].createElement(_nextIcon2['default'], { type: type, size: 'xs', className: indeterminate ? 'zoomIn' : '' })
            ),
            child
        );
    };

    return Checkbox;
}(_nextMixinUiState2['default']), _class.displayName = 'Checkbox', _class.propTypes = {
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
     * 选中状态
     */
    checked: _propTypes2['default'].bool,
    /**
     * 默认选中状态
     */
    defaultChecked: _propTypes2['default'].bool,
    /**
     * 禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * Checkbox 的中间状态，只会影响到 Checkbox 的样式，并不影响其 checked 属性
     */
    indeterminate: _propTypes2['default'].bool,
    /**
     *  Checkbox 的默认中间态，只会影响到 Checkbox 的样式，并不影响其 checked 属性
     */
    defaultIndeterminate: _propTypes2['default'].bool,
    /**
     * 状态变化时触发的事件
     * @param {Boolean} checked 是否选中
     * @param {Event} e Dom 事件对象
     */
    onChange: _propTypes2['default'].func
}, _class.defaultProps = {
    defaultChecked: false,
    defaultIndeterminate: false,
    onChange: function onChange() {},
    prefix: 'next-'
}, _class.contextTypes = {
    onChange: _propTypes2['default'].func,
    __group__: _propTypes2['default'].bool,
    selectedValue: _propTypes2['default'].array,
    disabled: _propTypes2['default'].bool,
    prefix: _propTypes2['default'].string
}, _temp);
exports['default'] = Checkbox;
module.exports = exports['default'];

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {},
    makeChain = _nextUtil.func.makeChain;
//UIState 为一些特殊元素的状态响应提供了标准的方式，
//尤其适合CSS无法完全定制的控件，比如checkbox，radio等。

var UIState = function (_Component) {
	_inherits(UIState, _Component);

	function UIState(props) {
		_classCallCheck(this, UIState);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {};
		['_onUIMouseEnter', '_onUIMouseLeave', '_onUIFocus', '_onUIBlur'].forEach(function (item) {
			_this[item] = _this[item].bind(_this);
		});
		return _this;
	}

	// base 事件绑定的元素


	UIState.prototype.getStateElement = function getStateElement(base) {
		var _props = this.props,
		    onMouseEnter = _props.onMouseEnter,
		    onMouseLeave = _props.onMouseLeave,
		    onFocus = _props.onFocus,
		    onBlur = _props.onBlur;

		return _react2['default'].cloneElement(base, {
			onMouseEnter: makeChain(this._onUIMouseEnter, onMouseEnter),
			onMouseLeave: makeChain(this._onUIMouseLeave, onMouseLeave),
			onFocus: makeChain(this._onUIFocus, onFocus),
			onBlur: makeChain(this._onUIBlur, onBlur)
		});
	};

	UIState.prototype.getStateClassName = function getStateClassName() {
		var _state = this.state,
		    hovered = _state.hovered,
		    focused = _state.focused;

		return (0, _classnames2['default'])({
			hovered: hovered,
			focused: focused
		});
	};

	UIState.prototype._onUIMouseEnter = function _onUIMouseEnter() {
		if (!this.props.disabled && !this.state.disabled) {
			this.setState({
				hovered: true
			});
		}
	};

	UIState.prototype._onUIMouseLeave = function _onUIMouseLeave() {
		this.setState({
			hovered: false
		});
	};

	UIState.prototype._onUIFocus = function _onUIFocus() {
		if (!this.props.disabled && !this.state.disabled) {
			this.setState({
				focused: true
			});
		}
	};

	UIState.prototype._onUIBlur = function _onUIBlur() {
		this.setState({
			focused: false
		});
	};

	return UIState;
}(_react.Component);

UIState.displayName = 'UIState';
exports['default'] = UIState;
module.exports = exports['default'];

/***/ }),

/***/ 803:
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

var _classnames5 = __webpack_require__(8);

var _classnames6 = _interopRequireDefault(_classnames5);

var _nextMixinUiState = __webpack_require__(802);

var _nextMixinUiState2 = _interopRequireDefault(_nextMixinUiState);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Radio
 * @order 1
 */
var Radio = (_temp = _class = function (_UIState) {
    _inherits(Radio, _UIState);

    function Radio(props, context) {
        _classCallCheck(this, Radio);

        var _this = _possibleConstructorReturn(this, _UIState.call(this, props));

        var checked = void 0,
            disabled = void 0;
        if (context.__group__) {
            checked = context.selectedValue === props.value;
            disabled = context.disabled;
        } else if ('checked' in props) {
            checked = props.checked;
        } else {
            checked = props.defaultChecked;
        }
        _this.state = {
            checked: checked,
            disabled: disabled,
            isMouseDown: false
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    Radio.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.__group__) {
            var selectedValue = nextContext.selectedValue,
                disabled = nextContext.disabled;

            if ('selectedValue' in nextContext && 'disabled' in nextContext) {
                this.setState({
                    checked: selectedValue === nextProps.value,
                    disabled: disabled
                });
            }
        } else if ('checked' in nextProps) {
            this.setState({
                checked: nextProps.checked
            });
        }
    };

    Radio.prototype.onChange = function onChange(e) {
        var checked = e.target.checked;
        var value = this.props.value;

        if (this.context.__group__) {
            this.context.onChange(value, e);
        } else if (this.state.checked !== checked) {
            if (!('checked' in this.props)) {
                this.setState({
                    checked: checked
                });
            }
            this.props.onChange(checked, e);
        }
    };

    Radio.prototype.render = function render() {
        var _classnames, _classnames2, _classnames3;

        var _props = this.props,
            className = _props.className,
            children = _props.children,
            style = _props.style,
            other = _objectWithoutProperties(_props, ['className', 'children', 'style']);

        var checked = !!this.state.checked;
        var disabled = this.state.disabled || this.props.disabled;
        var isButton = this.context.isButton;
        var newOther = (0, _nextUtil.pickAttrs)(other);
        var prefix = this.context.prefix || this.props.prefix;

        var input = _react2['default'].createElement('input', _extends({
            type: 'radio'
        }, newOther, {
            disabled: disabled,
            checked: checked,
            onChange: this.onChange,
            'aria-checked': checked

        }));

        var child = this.getStateElement(input);
        var cls = (0, _classnames6['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'radio', true), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'checked', checked), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, this.getStateClassName(), true), _classnames));
        var clsInner = (0, _classnames6['default'])((_classnames2 = {}, _defineProperty(_classnames2, prefix + 'radio-inner', true), _defineProperty(_classnames2, 'press', checked), _defineProperty(_classnames2, 'unpress', !checked), _classnames2));
        var clsWrapper = (0, _classnames6['default'])((_classnames3 = {}, _defineProperty(_classnames3, prefix + 'radio-wrapper', true), _defineProperty(_classnames3, className, !!className), _defineProperty(_classnames3, 'checked', checked), _defineProperty(_classnames3, 'disabled', disabled), _defineProperty(_classnames3, this.getStateClassName(), true), _classnames3));
        var childrenCls = (0, _classnames6['default'])(_defineProperty({}, prefix + 'radio-label', !!children));

        var radioComp = !isButton ? _react2['default'].createElement(
            'span',
            { className: cls, style: style
            },
            _react2['default'].createElement('span', { className: clsInner }),
            child
        ) : _react2['default'].createElement(
            'span',
            { className: prefix + 'radio-single-input'
            },
            child
        );

        return children ? _react2['default'].createElement(
            'label',
            {
                className: isButton ? clsWrapper : '', style: isButton ? style : {} },
            radioComp,
            _react2['default'].createElement(
                'span',
                { htmlFor: this.props.id, className: childrenCls },
                children
            )
        ) : _react2['default'].createElement(
            'label',
            {
                className: isButton ? clsWrapper : '', style: isButton ? style : {} },
            radioComp
        );
    };

    return Radio;
}(_nextMixinUiState2['default']), _class.displayName = 'Radio', _class.propTypes = {
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
     * 设置radio是否选中
     */
    checked: _propTypes2['default'].bool,
    /**
     * radio的默认选中
     */
    defaultChecked: _propTypes2['default'].bool,
    /**
     * 状态变化时触发的事件
     * @param {Boolean} checked 是否选中
     * @param {Event} e Dom 事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 表示radio被禁用
     */
    disabled: _propTypes2['default'].bool
}, _class.defaultProps = {
    onChange: function onChange() {},
    prefix: 'next-'
}, _class.contextTypes = {
    onChange: _propTypes2['default'].func,
    __group__: _propTypes2['default'].bool,
    isButton: _propTypes2['default'].bool,
    selectedValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].bool]),
    disabled: _propTypes2['default'].bool,
    prefix: _propTypes2['default'].string
}, _temp);
exports['default'] = Radio;
module.exports = exports['default'];

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(889);

/***/ }),

/***/ 806:
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

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

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

function preventDefault(e) {
    e.preventDefault();
}

/** Input */
var Input = (_temp = _class = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        var value = void 0;
        if ('value' in props) {
            value = props.value;
        } else {
            value = props.defaultValue;
        }

        _this.state = {
            value: typeof value === 'undefined' ? '' : value
        };
        return _this;
    }

    Input.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: typeof nextProps.value === 'undefined' ? '' : nextProps.value
            });
        }
    };

    Input.prototype.handleKeyDown = function handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.onPressEnter(e);
        }
        this.props.onKeyDown(e);
    };

    Input.prototype.onChange = function onChange(e) {
        var value = e.target.value;
        if (!('value' in this.props)) {

            // Fix: textarea dit not support maxLength in ie9
            if (this.isIe() && this.props.maxLength && this.props.multiple) {
                var maxLength = parseInt(this.props.maxLength);
                var len = this.getValueLength(value, true);
                if (len > maxLength && this.props.cutString) {
                    value = value.replace(/\n/g, '\n\n');
                    value = value.substr(0, maxLength);
                    value = value.replace(/\n\n/g, '\n');
                }
            }

            this.setState({
                value: value
            });
        }

        if (this.props.trim) {
            value = value.trim();
        }

        this.props.onChange(value, e);
    };

    Input.prototype.onFocus = function onFocus(e) {
        this.setState({
            focus: true
        });
        this.props.onFocus(e);
    };

    Input.prototype.onBlur = function onBlur(e) {
        this.setState({
            focus: false
        });
        this.props.onBlur(e);
    };

    Input.prototype.onClear = function onClear(e) {
        if (this.props.disabled) {
            return;
        }

        // 非受控模式清空内部数据
        if (!('value' in this.props)) {
            this.setState({
                value: ''
            });
        }
        this.props.onChange('', e);
        this.refs.input.focus();
    };

    Input.prototype.ieGT9 = function ieGT9() {
        if (typeof document === 'undefined') {
            return false;
        }
        var documentMode = document.documentMode || 0;
        return documentMode > 9;
    };

    Input.prototype.isIe = function isIe() {
        if (typeof document === 'undefined') {
            return false;
        }
        var documentMode = document.documentMode || 0;
        return documentMode !== 0;
    };

    Input.prototype.renderInput = function renderInput() {
        var _classNames;

        var nstyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var nclassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


        // placeholder 在ie9以上会直接触发onChange，影响校验
        var placeholder = this.props.placeholder;
        if (placeholder && this.ieGT9()) {
            placeholder = null;
        }

        /*eslint-disable */

        var _props = this.props,
            multiple = _props.multiple,
            size = _props.size,
            className = _props.className,
            children = _props.children,
            htmlType = _props.htmlType,
            maxLen = _props.maxLen,
            maxLength = _props.maxLength,
            state = _props.state,
            onChange = _props.onChange,
            style = _props.style,
            addonBefore = _props.addonBefore,
            addonAfter = _props.addonAfter,
            onPressEnter = _props.onPressEnter,
            hasFeedback = _props.hasFeedback,
            others = _objectWithoutProperties(_props, ['multiple', 'size', 'className', 'children', 'htmlType', 'maxLen', 'maxLength', 'state', 'onChange', 'style', 'addonBefore', 'addonAfter', 'onPressEnter', 'hasFeedback']);

        /*eslint-enable */


        var prefix = this.context.prefix || this.props.prefix;

        var type = multiple ? 'multiple' : 'single',
            TagName = multiple ? 'textarea' : 'input',
            props = _extends({}, others);

        props.onChange = this.onChange.bind(this);
        props.value = this.state.value;
        // Input elements must be either controlled or uncontrolled,
        // specify either the value prop, or the defaultValue prop, but not both.
        delete props.defaultValue;

        !multiple && delete props.rows;

        var classInput = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'input', true), _defineProperty(_classNames, prefix + 'input-' + type, true), _defineProperty(_classNames, prefix + 'input-' + size, !!size && type === 'single'), _defineProperty(_classNames, 'disabled', !!this.props.disabled), _defineProperty(_classNames, 'clear', this.props.hasClear), _defineProperty(_classNames, 'error', this.props.state === 'error'), _defineProperty(_classNames, 'focus', this.state.focus), _defineProperty(_classNames, 'hidden', this.props.htmlType === 'hidden'), _defineProperty(_classNames, 'noborder', this.props.htmlType === 'file'), _defineProperty(_classNames, nclassName, !!nclassName), _classNames));

        var inputStyle = {
            textIndent: this.props.textIndent
        };

        if (this.props.cutString) {
            props.maxLength = maxLen ? maxLen : maxLength;
        }

        return _react2['default'].createElement(
            'span',
            { className: classInput, style: nstyle },
            _react2['default'].createElement(TagName, _extends({}, (0, _nextUtil.pickAttrs)(props), { style: inputStyle, type: htmlType, height: '100%',
                onKeyDown: this.handleKeyDown.bind(this), onFocus: this.onFocus.bind(this),
                onBlur: this.onBlur.bind(this), key: 'input', ref: 'input' })),
            this.renderControl()
        );
    };

    // `Enter` was considered to be two chars in chrome , but one char in ie.
    // so we make all `Enter` to be two chars


    Input.prototype.getValueLength = function getValueLength(value) {
        var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var nv = '' + value;
        var strLen = this.props.getValueLength(nv);
        if (typeof strLen !== 'number') {
            strLen = nv.length;
        }
        if (!multiple) {
            return strLen;
        } else {
            if (this.isIe()) {
                return strLen + nv.split('\n').length - 1;
            }
            return strLen;
        }
    };

    Input.prototype.renderControl = function renderControl() {
        var _classNames2;

        var maxLength = parseInt(this.props.maxLength || this.props.maxLen),
            hasLimitHint = this.props.hasLimitHint || this.props.maxLen;

        this.props.maxLen && _nextUtil.log.deprecated('maxLen', 'maxLength', 'Input');

        var prefix = this.context.prefix || this.props.prefix;

        var _props2 = this.props,
            hasClear = _props2.hasClear,
            readOnly = _props2.readOnly,
            state = _props2.state;

        var len = maxLength > 0 && this.state.value ? this.getValueLength(this.state.value, this.props.multiple) : 0;

        var classesLenWrap = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'input-len', true), _defineProperty(_classNames2, 'error', len > maxLength), _classNames2));

        var icon = null;
        //多行模式下面没有 success/loading 状态
        if (state && !this.props.multiple) {
            if (state === 'success') {
                icon = _react2['default'].createElement(_nextIcon2['default'], { type: 'success' });
            } else if (state === 'loading') {
                icon = _react2['default'].createElement(_nextIcon2['default'], { type: 'loading' });
            }
        }

        var clearWrap = hasClear && !readOnly && '' + this.state.value ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', onClick: this.onClear.bind(this), onMouseDown: preventDefault }) : null;
        var lenWrap = maxLength && hasLimitHint ? _react2['default'].createElement(
            'span',
            { className: classesLenWrap },
            len,
            '/',
            maxLength
        ) : null;

        return clearWrap || lenWrap || icon ? _react2['default'].createElement(
            'span',
            { className: prefix + 'input-control' },
            clearWrap,
            lenWrap,
            icon
        ) : null;
    };

    Input.prototype.getInputNode = function getInputNode() {
        return this.refs.input;
    };

    Input.prototype.render = function render() {
        var _classNames3, _classNames4, _classNames5;

        var props = this.props;
        var prefix = this.context.prefix || this.props.prefix;

        var wrapperClassName = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, prefix + 'input-group', true), _defineProperty(_classNames3, '' + props.size, !!props.size), _defineProperty(_classNames3, 'disabled', this.props.disabled), _defineProperty(_classNames3, this.props.className, !!this.props.className), _classNames3));

        var addonClassName = prefix + 'input-addon';
        var classesAddonBefore = (0, _classnames2['default'])((_classNames4 = {}, _defineProperty(_classNames4, '' + addonClassName, true), _defineProperty(_classNames4, addonClassName + '-before', true), _classNames4));
        var classesAddonAfter = (0, _classnames2['default'])((_classNames5 = {}, _defineProperty(_classNames5, '' + addonClassName, true), _defineProperty(_classNames5, addonClassName + '-after', true), _classNames5));
        var addonBefore = props.addonBefore ? _react2['default'].createElement(
            'span',
            { className: classesAddonBefore },
            props.addonBefore
        ) : null;

        var addonAfter = props.addonAfter ? _react2['default'].createElement(
            'span',
            { className: classesAddonAfter },
            props.addonAfter
        ) : null;

        // style or className is added on Addon instead of input
        if (addonBefore || addonAfter) {
            return _react2['default'].createElement(
                'span',
                { className: wrapperClassName, style: this.props.style },
                addonBefore,
                this.renderInput(),
                addonAfter
            );
        } else {
            return this.renderInput(this.props.style, this.props.className);
        }
    };

    return Input;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 初始化值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 尺寸
     * @enumdesc 小, 中, 大
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 状态 设置文本域禁用状态
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否为多行，不选则为单行
     */
    multiple: _propTypes2['default'].bool,
    maxLen: _propTypes2['default'].number, //TODO: will removed in 1.0 version
    /**
     * 最大长度
     */
    maxLength: _propTypes2['default'].number,
    /**
     * 是否展现最大长度样式
     */
    hasLimitHint: _propTypes2['default'].bool,
    /**
     * 是否允许切割字符串
     */
    cutString: _propTypes2['default'].bool,
    /**
     * 是否出现clear按钮
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 状态（multiple模式不支持 loading/success 状态)
     * @enumdesc , 错误, 校验中, 成功
     */
    state: _propTypes2['default'].oneOf(['', 'error', 'loading', 'success']),
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 原生type
     */
    htmlType: _propTypes2['default'].string,
    /**
     * 只读
     */
    readOnly: _propTypes2['default'].bool,
    /**
     * onChange返回会自动去除头尾空字符
     */
    trim: _propTypes2['default'].bool,
    /**
     * 文本域前附加内容
     */
    addonBefore: _propTypes2['default'].node,
    /**
     * 文本域后附加内容
     */
    addonAfter: _propTypes2['default'].node,
    /**
     * 输入提示
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 按下回车的回调
     */
    onPressEnter: _propTypes2['default'].func,
    onFocus: _propTypes2['default'].func,
    /**
     * 失去焦点时候触发的回调
     */
    onBlur: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    /**
     * 发生改变的时候触发的回调
     * @param {String} value 数据
     * @param {Event} e DOM事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 自定义字符串计算长度方式
     * @param {String} value 数据
     * @returns {Number} 自定义长度
     */
    getValueLength: _propTypes2['default'].func,
    /**
     * multiple多行文本框高度 <br />(不要直接用height设置多行文本框的高度, ie9 10会有兼容性问题)
     */
    rows: _propTypes2['default'].number,
    /**
     * 文字缩进
     */
    textIndent: _propTypes2['default'].number,
    /**
     * 自定义class
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    htmlType: 'text',
    disabled: false,
    prefix: 'next-',
    multiple: false,
    hasFeedback: false,
    maxLen: null,
    maxLength: null,
    hasLimitHint: false,
    cutString: true,
    hasClear: false,
    readOnly: false,
    trim: false,
    state: '',
    size: 'medium',
    onPressEnter: function onPressEnter() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    onKeyDown: function onKeyDown() {},
    onChange: function onChange() {},
    getValueLength: function getValueLength() {},

    rows: 4
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Input.displayName = 'Input';
exports['default'] = Input;
module.exports = exports['default'];

/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _container = __webpack_require__(686);

var _container2 = _interopRequireDefault(_container);

var _subMenu = __webpack_require__(800);

var _subMenu2 = _interopRequireDefault(_subMenu);

var _menuItem = __webpack_require__(692);

var _menuItem2 = _interopRequireDefault(_menuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Component = _container2['default'];
var Children = _react2['default'].Children,
    noop = function noop() {},
    makeChain = _nextUtil.func.makeChain,
    getOffset = _nextDom.style.getOffset;

var KEY_CODE_MAPS = {};

for (var key in _nextUtil.keyCode) {
    var lowerCaseKey = key.toLowerCase().replace('_arrow', '');
    KEY_CODE_MAPS[_nextUtil.keyCode[key]] = lowerCaseKey.charAt(0).toUpperCase() + lowerCaseKey.substr(1);
}
/** Menu */
var Menu = (_temp = _class = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props, context) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.children = [];
        _this.state = {
            selectedKeys: _this.normalizeKeys(props.selectedKeys || props.defaultSelectedKeys),
            openKeys: _this.normalizeKeys(props.openKeys || props.defaultOpenKeys),
            focusedKey: props.focusedKey
        };
        ['onMouseLeave', 'onItemClick', 'onSelect', 'onFocus', 'onOpen', 'onKeyNavNodeKeyDown', 'onKeyNavNodeFocus'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        return _this;
    }

    Menu.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('selectedKeys' in nextProps) {
            this.setState({
                selectedKeys: this.normalizeKeys(nextProps.selectedKeys)
            });
        }
        if ('openKeys' in nextProps) {
            this.setState({
                openKeys: this.normalizeKeys(nextProps.openKeys)
            });
        }
        if ('focusedKey' in nextProps) {
            this.setState({
                focusedKey: nextProps.focusedKey
            });
        }
    };

    Menu.prototype.normalizeKeys = function normalizeKeys(keys) {
        if (!Array.isArray(keys)) {
            if (keys != null) {
                keys = [keys];
            } else {
                keys = [];
            }
        } else {
            keys = [].concat(_toConsumableArray(keys));
        }
        return keys;
    };

    Menu.prototype.render = function render() {
        var _classnames,
            _this2 = this;

        var _props = this.props,
            className = _props.className,
            hasIcon = _props.hasIcon,
            children = _props.children,
            header = _props.header,
            footer = _props.footer,
            indentSize = _props.indentSize,
            multipleCol = _props.multipleCol,
            direction = _props.direction,
            others = _objectWithoutProperties(_props, ['className', 'hasIcon', 'children', 'header', 'footer', 'indentSize', 'multipleCol', 'direction']),
            _state = this.state,
            selectedKeys = _state.selectedKeys,
            openKeys = _state.openKeys,
            focusedKey = _state.focusedKey,
            prefix = this.getPrefix(),
            cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'menu', true), _defineProperty(_classnames, 'multiple-col', multipleCol), _defineProperty(_classnames, prefix + 'menu-has-icon', hasIcon), _defineProperty(_classnames, direction, direction), _defineProperty(_classnames, className, className), _classnames)),
            hasSubMenu = (Children.toArray(children).some(function (child) {
            var type = child.type;
            return type._subMenu;
        }) || this.props.hasSubMenu) && direction !== 'hoz';

        this.childrenMeta = [];

        var contentChildren = Children.map(children, function (child, index) {
            if (child) {
                var _key = child.props.index || child.key;
                if (typeof _key === 'undefined' || _key === null) {
                    _key = index.toString();
                }
                return _react2['default'].cloneElement(child, {
                    ref: _key,
                    index: _key,
                    parent: _this2,
                    indentSize: hasSubMenu && indentSize ? indentSize : null,
                    hasIcon: hasIcon,
                    selectedKeys: selectedKeys,
                    focusedKey: focusedKey,
                    openKeys: openKeys,
                    direction: direction
                });
            }
        });
        others = (0, _nextUtil.pickAttrs)(others);
        var root = _react2['default'].createElement(
            'div',
            _extends({ tabIndex: 0
            }, others, {
                className: cls,
                onMouseLeave: this.onMouseLeave }),
            header ? _react2['default'].createElement(
                'div',
                { className: prefix + 'menu-header' },
                header
            ) : null,
            _react2['default'].createElement(
                'ul',
                { className: prefix + 'menu-content' },
                contentChildren
            ),
            footer ? _react2['default'].createElement(
                'div',
                { className: prefix + 'menu-footer' },
                footer
            ) : null
        );

        return this.getKeyNavNode(root);
    };

    Menu.prototype.onMouseLeave = function onMouseLeave(e) {
        this.setState({
            focusedKey: null
        });
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    };

    Menu.prototype.onItemClick = function onItemClick(e, index, type, menuInc) {
        var selectedKeys = this.state.selectedKeys,
            selectMode = this.props.selectMode,
            keyIndex = void 0,
            stateSelectKeys = void 0;


        selectedKeys = [].concat(_toConsumableArray(selectedKeys));

        if (menuInc.props.__radioItem) {
            type = 'single';
        }

        if (menuInc.props.__checkboxItem) {
            type = 'multiple';
        }

        //使用Menu的selectMode
        if (typeof selectMode !== 'undefined') {
            type = selectMode;
        }
        if (type === 'multiple') {
            keyIndex = selectedKeys.indexOf(index);
            if (keyIndex === -1) {
                selectedKeys.push(index);
            } else {
                selectedKeys.splice(keyIndex, 1);
                this.props.onDeselect(index);
            }
            stateSelectKeys = selectedKeys;
        } else {
            selectedKeys = index;
            stateSelectKeys = [selectedKeys];
        }
        if (!('focusedKey' in this.props)) {
            this.setState({
                focusedKey: index
            });
        }
        this.props.onFocus(e, index);
        if (type !== 'click') {
            if (this.props.shallowSelect && menuInc.context.parentIndex) {
                stateSelectKeys = [menuInc.context.parentIndex[0]];
            }
            if (!('selectedKeys' in this.props)) {
                this.setState({
                    selectedKeys: stateSelectKeys
                });
            }
            this.props.onSelect(stateSelectKeys, menuInc, {
                keyPath: menuInc.context.parentIndex,
                label: menuInc.context.parentLabel
            });
        } else {
            this.props.onClick(selectedKeys, menuInc, {
                keyPath: menuInc.context.parentIndex,
                label: menuInc.context.parentLabel
            }, e);
        }
    };

    Menu.prototype.onSelect = function onSelect(selectedKeys) {
        var _props2;

        this.setState({
            selectedKeys: selectedKeys
        });

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        (_props2 = this.props).onSelect.apply(_props2, [selectedKeys].concat(args));
    };

    Menu.prototype.onFocus = function onFocus(index) {
        this.setState({
            focusedKey: index
        });
        this.props.onFocus(index);
    };

    Menu.prototype.onOpen = function onOpen(openKeys, visible) {
        var _this3 = this;

        var stateOpenKeys = this.state.openKeys,
            openMode = this.props.openMode;


        stateOpenKeys = [].concat(_toConsumableArray(stateOpenKeys));

        if (Array.isArray(openKeys)) {
            stateOpenKeys = [].concat(_toConsumableArray(openKeys));
        } else {
            if (openMode === 'single') {
                stateOpenKeys = stateOpenKeys.filter(function (key) {
                    // 首先找到跟当前key匹配到的subMenu
                    // 在寻找subMenu下面的子节点的key
                    // 如果当前key是子节点的父节点，则不需要隐藏
                    var subMenu = _this3.getChildrenIncByType(_subMenu2['default']).filter(function (child) {
                        return (child.props.index || child.key) == key;
                    })[0];
                    if (subMenu) {
                        var childKeys = subMenu.getChildrenIncByType(_subMenu2['default']).map(function (child) {
                            return child.props.index || child.key;
                        });
                        return childKeys.indexOf(openKeys) > -1;
                    } else {
                        return false;
                    }
                });
            }

            var index = stateOpenKeys.indexOf(openKeys);
            if (index === -1 && visible) {
                stateOpenKeys.push(openKeys);
            } else if (index !== -1 && !visible) {
                stateOpenKeys.splice(index, 1);
            }
            if (!('openKeys' in this.props)) {
                this.setState({
                    openKeys: stateOpenKeys
                });
            }
            this.props.onOpen(stateOpenKeys);
        }
    };

    Menu.prototype.componentDidMount = function componentDidMount() {
        _nextDom.events.on(window, 'blur', this.onKeyNavNodeBlur);
        this.focusChildAddTimeout();
    };

    Menu.prototype.focusChildAddTimeout = function focusChildAddTimeout() {
        var _this4 = this;

        // 让focusKey对应的focusNode获取焦点
        // 在Overlay中由于节点可能设置了autoFocus，所以要设置比Overlay的autoFocus的功能延时
        // 要长
        // 在didMount的时候获取焦点的功能应该放置到使用者去主动调用
        // 1.0的时候移除该功能，放置到Select或者Dropdown中手动调用
        setTimeout(function () {
            _this4._focusChild();
        }, 200);
    };

    Menu.prototype._focusChild = function _focusChild() {
        var child = this.getCurrentChild();
        if (child) {
            if (this.props.autoFocus) {
                var node = child.node;
                node && node.focus();
            } else {
                // Scroll dom to viewport.
                this.scrollTo(child.node);
            }
        }
    };

    Menu.prototype.componentWillUnmount = function componentWillUnmount() {
        _nextDom.events.off(window, 'blur', this.onKeyNavNodeBlur);
        if (this._keyNodeBlurTimeout) {
            clearTimeout(this._keyNodeBlurTimeout);
        }
    };

    Menu.prototype.getKeyNavNode = function getKeyNavNode(node) {
        return _react2['default'].cloneElement(node, {
            onKeyDown: makeChain(this.onKeyNavNodeKeyDown, node.props.onKeyDown),
            onFocus: makeChain(this.onKeyNavNodeFocus, node.props.onFocus)
        });
    };

    Menu.prototype.onKeyNavNodeKeyDown = function onKeyNavNodeKeyDown(e) {
        var key = KEY_CODE_MAPS[e.keyCode];
        var method = this['_on' + key + 'Key'];
        if (method) {
            method.call(this, e);
        } else {
            this._onKeyBoardSearch(e);
        }
        e.stopPropagation();
    };

    Menu.prototype.addChildMeta = function addChildMeta(meta) {
        if (this.childrenMeta.indexOf(meta) === -1) {
            this.childrenMeta.push(meta);
        }
    };

    Menu.prototype.removeChildMeta = function removeChildMeta(meta) {
        var index = this.childrenMeta.indexOf(meta);
        if (index > -1) {
            this.childrenMeta.splice(index, 1);
        }
    };

    Menu.prototype._onKeyBoardSearch = function _onKeyBoardSearch(e) {
        var key = String.fromCharCode(e.keyCode).toLowerCase(),
            children = this.getChildrenMeta(),
            currentChild = void 0;

        children.forEach(function (child) {
            if (typeof child.children === 'string' && child.children.charAt(0).toLowerCase() === key) {
                if (!currentChild) {
                    currentChild = child;
                }
            }
        });

        this.focusChild(currentChild);
    };

    Menu.prototype.onKeyNavNodeFocus = function onKeyNavNodeFocus(e) {
        if (this.state.focusedKey == null && this.props.autoFocusFirstItem) {
            this._onDownKey(e);
        }
    };

    Menu.prototype._onUpKey = function _onUpKey(e) {
        var child = void 0;
        if (this.state.focusedKey == null) {
            child = this._getLastChild();
        } else {
            child = this._getPrevChild();
        }
        this.focusChild(child);
        e.preventDefault();
    };

    Menu.prototype._onEnterKey = function _onEnterKey(e) {
        if (this.props.onKeyNavNodeEnter) {
            this.props.onKeyNavNodeEnter(e, this.getCurrentChild());
        }
    };

    Menu.prototype._onDownKey = function _onDownKey(e) {
        var child = void 0;
        if (this.state.focusedKey == null) {
            child = this._getFirstChild();
        } else {
            child = this._getNextChild();
        }
        this.focusChild(child);
        e.preventDefault();
    };

    Menu.prototype._onHomeKey = function _onHomeKey() {
        var child = this._getFirstChild();
        this.focusChild(child);
    };

    Menu.prototype._onEndKey = function _onEndKey() {
        var child = this._getLastChild();
        this.focusChild(child);
    };

    Menu.prototype.focusChild = function focusChild(child) {
        var _this5 = this;

        if (child) {
            this.setState({
                focusedKey: child.index
            }, function () {
                _this5._focusChild();
            });
        }
    };

    Menu.prototype.unFocusChild = function unFocusChild(child) {
        this.setState({
            focusedKey: null
        });
        if (child) {
            var node = child.node;
            node && node.blur();
        }
    };

    Menu.prototype.scrollTo = function scrollTo(node) {
        if (node) {
            var rootNode = _reactDom2['default'].findDOMNode(this),
                rootNodeOffsetTop = getOffset(rootNode).top,
                scrollTop = rootNode.scrollTop,
                nodeOffsetTop = getOffset(node).top,
                rootNodeHeight = rootNode.clientHeight;

            if (nodeOffsetTop + node.clientHeight > rootNodeHeight + rootNodeOffsetTop) {
                rootNode.scrollTop = scrollTop + (nodeOffsetTop + node.clientHeight) - (rootNodeHeight + rootNodeOffsetTop);
            } else if (nodeOffsetTop < rootNodeOffsetTop) {
                rootNode.scrollTop = node.offsetTop;
            }
        }
    };

    Menu.prototype.getChildrenMeta = function getChildrenMeta() {
        var result = [],
            children = this.childrenMeta;

        children.forEach(function (child) {
            if (!child.disabled) {
                result.push(child);
            }
        });
        return result;
    };

    Menu.prototype.getCurrentChild = function getCurrentChild() {
        var _this6 = this;

        var children = this.getChildrenMeta(),
            currentChild = void 0;

        children.forEach(function (child) {
            if (child.index === _this6.state.focusedKey) {
                currentChild = child;
            }
        });
        return currentChild;
    };

    Menu.prototype._getFirstChild = function _getFirstChild() {
        var children = this.getChildrenMeta();
        return children[0];
    };

    /**
     * 获取最后一个直系子级
     * @returns {*}
     * @private
     */


    Menu.prototype._getLastChild = function _getLastChild() {
        var children = this.getChildrenMeta();
        return children[children.length - 1];
    };

    Menu.prototype._getChildByStep = function _getChildByStep(step) {
        if (this.state.focusedKey != null) {
            var children = this.getChildrenMeta(),
                _key3 = this.state.focusedKey,
                index = void 0;

            children.forEach(function (child, i) {
                if (child.index === _key3) {
                    index = i;
                }
            });
            if (index == null) {
                return children[0];
            }
            if (step == 1 && index + 1 === children.length) {
                index = -1;
            }
            if (step == -1 && index - 1 < 0) {
                index = children.length;
            }
            return children[index + step];
        }
    };
    /**
     * 获取当前子级的下一个子级
     * @returns {*}
     * @private
     */


    Menu.prototype._getNextChild = function _getNextChild() {
        return this._getChildByStep(1);
    };

    /**
     * 获取当前子级的上一个子级
     * @returns {*}
     * @private
     */


    Menu.prototype._getPrevChild = function _getPrevChild() {
        return this._getChildByStep(-1);
    };

    return Menu;
}(Component), _class.Item = _menuItem2['default'], _class.SubMenu = _subMenu2['default'], _class._menu = true, _class.propTypes = {
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
     * 点击菜单项触发的事件
     * @param {Array} selectedKeys 点击的菜单项的key
     * @param {MenuItem} menuItem 当前点击的菜单项的实例
     * @param {Object} meta 选中菜单项的上下级关系
     */
    onClick: _propTypes2['default'].func,
    /**
     * 当前选中的菜单项, 设置此属性，组件的选中变为受控状态
     */
    selectedKeys: _propTypes2['default'].array,
    /**
     * 初始化选中的菜单项，只在组件初次render的时候生效
     */
    defaultSelectedKeys: _propTypes2['default'].array,
    /**
     * 菜单选择的模式，支持单选和多选
     */
    selectMode: _propTypes2['default'].oneOf(['single', 'multiple']),
    /**
     * 选中/取消选中了任意MenuItem
     * @param {Array} selectedKeys 选中的菜单的key
     * @param {MenuItem} menuItem 当前点击的菜单项的实例
     * @param {Object} meta 选中菜单项的上下级关系
     */
    onSelect: _propTypes2['default'].func,
    /**
     * 取消选中的菜单项
     * @param {String} selectedKey 取消选中的菜单项的key
     */
    onDeselect: _propTypes2['default'].func,
    /**
     * 如果此属性为true，表明只会选中第一级的菜单
     */
    shallowSelect: _propTypes2['default'].bool,
    /**
     * 当前打开的菜单项，设置此属性，组件的打开变为受控状态
     */
    openKeys: _propTypes2['default'].array,
    /**
     * 初始化打开的菜单项，只在组件初次render的时候生效
     */
    defaultOpenKeys: _propTypes2['default'].array,
    /**
     * 子菜单同时打开模式，是多个还是一个
     */
    openMode: _propTypes2['default'].oneOf(['single', 'multiple']),
    /**
     * 打开子菜单的时候触发的事件
     * @param {Array} openKeys 打开的子菜单的key
     */
    onOpen: _propTypes2['default'].func,
    /**
     * 级联菜单下面缩进的尺寸
     */
    indentSize: _propTypes2['default'].number,
    /**
     * 配置菜单的头部
     */
    header: _propTypes2['default'].any,
    /**
     * 配置菜单的底部
     */
    footer: _propTypes2['default'].any,
    /**
     * 是否启用多列模式
     */
    multipleCol: _propTypes2['default'].bool,
    /**
     * 是否启用设置焦点功能
     */
    autoFocus: _propTypes2['default'].bool,
    /**
     * 菜单的方向
     */
    direction: _propTypes2['default'].oneOf(['ver', 'hoz']),
    hasIcon: _propTypes2['default'].bool,
    autoFocusFirstItem: _propTypes2['default'].bool,
    focusedKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])
}, _class.defaultProps = {
    prefix: 'next-',
    onSelect: noop,
    onDeselect: noop,
    onOpen: noop,
    onClick: noop,
    onFocus: noop,
    hasIcon: false,
    defaultSelectedKeys: [],
    defaultOpenKeys: [],
    indentSize: 20,
    openMode: 'multiple',
    multipleCol: false,
    autoFocusFirstItem: false,
    direction: 'ver',
    autoFocus: true
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Menu.displayName = 'Menu';
exports['default'] = Menu;
module.exports = exports['default'];

/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = __webpack_require__(878);

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(175);

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = __webpack_require__(879);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

         false ? undefined : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes =  false ? undefined : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 878:
/***/ (function(module, exports) {


module.exports = function chain(){
  var len = arguments.length
  var args = [];

  for (var i = 0; i < len; i++)
    args[i] = arguments[i]

  args = args.filter(function(fn){ return fn != null })

  if (args.length === 0) return undefined
  if (args.length === 1) return args[0]

  return args.reduce(function(current, next){
    return function chainedFunction() {
      current.apply(this, arguments);
      next.apply(this, arguments);
    };
  })
}


/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(1);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var enter = ['pulse', 'shake', 'press', 'buttonClick', 'expandInDown', 'bounceIn', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp', 'zoomIn', 'zoomInQuick', 'zoomInPulse', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp'];
var leave = ['pulse', 'shake', 'press', 'buttonClick', 'expandOutUp', 'bounceOut', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp', 'zoomOut', 'zoomOutQuick', 'zoomOutPulse', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp'];

exports['default'] = {
    enter: enter,
    leave: leave
};
module.exports = exports['default'];

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2; /* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _nextOverlay = __webpack_require__(121);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _menuItem = __webpack_require__(692);

var _menuItem2 = _interopRequireDefault(_menuItem);

var _container = __webpack_require__(686);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var makeChain = _nextUtil.func.makeChain;
var Component = _container2['default'];

/**
 * Menu.PopupItem
 * @order 5
 **/
var PopupMenuItem = (_temp2 = _class = function (_Component) {
    _inherits(PopupMenuItem, _Component);

    function PopupMenuItem() {
        var _temp, _this, _ret;

        _classCallCheck(this, PopupMenuItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onVisibleChange = function (visible, type) {
            var childrenIndexes = _this.getChildrenByType(PopupMenuItem).map(function (child) {
                return child.props.index || child.key;
            }),
                parentIndexes = _this.getParentByType(PopupMenuItem).map(function (parent) {
                return parent.props.index || parent.key;
            }),
                openKeys = _this.getRoot().state.openKeys,
                childVisible = childrenIndexes.some(function (index) {
                return openKeys.indexOf(index) > -1;
            });

            var indexes = [_this.props.index];
            // 如果是隐藏该弹出菜单
            // 且这个隐藏是因为鼠标移出了其弹出内容区域或者点击了document
            // 需要将其父菜单一并隐藏
            if (!visible && !_this._openByKeyBoard && ['fromContent', 'docClick'].indexOf(type) > -1) {
                indexes = indexes.concat(parentIndexes);
            }
            if (!(!visible && childVisible)) {
                indexes.forEach(function (index) {
                    _this.getRoot().onOpen(index, visible);
                });
                _this._openByKeyBoard = false;
            }
        }, _this.onKeyDown = function (e) {
            if (e.keyCode === _nextUtil.keyCode.RIGHT_ARROW) {
                _this.getRoot().onOpen(_this.props.index, true);
                _this._openByKeyBoard = true;
            }
        }, _this.syncWidth = function () {
            var autoWidth = _this.props.autoWidth;


            if (autoWidth) {
                var menuItemNode = _this.getMenuItemNode();
                var contentNode = _this.getContentNode();
                var menuItemWidth = menuItemNode.clientWidth;
                var contentNodeWidth = contentNode.clientWidth;
                if (menuItemWidth > contentNodeWidth) {
                    _nextDom.style.set(contentNode, 'width', menuItemWidth + 'px');
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    PopupMenuItem.prototype.getChildContext = function getChildContext() {
        var parentIndex = normalizeInfo(this.context, 'parentIndex', this.props.index),
            parentLabel = normalizeInfo(this.context, 'parentLabel', this.props.label || this.props.children);

        return {
            parentIndex: parentIndex,
            parentLabel: parentLabel
        };
    };

    PopupMenuItem.prototype.render = function render() {
        var _classnames;

        var _props = this.props,
            className = _props.className,
            label = _props.label,
            animation = _props.animation,
            children = _props.children,
            openKeys = _props.openKeys,
            selectedKeys = _props.selectedKeys,
            index = _props.index,
            focusedKey = _props.focusedKey,
            direction = _props.direction,
            hasSelectedIcon = _props.hasSelectedIcon,
            others = _objectWithoutProperties(_props, ['className', 'label', 'animation', 'children', 'openKeys', 'selectedKeys', 'index', 'focusedKey', 'direction', 'hasSelectedIcon']),
            prefix = this.getPrefix(),
            visible = 'visible' in this.props ? this.props.visible : openKeys.indexOf(index) > -1,
            cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'menu-popup-item', true), _defineProperty(_classnames, 'opened', visible), _defineProperty(_classnames, className, className), _classnames)),
            child = _react2['default'].Children.only(children),
            hasPopup = child ? true : null,
            item = _react2['default'].createElement(
            _menuItem2['default'],
            { openKeys: openKeys,
                selectedKeys: selectedKeys,
                focusedKey: focusedKey,
                index: index,
                hasSelectedIcon: hasSelectedIcon,
                className: cls, 'aria-haspopup': hasPopup, parent: this,
                onKeyDown: this.onKeyDown, onBlur: this.onBlur },
            label,
            direction === 'hoz' ? _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-down', size: 'xs' }) : _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-right', size: 'xs' })
        ),
            cloneChild = _react2['default'].cloneElement(child, {
            onKeyDown: makeChain(this._onChildKeyDown.bind(this), child.props.onKeyDown),
            parent: this,
            openKeys: openKeys,
            selectedKeys: selectedKeys
        });

        var alignAndOffset = this.getAlignAndOffset();

        return _react2['default'].createElement(
            _nextOverlay.Popup,
            _extends({}, others, alignAndOffset, {
                trigger: item,
                visible: visible,
                animation: animation,
                onOpen: this.syncWidth,
                autoFocus: false,
                ref: 'popup',
                onVisibleChange: this.onVisibleChange }),
            cloneChild
        );
    };

    PopupMenuItem.prototype._onChildKeyDown = function _onChildKeyDown(e) {
        if (e.keyCode === _nextUtil.keyCode.LEFT_ARROW) {
            this.getRoot().onOpen(this.props.index, false);
        }
    };

    PopupMenuItem.prototype.getAlignAndOffset = function getAlignAndOffset() {
        var _props2 = this.props,
            align = _props2.align,
            offset = _props2.offset,
            direction = _props2.direction,
            result = {
            hoz: {
                align: 'tl bl',
                offset: [0, 0]
            },
            ver: {
                align: 'tl tr',
                offset: [2, 0]
            }
        };

        if (typeof align !== 'undefined') {
            result[direction].align = align;
        }
        if (typeof offset !== 'undefined') {
            result[direction].offset = offset;
        }
        return result[direction];
    };

    PopupMenuItem.prototype.getContentNode = function getContentNode() {
        return this.refs.popup.overlay.getContentNode();
    };

    PopupMenuItem.prototype.getMenuItemNode = function getMenuItemNode() {
        return (0, _reactDom.findDOMNode)(this.refs.popup.refs.trigger);
    };

    return PopupMenuItem;
}(Component), _class._menuItem = true, _class._popupMenuItem = true, _class.propTypes = {
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
     * 禁用当前菜单项, 被禁用不会触发事件
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 菜单项的标签
     */
    label: _propTypes2['default'].any,
    /**
     * 是否自动让弹出层的宽度和菜单项保持一致，逻辑是如果弹出层的宽度比菜单项小的话和菜单项保持一致，如果宽度大于菜单项则不做处理
     */
    autoWidth: _propTypes2['default'].bool
}, _class.defaultProps = {
    disabled: false,
    label: 'popup-item',
    autoWidth: false,
    prefix: 'next-'
}, _class.contextTypes = {
    parentIndex: _propTypes2['default'].array,
    parentLabel: _propTypes2['default'].array,
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    parentIndex: _propTypes2['default'].array,
    parentLabel: _propTypes2['default'].array
}, _temp2);
PopupMenuItem.displayName = 'PopupMenuItem';
exports['default'] = PopupMenuItem;


function normalizeInfo(context, name, value) {
    var meta = void 0;
    if (context[name]) {
        meta = [].concat(_toConsumableArray(context[name]));
        meta.push(value);
    } else {
        meta = [value];
    }
    return meta;
}
module.exports = exports['default'];

/***/ }),

/***/ 882:
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Menu.Divider
 * @order 4
 **/
var MenuDivider = (_temp = _class = function (_React$Component) {
    _inherits(MenuDivider, _React$Component);

    function MenuDivider() {
        _classCallCheck(this, MenuDivider);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    MenuDivider.prototype.render = function render() {
        var _cx;

        var _props = this.props,
            prefix = _props.prefix,
            className = _props.className,
            others = _objectWithoutProperties(_props, ['prefix', 'className']);

        var newPrefix = this.context.prefix || prefix;
        var newClassName = (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, newPrefix + 'menu-divider', true), _defineProperty(_cx, className, !!className), _cx));

        return _react2['default'].createElement('li', _extends({ className: newClassName }, others));
    };

    return MenuDivider;
}(_react2['default'].Component), _class._menuItem = true, _class.propTypes = {
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
    style: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
MenuDivider.displayName = 'MenuDivider';
exports['default'] = MenuDivider;
module.exports = exports['default'];

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextCheckbox = __webpack_require__(716);

var _nextCheckbox2 = _interopRequireDefault(_nextCheckbox);

var _menuItem = __webpack_require__(692);

var _menuItem2 = _interopRequireDefault(_menuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * Menu.CheckboxItem
 * @order 7
 **/
var CheckedMenuItem = (_temp = _class = function (_React$Component) {
  _inherits(CheckedMenuItem, _React$Component);

  function CheckedMenuItem(props) {
    _classCallCheck(this, CheckedMenuItem);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  CheckedMenuItem.prototype.render = function render() {
    var _props = this.props,
        disabled = _props.disabled,
        checked = _props.checked,
        index = _props.index,
        selectedKeys = _props.selectedKeys,
        onChange = _props.onChange;

    if (typeof checked === 'undefined') {
      checked = selectedKeys.indexOf(index) > -1;
    }
    this.checked = checked;
    return _react2['default'].createElement(
      _menuItem2['default'],
      _extends({}, this.props, { hasSelectedIcon: false, onClick: this.onClick, role: 'menuitemcheckbox' }),
      _react2['default'].createElement(_nextCheckbox2['default'], { checked: checked, onChange: onChange, disabled: disabled, tabIndex: '-1' }),
      ' ',
      this.props.children
    );
  };

  CheckedMenuItem.prototype.onClick = function onClick(e) {
    if (!this.props.disabled) {
      this.props.onChange(!this.checked, e);
    }
  };

  return CheckedMenuItem;
}(_react2['default'].Component), _class._menuItem = true, _class.propTypes = {
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
   * 显示在菜单右侧的帮助文本，通常用于一些附加信息
   */
  helper: _propTypes2['default'].string,
  /**
   * 禁用当前菜单项, 被禁用不会触发事件, 也无法选中Checkbox/Radio
   */
  disabled: _propTypes2['default'].bool,
  focused: _propTypes2['default'].bool,
  /**
   * 点击了菜单项触发的事件
   * @param {String} key 当前菜单项的key值
   * @param {Event} e DOM事件
   */
  onClick: _propTypes2['default'].func,
  onKeyDown: _propTypes2['default'].func,
  parent: _propTypes2['default'].any,
  /**
   * 是否显示缩进
   */
  needIndent: _propTypes2['default'].bool,
  /**
   * 当前的菜单项是否被选中, 优先级比Menu传入的selectedKeys要高
   */
  checked: _propTypes2['default'].bool,
  /**
   * 选择被改变的时候触发的事件
   * @param {Boolean} checked 是否选中
   */
  onChange: _propTypes2['default'].func
}, _class.defaultProps = {
  helper: null,
  disabled: false,
  prefix: 'next-',
  hasSelectedIcon: true,
  needIndent: true,
  onClick: noop,
  onKeyDown: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onChange: noop,
  __checkboxItem: true
}, _temp);
CheckedMenuItem.displayName = 'CheckedMenuItem';
exports['default'] = CheckedMenuItem;
module.exports = exports['default'];

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _checkbox = __webpack_require__(801);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Checkbox.Group */
var CheckboxGroup = (_temp = _class = function (_Component) {
    _inherits(CheckboxGroup, _Component);

    function CheckboxGroup(props) {
        _classCallCheck(this, CheckboxGroup);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var value = [];
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        if (!Array.isArray(value)) {
            if (value === null || value === undefined) {
                value = [];
            } else {
                value = [value];
            }
        }
        _this.state = {
            value: [].concat(_toConsumableArray(value)),
            disabled: props.disabled
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    CheckboxGroup.prototype.getChildContext = function getChildContext() {
        return {
            __group__: true,
            onChange: this.onChange,
            selectedValue: this.state.value,
            disabled: this.state.disabled
        };
    };

    CheckboxGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            var value = nextProps.value;

            if (!Array.isArray(value)) {
                if (value === null || value === undefined) {
                    value = [];
                } else {
                    value = [value];
                }
            }
            this.setState({
                value: value
            });
        }
        if ('disabled' in nextProps) {
            this.setState({
                disabled: nextProps.disabled
            });
        }
    };

    CheckboxGroup.prototype.onChange = function onChange(currentValue, e) {
        var value = this.state.value;

        var index = value.indexOf(currentValue);
        var valTemp = [].concat(_toConsumableArray(value));

        if (index === -1) {
            valTemp.push(currentValue);
        } else {
            valTemp.splice(index, 1);
        }

        if (!('value' in this.props)) {
            this.setState({ value: valTemp });
        }
        this.props.onChange(valTemp, e);
    };

    CheckboxGroup.prototype.render = function render() {
        var _this2 = this,
            _classnames;

        var _props = this.props,
            className = _props.className,
            style = _props.style;

        var disabled = this.state.disabled;
        var prefix = this.context.prefix || this.props.prefix;

        // 如果内嵌标签跟dataSource同时存在，以内嵌标签为主
        var children = void 0;
        if (this.props.children) {
            children = this.props.children;
        } else {
            children = this.props.dataSource.map(function (item, index) {
                var option = item;
                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
                    option = {
                        label: item,
                        value: item,
                        disabled: disabled
                    };
                }
                var checked = _this2.state.value && _this2.state.value.indexOf(option.value) > -1;

                return _react2['default'].createElement(
                    'label',
                    { key: index },
                    _react2['default'].createElement(_checkbox2['default'], {
                        value: option.value,
                        checked: checked,
                        disabled: disabled || option.disabled
                    }),
                    _react2['default'].createElement(
                        'span',
                        { className: prefix + 'checkbox-label' },
                        option.label
                    )
                );
            });
        }

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'checkbox-group', true), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'disabled', disabled), _classnames));

        return _react2['default'].createElement(
            'span',
            { className: cls, style: style },
            children
        );
    };

    return CheckboxGroup;
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
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * 整体禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']` 或者 `[{value: 'apple', label: '苹果',}, {value: 'pear', label: '梨'}, {value: 'orange', label: '橙子'}]`
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].any),
    /**
     * 被选中的值列表
     */
    value: _propTypes2['default'].array,
    /**
     * 默认被选中的值列表
     */
    defaultValue: _propTypes2['default'].array,
    /**
     * 通过子元素方式设置内部 checkbox
     */
    children: _propTypes2['default'].arrayOf(_propTypes2['default'].element),
    /**
     * 选中值改变时的事件
     * @param {Array} value 选中项列表
     * @param {Event} e Dom 事件对象
     */
    onChange: _propTypes2['default'].func
}, _class.defaultProps = {
    dataSource: [],
    onChange: function onChange() {},
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    onChange: _propTypes2['default'].func,
    __group__: _propTypes2['default'].bool,
    selectedValue: _propTypes2['default'].array,
    disabled: _propTypes2['default'].bool
}, _temp);
CheckboxGroup.displayName = 'CheckboxGroup';
exports['default'] = CheckboxGroup;
module.exports = exports['default'];

/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextRadio = __webpack_require__(747);

var _nextRadio2 = _interopRequireDefault(_nextRadio);

var _menuItem = __webpack_require__(692);

var _menuItem2 = _interopRequireDefault(_menuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * Menu.RadioItem
 * @order 6
 **/
var RadioMenuItem = (_temp = _class = function (_React$Component) {
    _inherits(RadioMenuItem, _React$Component);

    function RadioMenuItem(props) {
        _classCallCheck(this, RadioMenuItem);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    RadioMenuItem.prototype.render = function render() {
        var _props = this.props,
            disabled = _props.disabled,
            checked = _props.checked,
            index = _props.index,
            selectedKeys = _props.selectedKeys,
            onChange = _props.onChange;

        if (typeof checked === 'undefined') {
            checked = selectedKeys.indexOf(index) > -1;
        }
        return _react2['default'].createElement(
            _menuItem2['default'],
            _extends({}, this.props, { hasSelectedIcon: false, onClick: this.onClick, role: 'menuitemradiobutton' }),
            _react2['default'].createElement(_nextRadio2['default'], { checked: checked, onChange: onChange, disabled: disabled, tabIndex: '-1' }),
            this.props.children
        );
    };

    RadioMenuItem.prototype.onClick = function onClick(e) {
        if (!this.props.disabled) {
            this.props.onChange(true, e);
        }
    };

    return RadioMenuItem;
}(_react2['default'].Component), _class._menuItem = true, _class.propTypes = {
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
     * 显示在菜单右侧的帮助文本，通常用于一些附加信息
     */
    helper: _propTypes2['default'].string,
    /**
     * 禁用当前菜单项, 被禁用不会触发事件, 也无法选中Checkbox/Radio
     */
    disabled: _propTypes2['default'].bool,
    focused: _propTypes2['default'].bool,
    /**
     * 点击了菜单项触发的事件
     * @param {String} key 当前菜单项的key值
     * @param {Event} e DOM事件
     */
    onClick: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    parent: _propTypes2['default'].any,
    /**
     * 是否显示缩进
     */
    needIndent: _propTypes2['default'].bool,
    /**
     * 当前的菜单项是否被选中, 优先级比Menu传入的selectedKeys要高
     */
    checked: _propTypes2['default'].bool,
    group: _propTypes2['default'].string,
    /**
     * 选择被改变的时候触发的事件
     * @param {Boolean} checked 是否选中
     */
    onChange: _propTypes2['default'].func
}, _class.defaultProps = {
    helper: null,
    disabled: false,
    prefix: 'next-',
    hasSelectedIcon: true,
    needIndent: true,
    onClick: noop,
    onKeyDown: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    group: 'group',
    onChange: noop,
    __radioItem: true
}, _temp);
RadioMenuItem.displayName = 'RadioMenuItem';
exports['default'] = RadioMenuItem;
module.exports = exports['default'];

/***/ }),

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _radio = __webpack_require__(803);

var _radio2 = _interopRequireDefault(_radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Radio.Group
 * @order 2
 */
var RadioGroup = (_temp = _class = function (_Component) {
    _inherits(RadioGroup, _Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var value = '';
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        _this.state = {
            value: value,
            disabled: props.disabled //TODO:disabled 没有必要放在state里，后面要改掉
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    RadioGroup.prototype.getChildContext = function getChildContext() {
        return {
            __group__: true,
            isButton: this.props.shape === 'button',
            onChange: this.onChange,
            selectedValue: this.state.value,
            disabled: this.state.disabled
        };
    };

    RadioGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var value = nextProps.value,
            disabled = nextProps.disabled;


        if ('value' in nextProps && 'disabled' in nextProps) {
            if (value === undefined) {
                value = '';
            }
            this.setState({
                value: value,
                disabled: disabled
            });
        } else if ('value' in nextProps) {
            if (value === undefined) {
                value = '';
            }
            this.setState({
                value: value
            });
        } else if ('disabled' in nextProps) {
            this.setState({
                disabled: disabled
            });
        }
    };

    RadioGroup.prototype.onChange = function onChange(currentValue, e) {

        if (!('value' in this.props)) {
            this.setState({ value: currentValue });
        }
        this.props.onChange(currentValue, e);
    };

    RadioGroup.prototype.render = function render() {
        var _this2 = this,
            _classnames;

        var _props = this.props,
            className = _props.className,
            shape = _props.shape,
            size = _props.size,
            id = _props.id,
            style = _props.style;

        var disabled = this.state.disabled;
        var prefix = this.context.prefix || this.props.prefix;

        var children = void 0;
        if (this.props.children) {
            children = this.props.children;
        } else {
            children = this.props.dataSource.map(function (item, index) {
                var option = item;
                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
                    option = {
                        label: item,
                        value: item,
                        disabled: disabled
                    };
                }
                var checked = _this2.state.value === option.value;
                return _react2['default'].createElement(
                    _radio2['default'],
                    {
                        key: index,
                        value: option.value,
                        checked: checked,
                        disabled: disabled || option.disabled
                    },
                    option.label
                );
            });
        }

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'radio-group', true), _defineProperty(_classnames, prefix + 'radio-button', shape === 'button'), _defineProperty(_classnames, prefix + 'radio-button-' + size, shape === 'button'), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'disabled', disabled), _classnames));

        return _react2['default'].createElement(
            'div',
            { id: id, className: cls, style: style },
            children
        );
    };

    return RadioGroup;
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
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * radio group的选中项的值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].bool]),
    /**
     * radio group的默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].bool]),
    /**
     * 选中值改变时的事件
     * @param {String/Number} value 选中项的值
     * @param {Event} e Dom 事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 表示radio被禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 可以设置成 button 展示形状
     * @enumdesc 按钮状
     */
    shape: _propTypes2['default'].oneOf(['button']),
    /**
     * 与 `shape` 属性配套使用，shape设为button时有效
     * @enumdesc 大, 中, 小
     */
    size: _propTypes2['default'].oneOf(['large', 'medium', 'small']),
    /**
     * 可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']`
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].any),
    id: _propTypes2['default'].string,
    /**
     * 通过子元素方式设置内部radio
     */
    children: _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].element), _propTypes2['default'].element])

}, _class.defaultProps = {
    dataSource: [],
    size: 'medium',
    onChange: function onChange() {},
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    onChange: _propTypes2['default'].func,
    __group__: _propTypes2['default'].bool,
    isButton: _propTypes2['default'].bool,
    selectedValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].bool]),
    disabled: _propTypes2['default'].bool
}, _temp);
RadioGroup.displayName = 'RadioGroup';
exports['default'] = RadioGroup;
module.exports = exports['default'];

/***/ }),

/***/ 887:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextUtil = __webpack_require__(39);

var _container = __webpack_require__(686);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Menu.Group
 * @order 3
 **/
var MenuGroup = (_temp = _class = function (_Container) {
    _inherits(MenuGroup, _Container);

    function MenuGroup() {
        _classCallCheck(this, MenuGroup);

        return _possibleConstructorReturn(this, _Container.apply(this, arguments));
    }

    MenuGroup.prototype.render = function render() {
        var _classnames,
            _this2 = this;

        var _props = this.props,
            className = _props.className,
            label = _props.label,
            children = _props.children,
            focusedKey = _props.focusedKey,
            selectedKeys = _props.selectedKeys,
            openKeys = _props.openKeys,
            direction = _props.direction,
            others = _objectWithoutProperties(_props, ['className', 'label', 'children', 'focusedKey', 'selectedKeys', 'openKeys', 'direction']),
            prefix = this.getPrefix();

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'menu-group', true), _defineProperty(_classnames, className, className), _classnames));

        children = _react2['default'].Children.map(children, function (child, index) {
            if (child) {
                var key = child.props.index || child.key;
                if (typeof key === 'undefined' || key === null) {
                    key = index.toString();
                }
                return _react2['default'].cloneElement(child, {
                    ref: key,
                    index: key,
                    parent: _this2,
                    indentSize: _this2.props.indentSize + 20,
                    selectedKeys: selectedKeys,
                    focusedKey: focusedKey,
                    openKeys: openKeys,
                    direction: direction
                });
            }
        });

        others = (0, _nextUtil.pickAttrs)(others);

        return _react2['default'].createElement(
            'li',
            { className: cls },
            _react2['default'].createElement(
                'div',
                { className: prefix + 'menu-group-title' },
                label
            ),
            _react2['default'].createElement(
                'ul',
                others,
                children
            )
        );
    };

    return MenuGroup;
}(_container2['default']), _class.propTypes = {
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
     * 分组的标签
     */
    label: _propTypes2['default'].any
}, _class.defaultProps = {
    label: 'menu-group',
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
exports['default'] = MenuGroup;
module.exports = exports['default'];

/***/ }),

/***/ 889:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);