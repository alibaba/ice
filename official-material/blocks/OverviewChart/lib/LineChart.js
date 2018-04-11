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
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';

var LineChart = (_temp = _class = function (_Component) {
  _inherits(LineChart, _Component);

  function LineChart(props) {
    _classCallCheck(this, LineChart);

    var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || _Object$getPrototypeOf(LineChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(LineChart, [{
    key: 'render',
    value: function render() {
      var data = [{ month: '01', total: 7.0, profit: 3.9 }, { month: '02', total: 6.9, profit: 4.2 }, { month: '03', total: 9.5, profit: 5.7 }, { month: '04', total: 14.5, profit: 8.5 }, { month: '05', total: 18.4, profit: 11.9 }, { month: '06', total: 21.5, profit: 15.2 }, { month: '07', total: 25.2, profit: 17.0 }, { month: '08', total: 26.5, profit: 16.6 }, { month: '09', total: 23.3, profit: 14.2 }, { month: '10', total: 18.3, profit: 10.3 }, { month: '11', total: 13.9, profit: 6.6 }, { month: '12', total: 9.6, profit: 4.8 }];
      var ds = new DataSet();
      var dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['total', 'profit'], // 展开字段集
        key: 'city', // key字段
        value: 'temperature' // value字段
      });
      var cols = {
        month: {
          range: [0, 1]
        }
      };
      return React.createElement(
        Chart,
        {
          height: 200,
          data: dv,
          scale: cols,
          forceFit: true,
          padding: [10, 20, 30, 10]
        },
        React.createElement(Axis, { name: 'month' }),
        React.createElement(Axis, { name: 'temperature', label: { formatter: function formatter(val) {
              return '' + val;
            } } }),
        React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
        React.createElement(Geom, {
          type: 'line',
          position: 'month*temperature',
          size: 2,
          color: 'city',
          shape: 'smooth'
        }),
        React.createElement(Geom, {
          type: 'point',
          position: 'month*temperature',
          size: 4,
          shape: 'circle',
          color: 'city',
          style: { stroke: '#fff', lineWidth: 1 }
        })
      );
    }
  }]);

  return LineChart;
}(Component), _class.displayName = 'LineChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { LineChart as default };