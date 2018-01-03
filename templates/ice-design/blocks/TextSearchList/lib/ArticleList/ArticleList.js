'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./ArticleList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = require('@icedesign/base/lib/button');

var ArticleList = (_temp2 = _class = function (_Component) {
  _inherits(ArticleList, _Component);

  function ArticleList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ArticleList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArticleList.__proto__ || Object.getPrototypeOf(ArticleList)).call.apply(_ref, [this].concat(args))), _this), _this.handleTagClick = function (idx, text) {
      // handler
      console.log('handleTagClick:', text);
    }, _this.renderTag = function (text, onClick, idx) {
      return _react2.default.createElement(
        Button,
        { size: 'small', onClick: onClick, key: idx, style: styles.button },
        text
      );
    }, _this.renderItem = function (data, idx, all) {
      var isLast = all.length - 1 === idx;
      var wrapperStyle = _extends({}, styles.item);
      var informationStyle = _extends({}, styles.information);
      if (isLast) {
        delete wrapperStyle.borderBottom;
        wrapperStyle.marginBottom = '0px';
        informationStyle.marginBottom = '0px';
      }
      return _react2.default.createElement(
        'div',
        { key: idx, style: wrapperStyle },
        _react2.default.createElement(
          'div',
          { style: styles.title },
          data.title,
          _react2.default.createElement(
            'span',
            { style: styles.datetime },
            data.datetime
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.desc },
          data.description
        ),
        _react2.default.createElement(
          'div',
          { style: informationStyle },
          _react2.default.createElement(
            'div',
            { style: styles.tagList },
            data.tags.map(function (item) {
              return _this.renderTag(item, _this.handleTagClick.bind(_this, idx, item), idx);
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.operator },
            _react2.default.createElement(
              'span',
              { style: styles.operatorItem },
              '\u70B9\u8D5E: ',
              data.star
            ),
            _react2.default.createElement(
              'span',
              { style: styles.operatorItem },
              '\u559C\u7231: ',
              data.like
            ),
            _react2.default.createElement(
              'span',
              { style: styles.operatorItem },
              '\u8BC4\u8BBA: ',
              data.comment
            )
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ArticleList, [{
    key: 'render',
    value: function render() {
      var _props$dataSource = this.props.dataSource,
          dataSource = _props$dataSource === undefined ? [] : _props$dataSource;

      return _react2.default.createElement(
        _card2.default,
        { className: 'article-list' },
        dataSource.map(this.renderItem)
      );
    }
  }]);

  return ArticleList;
}(_react.Component), _class.displayName = 'ArticleList', _temp2);
exports.default = ArticleList;


var styles = {
  item: {
    borderBottom: '1px solid #F4F4F4',
    marginBottom: '15px'
  },
  title: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '15px',
    position: 'relative'
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    fontSize: '12px',
    color: '#9B9B9B'
  },
  desc: {
    color: '#999',
    fontSize: '14px',
    paddingBottom: '15px'
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  button: {
    marginRight: '10px'
  },
  operator: {
    paddingTop: '8px',
    fontSize: '12px',
    color: '#9B9B9B'
  },
  operatorItem: {
    marginRight: '5px'
  }
};
module.exports = exports['default'];