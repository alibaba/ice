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

import CustomChart from './CustomChart';

var Row = _Grid.Row,
    Col = _Grid.Col;
var ChartFacet = (_temp = _class = function (_Component) {
  _inherits(ChartFacet, _Component);

  function ChartFacet(props) {
    _classCallCheck(this, ChartFacet);

    var _this = _possibleConstructorReturn(this, (ChartFacet.__proto__ || _Object$getPrototypeOf(ChartFacet)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartFacet, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'chart-facet' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u5206\u9762\u56FE'
          ),
          React.createElement(
            Row,
            { wrap: true },
            React.createElement(
              Col,
              { xxs: '24', l: '12' },
              React.createElement(CustomChart, null)
            ),
            React.createElement(
              Col,
              { xxs: '24', l: '12' },
              React.createElement(CustomChart, null)
            )
          )
        )
      );
    }
  }]);

  return ChartFacet;
}(Component), _class.displayName = 'ChartFacet', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartFacet as default };


var styles = {
  title: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};