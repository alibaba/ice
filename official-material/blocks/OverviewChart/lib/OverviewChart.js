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
import IceContainer from '@icedesign/container';

import PieDonutChart from './PieDonutChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

var Row = _Grid.Row,
    Col = _Grid.Col;
var OverviewChart = (_temp = _class = function (_Component) {
  _inherits(OverviewChart, _Component);

  function OverviewChart(props) {
    _classCallCheck(this, OverviewChart);

    var _this = _possibleConstructorReturn(this, (OverviewChart.__proto__ || _Object$getPrototypeOf(OverviewChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(OverviewChart, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          Row,
          { wrap: true, gutter: '20', style: styles.overviewChart },
          React.createElement(
            Col,
            { xxs: '24', s: '8', l: '8' },
            React.createElement(
              IceContainer,
              { title: '\u884C\u4E1A\u7279\u5F81' },
              React.createElement(PieDonutChart, null)
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '8', l: '8' },
            React.createElement(
              IceContainer,
              { title: '\u9500\u552E\u8D8B\u52BF' },
              React.createElement(BarChart, null)
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '8', l: '8' },
            React.createElement(
              IceContainer,
              { title: '\u8425\u6536\u8D8B\u52BF' },
              React.createElement(LineChart, null)
            )
          )
        )
      );
    }
  }]);

  return OverviewChart;
}(Component), _class.displayName = 'OverviewChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { OverviewChart as default };


var styles = {};