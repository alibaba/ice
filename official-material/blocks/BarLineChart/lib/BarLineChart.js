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
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xHyE7GIMdG
 */
var BarLineChart = (_temp = _class = function (_Component) {
  _inherits(BarLineChart, _Component);

  function BarLineChart(props) {
    _classCallCheck(this, BarLineChart);

    var _this = _possibleConstructorReturn(this, (BarLineChart.__proto__ || Object.getPrototypeOf(BarLineChart)).call(this, props));

    _this.getOption = function () {
      return {
        title: {
          text: '自定义的折柱混合--BarLine',
          left: 'center',
          y: '2',
          textStyle: {
            color: '#666'
          }
        },
        backgroundColor: '#fff',
        color: '#384757',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#384757'
            }
          }
        },
        legend: {
          data: [{
            name: '待处理',
            icon: 'circle',
            textStyle: {
              color: '#666'
            }
          }, {
            name: '已处理',
            icon: 'circle',
            textStyle: {
              color: '#666'
            }
          }, {
            name: '完成率',
            icon: 'circle',
            textStyle: {
              color: '#666'
            }
          }],
          top: '10%',
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [{
          type: 'category',
          data: ['1街', '2街', '3街', '4街', '5街', '6街'],
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: '不文明现象',
          nameTextStyle: {
            color: '#666'
          },
          min: 0,
          max: 50,
          interval: 10,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666'
            }
          },
          axisLine: {
            show: true
          },
          splitLine: {
            lineStyle: {
              color: '#666'
            }
          }
        }, {
          type: 'value',
          name: '完成率',
          show: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666'
            }
          }
        }],
        grid: {
          top: '20%'
        },
        series: [{
          name: '待处理',
          type: 'bar',
          data: [4, 6, 36, 6, 8, 6],
          barWidth: 'auto',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255,37,117,0.7)'
                }, {
                  offset: 0.5,
                  color: 'rgba(0,133,245,0.7)'
                }, {
                  offset: 1,
                  color: 'rgba(0,133,245,0.3)'
                }],
                globalCoord: false
              }
            }
          }
        }, {
          name: '已处理',
          type: 'bar',
          data: [4, 2, 36, 6, 8, 6],
          barWidth: 'auto',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255,37,117,0.7)'
                }, {
                  offset: 0.5,
                  color: 'rgba(0,255,252,0.7)'
                }, {
                  offset: 1,
                  color: 'rgba(0,255,252,0.3)'
                }],
                globalCoord: false
              }
            }
          },
          barGap: '0'
        }, {
          name: '完成率',
          type: 'line',
          yAxisIndex: 1,
          data: [100, 33, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: '#ffaa00'
            }
          },
          smooth: true
        }]
      };
    };

    _this.state = {};
    return _this;
  }

  _createClass(BarLineChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'bar-line-chart' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(_echartsForReact2.default, { option: this.getOption(), style: { height: '350px' } })
        )
      );
    }
  }]);

  return BarLineChart;
}(_react.Component), _class.displayName = 'BarLineChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = BarLineChart;
module.exports = exports['default'];