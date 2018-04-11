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
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

var BasicLine = (_temp = _class = function (_Component) {
  _inherits(BasicLine, _Component);

  function BasicLine(props) {
    _classCallCheck(this, BasicLine);

    var _this = _possibleConstructorReturn(this, (BasicLine.__proto__ || _Object$getPrototypeOf(BasicLine)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(BasicLine, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      // 数据源
      var data = [{ year: '2011', value: 30 }, { year: '2012', value: 40 }, { year: '2013', value: 35 }, { year: '2014', value: 50 }, { year: '2015', value: 49 }, { year: '2016', value: 60 }, { year: '2017', value: 70 }, { year: '2018', value: 90 }, { year: '2019', value: 100 }];

      var cols = {
        value: { min: 0 },
        year: { range: [0, 1] }
      };

      return React.createElement(
        'div',
        { className: 'basic-line' },
        React.createElement(
          Chart,
          {
            height: 300,
            data: data,
            scale: cols,
            forceFit: true,
            padding: [40, 35, 40, 35]
          },
          React.createElement(Axis, { name: 'year' }),
          React.createElement(Axis, { name: 'value' }),
          React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
          React.createElement(Geom, { type: 'line', position: 'year*value', size: 2 }),
          React.createElement(Geom, {
            type: 'point',
            position: 'year*value',
            size: 4,
            shape: 'circle',
            style: styles.point
          })
        )
      );
    }
  }]);

  return BasicLine;
}(Component), _class.displayName = 'BasicLine', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { BasicLine as default };


var styles = {
  point: {
    stroke: '#fff',
    lineWidth: 1
  }
};