import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';


var dataSource = [{
  title: '关于淘宝网存储设备商品发布规范的公告',
  tag: 'up',
  href: '',
  time: '2017-11-29'
}, {
  title: '加强淘宝网电动四轮车类目准入的公告',
  tag: 'new',
  href: '',
  time: '2017-10-29'
}, {
  title: '淘宝网VR头盔商品发布规范的公告',
  tag: 'hot',
  href: '',
  time: '2017-03-11'
}, {
  title: '加强淘宝网农药类目准入的公告',
  tag: '',
  href: '',
  time: '2017-02-16'
}, {
  title: '淘宝网2017年春节发货时间及交易超时调整公告',
  tag: '',
  href: '',
  time: '2017-11-23'
}];

var dict = {
  up: '置顶',
  hot: '新',
  new: '热'
};

var SystemNoticeList = (_temp = _class = function (_Component) {
  _inherits(SystemNoticeList, _Component);

  function SystemNoticeList(props) {
    _classCallCheck(this, SystemNoticeList);

    var _this = _possibleConstructorReturn(this, (SystemNoticeList.__proto__ || _Object$getPrototypeOf(SystemNoticeList)).call(this, props));

    _this.handleChange = function (current) {
      console.log('current:', current);
      _this.setState({ current: current });
    };

    _this.state = {
      current: 2
    };
    return _this;
  }

  _createClass(SystemNoticeList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'system-notice-list' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { className: 'notice-list-content' },
            React.createElement(
              'h2',
              { style: styles.title },
              '\u7CFB\u7EDF\u516C\u544A'
            ),
            React.createElement(
              'ul',
              { style: styles.noticeList },
              dataSource.map(function (item, index) {
                return React.createElement(
                  'li',
                  { key: index, style: styles.noticeItem },
                  React.createElement(
                    'a',
                    { href: item.href, style: styles.noticeTitle },
                    item.title
                  ),
                  item.tag && React.createElement(
                    'span',
                    {
                      style: _extends({}, styles.noticeTag, styles[item.tag])
                    },
                    dict[item.tag]
                  ),
                  React.createElement(
                    'span',
                    { style: styles.noticeTime },
                    item.time
                  )
                );
              })
            )
          ),
          React.createElement(
            'div',
            { style: styles.paginationWrap },
            React.createElement(_Pagination, {
              shape: 'arrow-only',
              current: this.state.current,
              onChange: this.handleChange
            })
          )
        )
      );
    }
  }]);

  return SystemNoticeList;
}(Component), _class.displayName = 'SystemNoticeList', _temp);
export { SystemNoticeList as default };


var styles = {
  title: {
    margin: '0 0 10px',
    fontSize: '18px'
  },
  noticeList: {
    margin: 0,
    padding: 0
  },
  noticeItem: {
    position: 'relative',
    padding: '12px 0',
    paddingRight: '65px',
    listStyle: 'none',
    borderBottom: '1px solid #F4F4F4'
  },
  noticeTitle: {
    fontSize: '14px',
    color: '#666',
    textDecoration: 'none'
  },
  noticeTag: {
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '8px',
    marginLeft: '5px'
  },
  noticeTime: {
    position: 'absolute',
    right: '0px',
    top: '15px',
    fontSize: '12px',
    color: '#999'
  },
  paginationWrap: {
    marginTop: '20px',
    textAlign: 'right'
  },
  up: {
    color: '#4296ff',
    background: '#eff6ff'
  },
  new: {
    color: '#fca61c',
    background: '#fff4e2'
  },
  hot: {
    color: '#f86d6d',
    background: '#ffe8e8'
  }
};