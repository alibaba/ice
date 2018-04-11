import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
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

import IceEllipsis from '@icedesign/ellipsis';
import axios from 'axios';

var Row = _Grid.Row,
    Col = _Grid.Col;
var TabPane = _Tab.TabPane;
var InfoDisplayTab = (_temp = _class = function (_Component) {
  _inherits(InfoDisplayTab, _Component);

  function InfoDisplayTab(props) {
    _classCallCheck(this, InfoDisplayTab);

    var _this = _possibleConstructorReturn(this, (InfoDisplayTab.__proto__ || _Object$getPrototypeOf(InfoDisplayTab)).call(this, props));

    _this.getData = function () {
      axios.get('/mock/info-display-tab.json').then(function (response) {
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
          { xxs: '24', s: '12', l: '8', key: index },
          React.createElement(
            'div',
            { style: styles.columnCard },
            React.createElement(
              'div',
              { style: styles.cardTitle },
              item.title
            ),
            React.createElement(
              'div',
              { style: styles.cardDescWrapper },
              React.createElement(
                'div',
                { style: styles.cardDesc },
                React.createElement(IceEllipsis, { lineLimit: 6, text: item.desc })
              )
            ),
            React.createElement(
              'div',
              { style: styles.cardBtnWrapper },
              React.createElement(
                _Button,
                {
                  type: 'primary',
                  component: 'a',
                  href: 'http://www.taobao.com',
                  target: '_blank',
                  size: 'large'
                },
                '\u7533\u8BF7\u9891\u9053'
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


  _createClass(InfoDisplayTab, [{
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
        { className: 'info-display-tab' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Tab,
            { type: 'bar', onChange: this.callback },
            React.createElement(
              TabPane,
              { tab: '\u5168\u90E8\u9891\u9053', key: '1' },
              React.createElement(
                Row,
                { wrap: true, gutter: 20 },
                tabData.all ? this.renderContent(tabData.all) : '暂无数据'
              )
            ),
            React.createElement(
              TabPane,
              { tab: '\u53EF\u7533\u8BF7\u9891\u9053', key: '2' },
              React.createElement(
                Row,
                { wrap: true, gutter: 20 },
                tabData.apply ? this.renderContent(tabData.apply) : '暂无数据'
              )
            ),
            React.createElement(
              TabPane,
              { tab: '\u5DF2\u83B7\u5F97\u9891\u9053', key: '3' },
              React.createElement(
                Row,
                { wrap: true, gutter: 20 },
                tabData.existing ? this.renderContent(tabData.existing) : '暂无数据'
              )
            )
          )
        )
      );
    }
  }]);

  return InfoDisplayTab;
}(Component), _class.displayName = 'InfoDisplayTab', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { InfoDisplayTab as default };


var styles = {
  columnCard: {
    overflow: 'hidden',
    boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.1),0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    background: '#fff',
    height: '280px',
    marginBottom: '20px'
  },
  cardDescWrapper: {
    marginTop: '20px'
  },
  cardTitle: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '22px'
  },
  cardDesc: {
    padding: '0 20px',
    height: '144px',
    overflow: 'hidden',
    lineHeight: '24px',
    fontSize: '14px',
    color: '#666',
    margin: '5px auto 0 auto'
  },
  cardBtnWrapper: {
    textAlign: 'center',
    marginTop: '15px'
  }
};