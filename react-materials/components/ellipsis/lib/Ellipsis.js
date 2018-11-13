'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _balloon = require('@icedesign/base/lib/balloon');

var _balloon2 = _interopRequireDefault(_balloon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = _balloon2.default.Tooltip;
var IceEllipsis = (_temp = _class = function (_Component) {
  _inherits(IceEllipsis, _Component);

  function IceEllipsis(props) {
    _classCallCheck(this, IceEllipsis);

    var _this = _possibleConstructorReturn(this, (IceEllipsis.__proto__ || Object.getPrototypeOf(IceEllipsis)).call(this, props));

    var isSupportLineClamp = true;
    var node = document.createElement('div');

    if ('WebkitLineClamp' in node.style) {
      node.style['WebkitLineClamp'] = 3;
      if (node.style['WebkitLineClamp'] != 3) {
        isSupportLineClamp = false;
      }
    } else {
      isSupportLineClamp = false;
    }

    _this.state = {
      isSupportLineClamp: isSupportLineClamp,
      wrapWidth: 'auto',
      fontSize: 16
    };
    return _this;
  }

  _createClass(IceEllipsis, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var wrapDOM = _reactDom2.default.findDOMNode(this).parentNode;
      var wrapWidth = (0, _utils.getWidthFromDOM)(wrapDOM);
      // 拿到父结构的 font-size 用于自动计算宽度
      var fontSize = parseInt(window.getComputedStyle(wrapDOM, null).getPropertyValue('font-size'));

      this.setState({
        wrapWidth: wrapWidth,
        fontSize: fontSize
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var content = null;

      var _props = this.props,
          lineLimit = _props.lineLimit,
          text = _props.text,
          others = _objectWithoutProperties(_props, ['lineLimit', 'text']);

      var cls = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, 'ice-ellipsis', true), _defineProperty(_classnames, this.props.className, this.props.className), _classnames));
      var style = _extends({}, this.props.style);

      var _state = this.state,
          wrapWidth = _state.wrapWidth,
          isSupportLineClamp = _state.isSupportLineClamp,
          fontSize = _state.fontSize;


      if (lineLimit === 1) {
        content = _react2.default.createElement(
          'span',
          {
            className: cls,
            style: _extends({
              width: wrapWidth,
              textOverflow: 'ellipsis',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }, style)
          },
          text
        );
      } else if (lineLimit > 1) {
        if (this.state.isSupportLineClamp) {
          var _extends2;

          content = _react2.default.createElement(
            'span',
            {
              className: cls,
              style: _extends((_extends2 = {
                width: wrapWidth,
                textOverflow: 'ellipsis',
                display: 'inline-block',
                overflow: 'hidden'
              }, _defineProperty(_extends2, 'display', '-webkit-box'), _defineProperty(_extends2, 'WebkitLineClamp', lineLimit), _defineProperty(_extends2, 'WebkitBoxOrient', 'vertical'), _extends2), style)
            },
            text
          );
        } else {
          var lineCount = 10;
          if (wrapWidth !== 'auto') {
            lineCount = parseFloat(wrapWidth / fontSize, 10);
          }
          lineCount = Math.floor(lineCount);

          var textArr = getTextArr(text, lineCount, lineLimit);

          var textList = textArr.map(function (item, index) {
            // 最后一个超过一行长度的裁切一下加下省略号
            if (index == lineLimit - 1 && item.length === lineCount) {
              return _react2.default.createElement(
                'span',
                { key: index },
                setEllipsis(item)
              );
            }

            return _react2.default.createElement(
              'span',
              { key: index },
              item
            );
          });

          content = _react2.default.createElement(
            'span',
            {
              className: cls,
              style: _extends({
                width: wrapWidth
              }, style)
            },
            textList
          );
        }
      }

      if (this.props.showTooltip) {
        return _react2.default.createElement(Tooltip, _extends({
          trigger: content,
          align: 'b',
          text: text
        }, this.props.tooltipProps));
      } else {
        return _react2.default.createElement(
          'span',
          { title: text },
          content
        );
      }
    }
  }]);

  return IceEllipsis;
}(_react.Component), _class.displayName = 'IceEllipsis', _class.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  /**
   * 渲染几行文本
   */
  lineLimit: _propTypes2.default.number,
  /**
   * 是否显示额外的 tool tip 展示全部内容
   */
  showTooltip: _propTypes2.default.bool,
  /**
   * 实际文本内容
   */
  text: _propTypes2.default.string,
  /**
   * 针对 tooltip 模式下，Tooltip 组件的自定义 props
   */
  tooltipProps: _propTypes2.default.object
}, _class.defaultProps = {
  className: '',
  lineLimit: 1,
  showTooltip: false,
  // 设置内容
  text: '',
  tooltipProps: {}
}, _temp);
exports.default = IceEllipsis;


function getTextArr(text, lineTextLength, lineLimit) {
  var result = [];

  for (var i = 1; i <= Math.ceil(text.length / lineTextLength); i++) {
    var start = lineTextLength * (i - 1);
    var end = Math.min(i * lineTextLength, text.length);
    var currentStr = text.substring(start, end);
    result.push(currentStr);
  }

  if (result.length > lineLimit) {
    result.splice(lineLimit);
  }

  return result;
}
function setEllipsis(text) {
  var textArr = text.split('');
  textArr.splice(textArr.length - 1, 3, '...');
  return textArr.join('');
}