import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Step from '@icedesign/base/lib/step';
import _Button from '@icedesign/base/lib/button';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';

var Row = _Grid.Row,
    Col = _Grid.Col;

var telPattern = /^(1[\d]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$|^([ ]?)$/;

var SimpleFluencyForm = (_temp = _class = function (_Component) {
  _inherits(SimpleFluencyForm, _Component);

  function SimpleFluencyForm(props) {
    _classCallCheck(this, SimpleFluencyForm);

    var _this = _possibleConstructorReturn(this, (SimpleFluencyForm.__proto__ || _Object$getPrototypeOf(SimpleFluencyForm)).call(this, props));

    _this.formChange = function (newValue) {
      _this.setState({
        formValue: newValue
      });
    };

    _this.nextStep = function () {
      _this.form.validateAll(function (error, value) {
        console.log(value);
        if (!error || error.length === 0) {
          _this.setState({ step: _this.state.step + 1 });
        }
      });
    };

    _this.renderStep = function (step) {
      if (step === 0) {
        var _this$state$formValue = _this.state.formValue,
            username = _this$state$formValue.username,
            email = _this$state$formValue.email,
            phone = _this$state$formValue.phone,
            address = _this$state$formValue.address;

        var initValue = {
          username: username,
          email: email,
          phone: phone,
          address: address
        };
        return React.createElement(
          IceContainer,
          { style: styles.form },
          React.createElement(
            FormBinderWrapper,
            {
              ref: function ref(form) {
                _this.form = form;
              },
              value: initValue,
              onChange: _this.formChange
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { xxs: '5', s: '5', l: '7', style: styles.formLabel },
                  React.createElement(
                    'span',
                    null,
                    '\u59D3\u540D\uFF1A'
                  )
                ),
                React.createElement(
                  Col,
                  { s: '14', l: '12' },
                  React.createElement(
                    FormBinder,
                    { required: true, message: '\u5FC5\u586B\u9879' },
                    React.createElement(_Input, {
                      name: 'username',
                      size: 'large',
                      style: { width: '100%' }
                    })
                  ),
                  React.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    React.createElement(FormError, { name: 'username' })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { xxs: '5', s: '5', l: '7', style: styles.formLabel },
                  '\u90AE\u7BB1\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '14', l: '12' },
                  React.createElement(
                    FormBinder,
                    { type: 'email', required: true, message: '\u90AE\u7BB1\u4E0D\u5408\u6CD5' },
                    React.createElement(_Input, {
                      name: 'email',
                      size: 'large',
                      style: { width: '100%' }
                    })
                  ),
                  React.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    React.createElement(FormError, { name: 'email' })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { xxs: '5', s: '5', l: '7', style: styles.formLabel },
                  '\u7535\u8BDD\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '14', l: '12' },
                  React.createElement(
                    FormBinder,
                    {
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u7535\u8BDD\u53F7\u7801',
                      pattern: telPattern,
                      triggerType: 'onBlur'
                    },
                    React.createElement(_Input, {
                      name: 'phone',
                      size: 'large',
                      style: { width: '100%' }
                    })
                  ),
                  React.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    React.createElement(FormError, { name: 'phone' })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { xxs: '5', s: '5', l: '7', style: styles.formLabel },
                  '\u5730\u5740\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '14', l: '12' },
                  React.createElement(
                    FormBinder,
                    null,
                    React.createElement(_Input, {
                      required: true,
                      message: '\u5FC5\u586B',
                      multiple: true,
                      name: 'address',
                      size: 'large',
                      style: { width: '100%' }
                    })
                  ),
                  React.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    React.createElement(FormError, { name: 'address' })
                  )
                )
              ),
              React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  { offset: 7 },
                  React.createElement(
                    _Button,
                    { onClick: _this.nextStep, type: 'primary' },
                    '\u4E0B\u4E00\u6B65'
                  )
                )
              )
            )
          )
        );
      } else if (step === 1) {
        return React.createElement(
          IceContainer,
          null,
          React.createElement(
            'span',
            null,
            '\u6B65\u9AA4\u4E8C'
          )
        );
      } else if (step === 2) {
        return React.createElement(
          IceContainer,
          null,
          React.createElement(
            'span',
            null,
            '\u6B65\u9AA4\u4E09'
          )
        );
      }
    };

    _this.state = {
      step: 0,
      formValue: {
        username: '',
        email: '',
        phone: '',
        address: ''
      }
    };
    return _this;
  }

  // ICE: React Component 的生命周期

  _createClass(SimpleFluencyForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'simple-fluency-form' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Step,
            { current: this.state.step, type: 'dot' },
            React.createElement(_Step.Item, { key: 0, title: '\u586B\u5199\u4FE1\u606F' }),
            React.createElement(_Step.Item, { key: 1, title: '\u786E\u8BA4\u4FE1\u606F' }),
            React.createElement(_Step.Item, { key: 2, title: '\u5B8C\u6210' })
          )
        ),
        this.renderStep(this.state.step)
      );
    }
  }]);

  return SimpleFluencyForm;
}(Component), _class.displayName = 'SimpleFluencyForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { SimpleFluencyForm as default };


var styles = {
  form: {
    padding: '40px 20px'
  },
  formLabel: {
    textAlign: 'right',
    lineHeight: '1.7rem',
    paddingRight: '10px'
  },
  formRow: {
    marginBottom: '20px'
  },
  formErrorWrapper: {
    marginTop: '5px'
  },
  simpleFluencyForm: {}
};