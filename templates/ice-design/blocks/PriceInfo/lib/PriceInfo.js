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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./PriceInfo.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = [{
  title: '基本配置',
  price: '99',
  type: '微型企业',
  description: '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
}, {
  title: '标准配置',
  price: '199',
  type: '中小企业',
  description: '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
}, {
  title: '高端配置',
  price: '299',
  type: '大型企业',
  description: '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
}];

var PriceInfo = (_temp = _class = function (_Component) {
  _inherits(PriceInfo, _Component);

  function PriceInfo(props) {
    _classCallCheck(this, PriceInfo);

    var _this = _possibleConstructorReturn(this, (PriceInfo.__proto__ || Object.getPrototypeOf(PriceInfo)).call(this, props));

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(PriceInfo, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'price-info', style: styles.priceInfo },
        _react2.default.createElement(
          'div',
          { style: styles.items },
          data.map(function (item, index) {
            var rowLastItem = (index + 1) % 3 === 0 ? styles.rowLastItem : {};
            return _react2.default.createElement(
              'div',
              _defineProperty({
                key: index,
                style: _extends({}, styles.item, rowLastItem),
                className: 'item'
              }, 'style', styles.item),
              _react2.default.createElement(
                'div',
                { style: styles.head },
                _react2.default.createElement(
                  'h3',
                  { style: styles.title },
                  item.title
                ),
                _react2.default.createElement(
                  'p',
                  { style: styles.price },
                  '\uFFE5',
                  item.price
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.info },
                _react2.default.createElement('img', { style: styles.image, src: item.imgUrl }),
                _react2.default.createElement(
                  'h5',
                  { style: styles.type },
                  item.type
                ),
                _react2.default.createElement(
                  'p',
                  { style: styles.description },
                  item.description
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.buyBtn },
                _react2.default.createElement(
                  'a',
                  { href: '/', style: styles.link },
                  '\u7ACB\u5373\u8D2D\u4E70'
                )
              )
            );
          })
        )
      );
    }
  }]);

  return PriceInfo;
}(_react.Component), _class.displayName = 'PriceInfo', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = PriceInfo;


var styles = { items: { display: 'flex', flexWrap: 'wrap', padding: '80px 0', width: '1080px', margin: '0 auto' }, item: { width: '28%', marginRight: '8%', background: '#FAFAFA', borderRadius: '6px', paddingBottom: '50px' }, rowLastItem: { marginRight: 0 }, head: { padding: '30px 0', background: '#3080FE', textAlign: 'center', color: '#fff', borderRadius: '6px 6px 0 0' }, title: { margin: '0 0 5px', fontWeight: 'bold', fontSize: '20px' }, price: { margin: '0', fontWeight: 'bold', fontSize: '18px' }, info: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }, image: { width: '52px', height: '52px' }, type: { margin: 0, fontSize: '15px', fontWeight: 'bold', marginTop: '10px' }, description: { margin: '20px 0', lineHeight: '22px', textAlign: 'center', width: '60%', color: '#999' }, buyBtn: { display: 'flex', justifyContent: 'center', marginTop: '20px' }, link: { padding: '4px 15px', background: '#3080FE', borderRadius: '12px', color: '#fff' }, priceInfo: {} };
module.exports = exports['default'];