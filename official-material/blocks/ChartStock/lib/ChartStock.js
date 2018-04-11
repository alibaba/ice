import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import axios from 'axios';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import IceContainer from '@icedesign/container';

var ChartStock = (_temp = _class = function (_Component) {
  _inherits(ChartStock, _Component);

  function ChartStock(props) {
    _classCallCheck(this, ChartStock);

    var _this = _possibleConstructorReturn(this, (ChartStock.__proto__ || _Object$getPrototypeOf(ChartStock)).call(this, props));

    _this.state = {
      data: []
    };
    return _this;
  }

  _createClass(ChartStock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      axios.get('/mock/chart-stock.json').then(function (response) {
        console.log(response);
        _this2.setState({
          data: response.data && response.data.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var cols = {
        date: {
          type: 'time',
          nice: false,
          mask: 'MM-DD',
          tickCount: 10
        },
        range: {
          min: 20,
          max: 35,
          nice: false,
          tickInterval: 2
        },
        mean: {
          min: 20,
          max: 35,
          nice: false
        },
        stockRange: {
          min: 20,
          max: 35,
          nice: false
        }
      };

      var dv = new DataView();
      dv.source(this.state.data).transform({
        type: 'map',
        callback: function callback(obj) {
          obj.stockRange = [obj.start, obj.end, obj.highest, obj.lowest];
          return obj;
        }
      });

      return React.createElement(
        'div',
        { className: 'chart-stock' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u9762\u79EF\u56FE'
          ),
          React.createElement(
            Chart,
            {
              height: 400,
              data: dv,
              scale: cols,
              forceFit: true,
              padding: [10, 20, 40, 40]
            },
            React.createElement(Axis, { name: 'mean', visible: false }),
            React.createElement(Legend, null),
            React.createElement(Axis, { name: 'stockRange', visible: false }),
            React.createElement(Tooltip, {
              showTitle: false,
              itemTpl: '<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">\u5F00\u76D8\u4EF7\uFF1A{start}</span><br/><span style="padding-left: 16px">\u6536\u76D8\u4EF7\uFF1A{end}</span><br/><span style="padding-left: 16px">\u6700\u9AD8\u4EF7\uFF1A{max}</span><br/><span style="padding-left: 16px">\u6700\u4F4E\u4EF7\uFF1A{min}</span><br/><span style="padding-left: 16px">\u6210\u4EA4\u91CF\uFF1A{volumn}</span><br/></li>'
            }),
            React.createElement(Geom, { type: 'area', position: 'date*range', color: '#64b5f6' }),
            React.createElement(Geom, {
              type: 'schema',
              position: 'date*stockRange',
              color: ['trend', function (val) {
                if (val === 'up') {
                  return '#f04864';
                }

                if (val === 'down') {
                  return '#2fc25b';
                }
              }],
              tooltip: 'start*end*highest*lowest',
              shape: 'candle'
            }),
            React.createElement(Geom, { type: 'line', position: 'date*mean', color: '#FACC14' })
          )
        )
      );
    }
  }]);

  return ChartStock;
}(Component), _class.displayName = 'ChartStock', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartStock as default };


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};