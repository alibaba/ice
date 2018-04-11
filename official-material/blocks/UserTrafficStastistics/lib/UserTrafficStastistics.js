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
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';

var Row = _Grid.Row,
    Col = _Grid.Col;
var UserTrafficStastistics = (_temp = _class = function (_Component) {
  _inherits(UserTrafficStastistics, _Component);

  function UserTrafficStastistics(props) {
    _classCallCheck(this, UserTrafficStastistics);

    var _this = _possibleConstructorReturn(this, (UserTrafficStastistics.__proto__ || _Object$getPrototypeOf(UserTrafficStastistics)).call(this, props));

    _this.renderTrafficTypes = function () {
      var data = [{ status: '激活', count: 356 }, { status: '保持', count: 235 }, { status: '关闭', count: 245 }];
      var total = 0;
      data.forEach(function (item) {
        total += item.count;
      });
      var precentages = {};
      data.forEach(function (item) {
        precentages[item.status] = item.count / total;
      });

      var cols = {
        count: {
          min: 0
        }
      };
      return React.createElement(
        IceContainer,
        { title: '\u8BBF\u95EE\u7528\u6237\u7C7B\u578B\u5206\u5E03' },
        React.createElement(
          'div',
          null,
          React.createElement(
            Chart,
            {
              height: 300,
              data: data,
              scale: cols,
              padding: [70, 20, 100, 20],
              forceFit: true
            },
            React.createElement(Coord, { type: 'polar' }),
            React.createElement(Axis, {
              name: 'count',
              label: null,
              tickLine: null,
              line: {
                stroke: '#E9E9E9',
                lineDash: [3, 3]
              }
            }),
            React.createElement(Axis, {
              name: 'status',
              grid: {
                align: 'center'
              },
              tickLine: null,
              label: {
                Offset: 10,
                textStyle: {
                  textAlign: 'center' // 设置坐标轴 label 的文本对齐方向
                }
              }
            }),
            React.createElement(Legend, {
              itemFormatter: function itemFormatter(text) {
                return text + ' (' + (precentages[text] * 100).toFixed(2) + '%)';
              },
              name: 'status',
              itemWidth: 100
            }),
            React.createElement(Tooltip, null),
            React.createElement(
              Geom,
              {
                type: 'interval',
                position: 'status*count',
                color: 'status',
                style: {
                  lineWidth: 1,
                  stroke: '#fff'
                }
              },
              React.createElement(Label, {
                content: 'count',
                offset: -15,
                textStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 11
                }
              })
            )
          )
        )
      );
    };

    _this.renderUserStatistics = function () {
      var data = [{ type: '日用户量', count: 151, date: '02-21' }, { type: '周用户量', count: 532, date: '02-21' }, { type: '月用户量', count: 1834, date: '02-21' }, { type: '日用户量', count: 251, date: '02-22' }, { type: '周用户量', count: 732, date: '02-22' }, { type: '月用户量', count: 2534, date: '02-22' }, { type: '日用户量', count: 311, date: '02-23' }, { type: '周用户量', count: 932, date: '02-23' }, { type: '月用户量', count: 1234, date: '02-23' }, { type: '日用户量', count: 221, date: '02-24' }, { type: '周用户量', count: 632, date: '02-24' }, { type: '月用户量', count: 2534, date: '02-24' }, { type: '日用户量', count: 121, date: '02-25' }, { type: '周用户量', count: 532, date: '02-25' }, { type: '月用户量', count: 2114, date: '02-25' }, { type: '日用户量', count: 221, date: '02-26' }, { type: '周用户量', count: 632, date: '02-26' }, { type: '月用户量', count: 2534, date: '02-26' }, { type: '日用户量', count: 311, date: '02-27' }, { type: '周用户量', count: 932, date: '02-27' }, { type: '月用户量', count: 1234, date: '02-27' }];
      var dv = new DataView().source(data).transform({
        type: 'fill-rows',
        groupBy: ['type'],
        orderBy: ['date']
      }).transform({
        type: 'impute',
        field: 'count',
        method: 'value',
        value: 0
      });
      var cols = {
        date: {
          tickInterval: 10,
          nice: false
        },
        count: {
          // nice: false,
          min: -500
        }
      };
      return React.createElement(
        IceContainer,
        { title: '\u7528\u6237\u6570\u636E\u5206\u6790' },
        React.createElement(
          'div',
          null,
          React.createElement(
            Chart,
            {
              height: 300,
              data: dv,
              scale: cols,
              padding: [20, 0, 80, 50],
              plotBackground: { stroke: '#ccc' },
              forceFit: true
            },
            React.createElement(Axis, { name: 'date', line: null }),
            React.createElement(Axis, {
              name: 'count',
              line: null,
              tickLine: {
                length: 8
              },
              subTickCount: 10,
              subTickLine: {
                lineWidth: 1, // 子刻度线宽
                stroke: '#ddd', // 子刻度线颜色
                length: 5
              },
              grid: null
            }),
            React.createElement(Legend, {
              position: 'bottom',
              useHtml: true,
              'g2-legend-marker': {
                borderRadius: 'none'
              },
              'g2-legend-title': {
                fontSize: '12px',
                fontWeight: 500,
                margin: 0,
                color: '#ff8800'
              }
            }),
            React.createElement(Tooltip, { shared: false, crosshairs: false, inPlot: false }),
            React.createElement(Geom, {
              type: 'area',
              position: 'date*count',
              color: 'type',
              adjust: ['stack', 'symmetric'],
              shape: 'smooth',
              opacity: 1
            })
          )
        )
      );
    };

    _this.renderBrowserStatus = function () {
      var browsers = [{ type: 'Google Chrome', rate: 0.5 }, { type: 'Mozila Firefox', rate: 0.1 }, { type: 'Internet Explorer', rate: 0.3 }, { type: 'Safari', rate: 0.1 }];

      return React.createElement(
        'div',
        null,
        React.createElement(
          IceContainer,
          { title: '\u6D4F\u89C8\u5668\u7C7B\u578B' },
          React.createElement(
            'ul',
            null,
            browsers.map(function (browser) {
              return React.createElement(
                'li',
                { style: styles.browserItem, key: browser.type },
                React.createElement(
                  'span',
                  null,
                  browser.type
                ),
                React.createElement(
                  'span',
                  { style: styles.percentage },
                  parseInt(browser.rate * 100, 10),
                  '%'
                )
              );
            })
          )
        ),
        React.createElement(
          IceContainer,
          { title: '\u7528\u6237\u6EE1\u610F\u5EA6' },
          React.createElement(
            'div',
            { style: styles.satisfaction },
            '70%'
          ),
          React.createElement(
            Row,
            null,
            React.createElement(
              Col,
              { span: 8, style: styles.satisfactionItem },
              React.createElement(
                'div',
                { style: styles.subtitle },
                '\u4E0A\u4E2A\u6708'
              ),
              React.createElement(
                'div',
                null,
                '54.1%'
              )
            ),
            React.createElement(
              Col,
              { span: 8, style: styles.satisfactionItem },
              React.createElement(
                'div',
                { style: styles.subtitle },
                '\u53D8\u5316'
              ),
              React.createElement(
                'div',
                null,
                '+15.9%'
              )
            ),
            React.createElement(
              Col,
              { span: 8, style: styles.satisfactionItem },
              React.createElement(
                'div',
                { style: styles.subtitle },
                '\u8D8B\u52BF'
              ),
              React.createElement(
                'div',
                null,
                '\u4E0A\u5347'
              )
            )
          )
        )
      );
    };

    _this.state = {};
    return _this;
  }

  _createClass(UserTrafficStastistics, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'user-traffic-stastistics' },
        React.createElement(
          Row,
          { wrap: true, gutter: '20' },
          React.createElement(
            Col,
            { xxs: '24', l: '7' },
            this.renderTrafficTypes()
          ),
          React.createElement(
            Col,
            { xxs: '24', l: '10' },
            this.renderUserStatistics()
          ),
          React.createElement(
            Col,
            { xxs: '24', l: '7' },
            this.renderBrowserStatus()
          )
        )
      );
    }
  }]);

  return UserTrafficStastistics;
}(Component), _class.displayName = 'UserTrafficStastistics', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { UserTrafficStastistics as default };


var styles = {
  browserItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5px 0'
    // borderBottom: '1px dotted #eee',
  },
  percentage: {
    padding: '2px 5px',
    backgroundColor: '#307bf0',
    color: '#fff',
    borderRadius: '14px',
    fontSize: '12px'
  },
  satisfaction: {
    textAlign: 'center',
    fontSize: '36px',
    color: '#307bf0',
    padding: '0 0 8px'
  },
  satisfactionItem: {
    textAlign: 'center',
    fontWeight: 500
  },
  subtitle: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '5px',
    fontWeight: 400
  }
};