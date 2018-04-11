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
import './SignupForm.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;
var SignupForm = (_temp = _class = function (_Component) {
  _inherits(SignupForm, _Component);

  function SignupForm(props) {
    _classCallCheck(this, SignupForm);

    var _this = _possibleConstructorReturn(this, (SignupForm.__proto__ || _Object$getPrototypeOf(SignupForm)).call(this, props));

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
        password: undefined,
        checkbox: false
      }
    };
    return _this;
  }

  _createClass(SignupForm, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'signup-form', style: styles.signupForm },
        React.createElement(
          'div',
          { style: styles.formContainer },
          React.createElement(
            'h4',
            { style: styles.formTitle },
            '\u767B\u5F55'
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
                    { name: 'password' },
                    React.createElement(_Input, { htmlType: 'password', placeholder: '\u5BC6\u7801' })
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

  return SignupForm;
}(Component), _class.displayName = 'SignupForm', _class.defaultProps = {}, _temp);
export { SignupForm as default };


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