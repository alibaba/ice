'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = require('@icedesign/base/lib/slider');

var slides = [{
  url: 'https://img.alicdn.com/tps/TB1bewbNVXXXXc5XXXXXXXXXXXX-1000-300.png',
  text: '手机淘宝皮肤征集'
}, {
  url: 'https://img.alicdn.com/tps/TB1xuUcNVXXXXcRXXXXXXXXXXXX-1000-300.jpg',
  text: '阿里公益T恤设计大概'
}, {
  url: 'https://img.alicdn.com/tps/TB1ikP.NVXXXXaYXpXXXXXXXXXX-1000-300.jpg',
  text: '淘公仔设计大赛'
}, {
  url: 'https://img.alicdn.com/tps/TB1s1_JNVXXXXbhaXXXXXXXXXXX-1000-300.jpg',
  text: '磁带播放器换肤设计大赛'
}];

var SimpleSlider = (_temp = _class = function (_Component) {
  _inherits(SimpleSlider, _Component);

  function SimpleSlider(props) {
    _classCallCheck(this, SimpleSlider);

    var _this = _possibleConstructorReturn(this, (SimpleSlider.__proto__ || Object.getPrototypeOf(SimpleSlider)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SimpleSlider, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _container2.default,
        null,
        _react2.default.createElement(
          Slider,
          null,
          slides.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              { key: index },
              _react2.default.createElement('img', { src: item.url, alt: item.text, style: styles.itemImg })
            );
          })
        )
      );
    }
  }]);

  return SimpleSlider;
}(_react.Component), _class.displayName = 'SimpleSlider', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SimpleSlider;


var styles = {
  itemImg: {
    width: '100%'
  }
};
module.exports = exports['default'];