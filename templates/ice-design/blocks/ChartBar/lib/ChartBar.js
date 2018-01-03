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

var _bizcharts = require('bizcharts');

var _dataSet = require('@antv/data-set');

require('./ChartBar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartBar = (_temp = _class = function (_Component) {
  _inherits(ChartBar, _Component);

  function ChartBar(props) {
    _classCallCheck(this, ChartBar);

    var _this = _possibleConstructorReturn(this, (ChartBar.__proto__ || Object.getPrototypeOf(ChartBar)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartBar, [{
    key: 'render',
    value: function render() {
      var data = [{
        name: 'London',
        'Jan.': 18.9,
        'Feb.': 28.8,
        'Mar.': 39.3,
        'Apr.': 81.4,
        May: 47,
        'Jun.': 20.3,
        'Jul.': 24,
        'Aug.': 35.6
      }, {
        name: 'Berlin',
        'Jan.': 12.4,
        'Feb.': 23.2,
        'Mar.': 34.5,
        'Apr.': 99.7,
        May: 52.6,
        'Jun.': 35.5,
        'Jul.': 37.4,
        'Aug.': 42.4
      }];

      var ds = new _dataSet.DataSet();
      var dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'], // 展开字段集
        key: '月份', // key字段
        value: '月均降雨量' // value字段
      });

      return _react2.default.createElement(
        'div',
        { className: 'chart-bar' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u67F1\u72B6\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            { height: 400, data: dv, forceFit: true },
            _react2.default.createElement(_bizcharts.Axis, { name: '\u6708\u4EFD' }),
            _react2.default.createElement(_bizcharts.Axis, { name: '\u6708\u5747\u964D\u96E8\u91CF' }),
            _react2.default.createElement(_bizcharts.Legend, null),
            _react2.default.createElement(_bizcharts.Tooltip, { crosshairs: { type: 'y' } }),
            _react2.default.createElement(_bizcharts.Geom, {
              type: 'interval',
              position: '\u6708\u4EFD*\u6708\u5747\u964D\u96E8\u91CF',
              color: 'name',
              adjust: [{ type: 'dodge', marginRatio: 1 / 32 }]
            })
          )
        )
      );
    }
  }]);

  return ChartBar;
}(_react.Component), _class.displayName = 'ChartBar', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartBar;


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};
module.exports = exports['default'];