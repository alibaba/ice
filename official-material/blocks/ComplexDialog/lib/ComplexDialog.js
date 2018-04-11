import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Dialog from '@icedesign/base/lib/dialog';
import _Icon from '@icedesign/base/lib/icon';
import _Button from '@icedesign/base/lib/button';
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

var ComplexDialog = (_temp = _class = function (_Component) {
  _inherits(ComplexDialog, _Component);

  function ComplexDialog(props) {
    _classCallCheck(this, ComplexDialog);

    var _this = _possibleConstructorReturn(this, (ComplexDialog.__proto__ || _Object$getPrototypeOf(ComplexDialog)).call(this, props));

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

    _this.renderFooter = function () {
      return React.createElement(
        'div',
        { style: styles.footer },
        React.createElement(
          _Button,
          { onClick: _this.hideDialog },
          '\u7A0D\u540E\u524D\u5F80'
        ),
        React.createElement(
          _Button,
          { onClick: _this.hideDialog, type: 'primary' },
          '\u524D\u5F80\u8BA4\u8BC1'
        )
      );
    };

    _this.state = {
      visible: false,
      isMobile: false
    };
    return _this;
  }

  _createClass(ComplexDialog, [{
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
            className: 'complex-dialog',
            style: _extends({}, dialogStyle),
            autoFocus: false,
            footer: this.renderFooter(),
            title: '\u5165\u9A7B\u6210\u529F',
            isFullScreen: true,
            onClose: this.hideDialog
          }, this.props, {
            visible: this.state.visible
          }),
          React.createElement(
            'div',
            { style: styles.dialogContent },
            React.createElement('img', {
              style: styles.icon,
              src: '//img.alicdn.com/tfs/TB1GOHLXyqAXuNjy1XdXXaYcVXa-52-52.png',
              srcSet: '//img.alicdn.com/tfs/TB1h_K_b4rI8KJjy0FpXXb5hVXa-104-104.png',
              alt: ''
            }),
            React.createElement(
              'div',
              { style: styles.info },
              '\u606D\u559C\u60A8\u6210\u529F\u521B\u4F5C\u5E73\u53F0',
              React.createElement('br', null),
              '\u73B0\u5728\u53EF\u4EE5\u8BA4\u8BC1\u7B26\u5408\u81EA\u5DF1\u7684\u89D2\u8272\u5566'
            ),
            React.createElement(
              'div',
              { style: styles.extraInfo },
              '\u89D2\u8272\u662F\u6DD8\u5B9D\u4E2D\u5BF9\u8FBE\u4EBA\u7684XXX\uFF0C\u901A\u8FC7\u89D2\u8272\u60A8\u5C06\u83B7\u5F97\u7279\u6743'
            ),
            React.createElement(
              'div',
              { style: styles.authList },
              React.createElement(
                'div',
                { style: styles.authItem },
                React.createElement(_Icon, { style: styles.authItemIcon, size: 'xs', type: 'select' }),
                'V \u6807\u5934\u50CF'
              ),
              React.createElement(
                'div',
                { style: styles.authItem },
                React.createElement(_Icon, { style: styles.authItemIcon, size: 'xs', type: 'select' }),
                '\u89D2\u8272\u6807\u5FD7'
              ),
              React.createElement(
                'div',
                { style: styles.authItem },
                React.createElement(_Icon, { style: styles.authItemIcon, size: 'xs', type: 'select' }),
                '\u4F18\u5148\u53D1\u8868'
              )
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

  return ComplexDialog;
}(Component), _class.displayName = 'ComplexDialog', _temp);
export { ComplexDialog as default };


var styles = {
  icon: {
    width: '52px',
    height: '52px'
  },
  dialogContent: {
    // width: '640px',
    // height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  info: {
    marginTop: '10px',
    fontSize: '16px',
    textAlign: 'center'
  },
  extraInfo: {
    marginTop: '12px',
    fontSize: '12px',
    color: '#999999'
  },
  authList: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#999999'
  },
  authItem: {
    marginTop: '5px'
  },
  authItemIcon: {
    color: '#2ECA9C',
    marginRight: '5px'
  },
  footer: {
    marginTop: '10px',
    marginBottom: '10px',
    textAlign: 'center'
  }
};