'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bizcharts = require('bizcharts');

var _dataSet = require('@antv/data-set');

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./ChartTypeLine.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartTypeLine = (_temp = _class = function (_Component) {
  _inherits(ChartTypeLine, _Component);

  function ChartTypeLine(props) {
    _classCallCheck(this, ChartTypeLine);

    var _this = _possibleConstructorReturn(this, (ChartTypeLine.__proto__ || Object.getPrototypeOf(ChartTypeLine)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartTypeLine, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      // 数据源
      var data = [{ month: 'Jan', Tokyo: 7.0, London: 3.9 }, { month: 'Feb', Tokyo: 6.9, London: 4.2 }, { month: 'Mar', Tokyo: 9.5, London: 5.7 }, { month: 'Apr', Tokyo: 14.5, London: 8.5 }, { month: 'May', Tokyo: 18.4, London: 11.9 }, { month: 'Jun', Tokyo: 21.5, London: 15.2 }, { month: 'Jul', Tokyo: 25.2, London: 17.0 }, { month: 'Aug', Tokyo: 26.5, London: 16.6 }, { month: 'Sep', Tokyo: 23.3, London: 14.2 }, { month: 'Oct', Tokyo: 18.3, London: 10.3 }, { month: 'Nov', Tokyo: 13.9, London: 6.6 }, { month: 'Dec', Tokyo: 9.6, London: 4.8 }];

      // DataSet https://github.com/alibaba/BizCharts/blob/master/doc/tutorial/dataset.md#dataset
      var ds = new _dataSet.DataSet();
      var dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['Tokyo', 'London'],
        key: 'city',
        value: 'temperature'
      });

      // 定义度量
      var cols = {
        month: {
          range: [0, 1]
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'chart-type-line' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u6298\u7EBF\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            { height: 400, data: dv, scale: cols, forceFit: true },
            _react2.default.createElement(_bizcharts.Axis, { name: 'month' }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'temperature', label: { formatter: function formatter(val) {
                  return val + '\xB0C';
                } } }),
            _react2.default.createElement(_bizcharts.Tooltip, { crosshairs: { type: 'y' } }),
            _react2.default.createElement(_bizcharts.Geom, {
              type: 'line',
              position: 'month*temperature',
              size: 2,
              color: 'city',
              shape: 'smooth'
            }),
            _react2.default.createElement(_bizcharts.Geom, {
              type: 'point',
              position: 'month*temperature',
              size: 4,
              shape: 'circle',
              color: 'city',
              style: { stroke: '#fff', lineWidth: 1 }
            })
          )
        )
      );
    }
  }]);

  return ChartTypeLine;
}(_react.Component), _class.displayName = 'ChartTypeLine', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartTypeLine;


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