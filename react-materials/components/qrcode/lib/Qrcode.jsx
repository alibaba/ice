'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _base = require('@icedesign/base');

var _foundationSymbol = require('foundation-symbol');

var _foundationSymbol2 = _interopRequireDefault(_foundationSymbol);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IceQrcode = (_temp2 = _class = function (_Component) {
  _inherits(IceQrcode, _Component);

  function IceQrcode() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IceQrcode);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IceQrcode.__proto__ || Object.getPrototypeOf(IceQrcode)).call.apply(_ref, [this].concat(args))), _this), _this.alignMap = {
      left: 'lb',
      right: 'rb',
      top: 't',
      bottom: 'b'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IceQrcode, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          align = _props.align,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          trigger = _props.trigger,
          other = _objectWithoutProperties(_props, ['align', 'className', 'style', 'trigger']);

      var content = _react2.default.createElement(_Panel2.default, other);

      return _react2.default.createElement(
        'span',
        { className: className, style: _extends({ color: '#333' }, style) },
        _react2.default.createElement(
          _base.Balloon,
          {
            align: this.alignMap[align] || 'lb',
            closable: false,
            overlay: content,
            trigger: trigger || _react2.default.createElement(_foundationSymbol2.default, {
              style: this.props.triggerStyle,
              type: 'qrcode',
              size: this.props.triggerSize
            }),
            triggerType: 'hover'
          },
          content
        )
      );
    }
  }]);

  return IceQrcode;
}(_react.Component), _class.displayName = 'IceQrcode', _class.propTypes = {
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
   * 触发器 icon 的大小
   */
  triggerSize: _propTypes2.default.oneOf(['xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl']),
  /**
   * 触发器 icon 的 inline-style
   */
  triggerStyle: _propTypes2.default.object,
  /**
   * 触发器的触发节点
   */
  trigger: _propTypes2.default.node
}, _class.defaultProps = {
  triggerSize: 'medium',
  triggerStyle: {},
  align: 'left'
}, _temp2);
exports.default = IceQrcode;