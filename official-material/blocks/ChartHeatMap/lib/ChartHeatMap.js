import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-plusplus: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Label } from 'bizcharts';

var ChartHeatMap = (_temp = _class = function (_Component) {
  _inherits(ChartHeatMap, _Component);

  function ChartHeatMap(props) {
    _classCallCheck(this, ChartHeatMap);

    var _this = _possibleConstructorReturn(this, (ChartHeatMap.__proto__ || _Object$getPrototypeOf(ChartHeatMap)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartHeatMap, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]];

      var source = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = {};
        obj.name = item[0];
        obj.day = item[1];
        obj.sales = item[2];
        source.push(obj);
      }

      var cols = {
        name: {
          type: 'cat',
          values: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
        },
        day: {
          type: 'cat',
          values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }
      };

      return React.createElement(
        'div',
        { className: 'chart-heat-map' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u8272\u5757\u56FE'
          ),
          React.createElement(
            Chart,
            {
              height: 400,
              data: source,
              scale: cols,
              padding: [10, 20, 40, 80],
              forceFit: true
            },
            React.createElement(Axis, {
              name: 'name',
              grid: {
                align: 'center',
                lineStyle: {
                  lineWidth: 1,
                  lineDash: null,
                  stroke: '#f0f0f0'
                },
                showFirstLine: true
              }
            }),
            React.createElement(Axis, {
              name: 'day',
              grid: {
                align: 'center',
                lineStyle: {
                  lineWidth: 1,
                  lineDash: null,
                  stroke: '#f0f0f0'
                }
              }
            }),
            React.createElement(Tooltip, null),
            React.createElement(
              Geom,
              {
                type: 'polygon',
                position: 'name*day',
                color: ['sales', '#BAE7FF-#1890FF-#0050B3'],
                style: { stroke: '#fff', lineWidth: 1 }
              },
              React.createElement(Label, {
                content: 'sales',
                offset: -2,
                textStyle: {
                  fill: '#fff',
                  fontWeight: 'bold',
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, .45)'
                }
              })
            )
          )
        )
      );
    }
  }]);

  return ChartHeatMap;
}(Component), _class.displayName = 'ChartHeatMap', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartHeatMap as default };


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};