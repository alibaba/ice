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

var SeriesLine = (_temp = _class = function (_Component) {
  _inherits(SeriesLine, _Component);

  function SeriesLine(props) {
    _classCallCheck(this, SeriesLine);

    var _this = _possibleConstructorReturn(this, (SeriesLine.__proto__ || _Object$getPrototypeOf(SeriesLine)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SeriesLine, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      // 数据源
      var data = [{ month: 'Jan', Tokyo: 7.0, London: 20 }, { month: 'Feb', Tokyo: 6.9, London: 22 }, { month: 'Mar', Tokyo: 9.5, London: 24 }, { month: 'Apr', Tokyo: 14.5, London: 30 }, { month: 'May', Tokyo: 18.4, London: 50 }, { month: 'Jun', Tokyo: 21.5, London: 65 }, { month: 'Jul', Tokyo: 25.2, London: 70 }, { month: 'Aug', Tokyo: 26.5, London: 80 }, { month: 'Sep', Tokyo: 23.3, London: 85 }, { month: 'Oct', Tokyo: 18.3, London: 90 }, { month: 'Nov', Tokyo: 13.9, London: 80 }, { month: 'Dec', Tokyo: 9.6, London: 70 }];

      // DataSet https://github.com/alibaba/BizCharts/blob/master/doc/tutorial/dataset.md#dataset
      var ds = new DataSet();
      var dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['Tokyo', 'London'],
        key: 'city',
        value: 'temperature'
      });

      // 定义度量
      var cols = {
        month: {
          range: [0, 1]
        }
      };

      return React.createElement(
        'div',
        { className: 'chart-line' },
        React.createElement(
          Chart,
          {
            height: 300,
            data: dv,
            scale: cols,
            forceFit: true,
            padding: [40, 35, 40, 35]
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
            style: styles.point
          })
        )
      );
    }
  }]);

  return SeriesLine;
}(Component), _class.displayName = 'SeriesLine', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { SeriesLine as default };


var styles = {
  point: {
    stroke: '#fff',
    lineWidth: 1
  }
};