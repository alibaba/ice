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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require('@icedesign/base');

require('./main.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = (_temp2 = _class = function (_Component) {
  _inherits(Container, _Component);

  function Container() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Container);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Container.__proto__ || Object.getPrototypeOf(Container)).call.apply(_ref, [this].concat(args))), _this), _this.renderChildren = function () {
      var _this$props = _this.props,
          error = _this$props.error,
          empty = _this$props.empty,
          children = _this$props.children;


      if (error) {
        return _react2.default.createElement(
          'div',
          {
            style: {
              padding: '80px 0',
              textAlign: 'center'
            }
          },
          _react2.default.createElement('img', {
            style: {
              width: '108px'
            },
            src: 'https://img.alicdn.com/tfs/TB1KJkbRFXXXXbRXVXXXXXXXXXX-216-218.png',
            alt: '\u6570\u636E\u52A0\u8F7D\u9519\u8BEF'
          }),
          _react2.default.createElement(
            'p',
            {
              style: {
                width: '80%',
                margin: '30px auto 0',
                color: '#999',
                textAlign: 'center'
              }
            },
            error
          )
        );
      } else if (empty) {
        return _react2.default.createElement(
          'div',
          {
            style: {
              padding: '80px 0',
              textAlign: 'center'
            }
          },
          _react2.default.createElement('img', {
            style: {
              width: '97px'
            },
            src: 'https://img.alicdn.com/tfs/TB1df3oRFXXXXbEXFXXXXXXXXXX-194-220.png',
            alt: '\u6570\u636E\u4E3A\u7A7A'
          }),
          _react2.default.createElement(
            'p',
            {
              style: {
                width: '80%',
                margin: '30px auto 0',
                color: '#999',
                textAlign: 'center'
              }
            },
            empty
          )
        );
      }
      return children;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Container, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          children = _props.children,
          title = _props.title,
          style = _props.style,
          className = _props.className,
          others = _objectWithoutProperties(_props, ['loading', 'children', 'title', 'style', 'className']);

      var containerStyle = _extends({
        backgroundColor: '#fff',
        borderRadius: '6px',
        padding: '20px',
        marginBottom: '20px'
      }, style);

      if (loading) {
        return _react2.default.createElement(
          _base.Loading,
          {
            shape: 'fusion-reactor',
            color: '#66AAFF',
            style: { width: '100%' }
          },
          _react2.default.createElement(
            'div',
            { className: 'container-block ' + className, style: containerStyle },
            children
          )
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: 'container-block ' + className, style: containerStyle }, others),
        title && _react2.default.createElement(
          'h4',
          {
            style: {
              height: '16px',
              lineHeight: '16px',
              fontSize: '16px',
              color: '#333',
              fontWeight: 'bold',
              margin: 0,
              padding: 0,
              marginBottom: '20px'
            }
          },
          title
        ),
        this.renderChildren()
      );
    }
  }]);

  return Container;
}(_react.Component), _class.displayName = 'Container', _class.propTypes = {
  /**
   * 加载的loading
   */
  loading: _propTypes2.default.bool,
  /**
   * 数据错误
   */
  error: _propTypes2.default.any,
  /**
   * 数据为空
   */
  empty: _propTypes2.default.any,
  /**
   * 样式
   */
  style: _propTypes2.default.object,
  /**
   * 样式名
   */
  className: _propTypes2.default.string,
  /**
   * 标题
   */
  title: _propTypes2.default.string
}, _class.defaultProps = {
  loading: false,
  error: false,
  empty: false,
  style: {},
  className: '',
  title: ''
}, _temp2);
exports.default = Container;