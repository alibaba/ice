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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = require('@icedesign/base/lib/input');

var Grid = require('@icedesign/base/lib/grid');

var Button = require('@icedesign/base/lib/button');

var Select = require('@icedesign/base/lib/select');

var Row = Grid.Row,
    Col = Grid.Col;
var UserForm = (_temp = _class = function (_Component) {
  _inherits(UserForm, _Component);

  function UserForm(props) {
    _classCallCheck(this, UserForm);

    var _this = _possibleConstructorReturn(this, (UserForm.__proto__ || Object.getPrototypeOf(UserForm)).call(this, props));

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
        username: '',
        displayName: '',
        email: '',
        userGroup: null,
        userState: null,
        passwd: '',
        rePasswd: ''
      }
    };
    return _this;
  }

  _createClass(UserForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'user-form' },
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
                '\u6DFB\u52A0\u7528\u6237'
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.formLabel },
                  '\u7528\u6237\u540D\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'username', required: true, message: '\u5FC5\u586B' },
                    _react2.default.createElement(Input, {
                      size: 'large',
                      placeholder: '\u8BF7\u8F93\u5165\u7528\u6237\u540D',
                      style: { width: '100%' }
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'username' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.formLabel },
                  '\u6635\u79F0\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'displayName' },
                    _react2.default.createElement(Input, {
                      size: 'large',
                      placeholder: '\u8BF7\u8F93\u5165\u6635\u79F0',
                      style: { width: '100%' }
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'displayName' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.formLabel },
                  '\u90AE\u7BB1\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      type: 'email',
                      name: 'email',
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1'
                    },
                    _react2.default.createElement(Input, {
                      style: { width: '100%' },
                      size: 'large',
                      placeholder: 'ice-admin@alibaba-inc.com'
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'email' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.formLabel },
                  '\u7528\u6237\u7EC4\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'userGroup' },
                    _react2.default.createElement(Select, {
                      style: { width: '100%' },
                      size: 'large',
                      placeholder: '\u8BF7\u9009\u62E9...',
                      dataSource: [{ label: '管理员', value: 'administrator' }, { label: '投稿者', value: 'contributor' }]
                    })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.formLabel },
                  '\u72B6\u6001\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'userState' },
                    _react2.default.createElement(Select, {
                      style: { width: '100%' },
                      size: 'large',
                      placeholder: '\u8BF7\u9009\u62E9...',
                      dataSource: [{ label: '有效', value: 'valid' }, { label: '禁用', value: 'disabled' }, { label: '过期', value: 'invalid' }]
                    })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.formLabel },
                  '\u65B0\u5BC6\u7801\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      name: 'passwd',
                      required: true,
                      validator: this.checkPasswd
                    },
                    _react2.default.createElement(Input, {
                      style: { width: '100%' },
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
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.formLabel },
                  '\u786E\u8BA4\u5BC6\u7801\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
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
                      style: { width: '100%' },
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
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              Col,
              { offset: '3' },
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

  return UserForm;
}(_react.Component), _class.displayName = 'UserForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = UserForm;


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