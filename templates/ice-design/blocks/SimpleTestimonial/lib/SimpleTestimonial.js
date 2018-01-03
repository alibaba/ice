'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./SimpleTestimonial.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleTestimonial = (_temp = _class = function (_Component) {
  _inherits(SimpleTestimonial, _Component);

  function SimpleTestimonial(props) {
    _classCallCheck(this, SimpleTestimonial);

    var _this = _possibleConstructorReturn(this, (SimpleTestimonial.__proto__ || Object.getPrototypeOf(SimpleTestimonial)).call(this, props));

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(SimpleTestimonial, [{
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
        { className: 'simple-testimonial', style: styles.simpleTestimonial },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'div',
            { style: styles.item },
            _react2.default.createElement(
              'p',
              { style: styles.description },
              '\u201C \u968F\u7740\u4E2A\u4EBA\u7528\u6237\u5BF9\u4E8E\u4E92\u8054\u7F51\u5185\u5BB9\u83B7\u53D6\u7684\u8981\u6C42\u548C\u53E3\u5473\u8D8A\u6765\u8D8A\u7279\u522B\uFF0C\u600E\u6837\u63D0\u4F9B\u66F4\u52A0\u7CBE\u51C6\u4E2A\u6027\u5316\u7684\u8D44 \u8BAF\u8BA2\u9605\u670D\u52A1\u662F\u63D0\u5347\u7528\u6237\u4F53\u9A8C\u7684\u5173\u952E\u3002\u867D\u7136\u6211\u4EEC\u53D1\u73B0\u76EE\u524D\u5E02\u9762\u4E0A\u6709\u975E\u5E38\u591A\u7684\u8D44\u8BAF\u7C7B app \u90FD\u6807\u699C\u81EA\u5DF1\u80FD \u591F\u63D0\u4F9B\u4E2A\u4EBA\u5B9A\u5236\u5316\u7684\u65B0\u95FB\u9605\u8BFB\u529F\u80FD\uFF0C\u4F46\u662F\u672C\u8D28\u4E0A\u6765\u8BF4\u4E00\u822C\u90FD\u662F\u901A\u8FC7\u65B0\u95FB\u6E90+\u5174\u8DA3\u70B9+\u667A\u80FD\u63A8\u8350\u8FD9\u6837\u7684\u7EC4\u5408\u5B9E\u73B0\u7684 \u201D'
            ),
            _react2.default.createElement(
              'div',
              { style: styles.infoBox },
              _react2.default.createElement('img', {
                style: styles.avatar,
                src: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
              }),
              _react2.default.createElement(
                'h5',
                { style: styles.name },
                '\u4EBA\u7269\u540D'
              ),
              _react2.default.createElement(
                'p',
                { style: styles.company },
                '\u5C31\u804C\u516C\u53F8/\u804C\u52A1'
              )
            )
          )
        )
      );
    }
  }]);

  return SimpleTestimonial;
}(_react.Component), _class.displayName = 'SimpleTestimonial', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SimpleTestimonial;


var styles = { item: { width: '80%', margin: '0 auto', textAlign: 'center' }, description: { lineHeight: '28px' }, infoBox: { display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }, avatar: { width: '64px', height: '64px' }, name: { margin: '0 15px', fontSize: '15px', fontWeight: 'bold' }, company: { margin: 0 }, simpleTestimonial: {} };
module.exports = exports['default'];