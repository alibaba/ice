'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./ProductInfo.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dataSource = [{
  title: '主页背书',
  pic: 'https://img.alicdn.com/tfs/TB1i7OMif6H8KJjSspmXXb2WXXa-210-210.png',
  desc: '这里填写具体的细节描述，如果文字很长可以'
}, {
  title: '频道入驻',
  pic: 'https://img.alicdn.com/tfs/TB1wA5KinvI8KJjSspjXXcgjXXa-210-210.png',
  desc: '这里填写具体的细节描述，如果文字很长可以'
}, {
  title: '商业扶持',
  pic: 'https://img.alicdn.com/tfs/TB1laelicjI8KJjSsppXXXbyVXa-210-210.png',
  desc: '这里填写具体的细节描述，如果文字很长可以'
}, {
  title: '专属管家',
  pic: 'https://img.alicdn.com/tfs/TB1EfLYfOqAXuNjy1XdXXaYcVXa-207-210.png',
  desc: '这里填写具体的细节描述，如果文字很长可以'
}, {
  title: '资源优选',
  pic: 'https://img.alicdn.com/tfs/TB1a31mignH8KJjSspcXXb3QFXa-210-210.png',
  desc: '这里填写具体的细节描述，如果文字很长可以'
}, {
  title: '快捷搜索',
  pic: 'https://img.alicdn.com/tfs/TB1ALecicrI8KJjy0FhXXbfnpXa-210-210.png',
  desc: '这里填写具体的细节描述，如果文字很长可以'
}];

var ProductInfo = (_temp = _class = function (_Component) {
  _inherits(ProductInfo, _Component);

  function ProductInfo(props) {
    _classCallCheck(this, ProductInfo);

    var _this = _possibleConstructorReturn(this, (ProductInfo.__proto__ || Object.getPrototypeOf(ProductInfo)).call(this, props));

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(ProductInfo, [{
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
        { className: 'product-info', style: styles.productInfo },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'div',
            { style: styles.items },
            dataSource.map(function (item, index) {
              return _react2.default.createElement(
                'div',
                { key: index, style: styles.item },
                _react2.default.createElement('img', { src: item.pic, style: styles.pic }),
                _react2.default.createElement(
                  'h3',
                  { style: styles.title },
                  item.title
                ),
                _react2.default.createElement(
                  'p',
                  { style: styles.desc },
                  item.desc
                )
              );
            })
          )
        )
      );
    }
  }]);

  return ProductInfo;
}(_react.Component), _class.displayName = 'ProductInfo', _class.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
}, _class.defaultProps = {}, _temp);
exports.default = ProductInfo;


var styles = { items: { display: 'flex', flexWrap: 'wrap' }, item: { width: '33.3333%', textAlign: 'center', padding: '10px 22px', marginBottom: '20px' }, pic: { width: 100, height: 100 }, title: { fontWeight: 'bold' }, desc: { lineHeight: '22px' }, productInfo: {} };
module.exports = exports['default'];