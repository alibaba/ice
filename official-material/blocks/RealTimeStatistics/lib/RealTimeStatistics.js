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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = require('@icedesign/base/lib/grid');

var Row = Grid.Row,
    Col = Grid.Col;
var RealTimeStatistics = (_temp = _class = function (_Component) {
  _inherits(RealTimeStatistics, _Component);

  function RealTimeStatistics(props) {
    _classCallCheck(this, RealTimeStatistics);

    var _this = _possibleConstructorReturn(this, (RealTimeStatistics.__proto__ || Object.getPrototypeOf(RealTimeStatistics)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(RealTimeStatistics, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'real-time-statistics' },
        _react2.default.createElement(
          Row,
          { wrap: true, gutter: '20', style: styles.items },
          _react2.default.createElement(
            Col,
            { xxs: '24', s: '12', l: '6' },
            _react2.default.createElement(
              'div',
              { style: _extends({}, styles.itemBody, styles.green) },
              _react2.default.createElement(
                'div',
                { style: styles.itemTitle },
                _react2.default.createElement(
                  'p',
                  { style: styles.titleText },
                  '\u5206\u7C7B\u7EDF\u8BA1'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.tag },
                  '\u5B9E\u65F6'
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.itemContent },
                _react2.default.createElement(
                  'h2',
                  { style: styles.itemNum },
                  '7,993'
                ),
                _react2.default.createElement(
                  'div',
                  { style: styles.itemMeta },
                  _react2.default.createElement(
                    'p',
                    { style: styles.total },
                    '7,993'
                  ),
                  _react2.default.createElement(
                    'p',
                    { style: styles.desc },
                    '\u5F53\u524D\u5206\u7C7B\u603B\u8BB0\u5F55\u6570'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { xxs: '24', s: '12', l: '6' },
            _react2.default.createElement(
              'div',
              { style: _extends({}, styles.itemBody, styles.lightBlue) },
              _react2.default.createElement(
                'div',
                { style: styles.itemTitle },
                _react2.default.createElement(
                  'p',
                  { style: styles.titleText },
                  '\u9644\u4EF6\u7EDF\u8BA1'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.tag },
                  '\u5B9E\u65F6'
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.itemContent },
                _react2.default.createElement(
                  'h2',
                  { style: styles.itemNum },
                  '3,112'
                ),
                _react2.default.createElement(
                  'div',
                  { style: styles.itemMeta },
                  _react2.default.createElement(
                    'p',
                    { style: styles.total },
                    '3,112'
                  ),
                  _react2.default.createElement(
                    'p',
                    { style: styles.desc },
                    '\u5F53\u524D\u4E0A\u4F20\u7684\u9644\u4EF6\u6570'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { xxs: '24', s: '12', l: '6' },
            _react2.default.createElement(
              'div',
              { style: _extends({}, styles.itemBody, styles.darkBlue) },
              _react2.default.createElement(
                'div',
                { style: styles.itemTitle },
                _react2.default.createElement(
                  'p',
                  { style: styles.titleText },
                  '\u6587\u7AE0\u7EDF\u8BA1'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.tag },
                  '\u5B9E\u65F6'
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.itemRow },
                _react2.default.createElement(
                  'div',
                  { style: styles.itemCol },
                  _react2.default.createElement(
                    'h2',
                    { style: styles.itemNum },
                    '908'
                  ),
                  _react2.default.createElement(
                    'p',
                    { style: styles.desc },
                    '\u8BC4\u8BBA\u6B21\u6570'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { style: styles.itemCol },
                  _react2.default.createElement(
                    'h2',
                    { style: styles.itemNum },
                    '263'
                  ),
                  _react2.default.createElement(
                    'p',
                    { style: styles.desc },
                    '\u70B9\u8D5E\u6B21\u6570'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { xxs: '24', s: '12', l: '6' },
            _react2.default.createElement(
              'div',
              { style: _extends({}, styles.itemBody, styles.navyBlue) },
              _react2.default.createElement(
                'div',
                { style: styles.itemTitle },
                _react2.default.createElement(
                  'p',
                  { style: styles.titleText },
                  '\u65B0\u95FB\u7EDF\u8BA1'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.tag },
                  '\u5B9E\u65F6'
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.itemRow },
                _react2.default.createElement(
                  'div',
                  { style: styles.itemCol },
                  _react2.default.createElement(
                    'h2',
                    { style: styles.itemNum },
                    '908'
                  ),
                  _react2.default.createElement(
                    'p',
                    { style: styles.desc },
                    '\u8BC4\u8BBA\u6B21\u6570'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { style: styles.itemCol },
                  _react2.default.createElement(
                    'h2',
                    { style: styles.itemNum },
                    '263'
                  ),
                  _react2.default.createElement(
                    'p',
                    { style: styles.desc },
                    '\u70B9\u8D5E\u6B21\u6570'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return RealTimeStatistics;
}(_react.Component), _class.displayName = 'RealTimeStatistics', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = RealTimeStatistics;


var styles = {
  item: {
    marginBottom: '20px'
  },
  itemBody: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '4px',
    color: '#fff',
    height: '158px'
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    position: 'relative'
  },
  titleText: {
    margin: 0,
    fontSize: '14px'
  },
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.3)'
  },
  itemNum: {
    margin: '16px 0',
    fontSize: '32px'
  },
  total: {
    margin: 0,
    fontSize: '12px'
  },
  desc: {
    margin: 0,
    fontSize: '12px'
  },
  green: {
    background: '#31B48D'
  },
  lightBlue: {
    background: '#38A1F2'
  },
  darkBlue: {
    background: '#7538C7'
  },
  navyBlue: {
    background: '#3B67A4'
  }
};
module.exports = exports['default'];