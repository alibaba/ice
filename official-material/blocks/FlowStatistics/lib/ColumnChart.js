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
import { Chart, Geom } from 'bizcharts';

var ColumnChart = (_temp = _class = function (_Component) {
  _inherits(ColumnChart, _Component);

  function ColumnChart(props) {
    _classCallCheck(this, ColumnChart);

    var _this = _possibleConstructorReturn(this, (ColumnChart.__proto__ || _Object$getPrototypeOf(ColumnChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ColumnChart, [{
    key: 'render',
    value: function render() {
      var color = this.props.color;

      var data = [{ year: '1951 年', sales: 38 }, { year: '1952 年', sales: 52 }, { year: '1956 年', sales: 61 }, { year: '1957 年', sales: 145 }, { year: '1958 年', sales: 48 }, { year: '1959 年', sales: 38 }, { year: '1960 年', sales: 38 }, { year: '1962 年', sales: 38 }];
      var cols = {
        sales: { tickInterval: 20 }
      };
      return React.createElement(
        Chart,
        {
          height: 30,
          width: 60,
          padding: [2, 3, 2, 3],
          data: data,
          scale: cols
        },
        React.createElement(Geom, {
          type: 'interval',
          position: 'year*sales',
          color: color || '#3fa1ff'
        })
      );
    }
  }]);

  return ColumnChart;
}(Component), _class.displayName = 'ColumnChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ColumnChart as default };