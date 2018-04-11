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
import axios from 'axios';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

var ChartPoint = (_temp = _class = function (_Component) {
  _inherits(ChartPoint, _Component);

  function ChartPoint(props) {
    _classCallCheck(this, ChartPoint);

    var _this = _possibleConstructorReturn(this, (ChartPoint.__proto__ || _Object$getPrototypeOf(ChartPoint)).call(this, props));

    _this.state = {
      data: []
    };
    return _this;
  }

  _createClass(ChartPoint, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      axios.get('/mock/chart-point.json').then(function (response) {
        console.log(response.data.data);
        _this2.setState({
          data: response.data.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'chart-point' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'h4',
            { style: styles.title },
            '\u70B9\u56FE'
          ),
          React.createElement(
            Chart,
            {
              height: 400,
              data: this.state.data,
              forceFit: true,
              padding: [20, 20, 40, 40]
            },
            React.createElement(Tooltip, {
              showTitle: false,
              crosshairs: { type: 'cross' },
              itemTpl: '<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>{value}</li>'
            }),
            React.createElement(Axis, { name: 'height' }),
            React.createElement(Axis, { name: 'weight' }),
            React.createElement(Geom, {
              type: 'point',
              position: 'height*weight',
              opacity: 0.65,
              shape: 'circle',
              size: 4,
              tooltip: ['gender*height*weight', function (gender, height, weight) {
                return {
                  name: gender,
                  value: height + '(cm), ' + weight + '(kg)'
                };
              }]
            })
          )
        )
      );
    }
  }]);

  return ChartPoint;
}(Component), _class.displayName = 'ChartPoint', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ChartPoint as default };


var styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  }
};