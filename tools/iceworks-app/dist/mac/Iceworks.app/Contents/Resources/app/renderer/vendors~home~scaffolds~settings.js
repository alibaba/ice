(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(769);
__webpack_require__(769);
module.exports = __webpack_require__(812);

/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(769);
module.exports = __webpack_require__(811);

/***/ }),

/***/ 811:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(173);
__webpack_require__(743);
__webpack_require__(805);
__webpack_require__(941);

/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = __webpack_require__(942);

var _select2 = _interopRequireDefault(_select);

var _combobox = __webpack_require__(943);

var _combobox2 = _interopRequireDefault(_combobox);

var _option = __webpack_require__(944);

var _option2 = _interopRequireDefault(_option);

var _optionGroup = __webpack_require__(814);

var _optionGroup2 = _interopRequireDefault(_optionGroup);

var _index = __webpack_require__(945);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_combobox2['default'].LOCALE = _index2['default'];
_select2['default'].LOCALE = _index2['default'];

_select2['default'].Combobox = _combobox2['default'];
_select2['default'].Option = _option2['default'];
_select2['default'].OptionGroup = _optionGroup2['default'];

exports['default'] = _select2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types, no-unused-vars, eqeqeq, prefer-const */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _nextMenu = __webpack_require__(745);

var _nextMenu2 = _interopRequireDefault(_nextMenu);

var _nextInput = __webpack_require__(806);

var _nextInput2 = _interopRequireDefault(_nextInput);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextDom = __webpack_require__(120);

var _nextUtil = __webpack_require__(39);

var _optionGroup = __webpack_require__(814);

var _optionGroup2 = _interopRequireDefault(_optionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var stopPropagation = function stopPropagation(e) {
    e.stopPropagation();
};

var escape = function escape(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

var Base = (_temp = _class = function (_Component) {
    _inherits(Base, _Component);

    function Base(props, context) {
        _classCallCheck(this, Base);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var value = 'value' in props ? props.value : props.defaultValue;
        _this.state = {
            value: _this.normalizeValue(value),
            visible: props.visible || props.defaultVisible
        };
        _this._cache = {};

        ['onOpen', 'afterOpen', 'onSelect', 'onInputSearch', 'onSearch'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        _this.cacheDataByValue(_this.state.value);
        _this.oldValue = value;
        return _this;
    }

    Base.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var value = void 0;
        if ('value' in nextProps) {
            value = this.normalizeValue(nextProps.value);
            this.setState({
                value: value
            });
            this.oldValue = nextProps.value;
        }
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
        }
    };

    Base.prototype.componentDidUpdate = function componentDidUpdate() {
        if (!this.state.visible && this.props.filterLocal) {
            this.filterValue = '';
        }
    };

    Base.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    Base.prototype._syncWidth = function _syncWidth(menu) {
        var autoWidth = this.props.autoWidth;

        if (autoWidth) {
            var select = (0, _reactDom.findDOMNode)(this);
            menu = (0, _reactDom.findDOMNode)(menu);
            if (menu) {
                var width = select.offsetWidth;
                _nextDom.style.set(menu, 'width', width + 'px');
                //We need reposition menu after sync width.
                this.forceUpdate();
            }
        }
    };

    Base.prototype._enableScroll = function _enableScroll(menu) {
        var _props = this.props,
            prefix = _props.prefix,
            showSearch = _props.showSearch;

        if (showSearch) {
            menu = (0, _reactDom.findDOMNode)(menu);
            if (menu) {
                // 出现搜索框 + mac + chrome + 高分辨率屏幕（mac pro）+ 出现滚动条 + 有动画播放
                // 下拉弹层在第一次展开时，会发生展示错位问题
                // http://gitlab.alibaba-inc.com/next/select/issues/244
                // 所以 .next-menu-content 默认设置 overflow: hidden;
                // 打开弹层后，重新设置为 overflow: auto;
                var menuContent = menu.querySelector('.' + prefix + 'menu-content');
                _nextDom.classList.addClass(menuContent, 'overflow-auto');
            }
        }
    };

    Base.prototype.normalizeValue = function normalizeValue(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        value = value.filter(function (v) {
            return v != null;
        }).map(function (v) {
            if (_nextUtil.obj.isPlainObject(v)) {
                return v;
            }
            return v.toString ? v.toString() : v;
        });
        return value;
    };

    Base.prototype.renderMenu = function renderMenu() {
        var _this2 = this;

        var dataSource = this.getFilteredDataSource(),
            flatternDataSource = this.getFlatternDataSource(dataSource),
            children = this.renderMenuContent(dataSource),
            showSearch = this.props.showSearch,
            header = void 0,
            currentKeys = this.state.value,
            focusedKeys = flatternDataSource.filter(function (item) {
            return _this2.state.value.indexOf(item.__key) > -1;
        }).map(function (item) {
            return item.__key;
        }),
            focusedKey = void 0;


        if (showSearch) {
            header = _react2['default'].createElement(
                'div',
                { className: this.getPrefix() + 'select-search' },
                _react2['default'].createElement(_nextInput2['default'], { onFocus: stopPropagation,
                    defaultValue: this.filterValue,
                    onChange: this.onInputSearch,
                    onSelect: stopPropagation,
                    onKeyDown: stopPropagation }),
                _react2['default'].createElement(_nextIcon2['default'], { type: 'search', size: 'small' })
            );
        }

        focusedKey = this.lastFocusedKey;

        if (!focusedKey) {
            focusedKey = focusedKeys[focusedKeys.length - 1];
        }

        if (!focusedKey && flatternDataSource.length) {
            focusedKey = flatternDataSource[0].value;
        }

        return _react2['default'].createElement(
            _nextMenu2['default'],
            { selectedKeys: currentKeys,
                focusedKey: focusedKey,
                header: header,
                selectMode: this.props.multiple ? 'multiple' : 'single',
                onSelect: this.onSelect,
                autoFocus: !showSearch,
                className: this.getPrefix() + 'select-menu ' + (showSearch ? 'has-search' : ''),
                ref: 'menu' },
            children
        );
    };

    Base.prototype.renderMenuContent = function renderMenuContent(dataSource) {
        var _this3 = this;

        return dataSource.map(function (option, index) {
            return _this3.renderMenuItem(option, index);
        });
    };

    Base.prototype.renderMenuItem = function renderMenuItem(option, i) {
        var label = option.label,
            children = option.children,
            __key = option.__key,
            index = option.index,
            others = _objectWithoutProperties(option, ['label', 'children', '__key', 'index']);

        if (children) {
            return _react2['default'].createElement(
                _nextMenu2['default'].Group,
                _extends({}, others, { label: label, key: i }),
                this.renderMenuContent(children)
            );
        } else {
            return _react2['default'].createElement(
                _nextMenu2['default'].Item,
                _extends({}, others, { key: __key }),
                label
            );
        }
    };

    // 获取的是结构化数据源


    Base.prototype.getDataSource = function getDataSource(props) {
        var dataSource = void 0;
        props = props || this.props;
        if (props.children) {
            dataSource = this.structorChildren(props.children);
        } else {
            dataSource = this.normalizeDataSource(props.dataSource);
        }
        return dataSource;
    };

    Base.prototype.structorChildren = function structorChildren(content) {
        var loop = function loop(children) {
            var result = [];
            _react.Children.map(children, function (child, index) {
                var props = _extends({}, child.props),
                    children = [];
                if (child && typeof child.type === 'function' && child.type._typeMark === 'select_option_group') {
                    children = loop(props.children);
                    props.children = children;
                } else {
                    props.label = props.children;
                    delete props.children;
                }
                props.__key = props.value != null ? props.value.toString() : props.value;
                result.push(props);
            });
            return result;
        };
        return loop(content);
    };

    // 抹平结构化数据源


    Base.prototype.getFlatternDataSource = function getFlatternDataSource(dataSource) {
        var flatternDataSource = [];
        loop(dataSource, function (option) {
            flatternDataSource.push(option);
        });
        return flatternDataSource;
    };

    // 使用抹平后的数据源进行过滤
    // 但是依然要返回结构化数据


    Base.prototype.getFilteredDataSource = function getFilteredDataSource() {
        var _this4 = this;

        var dataSource = this.getDataSource(),
            filterLocal = this.props.filterLocal,
            result = [];


        if (this.filterValue && filterLocal) {
            loop(dataSource, function (option, index, parentIndex) {
                var filterBy = _this4.props.filterBy;
                if (!filterBy) {
                    filterBy = _this4.filterBy;
                }
                if (filterBy(_this4.filterValue, option)) {
                    if (typeof parentIndex !== 'undefined') {
                        if (!result[parentIndex]) {
                            var _dataSource$parentInd = dataSource[parentIndex],
                                children = _dataSource$parentInd.children,
                                others = _objectWithoutProperties(_dataSource$parentInd, ['children']);

                            result[parentIndex] = others;
                        }
                        result[parentIndex].children = result[parentIndex].children || [];
                        result[parentIndex].children.push(option);
                    } else {
                        result.push(option);
                    }
                }
            });
        } else {
            result = dataSource;
        }
        return result;
    };

    Base.prototype.normalizeDataSource = function normalizeDataSource(dataSource) {
        dataSource = dataSource || [];
        return dataSource.map(function (option, index) {
            if (!_nextUtil.obj.isPlainObject(option)) {
                return {
                    label: option,
                    value: option,
                    __key: option
                };
            } else {
                /* eslint-disable eqeqeq */
                option.__key = option.value != null ? option.value.toString() : option.value;
                if (option.children) {
                    option.children.forEach(function (item, j) {
                        item.__key = item.value.toString();
                    });
                }
                return option;
            }
        });
    };

    Base.prototype.cacheDataByValue = function cacheDataByValue(value, props) {
        var _this5 = this;

        var dataSource = this.getFlatternDataSource(this.getDataSource(props));

        value.forEach(function (v) {
            dataSource.forEach(function (option) {
                if (option.__key == v) {
                    _this5._cache[v] = option;
                }
            });
        });
    };

    Base.prototype.getDataByValue = function getDataByValue(value) {
        var cache = this._cache;
        return value.map(function (v) {
            return cache[v] || v;
        });
    };

    Base.prototype.getDisplayByValue = function getDisplayByValue(value) {
        var _this6 = this;

        var fillProps = this.props.fillProps;


        if (!fillProps) {
            fillProps = 'label';
        }
        var label = value.map(function (val, i) {
            if (_this6._cache[val]) {
                return _this6._cache[val][fillProps];
            } else {
                if (_nextUtil.obj.isPlainObject(val)) {
                    return val[fillProps];
                }
                return val;
            }
        });
        return label;
    };

    Base.prototype.onSelect = function onSelect(value, context) {
        var _props2 = this.props,
            multiple = _props2.multiple,
            hiddenSelected = _props2.hiddenSelected,
            labelInValue = _props2.labelInValue,
            data = void 0,
            changeValue = void 0;


        this.cacheDataByValue(value);
        data = this.getDataByValue(value).map(function (item) {
            var option = item;
            if (option) {
                delete option.__key;
            }
            return option;
        });
        changeValue = data.map(function (item) {
            return item.value != null ? item.value : item;
        });
        if (!('value' in this.props)) {
            this.setState({ value: value, inputValue: this.getDisplayByValue(value) });
        }
        if (!multiple || hiddenSelected) {
            this.onVisibleChange(false);
        }
        if (!multiple) {
            changeValue = changeValue[0];
            data = data[0];
        }
        if (this.oldValue !== changeValue || this.isCombobox) {
            if (labelInValue) {
                this.props.onChange(data, data);
            } else {
                this.props.onChange(changeValue, data);
            }
            this.oldValue = changeValue;
        }
        if (this.clearValue) {
            this.clearValue();
        }
        if (context) {
            this.lastFocusedKey = 'index' in context ? context.index : context.props.index;
        }
    };

    Base.prototype.onInputSearch = function onInputSearch(value) {
        this.onSearch(value);
    };

    Base.prototype.onSearch = function onSearch(value) {
        this.filterValue = value;
        this.forceUpdate();
        this.props.onSearch(value);
    };

    Base.prototype.filterBy = function filterBy(value, item) {
        var v = escape(value),
            regExp = new RegExp('(' + v + ')', 'ig');
        return regExp.test(item.value) || regExp.test(item.label);
    };

    Base.prototype.renderLabel = function renderLabel(label, value) {
        var _this7 = this;

        var multiple = this.props.multiple;

        return label.map(function (l, i) {
            if (multiple) {
                return _react2['default'].createElement(
                    'span',
                    { className: _this7.getPrefix() + 'select-inner-item', key: value[i].value || value[i] },
                    _react2['default'].createElement(
                        'label',
                        { className: _this7.getPrefix() + 'select-inner-item-label',
                            title: typeof l === 'string' ? l : null
                        },
                        l
                    ),
                    _react2['default'].createElement(
                        'a',
                        { href: 'javascript:;', onClick: _this7.onRemoveClick.bind(_this7, value[i]) },
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'close', size: 'xxs' })
                    )
                );
            } else {
                return l;
            }
        });
    };

    Base.prototype.onRemoveClick = function onRemoveClick(val, e) {
        var value = [].concat(_toConsumableArray(this.state.value)),
            index = value.indexOf(val),
            disabled = this.props.disabled;


        if (!disabled) {
            value.splice(index, 1);
            this.onSelect(value);
            e.stopPropagation();
        }
    };

    Base.prototype.getIconSize = function getIconSize() {
        var size = this.props.size,
            map = {
            large: 'medium',
            medium: 'small',
            small: 'xs'
        };


        return map[size];
    };

    Base.prototype.getArrowType = function getArrowType(visible) {
        var arrowType = void 0;

        if (visible == null) {
            visible = this.state.visible;
        }

        if (visible) {
            arrowType = 'arrow-up';
        } else {
            arrowType = 'arrow-down';
        }
        return arrowType;
    };

    Base.prototype.onVisibleChange = function onVisibleChange(visible) {
        if (!('visible' in this.props)) {
            this.setState({ visible: visible });
        }
        this.props.onVisibleChange(visible);
    };

    Base.prototype.hasClear = function hasClear() {
        return this.props.hasClear && this.state.value.length && !this.props.multiple && !this.props.disabled;
    };

    Base.prototype.clear = function clear(e) {
        this.setState({
            value: [],
            inputValue: ''
        });
        this.props.onChange(null, {});
        this.oldValue = null;
        e.stopPropagation();
    };

    return Base;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Base.displayName = 'Base';


function loop(dataSource, callback, parentIndex) {
    dataSource.forEach(function (option, index) {
        if (option.children) {
            loop(option.children, callback, index);
        } else {
            callback(option, index, parentIndex);
        }
    });
}

exports['default'] = Base;
module.exports = exports['default'];

/***/ }),

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Select.OptionGroup
 */
var OptionGroup = (_temp = _class = function (_React$Component) {
    _inherits(OptionGroup, _React$Component);

    function OptionGroup() {
        _classCallCheck(this, OptionGroup);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    OptionGroup.prototype.render = function render() {
        return this.props.children;
    };

    return OptionGroup;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 设置分组的文案
     */
    label: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].node])
}, _class._typeMark = 'select_option_group', _temp);
OptionGroup.displayName = 'OptionGroup';
exports['default'] = OptionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(25);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(101);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/util.js


var formatRegExp = /%[sdj%]/g;

var warning = function warning() {};

// don't print warning message when in production env or node runtime
if (false) {}

function format() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;
  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }
  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case '%s':
          return String(args[i++]);
        case '%d':
          return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
          break;
        default:
          return x;
      }
    });
    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += ' ' + arg;
    }
    return str;
  }
  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }
  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }
  return false;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var flattenArr = flattenObjArr(objArr);
    return asyncSerialArray(flattenArr, func, callback);
  }
  var firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var next = function next(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === objArrLength) {
      callback(results);
    }
  };
  objArrKeys.forEach(function (key) {
    var arr = objArr[key];
    if (firstFields.indexOf(key) !== -1) {
      asyncSerialArray(arr, func, next);
    } else {
      asyncParallelArray(arr, func, next);
    }
  });
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }
    return {
      message: oe,
      field: oe.field || rule.fullField
    };
  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if ((typeof value === 'undefined' ? 'undefined' : typeof_default()(value)) === 'object' && typeof_default()(target[s]) === 'object') {
          target[s] = extends_default()({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/rule/required.js


/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/* harmony default export */ var rule_required = (required);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/rule/whitespace.js


/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* harmony default export */ var rule_whitespace = (whitespace);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/rule/type.js




/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  float: function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  object: function object(value) {
    return (typeof value === 'undefined' ? 'undefined' : typeof_default()(value)) === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  }
};

/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function type_type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    rule_required(rule, value, source, errors, options);
    return;
  }
  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
    // straight typeof check
  } else if (ruleType && (typeof value === 'undefined' ? 'undefined' : typeof_default()(value)) !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/* harmony default export */ var rule_type = (type_type);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/rule/range.js


/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number';
  // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);
  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  }
  // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

/* harmony default export */ var rule_range = (range);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/rule/enum.js

var ENUM = 'enum';

/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/* harmony default export */ var rule_enum = (enumerable);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/rule/pattern.js


/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function pattern_pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

/* harmony default export */ var rule_pattern = (pattern_pattern);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/rule/index.js







/* harmony default export */ var es_rule = ({
  required: rule_required,
  whitespace: rule_whitespace,
  type: rule_type,
  range: rule_range,
  'enum': rule_enum,
  pattern: rule_pattern
});
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/string.js



/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options, 'string');
    if (!isEmptyValue(value, 'string')) {
      es_rule.type(rule, value, source, errors, options);
      es_rule.range(rule, value, source, errors, options);
      es_rule.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        es_rule.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_string = (string);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/method.js



/**
 *  Validates a function.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (value !== undefined) {
      es_rule.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_method = (method);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/number.js



/**
 *  Validates a number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (value !== undefined) {
      es_rule.type(rule, value, source, errors, options);
      es_rule.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_number = (number);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/boolean.js



/**
 *  Validates a boolean.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function boolean_boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (value !== undefined) {
      es_rule.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_boolean = (boolean_boolean);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/regexp.js



/**
 *  Validates the regular expression type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      es_rule.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_regexp = (regexp);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/integer.js



/**
 *  Validates a number is an integer.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (value !== undefined) {
      es_rule.type(rule, value, source, errors, options);
      es_rule.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_integer = (integer);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/float.js



/**
 *  Validates a number is a floating point number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (value !== undefined) {
      es_rule.type(rule, value, source, errors, options);
      es_rule.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_float = (floatFn);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/array.js


/**
 *  Validates an array.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options, 'array');
    if (!isEmptyValue(value, 'array')) {
      es_rule.type(rule, value, source, errors, options);
      es_rule.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_array = (array);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/object.js



/**
 *  Validates an object.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function object_object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (value !== undefined) {
      es_rule.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_object = (object_object);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/enum.js


var enum_ENUM = 'enum';

/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function enum_enumerable(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (value) {
      es_rule[enum_ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_enum = (enum_enumerable);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/pattern.js



/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function validator_pattern_pattern(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, 'string')) {
      es_rule.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_pattern = (validator_pattern_pattern);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/date.js



function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  // console.log('validate on %s value', value);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      var dateObject = void 0;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      es_rule.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        es_rule.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_date = (date);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/required.js



function required_required(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value === 'undefined' ? 'undefined' : typeof_default()(value);
  es_rule.required(rule, value, source, errors, options, type);
  callback(errors);
}

/* harmony default export */ var validator_required = (required_required);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/type.js



function validator_type_type(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    es_rule.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      es_rule.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ var validator_type = (validator_type_type);
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/validator/index.js















/* harmony default export */ var es_validator = ({
  string: validator_string,
  method: validator_method,
  number: validator_number,
  boolean: validator_boolean,
  regexp: validator_regexp,
  integer: validator_integer,
  float: validator_float,
  array: validator_array,
  object: validator_object,
  'enum': validator_enum,
  pattern: validator_pattern,
  date: validator_date,
  url: validator_type,
  hex: validator_type,
  email: validator_type,
  required: validator_required
});
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/messages.js
function newMessages() {
  return {
    'default': 'Validation error on field %s',
    required: '%s is required',
    'enum': '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}

var messages_messages = newMessages();
// CONCATENATED MODULE: ./renderer/node_modules/async-validator/es/index.js






/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */
function Schema(descriptor) {
  this.rules = null;
  this._messages = messages_messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }
    if ((typeof rules === 'undefined' ? 'undefined' : typeof_default()(rules)) !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }
    this.rules = {};
    var z = void 0;
    var item = void 0;
    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_) {
    var _this = this;

    var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var oc = arguments[2];

    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    function complete(results) {
      var i = void 0;
      var field = void 0;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          errors = errors.concat.apply(errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        for (i = 0; i < errors.length; i++) {
          field = errors[i].field;
          fields[field] = fields[field] || [];
          fields[field].push(errors[i]);
        }
      }
      callback(errors, fields);
    }

    if (options.messages) {
      var messages = this.messages();
      if (messages === messages_messages) {
        messages = newMessages();
      }
      deepMerge(messages, options.messages);
      options.messages = messages;
    } else {
      options.messages = this.messages();
    }
    var arr = void 0;
    var value = void 0;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;
        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = extends_default()({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = extends_default()({}, rule);
        }
        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof_default()(rule.fields) === 'object' || typeof_default()(rule.defaultField) === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullfield(key, schema) {
        return extends_default()({}, schema, {
          fullField: rule.fullField + '.' + key
        });
      }

      function cb() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var errors = e;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (errors.length) {
          Schema.warning('async-validator:', errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }

          var fieldsSchema = {};
          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = extends_default()({}, fieldsSchema, data.rule.fields);
          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }
          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function (errs) {
            doIt(errs && errs.length ? errors.concat(errs) : errs);
          });
        }
      }

      var res = rule.validator(rule, data.value, cb, data.source, options);
      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }
    if (typeof rule.validator !== 'function' && rule.type && !es_validator.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }
    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return es_validator.required;
    }
    return es_validator[this.getType(rule)] || false;
  }
};

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }
  es_validator[type] = validator;
};

Schema.warning = warning;

Schema.messages = messages_messages;

/* harmony default export */ var es = __webpack_exports__["default"] = (Schema);

/***/ }),

/***/ 941:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 942:
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

var _nextOverlay = __webpack_require__(121);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = __webpack_require__(39);

var _nextLocaleProvider = __webpack_require__(177);

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _base = __webpack_require__(813);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * Select
 */
var Select = (_temp = _class = function (_Base) {
  _inherits(Select, _Base);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  Select.prototype.render = function render() {
    var _classnames;

    /* eslint-disable no-unused-vars */
    var _props = this.props,
        placeholder = _props.placeholder,
        children = _props.children,
        className = _props.className,
        locale = _props.locale,
        overlay = _props.overlay,
        popupProps = _props.popupProps,
        size = _props.size,
        disabled = _props.disabled,
        shape = _props.shape,
        hasArrow = _props.hasArrow,
        safeNode = _props.safeNode,
        multiple = _props.multiple,
        animation = _props.animation,
        dataSource = _props.dataSource,
        container = _props.container,
        hasClear = _props.hasClear,
        popupClassName = _props.popupClassName,
        others = _objectWithoutProperties(_props, ['placeholder', 'children', 'className', 'locale', 'overlay', 'popupProps', 'size', 'disabled', 'shape', 'hasArrow', 'safeNode', 'multiple', 'animation', 'dataSource', 'container', 'hasClear', 'popupClassName']),
        prefix = this.getPrefix(),
        menu = overlay || this.renderMenu(),
        _state = this.state,
        value = _state.value,
        visible = _state.visible;

    placeholder = placeholder || locale.selectPlaceHolder;

    this.cacheDataByValue(value);

    var records = this.getDataByValue(value),
        label = this.getDisplayByValue(value, records),
        cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'select', true), _defineProperty(_classnames, 'opened', visible), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, size, size), _defineProperty(_classnames, 'multiple', multiple), _defineProperty(_classnames, 'no-border', shape === 'arrow-only'), _defineProperty(_classnames, 'no-arrow', !hasArrow), _defineProperty(_classnames, 'has-clear', this.hasClear()), _defineProperty(_classnames, className, className), _classnames)),
        arrowType = this.getArrowType(),
        iconSize = this.getIconSize(),
        hiddenValue = this.normalizeHiddenValue(this.state.value),
        labelContent = label.length ? this.renderLabel(label, value) : _react2['default'].createElement(
      'span',
      { className: prefix + 'select-placeholder' },
      placeholder
    ),
        arrowContent = hasArrow ? _react2['default'].createElement(_nextIcon2['default'], { type: arrowType, size: iconSize, className: prefix + 'select-arrow' }) : null,
        closeIcon = this.hasClear() ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', size: iconSize, className: prefix + 'select-clear', onClick: this.clear.bind(this) }) : null;

    others = (0, _nextUtil.pickAttrs)(others);

    var trigger = _react2['default'].createElement(
      'span',
      _extends({}, others, { className: cls, tabIndex: disabled ? null : 0 }),
      _react2['default'].createElement('input', { type: 'hidden', name: others.name || 'select-faker', value: hiddenValue }),
      _react2['default'].createElement(
        'span',
        { ref: 'target', className: prefix + 'select-inner' },
        labelContent,
        closeIcon
      ),
      arrowContent
    );

    return _react2['default'].createElement(
      _nextOverlay.Popup,
      _extends({}, popupProps, {
        className: popupClassName,
        trigger: trigger,
        ref: 'popup',
        container: container,
        triggerType: 'click',
        disabled: disabled,
        visible: visible,
        animation: animation,
        autoFocus: true,
        safeNode: safeNode,
        shouldUpdatePosition: true,
        onOpen: this.onOpen,
        afterOpen: this.afterOpen,
        onClose: this.props.onClose,
        onVisibleChange: this.onVisibleChange.bind(this) }),
      menu
    );
  };

  Select.prototype.onOpen = function onOpen() {
    var menu = this.refs.popup.overlay.refs.menu;
    this._syncWidth(menu);
    this.props.onOpen();
  };

  Select.prototype.afterOpen = function afterOpen() {
    var menu = this.refs.popup.overlay.refs.menu;
    this._enableScroll(menu);
    this.props.afterOpen();
  };

  Select.prototype.normalizeHiddenValue = function normalizeHiddenValue(value) {
    return value.map(function (v) {
      if (_nextUtil.obj.isPlainObject(v)) {
        return v.value;
      } else {
        return v;
      }
    });
  };

  return Select;
}(_base2['default']), _class.propTypes = {
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
   *  弹层挂载容器节点
   */
  container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
  /**
   * 选择器的尺寸
   */
  size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
  /**
   * 选择器的形状
   */
  shape: _propTypes2['default'].oneOf(['normal', 'arrow-only']),
  /**
   * 没有值的时候的占位符
   */
  placeholder: _propTypes2['default'].string,
  /**
   * 当前值
   */
  value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].array]),
  /**
   * 初始默认值
   */
  defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].array]),
  /**
   * 当前弹层是否显示
   */
  visible: _propTypes2['default'].bool,
  /**
   * 弹层初始是否显示
   */
  defaultVisible: _propTypes2['default'].bool,
  /**
   * 是否禁用
   */
  disabled: _propTypes2['default'].bool,
  /**
   * 传入的数据，可以动态渲染子项,详见[dataSource的使用](#dataSource的使用)
   */
  dataSource: _propTypes2['default'].array,
  /**
   * 是否是多选
   */
  multiple: _propTypes2['default'].bool,
  // TODO: Remove API at next version.
  /**
   * 填充到选择框里面的值
   */
  fillProps: _propTypes2['default'].string,
  /**
   * 是否显示顶部的搜索框
   */
  showSearch: _propTypes2['default'].bool,
  /**
   * 在输入的时候过滤的函数,仅在filterLocal为true时候有效
   * @param {String} filterValue 筛选值
   * @param {Object} option 选项
   * @return {Boolean} 是否保留当前选项
   */
  filterBy: _propTypes2['default'].func,
  /**
   * 是否使用本地过滤,在数据源为远程的时候需要关闭此选项
   */
  filterLocal: _propTypes2['default'].bool,
  /**
   * 是否显示右侧的箭头
   */
  hasArrow: _propTypes2['default'].bool,
  /**
   * 下拉菜单是否与选择器对齐
   */
  autoWidth: _propTypes2['default'].bool,
  /**
   * Select发生改变的时候触发的回调
   * @param {String} value 数据
   * @param {Object} option 选项
   */
  onChange: _propTypes2['default'].func,
  /**
   * 在搜索框中输入触发的事件，仅在showSearch为true时候有效
   * @param {String} value 搜索值
   */
  onSearch: _propTypes2['default'].func,
  /**
   * 是否显示清空按钮，该按钮可以清空select的value, 该属性仅在单选模式下有效
   */
  hasClear: _propTypes2['default'].bool,
  /**
   * 弹出层的样式类
   */
  popupClassName: _propTypes2['default'].string,
  /**
   * 弹出层的属性
   */
  popupProps: _propTypes2['default'].object,
  /**
   * 弹层显示或隐藏的时候触发的事件
   * @param {Boolean} visible 弹层是否隐藏和显示
   */
  onVisibleChange: _propTypes2['default'].func,
  /**
   * 弹层显示时触发的事件
   */
  onOpen: _propTypes2['default'].func,
  /**
   * 弹层隐藏时触发的事件
   */
  onClose: _propTypes2['default'].func,
  /**
   * 自定义国际化文案对象
   * @property {String} selectPlaceHolder 请选择的提示文案
   * @property {String} comboboxPlaceHolder 请输入的提示文案
   */
  locale: _propTypes2['default'].object,
  /**
   * 自定义国际化语言
   */
  language: _propTypes2['default'].oneOf(['en-us', 'zh-cn', 'zh-tw']),
  afterOpen: _propTypes2['default'].func
}, _class.defaultProps = {
  prefix: 'next-',
  size: 'medium',
  shape: 'normal',
  placeholder: '',
  disabled: false,
  multiple: false,
  showSearch: false,
  hasArrow: true,
  autoWidth: true,
  onVisibleChange: noop,
  onChange: noop,
  fillProps: 'label',
  filterLocal: true,
  onMouseDown: noop,
  onMouseUp: noop,
  onSearch: noop,
  onOpen: noop,
  onClose: noop,
  hasClear: false,
  animation: {
    'in': 'expandInDown',
    out: 'expandOutUp'
  },
  locale: {
    selectPlaceHolder: '请选择',
    comboboxPlaceHolder: '请输入'
  },
  afterOpen: noop
}, _temp);


Select.displayName = 'Select';

exports['default'] = (0, _nextLocaleProvider2['default'])(Select);
module.exports = exports['default'];

/***/ }),

/***/ 943:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types, no-unused-vars, eqeqeq, prefer-const */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = __webpack_require__(8);

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextOverlay = __webpack_require__(121);

var _nextOverlay2 = _interopRequireDefault(_nextOverlay);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextDom = __webpack_require__(120);

var _nextLocaleProvider = __webpack_require__(177);

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _nextUtil = __webpack_require__(39);

var _base = __webpack_require__(813);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var findDOMNode = _reactDom2['default'].findDOMNode,
    noop = function noop() {};

var isObject = function isObject(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1] === 'Object';
};
/**
 * Select.Combobox
 */
var Combobox = (_temp = _class = function (_Base) {
    _inherits(Combobox, _Base);

    function Combobox(props, context) {
        _classCallCheck(this, Combobox);

        var _this = _possibleConstructorReturn(this, _Base.call(this, props, context));

        _this.state = _this.state || {};
        _this.state.inputValue = _this.props.multiple ? '' : _this.getInputValueFromValue(_this.state.value);
        _this.state.placeholder = _this.getPlaceHolder();
        ['onInputChange', 'onInputFocus', 'onInputBlur', 'onInputKeyDown', 'onSelectInnerClick', 'onArrowClick', 'onMouseDown', 'onMouseUp'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        _this.isCombobox = true;
        return _this;
    }

    Combobox.prototype.getPlaceHolder = function getPlaceHolder(props) {
        props = props || this.props;
        return props.placeholder || props.locale.comboboxPlaceHolder;
    };

    Combobox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        _Base.prototype.componentWillReceiveProps.call(this, nextProps);
        if ('value' in nextProps) {
            var value = this.normalizeValue(nextProps.value);
            this.cacheDataByValue(value, nextProps);
            if (!nextProps.multiple) {
                this.setState({
                    inputValue: this.getInputValueFromValue(nextProps.value)
                });
            } else if (!this.props.multiple && nextProps.multiple) {
                this.setState({
                    inputValue: ''
                });
            }
        }

        if ('placeholder' in nextProps) {
            this.setState({
                placeholder: this.getPlaceHolder(nextProps)
            });
        }
    };

    Combobox.prototype.getInputValueFromValue = function getInputValueFromValue(value) {
        var _props = this.props,
            fillProps = _props.fillProps,
            multiple = _props.multiple;

        if (this._isUserInput && !isObject(value)) {
            return value;
        }
        value = this.normalizeValue(value);
        if (value.length && !multiple) {
            value = this.getDataByValue(value);
            return typeof value[0][fillProps] !== 'undefined' ? value[0][fillProps] : value[0];
        } else {
            return '';
        }
    };

    Combobox.prototype.renderComboboxLabel = function renderComboboxLabel() {
        var multiple = this.props.multiple,
            _state = this.state,
            value = _state.value,
            placeholder = _state.placeholder,
            inputValue = _state.inputValue,
            records = this.getDataByValue(value),
            label = this.getDisplayByValue(value, records),
            placeHolderClassName = this.getPrefix() + 'select-placeholder';


        if (multiple) {
            return label.length || inputValue ? this.renderLabel(label, value) : this.state.focused ? null : _react2['default'].createElement(
                'span',
                { className: placeHolderClassName },
                placeholder
            );
        } else {
            return null;
        }
    };

    Combobox.prototype.render = function render() {
        var _classnames,
            _this2 = this;

        var _props2 = this.props,
            overlay = _props2.overlay,
            className = _props2.className,
            disabled = _props2.disabled,
            size = _props2.size,
            multiple = _props2.multiple,
            hasArrow = _props2.hasArrow,
            animation = _props2.animation,
            safeNode = _props2.safeNode,
            container = _props2.container,
            dataSource = _props2.dataSource,
            onChange = _props2.onChange,
            name = _props2.name,
            popupClassName = _props2.popupClassName,
            popupProps = _props2.popupProps,
            showSearch = _props2.showSearch,
            others = _objectWithoutProperties(_props2, ['overlay', 'className', 'disabled', 'size', 'multiple', 'hasArrow', 'animation', 'safeNode', 'container', 'dataSource', 'onChange', 'name', 'popupClassName', 'popupProps', 'showSearch']),
            prefix = this.getPrefix(),
            menu = overlay || _react2['default'].cloneElement(this.renderMenu(), {
            onKeyNavNodeEnter: this.onNodeEnter.bind(this),
            autoFocus: false
        }),
            visible = this.state.visible && (showSearch || !!_react2['default'].Children.toArray(menu.props.children).length || overlay),
            _state2 = this.state,
            value = _state2.value,
            inputValue = _state2.inputValue,
            focused = _state2.focused;

        this.cacheDataByValue(value);

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'select', true), _defineProperty(_classnames, prefix + 'comobobox', true), _defineProperty(_classnames, 'focused', focused), _defineProperty(_classnames, 'opened', visible), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, size, size), _defineProperty(_classnames, 'multiple', multiple), _defineProperty(_classnames, 'no-arrow', !hasArrow), _defineProperty(_classnames, 'has-clear', this.hasClear()), _defineProperty(_classnames, className, className), _classnames)),
            arrowType = this.getArrowType(visible),
            iconSize = this.getIconSize(),
            arrowContent = hasArrow ? _react2['default'].createElement(
            'span',
            { className: prefix + 'comobobox-arrow-wrapper', onClick: this.onArrowClick },
            _react2['default'].createElement(_nextIcon2['default'], { type: arrowType, size: iconSize, className: prefix + 'select-arrow' })
        ) : null,
            closeIcon = this.hasClear() ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', size: iconSize, className: prefix + 'select-clear', onClick: this.clear.bind(this) }) : null;

        others = (0, _nextUtil.pickAttrs)(others);

        var id = others.id;
        var focusNodeId = id ? 'focus-' + id : null;

        return _react2['default'].createElement(
            'span',
            _extends({}, others, { className: cls, onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'select-inner-wrapper', ref: 'innerWrapper' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'select-inner', onClick: this.onSelectInnerClick },
                    this.renderComboboxLabel(),
                    _react2['default'].createElement('input', { id: focusNodeId,
                        ref: 'target',
                        tabIndex: disabled ? null : 0,
                        value: inputValue,
                        size: size,
                        disabled: disabled,
                        onKeyDown: this.onInputKeyDown,
                        onChange: this.onInputChange,
                        onFocus: this.onInputFocus,
                        onBlur: this.onInputBlur,
                        name: name,
                        autoComplete: 'off',
                        placeholder: multiple ? null : this.getPlaceHolder()
                    }),
                    closeIcon
                ),
                arrowContent
            ),
            _react2['default'].createElement(
                _nextOverlay2['default'],
                _extends({}, popupProps, {
                    visible: visible,
                    animation: animation,
                    className: popupClassName,
                    container: container,
                    safeNode: [function () {
                        return _this2.refs.innerWrapper;
                    }, safeNode],
                    autoFocus: false, ref: 'overlay',
                    shouldUpdatePosition: true,
                    target: function target() {
                        return _this2;
                    },
                    onOpen: this.onOpen,
                    afterOpen: this.afterOpen,
                    onClose: this.props.onClose,
                    onRequestClose: this.onRequestClose.bind(this) }),
                menu
            )
        );
    };

    Combobox.prototype.onMouseDown = function onMouseDown(e) {
        this.clickByUser = true;
    };

    Combobox.prototype.onMouseUp = function onMouseUp(e) {
        this.clickByUser = false;
    };

    Combobox.prototype.onNodeEnter = function onNodeEnter(e, child) {
        var _props3 = this.props,
            multiple = _props3.multiple,
            tags = _props3.tags,
            selectedValue = [];


        if (child) {
            var value = (child.value || '').toString();
            if (multiple) {
                selectedValue = this.getMultipleStateValue(value);
            } else {
                selectedValue = [value];
            }
            this.onSelect(selectedValue, child);
        } else if (multiple && tags) {
            var _value = e.target.value;
            selectedValue = this.getMultipleStateValue(_value, tags);
            this.onSelect(selectedValue);
        } else {
            this.props.onInputEnter(e);
        }
        this.clearValue();
    };

    Combobox.prototype.getMultipleStateValue = function getMultipleStateValue(value, tags) {
        var stateValue = this.state.value,
            index = stateValue.indexOf(value);

        if (index > -1) {
            if (!tags) {
                stateValue.splice(index, 1);
            }
        } else {
            stateValue.push(value);
        }
        return stateValue;
    };

    Combobox.prototype.onInputChange = function onInputChange(e) {
        var value = e.target.value;
        if (this.filterValueFromLocal !== false) {
            this.filterValue = value;
        }
        this._isUserInput = true;
        var stateValue = this.normalizeValue(value);
        if (!('value' in this.props) && !this.props.multiple) {
            this.setState({
                value: stateValue
            });
        }
        var dataSource = this.getFilteredDataSource();
        var flatternDataSource = this.getFlatternDataSource(dataSource);
        if (flatternDataSource.length || !this.props.filterLocal) {
            this.onVisibleChange(true);
        }
        this.setInputValue(value);
        this.props.onInputUpdate(value);
    };

    Combobox.prototype.fakeInputWidth = function fakeInputWidth(value) {
        if (!this._fakeInputElement) {
            this._fakeInputElement = document.createElement('div');
            _nextDom.style.set(this._fakeInputElement, {
                position: 'absolute',
                top: '-9999px',
                left: 0,
                visibility: 'hidden'
            });
            document.body.appendChild(this._fakeInputElement);
        }
        this._fakeInputElement.textContent = value;
    };

    Combobox.prototype.componentDidMount = function componentDidMount() {
        this.setInputWidth();
    };

    Combobox.prototype.componentDidUpdate = function componentDidUpdate() {
        _Base.prototype.componentDidUpdate.apply(this, arguments);
        this.resizeInput();
        this._isUserInput = false;
    };

    Combobox.prototype.setInputWidth = function setInputWidth() {
        var input = findDOMNode(this.refs.target);
        this._oldInputWidth = input.clientWidth;
    };

    Combobox.prototype.resizeInput = function resizeInput() {
        var input = findDOMNode(this.refs.target),
            multiple = this.props.multiple,
            width = void 0;


        if (multiple) {
            if (!this._fakeInputElement) {
                this.fakeInputWidth('');
            }
            width = this._fakeInputElement.clientWidth;
            _nextDom.style.set(input, 'width', width + 10 + 'px');
        } else {
            _nextDom.style.set(input, 'width', this._oldInputWidth + 'px');
        }
    };

    Combobox.prototype.onInputFocus = function onInputFocus(e) {
        this.setState({
            focused: true
        });

        if (this._blurTimeout) {
            clearTimeout(this._blurTimeout);
        }
        if (this.state.placeholder !== '') {
            this.setState({
                placeholder: ''
            });
        }
        this.props.onInputFocus(e, this.clickByUser);
    };

    Combobox.prototype.onInputBlur = function onInputBlur(e) {
        var _this3 = this;

        this.setState({
            focused: false
        });

        this._blurTimeout = setTimeout(function () {
            if (!_this3.state.value.length) {
                _this3.setState({
                    placeholder: _this3.getPlaceHolder()
                });
            }
            _this3.props.onInputBlur(e, _this3.state.inputValue);
        }, 100);
    };

    Combobox.prototype.onInputKeyDown = function onInputKeyDown(e) {
        if (this.refs.overlay.refs.menu && this.refs.overlay.refs.menu.onKeyNavNodeKeyDown) {
            this.refs.overlay.refs.menu.onKeyNavNodeKeyDown(e);
        } else if (e.keyCode === 13) {
            this.onNodeEnter(e);
        }
        if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
        }
    };

    Combobox.prototype.onSelectInnerClick = function onSelectInnerClick() {
        this.clickByUser = true;
        this.focusInput();
        this.clickByUser = false;
    };

    Combobox.prototype.focusInput = function focusInput() {
        findDOMNode(this.refs.target).focus();
    };

    Combobox.prototype.setInputValue = function setInputValue(value) {
        this.setState({
            inputValue: value
        });
        this.fakeInputWidth(value);
        this._inputValue = value;
    };

    Combobox.prototype.clearValue = function clearValue() {
        if (this.props.multiple) {
            this.setInputValue('');
        }
        this.focusInput();
    };

    Combobox.prototype.onRequestClose = function onRequestClose() {
        this.onVisibleChange(false);
    };

    Combobox.prototype.onArrowClick = function onArrowClick() {
        if (!this.props.disabled) {
            this.onVisibleChange(!this.state.visible);
            this.focusInput();
        }
    };

    Combobox.prototype.onOpen = function onOpen() {
        var menu = this.refs.overlay.refs.menu;
        this._syncWidth(menu);
        this.props.onOpen();
    };

    Combobox.prototype.afterOpen = function afterOpen() {
        var menu = this.refs.overlay.refs.menu;
        this._enableScroll(menu);
        this.props.afterOpen();
    };

    Combobox.prototype.hasClear = function hasClear() {
        return this.props.hasClear && this.state.inputValue && !this.props.multiple && !this.props.disabled;
    };

    return Combobox;
}(_base2['default']), _class.propTypes = {
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
     *  弹层挂载容器节点
     */
    container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    /**
     * 选择器的尺寸
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 选择器的形状
     */
    shape: _propTypes2['default'].oneOf(['normal', 'arrow-only']),
    /**
     * 没有值的时候的占位符
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].array, _propTypes2['default'].node, _propTypes2['default'].object]),
    /**
     * 初始默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].array, _propTypes2['default'].node, _propTypes2['default'].object]),
    /**
     * 当前弹层是否显示
     */
    visible: _propTypes2['default'].bool,
    /**
     * 弹层初始是否显示
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 传入的数据，可以动态渲染子项,详见[dataSource的使用](#dataSource的使用)
     */
    dataSource: _propTypes2['default'].array,
    /**
     * 是否是多选
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 是否启用标签模式, 仅在多选时有效,效果是除了自动提示外的选项, 也可以使用输入的文字作为标签
     */
    tags: _propTypes2['default'].bool,
    // TODO: Remove API at next version.
    /**
     * 填充到选择框里面的值
     */
    fillProps: _propTypes2['default'].string,
    /**
     * 是否显示顶部的搜索框
     */
    showSearch: _propTypes2['default'].bool,
    /**
     * 在输入的时候过滤的函数,仅在filterLocal为true时候有效
     * @param {String} filterValue 筛选值
     * @param {Object} option 选项
     * @return {Boolean} 是否保留当前选项
     */
    filterBy: _propTypes2['default'].func,
    /**
     * 是否使用本地过滤,在数据源为远程的时候需要关闭此选项
     */
    filterLocal: _propTypes2['default'].bool,
    /**
     * 是否显示右侧的箭头
     */
    hasArrow: _propTypes2['default'].bool,
    /**
     * 下拉菜单是否与选择器对齐
     */
    autoWidth: _propTypes2['default'].bool,
    /**
     * 选择后是否立即隐藏菜单，单选是默认隐藏的，因此该选项只在多选的时候有效
     */
    hiddenSelected: _propTypes2['default'].bool,
    /**
     * Combobox在用户输入的时候触发的回调
     * @param {String} value 输入值
     */
    onInputUpdate: _propTypes2['default'].func,
    /**
     * Combobox获取焦点的时候触发的回调
     * @param {Event} e DOM事件对象
     * @param {Boolean} clickByUser 是否用户点击
     */
    onInputFocus: _propTypes2['default'].func,
    /**
     * Combobox失去焦点的时候触发的回调
     * @param {Event} e DOM事件对象
     * @param {String} inputValue 输入值
     */
    onInputBlur: _propTypes2['default'].func,
    /**
     * Combobox回车的时候触发的回调
     * @param {Event} e DOM事件对象
     */
    onInputEnter: _propTypes2['default'].func,
    /**
     * Combobox发生改变的时候触发的回调, 注意在输入的时候该事件不会被触发，如果需要监听输入的事件请使用onInputUpdate
     * @param {String} value 数据
     * @param {Object} option 选项
     */
    onChange: _propTypes2['default'].func,
    /**
     * 在搜索框中输入触发的事件，仅在showSearch为true时候有效
     * @param {String} value 搜索值
     */
    onSearch: _propTypes2['default'].func,
    /**
     * 是否显示清空按钮，该按钮可以清空select的value, 该属性仅在单选模式下有效
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 弹出层的样式类
     */
    popupClassName: _propTypes2['default'].string,
    /**
     * 弹出层的属性
     */
    popupProps: _propTypes2['default'].object,
    /**
     * 弹层显示或隐藏的时候触发的事件
     * @param {Boolean} visible 弹层是否隐藏和显示
     */
    onVisibleChange: _propTypes2['default'].func,
    /**
     * 弹层显示时触发的事件
     */
    onOpen: _propTypes2['default'].func,
    /**
     * 弹层隐藏时触发的事件
     */
    onClose: _propTypes2['default'].func,
    /**
     * 自定义国际化文案对象
     * @property {String} selectPlaceHolder 请选择的提示文案
     * @property {String} comboboxPlaceHolder 请输入的提示文案
     */
    locale: _propTypes2['default'].object,
    /**
     * 自定义国际化语言
     */
    language: _propTypes2['default'].oneOf(['en-us', 'zh-cn', 'zh-tw']),
    afterOpen: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium',
    shape: 'normal',
    placeholder: '',
    disabled: false,
    multiple: false,
    showSearch: false,
    hasArrow: true,
    autoWidth: true,
    onVisibleChange: noop,
    onChange: noop,
    fillProps: 'value',
    filterLocal: true,
    onMouseDown: noop,
    onMouseUp: noop,
    onSearch: noop,
    onOpen: noop,
    onClose: noop,
    hasClear: false,
    animation: {
        'in': 'expandInDown',
        out: 'expandOutUp'
    },
    onInputUpdate: noop,
    onInputFocus: noop,
    onInputBlur: noop,
    onInputEnter: noop,
    hiddenSelected: false,
    labelInValue: false,
    locale: {
        selectPlaceHolder: '请选择',
        comboboxPlaceHolder: '请输入'
    },
    afterOpen: noop
}, _temp);


Combobox.displayName = 'Combobox';

exports['default'] = (0, _nextLocaleProvider2['default'])(Combobox);
module.exports = exports['default'];

/***/ }),

/***/ 944:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = undefined;

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Select.Option
 */
var Option = (_temp = _class = function (_React$Component) {
  _inherits(Option, _React$Component);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Option.prototype.render = function render() {
    return this.props.children;
  };

  return Option;
}(_react2['default'].Component), _class.propTypes = {
  /**
   * 选项值
   */
  value: _propTypes2['default'].any,
  /**
   * 是否禁用
   */
  disabled: _propTypes2['default'].bool
}, _temp);
Option.displayName = 'Option';
exports['default'] = Option;
module.exports = exports['default'];

/***/ }),

/***/ 945:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = {
    'en-us': {
        selectPlaceHolder: 'Please select',
        comboboxPlaceHolder: 'Please input'
    },
    'zh-cn': {
        selectPlaceHolder: '请选择',
        comboboxPlaceHolder: '请输入'
    },
    'zh-tw': {
        selectPlaceHolder: '請選擇',
        comboboxPlaceHolder: '請輸入'
    }
};
module.exports = exports['default'];

/***/ })

}]);