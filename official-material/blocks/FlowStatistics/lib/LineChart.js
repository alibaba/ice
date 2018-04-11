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
      var data = [{ month: '01/01', SiteA: 7000, SiteB: 3900 }, { month: '02/01', SiteA: 6900, SiteB: 4200 }, { month: '03/01', SiteA: 9500, SiteB: 5700 }, { month: '04/01', SiteA: 14500, SiteB: 8500 }, { month: '05/01', SiteA: 18400, SiteB: 11900 }, { month: '06/01', SiteA: 21500, SiteB: 15200 }, { month: '07/01', SiteA: 25200, SiteB: 17000 }, { month: '08/01', SiteA: 26500, SiteB: 16600 }, { month: '09/01', SiteA: 23300, SiteB: 14200 }, { month: '10/01', SiteA: 18300, SiteB: 10300 }, { month: '11/01', SiteA: 13900, SiteB: 6600 }, { month: '12/01', SiteA: 9600, SiteB: 4800 }];
      var ds = new DataSet();
      var dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['SiteA', 'SiteB'], // 展开字段集
        key: 'city', // key字段
        value: 'temperature' // value字段
      });
      console.log(dv);
      var cols = {
        month: {
          range: [0, 1]
        }
      };
      return React.createElement(
        Chart,
        {
          height: 350,
          data: dv,
          scale: cols,
          forceFit: true,
          padding: [30, 30, 30, 60]
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
          color: 'city'
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