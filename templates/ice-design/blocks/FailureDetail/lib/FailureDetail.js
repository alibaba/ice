'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _iceCard = require('@ali/ice-card');

var _iceCard2 = _interopRequireDefault(_iceCard);

var _next = require('@alife/next');

require('./FailureDetail.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FailureDetail = function (_Component) {
  _inherits(FailureDetail, _Component);

  function FailureDetail(props) {
    _classCallCheck(this, FailureDetail);

    var _this = _possibleConstructorReturn(this, (FailureDetail.__proto__ || Object.getPrototypeOf(FailureDetail)).call(this, props));

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(FailureDetail, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'failure-detail' },
        _react2.default.createElement(
          _iceCard2.default,
          { style: { padding: '80px 40px' } },
          _react2.default.createElement(
            'div',
            { className: 'success-detail-head' },
            _react2.default.createElement('img', { src: 'https://img.alicdn.com/tfs/TB1LUMhhY_I8KJjy1XaXXbsxpXa-156-156.png' }),
            _react2.default.createElement(
              'h3',
              { className: 'title' },
              '\u63D0\u4EA4\u5931\u8D25'
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'summary' },
            '\u63D0\u4F9B\u4FE1\u606F\u4E0D\u7B26\u5408\u8981\u6C42\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4'
          ),
          _react2.default.createElement(
            'p',
            { className: 'descrpiton' },
            '\u5982\u679C\u6709\u66F4\u591A\u7EC6\u8282\u9700\u8981\u5C55\u793A\uFF0C\u53EF\u4EE5\u8865\u5145\u5728\u8FD9\u91CC\uFF0C\u4E00\u4E9B\u76F8\u5173\u7684\u4ECB\u7ECD\u548C\u63CF\u8FF0'
          ),
          _react2.default.createElement(
            'a',
            { href: '/', className: 'back-to-link' },
            '\u8FD4\u56DE\u4FEE\u6539'
          )
        )
      );
    }
  }]);

  return FailureDetail;
}(_react.Component);

FailureDetail.displayName = 'FailureDetail';
FailureDetail.propTypes = {};
FailureDetail.defaultProps = {};
exports.default = FailureDetail;