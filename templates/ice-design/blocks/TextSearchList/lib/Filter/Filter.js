'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _card2.default,
        { style: styles.container },
        _react2.default.createElement(
          'div',
          { style: styles.category },
          _react2.default.createElement(
            'span',
            { style: styles.label },
            '\u6240\u5C5E\u7C7B\u76EE\uFF1A'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u5168\u90E8'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E00'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E8C'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E09'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u56DB'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.others },
          _react2.default.createElement(
            'span',
            { style: styles.label },
            '\u5176\u5B83\u7B5B\u9009\uFF1A'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u5168\u90E8'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E00'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E8C'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E09'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u56DB'
          )
        )
      );
    }
  }]);

  return Filter;
}(_react.Component);

exports.default = Filter;


var styles = {
  container: {},
  category: {
    padding: '0 10px 15px',
    borderBottom: '1px solid #eee'
  },
  others: {
    padding: '15px 10px 0'
  },
  label: {
    color: '#333',
    fontSize: '14px',
    marginRight: '10px'
  },
  item: {
    marginRight: '10px'
  }
};
module.exports = exports['default'];