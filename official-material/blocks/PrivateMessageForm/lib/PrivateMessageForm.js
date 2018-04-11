import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Feedback from '@icedesign/base/lib/feedback';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';

var Row = _Grid.Row,
    Col = _Grid.Col;

var Toast = _Feedback.toast;

var PrivateMessageForm = (_temp = _class = function (_Component) {
  _inherits(PrivateMessageForm, _Component);

  function PrivateMessageForm(props) {
    _classCallCheck(this, PrivateMessageForm);

    var _this = _possibleConstructorReturn(this, (PrivateMessageForm.__proto__ || _Object$getPrototypeOf(PrivateMessageForm)).call(this, props));

    _this.titleChange = function (title) {
      _this.setState({
        title: title
      });
    };

    _this.messageChange = function (message) {
      _this.setState({
        message: message
      });
    };

    _this.sendMessage = function () {
      var _this$state = _this.state,
          title = _this$state.title,
          message = _this$state.message;

      if (title && message) {
        Toast.success('发送成功');
        return;
      }
      Toast.error('您还有未填项');
    };

    _this.state = {
      title: '',
      message: ''
    };
    return _this;
  }

  _createClass(PrivateMessageForm, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'private-message-form' },
        React.createElement(
          IceContainer,
          { title: '\u79C1\u6709\u6D88\u606F' },
          React.createElement(
            Row,
            { style: styles.formRow },
            React.createElement(
              Col,
              { xxs: '5', s: '5', l: '2' },
              '\u6807\u9898'
            ),
            React.createElement(
              Col,
              { s: '14', l: '7' },
              React.createElement(_Input, {
                style: { width: '100%' },
                value: this.state.title,
                onChange: this.titleChange,
                placeholder: '\u8BF7\u8F93\u5165\u6807\u9898'
              })
            )
          ),
          React.createElement(
            Row,
            { style: styles.formRow },
            React.createElement(
              Col,
              { xxs: '5', s: '5', l: '2' },
              '\u6D88\u606F\u5185\u5BB9'
            ),
            React.createElement(
              Col,
              { s: '14', l: '7' },
              React.createElement(_Input, {
                style: { width: '100%' },
                multiple: true,
                value: this.state.message,
                onChange: this.messageChange,
                placeholder: '\u8BF7\u8F93\u5165\u5185\u5BB9'
              })
            )
          ),
          React.createElement(
            Row,
            null,
            React.createElement(
              Col,
              { xxs: '5', s: '5', l: '2' },
              ' '
            ),
            React.createElement(
              Col,
              null,
              React.createElement(
                _Button,
                { type: 'primary', onClick: this.sendMessage },
                '\u53D1\u9001\u6D88\u606F'
              )
            )
          )
        )
      );
    }
  }]);

  return PrivateMessageForm;
}(Component), _class.displayName = 'PrivateMessageForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { PrivateMessageForm as default };


var styles = {
  formRow: {
    marginBottom: '20px'
  }
};