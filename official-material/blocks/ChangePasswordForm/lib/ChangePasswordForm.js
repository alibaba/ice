'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* eslint react/no-string-refs:0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

var _formBinder = require('@icedesign/form-binder');

require('./ChangePasswordForm.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = require('@icedesign/base/lib/input');

var Grid = require('@icedesign/base/lib/grid');

var Button = require('@icedesign/base/lib/button');

var Row = Grid.Row,
    Col = Grid.Col;
var ChangePasswordForm = (_temp = _class = function (_Component) {
  _inherits(ChangePasswordForm, _Component);

  function ChangePasswordForm(props) {
    _classCallCheck(this, ChangePasswordForm);

    var _this = _possibleConstructorReturn(this, (ChangePasswordForm.__proto__ || Object.getPrototypeOf(ChangePasswordForm)).call(this, props));

    _this.checkPasswd = function (rule, values, callback) {
      if (!values) {
        callback('请输入新密码');
      } else if (values.length < 8) {
        callback('密码必须大于8位');
      } else if (values.length > 16) {
        callback('密码必须小于16位');
      } else {
        callback();
      }
    };

    _this.checkPasswd2 = function (rule, values, callback, stateValues) {
      console.log('stateValues:', stateValues);
      if (values && values !== stateValues.passwd) {
        callback('两次输入密码不一致');
      } else {
        callback();
      }
    };

    _this.formChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.validateAllFormField = function () {
      _this.refs.form.validateAll(function (errors, values) {
        console.log('values', values);
      });
    };

    _this.state = {
      value: {
        passwd: '',
        rePasswd: ''
      }
    };
    return _this;
  }

  _createClass(ChangePasswordForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'change-password-form' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(
            _formBinder.FormBinderWrapper,
            {
              value: this.state.value,
              onChange: this.formChange,
              ref: 'form'
            },
            _react2.default.createElement(
              'div',
              { style: styles.formContent },
              _react2.default.createElement(
                'h2',
                { style: styles.formTitle },
                '\u4FEE\u6539\u5BC6\u7801'
              ),
              _react2.default.createElement(
                Row,
                { wrap: true, style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '7', s: '4', l: '3', style: styles.formLabel },
                  '\u65B0\u5BC6\u7801\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { xxs: '16', s: '10', l: '7' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      name: 'passwd',
                      required: true,
                      validator: this.checkPasswd
                    },
                    _react2.default.createElement(Input, {
                      htmlType: 'password',
                      size: 'large',
                      placeholder: '\u8BF7\u91CD\u65B0\u8F93\u5165\u65B0\u5BC6\u7801'
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'passwd' })
                )
              ),
              _react2.default.createElement(
                Row,
                { wrap: true, style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '7', s: '4', l: '3', style: styles.formLabel },
                  '\u786E\u8BA4\u5BC6\u7801\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { xxs: '16', s: '10', l: '7' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      name: 'rePasswd',
                      required: true,
                      validator: function validator(rule, values, callback) {
                        return _this2.checkPasswd2(rule, values, callback, _this2.state.value);
                      }
                    },
                    _react2.default.createElement(Input, {
                      htmlType: 'password',
                      size: 'large',
                      placeholder: '\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4FDD\u6301\u4E00\u81F4'
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'rePasswd' })
                )
              )
            )
          ),
          _react2.default.createElement(
            Row,
            { wrap: true, style: { marginTop: 20 } },
            _react2.default.createElement(
              Col,
              { xxs: { offset: 6 }, s: { offset: 3 } },
              _react2.default.createElement(
                Button,
                {
                  size: 'large',
                  type: 'primary',
                  onClick: this.validateAllFormField
                },
                '\u63D0 \u4EA4'
              )
            )
          )
        )
      );
    }
  }]);

  return ChangePasswordForm;
}(_react.Component), _class.displayName = 'ChangePasswordForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChangePasswordForm;


var styles = {
  formContent: {
    width: '100%',
    position: 'relative'
  },
  formItem: {
    marginBottom: 25
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right'
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee'
  }
};
module.exports = exports['default'];