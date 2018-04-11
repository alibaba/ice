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

require('./LatestNews.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = require('@icedesign/base/lib/grid');

var dataSource = {
  articles: [{
    title: '这里是文章的标题1',
    time: '2018-03-31'
  }, {
    title: '这里是文章的标题2',
    time: '2018-02-02'
  }, {
    title: '这里是文章的标题3',
    time: '2018-01-22'
  }, {
    title: '这里是文章的标题4',
    time: '2018-02-02'
  }, {
    title: '这里是文章的标题5',
    time: '2018-01-22'
  }, {
    title: '这里是文章的标题6',
    time: '2018-02-02'
  }],
  comments: [{
    title: '这里是最新的评论1',
    time: '2018-02-26',
    num: '18'
  }, {
    title: '这里是最新的评论2',
    time: '2018-01-22',
    num: '22'
  }, {
    title: '这里是最新的评论3',
    time: '2018-01-18',
    num: '36'
  }, {
    title: '这里是最新的评论4',
    time: '2018-01-18',
    num: '29'
  }]
};

var Row = Grid.Row,
    Col = Grid.Col;
var LatestNews = (_temp = _class = function (_Component) {
  _inherits(LatestNews, _Component);

  function LatestNews(props) {
    _classCallCheck(this, LatestNews);

    var _this = _possibleConstructorReturn(this, (LatestNews.__proto__ || Object.getPrototypeOf(LatestNews)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(LatestNews, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'latest-news' },
        _react2.default.createElement(
          Row,
          { wrap: true, gutter: 20 },
          _react2.default.createElement(
            Col,
            { xxs: '24', l: '12' },
            _react2.default.createElement(
              _container2.default,
              { style: styles.cardContainer },
              _react2.default.createElement(
                'h3',
                { style: styles.cardTitle },
                '\u6700\u65B0\u6587\u7AE0',
                _react2.default.createElement(
                  'a',
                  { className: 'link', href: '#', style: styles.more },
                  '\u66F4\u591A'
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.items },
                dataSource.articles.map(function (item, index) {
                  return _react2.default.createElement(
                    'a',
                    {
                      className: 'link',
                      key: index,
                      href: '#',
                      style: styles.item
                    },
                    _react2.default.createElement(
                      'div',
                      { style: styles.itemTitle },
                      item.title
                    ),
                    _react2.default.createElement(
                      'div',
                      { style: styles.itemTime },
                      item.time
                    )
                  );
                })
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { xxs: '24', l: '12' },
            _react2.default.createElement(
              _container2.default,
              { style: styles.cardContainer },
              _react2.default.createElement(
                'h3',
                { style: styles.cardTitle },
                '\u6700\u65B0\u8BC4\u8BBA',
                _react2.default.createElement(
                  'a',
                  { className: 'link', href: '#', style: styles.more },
                  '\u66F4\u591A'
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.items },
                dataSource.comments.map(function (item, index) {
                  return _react2.default.createElement(
                    'a',
                    {
                      className: 'link',
                      key: index,
                      href: '#',
                      style: styles.item
                    },
                    _react2.default.createElement(
                      'div',
                      { style: styles.itemComment },
                      _react2.default.createElement(
                        'div',
                        { style: styles.commentTitle },
                        item.title
                      ),
                      _react2.default.createElement(
                        'div',
                        { style: styles.commentTime },
                        item.time
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { style: styles.commentNum },
                      item.num
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }]);

  return LatestNews;
}(_react.Component), _class.displayName = 'LatestNews', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = LatestNews;


var styles = {
  cardContainer: {
    height: 280
  },
  cardTitle: {
    position: 'relative',
    margin: '0 0 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  },
  more: {
    position: 'absolute',
    right: 0,
    fontSize: '12px',
    color: '#666'
  },
  item: {
    position: 'relative',
    display: 'block'
  },
  itemTime: {
    position: 'absolute',
    right: 0,
    top: 6,
    fontSize: '12px'
  },
  itemTitle: {
    height: '34px',
    lineHeight: '34px',
    fontSize: '13px'
  },
  itemComment: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
  },
  commentTitle: {
    height: '28px',
    lineHeight: '28px',
    fontSize: '13px'
  },
  commentTime: {
    fontSize: '12px'
  },
  commentNum: {
    position: 'absolute',
    right: 0,
    top: 6,
    width: '24px',
    height: '24px',
    lineHeight: '24px',
    fontSize: '12px',
    textAlign: 'center',
    borderRadius: '50px',
    background: '#FF2851',
    color: '#fff'
  }
};
module.exports = exports['default'];