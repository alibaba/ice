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

require('./ChartFacet.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartFacet = (_temp = _class = function (_Component) {
  _inherits(ChartFacet, _Component);

  function ChartFacet(props) {
    _classCallCheck(this, ChartFacet);

    var _this = _possibleConstructorReturn(this, (ChartFacet.__proto__ || Object.getPrototypeOf(ChartFacet)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartFacet, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [{ gender: '男', count: 40, class: '一班', grade: '一年级' }, { gender: '女', count: 30, class: '一班', grade: '一年级' }, { gender: '男', count: 35, class: '二班', grade: '一年级' }, { gender: '女', count: 45, class: '二班', grade: '一年级' }, { gender: '男', count: 20, class: '三班', grade: '一年级' }, { gender: '女', count: 35, class: '三班', grade: '一年级' }, { gender: '男', count: 30, class: '一班', grade: '二年级' }, { gender: '女', count: 40, class: '一班', grade: '二年级' }, { gender: '男', count: 25, class: '二班', grade: '二年级' }, { gender: '女', count: 32, class: '二班', grade: '二年级' }, { gender: '男', count: 28, class: '三班', grade: '二年级' }, { gender: '女', count: 36, class: '三班', grade: '二年级' }];

      var scale = {
        cut: {
          sync: true
        },
        mean: {
          sync: true,
          tickCount: 5
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'chart-facet' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u5206\u9762\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            {
              data: data,
              width: 960,
              height: 500,
              padding: [30, 80, 80, 80],
              scale: scale
            },
            _react2.default.createElement(_bizcharts.Tooltip, { showTitle: false }),
            _react2.default.createElement(_bizcharts.Legend, null),
            _react2.default.createElement(_bizcharts.Coord, { type: 'theta' }),
            _react2.default.createElement(_bizcharts.Facet, {
              type: 'tree',
              fields: ['grade', 'class'],
              line: { stroke: '#c0d0e0' },
              lineSmooth: true,
              eachView: function eachView(view, facet) {
                var data2 = facet.data;
                var dv = new _dataSet.DataView();
                dv.source(data2).transform({
                  type: 'percent',
                  field: 'count',
                  dimension: 'gender',
                  as: 'percent'
                });
                view.source(dv, {
                  percent: {
                    formatter: function formatter(val) {
                      return (val * 100).toFixed(2) + '%';
                    }
                  }
                });
                view.intervalStack().position('percent').color('gender');
              }
            })
          )
        )
      );
    }
  }]);

  return ChartFacet;
}(_react.Component), _class.displayName = 'ChartFacet', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartFacet;


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