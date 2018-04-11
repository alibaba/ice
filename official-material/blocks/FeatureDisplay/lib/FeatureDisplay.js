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


var data = [{
  title: '虚拟主机-入门版',
  description: '1G 磁盘空间；10G 流量；100M 带宽；PHP/Python/Ruby 支持；MySQL/PgSQL 支持；支持 1 站点；免费自动安装SSL证书；免费安装/搬家网站',
  imgUrl: 'https://img.alicdn.com/tfs/TB1RBTKi4rI8KJjy0FpXXb5hVXa-456-456.png'
}, {
  title: '虚拟主机-大流量',
  description: '5G 磁盘空间；50G 流量；100M 带宽；PHP/Python/Ruby 支持；MySQL/PgSQL 支持；支持 5 站点；免费自动安装SSL证书；免费安装/搬家网站',
  imgUrl: 'https://img.alicdn.com/tfs/TB1LN_Ai9_I8KJjy0FoXXaFnVXa-450-453.png'
}, {
  title: '虚拟主机-高速洛杉矶',
  description: '20G 磁盘空间；50G 流量；100M 带宽；PHP/Python/Ruby 支持；MySQL/PgSQL 支持；支持 1 站点；免费自动安装SSL证书；免费安装/搬家网站',
  imgUrl: 'https://img.alicdn.com/tfs/TB1K3JmgOqAXuNjy1XdXXaYcVXa-450-450.png'
}, {
  title: '洛杉矶 OVZ-VPS',
  description: '10G 磁盘空间；1/512M CPU/内存；50M 带宽；1独立 IPV4；2G DDOS防御；300G 流量；免费安装管理面板',
  imgUrl: 'https://img.alicdn.com/tfs/TB124gfiY_I8KJjy1XaXXbsxpXa-450-453.png'
}, {
  title: '洛杉矶 KVM-VPS',
  description: '15G 磁盘空间；1/1024M CPU/内存；50M 带宽；1独立 IPV4；2G DDOS防御；500G 流量；免费安装管理面板',
  imgUrl: 'https://img.alicdn.com/tfs/TB1s4T4i2DH8KJjy1XcXXcpdXXa-450-450.png'
}, {
  title: '云电商系统',
  description: '微信商城/PC商城（增值）；会员粉丝动态管理；全网订单处理；智慧仓库管理；电脑、平板、手机，多终端收银；自动售货机交互屏多种支撑硬件；终身免费技术指导',
  imgUrl: 'https://img.alicdn.com/tfs/TB1oEe3i8fH8KJjy1XbXXbLdXXa-453-453.png'
}];

var FeatureDisplay = (_temp = _class = function (_Component) {
  _inherits(FeatureDisplay, _Component);

  function FeatureDisplay(props) {
    _classCallCheck(this, FeatureDisplay);

    var _this = _possibleConstructorReturn(this, (FeatureDisplay.__proto__ || _Object$getPrototypeOf(FeatureDisplay)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(FeatureDisplay, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'feature-display', style: styles.container },
        React.createElement(
          'div',
          { style: styles.items },
          React.createElement(
            Row,
            { gutter: '20', wrap: true },
            data.map(function (item, index) {
              return React.createElement(
                Col,
                { key: index, xxs: '24', s: '12', l: '8' },
                React.createElement(
                  'div',
                  { style: styles.item },
                  React.createElement('img', { src: item.imgUrl, style: styles.image, alt: '' }),
                  React.createElement(
                    'h3',
                    { style: styles.title },
                    item.title
                  ),
                  React.createElement(
                    'p',
                    { style: styles.description },
                    item.description
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return FeatureDisplay;
}(Component), _class.displayName = 'FeatureDisplay', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { FeatureDisplay as default };


var styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '0 80px'
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    textAlign: 'center',
    padding: '0 30px',
    margin: '40px 0'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px'
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%'
  },
  description: {
    fontSize: '13px',
    lineHeight: '22px',
    color: '#999'
  }
};