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
import './BasicException.scss';

var BasicException = (_temp = _class = function (_Component) {
  _inherits(BasicException, _Component);

  function BasicException() {
    _classCallCheck(this, BasicException);

    return _possibleConstructorReturn(this, (BasicException.__proto__ || _Object$getPrototypeOf(BasicException)).apply(this, arguments));
  }

  _createClass(BasicException, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'basic-exception' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.exceptionContent, className: 'exception-content' },
            React.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1w4M7bNrI8KJjy0FpXXb5hVXa-260-260.png',
              style: styles.imgException,
              className: 'imgException',
              alt: '\u670D\u52A1\u5668\u51FA\u9519'
            }),
            React.createElement(
              'div',
              null,
              React.createElement(
                'h3',
                { style: styles.title, className: 'title' },
                '\u62B1\u6B49\uFF0C\u670D\u52A1\u5668\u51FA\u9519\u4E86'
              ),
              React.createElement(
                'p',
                { style: styles.description, className: 'description' },
                '\u670D\u52A1\u5668\u51FA\u9519\u4E86\uFF0C\u8BF7\u91CD\u65B0\u5237\u65B0\u9875\u9762\u6216\u8FD4\u56DE',
                React.createElement(
                  Link,
                  { to: '/' },
                  '\u9996\u9875'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return BasicException;
}(Component), _class.displayName = 'BasicException', _temp);
export { BasicException as default };


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