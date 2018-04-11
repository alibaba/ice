import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Tab from '@icedesign/base/lib/tab';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import SeriesLine from './SeriesLine';
import BasicLine from './BasicLine';

var TabPane = _Tab.TabPane;

var TabChart = (_temp = _class = function (_Component) {
  _inherits(TabChart, _Component);

  function TabChart(props) {
    _classCallCheck(this, TabChart);

    var _this = _possibleConstructorReturn(this, (TabChart.__proto__ || _Object$getPrototypeOf(TabChart)).call(this, props));

    _this.handleChange = function (key) {
      console.log('change', key);
    };

    _this.state = {};
    return _this;
  }

  _createClass(TabChart, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'tab-chart', style: styles.container },
        React.createElement(
          IceContainer,
          { style: styles.card },
          React.createElement(
            _Tab,
            { onChange: this.handleChange },
            React.createElement(
              TabPane,
              { key: '1', tab: '\u6536\u76CA\u8D70\u52BF' },
              React.createElement(SeriesLine, null)
            ),
            React.createElement(
              TabPane,
              { key: '2', tab: '\u6210\u4EA4\u8D8B\u52BF' },
              React.createElement(BasicLine, null)
            )
          )
        )
      );
    }
  }]);

  return TabChart;
}(Component), _class.displayName = 'TabChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { TabChart as default };


var styles = {
  container: {
    marginBottom: '20px'
  },
  card: {
    padding: '0 20px'
  }
};