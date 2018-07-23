'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REG_KEY = /\[(['"a-z_A-Z0-9]*)\]|\./gi;

var IceFormBinderWrapper = function (_Component) {
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
        if (errors) {
          _this.setState({
            formErrors: Array.from(new Set(_this.state.formErrors.concat(errors).map(function (error) {
              return JSON.stringify(error);
            }))).map(function (errorStr) {
              return JSON.parse(errorStr);
            })
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
          _this.setState({
            formErrors: errors
          });
        } else {
          _this.setState({
            formErrors: []
          });
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
}(_react.Component);

IceFormBinderWrapper.displayName = 'IceFormBinderWrapper';
IceFormBinderWrapper.propTypes = {
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
};
IceFormBinderWrapper.defaultProps = {
  value: undefined,
  scrollErrorFieldTopOffset: 37.5,
  enableScrollErrorField: true,
  onChange: function onChange() {}
};
IceFormBinderWrapper.childContextTypes = {
  getter: _propTypes2.default.func,
  getError: _propTypes2.default.func,
  addValidate: _propTypes2.default.func,
  removeValidate: _propTypes2.default.func,
  setter: _propTypes2.default.func,
  validate: _propTypes2.default.func
};
exports.default = IceFormBinderWrapper;