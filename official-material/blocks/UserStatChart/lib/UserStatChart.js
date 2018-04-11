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
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label } from 'bizcharts';

import IceContainer from '@icedesign/container';

var Row = _Grid.Row,
    Col = _Grid.Col;
var UserStatChart = (_temp = _class = function (_Component) {
  _inherits(UserStatChart, _Component);

  function UserStatChart(props) {
    _classCallCheck(this, UserStatChart);

    var _this = _possibleConstructorReturn(this, (UserStatChart.__proto__ || _Object$getPrototypeOf(UserStatChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(UserStatChart, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'user-stat-chart' },
        React.createElement(
          Row,
          { wrap: true, gutter: '20' },
          React.createElement(
            Col,
            { xxs: '24', s: '15', l: '15' },
            React.createElement(
              IceContainer,
              { title: '\u7528\u6237\u589E\u957F\u6570\u91CF' },
              React.createElement(
                Chart,
                {
                  height: 350,
                  data: userData,
                  forceFit: true,
                  padding: [40, 40, 40, 40]
                },
                React.createElement(Axis, { name: 'month' }),
                React.createElement(Axis, { name: 'count' }),
                React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
                React.createElement(Geom, { type: 'interval', position: 'month*count' })
              )
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '9', l: '9' },
            React.createElement(
              IceContainer,
              { title: '\u5E74\u9F84' },
              React.createElement(
                Chart,
                {
                  height: 124,
                  data: ageData,
                  forceFit: true,
                  padding: [0, 0, 0, 0]
                },
                React.createElement(Axis, { name: 'count' }),
                React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
                React.createElement(Geom, { type: 'interval', position: 'age*count' })
              )
            ),
            React.createElement(
              IceContainer,
              { title: '\u7537\u5973\u6BD4\u4F8B' },
              React.createElement(
                Chart,
                {
                  height: 124,
                  data: sexRatio,
                  forceFit: true,
                  padding: [0, 60, 0, 0]
                },
                React.createElement(Coord, { type: 'theta', radius: 0.75 }),
                React.createElement(Axis, { name: 'percent' }),
                React.createElement(Legend, { position: 'right', offsetY: -44, offsetX: -40 }),
                React.createElement(Tooltip, { showTitle: false }),
                React.createElement(
                  Geom,
                  {
                    type: 'intervalStack',
                    position: 'percent',
                    color: 'item',
                    tooltip: ['item*percent', function (item, percent) {
                      percent += '%';
                      return {
                        name: item,
                        value: percent
                      };
                    }],
                    style: { lineWidth: 1, stroke: '#fff' }
                  },
                  React.createElement(Label, {
                    content: 'percent',
                    offset: -20,
                    textStyle: {
                      rotate: 0,
                      textAlign: 'center',
                      shadowBlur: 2,
                      shadowColor: 'rgba(0, 0, 0, .45)'
                    }
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return UserStatChart;
}(Component), _class.displayName = 'UserStatChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { UserStatChart as default };


var sexRatio = [{
  item: '男',
  percent: 57
}, {
  item: '女',
  percent: 30
}, {
  item: '其他',
  percent: 13
}];

var userData = [{
  month: '1 月',
  count: 50
}, {
  month: '2 月',
  count: 60
}, {
  month: '3 月',
  count: 120
}, {
  month: '4 月',
  count: 90
}, {
  month: '5 月',
  count: 100
}, {
  month: '6 月',
  count: 300
}, {
  month: '7 月',
  count: 110
}, {
  month: '8 月',
  count: 320
}, {
  month: '9 月',
  count: 260
}, {
  month: '10 月',
  count: 220
}, {
  month: '11 月',
  count: 420
}, {
  month: '12 月',
  count: 320
}];
var ageData = [{
  age: '15 岁',
  count: 10
}, {
  age: '16 岁',
  count: 220
}, {
  age: '17 岁',
  count: 200
}, {
  age: '18 岁',
  count: 530
}, {
  age: '19 岁',
  count: 140
}, {
  age: '20 岁',
  count: 1030
}, {
  age: '21 岁',
  count: 130
}];