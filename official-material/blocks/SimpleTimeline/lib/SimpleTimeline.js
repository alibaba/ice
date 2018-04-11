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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = require('@icedesign/base/lib/timeline');

var TimelineItem = Timeline.Item;
var SimpleTimeline = (_temp = _class = function (_Component) {
  _inherits(SimpleTimeline, _Component);

  function SimpleTimeline(props) {
    _classCallCheck(this, SimpleTimeline);

    var _this = _possibleConstructorReturn(this, (SimpleTimeline.__proto__ || Object.getPrototypeOf(SimpleTimeline)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SimpleTimeline, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _container2.default,
        { title: '\u7269\u6D41\u4FE1\u606F' },
        _react2.default.createElement(
          Timeline,
          {
            fold: [{ foldArea: [1, 2], foldShow: false }, { foldArea: [5], foldShow: false }]
          },
          _react2.default.createElement(TimelineItem, {
            title: '\u7B7E\u6536',
            content: '\u3010\u676D\u5DDE\u5E02\u3011\u5DF2\u7B7E\u6536,\u7B7E\u6536\u4EBA\u662F\u963F\u91CC\u5DF4\u5DF4\u5C0F\u90AE\u5C40\uFF0C\u611F\u8C22\u4F7F\u7528\u7533\u901A\u5FEB\u9012\uFF0C\u671F\u5F85\u518D\u6B21\u4E3A\u60A8\u670D\u52A1',
            time: '2016-06-10 10:30:00',
            state: 'process'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u6D3E\u9001',
            content: '\u3010\u676D\u5DDE\u5E02\u3011\u5FEB\u4EF6\u5DF2\u5230\u8FBE \u6D59\u6C5F\u676D\u5DDE\u6EE8\u6C5F\u516C\u53F8',
            time: '2016-06-10 09:30:00'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u6D3E\u9001',
            content: '\u3010\u676D\u5DDE\u5E02\u3011\u6D59\u6C5F\u676D\u5DDE\u6EE8\u6C5F\u516C\u53F8\u6D3E\u4EF6\u5458\u6B63\u5728\u4E3A\u60A8\u6D3E\u4EF6',
            time: '2016-06-10 09:03:00'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u8FD0\u8F93',
            content: '\u3010\u676D\u5DDE\u5E02\u3011\u6D59\u6C5F\u676D\u5DDE\u8F6C\u8FD0\u4E2D\u5FC3 \u5DF2\u53D1\u51FA',
            time: '2016-06-10 06:10:00'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u8FD0\u8F93',
            content: '\u3010\u4E1C\u839E\u5E02\u3011\u5E7F\u4E1C\u4E1C\u839E\u8F6C\u8FD0\u4E2D\u5FC3 \u5DF2\u53D1\u51FA',
            time: '2016-06-09 18:00:00'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u63FD\u4EF6',
            content: '\u3010\u4E1C\u839E\u5E02\u3011\u7533\u901A\u5FEB\u9012 \u5E7F\u4E1C\u4E1C\u839E\u51E4\u5C97\u5206\u90E8\u6536\u4EF6\u5458 \u5DF2\u63FD\u4EF6',
            time: '2016-06-09 16:12:00'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u63FD\u4EF6',
            content: '\u3010\u4E1C\u839E\u5E02\u3011\u5546\u5BB6\u6B63\u901A\u77E5\u5FEB\u9012\u516C\u53F8\u63FD\u4EF6',
            time: '2016-06-09 14:00:00'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u63FD\u4EF6',
            content: '\u3010\u4E1C\u839E\u5E02\u3011\u60A8\u7684\u8BA2\u5355\u5F85\u914D\u8D27',
            time: '2016-06-09 10:12:19'
          }),
          _react2.default.createElement(TimelineItem, {
            title: '\u63FD\u4EF6',
            content: '\u3010\u4E1C\u839E\u5E02\u3011\u60A8\u7684\u8BA2\u5355\u5F00\u59CB\u5904\u7406',
            time: '2016-06-09 10:01:09'
          })
        )
      );
    }
  }]);

  return SimpleTimeline;
}(_react.Component), _class.displayName = 'SimpleTimeline', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SimpleTimeline;
module.exports = exports['default'];