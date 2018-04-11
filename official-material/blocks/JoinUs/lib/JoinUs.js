import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import './JoinUs.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;

var telPattern = /^(1[\d]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$|^([ ]?)$/;

var JoinUs = (_temp = _class = function (_Component) {
  _inherits(JoinUs, _Component);

  function JoinUs(props) {
    _classCallCheck(this, JoinUs);

    var _this = _possibleConstructorReturn(this, (JoinUs.__proto__ || _Object$getPrototypeOf(JoinUs)).call(this, props));

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

      return React.createElement(
        'div',
        {
          className: 'join-us',
          style: _extends({}, styles.container, styles.joinUs)
        },
        React.createElement(
          'div',
          { style: styles.content },
          React.createElement(
            'div',
            { style: styles.head },
            React.createElement(
              'h2',
              { style: styles.title },
              '\u6211\u4EEC\u7684\u56E2\u961F'
            ),
            React.createElement(
              'p',
              { style: styles.intro },
              '\u6211\u4EEC\u662F\u4E00\u652F\u5145\u6EE1\u6FC0\u60C5\u3001\u5FD7\u5411\u8FDC\u5927\u3001\u6000\u63E3\u68A6\u60F3\u7684\u56E2\u961F\uFF0C',
              React.createElement('br', null),
              '\u4E5F\u662F\u4E00\u4E2A\u601D\u7EF4\u6D3B\u8DC3\u3001\u671D\u6C14\u84EC\u52C3\u3001\u56E2\u7ED3\u4E92\u52A9\u7684\u5927\u5BB6\u5EAD'
            )
          ),
          React.createElement(
            FormBinderWrapper,
            {
              ref: function ref(form) {
                _this2.form = form;
              },
              value: this.state.formValue,
              onChange: this.formChange
            },
            React.createElement(
              'div',
              { style: styles.formContent },
              React.createElement(
                Row,
                {
                  wrap: true,
                  gutter: 20,
                  className: 'hoz-form-item',
                  style: styles.hozFormItem
                },
                React.createElement(
                  Col,
                  { span: 8 },
                  React.createElement(
                    FormBinder,
                    { required: true, message: '\u5FC5\u586B\u9879' },
                    React.createElement(_Input, {
                      style: { width: '100%', marginTop: '20px' },
                      name: 'username',
                      placeholder: '\u59D3\u540D'
                    })
                  ),
                  React.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    React.createElement(FormError, { name: 'username', style: styles.errorText })
                  )
                ),
                React.createElement(
                  Col,
                  { span: 8 },
                  React.createElement(
                    FormBinder,
                    { type: 'email', required: true, message: '\u90AE\u7BB1\u4E0D\u5408\u6CD5' },
                    React.createElement(_Input, {
                      style: { width: '100%', marginTop: '20px' },
                      name: 'email',
                      placeholder: '\u90AE\u7BB1'
                    })
                  ),
                  React.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    React.createElement(FormError, { name: 'email', style: styles.errorText })
                  )
                ),
                React.createElement(
                  Col,
                  { span: 8 },
                  React.createElement(
                    FormBinder,
                    {
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u7535\u8BDD\u53F7\u7801',
                      pattern: telPattern,
                      triggerType: 'onBlur'
                    },
                    React.createElement(_Input, {
                      style: { width: '100%', marginTop: '20px' },
                      name: 'phone',
                      placeholder: '\u7535\u8BDD'
                    })
                  ),
                  React.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    React.createElement(FormError, { name: 'phone', style: styles.errorText })
                  )
                ),
                React.createElement(
                  Col,
                  { span: 24, style: styles.verFormItem },
                  React.createElement(
                    FormBinder,
                    null,
                    React.createElement(_Input, {
                      style: { width: '100%', marginTop: '20px' },
                      name: 'jobtitle',
                      placeholder: '\u804C\u4F4D'
                    })
                  )
                ),
                React.createElement(
                  Col,
                  {
                    span: 24,
                    className: 'ver-form-item',
                    style: styles.verFormItem
                  },
                  React.createElement(
                    FormBinder,
                    null,
                    React.createElement(_Input, {
                      style: { width: '100%', marginTop: '20px' },
                      multiple: true,
                      name: 'content',
                      placeholder: '\u4E00\u4E9B\u81EA\u6211\u4ECB\u7ECD'
                    })
                  )
                )
              ),
              React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  null,
                  React.createElement(
                    _Button,
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
}(Component), _class.displayName = 'JoinUs', _temp);
export { JoinUs as default };


var styles = {
  container: {
    background: 'url(https://img.alicdn.com/tfs/TB1JGoDi3vD8KJjy0FlXXagBFXa-5040-2811.png)',
    backgroundSize: 'cover'
  },
  content: {
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0'
  },
  head: { width: '50%', margin: '0 auto' },
  title: { margin: 0, textAlign: 'center', fontSize: '28px', color: '#fff' },
  intro: { textAlign: 'center', color: '#fff' },
  formContent: { maxWidth: '680px', padding: '0 20px', margin: '60px auto' },
  errorText: { color: '#fff' },
  submitBtn: { color: '#2977f3', background: '#fff', borderRadius: '6px' },
  joinUs: {},
  hozFormItem: {},
  verFormItem: {
    marginTop: '20px'
  },
  formErrorWrapper: {
    color: 'red'
  }
};