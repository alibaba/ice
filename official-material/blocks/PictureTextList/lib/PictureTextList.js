import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import SingleItem from './SingleItem';

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
}];

var PictureTextList = (_temp = _class = function (_Component) {
  _inherits(PictureTextList, _Component);

  function PictureTextList(props) {
    _classCallCheck(this, PictureTextList);

    var _this = _possibleConstructorReturn(this, (PictureTextList.__proto__ || _Object$getPrototypeOf(PictureTextList)).call(this, props));

    _this.renderItem = function (item, index) {
      return React.createElement(
        Col,
        { xxs: 12, s: 8, m: 6, l: 4, key: index },
        React.createElement(SingleItem, item)
      );
    };

    _this.renderItemRow = function () {
      return React.createElement(
        'div',
        { style: styles.row },
        dataSource.map(_this.renderItem)
      );
    };

    _this.state = {};
    return _this;
  }

  _createClass(PictureTextList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'picture-text-list' },
        React.createElement(
          IceContainer,
          { style: styles.card },
          React.createElement(
            Row,
            { wrap: true, gutter: 20 },
            dataSource.map(this.renderItem)
          ),
          React.createElement(
            'div',
            { style: styles.paginationContainer },
            React.createElement(_Pagination, null)
          )
        )
      );
    }
  }]);

  return PictureTextList;
}(Component), _class.displayName = 'PictureTextList', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { PictureTextList as default };


var styles = {
  row: {
    margin: '0 10px 10px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cardStyle: {
    display: 'flex',
    margin: '20px',
    padding: '0 30px'
  },
  card: {
    padding: '20px 10px'
  },
  paginationContainer: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
};