import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Icon from '@icedesign/base/lib/icon';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Array$from from 'babel-runtime/core-js/array/from';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';


var generatorData = function generatorData() {
  return _Array$from({ length: 5 }).map(function () {
    return {
      title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
      description: '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。',
      tags: ['直播', '大促活动', '讲解'],
      like: 123,
      favor: 245,
      comment: 546
    };
  });
};

var ArticleList = (_temp = _class = function (_Component) {
  _inherits(ArticleList, _Component);

  function ArticleList(props) {
    _classCallCheck(this, ArticleList);

    var _this = _possibleConstructorReturn(this, (ArticleList.__proto__ || _Object$getPrototypeOf(ArticleList)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ArticleList, [{
    key: 'render',
    value: function render() {
      var dataSource = generatorData();
      return React.createElement(
        'div',
        { className: 'article-list' },
        React.createElement(
          IceContainer,
          { style: styles.articleFilterCard },
          React.createElement(
            'ul',
            { className: 'article-sort', style: styles.articleSort },
            React.createElement(
              'li',
              { style: styles.sortItem },
              '\u6700\u65B0 ',
              React.createElement(_Icon, { type: 'arrow-down', size: 'xs' })
            ),
            React.createElement(
              'li',
              { style: styles.sortItem },
              '\u6700\u70ED ',
              React.createElement(_Icon, { type: 'arrow-down', size: 'xs' })
            ),
            React.createElement(
              'li',
              { style: styles.sortItem },
              '\u8DDD\u79BB\u622A\u7A3F\u65E5\u671F\u6700\u8FD1 ',
              React.createElement(_Icon, { type: 'arrow-down', size: 'xs' })
            ),
            React.createElement(
              'li',
              { style: styles.sortItem },
              '\u8DDD\u79BB\u5F00\u59CB\u5F00\u542F\u6700\u8FD1 ',
              React.createElement(_Icon, { type: 'arrow-down', size: 'xs' })
            )
          )
        ),
        React.createElement(
          IceContainer,
          null,
          dataSource.map(function (item, index) {
            return React.createElement(
              'div',
              { key: index, style: styles.articleItem },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'a',
                  { style: styles.title, href: '/' },
                  item.title
                )
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'p',
                  { style: styles.desc },
                  item.description
                )
              ),
              React.createElement(
                'div',
                { style: styles.articleItemFooter },
                React.createElement(
                  'div',
                  { style: styles.articleItemTags },
                  item.tags.map(function (tag, idx) {
                    return React.createElement(
                      'span',
                      {
                        key: idx,
                        className: 'article-item-tag',
                        style: styles.tag
                      },
                      tag
                    );
                  })
                ),
                React.createElement(
                  'div',
                  { style: styles.articleItemMeta },
                  React.createElement(
                    'span',
                    { style: styles.itemMetaIcon },
                    React.createElement(_Icon, { type: 'good', size: 'small' }),
                    ' ',
                    item.like
                  ),
                  React.createElement(
                    'span',
                    { style: styles.itemMetaIcon },
                    React.createElement(_Icon, { type: 'favorite', size: 'small' }),
                    ' ',
                    item.favor
                  ),
                  React.createElement(
                    'span',
                    { style: styles.itemMetaIcon },
                    React.createElement(_Icon, { type: 'comments', size: 'small' }),
                    ' ',
                    item.comment
                  )
                )
              )
            );
          })
        )
      );
    }
  }]);

  return ArticleList;
}(Component), _class.displayName = 'ArticleList', _temp);
export { ArticleList as default };


var styles = {
  articleFilterCard: {
    marginBottom: '10px',
    minHeight: 'auto',
    padding: 0
  },
  articleSort: {
    margin: 0,
    padding: 0
  },
  sortItem: {
    cursor: 'pointer',
    listStyle: 'none',
    fontSize: '14px',
    float: 'left',
    whiteSpace: 'nowrap',
    padding: '20px'
  },
  articleItem: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f5f5f5'
  },
  title: {
    fontSize: '16px',
    color: '#333',
    textDecoration: 'none'
  },
  desc: {
    lineHeight: '24px',
    fontSize: '14px',
    color: '#999'
  },
  articleItemFooter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tag: {
    fontSize: '13px',
    background: '#f5f5f5',
    color: '#999',
    padding: '4px 15px',
    borderRadius: '20px',
    marginRight: '20px'
  },
  articleItemTags: {
    padding: '10px 0'
  },
  articleItemMeta: {
    padding: '10px 0'
  },
  itemMetaIcon: {
    fontSize: '14px',
    color: '#999',
    marginRight: '15px'
  }
};