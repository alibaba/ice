'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

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

var defaultErrorStatePropsGenerator = function defaultErrorStatePropsGenerator(errors, FormItemProps) {
  return {
    className: FormItemProps.className ? FormItemProps.className + ' this-field-has-error' : 'this-field-has-error'
  };
};

var FormBinder = function (_Component) {
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

      var currentName = this.props.name || FormItem.props.name;

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
      }), _defineProperty(_extends2, 'value', function () {
        // formItems value has higher priority
        if (FormItemProps.value) {
          return FormItemProps.value;
        } else {
          return _this2.context.getter(currentName);
        }
      }()), _extends2)));

      return NewFormItem;
    }
  }]);

  return FormBinder;
}(_react.Component);

FormBinder.displayName = 'FormBinder';
FormBinder.propTypes = {
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
   * 触发校验的事件，对于高频触发校验的 Input 可以设置为 'onBlur' 减少校验调用次数
   */
  triggerType: _propTypes2.default.string,

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
};
FormBinder.defaultProps = {};
FormBinder.contextTypes = {
  getError: _propTypes2.default.func,
  getter: _propTypes2.default.func,
  validate: _propTypes2.default.func,
  addValidate: _propTypes2.default.func,
  removeValidate: _propTypes2.default.func,
  setter: _propTypes2.default.func
};
exports.default = FormBinder;