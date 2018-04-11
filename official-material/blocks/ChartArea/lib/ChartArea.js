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
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import IceContainer from '@icedesign/container';

var ChartArea = (_temp = _class = function (_Component) {
  _inherits(ChartArea, _Component);

  function ChartArea(props) {
    _classCallCheck(this, ChartArea);

    var _this = _possibleConstructorReturn(this, (ChartArea.__proto__ || _Object$getPrototypeOf(ChartArea)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartArea, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [{ year: '1996', north: 322, south: 162 }, { year: '1997', north: 324, south: 90 }, { year: '1998', north: 329, south: 50 }, { year: '1999', north: 342, south: 77 }, { year: '2000', north: 348, south: 35 }, { year: '2001', north: 334, south: -45 }, { year: '2002', north: 325, south: -88 }, { year: '2003', north: 316, south: -120 }, { year: '2004', north: 318, south: -156 }, { year: '2005', north: 330, south: -123 }, { year: '2006', north: 355, south: -88 }, { year: '2007', north: 366, south: -66 }, { year: '2008', north: 337, south: -45 }, { year: '2009', north: 352, south: -29 }, { year: '2010', north: 377, south: -45 }, { year: '2011', north: 383, south: -88 }, { year: '2012', north: 344, south: -132 }, { year: '2013', north: 366, south: -146 }, { year: '2014', north: 389, south: -169 }, { year: '2015', north: 334, south: -184 }];

      var dv = new DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['north', 'south'], // 展开字段集
        key: 'type', // key字段
        value: 'value' // value字段
      });

      var cols = {
        year: {
          range: [0, 1]
        }
      };

      return React.createElement(
        'div',
        { className: 'chart-area' },
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
            { height: 400, data: dv, scale: cols, forceFit: true },
            React.createElement(Axis, { name: 'year' }),
            React.createElement(Axis, {
              name: 'value',
              label: {
                formatter: function formatter(val) {
                  return (val / 10000).toFixed(1) + 'k';
                }
              }
            }),
            React.createElement(Legend, null),
            React.createElement(Tooltip, { crosshairs: { type: 'line' } }),
            React.createElement(Geom, { type: 'area', position: 'year*value', color: 'type' }),
            React.createElement(Geom, { type: 'line', position: 'year*value', size: 2, color: 'type' })
          )
        )
      );
    }
  }]);

  return ChartArea;
}(Component), _class.displayName = 'ChartArea', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartArea as default };


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};