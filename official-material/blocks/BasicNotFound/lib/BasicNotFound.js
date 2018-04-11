import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Link } from 'react-router';
import IceContainer from '@icedesign/container';
import './BasicNotFound.scss';

var BasicNotFound = (_temp = _class = function (_Component) {
  _inherits(BasicNotFound, _Component);

  function BasicNotFound() {
    _classCallCheck(this, BasicNotFound);

    return _possibleConstructorReturn(this, (BasicNotFound.__proto__ || _Object$getPrototypeOf(BasicNotFound)).apply(this, arguments));
  }

  _createClass(BasicNotFound, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'basic-not-found' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.exceptionContent, className: 'exception-content' },
            React.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png',
              style: styles.image,
              className: 'imgException',
              alt: '\u9875\u9762\u4E0D\u5B58\u5728'
            }),
            React.createElement(
              'div',
              { className: 'prompt' },
              React.createElement(
                'h3',
                { style: styles.title, className: 'title' },
                '\u62B1\u6B49\uFF0C\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728'
              ),
              React.createElement(
                'p',
                { style: styles.description, className: 'description' },
                '\u60A8\u8981\u627E\u7684\u9875\u9762\u6CA1\u6709\u627E\u5230\uFF0C\u8BF7\u8FD4\u56DE',
                React.createElement(
                  Link,
                  { to: '/' },
                  '\u9996\u9875'
                ),
                '\u7EE7\u7EED\u6D4F\u89C8'
              )
            )
          )
        )
      );
    }
  }]);

  return BasicNotFound;
}(Component), _class.displayName = 'BasicNotFound', _temp);
export { BasicNotFound as default };


var styles = {
  exceptionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#333'
  },
  description: {
    color: '#666'
  }
};