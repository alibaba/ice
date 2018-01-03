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

var _dataSet2 = _interopRequireDefault(_dataSet);

require('./PieDoughnutChart.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = require('@icedesign/base/lib/grid');

var Row = Grid.Row,
    Col = Grid.Col;
var DataView = _dataSet2.default.DataView;
var PieDoughnutChart = (_temp = _class = function (_Component) {
  _inherits(PieDoughnutChart, _Component);

  function PieDoughnutChart() {
    _classCallCheck(this, PieDoughnutChart);

    return _possibleConstructorReturn(this, (PieDoughnutChart.__proto__ || Object.getPrototypeOf(PieDoughnutChart)).apply(this, arguments));
  }

  _createClass(PieDoughnutChart, [{
    key: 'render',
    value: function render() {
      var data = [{ genre: '男', sold: 500 }, { genre: '女', sold: 200 }, { genre: '未知', sold: 200 }];

      var data2 = [{ genre: '10~20岁', sold: 500 }, { genre: '20~30岁', sold: 200 }, { genre: '40~50岁', sold: 100 }, { genre: '60~70岁', sold: 40 }, { genre: '80~90岁', sold: 30 }];
      var dv = new DataView();
      var dv2 = new DataView();
      dv.source(data).transform({
        type: 'percent',
        field: 'sold',
        dimension: 'genre',
        as: 'percent'
      });

      dv2.source(data2).transform({
        type: 'percent',
        field: 'sold',
        dimension: 'genre',
        as: 'percent'
      });

      var cols = {
        percent: {
          formatter: function formatter(val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'pie-doughnut-chart' },
        _react2.default.createElement(
          Row,
          { style: { padding: 0 } },
          _react2.default.createElement(
            Col,
            { span: '12' },
            _react2.default.createElement(
              _card2.default,
              { className: 'tab-card', title: '\u6027\u522B\u5360\u6BD4' },
              _react2.default.createElement(
                _bizcharts.Chart,
                {
                  width: 400,
                  height: 300,
                  data: dv,
                  scale: cols,
                  padding: [80, 100, 80, 80],
                  forceFit: true
                },
                _react2.default.createElement(_bizcharts.Coord, { type: 'theta', radius: 0.75 }),
                _react2.default.createElement(_bizcharts.Axis, { name: 'percent' }),
                _react2.default.createElement(_bizcharts.Legend, { position: 'bottom' }),
                _react2.default.createElement(_bizcharts.Tooltip, {
                  showTitle: false,
                  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                }),
                _react2.default.createElement(_bizcharts.Geom, { type: 'intervalStack', position: 'percent', color: 'genre' })
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { span: '12' },
            _react2.default.createElement(
              _card2.default,
              { className: 'tab-card', title: '\u5E74\u9F84\u5206\u5E03' },
              _react2.default.createElement(
                _bizcharts.Chart,
                {
                  width: 450,
                  height: 300,
                  data: dv2,
                  scale: cols,
                  padding: [80, 100, 80, 80],
                  forceFit: true
                },
                _react2.default.createElement(_bizcharts.Coord, { type: 'theta', radius: 0.75 }),
                _react2.default.createElement(_bizcharts.Axis, { name: 'percent' }),
                _react2.default.createElement(_bizcharts.Legend, { position: 'bottom' }),
                _react2.default.createElement(_bizcharts.Tooltip, {
                  showTitle: false,
                  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                }),
                _react2.default.createElement(_bizcharts.Geom, { type: 'intervalStack', position: 'percent', color: 'genre' })
              )
            )
          )
        )
      );
    }
  }]);

  return PieDoughnutChart;
}(_react.Component), _class.displayName = 'PieDoughnutChart', _temp);
exports.default = PieDoughnutChart;
module.exports = exports['default'];