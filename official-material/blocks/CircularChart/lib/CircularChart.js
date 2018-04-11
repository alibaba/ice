'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* eslint no-mixed-operators:0 */


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
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xByzFvaw1M
 */
var CircularChart = (_temp = _class = function (_Component) {
  _inherits(CircularChart, _Component);

  function CircularChart(props) {
    _classCallCheck(this, CircularChart);

    var _this = _possibleConstructorReturn(this, (CircularChart.__proto__ || Object.getPrototypeOf(CircularChart)).call(this, props));

    _this.getOption = function () {
      var scale = 1;
      var echartData = [{
        value: 2154,
        name: '曲阜师范大学'
      }, {
        value: 3854,
        name: '潍坊学院'
      }, {
        value: 3515,
        name: '青岛职业技术学院'
      }, {
        value: 3515,
        name: '淄博师范高等专科'
      }, {
        value: 3854,
        name: '鲁东大学'
      }, {
        value: 2154,
        name: '山东师范大学'
      }];
      var rich = {
        yellow: {
          color: '#ffc72b',
          fontSize: 30 * scale,
          padding: [5, 4],
          align: 'center'
        },
        total: {
          color: '#ffc72b',
          fontSize: 40 * scale,
          align: 'center'
        },
        white: {
          color: '#fff',
          align: 'center',
          fontSize: 14 * scale,
          padding: [21, 0]
        },
        blue: {
          color: '#49dff0',
          fontSize: 16 * scale,
          align: 'center'
        },
        hr: {
          borderColor: '#0b5263',
          width: '100%',
          borderWidth: 1,
          height: 0
        }
      };

      return {
        backgroundColor: '#031f2d',
        title: {
          text: '总考生数',
          left: 'center',
          top: '53%',
          padding: [24, 0],
          textStyle: {
            color: '#fff',
            fontSize: 18 * scale,
            align: 'center'
          }
        },
        legend: {
          selectedMode: false,
          formatter: function formatter() {
            var total = 0; // 各科正确率总和
            echartData.forEach(function (value) {
              total += value.value;
            });
            return '{total|' + total + '}';
          },
          data: [echartData[0].name],
          // data: ['高等教育学'],
          // itemGap: 50,
          left: 'center',
          top: 'center',
          icon: 'none',
          align: 'center',
          textStyle: {
            color: '#666',
            fontSize: 16 * scale,
            rich: rich
          }
        },
        series: [{
          name: '总考生数量',
          type: 'pie',
          radius: ['42%', '50%'],
          hoverAnimation: false,
          color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
          label: {
            normal: {
              formatter: function formatter(params) {
                var total = 0; // 考生总数量
                var percent = 0; // 考生占比
                echartData.forEach(function (value) {
                  total += value.value;
                });
                percent = (params.value / total * 100).toFixed(1);
                return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
              },
              rich: rich
            }
          },
          labelLine: {
            normal: {
              length: 55 * scale,
              length2: 0,
              lineStyle: {
                color: '#0b5263'
              }
            }
          },
          data: echartData
        }]
      };
    };

    _this.state = {};
    return _this;
  }

  _createClass(CircularChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'circular-chart' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(_echartsForReact2.default, { option: this.getOption(), style: { height: '450px' } })
        )
      );
    }
  }]);

  return CircularChart;
}(_react.Component), _class.displayName = 'CircularChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = CircularChart;
module.exports = exports['default'];