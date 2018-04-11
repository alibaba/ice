import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Icon from '@icedesign/base/lib/icon';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Tab from '@icedesign/base/lib/tab';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import axios from 'axios';

import './DownloadCard.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;
var TabPane = _Tab.TabPane;
var DownloadCard = (_temp = _class = function (_Component) {
  _inherits(DownloadCard, _Component);

  function DownloadCard(props) {
    _classCallCheck(this, DownloadCard);

    var _this = _possibleConstructorReturn(this, (DownloadCard.__proto__ || _Object$getPrototypeOf(DownloadCard)).call(this, props));

    _this.getData = function () {
      axios.get('/mock/download-card.json').then(function (response) {
        _this.setState({
          tabData: response.data.data || {}
        });
      }).catch(function (error) {
        console.log(error);
      });
    };

    _this.renderContent = function (data) {
      return data.map(function (item, index) {
        return React.createElement(
          Col,
          { key: index },
          React.createElement(
            'div',
            { key: index, style: styles.columnCardItem },
            React.createElement(
              'div',
              { style: styles.cardBody },
              React.createElement(
                'div',
                { style: styles.avatarWrapper },
                React.createElement('img', { style: styles.img, src: item.img, alt: '\u5934\u50CF' })
              ),
              React.createElement(
                'p',
                { style: styles.title },
                item.title
              ),
              React.createElement(
                'p',
                { style: styles.desc },
                item.desc
              )
            ),
            React.createElement(
              'div',
              { style: styles.downloadButtons },
              React.createElement(
                _Button,
                {
                  href: item.androidSDK,
                  download: true,
                  style: styles.leftButton,
                  type: 'primary'
                },
                React.createElement(_Icon, { type: 'download' }),
                ' Android SDK'
              ),
              React.createElement(
                _Button,
                {
                  href: item.iosSDK,
                  download: true,
                  style: styles.rightButton,
                  type: 'primary'
                },
                React.createElement(_Icon, { type: 'download' }),
                ' IOS SDK'
              )
            ),
            React.createElement(
              'div',
              { style: styles.cardBottom },
              React.createElement(
                'a',
                { href: item.version, style: styles.bottomText },
                '\u7248\u672C\u8BB0\u5F55'
              ),
              React.createElement(
                'a',
                { href: item.docs, style: styles.bottomText },
                '\u96C6\u6210\u6587\u6863'
              ),
              React.createElement(
                'a',
                { href: item.guide, style: styles.bottomText },
                '\u4F7F\u7528\u6307\u5357'
              ),
              React.createElement(
                'a',
                { href: item.faq, style: styles.bottomText },
                'FAQ'
              )
            )
          )
        );
      });
    };

    _this.state = {
      tabData: {}
    };
    return _this;
  }

  /**
   * 异步获取数据
   */


  _createClass(DownloadCard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getData();
    }
  }, {
    key: 'render',
    value: function render() {
      var tabData = this.state.tabData;

      return React.createElement(
        'div',
        { className: 'download-card', style: styles.downloadCard },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Tab,
            { type: 'bar', contentStyle: { padding: '20px 5px' } },
            React.createElement(
              TabPane,
              { tab: '\u5BA2\u6237\u7AEFSDK', key: '1' },
              React.createElement(
                Row,
                { gutter: '20', wrap: true },
                tabData.clientSDK ? this.renderContent(tabData.clientSDK) : '暂无数据'
              )
            ),
            React.createElement(
              TabPane,
              { tab: '\u670D\u52A1\u7AEFSDK', key: '2' },
              React.createElement(
                Row,
                { gutter: '20', wrap: true },
                tabData.serverSDK ? this.renderContent(tabData.serverSDK) : '暂无数据'
              )
            )
          )
        )
      );
    }
  }]);

  return DownloadCard;
}(Component), _class.displayName = 'DownloadCard', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { DownloadCard as default };


var styles = {
  columnCardItem: {
    marginBottom: 20,
    position: 'relative',
    float: 'left',
    width: '100%',
    minWidth: '284px',
    // height: '280px',
    padding: '0px',
    overflow: 'hidden',
    boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.1),0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    background: '#fff'
  },
  cardBody: {
    textAlign: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #dedede'
  },
  avatarWrapper: {
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    margin: '0 auto'
  },
  title: {
    fontSize: '20px',
    margin: '10px'
  },
  desc: {
    fontSize: '15px',
    color: '#999'
  },
  downloadButtons: {
    margin: '15px 0',
    textAlign: 'center'
  },
  rightButton: {
    width: '114px',
    fontSize: '13px',
    marginLeft: '10px'
  },
  leftButton: {
    width: '114px',
    fontSize: '13px'
  },
  cardBottom: {
    padding: '10px 10px',
    background: '#f6f7f9'
  },
  bottomText: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#666',
    textDecoration: 'none'
  },
  img: {
    width: '100%'
  }
};