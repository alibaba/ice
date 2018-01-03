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

require('./SignupForm.scss');

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

var SignupForm = (_temp = _class = function (_Component) {
  _inherits(SignupForm, _Component);

  function SignupForm(props) {
    _classCallCheck(this, SignupForm);

    var _this = _possibleConstructorReturn(this, (SignupForm.__proto__ || Object.getPrototypeOf(SignupForm)).call(this, props));

    _this.field = new Field(_this);
    return _this;
  }

  _createClass(SignupForm, [{
    key: 'checkPassword',
    value: function checkPassword(rule, value, callback) {
      var validate = this.field.validate;

      if (value) {
        validate(['rePasswd']);
      }
      callback();
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
        { className: 'signup-form', style: styles.signupForm },
        _react2.default.createElement(
          'div',
          { className: 'form', style: styles.form },
          _react2.default.createElement(
            'h4',
            null,
            '\u767B\u5F55'
          ),
          _react2.default.createElement(
            Form,
            { field: this.field },
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(_icon2.default, { type: 'person', size: 'xs' }),
              _react2.default.createElement(Input, _extends({ maxLength: 20, placeholder: '\u4F1A\u5458\u540D/\u90AE\u7BB1/\u624B\u673A\u53F7'
              }, init('name', {
                rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
              })))
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(_icon2.default, { type: 'lock', size: 'xs' }),
              _react2.default.createElement(Input, _extends({ htmlType: 'password', placeholder: '\u5BC6\u7801'
              }, init('password', {
                rules: [{ required: true, whitespace: true, min: 6, message: '密码至少为 6 个字符' }, { validator: this.checkPassword.bind(this) }]
              })))
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(
                Checkbox,
                init('agreement'),
                '\u8BB0\u4F4F\u8D26\u53F7'
              )
            ),
            _react2.default.createElement(
              FormItem,
              null,
              _react2.default.createElement(
                Button,
                { type: 'primary', onClick: this.handleSubmit.bind(this) },
                '\u767B \u5F55'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'tips', style: styles.tips },
              _react2.default.createElement(
                'a',
                { href: '/' },
                '\u7ACB\u5373\u6CE8\u518C'
              ),
              _react2.default.createElement(
                'span',
                null,
                '|'
              ),
              _react2.default.createElement(
                'a',
                { href: '/' },
                '\u5FD8\u8BB0\u5BC6\u7801'
              )
            )
          )
        )
      );
    }
  }]);

  return SignupForm;
}(_react.Component), _class.displayName = 'SignupForm', _class.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
}, _class.defaultProps = {}, _temp);
exports.default = SignupForm;


var styles = { "signupForm": { "display": "flex", "justifyContent": "center" }, "form": { "display": "flex", "justifyContent": "center" }, "tips": { "textAlign": "center", "a {Color": "#999", "textDecoration": "none", "fontSize": "13px" } };
module.exports = exports['default'];