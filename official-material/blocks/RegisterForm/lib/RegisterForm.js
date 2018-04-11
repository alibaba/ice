import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Checkbox from '@icedesign/base/lib/checkbox';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError } from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './RegisterForm.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;
var RegisterForm = (_temp = _class = function (_Component) {
  _inherits(RegisterForm, _Component);

  function RegisterForm(props) {
    _classCallCheck(this, RegisterForm);

    var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || _Object$getPrototypeOf(RegisterForm)).call(this, props));

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

    _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.refs.form.validateAll(function (errors, values) {
        console.log('values', values);
      });
    };

    _this.state = {
      value: {
        account: undefined,
        passwd: undefined,
        rePasswd: undefined,
        checkbox: false
      }
    };
    return _this;
  }

  _createClass(RegisterForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'register-form' },
        React.createElement(
          'div',
          { style: styles.formContainer },
          React.createElement(
            'h4',
            { style: styles.formTitle },
            '\u6CE8\u518C'
          ),
          React.createElement(
            IceFormBinderWrapper,
            {
              value: this.state.value,
              onChange: this.formChange,
              ref: 'form'
            },
            React.createElement(
              'div',
              { style: styles.formItems },
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  null,
                  React.createElement(IceIcon, {
                    type: 'person',
                    size: 'small',
                    style: styles.inputIcon
                  }),
                  React.createElement(
                    IceFormBinder,
                    { name: 'account', required: true, message: '\u5FC5\u586B' },
                    React.createElement(_Input, { maxLength: 20, placeholder: '\u4F1A\u5458\u540D/\u90AE\u7BB1/\u624B\u673A\u53F7' })
                  )
                ),
                React.createElement(
                  Col,
                  null,
                  React.createElement(IceFormError, { name: 'account' })
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  null,
                  React.createElement(IceIcon, { type: 'lock', size: 'small', style: styles.inputIcon }),
                  React.createElement(
                    IceFormBinder,
                    {
                      name: 'passwd',
                      required: true,
                      validator: this.checkPasswd
                    },
                    React.createElement(_Input, {
                      htmlType: 'password',
                      size: 'large',
                      placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801'
                    })
                  )
                ),
                React.createElement(
                  Col,
                  null,
                  React.createElement(IceFormError, { name: 'passwd' })
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  null,
                  React.createElement(IceIcon, { type: 'lock', size: 'small', style: styles.inputIcon }),
                  React.createElement(
                    IceFormBinder,
                    {
                      name: 'rePasswd',
                      required: true,
                      validator: function validator(rule, values, callback) {
                        return _this2.checkPasswd2(rule, values, callback, _this2.state.value);
                      }
                    },
                    React.createElement(_Input, {
                      htmlType: 'password',
                      size: 'large',
                      placeholder: '\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4FDD\u6301\u4E00\u81F4'
                    })
                  )
                ),
                React.createElement(
                  Col,
                  null,
                  React.createElement(IceFormError, { name: 'rePasswd' })
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  null,
                  React.createElement(
                    IceFormBinder,
                    { name: 'checkbox' },
                    React.createElement(
                      _Checkbox,
                      { style: styles.checkbox },
                      '\u8BB0\u4F4F\u8D26\u53F7'
                    )
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  _Button,
                  {
                    type: 'primary',
                    onClick: this.handleSubmit,
                    style: styles.submitBtn
                  },
                  '\u767B \u5F55'
                )
              ),
              React.createElement(
                Row,
                { className: 'tips', style: styles.tips },
                React.createElement(
                  'a',
                  { href: '/', style: styles.link },
                  '\u7ACB\u5373\u6CE8\u518C'
                ),
                React.createElement(
                  'span',
                  { style: styles.line },
                  '|'
                ),
                React.createElement(
                  'a',
                  { href: '/', style: styles.link },
                  '\u5FD8\u8BB0\u5BC6\u7801'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return RegisterForm;
}(Component), _class.displayName = 'RegisterForm', _class.defaultProps = {}, _temp);
export { RegisterForm as default };


var styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee'
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column'
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px'
  },
  inputIcon: {
    position: 'absolute',
    left: '18px',
    top: '5px',
    color: '#999'
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px'
  },
  checkbox: {
    marginLeft: '5px'
  },
  tips: {
    textAlign: 'center'
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px'
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px'
  }
};