import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Search from '@icedesign/base/lib/search';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import ArticleList from './ArticleList';
import Filter from './Filter';

var Row = _Grid.Row,
    Col = _Grid.Col;


var dataSource = [{
  title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
  description: '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
  tags: ['直播', '大促', '简介'],
  datetime: '2017年12月12日 18:00',
  star: 130,
  like: 233,
  comment: 123
}, {
  title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
  description: '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
  tags: ['直播', '大促', '简介'],
  datetime: '2017年12月12日 18:00',
  star: 130,
  like: 233,
  comment: 123
}, {
  title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
  description: '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
  tags: ['直播', '大促', '简介'],
  datetime: '2017年12月12日 18:00',
  star: 130,
  like: 233,
  comment: 123
}, {
  title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
  description: '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
  tags: ['直播', '大促', '简介'],
  datetime: '2017年12月12日 18:00',
  star: 130,
  like: 233,
  comment: 123
}, {
  title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
  description: '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
  tags: ['直播', '大促', '简介'],
  datetime: '2017年12月12日 18:00',
  star: 130,
  like: 233,
  comment: 123
}];

var TextSearchList = (_temp = _class = function (_Component) {
  _inherits(TextSearchList, _Component);

  function TextSearchList() {
    _classCallCheck(this, TextSearchList);

    return _possibleConstructorReturn(this, (TextSearchList.__proto__ || _Object$getPrototypeOf(TextSearchList)).apply(this, arguments));
  }

  _createClass(TextSearchList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'text-search-list' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            Row,
            null,
            React.createElement(
              Col,
              { l: '16' },
              React.createElement(_Search, {
                size: 'large',
                style: { width: '100%' },
                searchText: '\u641C\u7D22',
                placeholder: '\u8BF7\u8F93\u5165\u8981\u641C\u7D22\u7684\u5173\u952E\u8BCD\u6216\u5546\u54C1\u94FE\u63A5'
              })
            )
          )
        ),
        React.createElement(Filter, null),
        React.createElement(ArticleList, { dataSource: dataSource })
      );
    }
  }]);

  return TextSearchList;
}(Component), _class.displayName = 'TextSearchList', _temp);
export { TextSearchList as default };