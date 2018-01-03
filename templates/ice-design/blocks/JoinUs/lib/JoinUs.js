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

var _formBinder = require('@icedesign/form-binder');

require('./JoinUs.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = require('@icedesign/base/lib/grid');

var Input = require('@icedesign/base/lib/input');

var Button = require('@icedesign/base/lib/button');

var Row = Grid.Row,
    Col = Grid.Col;

var telPattern = /^(1[\d]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$|^([ ]?)$/;

var JoinUs = (_temp = _class = function (_Component) {
  _inherits(JoinUs, _Component);

  function JoinUs(props) {
    _classCallCheck(this, JoinUs);

    var _this = _possibleConstructorReturn(this, (JoinUs.__proto__ || Object.getPrototypeOf(JoinUs)).call(this, props));

    _this.formChange = function (newValue) {
      _this.setState({
        formValue: newValue
      });
    };

    _this.handleSubmit = function () {
      _this.form.validateAll(function (error, value) {
        console.log(value);
      });
    };

    _this.state = {
      formValue: {
        username: '',
        email: '',
        phone: '',
        jobtitle: '',
        content: ''
      }
    };
    return _this;
  }

  _createClass(JoinUs, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'join-us',
          style: _extends({}, styles.container, styles.joinUs)
        },
        _react2.default.createElement(
          'div',
          { style: styles.content },
          _react2.default.createElement(
            'div',
            { style: styles.head },
            _react2.default.createElement(
              'h2',
              { style: styles.title },
              '\u6211\u4EEC\u7684\u56E2\u961F'
            ),
            _react2.default.createElement(
              'p',
              { style: styles.intro },
              '\u6211\u4EEC\u662F\u4E00\u652F\u5145\u6EE1\u6FC0\u60C5\u3001\u5FD7\u5411\u8FDC\u5927\u3001\u6000\u63E3\u68A6\u60F3\u7684\u56E2\u961F\uFF0C',
              _react2.default.createElement('br', null),
              '\u4E5F\u662F\u4E00\u4E2A\u601D\u7EF4\u6D3B\u8DC3\u3001\u671D\u6C14\u84EC\u52C3\u3001\u56E2\u7ED3\u4E92\u52A9\u7684\u5927\u5BB6\u5EAD'
            )
          ),
          _react2.default.createElement(
            _formBinder.FormBinderWrapper,
            {
              ref: function ref(form) {
                _this2.form = form;
              },
              value: this.state.formValue,
              onChange: this.formChange
            },
            _react2.default.createElement(
              'div',
              { style: styles.formContent },
              _react2.default.createElement(
                Row,
                { className: 'hoz-form-item', style: styles.hozFormItem },
                _react2.default.createElement(
                  Col,
                  { span: 8 },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { required: true, message: '\u5FC5\u586B\u9879' },
                    _react2.default.createElement(Input, { name: 'username', placeholder: '\u59D3\u540D' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    _react2.default.createElement(_formBinder.FormError, { name: 'username', style: styles.errorText })
                  )
                ),
                _react2.default.createElement(
                  Col,
                  { span: 8 },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { type: 'email', required: true, message: '\u90AE\u7BB1\u4E0D\u5408\u6CD5' },
                    _react2.default.createElement(Input, { name: 'email', placeholder: '\u90AE\u7BB1' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    _react2.default.createElement(_formBinder.FormError, { name: 'email', style: styles.errorText })
                  )
                ),
                _react2.default.createElement(
                  Col,
                  { span: 8 },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u7535\u8BDD\u53F7\u7801',
                      pattern: telPattern,
                      triggerType: 'onBlur'
                    },
                    _react2.default.createElement(Input, { name: 'phone', placeholder: '\u7535\u8BDD' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    _react2.default.createElement(_formBinder.FormError, { name: 'phone', style: styles.errorText })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                { className: 'ver-form-item', style: styles.verFormItem },
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  null,
                  _react2.default.createElement(Input, { name: 'jobtitle', placeholder: '\u804C\u4F4D' })
                )
              ),
              _react2.default.createElement(
                Row,
                { className: 'ver-form-item', style: styles.verFormItem },
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  null,
                  _react2.default.createElement(Input, { multiple: true, name: 'content', placeholder: '\u4E00\u4E9B\u81EA\u6211\u4ECB\u7ECD' })
                )
              ),
              _react2.default.createElement(
                Row,
                null,
                _react2.default.createElement(
                  Col,
                  null,
                  _react2.default.createElement(
                    Button,
                    {
                      onClick: this.handleSubmit,
                      type: 'primary',
                      style: styles.submitBtn
                    },
                    '\u63D0\u4EA4'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return JoinUs;
}(_react.Component), _class.displayName = 'JoinUs', _temp);
exports.default = JoinUs;


var styles = {
  container: {
    background: 'url(https://img.alicdn.com/tfs/TB1JGoDi3vD8KJjy0FlXXagBFXa-5040-2811.png)',
    backgroundSize: 'cover'
  },
  content: {
    width: '1080px',
    margin: '0 auto',
    padding: '80px 0'
  },
  head: { width: '50%', margin: '0 auto' },
  title: { margin: '0', textAlign: 'center', fontSize: '28px', color: '#fff' },
  intro: { textAlign: 'center', color: '#fff' },
  formContent: { width: '640px', margin: '60px auto' },
  errorText: { color: '#fff' },
  submitBtn: { color: '#2977f3', background: '#fff', borderRadius: '6px' },
  joinUs: {},
  hozFormItem: {},
  verFormItem: {}
};
module.exports = exports['default'];