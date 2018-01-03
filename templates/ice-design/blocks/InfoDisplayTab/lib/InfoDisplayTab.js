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

var _ellipsis = require('@icedesign/ellipsis');

var _ellipsis2 = _interopRequireDefault(_ellipsis);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

require('./InfoDisplayTab.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = require('@icedesign/base/lib/tab');

var Button = require('@icedesign/base/lib/button');

var Grid = require('@icedesign/base/lib/grid');

var Row = Grid.Row,
    Col = Grid.Col;
var TabPane = Tab.TabPane;
var InfoDisplayTab = (_temp = _class = function (_Component) {
  _inherits(InfoDisplayTab, _Component);

  function InfoDisplayTab(props) {
    _classCallCheck(this, InfoDisplayTab);

    var _this = _possibleConstructorReturn(this, (InfoDisplayTab.__proto__ || Object.getPrototypeOf(InfoDisplayTab)).call(this, props));

    _this.getData = function () {
      _axios2.default.get('/mock/info-display-tab.json').then(function (response) {
        _this.setState({
          tabData: response.data.data || {}
        });
      }).catch(function (error) {
        console.log(error);
      });
    };

    _this.renderContent = function (data) {
      return data.map(function (item, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: 'column-card', style: styles.columnCard },
          _react2.default.createElement(
            Row,
            null,
            _react2.default.createElement(
              Col,
              { className: 'column-card-title titleStyle', style: styles.columnCardTitleTitleStyle },
              item.title
            )
          ),
          _react2.default.createElement(
            Row,
            {
              style: styles.todo0
            },
            _react2.default.createElement(
              Col,
              null,
              _react2.default.createElement(
                'div',
                { className: 'column-card-desc', style: styles.columnCardDesc },
                _react2.default.createElement(_ellipsis2.default, { lineLimit: 6, text: item.desc })
              )
            )
          ),
          _react2.default.createElement(
            Row,
            {
              style: styles.todo1
            },
            _react2.default.createElement(
              Col,
              null,
              _react2.default.createElement(
                Button,
                {
                  type: 'primary',
                  component: 'a',
                  href: 'http://www.taobao.com',
                  target: '_blank',
                  size: 'large'
                },
                '\u7533\u8BF7\u9891\u9053'
              )
            )
          )
        );
      });
    };

    _this.state = {
      tabData: {}
    };
    return _this;
  }

  /**
   * 异步获取数据
   */


  _createClass(InfoDisplayTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getData();
    }
  }, {
    key: 'render',
    value: function render() {
      var tabData = this.state.tabData;

      return _react2.default.createElement(
        'div',
        { className: 'info-display-tab', style: styles.infoDisplayTab },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            Tab,
            { type: 'bar', onChange: this.callback },
            _react2.default.createElement(
              TabPane,
              { tab: '\u5168\u90E8\u9891\u9053', key: '1' },
              tabData.all ? this.renderContent(tabData.all) : '暂无数据'
            ),
            _react2.default.createElement(
              TabPane,
              { tab: '\u53EF\u7533\u8BF7\u9891\u9053', key: '2' },
              tabData.apply ? this.renderContent(tabData.apply) : '暂无数据'
            ),
            _react2.default.createElement(
              TabPane,
              { tab: '\u5DF2\u83B7\u5F97\u9891\u9053', key: '3' },
              tabData.existing ? this.renderContent(tabData.existing) : '暂无数据'
            )
          )
        )
      );
    }
  }]);

  return InfoDisplayTab;
}(_react.Component), _class.displayName = 'InfoDisplayTab', _class.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
}, _class.defaultProps = {}, _temp);
exports.default = InfoDisplayTab;


var styles = { "columnCard": { "float": "left", "width": "284px", "overflow": "hidden", "boxShadow": "0px 0px 2px 0px rgba(0" }, "columnCardDesc": { "height": "144px", "overflow": "hidden", "lineHeight": "24px", "fontSize": "14px", "color": "#666", "margin": "5px auto 0 auto" }, "infoDisplayTab": {}, "todo0": { "marginTop": "20px" }, "todo1": { "textAlign": "center", "marginTop": "15px" } };
module.exports = exports['default'];