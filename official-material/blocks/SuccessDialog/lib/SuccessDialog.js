import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Dialog from '@icedesign/base/lib/dialog';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';

var SuccessDialog = (_temp = _class = function (_Component) {
  _inherits(SuccessDialog, _Component);

  function SuccessDialog(props) {
    _classCallCheck(this, SuccessDialog);

    var _this = _possibleConstructorReturn(this, (SuccessDialog.__proto__ || _Object$getPrototypeOf(SuccessDialog)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.showDialog = function () {
      _this.setState({
        visible: true
      });
    };

    _this.hideDialog = function () {
      _this.setState({
        visible: false
      });
    };

    _this.state = {
      visible: false,
      isMobile: false
    };
    return _this;
  }

  _createClass(SuccessDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var isMobile = this.state.isMobile;

      var dialogStyle = {
        width: isMobile ? 'auto' : '640px',
        height: isMobile ? 'auto' : '340px'
      };

      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          _Dialog,
          _extends({
            className: 'success-dialog',
            style: _extends({}, dialogStyle),
            autoFocus: false,
            footer: false,
            title: '\u8BA4\u8BC1\u7533\u8BF7\u5DF2\u63D0\u4EA4'
          }, this.props, {
            onClose: this.hideDialog,
            visible: this.state.visible
          }),
          React.createElement(
            'div',
            { style: styles.dialogContent },
            React.createElement('img', {
              style: styles.icon,
              src: '//img.alicdn.com/tfs/TB1GOHLXyqAXuNjy1XdXXaYcVXa-52-52.png',
              srcSet: '//img.alicdn.com/tfs/TB1h_K_b4rI8KJjy0FpXXb5hVXa-104-104.png',
              alt: '\u63D0\u793A\u56FE\u6807'
            }),
            React.createElement(
              'p',
              { style: styles.text },
              '\u6211\u4EEC\u5C06\u57285-7\u4E2A\u5DE5\u4F5C\u65E5\u5185\u5B8C\u6210\u5BA1\u6838\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85'
            )
          )
        ),
        React.createElement(
          _Button,
          { type: 'primary', onClick: this.showDialog },
          '\u663E\u793A Dialog'
        )
      );
    }
  }]);

  return SuccessDialog;
}(Component), _class.displayName = 'SuccessDialog', _temp);
export { SuccessDialog as default };


var styles = {
  dialogContent: {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    width: '52px',
    height: '52px',
    marginTop: '46px',
    marginBottom: '10px'
  },
  text: {
    fontSize: '16px'
  }
};