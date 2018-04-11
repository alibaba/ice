import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Balloon from '@icedesign/base/lib/balloon';
import _Icon from '@icedesign/base/lib/icon';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';

import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router';
import { headerNavs } from './__navs__';
import Logo from './__components_Logo__';

var Header = function (_PureComponent) {
  _inherits(Header, _PureComponent);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || _Object$getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          theme = _props.theme,
          isMobile = _props.isMobile,
          className = _props.className,
          style = _props.style,
          others = _objectWithoutProperties(_props, ['width', 'theme', 'isMobile', 'className', 'style']);

      return React.createElement(
        Layout.Header,
        _extends({}, others, {
          theme: theme,
          className: cx('ice-design-layout-header', className),
          style: _extends({}, style, { width: width })
        }),
        React.createElement(Logo, null),
        React.createElement(
          'div',
          {
            className: 'ice-design-layout-header-menu',
            style: { display: 'flex' }
          },
          headerNavs && headerNavs.length > 0 ? React.createElement(
            Menu,
            { mode: 'horizontal', selectedKeys: [] },
            headerNavs.map(function (nav, idx) {
              var linkProps = {};
              if (nav.newWindow) {
                linkProps.href = nav.to;
                linkProps.target = '_blank';
              } else if (nav.external) {
                linkProps.href = nav.to;
              } else {
                linkProps.to = nav.to;
              }
              return React.createElement(
                Menu.Item,
                { key: idx },
                React.createElement(
                  Link,
                  linkProps,
                  nav.icon ? React.createElement(FoundationSymbol, { type: nav.icon, size: 'small' }) : null,
                  !isMobile ? nav.text : null
                )
              );
            })
          ) : null,
          React.createElement(
            _Balloon,
            {
              trigger: React.createElement(
                'div',
                {
                  className: 'ice-design-header-userpannel',
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 12
                  }
                },
                React.createElement(IceImg, {
                  height: 40,
                  width: 40,
                  src: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
                  className: 'user-avatar'
                }),
                React.createElement(
                  'div',
                  { className: 'user-profile' },
                  React.createElement(
                    'span',
                    { className: 'user-name', style: { fontSize: '13px' } },
                    '\u6DD8\u5C0F\u5B9D'
                  ),
                  React.createElement('br', null),
                  React.createElement(
                    'span',
                    {
                      className: 'user-department',
                      style: { fontSize: '12px' }
                    },
                    '\u6280\u672F\u90E8'
                  )
                ),
                React.createElement(_Icon, {
                  type: 'arrow-down-filling',
                  size: 'xxs',
                  className: 'icon-down'
                })
              ),
              closable: false,
              className: 'user-profile-menu'
            },
            React.createElement(
              'ul',
              null,
              React.createElement(
                'li',
                { className: 'user-profile-menu-item' },
                React.createElement(
                  Link,
                  { to: '/' },
                  React.createElement(FoundationSymbol, { type: 'person', size: 'small' }),
                  '\u6211\u7684\u4E3B\u9875'
                )
              ),
              React.createElement(
                'li',
                { className: 'user-profile-menu-item' },
                React.createElement(
                  Link,
                  { to: '/' },
                  React.createElement(FoundationSymbol, { type: 'repair', size: 'small' }),
                  '\u8BBE\u7F6E'
                )
              ),
              React.createElement(
                'li',
                { className: 'user-profile-menu-item' },
                React.createElement(
                  Link,
                  { to: '/' },
                  React.createElement(FoundationSymbol, { type: 'compass', size: 'small' }),
                  '\u9000\u51FA'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Header;
}(PureComponent);

export { Header as default };