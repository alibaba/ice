'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./BasicNotFound.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicNotFound = (_temp = _class = function (_Component) {
  _inherits(BasicNotFound, _Component);

  function BasicNotFound() {
    _classCallCheck(this, BasicNotFound);

    return _possibleConstructorReturn(this, (BasicNotFound.__proto__ || Object.getPrototypeOf(BasicNotFound)).apply(this, arguments));
  }

  _createClass(BasicNotFound, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'basic-not-found' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'not-found-content' },
            _react2.default.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png',
              className: 'img-notfound',
              alt: '\u9875\u9762\u4E0D\u5B58\u5728'
            }),
            _react2.default.createElement(
              'div',
              { className: 'prompt' },
              _react2.default.createElement(
                'h3',
                null,
                '\u62B1\u6B49\uFF0C\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728'
              ),
              _react2.default.createElement(
                'p',
                null,
                '\u60A8\u8981\u627E\u7684\u9875\u9762\u6CA1\u6709\u627E\u5230\uFF0C\u8BF7\u8FD4\u56DE',
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/' },
                  '\u9996\u9875'
                ),
                '\u7EE7\u7EED\u6D4F\u89C8'
              )
            )
          )
        )
      );
    }
  }]);

  return BasicNotFound;
}(_react.Component), _class.displayName = 'BasicNotFound', _temp);
exports.default = BasicNotFound;
module.exports = exports['default'];