import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

var dataSource = [{
  nickName: '某某',
  datetime: '2分钟前',
  avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
  message: '刚刚完成了智能化搭建课程的学习'
}, {
  nickName: '某某',
  datetime: '3分钟前',
  avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
  message: '刚刚完成了 JavaScript 模块化打包课程的学习'
}, {
  nickName: '某某',
  datetime: '5分钟前',
  avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
  message: '刚刚完成了智能化搭建课程的学习'
}, {
  nickName: '某某',
  datetime: '1天前',
  avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
  message: '刚刚完成了智能化搭建课程的学习'
}, {
  nickName: '某某',
  datetime: '2天前',
  avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
  message: '刚刚完成了Sketch图形设计课程的学习，课程内容包括组件绘制，画布编辑等'
}];

var FeedList = (_temp = _class = function (_Component) {
  _inherits(FeedList, _Component);

  function FeedList(props) {
    _classCallCheck(this, FeedList);

    var _this = _possibleConstructorReturn(this, (FeedList.__proto__ || _Object$getPrototypeOf(FeedList)).call(this, props));

    _this.renderItem = function (item, idx) {
      return React.createElement(
        'div',
        { style: styles.item, key: idx },
        React.createElement(
          'div',
          { style: styles.itemRow },
          React.createElement(
            'span',
            { style: styles.title },
            React.createElement('img', { src: item.avatar, style: styles.avatar, alt: 'avatar' }),
            item.nickName,
            ' \u53D1\u5E03\u4E86\u4E00\u4E2A\u72B6\u6001'
          ),
          React.createElement(
            'span',
            { style: styles.status },
            item.datetime
          )
        ),
        React.createElement(
          'a',
          { href: '##', style: styles.message },
          item.message
        )
      );
    };

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期

  _createClass(FeedList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'feed-list' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.titleRow },
            React.createElement(
              'h2',
              { style: styles.cardTitle },
              '\u72B6\u6001\u5217\u8868'
            ),
            React.createElement(
              'span',
              { style: styles.status },
              '\u517110\u6761\u72B6\u6001'
            )
          ),
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
        )
      );
    }
  }]);

  return FeedList;
}(Component), _class.displayName = 'FeedList', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { FeedList as default };


var styles = {
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    display: 'inline-flex'
  },
  title: {
    fontSize: '14px',
    display: 'inline-flex',
    lineHeight: '22px'
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px'
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '10px'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    borderBottom: '1px solid #fafafa'
  },
  message: {
    color: '#999',
    fontSize: '12px',
    paddingLeft: '34px',
    marginBottom: '15px',
    lineHeight: '22px'
  },
  allMessage: {
    textAlign: 'center',
    height: '50px',
    lineHeight: '50px'
  }
};