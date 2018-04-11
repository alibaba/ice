'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

var _bizcharts = require('bizcharts');

require('./DataStatistics.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = require('@icedesign/base/lib/grid');

var Icon = require('@icedesign/base/lib/icon');

var Row = Grid.Row,
    Col = Grid.Col;


var dataSource = {
  chartData: [{ month: '1 月', users: 38 }, { month: '2 月', users: 52 }, { month: '3 月', users: 61 }, { month: '4 月', users: 115 }, { month: '5 月', users: 48 }, { month: '6 月', users: 38 }, { month: '7 月', users: 48 }, { month: '8 月', users: 58 }, { month: '9 月', users: 68 }, { month: '10 月', users: 88 }, { month: '11 月', users: 98 }, { month: '12 月', users: 68 }],
  statisticData: [{
    name: '今日注册',
    value: '12678'
  }, {
    name: '今日登录',
    value: '22139'
  }, {
    name: '今日订阅',
    value: '35623'
  }, {
    name: '今日评论',
    value: '16826'
  }, {
    name: '七日新增',
    value: '25%'
  }, {
    name: '七日活跃',
    value: '68%'
  }]
};

var DataStatistics = (_temp = _class = function (_Component) {
  _inherits(DataStatistics, _Component);

  function DataStatistics(props) {
    _classCallCheck(this, DataStatistics);

    var _this = _possibleConstructorReturn(this, (DataStatistics.__proto__ || Object.getPrototypeOf(DataStatistics)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(DataStatistics, [{
    key: 'render',
    value: function render() {
      var cols = {
        users: { tickInterval: 20 }
      };

      return _react2.default.createElement(
        'div',
        { className: 'data-statistics' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(
            'h4',
            { style: styles.title },
            '\u7528\u6237\u6D3B\u8DC3\u8D8B\u52BF'
          ),
          _react2.default.createElement(
            Row,
            { wrap: true },
            _react2.default.createElement(
              Col,
              { xxs: '24', s: '14', l: '16' },
              _react2.default.createElement(
                _bizcharts.Chart,
                {
                  height: 300,
                  padding: [50, 35, 50, 35],
                  data: dataSource.chartData,
                  scale: cols,
                  forceFit: true
                },
                _react2.default.createElement(_bizcharts.Axis, { name: 'month' }),
                _react2.default.createElement(_bizcharts.Axis, { name: 'value' }),
                _react2.default.createElement(_bizcharts.Tooltip, { crosshairs: { type: 'y' } }),
                _react2.default.createElement(_bizcharts.Geom, { type: 'interval', position: 'month*users' })
              )
            ),
            _react2.default.createElement(
              Col,
              { xxs: '24', s: '10', l: '8' },
              _react2.default.createElement(
                'ul',
                { style: styles.items },
                dataSource.statisticData.map(function (item, index) {
                  return _react2.default.createElement(
                    'li',
                    { key: index, className: 'item-box', style: styles.itemBox },
                    _react2.default.createElement(
                      'div',
                      { style: styles.itemIcon },
                      _react2.default.createElement(Icon, {
                        type: 'account-filling',
                        style: styles.icon,
                        className: 'itemIcon'
                      })
                    ),
                    _react2.default.createElement(
                      'div',
                      { style: styles.itemText },
                      _react2.default.createElement(
                        'div',
                        { style: styles.name },
                        item.name
                      ),
                      _react2.default.createElement(
                        'div',
                        { style: styles.value },
                        item.value
                      )
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }]);

  return DataStatistics;
}(_react.Component), _class.displayName = 'DataStatistics', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = DataStatistics;


var styles = {
  container: {
    width: '100%'
  },
  title: {
    margin: 0,
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  },
  items: {
    display: 'flex',
    flexDeriction: 'row',
    flexWrap: 'wrap',
    marginLeft: '30px'
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    marginTop: '50px'
  },
  itemIcon: {
    marginRight: '10px'
  },
  icon: {
    color: '#3FA1FF'
  },
  value: {
    color: '#1F82FF',
    fontSize: '20px'
  },
  name: {
    fontSize: '12px'
  }
};
module.exports = exports['default'];