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

var ConfirmDialog = (_temp = _class = function (_Component) {
  _inherits(ConfirmDialog, _Component);

  function ConfirmDialog(props) {
    _classCallCheck(this, ConfirmDialog);

    var _this = _possibleConstructorReturn(this, (ConfirmDialog.__proto__ || _Object$getPrototypeOf(ConfirmDialog)).call(this, props));

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

  _createClass(ConfirmDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var isMobile = this.state.isMobile;

      var dialogStyle = {
        width: isMobile ? '320px' : '640px',
        height: isMobile ? 'auto' : '340px'
      };

      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          _Dialog,
          _extends({
            className: 'confirm-dialog',
            style: _extends({}, dialogStyle),
            autoFocus: false,
            footerAlign: 'center',
            title: '\u5220\u9664\u63D0\u793A',
            onOk: this.hideDialog,
            onCancel: this.hideDialog,
            onClose: this.hideDialog
          }, this.props, {
            visible: this.state.visible
          }),
          React.createElement(
            'div',
            { style: styles.dialogContent },
            React.createElement('img', {
              style: styles.icon,
              src: '//img.alicdn.com/tfs/TB1PTrfb_nI8KJjy0FfXXcdoVXa-52-52.png',
              srcSet: '//img.alicdn.com/tfs/TB1c5feb46I8KJjy0FgXXXXzVXa-104-104.png',
              alt: ''
            }),
            React.createElement(
              'p',
              { style: styles.text },
              this.props.text ? this.props.text : '你确定要删除此条内容吗？'
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

  return ConfirmDialog;
}(Component), _class.displayName = 'ConfirmDialog', _temp);
export { ConfirmDialog as default };


var styles = {
  icon: {
    width: '52px',
    height: '52px',
    marginTop: '26px',
    marginBottom: '10px'
  },
  dialogContent: {
    height: '160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: '16px;'
  }
};