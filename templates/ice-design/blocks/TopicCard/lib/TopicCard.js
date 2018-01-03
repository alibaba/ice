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

require('./TopicCard.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dataSource = [{
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1nQ4hgILJ8KJjy0FnXXcFDpXa-132-126.png'
}, {
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1OuuTgL6H8KJjy0FjXXaXepXa-132-126.png'
}, {
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1aTaIgRTH8KJjy0FiXXcRsXXa-132-123.png'
}, {
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1dTaIgRTH8KJjy0FiXXcRsXXa-120-120.png'
}, {
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1OuuTgL6H8KJjy0FjXXaXepXa-132-126.png'
}];

var TopicCard = (_temp = _class = function (_Component) {
  _inherits(TopicCard, _Component);

  function TopicCard() {
    _classCallCheck(this, TopicCard);

    return _possibleConstructorReturn(this, (TopicCard.__proto__ || Object.getPrototypeOf(TopicCard)).apply(this, arguments));
  }

  _createClass(TopicCard, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _card2.default,
        { style: styles.container, className: 'tab-card', title: '\u6570\u636E\u6982\u89C8' },
        _react2.default.createElement(
          'div',
          { className: 'topic-card' },
          _react2.default.createElement(
            'div',
            { style: styles.horizontalWraper },
            dataSource.map(function (item, idx) {
              return _react2.default.createElement(
                'div',
                {
                  style: styles.topicCardItem,
                  className: 'topic-card-item',
                  key: 'card-item-' + idx
                },
                _react2.default.createElement(
                  'div',
                  { style: styles.cover },
                  _react2.default.createElement('img', { alt: 'icon', src: item.icon, style: styles.icon })
                ),
                _react2.default.createElement(
                  'div',
                  { style: styles.content },
                  _react2.default.createElement(
                    'div',
                    { style: styles.meta },
                    item.meta
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.total },
                    item.total
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.compareText },
                    '\u8F83\u524D\u65E5 ',
                    _react2.default.createElement(
                      'span',
                      { style: styles.up },
                      '\u2191+',
                      item.up
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.compareText },
                    '\u8FD17\u5929 ',
                    _react2.default.createElement(
                      'span',
                      { style: styles.down },
                      '\u2193-',
                      item.down
                    )
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return TopicCard;
}(_react.Component), _class.displayName = 'TopicCard', _temp);
exports.default = TopicCard;


var styles = {
  container: {
    margin: '0 0 20px 0'
  },
  icon: {
    width: '44px',
    height: '41px'
  },
  horizontalWraper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  content: {},
  cover: {
    backgroundColor: '#e9f1ff',
    marginRight: '10px',
    height: '70px',
    width: '70px',
    borderRadius: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  meta: {
    fontSize: '12px',
    color: '#333333'
  },
  total: {
    fontSize: '24px',
    color: '#333333'
  },
  compareText: {
    fontSize: '12px',
    color: '#999999'
  },
  up: {
    color: '#fc5848'
  },
  down: {
    color: '#64d874'
  }
};
module.exports = exports['default'];