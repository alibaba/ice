import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
var Row = _Grid.Row,
    Col = _Grid.Col;

/**
 * 渲染详情信息的数据
 */

var dataSource = {
  title: '集盒家居旗舰店双十一活动',
  shopName: '集盒家居旗舰店',
  amount: '1000.00',
  bounty: '200.00',
  orderTime: '2017-10-18 12:20:07',
  deliveryTime: '2017-10-18 12:20:07',
  phone: '15612111213',
  address: '杭州市文一西路',
  status: '进行中',
  remark: '暂无',
  pics: ['https://img.alicdn.com/imgextra/i3/672246894/TB2ziLDdbsTMeJjSszdXXcEupXa_!!672246894-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp', 'https://img.alicdn.com/imgextra/i1/2645911918/TB2qQA9fk.HL1JjSZFuXXX8dXXa_!!2645911918-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp', 'https://img.alicdn.com/bao/uploaded/TB2obaBXeLyQeBjy1XaXXcexFXa_!!0-dgshop.jpg_180x180xzq90.jpg_.webp', 'https://img.alicdn.com/tps/i1/99136475/TB2Cc7saE1HTKJjSZFmXXXeYFXa_!!0-juitemmedia.jpg_180x180q90.jpg_.webp']
};

var BasicDetailInfo = (_temp = _class = function (_Component) {
  _inherits(BasicDetailInfo, _Component);

  function BasicDetailInfo(props) {
    _classCallCheck(this, BasicDetailInfo);

    var _this = _possibleConstructorReturn(this, (BasicDetailInfo.__proto__ || _Object$getPrototypeOf(BasicDetailInfo)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(BasicDetailInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          'h2',
          { style: styles.basicDetailTitle },
          '\u57FA\u7840\u8BE6\u60C5\u9875'
        ),
        React.createElement(
          'div',
          { style: styles.infoColumn },
          React.createElement(
            'h5',
            { style: styles.infoColumnTitle },
            '\u57FA\u672C\u4FE1\u606F'
          ),
          React.createElement(
            Row,
            { wrap: true, style: styles.infoItems },
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u4EFB\u52A1\u6807\u9898\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.title
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u5E97\u94FA\u540D\u79F0\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.shopName
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u4EFB\u52A1\u91D1\u989D\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                '\xA5 ',
                dataSource.amount
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u4EFB\u52A1\u8D4F\u91D1\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                '\xA5 ',
                dataSource.bounty
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u63A5\u5355\u65F6\u95F4\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.orderTime
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u4EA4\u4ED8\u65F6\u95F4\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.deliveryTime
              )
            )
          )
        ),
        React.createElement(
          'div',
          { style: styles.infoColumn },
          React.createElement(
            'h5',
            { style: styles.infoColumnTitle },
            '\u66F4\u591A\u4FE1\u606F'
          ),
          React.createElement(
            Row,
            { wrap: true, style: styles.infoItems },
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u8054\u7CFB\u65B9\u5F0F\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.phone
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u6536\u8D27\u5730\u5740\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.address
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u4EFB\u52A1\u72B6\u6001\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.status
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u5907\u6CE8\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                dataSource.remark
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.attachLabel },
                '\u9644\u4EF6\uFF1A'
              ),
              React.createElement(
                'span',
                null,
                dataSource.pics && dataSource.pics.length && dataSource.pics.map(function (pic, index) {
                  return React.createElement('img', {
                    key: index,
                    src: pic,
                    style: styles.attachPics,
                    alt: '\u56FE\u7247'
                  });
                })
              )
            )
          )
        )
      );
    }
  }]);

  return BasicDetailInfo;
}(Component), _class.displayName = 'BasicDetailInfo', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { BasicDetailInfo as default };


var styles = {
  basicDetailTitle: {
    margin: '10px 0',
    fontSize: '16px'
  },
  infoColumn: {
    marginLeft: '16px'
  },
  infoColumnTitle: {
    margin: '20px 0',
    paddingLeft: '10px',
    borderLeft: '3px solid #3080fe'
  },
  infoItems: {
    padding: 0,
    marginLeft: '25px'
  },
  infoItem: {
    marginBottom: '18px',
    listStyle: 'none',
    fontSize: '14px'
  },
  infoItemLabel: {
    minWidth: '70px',
    color: '#999'
  },
  infoItemValue: {
    color: '#333'
  },
  attachLabel: {
    minWidth: '70px',
    color: '#999',
    float: 'left'
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px'
  }
};