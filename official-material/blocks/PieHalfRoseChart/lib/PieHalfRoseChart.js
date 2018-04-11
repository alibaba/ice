'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xHkjKKrz_M
 */
var PieHalfRoseChart = (_temp = _class = function (_Component) {
  _inherits(PieHalfRoseChart, _Component);

  function PieHalfRoseChart(props) {
    _classCallCheck(this, PieHalfRoseChart);

    var _this = _possibleConstructorReturn(this, (PieHalfRoseChart.__proto__ || Object.getPrototypeOf(PieHalfRoseChart)).call(this, props));

    _this.getOption = function () {
      return {
        backgroundColor: '#fff',
        calculable: true,
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c}千万元'
        },
        title: {
          text: '南丁格尔玫瑰图--PieHalfRose',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#666'
          }
        },
        legend: {
          icon: 'circle',
          x: 'center',
          y: '15%',
          data: ['义乌市1', '义乌市2', '义乌市3', '义乌市4', '义乌市5', '义乌市6', '义乌市7', '义乌市8', '义乌市9'],
          textStyle: {
            color: '#666'
          }
        },
        series: [{
          name: '销售额',
          type: 'pie',
          radius: [37, 155],
          avoidLabelOverlap: false,
          startAngle: 0,
          center: ['50%', '34%'],
          roseType: 'area',
          selectedMode: 'single',
          label: {
            normal: {
              show: true,
              formatter: '{c}千万元'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true,
              smooth: false,
              length: 20,
              length2: 10
            },
            emphasis: {
              show: true
            }
          },
          data: [{
            value: 600.58,
            name: '义乌市1',
            itemStyle: {
              normal: {
                color: '#5484f7'
              }
            }
          }, {
            value: 1100.58,
            name: '义乌市2',
            itemStyle: {
              normal: {
                color: '#fbd856'
              }
            }
          }, {
            value: 1200.58,
            name: '义乌市3',
            itemStyle: {
              normal: {
                color: '#40ca9b'
              }
            }
          }, {
            value: 1300.58,
            name: '义乌市4',
            itemStyle: {
              normal: {
                color: '#f66f70'
              }
            }
          }, {
            value: 1400.58,
            name: '义乌市5',
            itemStyle: {
              normal: {
                color: '#00bbd3'
              }
            }
          }, {
            value: 1500.58,
            name: '义乌市6',
            itemStyle: {
              normal: {
                color: '#999999'
              }
            }
          }, {
            value: 1500.58,
            name: '义乌市7',
            itemStyle: {
              normal: {
                color: '#666666'
              }
            }
          }, {
            value: 1600.58,
            name: '义乌市8',
            itemStyle: {
              normal: {
                color: '#3ebbd3'
              }
            }
          }, {
            value: 1800,
            name: '义乌市9',
            itemStyle: {
              normal: {
                color: '#4d6bee'
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }]
        }]
      };
    };

    _this.state = {};
    return _this;
  }

  _createClass(PieHalfRoseChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'pie-half-rose-chart' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(_echartsForReact2.default, { option: this.getOption(), style: { height: '350px' } })
        )
      );
    }
  }]);

  return PieHalfRoseChart;
}(_react.Component), _class.displayName = 'PieHalfRoseChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = PieHalfRoseChart;
module.exports = exports['default'];