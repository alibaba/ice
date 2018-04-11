import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { Link } from 'react-router';
import './LandingIntroBanner.scss';

// 寻找背景图片可以从 https://unsplash.com/ 寻找
var backgroundImage = 'https://img.alicdn.com/tfs/TB1j9kWgvDH8KJjy1XcXXcpdXXa-1680-870.jpg';

var LandingIntroBanner = (_temp = _class = function (_Component) {
  _inherits(LandingIntroBanner, _Component);

  function LandingIntroBanner(props) {
    _classCallCheck(this, LandingIntroBanner);

    var _this = _possibleConstructorReturn(this, (LandingIntroBanner.__proto__ || _Object$getPrototypeOf(LandingIntroBanner)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(LandingIntroBanner, [{
    key: 'render',
    value: function render() {
      // 登录介绍页面默认撑满一屏高度
      return React.createElement(
        'div',
        { className: 'landing-intro-banner-wrapper' },
        React.createElement(
          'div',
          { style: styles.landingIntro },
          React.createElement('div', {
            style: _extends({}, styles.landingIntroBackground, {
              backgroundImage: 'url(' + backgroundImage + ')'
            })
          }),
          React.createElement(
            'div',
            {
              className: 'landing-intro-banner-content-wrapper',
              style: styles.contentWrapper
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                'h2',
                { style: styles.title },
                '\u66F4\u5FEB\uFF0C\u66F4\u4F18\uFF0C\u66F4 Cool !',
                React.createElement('br', null),
                '\u6B22\u8FCE\u4F7F\u7528 ICE'
              ),
              React.createElement(
                'div',
                { style: styles.buttons },
                React.createElement(
                  Link,
                  { to: '/link-to-help-document' },
                  React.createElement(
                    _Button,
                    {
                      style: {
                        margin: '0 10px 20px',
                        height: 50,
                        padding: '0 58px',
                        fontSize: 16,
                        color: '#fff'
                      },
                      type: 'primary',
                      size: 'large',
                      shape: 'ghost'
                    },
                    '\u67E5\u770B\u5E2E\u52A9'
                  )
                ),
                React.createElement(
                  Link,
                  { to: '/link-to-dashboard' },
                  React.createElement(
                    _Button,
                    {
                      style: {
                        margin: '0 10px 20px',
                        height: 50,
                        padding: '0 58px',
                        fontSize: 16
                      },
                      type: 'primary',
                      size: 'large'
                    },
                    '\u7ACB\u5373\u4F7F\u7528'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return LandingIntroBanner;
}(Component), _class.displayName = 'LandingIntroBanner', _temp);
export { LandingIntroBanner as default };


var styles = {
  landingIntro: {
    position: 'relative',
    height: '100vh'
  },
  landingIntroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover'
  },
  contentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    letterSpacing: '1.94px',
    lineHeight: '48px'
  },
  buttons: { textAlign: 'center', marginTop: 70 }
};