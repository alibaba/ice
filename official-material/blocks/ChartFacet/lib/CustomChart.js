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
import { Chart, Tooltip, Facet, Legend, Coord } from 'bizcharts';
import { DataView } from '@antv/data-set';

var CustomChart = (_temp = _class = function (_Component) {
  _inherits(CustomChart, _Component);

  function CustomChart(props) {
    _classCallCheck(this, CustomChart);

    var _this = _possibleConstructorReturn(this, (CustomChart.__proto__ || _Object$getPrototypeOf(CustomChart)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(CustomChart, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = [{ gender: '男', count: 40, class: '一班', grade: '一年级' }, { gender: '女', count: 30, class: '一班', grade: '一年级' }, { gender: '男', count: 35, class: '二班', grade: '一年级' }, { gender: '女', count: 45, class: '二班', grade: '一年级' }, { gender: '男', count: 20, class: '三班', grade: '一年级' }, { gender: '女', count: 35, class: '三班', grade: '一年级' }, { gender: '男', count: 30, class: '一班', grade: '二年级' }, { gender: '女', count: 40, class: '一班', grade: '二年级' }, { gender: '男', count: 25, class: '二班', grade: '二年级' }, { gender: '女', count: 32, class: '二班', grade: '二年级' }, { gender: '男', count: 28, class: '三班', grade: '二年级' }, { gender: '女', count: 36, class: '三班', grade: '二年级' }];

      var scale = {
        cut: {
          sync: true
        },
        mean: {
          sync: true,
          tickCount: 5
        }
      };

      return React.createElement(
        Chart,
        { data: data, height: 400, scale: scale },
        React.createElement(Tooltip, { showTitle: false }),
        React.createElement(Legend, null),
        React.createElement(Coord, { type: 'theta' }),
        React.createElement(Facet, {
          type: 'tree',
          fields: ['grade', 'class'],
          line: { stroke: '#c0d0e0' },
          lineSmooth: true,
          eachView: function eachView(view, facet) {
            var data2 = facet.data;
            var dv = new DataView();
            dv.source(data2).transform({
              type: 'percent',
              field: 'count',
              dimension: 'gender',
              as: 'percent'
            });
            view.source(dv, {
              percent: {
                formatter: function formatter(val) {
                  return (val * 100).toFixed(2) + '%';
                }
              }
            });
            view.intervalStack().position('percent').color('gender');
          }
        })
      );
    }
  }]);

  return CustomChart;
}(Component), _class.displayName = 'CustomChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { CustomChart as default };