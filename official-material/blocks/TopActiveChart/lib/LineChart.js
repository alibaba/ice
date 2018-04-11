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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LintChart = (_temp = _class = function (_Component) {
  _inherits(LintChart, _Component);

  function LintChart(props) {
    _classCallCheck(this, LintChart);

    var _this = _possibleConstructorReturn(this, (LintChart.__proto__ || Object.getPrototypeOf(LintChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(LintChart, [{
    key: 'render',
    value: function render() {
      var data = [{ year: '1991', value: 3 }, { year: '1992', value: 4 }, { year: '1993', value: 3.5 }, { year: '1994', value: 5 }, { year: '1995', value: 4.9 }, { year: '1996', value: 7 }, { year: '1997', value: 6 }, { year: '1998', value: 5 }, { year: '1999', value: 4 }];
      var cols = {
        value: { min: 0 },
        year: { range: [0, 1] }
      };
      return _react2.default.createElement(
        _bizcharts.Chart,
        { height: 40, data: data, scale: cols, forceFit: true, padding: [2, 30] },
        _react2.default.createElement(_bizcharts.Tooltip, { crosshairs: { type: 'y' } }),
        _react2.default.createElement(_bizcharts.Geom, { type: 'line', position: 'year*value', color: '#3fa1ff' })
      );
    }
  }]);

  return LintChart;
}(_react.Component), _class.displayName = 'LintChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = LintChart;
module.exports = exports['default'];