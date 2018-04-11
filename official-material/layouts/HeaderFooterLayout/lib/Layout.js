import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-undef:0 */
import React, { PureComponent } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { enquireScreen } from 'enquire-js';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
import './scss/light.scss';
import './scss/dark.scss';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
var theme = typeof THEME === 'undefined' ? 'dark' : THEME;

var BasicLayout = (_temp = _class = function (_PureComponent) {
  _inherits(BasicLayout, _PureComponent);

  function BasicLayout(props) {
    _classCallCheck(this, BasicLayout);

    var _this = _possibleConstructorReturn(this, (BasicLayout.__proto__ || _Object$getPrototypeOf(BasicLayout)).call(this, props));

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

  _createClass(BasicLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }

    /**
     * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
     */

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        Layout,
        {
          style: { minHeight: '100vh' },
          className: cx('ice-design-header-footer-layout-' + theme, {
            'ice-design-layout': true
          })
        },
        React.createElement(Header, { theme: theme, isMobile: this.state.isMobile }),
        React.createElement(
          Layout.Main,
          { className: 'ice-design-layout-body' },
          this.props.children
        ),
        React.createElement(Footer, null)
      );
    }
  }]);

  return BasicLayout;
}(PureComponent), _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { BasicLayout as default };