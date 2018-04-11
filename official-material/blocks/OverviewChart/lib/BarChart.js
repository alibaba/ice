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

var BarChart = (_temp = _class = function (_Component) {
  _inherits(BarChart, _Component);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || _Object$getPrototypeOf(BarChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(BarChart, [{
    key: 'render',
    value: function render() {
      var data = [{ year: '2011 年', sales: 28 }, { year: '2012 年', sales: 30 }, { year: '2013 年', sales: 32 }, { year: '2014 年', sales: 58 }, { year: '2015 年', sales: 82 }, { year: '2016 年', sales: 61 }, { year: '2017 年', sales: 55 }, { year: '2018 年', sales: 48 }];
      var cols = {
        sales: { tickInterval: 20 }
      };
      return React.createElement(
        Chart,
        {
          height: 200,
          data: data,
          scale: cols,
          forceFit: true,
          padding: [10, 15, 30, 10]
        },
        React.createElement(Axis, { name: 'year' }),
        React.createElement(Axis, { name: 'value' }),
        React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
        React.createElement(Geom, { type: 'interval', position: 'year*sales' })
      );
    }
  }]);

  return BarChart;
}(Component), _class.displayName = 'BarChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { BarChart as default };