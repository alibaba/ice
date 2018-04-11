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
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xBJSFJgFFf
 */
var CustomPieChart = (_temp = _class = function (_Component) {
  _inherits(CustomPieChart, _Component);

  function CustomPieChart(props) {
    _classCallCheck(this, CustomPieChart);

    var _this = _possibleConstructorReturn(this, (CustomPieChart.__proto__ || Object.getPrototypeOf(CustomPieChart)).call(this, props));

    _this.getOption = function () {
      var man = 58;
      var woman = 42;
      var city = 65;
      var coun = 35;
      var Icons = {
        man: 'https://img.alicdn.com/tfs/TB1ek8heL9TBuNjy0FcXXbeiFXa-12-26.png',
        woman: 'https://img.alicdn.com/tfs/TB1zi90eSBYBeNjy0FeXXbnmFXa-12-26.png',
        city: 'https://img.alicdn.com/tfs/TB1fA8heL9TBuNjy0FcXXbeiFXa-24-21.png',
        coun: 'https://img.alicdn.com/tfs/TB1fCxOeN9YBuNjy0FfXXXIsVXa-24-24.png'
      };
      return {
        backgroundColor: '#fff',
        tooltip: {
          formatter: '{b} ({c})'
        },
        grid: [{
          show: false,
          left: '15%',
          top: '70%',
          width: '30%',
          height: 120
        }, {
          show: false,
          left: '55%',
          top: '70%',
          width: '30%',
          height: 120
        }],
        xAxis: [{
          gridIndex: 0,
          type: 'value',
          min: -50,
          max: 180,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        }, {
          gridIndex: 1,
          type: 'value',
          min: -50,
          max: 180,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        }],
        yAxis: [{
          gridIndex: 0,
          type: 'category',
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          data: ['男性', '女性'],
          inverse: true,
          axisLabel: {
            color: '#666',
            fontsize: 14,
            width: 55,
            margin: -65,
            rich: {
              man: {
                height: 25,
                align: 'center',
                backgroundColor: {
                  image: Icons.man
                }
              },
              men: {
                height: 25,
                align: 'center',
                backgroundColor: {
                  image: Icons.woman
                }
              }
            }
          }
        }, {
          gridIndex: 1,
          type: 'category',
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          data: ['城镇', '乡村'],
          inverse: true,
          axisLabel: {
            color: '#666',
            fontsize: 14,
            width: 55,
            margin: -65,
            rich: {
              city: {
                height: 20,
                align: 'center',
                backgroundColor: {
                  image: 'Icons.city'
                }
              },
              coun: {
                height: 20,
                align: 'center',
                backgroundColor: {
                  image: Icons.coun
                }
              }
            }
          }
        }],
        series: [{
          name: '性别结构',
          type: 'pie',
          radius: '35%',
          center: ['30%', '40%'],
          clockwise: false,
          data: [{
            value: man,
            name: '男性'
          }, {
            value: woman,
            name: '女性'
          }],
          itemStyle: {
            normal: {
              color: function color(params) {
                var colorList = ['#13356b', '#823956'];
                return colorList[params.dataIndex];
              }
            }
          },
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }, {
          name: '性别外圈',
          type: 'pie',
          radius: ['40%', '40%'],
          center: ['30%', '40%'],
          clockwise: false,
          hoverAnimation: false,
          data: [{
            value: 4,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)'
              }
            }
          }, {
            value: man,
            name: '男性',
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#6394f4'
              }
            }
          }, {
            value: 4,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)'
              }
            }
          }, {
            value: woman,
            name: '女性',
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#dc7caa'
              }
            }
          }],

          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }, {
          name: '性别',
          type: 'pictorialBar',
          symbol: 'rect',
          data: [{
            value: man,
            symbolRepeat: true,
            symbolSize: [6, 23],
            symbolMargin: 2
          }, {
            value: woman,
            symbolRepeat: true,
            symbolSize: [6, 23],
            symbolMargin: 2
          }],
          itemStyle: {
            normal: {
              color: function color(params) {
                var colorList = ['#13356b', '#823956'];
                return colorList[params.dataIndex];
              }
            }
          },
          label: {
            normal: {
              show: true,
              color: '#666',
              fontSize: 15,
              position: [120, 10],
              formatter: '{c}%'
            }
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: '50%'
        }, {
          name: '城乡结构',
          type: 'pie',
          radius: '35%',
          center: ['70%', '40%'],
          clockwise: false,
          data: [{
            value: city,
            name: '城镇'
          }, {
            value: coun,
            name: '乡村'
          }],
          itemStyle: {
            normal: {
              color: function color(params) {
                var colorList = ['#13356b', '#885132'];
                return colorList[params.dataIndex];
              }
            }
          },
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }, {
          name: '城乡外圈',
          type: 'pie',
          radius: ['40%', '40%'],
          center: ['70%', '40%'],
          clockwise: false,
          hoverAnimation: false,
          data: [{
            value: 4,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)'
              }
            }
          }, {
            value: city,
            name: '城镇',
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#6394f4'
              }
            }
          }, {
            value: 4,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)'
              }
            }
          }, {
            value: coun,
            name: '乡村',
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#d47b49'
              }
            }
          }],

          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }, {
          name: '城乡',
          type: 'pictorialBar',
          symbol: 'rect',
          data: [{
            value: city,
            symbolRepeat: true,
            symbolSize: [6, 23],
            symbolMargin: 2
          }, {
            value: coun,
            symbolRepeat: true,
            symbolSize: [6, 23],
            symbolMargin: 2
          }],
          itemStyle: {
            normal: {
              color: function color(params) {
                var colorList = ['#13356b', '#885132'];
                return colorList[params.dataIndex];
              }
            }
          },
          label: {
            normal: {
              show: true,
              color: '#666',
              fontSize: 15,
              position: [120, 10],
              formatter: '{c}%'
            }
          },
          xAxisIndex: 1,
          yAxisIndex: 1,
          barWidth: '50%'
        }]
      };
    };

    _this.state = {};
    return _this;
  }

  _createClass(CustomPieChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'custom-pie-chart' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(_echartsForReact2.default, { option: this.getOption(), style: { height: '500px' } })
        )
      );
    }
  }]);

  return CustomPieChart;
}(_react.Component), _class.displayName = 'CustomPieChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = CustomPieChart;
module.exports = exports['default'];