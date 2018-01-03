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

require('./NotPermission.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotPermission = (_temp = _class = function (_Component) {
  _inherits(NotPermission, _Component);

  function NotPermission(props) {
    _classCallCheck(this, NotPermission);

    var _this = _possibleConstructorReturn(this, (NotPermission.__proto__ || Object.getPrototypeOf(NotPermission)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(NotPermission, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'not-permission', style: styles.notPermission },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'div',
            { style: styles.content },
            _react2.default.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1Gy4Yjv6H8KJjy0FjXXaXepXa-780-780.png',
              style: styles.image,
              alt: 'prmission'
            }),
            _react2.default.createElement(
              'div',
              { style: styles.prompt },
              _react2.default.createElement(
                'h3',
                { style: styles.title },
                '\u62B1\u6B49\uFF0C\u60A8\u65E0\u6743\u9650\uFF5E'
              ),
              _react2.default.createElement(
                'p',
                { style: styles.description },
                '\u62B1\u6B49\uFF0C\u60A8\u6682\u65E0\u6743\u9650\uFF0C\u8BF7\u770B\u770B\u5176\u4ED6\u9875\u9762'
              )
            )
          )
        )
      );
    }
  }]);

  return NotPermission;
}(_react.Component), _class.displayName = 'NotPermission', _temp);
exports.default = NotPermission;


var styles = { content: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }, image: { width: '260px', height: '260px', marginRight: '50px' }, title: { color: '#333', fontSize: '24px', margin: '20px 0' }, description: { color: '#666' }, notPermission: {} };
module.exports = exports['default'];