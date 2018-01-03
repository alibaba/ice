'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

var _SingleItem = require('./SingleItem');

var _SingleItem2 = _interopRequireDefault(_SingleItem);

require('./PictureTextList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = require('@icedesign/base/lib/pagination');

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
}];

var PictureTextList = (_temp = _class = function (_Component) {
  _inherits(PictureTextList, _Component);

  function PictureTextList(props) {
    _classCallCheck(this, PictureTextList);

    var _this = _possibleConstructorReturn(this, (PictureTextList.__proto__ || Object.getPrototypeOf(PictureTextList)).call(this, props));

    _this.renderItem = function (item, index) {
      return _react2.default.createElement(_SingleItem2.default, _extends({ key: index }, item));
    };

    _this.renderItemRow = function () {
      return _react2.default.createElement(
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
      return _react2.default.createElement(
        'div',
        { className: 'picture-text-list' },
        _react2.default.createElement(
          _card2.default,
          { style: styles.card },
          this.renderItemRow(),
          this.renderItemRow(),
          this.renderItemRow(),
          this.renderItemRow(),
          _react2.default.createElement(
            'div',
            { style: styles.paginationContainer },
            _react2.default.createElement(Pagination, null)
          )
        )
      );
    }
  }]);

  return PictureTextList;
}(_react.Component), _class.displayName = 'PictureTextList', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = PictureTextList;


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
module.exports = exports['default'];