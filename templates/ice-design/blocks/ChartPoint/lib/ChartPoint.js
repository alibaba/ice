'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

var _bizcharts = require('bizcharts');

require('./ChartPoint.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartPoint = (_temp = _class = function (_Component) {
  _inherits(ChartPoint, _Component);

  function ChartPoint(props) {
    _classCallCheck(this, ChartPoint);

    var _this = _possibleConstructorReturn(this, (ChartPoint.__proto__ || Object.getPrototypeOf(ChartPoint)).call(this, props));

    _this.state = {
      data: []
    };
    return _this;
  }

  _createClass(ChartPoint, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _axios2.default.get('/mock/chart-point.json').then(function (response) {
        console.log(response.data.data);
        _this2.setState({
          data: response.data.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'chart-point' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u70B9\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            { height: 400, data: this.state.data, forceFit: true },
            _react2.default.createElement(_bizcharts.Tooltip, {
              showTitle: false,
              crosshairs: { type: 'cross' },
              itemTpl: '<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>{value}</li>'
            }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'height' }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'weight' }),
            _react2.default.createElement(_bizcharts.Geom, {
              type: 'point',
              position: 'height*weight',
              opacity: 0.65,
              shape: 'circle',
              size: 4,
              tooltip: ['gender*height*weight', function (gender, height, weight) {
                return {
                  name: gender,
                  value: height + '(cm), ' + weight + '(kg)'
                };
              }]
            })
          )
        )
      );
    }
  }]);

  return ChartPoint;
}(_react.Component), _class.displayName = 'ChartPoint', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartPoint;


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