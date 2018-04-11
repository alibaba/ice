'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

var _LineChart = require('./LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = require('@icedesign/base/lib/grid');

var Table = require('@icedesign/base/lib/table');

var Progress = require('@icedesign/base/lib/progress');

var Row = Grid.Row,
    Col = Grid.Col;


var activePages = [{ id: 1, page: '/getting', amount: '2,80,489', percent: 90 }, { id: 2, page: '/home', amount: '1,98,956', percent: 70 }, { id: 3, page: '/pricing', amount: '1,90,257', percent: 60 }, { id: 4, page: '/about', amount: '1,80,745', percent: 50 }, { id: 5, page: '/blog', amount: '1,24,693', percent: 40 }, { id: 6, page: '/support', amount: '8,489', percent: 35 }, { id: 7, page: '/team', amount: '5,233', percent: 30 }, { id: 8, page: '/faq', amount: '1,688', percent: 20 }];

var ViewedProducts = [{
  id: 1,
  pic: 'https://img.alicdn.com/imgextra/i3/2616970884/TB2_EHOgS3PL1JjSZFtXXclRVXa_!!2616970884.jpg_60x60q90.jpg',
  title: 'Apple/苹果',
  cate: '电子产品',
  amount: '38,600'
}, {
  id: 2,
  pic: 'https://img.alicdn.com/imgextra/i2/1714128138/TB2NVRzcbMlyKJjSZFlXXbMoFXa_!!1714128138.jpg_60x60q90.jpg',
  title: 'Xiaomi/小米5X',
  cate: '电子产品',
  amount: '33,779'
}, {
  id: 3,
  pic: 'https://img.alicdn.com/imgextra/i3/3081047815/TB2i7McmHsTMeJjy1zcXXXAgXXa_!!3081047815.jpg_60x60q90.jpg',
  title: '天猫精灵',
  cate: '智能家居',
  amount: '29,588'
}, {
  id: 4,
  pic: 'https://img.alicdn.com/imgextra/i1/1714128138/TB2ABOCcV5N.eBjSZFKXXX_QVXa_!!1714128138.jpg_60x60q90.jpg',
  title: '小米盒子3',
  cate: '智能小家电',
  amount: '8,636'
}];

var TopActiveChart = (_temp = _class = function (_Component) {
  _inherits(TopActiveChart, _Component);

  function TopActiveChart(props) {
    _classCallCheck(this, TopActiveChart);

    var _this = _possibleConstructorReturn(this, (TopActiveChart.__proto__ || Object.getPrototypeOf(TopActiveChart)).call(this, props));

    _this.renderProduct = function (value, index, record) {
      return _react2.default.createElement(
        'div',
        { style: styles.product },
        _react2.default.createElement('img', { src: record.pic, style: styles.productPic, alt: '' }),
        _react2.default.createElement(
          'p',
          { style: styles.prodyctTitle },
          record.title
        )
      );
    };

    _this.state = {};
    return _this;
  }

  _createClass(TopActiveChart, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        Row,
        { wrap: true, gutter: '20' },
        _react2.default.createElement(
          Col,
          { xxs: '24', s: '12', l: '12' },
          _react2.default.createElement(
            _container2.default,
            { title: '\u6D3B\u8DC3\u9875\u9762' },
            _react2.default.createElement(
              Table,
              {
                dataSource: activePages,
                hasBorder: false,
                hasHeader: false,
                style: { width: '100%', height: '341px' }
              },
              _react2.default.createElement(Table.Column, { title: 'ID', dataIndex: 'id', width: '5%' }),
              _react2.default.createElement(Table.Column, { title: '\u9875\u9762', dataIndex: 'page' }),
              _react2.default.createElement(Table.Column, { title: '\u9500\u552E\u6570\u91CF', dataIndex: 'amount' }),
              _react2.default.createElement(Table.Column, {
                title: '\u9500\u552E\u5360\u6BD4',
                dataIndex: 'page',
                cell: function cell(value, index, record) {
                  return _react2.default.createElement(Progress, { percent: record.percent, showInfo: false });
                }
              })
            )
          )
        ),
        _react2.default.createElement(
          Col,
          { xxs: '24', s: '12', l: '12' },
          _react2.default.createElement(
            _container2.default,
            { title: '\u6D4F\u89C8\u6700\u591A' },
            _react2.default.createElement(
              Table,
              {
                dataSource: ViewedProducts,
                hasBorder: false,
                hasHeader: false,
                style: { width: '100%', height: '341px' }
              },
              _react2.default.createElement(Table.Column, {
                title: '\u4EA7\u54C1',
                dataIndex: 'title',
                cell: function cell(value, index, record) {
                  return _this2.renderProduct(value, index, record);
                },
                width: '40%'
              }),
              _react2.default.createElement(Table.Column, { title: '\u5206\u7C7B', dataIndex: 'cate', width: '20%' }),
              _react2.default.createElement(Table.Column, {
                title: '\u9500\u552E\u8D8B\u52BF',
                width: '20%',
                cell: function cell() {
                  return _react2.default.createElement(_LineChart2.default, null);
                }
              }),
              _react2.default.createElement(Table.Column, { title: '\u9500\u552E\u6570\u91CF', dataIndex: 'amount', width: '20%' })
            )
          )
        )
      );
    }
  }]);

  return TopActiveChart;
}(_react.Component), _class.displayName = 'TopActiveChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = TopActiveChart;


var styles = {
  product: {
    display: 'flex',
    alignItems: 'center'
  },
  productPic: {
    width: 60,
    height: 60
  },
  productTitle: {
    margin: 0
  }
};
module.exports = exports['default'];