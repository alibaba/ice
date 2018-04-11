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
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';

var ChartBar = (_temp = _class = function (_Component) {
  _inherits(ChartBar, _Component);

  function ChartBar(props) {
    _classCallCheck(this, ChartBar);

    var _this = _possibleConstructorReturn(this, (ChartBar.__proto__ || _Object$getPrototypeOf(ChartBar)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartBar, [{
    key: 'render',
    value: function render() {
      var data = [{
        name: 'London',
        'Jan.': 18.9,
        'Feb.': 28.8,
        'Mar.': 39.3,
        'Apr.': 81.4,
        May: 47,
        'Jun.': 20.3,
        'Jul.': 24,
        'Aug.': 35.6
      }, {
        name: 'Berlin',
        'Jan.': 12.4,
        'Feb.': 23.2,
        'Mar.': 34.5,
        'Apr.': 99.7,
        May: 52.6,
        'Jun.': 35.5,
        'Jul.': 37.4,
        'Aug.': 42.4
      }];

      var ds = new DataSet();
      var dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'], // 展开字段集
        key: '月份', // key字段
        value: '月均降雨量' // value字段
      });

      return React.createElement(
        'div',
        { className: 'chart-bar' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u67F1\u72B6\u56FE'
          ),
          React.createElement(
            Chart,
            { height: 400, data: dv, forceFit: true },
            React.createElement(Axis, { name: '\u6708\u4EFD' }),
            React.createElement(Axis, { name: '\u6708\u5747\u964D\u96E8\u91CF' }),
            React.createElement(Legend, null),
            React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
            React.createElement(Geom, {
              type: 'interval',
              position: '\u6708\u4EFD*\u6708\u5747\u964D\u96E8\u91CF',
              color: 'name',
              adjust: [{ type: 'dodge', marginRatio: 1 / 32 }]
            })
          )
        )
      );
    }
  }]);

  return ChartBar;
}(Component), _class.displayName = 'ChartBar', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartBar as default };


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};