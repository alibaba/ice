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

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./AreaStackChart.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaStackChart = (_temp = _class = function (_Component) {
  _inherits(AreaStackChart, _Component);

  function AreaStackChart(props) {
    _classCallCheck(this, AreaStackChart);

    var _this = _possibleConstructorReturn(this, (AreaStackChart.__proto__ || Object.getPrototypeOf(AreaStackChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(AreaStackChart, [{
    key: 'render',
    value: function render() {
      var data = [{ country: 'Asia', year: '1750', value: 502 }, { country: 'Asia', year: '1800', value: 635 }, { country: 'Asia', year: '1850', value: 809 }, { country: 'Asia', year: '1900', value: 5268 }, { country: 'Asia', year: '1950', value: 4400 }, { country: 'Asia', year: '1999', value: 3634 }, { country: 'Asia', year: '2050', value: 947 }, { country: 'Africa', year: '1750', value: 106 }, { country: 'Africa', year: '1800', value: 107 }, { country: 'Africa', year: '1850', value: 111 }, { country: 'Africa', year: '1900', value: 1766 }, { country: 'Africa', year: '1950', value: 221 }, { country: 'Africa', year: '1999', value: 767 }, { country: 'Africa', year: '2050', value: 133 }, { country: 'Europe', year: '1750', value: 163 }, { country: 'Europe', year: '1800', value: 203 }, { country: 'Europe', year: '1850', value: 276 }, { country: 'Europe', year: '1900', value: 628 }, { country: 'Europe', year: '1950', value: 547 }, { country: 'Europe', year: '1999', value: 729 }, { country: 'Europe', year: '2050', value: 408 }, { country: 'Oceania', year: '1750', value: 200 }, { country: 'Oceania', year: '1800', value: 200 }, { country: 'Oceania', year: '1850', value: 200 }, { country: 'Oceania', year: '1900', value: 460 }, { country: 'Oceania', year: '1950', value: 230 }, { country: 'Oceania', year: '1999', value: 300 }, { country: 'Oceania', year: '2050', value: 300 }];

      var cols = {
        year: {
          type: 'linear',
          tickInterval: 50
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'area-stack-chart' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            _bizcharts.Chart,
            { height: 400, data: data, scale: cols, forceFit: true },
            _react2.default.createElement(_bizcharts.Axis, { name: 'year' }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'value' }),
            _react2.default.createElement(_bizcharts.Legend, null),
            _react2.default.createElement(_bizcharts.Tooltip, { crosshairs: { type: 'line' } }),
            _react2.default.createElement(_bizcharts.Geom, { type: 'area', position: 'year*value', color: 'country' }),
            _react2.default.createElement(_bizcharts.Geom, { type: 'line', position: 'year*value', size: 2, color: 'country' })
          )
        )
      );
    }
  }]);

  return AreaStackChart;
}(_react.Component), _class.displayName = 'AreaStackChart', _temp);
exports.default = AreaStackChart;
module.exports = exports['default'];