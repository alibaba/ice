import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Tab from '@icedesign/base/lib/tab';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import './TagMessageList.scss';

var dataSource = [{ title: '关于淘宝网存储设备商品发布规范的公告', date: '2017/01/06' }, { title: '加强淘宝网电动四轮车类目准入的公告', date: '2017/01/06' }, { title: '淘宝网VR头盔商品发布规范的公告', date: '2017/01/06' }, { title: '加强淘宝网农药类目准入的公告', date: '2017/01/06' }, { title: '淘宝网2017年春节发货时间及交易超时调整公告', date: '2017/01/06' }];

var TagMessageList = (_temp = _class = function (_Component) {
  _inherits(TagMessageList, _Component);

  function TagMessageList(props) {
    _classCallCheck(this, TagMessageList);

    var _this = _possibleConstructorReturn(this, (TagMessageList.__proto__ || _Object$getPrototypeOf(TagMessageList)).call(this, props));

    _this.renderItem = function (item, idx) {
      return React.createElement(
        'div',
        { style: styles.item, key: idx },
        React.createElement(
          'a',
          { href: '##', style: styles.title },
          item.title
        ),
        React.createElement(
          'div',
          { style: styles.date },
          item.date
        )
      );
    };

    _this.state = {};
    return _this;
  }

  _createClass(TagMessageList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'tag-message-list' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Tab,
            { size: 'small' },
            React.createElement(
              _Tab.TabPane,
              { key: 0, tab: '\u6211\u7684\u6D88\u606F' },
              dataSource.map(this.renderItem),
              React.createElement(
                'div',
                { style: styles.allMessage },
                React.createElement(
                  'a',
                  { href: '##' },
                  '\u67E5\u770B\u5168\u90E8\u6D88\u606F'
                )
              )
            ),
            React.createElement(
              _Tab.TabPane,
              { key: 1, tab: '\u5F85\u6211\u5904\u7406' },
              React.createElement(
                'p',
                null,
                '\u6682\u65E0\u6570\u636E'
              )
            )
          )
        )
      );
    }
  }]);

  return TagMessageList;
}(Component), _class.displayName = 'TagMessageList', _temp);
export { TagMessageList as default };


var styles = {
  allMessage: {
    marginTop: '20px',
    textAlign: 'center'
  },
  item: {
    borderBottom: '1px solid #F4F4F4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 0'
  },
  title: {
    fontSize: '14px',
    color: '#666'
  },
  date: {
    fontSize: '12px',
    color: '#666'
  }
};