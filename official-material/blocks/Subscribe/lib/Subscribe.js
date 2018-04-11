import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
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
var Subscribe = (_temp = _class = function (_Component) {
  _inherits(Subscribe, _Component);

  function Subscribe(props) {
    _classCallCheck(this, Subscribe);

    var _this = _possibleConstructorReturn(this, (Subscribe.__proto__ || _Object$getPrototypeOf(Subscribe)).call(this, props));

    _this.formChange = function (newValue) {
      _this.setState({
        formValue: newValue
      });
    };

    _this.subscribe = function () {
      _this.form.validateAll(function (errors, values) {
        console.log('errors', errors, 'values', values);
      });
    };

    _this.state = {
      formValue: {
        email: ''
      }
    };
    return _this;
  }

  _createClass(Subscribe, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        IceContainer,
        null,
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
            Row,
            { wrap: true },
            React.createElement(Col, { xxs: '1', s: '6', l: '8' }),
            React.createElement(
              Col,
              { xxs: '16', s: '8', l: '6' },
              React.createElement(
                Row,
                { wrap: true },
                React.createElement(
                  Col,
                  { span: '24' },
                  React.createElement(
                    FormBinder,
                    { type: 'email', message: '\u90AE\u7BB1\u4E0D\u5408\u6CD5', required: true },
                    React.createElement(_Input, {
                      size: 'large',
                      name: 'email',
                      placeholder: '\u8BF7\u8F93\u5165\u60A8\u7684\u8BA2\u9605\u90AE\u7BB1...',
                      style: { width: '100%' }
                    })
                  )
                ),
                React.createElement(
                  Col,
                  { span: '24', style: styles.error },
                  React.createElement(FormError, { name: 'email' })
                )
              )
            ),
            React.createElement(
              Col,
              { xxs: '6', s: '4', l: '2', style: { textAlign: 'center' } },
              React.createElement(
                _Button,
                { size: 'large', type: 'primary', onClick: this.subscribe },
                '\u8BA2\u9605'
              )
            )
          )
        )
      );
    }
  }]);

  return Subscribe;
}(Component), _class.displayName = 'Subscribe', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { Subscribe as default };


var styles = {
  error: {
    marginTop: '5px'
  }
};