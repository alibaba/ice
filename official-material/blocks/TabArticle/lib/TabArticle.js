import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
import ArticleList from './ArticleList';

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

var ICON = {
  active: 'https://gw.alicdn.com/tfs/TB1bQQ4ihrI8KJjy0FpXXb5hVXa-20-24.png',
  inactive: 'https://gw.alicdn.com/tfs/TB1PwspilfH8KJjy1XbXXbLdXXa-20-24.png'
};

var TabArticle = (_temp = _class = function (_Component) {
  _inherits(TabArticle, _Component);

  function TabArticle(props) {
    _classCallCheck(this, TabArticle);

    var _this = _possibleConstructorReturn(this, (TabArticle.__proto__ || _Object$getPrototypeOf(TabArticle)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.state = {
      isMobile: false
    };
    return _this;
  }

  _createClass(TabArticle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'tab-article' },
        React.createElement(
          IceContainer,
          { style: styles.tabList },
          React.createElement(
            'div',
            {
              style: _extends({}, styles.tab, styles.active)
            },
            '\u6700\u65B0 ',
            React.createElement('img', { src: ICON.active, style: styles.icon, alt: '\u6700\u65B0' })
          ),
          React.createElement(
            'div',
            { style: styles.tab },
            '\u6700\u70ED ',
            React.createElement('img', { src: ICON.inactive, style: styles.icon, alt: '\u6700\u70ED' })
          ),
          React.createElement(
            'div',
            { style: styles.tab },
            '\u8DDD\u79BB\u622A\u7A3F\u65E5\u671F\u6700\u8FD1',
            ' ',
            React.createElement('img', {
              src: ICON.inactive,
              style: styles.icon,
              alt: '\u8DDD\u79BB\u622A\u7A3F\u65E5\u671F\u6700\u8FD1'
            })
          )
        ),
        React.createElement(ArticleList, { isMobile: this.state.isMobile, dataSource: dataSource })
      );
    }
  }]);

  return TabArticle;
}(Component), _class.displayName = 'TabArticle', _temp);
export { TabArticle as default };


var styles = {
  tabList: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    width: '10px',
    height: '12px'
  },
  tab: {
    cursor: 'pointer',
    marginRight: '20px'
  },
  tabActive: {
    color: '#3080FE'
  }
};