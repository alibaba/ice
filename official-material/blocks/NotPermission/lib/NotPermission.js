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
import IceContainer from '@icedesign/container';
import './NotPermission.scss';

var NotPermission = (_temp = _class = function (_Component) {
  _inherits(NotPermission, _Component);

  function NotPermission(props) {
    _classCallCheck(this, NotPermission);

    var _this = _possibleConstructorReturn(this, (NotPermission.__proto__ || _Object$getPrototypeOf(NotPermission)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(NotPermission, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'not-permission', style: styles.notPermission },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.content, className: 'exception-content' },
            React.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1Gy4Yjv6H8KJjy0FjXXaXepXa-780-780.png',
              style: styles.imgException,
              className: 'imgException',
              alt: 'prmission'
            }),
            React.createElement(
              'div',
              { style: styles.prompt },
              React.createElement(
                'h3',
                { style: styles.title, className: 'title' },
                '\u62B1\u6B49\uFF0C\u60A8\u65E0\u6743\u9650\uFF5E'
              ),
              React.createElement(
                'p',
                { style: styles.description, className: 'description' },
                '\u62B1\u6B49\uFF0C\u60A8\u6682\u65E0\u6743\u9650\uFF0C\u8BF7\u770B\u770B\u5176\u4ED6\u9875\u9762'
              )
            )
          )
        )
      );
    }
  }]);

  return NotPermission;
}(Component), _class.displayName = 'NotPermission', _temp);
export { NotPermission as default };


var styles = {
  content: {
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