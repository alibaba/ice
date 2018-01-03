'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('@icedesign/icon');

var _icon2 = _interopRequireDefault(_icon);

require('./RegisterForm.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = require('@icedesign/base/lib/form');

var Input = require('@icedesign/base/lib/input');

var Button = require('@icedesign/base/lib/button');

var Checkbox = require('@icedesign/base/lib/checkbox');

var Field = require('@icedesign/base/lib/field');

var FormItem = Form.Item;

var RegisterForm = (_temp = _class = function (_Component) {
  _inherits(RegisterForm, _Component);

  function RegisterForm(props) {
    _classCallCheck(this, RegisterForm);

    var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

    _this.field = new Field(_this);
    return _this;
  }

  _createClass(RegisterForm, [{
    key: 'checkPass',
    value: function checkPass(rule, value, callback) {
      var validate = this.field.validate;

      if (value) {
        validate(['rePasswd']);
      }
      callback();
    }
  }, {
    key: 'checkPass2',
    value: function checkPass2(rule, value, callback) {
      var getValue = this.field.getValue;

      if (value && value !== getValue('passwd')) {
        callback('两次输入密码不一致！');
      } else {
        callback();
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      this.field.validate(function (errors, values) {
        if (errors) {
          console.log('Errors in form!!!');
          return;
        }
        console.log(values);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var init = this.field.init;


      return _react2.default.createElement(
        'div',
        { className: 'register-form' },
        _react2.default.createElement(
          'div',
          { className: 'form' },
          _react2.default.createElement(
            'h4',
            null,
            '\u6CE8\u518C'
          ),
          _react2.default.createElement(
            Form,
            { field: this.field },
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(_icon2.default, { type: 'person', size: 'xs' }),
              _react2.default.createElement(Input, _extends({ maxLength: 20, placeholder: '\u59D3\u540D'
              }, init('name', {
                rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
              })))
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(_icon2.default, { type: 'mail', size: 'xs' }),
              _react2.default.createElement(Input, _extends({ type: 'email', placeholder: '\u90AE\u7BB1'
              }, init('email', {
                rules: [{ required: true, trigger: 'onBlur', message: '请输入正确的邮箱地址' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['onBlur', 'onChange'] }]
              })))
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(_icon2.default, { type: 'lock', size: 'xs' }),
              _react2.default.createElement(Input, _extends({ htmlType: 'password', placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801'
              }, init('passwd', {
                rules: [{ required: true, whitespace: true, message: '请填写密码' }, { validator: this.checkPass.bind(this) }]
              })))
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(_icon2.default, { type: 'lock', size: 'xs' }),
              _react2.default.createElement(Input, _extends({ htmlType: 'password', placeholder: '\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4FDD\u6301\u4E00\u81F4'
              }, init('rePasswd', {
                rules: [{
                  required: true,
                  whitespace: true,
                  message: '请再次输入密码'
                }, {
                  validator: this.checkPass2.bind(this)
                }]
              })))
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(
                Checkbox,
                init('agreement'),
                '\u540C\u610F\u6CE8\u518C\u6761\u6B3E'
              )
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(
                Button,
                { type: 'primary', onClick: this.handleSubmit.bind(this) },
                '\u6CE8 \u518C'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'tips' },
              _react2.default.createElement(
                'a',
                { href: '/' },
                '\u767B \u5F55'
              )
            )
          )
        )
      );
    }
  }]);

  return RegisterForm;
}(_react.Component), _class.displayName = 'RegisterForm', _class.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
}, _class.defaultProps = {}, _temp);
exports.default = RegisterForm;
module.exports = exports['default'];