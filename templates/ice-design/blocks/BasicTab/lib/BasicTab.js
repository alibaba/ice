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

require('./BasicTab.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = require('@icedesign/base/lib/tab');

var BasicTab = (_temp = _class = function (_Component) {
  _inherits(BasicTab, _Component);

  function BasicTab() {
    _classCallCheck(this, BasicTab);

    return _possibleConstructorReturn(this, (BasicTab.__proto__ || Object.getPrototypeOf(BasicTab)).apply(this, arguments));
  }

  _createClass(BasicTab, [{
    key: 'render',
    value: function render() {
      var tabs = [{ tab: '订阅号概览', key: 'guide' }, { tab: '订阅号推送', key: 'push' }, { tab: '互动消息', key: 'message' }, { tab: '自动回复设置', key: 'autoreply' }];

      return _react2.default.createElement(
        'div',
        { className: 'basic-tab' },
        _react2.default.createElement(
          _card2.default,
          { style: styles.tabCardStyle },
          _react2.default.createElement(
            Tab,
            { contentStyle: { display: 'none' } },
            tabs.map(function (item) {
              return _react2.default.createElement(Tab.TabPane, { key: item.key, tab: item.tab });
            })
          )
        )
      );
    }
  }]);

  return BasicTab;
}(_react.Component), _class.displayName = 'BasicTab', _temp);
exports.default = BasicTab;


var styles = {
  tabCardStyle: {
    display: 'flex',
    padding: '0',
    alignItems: 'flex-end'
  }
};
module.exports = exports['default'];