'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./RightContentDisplay.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RightContentDisplay = (_temp = _class = function (_Component) {
  _inherits(RightContentDisplay, _Component);

  function RightContentDisplay(props) {
    _classCallCheck(this, RightContentDisplay);

    var _this = _possibleConstructorReturn(this, (RightContentDisplay.__proto__ || Object.getPrototypeOf(RightContentDisplay)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(RightContentDisplay, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _defineProperty({ className: 'right-content-display', style: styles.rightContentDisplay }, 'style', styles.container),
        _react2.default.createElement(
          'div',
          { style: styles.content },
          _react2.default.createElement(
            'div',
            { style: styles.col },
            _react2.default.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1MgyDjsLJ8KJjy0FnXXcFDpXa-618-1046.png',
              alt: 'img',
              style: styles.image
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.col },
            _react2.default.createElement(
              'h2',
              { style: styles.title },
              '\u529F\u80FD\u63CF\u8FF0'
            ),
            _react2.default.createElement(
              'p',
              { style: styles.description },
              '\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848\uFF0C\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848\u529F\u80FD\u63CF\u8FF0\u7684\u6587\u6848'
            )
          )
        )
      );
    }
  }]);

  return RightContentDisplay;
}(_react.Component), _class.displayName = 'RightContentDisplay', _temp);
exports.default = RightContentDisplay;


var styles = { container: { margin: '0 auto', width: '1080px' }, content: { display: 'flex', position: 'relative', alignItems: 'center', overflow: 'hidden', height: '600px' }, col: { width: '50%' }, title: { fontSize: '28px', fontWeight: 'bold' }, description: { color: '#666', lineHeight: '22px' }, image: { position: 'absolute', top: '20px', width: '40%' }, rightContentDisplay: {} };
module.exports = exports['default'];