import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';


var dataSource = [{
  title: '消息标题',
  message: '这里是消息的一些详细说明。',
  datetime: '07-07 18:36'
}, {
  title: '消息标题',
  message: '这里是消息的一些详细说明。',
  datetime: '07-07 18:36'
}, {
  title: '消息标题',
  message: '这里是消息的一些详细说明。',
  datetime: '07-07 18:36'
}, {
  title: '消息标题',
  message: '这里是消息的一些详细说明。',
  datetime: '07-07 18:36'
}, {
  title: '消息标题',
  message: '这里是消息的一些详细说明。',
  datetime: '07-07 18:36'
}];

var MessageList = (_temp = _class = function (_Component) {
  _inherits(MessageList, _Component);

  function MessageList(props) {
    _classCallCheck(this, MessageList);

    var _this = _possibleConstructorReturn(this, (MessageList.__proto__ || _Object$getPrototypeOf(MessageList)).call(this, props));

    _this.renderItem = function (item, idx) {
      return React.createElement(
        'div',
        { style: styles.item, key: idx },
        React.createElement(
          'div',
          { style: styles.title },
          item.title,
          React.createElement(
            'span',
            { style: styles.datetime },
            item.datetime
          )
        ),
        React.createElement(
          'div',
          { style: styles.message },
          item.message
        )
      );
    };

    _this.state = {};
    return _this;
  }

  _createClass(MessageList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'message-list', style: styles.messageList },
        React.createElement(
          IceContainer,
          null,
          dataSource.map(this.renderItem),
          React.createElement(
            'div',
            { style: styles.paginationWarp },
            React.createElement(_Pagination, null)
          )
        )
      );
    }
  }]);

  return MessageList;
}(Component), _class.displayName = 'MessageList', _temp);
export { MessageList as default };


var styles = {
  item: {
    borderBottom: '1px solid #eee',
    margin: '0 0 20px'
  },
  title: {
    fontSize: '14px',
    color: '#444',
    marginBottom: '10px',
    position: 'relative'
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    paddingTop: '10px',
    fontSize: '12px',
    color: '#999'
  },
  message: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '10px'
  },
  paginationWarp: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  messageList: {}
};