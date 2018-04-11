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
import { Chart, Geom, Tooltip, Label } from 'bizcharts';
import { DataView } from '@antv/data-set';

var ChartRelation = (_temp = _class = function (_Component) {
  _inherits(ChartRelation, _Component);

  function ChartRelation(props) {
    _classCallCheck(this, ChartRelation);

    var _this = _possibleConstructorReturn(this, (ChartRelation.__proto__ || _Object$getPrototypeOf(ChartRelation)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartRelation, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var data = {
        name: 'root',
        children: [{ name: '分类 1', value: 560 }, { name: '分类 2', value: 500 }, { name: '分类 3', value: 150 }, { name: '分类 4', value: 140 }, { name: '分类 5', value: 115 }, { name: '分类 6', value: 95 }, { name: '分类 7', value: 90 }, { name: '分类 8', value: 75 }, { name: '分类 9', value: 98 }, { name: '分类 10', value: 60 }, { name: '分类 11', value: 45 }, { name: '分类 12', value: 40 }, { name: '分类 13', value: 40 }, { name: '分类 14', value: 35 }, { name: '分类 15', value: 40 }, { name: '分类 16', value: 40 }, { name: '分类 17', value: 40 }, { name: '分类 18', value: 30 }, { name: '分类 19', value: 28 }, { name: '分类 20', value: 16 }]
      };

      var dv = new DataView();
      dv.source(data, {
        type: 'hierarchy'
      }).transform({
        field: 'value',
        type: 'hierarchy.treemap',
        tile: 'treemapResquarify',
        as: ['x', 'y']
      });
      var nodes = dv.getAllNodes();
      nodes.map(function (node) {
        node.name = node.data.name;
        node.value = node.data.value;
        return node;
      });

      var scale = {
        value: { nice: false }
      };

      var htmlStr = '<li data-index={index}>' + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' + '{name}<br/>' + '<span style="padding-left: 16px">浏览人数：{count}</span><br/>' + '</li>';
      return React.createElement(
        'div',
        { className: 'chart-relation' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u9762\u79EF\u56FE'
          ),
          React.createElement(
            Chart,
            {
              data: nodes,
              forceFit: true,
              height: 400,
              scale: scale,
              padding: [10]
            },
            React.createElement(Tooltip, { showTitle: false, itemTpl: htmlStr }),
            React.createElement(
              Geom,
              {
                type: 'polygon',
                position: 'x*y',
                color: 'name',
                tooltip: ['name*value', function (name, count) {
                  return {
                    name: name,
                    count: count
                  };
                }],
                style: { lineWidth: 1, stroke: '#fff' }
              },
              React.createElement(Label, {
                content: 'name',
                offset: 0,
                textStyle: { textBaseline: 'middle' },
                formatter: function formatter(val) {
                  if (val !== 'root') {
                    return val;
                  }
                }
              })
            )
          )
        )
      );
    }
  }]);

  return ChartRelation;
}(Component), _class.displayName = 'ChartRelation', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartRelation as default };


var styles = {
  title: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};