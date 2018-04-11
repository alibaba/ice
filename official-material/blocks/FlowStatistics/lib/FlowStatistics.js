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

import LineChart from './LineChart';
import Head from './Head';
import './FlowStatistics.scss';

var TabPane = _Tab.TabPane;

var MOCK_DATA = {
  threeMonths: {
    visits: '4,677',
    unique_users: '3,621',
    ip: '5,690',
    click: '6,583'
  },
  halfYear: {
    visits: '6,688',
    unique_users: '8,339',
    ip: '7,989',
    click: '9,832'
  },
  nearlyYear: {
    visits: '10,323',
    unique_users: '9,262',
    ip: '12,639',
    click: '26,386'
  }
};
var FlowStatistics = (_temp = _class = function (_Component) {
  _inherits(FlowStatistics, _Component);

  function FlowStatistics(props) {
    _classCallCheck(this, FlowStatistics);

    var _this = _possibleConstructorReturn(this, (FlowStatistics.__proto__ || _Object$getPrototypeOf(FlowStatistics)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(FlowStatistics, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        { className: 'flow-statistics' },
        React.createElement(
          'h4',
          { style: styles.title },
          '\u6D41\u91CF\u7EDF\u8BA1'
        ),
        React.createElement(
          _Tab,
          { type: 'text', size: 'small' },
          React.createElement(
            TabPane,
            { tab: '\u8FD1\u4E09\u4E2A\u6708', key: '1' },
            React.createElement(Head, { data: MOCK_DATA.threeMonths }),
            React.createElement(LineChart, null)
          ),
          React.createElement(
            TabPane,
            { tab: '\u8FD1\u534A\u5E74', key: '2' },
            React.createElement(Head, { data: MOCK_DATA.halfYear }),
            React.createElement(LineChart, null)
          ),
          React.createElement(
            TabPane,
            { tab: '\u8FD1\u4E00\u5E74', key: '3' },
            React.createElement(Head, { data: MOCK_DATA.nearlyYear }),
            React.createElement(LineChart, null)
          )
        )
      );
    }
  }]);

  return FlowStatistics;
}(Component), _class.displayName = 'FlowStatistics', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { FlowStatistics as default };


var styles = {
  title: {
    margin: '0',
    fontSize: '16px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    color: '#333'
  }
};