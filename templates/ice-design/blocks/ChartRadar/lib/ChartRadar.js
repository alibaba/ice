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

require('./ChartRadar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartRadar = (_temp = _class = function (_Component) {
  _inherits(ChartRadar, _Component);

  function ChartRadar(props) {
    _classCallCheck(this, ChartRadar);

    var _this = _possibleConstructorReturn(this, (ChartRadar.__proto__ || Object.getPrototypeOf(ChartRadar)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartRadar, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [{ item: 'Design', a: 70, b: 30 }, { item: 'Development', a: 60, b: 70 }, { item: 'Marketing', a: 50, b: 60 }, { item: 'Users', a: 40, b: 50 }, { item: 'Test', a: 60, b: 70 }, { item: 'Language', a: 70, b: 50 }, { item: 'Technology', a: 50, b: 40 }, { item: 'Support', a: 30, b: 40 }, { item: 'Sales', a: 60, b: 40 }, { item: 'UX', a: 50, b: 60 }];

      var dv = new _dataSet.DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['a', 'b'], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      });

      var cols = {
        score: {
          min: 0,
          max: 80
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'chart-radar' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u96F7\u8FBE\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            {
              height: 400,
              data: dv,
              padding: [20, 20, 95, 20],
              scale: cols,
              forceFit: true
            },
            _react2.default.createElement(_bizcharts.Coord, { type: 'polar', radius: 0.8 }),
            _react2.default.createElement(_bizcharts.Axis, {
              name: 'item',
              line: null,
              tickLine: null,
              grid: {
                lineStyle: {
                  lineDash: null
                },
                hideFirstLine: false
              }
            }),
            _react2.default.createElement(_bizcharts.Tooltip, null),
            _react2.default.createElement(_bizcharts.Axis, {
              name: 'score',
              line: null,
              tickLine: null,
              grid: {
                type: 'polygon',
                lineStyle: {
                  lineDash: null
                },
                alternateColor: 'rgba(0, 0, 0, 0.04)'
              }
            }),
            _react2.default.createElement(_bizcharts.Legend, { name: 'user', marker: 'circle', offset: 30 }),
            _react2.default.createElement(_bizcharts.Geom, { type: 'area', position: 'item*score', color: 'user' }),
            _react2.default.createElement(_bizcharts.Geom, { type: 'line', position: 'item*score', color: 'user', size: 2 }),
            _react2.default.createElement(_bizcharts.Geom, {
              type: 'point',
              position: 'item*score',
              color: 'user',
              shape: 'circle',
              size: 4,
              style: {
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1
              }
            })
          )
        )
      );
    }
  }]);

  return ChartRadar;
}(_react.Component), _class.displayName = 'ChartRadar', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartRadar;


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