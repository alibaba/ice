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

require('./ChartBox.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartBox = (_temp = _class = function (_Component) {
  _inherits(ChartBox, _Component);

  function ChartBox(props) {
    _classCallCheck(this, ChartBox);

    var _this = _possibleConstructorReturn(this, (ChartBox.__proto__ || Object.getPrototypeOf(ChartBox)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartBox, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [{
        x: '职业 A',
        low: 20000,
        q1: 26000,
        median: 27000,
        q3: 32000,
        high: 38000,
        outliers: [50000, 52000]
      }, {
        x: '职业 B',
        low: 40000,
        q1: 49000,
        median: 62000,
        q3: 73000,
        high: 88000,
        outliers: [32000, 29000, 106000]
      }, {
        x: '职业 C',
        low: 52000,
        q1: 59000,
        median: 65000,
        q3: 74000,
        high: 83000,
        outliers: [91000]
      }, {
        x: '职业 D',
        low: 58000,
        q1: 96000,
        median: 130000,
        q3: 170000,
        high: 200000,
        outliers: [42000, 210000, 215000]
      }, {
        x: '职业 E',
        low: 24000,
        q1: 28000,
        median: 32000,
        q3: 38000,
        high: 42000,
        outliers: [48000]
      }, {
        x: '职业 F',
        low: 47000,
        q1: 56000,
        median: 69000,
        q3: 85000,
        high: 100000,
        outliers: [110000, 115000, 32000]
      }, {
        x: '职业 G',
        low: 64000,
        q1: 74000,
        median: 83000,
        q3: 93000,
        high: 100000,
        outliers: [110000]
      }, {
        x: '职业 H',
        low: 67000,
        q1: 72000,
        median: 84000,
        q3: 95000,
        high: 110000,
        outliers: [57000, 54000]
      }];

      var DataView = _dataSet.DataSet.DataView;

      var dv = new DataView().source(data);
      dv.transform({
        type: 'map',
        callback: function callback(obj) {
          obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
          return obj;
        }
      });

      var cols = {
        range: {
          min: 0,
          max: 240000
        },
        outliers: {
          min: 0,
          max: 240000
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'chart-box' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u7BB1\u578B\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            {
              height: 400,
              data: dv,
              scale: cols,
              padding: [20, 120, 95],
              forceFit: true
            },
            _react2.default.createElement(_bizcharts.Axis, { name: 'x' }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'range' }),
            _react2.default.createElement(_bizcharts.Tooltip, {
              showTitle: false,
              crosshairs: {
                type: 'rect',
                style: { fill: '#E4E8F1', fillOpacity: 0.43 }
              },
              itemTpl: '<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">\u6700\u5927\u503C\uFF1A{high}</span><br/><span style="padding-left: 16px">\u4E0A\u56DB\u5206\u4F4D\u6570\uFF1A{q3}</span><br/><span style="padding-left: 16px">\u4E2D\u4F4D\u6570\uFF1A{median}</span><br/><span style="padding-left: 16px">\u4E0B\u56DB\u5206\u4F4D\u6570\uFF1A{q1}</span><br/><span style="padding-left: 16px">\u6700\u5C0F\u503C\uFF1A{low}</span><br/></li>'
            }),
            _react2.default.createElement(_bizcharts.Geom, {
              type: 'schema',
              position: 'x*range',
              shape: 'box',
              tooltip: ['x*low*q1*median*q3*high', function (x, low, q1, median, q3, high) {
                return {
                  name: x,
                  low: low,
                  q1: q1,
                  median: median,
                  q3: q3,
                  high: high
                };
              }],
              style: {
                stroke: 'rgba(0, 0, 0, 0.45)',
                fill: '#1890FF',
                fillOpacity: 0.3
              }
            }),
            _react2.default.createElement(
              _bizcharts.View,
              { data: data },
              _react2.default.createElement(_bizcharts.Geom, {
                type: 'point',
                position: 'x*outliers',
                shape: 'circle',
                size: 3,
                active: false
              })
            )
          )
        )
      );
    }
  }]);

  return ChartBox;
}(_react.Component), _class.displayName = 'ChartBox', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartBox;


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