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

import ColumnChart from './ColumnChart';

var Row = _Grid.Row,
    Col = _Grid.Col;
var Head = (_temp = _class = function (_Component) {
  _inherits(Head, _Component);

  function Head(props) {
    _classCallCheck(this, Head);

    var _this = _possibleConstructorReturn(this, (Head.__proto__ || _Object$getPrototypeOf(Head)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Head, [{
    key: 'render',
    value: function render() {
      var data = this.props.data;

      return React.createElement(
        Row,
        { type: 'wrap' },
        React.createElement(
          Col,
          { xxs: '12', s: '12', l: '6' },
          React.createElement(
            'div',
            { style: styles.box },
            React.createElement(
              'p',
              { style: styles.textLabel },
              '\u6D4F\u89C8\u6B21\u6570'
            ),
            React.createElement(
              'h2',
              { style: styles.counterNum },
              data.visits
            ),
            React.createElement(ColumnChart, null)
          )
        ),
        React.createElement(
          Col,
          { xxs: '12', s: '12', l: '6' },
          React.createElement(
            'div',
            { style: styles.box },
            React.createElement(
              'p',
              { style: styles.textLabel },
              '\u72EC\u7ACB\u8BBF\u5BA2'
            ),
            React.createElement(
              'h2',
              { style: styles.counterNum },
              data.unique_users
            ),
            React.createElement(ColumnChart, { color: '#fcdb51' })
          )
        ),
        React.createElement(
          Col,
          { xxs: '12', s: '12', l: '6' },
          React.createElement(
            'div',
            { style: styles.box },
            React.createElement(
              'p',
              { style: styles.textLabel },
              'IP'
            ),
            React.createElement(
              'h2',
              { style: styles.counterNum },
              data.ip
            ),
            React.createElement(ColumnChart, { color: '#2eca9c' })
          )
        ),
        React.createElement(
          Col,
          { xxs: '12', s: '12', l: '6' },
          React.createElement(
            'div',
            { style: styles.box },
            React.createElement(
              'p',
              { style: styles.textLabel },
              '\u70B9\u51FB\u6B21\u6570'
            ),
            React.createElement(
              'h2',
              { style: styles.counterNum },
              data.click
            ),
            React.createElement(ColumnChart, { color: '#fa706f' })
          )
        )
      );
    }
  }]);

  return Head;
}(Component), _class.displayName = 'Head', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { Head as default };


var styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px'
  },
  textLabel: {
    margin: 0,
    color: '#666'
  },
  counterNum: {
    margin: '10px',
    fontSize: '28px'
  }
};