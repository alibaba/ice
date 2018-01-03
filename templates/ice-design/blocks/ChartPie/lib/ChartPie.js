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

require('./ChartPie.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartPie = (_temp = _class = function (_Component) {
  _inherits(ChartPie, _Component);

  function ChartPie(props) {
    _classCallCheck(this, ChartPie);

    var _this = _possibleConstructorReturn(this, (ChartPie.__proto__ || Object.getPrototypeOf(ChartPie)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartPie, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [{ item: '事例一', count: 40 }, { item: '事例二', count: 21 }, { item: '事例三', count: 17 }, { item: '事例四', count: 13 }, { item: '事例五', count: 9 }];

      var dv = new _dataSet.DataView();
      dv.source(data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      });

      var cols = {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
            return val;
          }
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'chart-pie' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u997C\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            {
              height: 400,
              data: dv,
              scale: cols,
              padding: [80, 100, 80, 80],
              forceFit: true
            },
            _react2.default.createElement(_bizcharts.Coord, { type: 'theta', radius: 0.75 }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'percent' }),
            _react2.default.createElement(_bizcharts.Legend, { position: 'right', offsetY: -100, offsetX: -100 }),
            _react2.default.createElement(_bizcharts.Tooltip, {
              showTitle: false,
              itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            }),
            _react2.default.createElement(
              _bizcharts.Geom,
              {
                type: 'intervalStack',
                position: 'percent',
                color: 'item',
                tooltip: ['item*percent', function (item, percent) {
                  percent = percent * 100 + '%';
                  return {
                    name: item,
                    value: percent
                  };
                }],
                style: { lineWidth: 1, stroke: '#fff' }
              },
              _react2.default.createElement(_bizcharts.Label, {
                content: 'percent',
                formatter: function formatter(val, item) {
                  return item.point.item + ': ' + val;
                }
              })
            )
          )
        )
      );
    }
  }]);

  return ChartPie;
}(_react.Component), _class.displayName = 'ChartPie', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartPie;


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