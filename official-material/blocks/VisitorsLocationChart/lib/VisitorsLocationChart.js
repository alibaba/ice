import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Progress from '@icedesign/base/lib/progress';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import MapChart from './MapChart';

var Row = _Grid.Row,
    Col = _Grid.Col;

var data = [{
  pic: 'https://img.alicdn.com/tfs/TB1BnWWbwmTBuNjy1XbXXaMrVXa-263-263.png',
  city: '北京',
  percent: '95'
}, {
  pic: 'https://img.alicdn.com/tfs/TB1sFe1brGYBuNjy0FoXXciBFXa-400-400.png',
  city: '上海',
  percent: '70'
}, {
  pic: 'https://img.alicdn.com/tfs/TB1MlrfbqmWBuNjy1XaXXXCbXXa-400-400.png',
  city: '广州',
  percent: '40'
}, {
  pic: 'https://img.alicdn.com/tfs/TB18Va1brGYBuNjy0FoXXciBFXa-363-363.png',
  city: '杭州',
  percent: '20'
}];

var VisitorsLocationChart = (_temp = _class = function (_Component) {
  _inherits(VisitorsLocationChart, _Component);

  function VisitorsLocationChart(props) {
    _classCallCheck(this, VisitorsLocationChart);

    var _this = _possibleConstructorReturn(this, (VisitorsLocationChart.__proto__ || _Object$getPrototypeOf(VisitorsLocationChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(VisitorsLocationChart, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        { title: '\u6D3B\u8DC3\u5730\u533A' },
        React.createElement(
          Row,
          { wrap: true },
          React.createElement(
            Col,
            { xxs: '24', l: '10' },
            data.map(function (item, index) {
              return React.createElement(
                Row,
                { style: styles.item, key: index },
                React.createElement(
                  Col,
                  { xxs: '7', l: '6' },
                  React.createElement('img', { src: item.pic, style: styles.itemPic, alt: '' })
                ),
                React.createElement(
                  Col,
                  { xxs: '16', l: '17' },
                  React.createElement(
                    'p',
                    { style: styles.itemCity },
                    item.city
                  ),
                  React.createElement(_Progress, { percent: item.percent })
                )
              );
            })
          ),
          React.createElement(
            Col,
            { xxs: '24', l: '14' },
            React.createElement(MapChart, null)
          )
        )
      );
    }
  }]);

  return VisitorsLocationChart;
}(Component), _class.displayName = 'VisitorsLocationChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { VisitorsLocationChart as default };


var styles = {
  item: {
    marginBottom: '20px'
  },
  itemPic: {
    width: '100%',
    maxWidth: '80px',
    borderRadius: 50
  },
  itemCity: {
    margin: '10px 0 0'
  },
  itemBody: {}
};