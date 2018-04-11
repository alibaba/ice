import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Button from '@icedesign/base/lib/button';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import './ArticleList.scss';

var ArticleList = (_temp = _class = function (_Component) {
  _inherits(ArticleList, _Component);

  function ArticleList(props) {
    _classCallCheck(this, ArticleList);

    var _this = _possibleConstructorReturn(this, (ArticleList.__proto__ || _Object$getPrototypeOf(ArticleList)).call(this, props));

    _this.handleTagClick = function () {
      // handler
    };

    _this.renderTag = function (text, onClick) {
      return React.createElement(
        _Button,
        { size: 'small', onClick: onClick, key: text, style: styles.button },
        text
      );
    };

    _this.renderItem = function (data, idx) {
      var isMobile = _this.props.isMobile;

      var wrapperStyle = _extends({}, styles.item);
      var informationStyle = _extends({}, styles.information);
      return React.createElement(
        'div',
        { key: idx, style: wrapperStyle },
        React.createElement(
          'div',
          { style: styles.title },
          data.title,
          !isMobile && React.createElement(
            'span',
            { style: styles.datetime },
            data.datetime
          )
        ),
        React.createElement(
          'div',
          { style: styles.desc },
          data.description
        ),
        React.createElement(
          'div',
          { style: informationStyle },
          React.createElement(
            'div',
            { style: styles.tagList },
            data.tags.map(function (item) {
              return _this.renderTag(item, _this.handleTagClick.bind(_this, idx, item), idx);
            })
          ),
          !isMobile && React.createElement(
            'div',
            { style: styles.operator },
            React.createElement(
              'span',
              { style: styles.operatorItem },
              '\u70B9\u8D5E: ',
              data.star
            ),
            React.createElement(
              'span',
              { style: styles.operatorItem },
              '\u559C\u7231: ',
              data.like
            ),
            React.createElement(
              'span',
              { style: styles.operatorItem },
              '\u8BC4\u8BBA: ',
              data.comment
            )
          )
        )
      );
    };

    _this.state = {};
    return _this;
  }

  _createClass(ArticleList, [{
    key: 'render',
    value: function render() {
      var _props$dataSource = this.props.dataSource,
          dataSource = _props$dataSource === undefined ? [] : _props$dataSource;

      return React.createElement(
        IceContainer,
        { className: 'article-list' },
        dataSource.map(this.renderItem),
        React.createElement(
          'div',
          { style: styles.paginationWrap },
          React.createElement(_Pagination, null)
        )
      );
    }
  }]);

  return ArticleList;
}(Component), _class.displayName = 'ArticleList', _temp);
export { ArticleList as default };


var styles = {
  item: {
    borderBottom: '1px solid #F4F4F4',
    marginBottom: '15px'
  },
  title: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '15px',
    position: 'relative'
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    fontSize: '12px',
    color: '#9B9B9B'
  },
  desc: {
    color: '#999',
    fontSize: '13px',
    lineHeight: '24px',
    paddingBottom: '15px'
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  button: {
    marginRight: '10px'
  },
  operator: {
    paddingTop: '8px',
    fontSize: '12px',
    color: '#9B9B9B'
  },
  operatorItem: {
    marginRight: '5px'
  },
  paginationWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '15px'
  }
};