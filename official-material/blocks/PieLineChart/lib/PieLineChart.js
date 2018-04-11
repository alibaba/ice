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

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xHJDyokLHb
 */
var PieLineChart = (_temp = _class = function (_Component) {
  _inherits(PieLineChart, _Component);

  function PieLineChart(props) {
    _classCallCheck(this, PieLineChart);

    var _this = _possibleConstructorReturn(this, (PieLineChart.__proto__ || Object.getPrototypeOf(PieLineChart)).call(this, props));

    _this.getOption = function () {
      var dataAll = [389, 259, 262, 324, 232, 176, 196, 214, 133, 370];
      var yAxisData = ['原因1', '原因2', '原因3', '原因4', '原因5', '原因6', '原因7', '原因8', '原因9', '原因10'];

      return {
        backgroundColor: '#fff',
        title: [{
          text: '各渠道投诉占比',
          x: '2%',
          y: '1%',
          textStyle: { color: '#666', fontSize: '16' }
        }, {
          text: '投诉原因TOP10',
          x: '40%',
          y: '1%',
          textStyle: { color: '#666', fontSize: '16' }
        }, {
          text: '各级别投诉占比',
          x: '2%',
          y: '50%',
          textStyle: { color: '#666', fontSize: '16' }
        }],
        grid: [{ x: '50%', y: '7%', width: '45%', height: '90%' }],
        tooltip: {
          formatter: '{b} ({c})'
        },
        xAxis: [{
          gridIndex: 0,
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
          axisLine: { show: false }
        }],
        yAxis: [{
          gridIndex: 0,
          interval: 0,
          data: yAxisData.reverse(),
          axisTick: { show: false },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999'
            }
          },
          splitLine: { show: false },
          axisLine: { show: true, lineStyle: { color: '#eee' } }
        }],
        series: [{
          name: '各渠道投诉占比',
          type: 'pie',
          radius: '30%',
          center: ['22%', '25%'],
          color: ['#86c9f4', '#4da8ec', '#3a91d2', '#005fa6', '#315f97'],
          data: [{ value: 335, name: '客服电话' }, { value: 310, name: '奥迪官网' }, { value: 234, name: '媒体曝光' }, { value: 135, name: '质检总局' }, { value: 105, name: '其他' }],
          labelLine: { normal: { show: false } },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b} \n ({d}%)',
                textStyle: { color: '#999' }
              }
            }
          }
        }, {
          name: '各级别投诉占比',
          type: 'pie',
          radius: '30%',
          center: ['22%', '75%'],
          color: ['#86c9f4', '#4da8ec', '#3a91d2', '#005fa6', '#315f97'],
          labelLine: { normal: { show: false } },
          data: [{ value: 335, name: 'A级' }, { value: 310, name: 'B级' }, { value: 234, name: 'C级' }, { value: 135, name: 'D级' }],
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b} \n ({d}%)',
                textStyle: { color: '#999' }
              }
            }
          }
        }, {
          name: '投诉原因TOP10',
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: '45%',
          itemStyle: { normal: { color: '#86c9f4' } },
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: { color: '#9EA7C4' }
            }
          },
          data: dataAll.sort()
        }]
      };
    };

    _this.state = {};
    return _this;
  }

  _createClass(PieLineChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'pie-line-chart' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(_echartsForReact2.default, { option: this.getOption(), style: { height: '680px' } })
        )
      );
    }
  }]);

  return PieLineChart;
}(_react.Component), _class.displayName = 'PieLineChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = PieLineChart;
module.exports = exports['default'];