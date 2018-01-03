'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./EntryCard.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var list = [{
  title: '帖子',
  img: '//gw.alicdn.com/tfscom/TB1OyT.RVXXXXcpXXXXXXXXXXXX.png',
  url: '//www.taobao.com'
}, {
  title: '宝贝清单',
  img: '//img.alicdn.com/tfs/TB1g6cGRFXXXXa9XXXXXXXXXXXX-140-140.png',
  url: '//www.taobao.com'
}, {
  title: '图片',
  img: '//img.alicdn.com/tfs/TB1hJ7dRFXXXXcgXFXXXXXXXXXX-140-140.png',
  url: '//www.taobao.com'
}, {
  title: '上新',
  img: '//img.alicdn.com/tfs/TB196v1RFXXXXb6aXXXXXXXXXXX-140-140.png',
  url: '//www.taobao.com'
}, {
  title: '短视频',
  img: '//gw.alicdn.com/tfscom/TB1toY.RVXXXXcuXXXXXXXXXXXX.png',
  url: '//www.taobao.com'
}, {
  title: '短视频',
  img: '//gw.alicdn.com/tfscom/TB1toY.RVXXXXcuXXXXXXXXXXXX.png',
  url: '//www.taobao.com'
}];

var EntryCard = (_temp = _class = function (_Component) {
  _inherits(EntryCard, _Component);

  function EntryCard() {
    _classCallCheck(this, EntryCard);

    return _possibleConstructorReturn(this, (EntryCard.__proto__ || Object.getPrototypeOf(EntryCard)).apply(this, arguments));
  }

  _createClass(EntryCard, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _card2.default,
        {
          className: 'entry-card',
          style: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }
        },
        list.map(function (item, index) {
          return _react2.default.createElement(
            'div',
            { key: index, style: styles.item },
            _react2.default.createElement(
              'a',
              { href: item.url, style: styles.link, target: '_blank' },
              _react2.default.createElement('img', { src: item.img, style: styles.cover, alt: item.title }),
              _react2.default.createElement(
                'div',
                { style: styles.title },
                item.title
              )
            )
          );
        })
      );
    }
  }]);

  return EntryCard;
}(_react.Component), _class.displayName = 'EntryCard', _temp);
exports.default = EntryCard;


var styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70px',
    margin: '10px 40px'
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
  cover: {
    width: '70px',
    height: '70px'
  },
  title: {
    marginTop: '12px',
    fontSize: '14px',
    textAlign: 'center'
  }
};
module.exports = exports['default'];