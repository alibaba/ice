import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Icon from '@icedesign/base/lib/icon';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';

import { Link } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import { enquire } from 'enquire-js';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
import Logo from './__components_Logo__';
import { asideNavs } from './__navs__';
import './scss/light.scss';
import './scss/dark.scss';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
var theme = typeof THEME === 'undefined' ? 'dark' : THEME;
var HeaderAsideFooterResponsiveLayout = (_temp = _class = function (_Component) {
  _inherits(HeaderAsideFooterResponsiveLayout, _Component);

  function HeaderAsideFooterResponsiveLayout(props) {
    _classCallCheck(this, HeaderAsideFooterResponsiveLayout);

    var _this = _possibleConstructorReturn(this, (HeaderAsideFooterResponsiveLayout.__proto__ || _Object$getPrototypeOf(HeaderAsideFooterResponsiveLayout)).call(this, props));

    _this.enquireScreenRegister = function () {
      var isMobile = 'screen and (max-width: 720px)';
      var isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
      var isDesktop = 'screen and (min-width: 1200px)';

      enquire.register(isMobile, _this.enquireScreenHandle('isMobile'));
      enquire.register(isTablet, _this.enquireScreenHandle('isTablet'));
      enquire.register(isDesktop, _this.enquireScreenHandle('isDesktop'));
    };

    _this.enquireScreenHandle = function (type) {
      var collapse = void 0;
      if (type === 'isMobile') {
        collapse = false;
      } else if (type === 'isTablet') {
        collapse = true;
      } else {
        collapse = _this.state.collapse;
      }

      var handler = {
        match: function match() {
          _this.setState({
            isScreen: type,
            collapse: collapse
          });
        },
        unmatch: function unmatch() {
          // handler unmatched
        }
      };

      return handler;
    };

    _this.toggleMenu = function () {
      var openDrawer = _this.state.openDrawer;

      _this.setState({
        openDrawer: !openDrawer
      });
    };

    _this.onMenuClick = function () {
      _this.toggleMenu();
    };

    _this.getOpenKeys = function () {
      var routes = _this.props.routes;

      var matched = routes[0].path;
      var openKeys = '';

      asideNavs && asideNavs.length > 0 && asideNavs.map(function (item, index) {
        if (item.to === matched) {
          openKeys = index;
        }
      });

      return openKeys;
    };

    _this.state = {
      openDrawer: false,
      isScreen: undefined
    };
    return _this;
  }

  _createClass(HeaderAsideFooterResponsiveLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }

    /**
     * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
     */


    /**
     * 响应式通过抽屉形式切换菜单
     */


    /**
     * 左侧菜单收缩切换
     */


    /**
     * 当前展开的菜单项
     */

  }, {
    key: 'render',
    value: function render() {
      var pathname = this.props.location.pathname;


      return React.createElement(
        Layout,
        {
          style: { minHeight: '100vh' },
          className: cx('ice-design-header-aside-footer-layout-' + theme, {
            'ice-design-layout': true
          })
        },
        React.createElement(Header, { theme: theme, isMobile: this.state.isScreen !== 'isDesktop' }),
        React.createElement(
          Layout.Section,
          { className: 'ice-design-layout-body' },
          this.state.isScreen !== 'isDesktop' && React.createElement(
            'a',
            { className: 'menu-btn', onClick: this.toggleMenu },
            React.createElement(_Icon, { type: 'category', size: 'small' })
          ),
          this.state.openDrawer && React.createElement('div', { className: 'open-drawer-bg', onClick: this.toggleMenu }),
          React.createElement(
            Layout.Aside,
            {
              width: 'auto',
              theme: theme,
              className: cx('ice-design-layout-aside', {
                'open-drawer': this.state.openDrawer
              })
            },
            this.state.isScreen !== 'isDesktop' && React.createElement(Logo, null),
            React.createElement(
              Menu,
              {
                style: { width: 200 },
                onClick: this.onMenuClick,
                selectedKeys: [pathname],
                defaultSelectedKeys: [pathname],
                defaultOpenKeys: ['' + this.getOpenKeys()],
                mode: 'inline'
              },
              asideNavs && asideNavs.length > 0 && asideNavs.map(function (nav, index) {
                if (nav.children && nav.children.length > 0) {
                  return React.createElement(
                    SubMenu,
                    {
                      key: index,
                      title: React.createElement(
                        'span',
                        null,
                        nav.icon ? React.createElement(FoundationSymbol, { size: 'small', type: nav.icon }) : null,
                        React.createElement(
                          'span',
                          { className: 'ice-menu-collapse-hide' },
                          nav.text
                        )
                      )
                    },
                    nav.children.map(function (item) {
                      var linkProps = {};
                      if (item.newWindow) {
                        linkProps.href = item.to;
                        linkProps.target = '_blank';
                      } else if (item.external) {
                        linkProps.href = item.to;
                      } else {
                        linkProps.to = item.to;
                      }
                      return React.createElement(
                        MenuItem,
                        { key: item.to },
                        React.createElement(
                          Link,
                          linkProps,
                          item.text
                        )
                      );
                    })
                  );
                }
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
                  MenuItem,
                  { key: nav.to },
                  React.createElement(
                    Link,
                    linkProps,
                    React.createElement(
                      'span',
                      null,
                      nav.icon ? React.createElement(FoundationSymbol, { size: 'small', type: nav.icon }) : null,
                      React.createElement(
                        'span',
                        { className: 'ice-menu-collapse-hide' },
                        nav.text
                      )
                    )
                  )
                );
              })
            )
          ),
          React.createElement(
            Layout.Main,
            null,
            this.props.children
          )
        ),
        React.createElement(Footer, null)
      );
    }
  }]);

  return HeaderAsideFooterResponsiveLayout;
}(Component), _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { HeaderAsideFooterResponsiveLayout as default };