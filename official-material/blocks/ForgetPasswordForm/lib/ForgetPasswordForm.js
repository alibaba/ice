import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';

var ForgetPasswordForm = (_temp = _class = function (_Component) {
  _inherits(ForgetPasswordForm, _Component);

  function ForgetPasswordForm(props) {
    _classCallCheck(this, ForgetPasswordForm);

    var _this = _possibleConstructorReturn(this, (ForgetPasswordForm.__proto__ || _Object$getPrototypeOf(ForgetPasswordForm)).call(this, props));

    _this.emailChange = function (newValue) {
      _this.setState(newValue);
    };

    _this.sendMessage = function () {
      _this.form.validateAll(function (errors, values) {
        console.log('errors', errors, 'values', values);
      });
    };

    _this.state = {
      email: ''
    };
    return _this;
  }

  // ICE: React Component 的生命周期

  _createClass(ForgetPasswordForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          'div',
          { style: styles.title },
          '\u5FD8\u8BB0\u5BC6\u7801'
        ),
        React.createElement(
          'div',
          { style: styles.subtitle },
          '\u586B\u5165\u60A8\u7684\u90AE\u7BB1\uFF0C\u91CD\u7F6E\u540E\u7684\u5BC6\u7801\u4F1A\u53D1\u5230\u60A8\u7684\u90AE\u7BB1'
        ),
        React.createElement(
          'div',
          { style: styles.groupTitle },
          '\u90AE\u7BB1\u5730\u5740\uFF1A'
        ),
        React.createElement(
          'div',
          { style: styles.inputWrap },
          React.createElement(
            FormBinderWrapper,
            {
              ref: function ref(form) {
                _this2.form = form;
              },
              value: {
                email: this.state.email
              },
              onChange: this.emailChange
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                FormBinder,
                {
                  required: true,
                  type: 'email',
                  message: 'Email \u5730\u5740\u4E0D\u5408\u6CD5, \u8BF7\u68C0\u67E5'
                },
                React.createElement(_Input, {
                  style: styles.input,
                  name: 'email',
                  placeholder: '\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740'
                })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(FormError, { name: 'email' })
              )
            )
          )
        ),
        React.createElement(
          'div',
          { style: styles.btnWrap },
          React.createElement(
            _Button,
            { type: 'primary', onClick: this.sendMessage },
            '\u53D1\u9001\u65B0\u5BC6\u7801'
          )
        )
      );
    }
  }]);

  return ForgetPasswordForm;
}(Component), _class.displayName = 'ForgetPasswordForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ForgetPasswordForm as default };


var styles = {
  title: {
    fontSize: '16px',
    margin: '0 0 10px',
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: '12px',
    marginBottom: '20px'
  },
  groupTitle: {
    marginBottom: '10px'
  },
  input: {
    maxWidth: '332px',
    width: '70%',
    minWidth: '150px'
  },
  inputWrap: { marginBottom: '20px' }
};