import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
var Row = _Grid.Row,
    Col = _Grid.Col;
var FooterInfo = (_temp = _class = function (_Component) {
  _inherits(FooterInfo, _Component);

  function FooterInfo(props) {
    _classCallCheck(this, FooterInfo);

    var _this = _possibleConstructorReturn(this, (FooterInfo.__proto__ || _Object$getPrototypeOf(FooterInfo)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(FooterInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'footer-info', style: styles.container },
        React.createElement(
          'div',
          { style: styles.items },
          React.createElement(
            Row,
            { wrap: true, gutter: '20' },
            React.createElement(
              Col,
              { xxs: '24', s: '8', l: '8' },
              React.createElement(
                'div',
                { style: styles.item },
                React.createElement(
                  'h2',
                  { style: styles.itemTitle },
                  '\u4EA7\u54C1\u4ECB\u7ECD'
                ),
                React.createElement(
                  'ul',
                  { style: styles.nav },
                  React.createElement(
                    'li',
                    { style: styles.navItem },
                    React.createElement(
                      'a',
                      { style: styles.navLink, href: '/' },
                      '\u7EC4\u4EF6'
                    )
                  ),
                  React.createElement(
                    'li',
                    { style: styles.navItem },
                    React.createElement(
                      'a',
                      { style: styles.navLink, href: '/' },
                      '\u6A21\u5757'
                    )
                  )
                )
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', s: '8', l: '8' },
              React.createElement(
                'div',
                { style: styles.item },
                React.createElement(
                  'h2',
                  { style: styles.itemTitle },
                  '\u5408\u4F5C\u4F19\u4F34'
                ),
                React.createElement(
                  'ul',
                  { style: styles.nav },
                  React.createElement(
                    'li',
                    { style: styles.navItem },
                    React.createElement(
                      'a',
                      { style: styles.navLink, href: '/' },
                      '\u6DD8\u5B9D'
                    )
                  ),
                  React.createElement(
                    'li',
                    { style: styles.navItem },
                    React.createElement(
                      'a',
                      { style: styles.navLink, href: '/' },
                      '\u5929\u732B'
                    )
                  )
                )
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', s: '8', l: '8' },
              React.createElement(
                'div',
                { style: styles.item },
                React.createElement(
                  'h2',
                  { style: styles.itemTitle },
                  '\u5173\u6CE8\u6211\u4EEC'
                ),
                React.createElement(
                  'ul',
                  { style: styles.nav },
                  React.createElement(
                    'li',
                    { style: styles.navItem },
                    React.createElement(
                      'a',
                      { style: styles.navLink, href: '/' },
                      '\u65B0\u6D6A\u5FAE\u535A'
                    )
                  ),
                  React.createElement(
                    'li',
                    { style: styles.navItem },
                    React.createElement(
                      'a',
                      { style: styles.navLink, href: '/' },
                      '\u5FAE\u4FE1\u516C\u4F17\u53F7'
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          'p',
          { style: styles.copyRight },
          '\xA9 2017 Taobao FED'
        )
      );
    }
  }]);

  return FooterInfo;
}(Component), _class.displayName = 'FooterInfo', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { FooterInfo as default };


var styles = {
  container: {
    background: '#1861D5',
    padding: '80px 0',
    width: '100%'
  },
  items: {
    maxWidth: '1080px',
    margin: '0 auto'
  },
  item: {
    padding: '20px 30px',
    textAlign: 'center'
  },
  itemTitle: {
    margin: '0 0 10px',
    color: '#fff',
    fontSize: '24px'
  },
  navLink: {
    display: 'block',
    height: '32px',
    lineHeight: '32px',
    color: '#E1EEFF'
  },
  copyRight: {
    color: '#fff',
    textAlign: 'center'
  }
};