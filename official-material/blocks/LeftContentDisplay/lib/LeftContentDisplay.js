import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';

var LeftContentDisplay = (_temp = _class = function (_Component) {
  _inherits(LeftContentDisplay, _Component);

  function LeftContentDisplay(props) {
    _classCallCheck(this, LeftContentDisplay);

    var _this = _possibleConstructorReturn(this, (LeftContentDisplay.__proto__ || _Object$getPrototypeOf(LeftContentDisplay)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.state = {
      isMobile: false
    };
    return _this;
  }

  _createClass(LeftContentDisplay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var contentStyle = {
        height: this.state.isMobile ? '300px' : '600px'
      };
      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          'div',
          { style: _extends({}, styles.content, contentStyle) },
          React.createElement(
            'div',
            { style: styles.col },
            React.createElement(
              'h2',
              { style: styles.title },
              '\u529F\u80FD\u63CF\u8FF0'
            ),
            React.createElement(
              'p',
              { style: styles.description },
              '\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848\uFF0C\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848'
            )
          ),
          React.createElement(
            'div',
            { style: styles.col },
            React.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1MgyDjsLJ8KJjy0FnXXcFDpXa-618-1046.png',
              alt: 'img',
              style: styles.image
            })
          )
        )
      );
    }
  }]);

  return LeftContentDisplay;
}(Component), _class.displayName = 'LeftContentDisplay', _temp);
export { LeftContentDisplay as default };


var styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0'
  },
  content: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    overflow: 'hidden'
  },
  col: {
    width: '50%',
    padding: '0 20px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold'
  },
  description: {
    color: '#666',
    lineHeight: '22px'
  },
  image: {
    position: 'absolute',
    top: '20px',
    width: '40%'
  }
};