'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qrcode = require('qrcode.react');

var _qrcode2 = _interopRequireDefault(_qrcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IceQrcodePanel = (_temp = _class = function (_Component) {
  _inherits(IceQrcodePanel, _Component);

  function IceQrcodePanel() {
    _classCallCheck(this, IceQrcodePanel);

    return _possibleConstructorReturn(this, (IceQrcodePanel.__proto__ || Object.getPrototypeOf(IceQrcodePanel)).apply(this, arguments));
  }

  _createClass(IceQrcodePanel, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          text = _props.text,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          other = _objectWithoutProperties(_props, ['text', 'className', 'style']);

      // object


      return _react2.default.createElement(
        'div',
        {
          className: className,
          style: _extends({
            display: 'inline-block',
            textAlign: 'center'
          }, style)
        },
        _react2.default.createElement(
          'div',
          { style: { lineHeight: 0 } },
          _react2.default.createElement(_qrcode2.default, other)
        ),
        typeof text === 'string' && _react2.default.createElement(
          'span',
          {
            style: {
              lineHeight: 1.6,
              paddingTop: '4px',
              fontSize: '12px',
              display: 'block',
              color: '#666'
            }
          },
          text
        ),
        (0, _react.isValidElement)(text) && text
      );
    }
  }]);

  return IceQrcodePanel;
}(_react.Component), _class.propTypes = {
  /**
   * 二维码的展示内容
   */
  value: _propTypes2.default.string.isRequired,
  /**
   * 二维码下方文案
   */
  text: _propTypes2.default.node,
  /**
   * 二维码展示位置
   */
  align: _propTypes2.default.oneOf(['left', 'right', 'top', 'bottom']),
  /**
   * 二维码背景色
   */
  bgColor: _propTypes2.default.string,
  /**
   * 二维码前景色
   */
  fgColor: _propTypes2.default.string,
  /**
   * 二维码的纠错等级
   */
  level: _propTypes2.default.oneOf(['L', 'M', 'Q', 'H']),
  /**
   * 二维码尺寸
   */
  size: _propTypes2.default.number
}, _class.defaultProps = {
  text: null,
  value: null,
  size: 128,
  bgColor: '#ffffff',
  fgColor: '#000000',
  level: 'L'
}, _temp);
exports.default = IceQrcodePanel;