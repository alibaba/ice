(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ 697:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(901);

/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(758);
__webpack_require__(758);
module.exports = __webpack_require__(907);

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(758);
module.exports = __webpack_require__(903);

/***/ }),

/***/ 901:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _asyncValidator = __webpack_require__(866);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _objectAssign = __webpack_require__(178);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _nextUtil = __webpack_require__(39);

var _utils = __webpack_require__(902);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function noop() {}

var initMeta = {
    state: '',
    valueName: 'value',
    trigger: 'onChange'
};

var Field = function () {
    function Field(com, options) {
        var _this = this;

        _classCallCheck(this, Field);

        this.com = com;
        this.fieldsMeta = {};
        this.cachedBind = {}; //解决每次函数新增的问题
        this.onChange = noop;
        this.parseName = false;
        this.forceUpdate = false;
        this.scrollToFirstError = false; //TODO: set true in 1.0 version
        this.autoUnmount = false; //TODO: set true in 1.0 version
        this.deepReset = false; //TODO: set true in 1.0 version

        if (!this.com) {
            _nextUtil.log.warning('`this` is missing in `Field`, you should use like `new Field(this)`');
        }

        if (options) {
            if (options.onChange) {
                this.onChange = options.onChange;
            }

            ['parseName', 'forceUpdate', 'scrollToFirstError', 'autoUnmount', 'deepReset'].forEach(function (m) {
                if (m in options && options[m]) {
                    _this[m] = true;
                }
            });
        }

        ['init', 'getValue', 'getValues', 'setValue', 'setValues', 'getError', 'setError', 'setErrors', 'validate', 'getState', 'isValidating', 'reset', 'remove'].forEach(function (m) {
            _this[m] = _this[m].bind(_this);
        });
    }

    Field.prototype.init = function init(name) {
        var _this2 = this;

        var fieldOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _fieldOption$valueNam = fieldOption.valueName,
            valueName = _fieldOption$valueNam === undefined ? 'value' : _fieldOption$valueNam,
            _fieldOption$trigger = fieldOption.trigger,
            trigger = _fieldOption$trigger === undefined ? 'onChange' : _fieldOption$trigger,
            _fieldOption$rules = fieldOption.rules,
            rules = _fieldOption$rules === undefined ? null : _fieldOption$rules,
            initValue = fieldOption.initValue,
            _fieldOption$normaliz = fieldOption.normalize,
            normalize = _fieldOption$normaliz === undefined ? null : _fieldOption$normaliz,
            _fieldOption$getValue = fieldOption.getValueFromEvent,
            getValueFromEvent = _fieldOption$getValue === undefined ? normalize : _fieldOption$getValue,
            _fieldOption$props = fieldOption.props,
            props = _fieldOption$props === undefined ? {} : _fieldOption$props;

        var originalProps = (0, _objectAssign2['default'])({}, props);

        if (!(name in this.fieldsMeta)) {
            this.fieldsMeta[name] = _extends({}, initMeta, { initValue: initValue });
        }
        var fieldMeta = this.fieldsMeta[name];

        normalize && _nextUtil.log.deprecated('normalize', 'getValueFromEvent', 'Field');

        valueName in props && _nextUtil.log.warning('`init` will override `props.' + valueName + '`, don\'t set it directly, and you can use `setValue` to change it');
        var defaultValueName = 'default' + valueName[0].toUpperCase() + valueName.slice(1);

        typeof initValue !== 'undefined' && defaultValueName in props && _nextUtil.log.warning('`option.initValue` will take place of `' + defaultValueName + ', they can\'t be used toghter');

        (0, _objectAssign2['default'])(fieldMeta, {
            valueName: valueName,
            getValueFromEvent: getValueFromEvent,
            rules: rules,
            rulesMap: rules ? this._getRulesMap(name, rules, trigger) : null //map the rules by the key of trigger
        });

        // 兼容defaultValue逻辑：存在defaultValue的时候，value不能赋值，否则defaultValue不生效
        if (!('value' in fieldMeta)) {
            if (typeof initValue !== 'undefined') {
                fieldMeta.value = initValue;
            } else if (defaultValueName in props) {
                fieldMeta.value = props[defaultValueName];
            }
        }

        var inputProps = {
            'data-meta': 'Field',
            id: name, //TODO: will be remove at 1.0 version
            ref: this.autoUnmount ? this._getCacheBind(name, name + '__ref', this._saveRef) : name //TODO: will be remove at 1.0 version
        };

        if ('value' in fieldMeta) {
            inputProps[valueName] = fieldMeta.value;
        }

        if (rules) {
            var _loop = function _loop(action) {
                inputProps[action] = function () {
                    _this2._onChangeValidate(name, action);
                    action in props && typeof props[action] === 'function' && props[action].apply(props, arguments);
                    _this2._reRender();
                };
            };

            for (var action in fieldMeta.rulesMap) {
                _loop(action);
            }
        }

        // trigger here maybe replace action, but validator won't be lost, it will still be checked in _onChange
        inputProps[trigger] = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _this2._onChange.apply(_this2, [name, trigger].concat(args));
            trigger in props && typeof props[trigger] === 'function' && props[trigger].apply(props, args);
            _this2.onChange(name, fieldMeta.value);
            _this2._reRender();
        };

        delete originalProps[defaultValueName];
        delete originalProps[valueName];

        return (0, _objectAssign2['default'])(originalProps, inputProps);
    };

    // 提取rule里面的trigger并且做映射


    Field.prototype._getRulesMap = function _getRulesMap(name, rules, trigger) {
        var rulesMap = {};

        // 根据trigger做校验分组
        if (rules.length) {
            for (var i = 0; i < rules.length; i++) {
                this._validateMap(rulesMap, rules[i], trigger);
            }
        } else if (!Array.isArray(rules)) {
            this._validateMap(rulesMap, rules, trigger);
        }

        return rulesMap;
    };

    // 根据trigger做校验分组


    Field.prototype._validateMap = function _validateMap(rulesMap, rule, defaultTrigger) {

        if (!('trigger' in rule)) {
            rule.trigger = [defaultTrigger];
        }

        if (typeof rule.trigger === 'string') {
            rule.trigger = [rule.trigger];
        }

        for (var i = 0; i < rule.trigger.length; i++) {
            var trigger = rule.trigger[i];

            if (trigger in rulesMap) {
                rulesMap[trigger].push(rule);
            } else {
                rulesMap[trigger] = [rule];
            }
        }
        delete rule.trigger;
    };

    //手动修改触发


    Field.prototype._onChange = function _onChange(name, action) {
        for (var _len2 = arguments.length, others = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            others[_key2 - 2] = arguments[_key2];
        }

        var e = others[0];
        var fieldMeta = this._get(name);

        if (!fieldMeta) {
            return;
        }

        fieldMeta.value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent.apply(this, others) : (0, _utils.getValueFromEvent)(e);

        this._resetError(name);
        var rulesMap = fieldMeta.rulesMap;

        if (rulesMap && action in rulesMap) {
            this._validate(rulesMap[action], name, fieldMeta.value);
        }
    };

    //校验事件触发


    Field.prototype._onChangeValidate = function _onChangeValidate(name, action) {
        var fieldMeta = this._get(name);

        var rulesMap = fieldMeta.rulesMap;

        if (action in rulesMap) {
            this._validate(rulesMap[action], name, this.getValue(name));
        }
    };

    Field.prototype._getCacheBind = function _getCacheBind(name, action, fn) {
        var cache = this.cachedBind[name] = this.cachedBind[name] || {};
        if (!cache[action]) {
            cache[action] = fn.bind(this, name);
        }
        return cache[action];
    };

    Field.prototype._saveRef = function _saveRef(name, component) {
        if (!component) {
            // after destroy, delete data
            delete this.fieldsMeta[name];
            return;
        }
        var fieldMeta = this._get(name);
        if (fieldMeta) {
            fieldMeta.ref = component;
        }
    };

    // 会做初始化value兼容检测


    Field.prototype.getValue = function getValue(name) {
        var field = this._get(name);

        if (field) {
            if ('value' in field) {
                return field.value;
            } else if (this.com && this.com.refs) {
                //TODO: remove get defaultValue by ref in 1.0BR

                var ref = this.com.refs[name] || field.ref; // 第一次ref很可能取不到
                if (ref) {

                    var value = (0, _utils.getDefaultValue)(ref, field.valueName);
                    field.value = value;
                    if (typeof value !== 'undefined') {
                        field.initValue = value;
                    }

                    return field.value;
                }
            }
        }

        return undefined;
    };

    Field.prototype.getValues = function getValues(names) {
        var _this3 = this;

        var fields = names || this.getNames();
        var allValues = {};

        fields.forEach(function (f) {
            if (!_this3.parseName) {
                allValues[f] = _this3.getValue(f);
            } else {
                allValues = (0, _utils.setIn)(allValues, f, _this3.getValue(f));
            }
        });
        return allValues;
    };

    Field.prototype.setValue = function setValue(name, value) {
        var reRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (name in this.fieldsMeta) {
            this.fieldsMeta[name].value = value;
            // this.onChange({[name]:value});     //人为set不应该属于onChange事件
            reRender && this._reRender();
        } else {
            this.fieldsMeta[name] = {
                value: value
            };
        }
    };

    Field.prototype.setValues = function setValues() {
        var _this4 = this;

        var fieldsValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!this.parseName) {
            for (var name in fieldsValue) {
                this.setValue(name, fieldsValue[name], false);
            }
        } else {
            var fields = this.getNames();
            fields.forEach(function (name) {
                var value = (0, _utils.getIn)(fieldsValue, name);
                if (value !== undefined) {
                    _this4.setValue(name, value, false);
                }
            });
        }
        this._reRender();
    };

    Field.prototype.setError = function setError(name, errors) {
        var err = Array.isArray(errors) ? errors : errors ? [errors] : [];
        if (name in this.fieldsMeta) {
            this.fieldsMeta[name].errors = err;
        } else {
            this.fieldsMeta[name] = {
                errors: err
            };
        }

        if (this.fieldsMeta[name].errors && this.fieldsMeta[name].errors.length > 0) {
            this.fieldsMeta[name].state = 'error';
        } else {
            this.fieldsMeta[name].state = '';
        }

        this._reRender();
    };

    Field.prototype.setErrors = function setErrors() {
        var fieldsErrors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        for (var name in fieldsErrors) {
            this.setError(name, fieldsErrors[name]);
        }
    };

    Field.prototype.getError = function getError(name) {
        var field = this._get(name);
        if (field && field.errors && field.errors.length) {
            return field.errors;
        }

        return null;
    };

    Field.prototype.getErrors = function getErrors(names) {
        var _this5 = this;

        var fields = names || this.getNames();
        var allErrors = {};
        fields.forEach(function (f) {
            allErrors[f] = _this5.getError(f);
        });
        return allErrors;
    };

    Field.prototype.getState = function getState(name) {
        var field = this._get(name);

        if (field && field.state) {
            return field.state;
        }

        return '';
    };

    //TODO: isValidating can be replace by getState, and will be removed at 1.0 version


    Field.prototype.isValidating = function isValidating(name) {
        var field = this._get(name);

        return !!field && !!field.state === 'validating';
    };

    //手动触发校验


    Field.prototype.validate = function validate(ns, opt, cb) {
        var _this6 = this;

        var _getParams = (0, _utils.getParams)(ns, opt, cb),
            names = _getParams.names,
            options = _getParams.options,
            callback = _getParams.callback;

        var fieldNames = names || this.getNames();

        var descriptor = {};
        var values = {};

        var hasRule = false;
        for (var i = 0; i < fieldNames.length; i++) {
            var name = fieldNames[i];
            var fieldMeta = this._get(name);

            if (!fieldMeta) continue;

            if (fieldMeta.rules && (Array.isArray(fieldMeta.rules) && fieldMeta.rules.length || Object.prototype.toString.call(fieldMeta.rules) === '[object Object]')) {
                descriptor[name] = fieldMeta.rules;
                values[name] = this.getValue(name);
                hasRule = true;

                // 清空错误
                fieldMeta.errors = [];
                fieldMeta.state = '';
            }
        }

        if (!hasRule) {
            callback && callback(null, this.getValues(fieldNames));
            return;
        }

        var validate = new _asyncValidator2['default'](descriptor);

        validate.validate(values, options, function (errors) {
            var errorsGroup = null;
            if (errors && errors.length) {
                errorsGroup = {};
                errors.forEach(function (e) {
                    var fieldName = e.field;
                    if (!errorsGroup[fieldName]) {
                        errorsGroup[fieldName] = {
                            errors: []
                        };
                    }
                    var fieldErrors = errorsGroup[fieldName].errors;
                    fieldErrors.push(e.message);
                });
            }
            if (errorsGroup) {
                // 更新每个field里面error信息
                for (var _i in errorsGroup) {
                    var field = _this6._get(_i);
                    field.errors = errorsGroup[_i].errors;
                    field.state = 'error';
                }
            }

            //没有错误的修改状态为成功
            for (var _i2 = 0; _i2 < fieldNames.length; _i2++) {
                var _name = fieldNames[_i2];
                var _fieldMeta = _this6._get(_name);
                if (_fieldMeta.rules && !(errorsGroup && _name in errorsGroup)) {
                    _fieldMeta.state = 'success';
                }
            }

            callback && callback(errorsGroup, _this6.getValues(fieldNames));
            _this6._reRender();

            if (errorsGroup && _this6.scrollToFirstError) {
                var firstNode = void 0;
                var firstTop = void 0;
                for (var _i3 in errorsGroup) {
                    var instance = _this6.com.refs[_i3] || _this6._get(_i3).ref;
                    var node = _reactDom2['default'].findDOMNode(instance);
                    if (!node) {
                        return;
                    }
                    var top = node.getBoundingClientRect().top;
                    if (firstTop === undefined || firstTop > top) {
                        firstTop = top;
                        firstNode = node;
                    }
                }
                if (firstNode && firstNode.scrollIntoView) {
                    firstNode.scrollIntoView();
                }
            }
        });
    };

    /**
     * clear form OR reset to default
     * @param ns
     * @param backToDefault
     */


    Field.prototype.reset = function reset(ns) {
        var _this7 = this;

        var backToDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var changed = false;
        if (typeof ns === 'string') {
            ns = [ns];
        } else if (typeof ns === 'boolean') {
            backToDefault = ns;
            ns = null;
        }

        var names = ns || Object.keys(this.fieldsMeta);
        names.forEach(function (name) {
            var field = _this7._get(name);
            _this7.getValue(name);
            if (field) {
                changed = true;

                if (_this7.deepReset) {
                    //有默认值的情况
                    if (backToDefault && 'initValue' in field) {
                        field.value = field.initValue;
                    } else {
                        field.value = undefined;
                    }
                } else {
                    /* eslint-disable no-lonely-if */
                    if ('initValue' in field) {
                        if (backToDefault === false) {
                            if (typeof field.value === 'string') {
                                field.value = '';
                            } else {
                                field.value = field.initValue;
                            }
                        } else {
                            field.value = field.initValue;
                        }
                    } else {
                        // 没有设置默认值的情况
                        /* eslint-disable no-lonely-if */
                        if (typeof field.value === 'boolean') {
                            field.value = false;
                        } else if (typeof field.value === 'string') {
                            field.value = '';
                        } else {
                            field.value = undefined;
                        }
                    }
                }

                field.state = '';

                // delete field.value;
                delete field.errors;
                delete field.rules;
                delete field.rulesMap;
            }
        });
        if (changed) {
            this._reRender();
        }
    };

    //单个校验


    Field.prototype._validate = function _validate(rule, name, value) {
        var _this8 = this;

        var field = this._get(name);
        field.state = 'validating';

        var validate = new _asyncValidator2['default'](_defineProperty({}, name, rule));

        validate.validate(_defineProperty({}, name, value), function (errors) {

            if (errors && errors.length) {
                field.errors = (0, _utils.getErrorStrs)(errors);
                field.state = 'error';
            } else {
                field.errors = []; //清空错误
                field.state = 'success';
            }

            _this8._reRender();
        });
    };

    Field.prototype._resetError = function _resetError(name) {
        var field = this._get(name);
        delete field.errors; //清空错误
        field.state = '';
    };

    Field.prototype.getNames = function getNames() {
        var fieldsMeta = this.fieldsMeta;
        return fieldsMeta ? Object.keys(fieldsMeta).filter(function () {
            return true;
        }) : [];
    };

    //触发render重绘组件


    Field.prototype._reRender = function _reRender() {
        if (this.com) {
            if (!this.forceUpdate && this.com.setState) {
                this.com.setState({});
            } else if (this.com.forceUpdate) {
                this.com.forceUpdate(); //forceUpdate 对性能有较大的影响，成指数上升
            }
        }
    };

    Field.prototype._get = function _get(name) {
        return name in this.fieldsMeta ? this.fieldsMeta[name] : null;
    };

    Field.prototype._getAll = function _getAll() {
        return this.fieldsMeta;
    };

    Field.prototype.remove = function remove(ns) {
        var _this9 = this;

        if (typeof ns === 'string') {
            ns = [ns];
        }
        var names = ns || Object.keys(this.fieldsMeta);
        names.forEach(function (name) {
            if (name in _this9.fieldsMeta) {
                delete _this9.fieldsMeta[name];
            }
        });
    };

    return Field;
}();

exports['default'] = Field;
module.exports = exports['default'];

/***/ }),

/***/ 902:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getValueFromEvent = getValueFromEvent;
exports.getDefaultValue = getDefaultValue;
exports.getErrorStrs = getErrorStrs;
exports.getParams = getParams;
exports.setIn = setIn;
exports.getIn = getIn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getValueFromEvent(e) {
    // support custom element
    if (!e || !e.target) {
        return e;
    }
    var target = e.target;


    if (target.type === 'checkbox') {
        return target.checked;
    } else if (target.type === 'radio') {
        //兼容radioGroup
        if (target.value) {
            return target.value;
        } else {
            return target.checked;
        }
    }
    return target.value;
}

function getDefaultValue(ref, valueName) {
    if (!ref) {
        return undefined;
    }

    if (ref.nodeType && ref.nodeType === 1) {
        //原生
        if (ref.nodeName === 'INPUT') {
            switch (ref.type) {
                case 'checkbox':
                case 'radio':
                    if ('defaultChecked' in ref) {
                        return ref.defaultChecked;
                    }
                    break;
            }
        }

        if ('defaultValue' in ref) {
            return ref.defaultValue;
        } else if ('value' in ref) {
            //原生的select设置defaultValue，但是ref上面只有value属性
            return ref.value;
        }
    } else {
        var defaultValue = 'default' + valueName.substring(0, 1).toUpperCase() + valueName.substring(1);
        if (defaultValue in ref.props) {
            return ref.props[defaultValue];
        }

        if ('defaultValue' in ref.props) {
            return ref.props.defaultValue;
        } else if ('defaultChecked' in ref.props) {
            return ref.props.defaultChecked;
        }
    }

    return undefined;
}
function getErrorStrs(errors) {
    if (errors) {
        return errors.map(function (e) {
            if ('message' in e) {
                return e.message;
            }
            return e;
        });
    }
    return errors;
}

// export function isEmptyObject(obj) {
//     return Object.keys(obj).length === 0;
// }

// export function flattenArray(arr) {
//     return Array.prototype.concat.apply([], arr);
// }

// export function mirror(obj) {
//     return obj;
// }

// export function hasRules(validate) {
//     if (validate) {
//         return validate.some((item) => {
//             return !!item.rules && item.rules.length;
//         });
//     }
//     return false;
// }

function getParams(ns, opt, cb) {
    var names = typeof ns === 'string' ? [ns] : ns;
    var callback = cb;
    var options = opt;
    if (cb === undefined) {
        if (typeof names === 'function') {
            callback = names;
            options = {};
            names = undefined;
        } else if (Array.isArray(names)) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            } else {
                options = options || {};
            }
        } else {
            callback = options;
            options = names || {};
            names = undefined;
        }
    }
    return {
        names: names,
        callback: callback,
        options: options
    };
}

/**
 * get value from key like 'a.b.c'
 * @param obj
 * @param strKey like a.b.c
 * @returns {*}
 */
// export function getValueByStringKey(obj, strKey = '') {
//     if (!strKey) {
//         return obj;
//     }

//     return strKey.split('.').reduce((previousValue, currentValue) => {
//         return previousValue[currentValue];
//     }, obj);
// }

/**
 * set value by key like 'a.b.c'
 * @param obj a.b.c = value
 * @param strKey
 * @param value
 */
// export function setValueByStringKey(obj, strKey = '', value) {
//     if (!strKey) {
//         return obj;
//     }

//     return strKey.split('.').reduce((previousValue, currentValue, i, arr) => {
//         if (!(currentValue in previousValue)) {
//             previousValue[currentValue] = {};
//         }
//         if (i === arr.length - 1) {
//             previousValue[currentValue] = value;
//         }
//         return previousValue[currentValue];
//     }, obj);
// }

var setInWithPath = function setInWithPath(state, value, path, pathIndex) {
    if (pathIndex >= path.length) {
        return value;
    }

    var first = path[pathIndex];
    var next = setInWithPath(state && state[first], value, path, pathIndex + 1);

    if (!state) {
        var initialized = isNaN(first) ? {} : [];
        initialized[first] = next;
        return initialized;
    }

    if (Array.isArray(state)) {
        var copy = [].concat(state);
        copy[first] = next;
        return copy;
    }

    return _extends({}, state, _defineProperty({}, first, next));
};

function setIn(state, name, value) {
    return setInWithPath(state, value, name.replace(/\[/, '.').replace(/\]/, '').split('.'), 0);
}

function getIn(state, name) {
    if (!state) {
        return state;
    }

    var path = name.replace(/\[/, '.').replace(/\]/, '').split('.');
    var length = path.length;
    if (!length) {
        return undefined;
    }

    var result = state;
    for (var i = 0; i < length && !!result; ++i) {
        result = result[path[i]];
    }

    return result;
}

/***/ }),

/***/ 903:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(904);
__webpack_require__(906);

/***/ }),

/***/ 904:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(905);

/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 906:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = __webpack_require__(908);

var _form2 = _interopRequireDefault(_form);

var _formItem = __webpack_require__(909);

var _formItem2 = _interopRequireDefault(_formItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_form2['default'].Item = _formItem2['default'];

exports['default'] = _form2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 908:
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

/** Form */
var Form = (_temp = _class = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form() {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Form.prototype.getChildContext = function getChildContext() {
        return {
            field: this.props.field,
            direction: this.props.direction,
            labelAlign: this.props.labelAlign,
            size: this.props.size
        };
    };

    Form.prototype.render = function render() {
        var _classNames;

        /*eslint-disable */
        var _props = this.props,
            className = _props.className,
            field = _props.field,
            direction = _props.direction,
            size = _props.size,
            labelAlign = _props.labelAlign,
            labelTextAlign = _props.labelTextAlign,
            others = _objectWithoutProperties(_props, ['className', 'field', 'direction', 'size', 'labelAlign', 'labelTextAlign']);

        /*eslint-enable */


        var prefix = this.context.prefix || this.props.prefix;

        // inset 模式统一左对齐
        var labelAlignReal = labelAlign === 'inset' ? 'left' : labelAlign;

        var formClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'form', true), _defineProperty(_classNames, prefix + 'form-' + labelAlignReal, labelAlignReal), _defineProperty(_classNames, prefix + 'form-label-' + labelTextAlign, !!labelTextAlign), _defineProperty(_classNames, prefix + 'form-hoz', direction === 'hoz'), _defineProperty(_classNames, '' + direction, true), _defineProperty(_classNames, prefix + 'form-' + size, size), _defineProperty(_classNames, className, !!className), _classNames));

        return _react2['default'].createElement(
            'form',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: formClassName }),
            this.props.children
        );
    };

    return Form;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 表单展示方向
     * @enumdesc 水平, 垂直
     */
    direction: _propTypes2['default'].oneOf(['hoz', 'ver']),
    /**
     * 单个FormItem的size自定义，优先级高于Form的size, 并且当组件与 FormItem 一起使用时，组件自身设置 size 属性无效。
     * @enumdesc 大, 中, 小
     */
    size: _propTypes2['default'].oneOf(['large', 'medium', 'small']),
    /**
     * 标签的位置
     * @enumdesc 上, 左, 内
     */
    labelAlign: _propTypes2['default'].oneOf(['top', 'left', 'inset']),
    /**
     * 标签的左右对齐方式
     * @enumdesc , 左, 右
     */
    labelTextAlign: _propTypes2['default'].oneOf(['', 'left', 'right']),
    /**
     * 经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项
     */
    field: _propTypes2['default'].any,
    /**
     * form内有 `htmlType="submit"` 的元素的时候会触发
     */
    onSubmit: _propTypes2['default'].func,
    /**
     * 子元素
     */
    children: _propTypes2['default'].any,
    /**
     * 扩展class
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    onSubmit: function onSubmit(e) {
        e.preventDefault();
    },

    size: 'medium',
    direction: 'ver',
    labelAlign: 'left'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    field: _propTypes2['default'].object,
    direction: _propTypes2['default'].oneOf(['hoz', 'ver']),
    labelAlign: _propTypes2['default'].oneOf(['top', 'left', 'inset']),
    size: _propTypes2['default'].oneOf(['large', 'small', 'medium'])
}, _temp);
Form.displayName = 'Form';
exports['default'] = Form;
module.exports = exports['default'];

/***/ }),

/***/ 909:
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

var _nextGrid = __webpack_require__(910);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function prefixFn(prefix) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return args.map(function (s) {
        return prefix + 'form-item-' + s;
    }).join(' ');
}

/** Form.Item */
var FormItem = (_temp = _class = function (_React$Component) {
    _inherits(FormItem, _React$Component);

    function FormItem() {
        _classCallCheck(this, FormItem);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    FormItem.prototype._getLayoutClass = function _getLayoutClass(colDef) {
        var _classNames;

        if (!colDef) {
            return '';
        }

        var span = colDef.span,
            offset = colDef.offset,
            fixedSpan = colDef.fixedSpan;

        /*eslint-enable */

        var prefix = this.context.prefix || this.props.prefix;

        return (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'col-' + span, span), _defineProperty(_classNames, prefix + 'col-offset-' + offset, offset), _defineProperty(_classNames, prefix + 'col-fixed-' + fixedSpan, fixedSpan), _classNames));
    };

    FormItem.prototype.getHelpMsg = function getHelpMsg() {
        var context = this.context;
        var props = this.props;
        if (props.help === undefined && context.field) {
            return this.getId() ? context.field.getError(this.getId()) : '';
        }

        return props.help;
    };

    FormItem.prototype.getOnlyControl = function getOnlyControl() {
        var children = _react2['default'].Children.toArray(this.props.children);
        var child = children.filter(function (c) {
            return c.props && 'data-meta' in c.props;
        })[0];
        return child !== undefined ? child : null;
    };

    FormItem.prototype.getChildProp = function getChildProp(prop) {
        var child = this.getOnlyControl();
        return child && child.props && child.props[prop];
    };

    FormItem.prototype.getId = function getId() {
        return this.getChildProp('id');
    };

    FormItem.prototype.renderHelp = function renderHelp() {
        var prefix = this.context.prefix || this.props.prefix;
        var help = this.getHelpMsg();
        return _react2['default'].createElement(
            'div',
            { className: help ? prefixFn(prefix, 'explain') : '', key: 'help' },
            help
        );
    };

    FormItem.prototype.getValidateStatus = function getValidateStatus() {
        var getState = this.context.field.getState;

        var field = this.getId();
        if (!field) {
            return '';
        }
        var state = getState(field);

        if (state === 'validating') {
            return 'loading';
        } else {
            return state;
        }
    };

    FormItem.prototype.renderValidateWrapper = function renderValidateWrapper(validateStatus, help, extra) {
        var _cls;

        var props = this.props;
        var prefix = this.context.prefix || this.props.prefix;

        var cls = (_cls = {}, _defineProperty(_cls, this._getLayoutClass(props.wrapperCol), this.context.labelAlign !== 'top'), _defineProperty(_cls, prefix + 'form-item-control', true), _cls);

        var childrenProps = { size: this.props.size || this.context.size };
        if (props.hasFeedback) {
            if (validateStatus === 'success' || validateStatus === 'loading') {
                childrenProps.state = validateStatus;
            }
        }

        var children = _react2['default'].Children.map(props.children, function (child) {
            if (child && typeof child.type === 'function') {
                return _react2['default'].cloneElement(child, childrenProps);
            }
            return child;
        });

        return _react2['default'].createElement(
            'div',
            { className: (0, _classnames2['default'])(cls), key: 'item' },
            children,
            ' ',
            help,
            ' ',
            extra
        );
    };

    FormItem.prototype.getRules = function getRules(name) {
        return this.context.field && this.context.field._get(name) && this.context.field._get(name).rules;
    };

    FormItem.prototype.isRequired = function isRequired() {
        if (this.context.field) {
            var rules = this.getRules(this.getId()) || null;
            if (!rules) {
                return false;
            }
            if (rules.required) {
                return true;
            } else {
                return rules.some(function (rule) {
                    return rule.required;
                });
            }
        }
        return false;
    };

    FormItem.prototype.renderLabel = function renderLabel() {
        var _classNames2;

        var props = this.props;
        var prefix = this.context.prefix || this.props.prefix;
        var labelCol = props.labelCol;
        var required = props.required === undefined ? this.isRequired() : props.required;

        var className = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, this._getLayoutClass(labelCol), true), _defineProperty(_classNames2, prefix + 'form-item-label', true), _classNames2));

        return props.label !== undefined ? _react2['default'].createElement(
            'label',
            { htmlFor: props.id || this.getId(), required: required, className: className, key: 'label' },
            props.label
        ) : null;
    };

    FormItem.prototype.renderChildren = function renderChildren(validateStatus) {
        return [this.renderLabel(), this.renderValidateWrapper(validateStatus, this.context.labelAlign !== 'inset' && this.props.labelAlign !== 'inset' ? this.renderHelp() : null, this.props.extra)];
    };

    FormItem.prototype.renderFormItem = function renderFormItem(validateStatus, children) {
        var _classNames3;

        var _props = this.props,
            className = _props.className,
            labelAlign = _props.labelAlign,
            style = _props.style,
            others = _objectWithoutProperties(_props, ['className', 'labelAlign', 'style']);

        var prefix = this.context.prefix || this.props.prefix;

        var itemClassName = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, prefix + 'form-item', true), _defineProperty(_classNames3, prefix + 'row', this.context.direction === 'ver' && this.context.labelAlign === 'left'), _defineProperty(_classNames3, 'has-success', validateStatus === 'success'), _defineProperty(_classNames3, 'has-error', validateStatus === 'error'), _defineProperty(_classNames3, '' + className, !!className), _classNames3));

        if (this.context.labelAlign === 'inset' || labelAlign === 'inset') {
            return _react2['default'].createElement(
                'div',
                { className: itemClassName, style: style },
                _react2['default'].createElement(
                    _nextGrid.Row,
                    { className: prefix + 'form-item-inset' },
                    children
                ),
                this.renderHelp()
            );
        }

        return _react2['default'].createElement(
            'div',
            _extends({ className: itemClassName, style: style }, (0, _nextUtil.pickAttrs)(others)),
            children
        );
    };

    FormItem.prototype.render = function render() {

        var validateStatus = this.props.validateStatus === undefined && this.context.field ? this.getValidateStatus() : this.props.validateStatus;

        var children = this.renderChildren(validateStatus);
        return this.renderFormItem(validateStatus, children);
    };

    return FormItem;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * label 标签的文本
     */
    label: _propTypes2['default'].node,
    /**
     * label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效
     */
    labelCol: _propTypes2['default'].object,
    /**
     * 提示信息，如不设置，则会根据校验规则自动生成. 如果设置会受控（ps: 可以利用这点自定义错误位置,详细看demo自定义错误)
     */
    help: _propTypes2['default'].node,
    /**
     * 校验状态，如不设置，则会根据校验规则自动生成
     * @enumdesc , 成功, 失败, 校验中
     */
    validateStatus: _propTypes2['default'].oneOf(['', 'success', 'error', 'loading']),
    /**
     * 配合 validateStatus 属性使用，是否展示校验状态图标, 目前只有Input支持
     */
    hasFeedback: _propTypes2['default'].bool,
    /**
     * 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
     */
    wrapperCol: _propTypes2['default'].object,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    id: _propTypes2['default'].string,
    children: _propTypes2['default'].node,
    /**
     * 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面
     */
    extra: _propTypes2['default'].node,
    /**
     * 单个FormItem的size自定义，优先级高于Form的size, 并且当组件与 FormItem 一起使用时，组件自身设置 size 属性无效。
     */
    size: _propTypes2['default'].oneOf(['', 'large', 'small', 'medium']),
    labelAlign: _propTypes2['default'].oneOf(['', 'top', 'left', 'inset']),
    /**
     * 扩展class
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    hasFeedback: false,
    prefix: 'next-'
}, _class.contextTypes = {
    field: _propTypes2['default'].object,
    direction: _propTypes2['default'].oneOf(['hoz', 'ver']),
    labelAlign: _propTypes2['default'].oneOf(['top', 'left', 'inset']),
    prefix: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large'])
}, _temp);
FormItem.displayName = 'FormItem';
exports['default'] = FormItem;
module.exports = exports['default'];

/***/ }),

/***/ 910:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _row = __webpack_require__(911);

var _row2 = _interopRequireDefault(_row);

var _col = __webpack_require__(912);

var _col2 = _interopRequireDefault(_col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = {
    Row: _row2.default,
    Col: _col2.default
};

exports.default = Grid;
module.exports = exports['default'];

/***/ }),

/***/ 911:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

// var _nextConfigProvider = require('../../next-config-provider/lib/index.js');

// var _nextConfigProvider2 = _interopRequireDefault(_nextConfigProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Grid.Row
 * @order 1
 */
var Row = (_temp = _class = function (_Component) {
    _inherits(Row, _Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Row.prototype.render = function render() {
        var _cx;

        /* eslint-disable no-unused-vars */
        var _props = this.props,
            prefix = _props.prefix,
            pure = _props.pure,
            wrap = _props.wrap,
            fixed = _props.fixed,
            gutter = _props.gutter,
            fixedWidth = _props.fixedWidth,
            align = _props.align,
            justify = _props.justify,
            className = _props.className,
            children = _props.children,
            others = _objectWithoutProperties(_props, ['prefix', 'pure', 'wrap', 'fixed', 'gutter', 'fixedWidth', 'align', 'justify', 'className', 'children']);
        /* eslint-enable no-unused-vars */

        var newClassName = (0, _classnames2.default)((_cx = {}, _cx[prefix + 'row'] = true, _cx[prefix + 'row-wrap'] = wrap, _cx[prefix + 'row-fixed'] = fixed, _cx[prefix + 'row-fixed-' + fixedWidth] = !!fixedWidth, _cx[prefix + 'row-justify-' + justify] = !!justify, _cx[prefix + 'row-align-' + align] = !!align, _cx[className] = !!className, _cx));

        var newChildren = children;
        var gutterNumber = parseInt(gutter, 10);
        if (gutterNumber !== 0) {
            var halfGutterString = gutterNumber / 2 + 'px';
            others.style = _extends({
                marginLeft: '-' + halfGutterString,
                marginRight: '-' + halfGutterString
            }, others.style || {});
            newChildren = _react.Children.map(children, function (child) {
                if (typeof child.type === 'function' && child.type.isNextCol) {
                    var newChild = (0, _react.cloneElement)(child, {
                        style: _extends({
                            paddingLeft: halfGutterString,
                            paddingRight: halfGutterString
                        }, child.style || {})
                    });
                    return newChild;
                }

                return child;
            });
        }

        return _react2.default.createElement(
            'div',
            _extends({ className: newClassName }, others),
            newChildren
        );
    };

    return Row;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2.default.string,
    pure: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    /**
     * 行内容
     */
    children: _propTypes2.default.node,
    /**
     * 列间隔
     */
    gutter: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    /**
     * 列在行中宽度溢出后是否换行
     */
    wrap: _propTypes2.default.bool,
    /**
     * 行在某一断点下宽度是否保持不变（默认行宽度随视口变化而变化）
     */
    fixed: _propTypes2.default.bool,
    /**
     * 固定行的宽度为某一断点的宽度，不受视口影响而变动
     * @enumdesc 320px, 480px, 720px, 990px, 1200px, 1500px
     */
    fixedWidth: _propTypes2.default.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl']),
    /**
     * (不支持IE9及以下浏览器)多列垂直方向对齐方式
     * @enumdesc 顶部对齐, 居中对齐, 底部对齐, 按第一行文字基线对齐, 未设置高度或设为 auto，将占满整个容器的高度
     * @default 'stretch'
     */
    align: _propTypes2.default.oneOf(['top', 'center', 'bottom', 'baseline', 'stretch']),
    /**
     * (不支持IE9及以下浏览器)行内具有多余空间时的布局方式
     * @enumdesc 左对齐, 居中对齐, 右对齐, 两端对齐，列之间间距相等, 每列具有相同的左右间距，行两端间距是列间距的二分之一
     * @default 'start'
     */
    justify: _propTypes2.default.oneOf(['start', 'center', 'end', 'space-between', 'space-around'])
}, _class.defaultProps = {
    prefix: 'next-',
    pure: false,
    fixed: false,
    gutter: 0,
    wrap: false
}, _temp);
Row.displayName = 'Row';
//exports.default = _nextConfigProvider2.default.config(Row);
exports.default = Row;
module.exports = exports['default'];


/***/ }),

/***/ 912:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

// var _nextConfigProvider = require('../../next-config-provider/lib/index.js');

// var _nextConfigProvider2 = _interopRequireDefault(_nextConfigProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var breakPoints = ['xxs', 'xs', 's', 'm', 'l', 'xl'];

/**
 * Grid.Col
 * @order 2
 */
var Col = (_temp = _class = function (_Component) {
  _inherits(Col, _Component);

  function Col() {
    _classCallCheck(this, Col);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Col.prototype.render = function render() {
    var _this2 = this,
        _extends2,
        _extends3;

    /* eslint-disable no-unused-vars */
    var _props = this.props,
        prefix = _props.prefix,
        pure = _props.pure,
        span = _props.span,
        offset = _props.offset,
        fixedSpan = _props.fixedSpan,
        fixedOffset = _props.fixedOffset,
        hidden = _props.hidden,
        align = _props.align,
        xxs = _props.xxs,
        xs = _props.xs,
        s = _props.s,
        m = _props.m,
        l = _props.l,
        xl = _props.xl,
        className = _props.className,
        children = _props.children,
        others = _objectWithoutProperties(_props, ['prefix', 'pure', 'span', 'offset', 'fixedSpan', 'fixedOffset', 'hidden', 'align', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'className', 'children']);
    /* eslint-enable no-unused-vars */

    var pointClassObj = breakPoints.reduce(function (ret, point) {
      var pointProps = {};
      if (_typeof(_this2.props[point]) === 'object') {
        pointProps = _this2.props[point];
      } else {
        pointProps.span = _this2.props[point];
      }

      ret[prefix + 'col-' + point + '-' + pointProps.span] = !!pointProps.span;
      ret[prefix + 'col-' + point + '-offset-' + pointProps.offset] = !!pointProps.offset;

      return ret;
    }, {});

    var hiddenClassObj = void 0;
    if (hidden === true) {
      var _hiddenClassObj;

      hiddenClassObj = (_hiddenClassObj = {}, _hiddenClassObj[prefix + 'col-hidden'] = true, _hiddenClassObj);
    } else if (typeof hidden === 'string') {
      var _hiddenClassObj2;

      hiddenClassObj = (_hiddenClassObj2 = {}, _hiddenClassObj2[prefix + 'col-' + hidden + '-hidden'] = !!hidden, _hiddenClassObj2);
    } else if (Array.isArray(hidden)) {
      hiddenClassObj = hidden.reduce(function (ret, point) {
        ret[prefix + 'col-' + point + '-hidden'] = !!point;
        return ret;
      }, {});
    }

    var classes = (0, _classnames2.default)(_extends((_extends2 = {}, _extends2[prefix + 'col'] = true, _extends2[prefix + 'col-' + span] = !!span, _extends2[prefix + 'col-fixed-' + fixedSpan] = !!fixedSpan, _extends2[prefix + 'col-offset-' + offset] = !!offset, _extends2[prefix + 'col-offset-fixed-' + fixedOffset] = !!fixedOffset, _extends2[prefix + 'col-' + align] = !!align, _extends2), pointClassObj, hiddenClassObj, (_extends3 = {}, _extends3[className] = className, _extends3)));

    return _react2.default.createElement(
      'div',
      _extends({ className: classes }, others),
      children
    );
  };

  return Col;
}(_react.Component), _class.isNextCol = true, _class.propTypes = {
  prefix: _propTypes2.default.string,
  pure: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  /**
   * 列内容
   */
  children: _propTypes2.default.node,
  /**
   * 列宽度<br><br>**可选值**:<br>1, 2, 3, ..., 22, 23, 24
   */
  span: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * 固定列宽度，宽度值为20 * 栅格数<br><br>**可选值**:<br>1, 2, 3, ..., 28, 29, 30
   */
  fixedSpan: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * （不支持IE9及以下浏览器）列偏移<br><br>**可选值**:<br>1, 2, 3, ..., 22, 23, 24
   */
  offset: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * （不支持IE9及以下浏览器）固定列偏移，宽度值为20 * 栅格数<br><br>**可选值**:<br>1, 2, 3, ..., 28, 29, 30
   */
  fixedOffset: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * (不支持IE9及以下浏览器)多列垂直方向对齐方式，可覆盖Row的align属性
   */
  align: _propTypes2.default.oneOf(['top', 'center', 'bottom', 'baseline', 'stretch']),
  /**
   * 	列在不同断点下的显示与隐藏<br><br>**可选值**:<br>true(在所有断点下隐藏)<br>false(在所有断点下显示)<br>'xs'(在 xs 断点下隐藏）<br>['xxs', 'xs', 's', 'm', 'l', 'xl'](在 xxs, xs, s, m, l, xl 断点下隐藏）
   */
  hidden: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.array]),
  /**
   * >=320px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象
   */
  xxs: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object]),
  /**
   * >=480px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象
   */
  xs: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object]),
  /**
   * >=720px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象
   */
  s: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object]),
  /**
   * >=990px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象
   */
  m: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object]),
  /**
   * >=1200px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象
   */
  l: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object]),
  /**
   * >=1500px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象
   */
  xl: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object])
}, _class.defaultProps = {
  prefix: 'next-',
  pure: false
}, _temp);
Col.displayName = 'Col';

//exports.default = _nextConfigProvider2.default.config(Col);
exports.default = Col;
module.exports = exports['default'];


/***/ })

}]);