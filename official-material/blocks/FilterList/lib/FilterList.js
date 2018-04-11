import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Search from '@icedesign/base/lib/search';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import SingleItem from './SingleItem';
import './FilterList.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;

var dataSource = [{
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2GiVsdS0mpuFjSZPiXXbssVXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2bxHGtpXXXXXVXXXXXXXXXXXX_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2bEcHnXXXXXbgXXXXXXXXXXXX_!!120976213.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i2/TB11DjAIFXXXXaTXFXXXXXXXXXX_!!0-item_pic.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/TB1GiPSinJ_SKJjSZPiYXH3LpXa_M2.SS2_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2GiVsdS0mpuFjSZPiXXbssVXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2bxHGtpXXXXXVXXXXXXXXXXXX_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2bEcHnXXXXXbgXXXXXXXXXXXX_!!120976213.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i2/TB11DjAIFXXXXaTXFXXXXXXXXXX_!!0-item_pic.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/TB1GiPSinJ_SKJjSZPiYXH3LpXa_M2.SS2_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2GiVsdS0mpuFjSZPiXXbssVXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2bxHGtpXXXXXVXXXXXXXXXXXX_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2bEcHnXXXXXbgXXXXXXXXXXXX_!!120976213.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i2/TB11DjAIFXXXXaTXFXXXXXXXXXX_!!0-item_pic.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/TB1GiPSinJ_SKJjSZPiYXH3LpXa_M2.SS2_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2GiVsdS0mpuFjSZPiXXbssVXa_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i3/120976213/TB2bxHGtpXXXXXVXXXXXXXXXXXX_!!120976213.jpg_240x240.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/120976213/TB2bEcHnXXXXXbgXXXXXXXXXXXX_!!120976213.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i2/TB11DjAIFXXXXaTXFXXXXXXXXXX_!!0-item_pic.jpg_100x100.jpg'
}, {
  title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
  extra: '预计佣金 ¥10',
  price: '¥89',
  image: '//img.alicdn.com/bao/uploaded/i4/TB1GiPSinJ_SKJjSZPiYXH3LpXa_M2.SS2_100x100.jpg'
}];

var FilterList = (_temp2 = _class = function (_Component) {
  _inherits(FilterList, _Component);

  function FilterList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FilterList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilterList.__proto__ || _Object$getPrototypeOf(FilterList)).call.apply(_ref, [this].concat(args))), _this), _this.renderItems = function () {
      return React.createElement(
        Row,
        { gutter: '20', wrap: true, style: styles.itemRow },
        dataSource.map(function (item, index) {
          return React.createElement(
            Col,
            { key: index, xxs: '24', s: '8', l: '4' },
            React.createElement(SingleItem, _extends({ key: index }, item))
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilterList, [{
    key: 'render',
    value: function render() {
      var cardStyle = {
        display: 'flex',
        margin: '20px'
      };

      return React.createElement(
        'div',
        { className: 'filter-list' },
        React.createElement(
          IceContainer,
          {
            style: _extends({}, styles.filterListHeaderWrapper, cardStyle)
          },
          React.createElement(
            'div',
            { style: styles.filterCategories },
            React.createElement(
              'div',
              { className: 'select-item', style: styles.selectItem },
              '\u6211\u7684\u5546\u54C1'
            ),
            React.createElement(
              'div',
              { className: 'select-item', style: styles.selectItem },
              '\u6211\u7684\u56FE\u7247'
            ),
            React.createElement(
              'div',
              { className: 'select-item', style: styles.selectItem },
              '\u6211\u7684\u89C6\u9891'
            )
          ),
          React.createElement(
            'div',
            { style: styles.searchWrapper },
            React.createElement(_Search, {
              placeholder: '\u6807\u9898',
              inputWidth: 120,
              searchText: '',
              style: styles.searchInput
            }),
            React.createElement(
              _Button,
              { type: 'primary' },
              '\u641C\u7D22'
            )
          ),
          React.createElement(
            'div',
            { style: styles.filterCategory },
            React.createElement(
              _Button,
              { className: 'select-btn', style: styles.selectBtn },
              '\u5168\u90E8\u5546\u54C1'
            ),
            React.createElement(
              _Button,
              { className: 'select-btn', style: styles.selectBtn },
              '\u672A\u5206\u7C7B'
            ),
            React.createElement(
              _Button,
              { className: 'select-btn', style: styles.selectBtn },
              '\u5DF2\u5931\u6548'
            ),
            React.createElement(
              _Button,
              { className: 'select-btn', style: styles.selectBtn },
              '\u6709\u597D\u8D27\u4E13\u7528'
            ),
            React.createElement(
              _Button,
              { className: 'select-btn', style: styles.selectBtn },
              '\u5FC5\u4E70\u6E05\u5355'
            ),
            React.createElement('span', null)
          )
        ),
        React.createElement(
          IceContainer,
          { style: _extends({}, styles.searchResultWrapper, cardStyle) },
          this.renderItems()
        )
      );
    }
  }]);

  return FilterList;
}(Component), _class.displayName = 'FilterList', _temp2);
export { FilterList as default };


var styles = {
  selectItem: {
    padding: '0 16px',
    borderRight: '1px solid #ddd',
    cursor: 'pointer'
  },
  selectBtn: {
    marginRight: '10px',
    marginBottom: '10px'
  },
  itemRow: {
    margin: '0 10px 10px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  filterListHeaderWrapper: {
    padding: '20px 20px 5px 20px',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 0 15px 0'
  },
  searchInput: {
    marginRight: '15px'
  },
  filterCategories: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 0 15px 0'
  },
  searchResultWrapper: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '20px 0'
  },
  filterCategory: {
    width: '100%'
  }
};