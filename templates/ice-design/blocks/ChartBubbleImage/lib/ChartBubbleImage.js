'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* eslint no-mixed-operators: 0 */
/* eslint no-underscore-dangle: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

var _bizcharts = require('bizcharts');

require('./ChartBubbleImage.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartBubbleImage = (_temp = _class = function (_Component) {
  _inherits(ChartBubbleImage, _Component);

  function ChartBubbleImage(props) {
    _classCallCheck(this, ChartBubbleImage);

    var _this = _possibleConstructorReturn(this, (ChartBubbleImage.__proto__ || Object.getPrototypeOf(ChartBubbleImage)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartBubbleImage, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      // 自定义 shape, 支持图片形式的气泡
      _bizcharts.Shape.registerShape('point', 'image', {
        drawShape: function drawShape(cfg, container) {
          cfg.points = this.parsePoints(cfg.points);
          var coord = this._coord;
          container.addShape('line', {
            attrs: {
              x1: cfg.points[0].x,
              y1: cfg.points[0].y,
              x2: cfg.points[0].x,
              y2: coord.start.y,
              stroke: '#ccc',
              lineWidth: 1,
              lineDash: [4, 2]
            }
          });
          return container.addShape('image', {
            attrs: {
              x: cfg.points[0].x - 12 * cfg.size / 2,
              y: cfg.points[0].y - 12 * cfg.size,
              width: 12 * cfg.size,
              height: 12 * cfg.size,
              img: cfg.shape[1]
            }
          });
        }
      });

      var data = [{ name: 'Internet Explorer', value: 26 }, { name: 'Chrome', value: 40 }, { name: 'Firefox', value: 30 }, { name: 'Safari', value: 24 }, { name: 'Opera', value: 15 }, { name: 'Undetectable', value: 8 }];

      var imageMap = {
        'Internet Explorer': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
        Chrome: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
        Firefox: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
        Safari: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
        Opera: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
        Undetectable: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png'
      };

      var cols = {
        value: {
          nice: false,
          max: 60,
          min: 0
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'chart-bubble-image' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u81EA\u5B9A\u4E49\u6C14\u6CE1\u56FE'
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            {
              height: 400,
              data: data,
              padding: [20, 20, 90],
              scale: cols,
              forceFit: true
            },
            _react2.default.createElement(_bizcharts.Axis, { name: 'name' }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'value', visible: false }),
            _react2.default.createElement(_bizcharts.Tooltip, null),
            _react2.default.createElement(
              _bizcharts.Geom,
              {
                type: 'point',
                position: 'name*value',
                color: 'name',
                shape: ['name', function (name) {
                  return ['image', imageMap[name]]; // 根据具体的字段指定 shape
                }],
                size: 'value',
                style: {
                  stroke: '#fff',
                  lineWidth: 1,
                  fillOpacity: 1
                }
              },
              _react2.default.createElement(_bizcharts.Label, {
                content: 'value',
                offset: -20,
                textStyle: {
                  fontSize: 16 // 文本大小
                }
              })
            )
          )
        )
      );
    }
  }]);

  return ChartBubbleImage;
}(_react.Component), _class.displayName = 'ChartBubbleImage', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ChartBubbleImage;


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