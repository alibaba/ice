import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
var Row = _Grid.Row,
    Col = _Grid.Col;
var Footer = (_temp = _class = function (_Component) {
  _inherits(Footer, _Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || _Object$getPrototypeOf(Footer)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'footer', style: styles.footer },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            Row,
            { wrap: true, style: styles.content },
            React.createElement(
              Col,
              { xxs: 24, m: 6 },
              React.createElement(
                'h2',
                { style: styles.logo },
                'LOGO'
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, m: 12 },
              React.createElement(
                'ul',
                { style: styles.nav },
                React.createElement(
                  'li',
                  { style: styles.navItem },
                  React.createElement(
                    'a',
                    { style: styles.navLink, href: '/' },
                    '\u9996\u9875'
                  )
                ),
                React.createElement(
                  'li',
                  { style: styles.navItem },
                  React.createElement(
                    'a',
                    { style: styles.navLink, href: '/' },
                    '\u8054\u7CFB'
                  )
                ),
                React.createElement(
                  'li',
                  { style: styles.navItem },
                  React.createElement(
                    'a',
                    { style: styles.navLink, href: '/' },
                    '\u6761\u6B3E'
                  )
                ),
                React.createElement(
                  'li',
                  { style: styles.navItem },
                  React.createElement(
                    'a',
                    { style: styles.navLink, href: '/' },
                    '\u5173\u4E8E'
                  )
                )
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, m: 6, style: styles.share },
              React.createElement('img', {
                style: styles.shareIcon,
                src: 'https://img.alicdn.com/tfs/TB1JkgmjnnI8KJjy0FfXXcdoVXa-60-48.png',
                alt: ''
              }),
              React.createElement('img', {
                style: _extends({}, styles.shareIcon, styles.weChart),
                src: 'https://img.alicdn.com/tfs/TB1hEz2jf6H8KJjy0FjXXaXepXa-60-48.png',
                alt: ''
              })
            ),
            React.createElement(
              'p',
              { style: styles.copyRight },
              ' \xA9 2017 Taobao FED'
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(Component), _class.displayName = 'Footer', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { Footer as default };


var styles = {
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto'
  },
  logo: {
    color: '#3080FE',
    fontWeight: 'bold',
    fontSize: '28px',
    margin: '12px 0'
  },
  nav: {
    width: '400px',
    margin: '0 auto',
    display: 'flex'
  },
  navItem: {
    width: '25%',
    lineHeight: '54px',
    textAlign: 'center'
  },
  navLink: {
    color: '#666',
    display: 'block'
  },
  share: {
    lineHeight: '54px',
    textAlign: 'center'
  },
  shareIcon: {
    width: '22px',
    height: '16px'
  },
  weChart: {
    marginLeft: '20px'
  },
  copyRight: {
    display: 'flex',
    width: '100%',
    marginTop: '40px',
    justifyContent: 'center',
    fontSize: '12px'
  }
};