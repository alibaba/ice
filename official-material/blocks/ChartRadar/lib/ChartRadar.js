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
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';

var ChartRadar = (_temp = _class = function (_Component) {
  _inherits(ChartRadar, _Component);

  function ChartRadar(props) {
    _classCallCheck(this, ChartRadar);

    var _this = _possibleConstructorReturn(this, (ChartRadar.__proto__ || _Object$getPrototypeOf(ChartRadar)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartRadar, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [{ item: 'Design', a: 70, b: 30 }, { item: 'Development', a: 60, b: 70 }, { item: 'Marketing', a: 50, b: 60 }, { item: 'Users', a: 40, b: 50 }, { item: 'Test', a: 60, b: 70 }, { item: 'Language', a: 70, b: 50 }, { item: 'Technology', a: 50, b: 40 }, { item: 'Support', a: 30, b: 40 }, { item: 'Sales', a: 60, b: 40 }, { item: 'UX', a: 50, b: 60 }];

      var dv = new DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['a', 'b'], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      });

      var cols = {
        score: {
          min: 0,
          max: 80
        }
      };

      return React.createElement(
        'div',
        { className: 'chart-radar' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u96F7\u8FBE\u56FE'
          ),
          React.createElement(
            Chart,
            {
              height: 400,
              data: dv,
              padding: [20, 20, 95, 20],
              scale: cols,
              forceFit: true
            },
            React.createElement(Coord, { type: 'polar', radius: 0.8 }),
            React.createElement(Axis, {
              name: 'item',
              line: null,
              tickLine: null,
              grid: {
                lineStyle: {
                  lineDash: null
                },
                hideFirstLine: false
              }
            }),
            React.createElement(Tooltip, null),
            React.createElement(Axis, {
              name: 'score',
              line: null,
              tickLine: null,
              grid: {
                type: 'polygon',
                lineStyle: {
                  lineDash: null
                },
                alternateColor: 'rgba(0, 0, 0, 0.04)'
              }
            }),
            React.createElement(Legend, { name: 'user', marker: 'circle', offset: 30 }),
            React.createElement(Geom, { type: 'area', position: 'item*score', color: 'user' }),
            React.createElement(Geom, { type: 'line', position: 'item*score', color: 'user', size: 2 }),
            React.createElement(Geom, {
              type: 'point',
              position: 'item*score',
              color: 'user',
              shape: 'circle',
              size: 4,
              style: {
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1
              }
            })
          )
        )
      );
    }
  }]);

  return ChartRadar;
}(Component), _class.displayName = 'ChartRadar', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartRadar as default };


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};