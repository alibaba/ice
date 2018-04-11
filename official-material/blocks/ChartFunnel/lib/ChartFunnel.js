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
import { Chart, Geom, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';
import { DataView } from '@antv/data-set';

var ChartFunnel = (_temp = _class = function (_Component) {
  _inherits(ChartFunnel, _Component);

  function ChartFunnel(props) {
    _classCallCheck(this, ChartFunnel);

    var _this = _possibleConstructorReturn(this, (ChartFunnel.__proto__ || _Object$getPrototypeOf(ChartFunnel)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ChartFunnel, [{
    key: 'render',
    value: function render() {
      // 参考：https://alibaba.github.io/BizCharts/
      var Text = Guide.Text;

      var data = [{ action: '浏览网站', pv: 50000 }, { action: '放入购物车', pv: 35000 }, { action: '生成订单', pv: 25000 }, { action: '支付订单', pv: 15000 }, { action: '完成交易', pv: 8000 }];

      var dv = new DataView().source(data);
      dv.transform({
        type: 'percent',
        field: 'pv',
        dimension: 'action',
        as: 'percent'
      });
      data = dv.rows;

      var cols = {
        percent: {
          nice: false
        }
      };

      return React.createElement(
        'div',
        { className: 'chart-funnel' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u6F0F\u6597\u56FE'
          ),
          React.createElement(
            Chart,
            {
              height: 400,
              data: data,
              scale: cols,
              padding: [20, 120, 95],
              forceFit: true
            },
            React.createElement(Tooltip, {
              showTitle: false,
              itemTpl: '<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">\u6D4F\u89C8\u4EBA\u6570\uFF1A{pv}</span><br/><span style="padding-left: 16px">\u5360\u6BD4\uFF1A{percent}</span><br/></li>'
            }),
            React.createElement(Coord, { type: 'rect', transpose: true, scale: [1, -1] }),
            React.createElement(Legend, null),
            data.map(function (obj, index) {
              return React.createElement(
                Guide,
                { key: index },
                React.createElement(Text, {
                  top: true,
                  position: {
                    action: obj.action,
                    percent: 'median'
                  },
                  content: parseInt(obj.percent * 100, 10) + '%',
                  style: {
                    fill: '#fff',
                    fontSize: '12',
                    textAlign: 'center',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)'
                  }
                })
              );
            }),
            React.createElement(
              Geom,
              {
                type: 'intervalSymmetric',
                position: 'action*percent',
                shape: 'funnel',
                color: ['action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']],
                tooltip: ['action*pv*percent', function (action, pv, percent) {
                  return {
                    name: action,
                    percent: parseInt(percent * 100, 10) + '%',
                    pv: pv
                  };
                }]
              },
              React.createElement(Label, {
                content: ['action*pv', function (action, pv) {
                  return action + ' ' + pv;
                }],
                offset: 35,
                labeLine: {
                  lineWidth: 1,
                  stroke: 'rgba(0, 0, 0, 0.15)'
                }
              })
            )
          )
        )
      );
    }
  }]);

  return ChartFunnel;
}(Component), _class.displayName = 'ChartFunnel', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartFunnel as default };


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};