import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import { Chart, Coord, Geom, Tooltip, Axis, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

var Row = _Grid.Row,
    Col = _Grid.Col;
var DataView = DataSet.DataView;
var PieDoughnutChart = (_temp = _class = function (_Component) {
  _inherits(PieDoughnutChart, _Component);

  function PieDoughnutChart() {
    _classCallCheck(this, PieDoughnutChart);

    return _possibleConstructorReturn(this, (PieDoughnutChart.__proto__ || _Object$getPrototypeOf(PieDoughnutChart)).apply(this, arguments));
  }

  _createClass(PieDoughnutChart, [{
    key: 'render',
    value: function render() {
      var data = [{ genre: '男', sold: 500 }, { genre: '女', sold: 200 }, { genre: '未知', sold: 200 }];

      var data2 = [{ genre: '10~20岁', sold: 500 }, { genre: '20~30岁', sold: 200 }, { genre: '40~50岁', sold: 100 }, { genre: '60~70岁', sold: 40 }, { genre: '80~90岁', sold: 30 }];
      var dv = new DataView();
      var dv2 = new DataView();
      dv.source(data).transform({
        type: 'percent',
        field: 'sold',
        dimension: 'genre',
        as: 'percent'
      });

      dv2.source(data2).transform({
        type: 'percent',
        field: 'sold',
        dimension: 'genre',
        as: 'percent'
      });

      var cols = {
        percent: {
          formatter: function formatter(val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      };

      return React.createElement(
        'div',
        { className: 'pie-doughnut-chart' },
        React.createElement(
          Row,
          { wrap: true, gutter: '20' },
          React.createElement(
            Col,
            { xxs: '24', s: '24', l: '12' },
            React.createElement(
              IceContainer,
              { title: '\u6027\u522B\u5360\u6BD4', style: styles.leftContainer },
              React.createElement(
                Chart,
                {
                  width: 450,
                  height: 300,
                  data: dv,
                  scale: cols,
                  padding: [0, 10, 30, 10],
                  forceFit: true
                },
                React.createElement(Coord, { type: 'theta', radius: 0.75 }),
                React.createElement(Axis, { name: 'percent' }),
                React.createElement(Legend, { position: 'bottom', offsetY: -60 }),
                React.createElement(Tooltip, {
                  showTitle: false,
                  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                }),
                React.createElement(Geom, { type: 'intervalStack', position: 'percent', color: 'genre' })
              )
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '24', l: '12' },
            React.createElement(
              IceContainer,
              { title: '\u5E74\u9F84\u5206\u5E03', style: styles.rightContainer },
              React.createElement(
                Chart,
                {
                  style: styles.chart,
                  width: 450,
                  height: 300,
                  data: dv2,
                  scale: cols,
                  padding: [0, 10, 30, 10],
                  forceFit: true
                },
                React.createElement(Coord, { type: 'theta', radius: 0.75 }),
                React.createElement(Axis, { name: 'percent' }),
                React.createElement(Legend, { position: 'bottom', offsetY: -60 }),
                React.createElement(Tooltip, {
                  showTitle: false,
                  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                }),
                React.createElement(Geom, { type: 'intervalStack', position: 'percent', color: 'genre' })
              )
            )
          )
        )
      );
    }
  }]);

  return PieDoughnutChart;
}(Component), _class.displayName = 'PieDoughnutChart', _temp);
export { PieDoughnutChart as default };


var styles = {};