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
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import { DataView } from '@antv/data-set';

var Html = Guide.Html;
var PieDonutChart = (_temp = _class = function (_Component) {
  _inherits(PieDonutChart, _Component);

  function PieDonutChart(props) {
    _classCallCheck(this, PieDonutChart);

    var _this = _possibleConstructorReturn(this, (PieDonutChart.__proto__ || _Object$getPrototypeOf(PieDonutChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PieDonutChart, [{
    key: 'render',
    value: function render() {
      var data = [{ item: '金融', count: 40 }, { item: '健康', count: 21 }, { item: '娱乐', count: 17 }, { item: '家居', count: 13 }, { item: '网购', count: 9 }];
      var dv = new DataView();
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
      return React.createElement(
        Chart,
        {
          height: 200,
          data: dv,
          scale: cols,
          padding: [10, 10, 20, 10],
          forceFit: true
        },
        React.createElement(Coord, { type: 'theta', radius: 0.9, innerRadius: 0.6 }),
        React.createElement(Axis, { name: 'percent' }),
        React.createElement(Legend, { position: 'bottom', offsetY: -50, itemGap: 3 }),
        React.createElement(Tooltip, {
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        }),
        React.createElement(
          Guide,
          null,
          React.createElement(Html, {
            position: ['50%', '50%'],
            html: '<div style="color:#8c8c8c;font-size:12px;text-align: center;width: 10em;">\u884C\u4E1A<br><span style="color:#262626;font-size:20px">200</span></div>',
            alignX: 'middle',
            alignY: 'middle'
          })
        ),
        React.createElement(Geom, {
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
        })
      );
    }
  }]);

  return PieDonutChart;
}(Component), _class.displayName = 'PieDonutChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { PieDonutChart as default };