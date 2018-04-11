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

import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

import IceContainer from '@icedesign/container';

var Row = _Grid.Row,
    Col = _Grid.Col;
var SalesStatChart = (_temp = _class = function (_Component) {
  _inherits(SalesStatChart, _Component);

  function SalesStatChart(props) {
    _classCallCheck(this, SalesStatChart);

    var _this = _possibleConstructorReturn(this, (SalesStatChart.__proto__ || _Object$getPrototypeOf(SalesStatChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SalesStatChart, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'sales-stat-chart' },
        React.createElement(
          Row,
          { wrap: true, gutter: '20' },
          React.createElement(
            Col,
            { xxs: '24', s: '15', l: '15' },
            React.createElement(
              IceContainer,
              { title: '\u9500\u552E\u989D' },
              React.createElement(
                Chart,
                { height: 428, data: data, forceFit: true },
                React.createElement(Axis, { name: 'month' }),
                React.createElement(Axis, { name: 'value' }),
                React.createElement(Legend, null),
                React.createElement(Tooltip, { crosshairs: { type: 'line' } }),
                React.createElement(Geom, { type: 'area', position: 'month*value', color: 'saler' }),
                React.createElement(Geom, {
                  type: 'polygon',
                  position: 'month*value',
                  size: 2,
                  color: 'saler'
                })
              )
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '9', l: '9' },
            React.createElement(
              IceContainer,
              { title: '\u65B0\u7528\u6237' },
              React.createElement(
                Chart,
                {
                  height: 76,
                  data: userData,
                  forceFit: true,
                  padding: [0, 0, 0, 0]
                },
                React.createElement(Axis, { name: 'count' }),
                React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
                React.createElement(Geom, { type: 'interval', position: 'month*count' })
              )
            ),
            React.createElement(
              IceContainer,
              { title: '\u4E0B\u5355\u91CF' },
              React.createElement(
                Chart,
                {
                  height: 76,
                  data: downloadData,
                  forceFit: true,
                  padding: [0, 0, 0, 0]
                },
                React.createElement(Axis, { name: 'pv' }),
                React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
                React.createElement(Geom, { type: 'interval', position: 'month*count' })
              )
            ),
            React.createElement(
              IceContainer,
              { title: '\u8BBF\u95EE\u91CF' },
              React.createElement(
                Chart,
                { height: 76, data: pvData, forceFit: true, padding: [0, 0, 0, 0] },
                React.createElement(Axis, { name: 'pv' }),
                React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
                React.createElement(Geom, { type: 'interval', position: 'month*pv' })
              )
            )
          )
        )
      );
    }
  }]);

  return SalesStatChart;
}(Component), _class.displayName = 'SalesStatChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { SalesStatChart as default };


var data = [{ saler: 'Bob', month: '5', value: 2502 }, { saler: 'Bob', month: '6', value: 2635 }, { saler: 'Bob', month: '7', value: 2809 }, { saler: 'Bob', month: '8', value: 3268 }, { saler: 'Bob', month: '9', value: 3400 }, { saler: 'Bob', month: '10', value: 3334 }, { saler: 'Bob', month: '11', value: 3347 }, { saler: 'Anna', month: '5', value: 1106 }, { saler: 'Anna', month: '6', value: 1107 }, { saler: 'Anna', month: '7', value: 1111 }, { saler: 'Anna', month: '8', value: 1766 }, { saler: 'Anna', month: '9', value: 1221 }, { saler: 'Anna', month: '10', value: 1767 }, { saler: 'Anna', month: '11', value: 1133 }, { saler: 'Tim', month: '5', value: 1163 }, { saler: 'Tim', month: '6', value: 1203 }, { saler: 'Tim', month: '7', value: 1276 }, { saler: 'Tim', month: '8', value: 1628 }, { saler: 'Tim', month: '9', value: 1547 }, { saler: 'Tim', month: '10', value: 1729 }, { saler: 'Tim', month: '11', value: 1408 }, { saler: 'Xiaoming', month: '5', value: 1200 }, { saler: 'Xiaoming', month: '6', value: 1200 }, { saler: 'Xiaoming', month: '7', value: 1200 }, { saler: 'Xiaoming', month: '8', value: 1460 }, { saler: 'Xiaoming', month: '9', value: 1230 }, { saler: 'Xiaoming', month: '10', value: 1300 }, { saler: 'Xiaoming', month: '11', value: 1300 }];

var pvData = [{
  month: '5',
  pv: 100
}, {
  month: '6',
  pv: 200
}, {
  month: '7',
  pv: 400
}, {
  month: '8',
  pv: 120
}, {
  month: '9',
  pv: 10
}, {
  month: '10',
  pv: 1030
}, {
  month: '11',
  pv: 100
}];

var userData = [{
  month: '5',
  count: 100
}, {
  month: '6',
  count: 300
}, {
  month: '7',
  count: 110
}, {
  month: '8',
  count: 320
}, {
  month: '9',
  count: 102
}, {
  month: '10',
  count: 100
}, {
  month: '11',
  count: 420
}];
var downloadData = [{
  month: '5',
  count: 10
}, {
  month: '6',
  count: 220
}, {
  month: '7',
  count: 200
}, {
  month: '8',
  count: 530
}, {
  month: '9',
  count: 140
}, {
  month: '10',
  count: 1030
}, {
  month: '11',
  count: 130
}];