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
import { Chart, Geom, Tooltip, Label, View } from 'bizcharts';
import axios from 'axios';
import { DataSet } from '@antv/data-set';

var MapChart = (_temp = _class = function (_Component) {
  _inherits(MapChart, _Component);

  function MapChart(props) {
    _classCallCheck(this, MapChart);

    var _this = _possibleConstructorReturn(this, (MapChart.__proto__ || _Object$getPrototypeOf(MapChart)).call(this, props));

    _this.getChinaGeo = function () {
      axios.get('//raw.githubusercontent.com/alibaba/BizCharts/gh-pages/public/data/china-geo.json').then(function (res) {
        console.log('res:', res);
        _this.setState({
          data: res.data
        });
      }).catch(function (err) {
        console.log(err);
      });
    };

    _this.state = {
      data: {}
    };
    return _this;
  }

  _createClass(MapChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getChinaGeo();
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.state.data;

      if (!data.features) {
        return React.createElement(
          'p',
          null,
          '\u6570\u636E\u52A0\u8F7D\u4E2D...'
        );
      }
      var cols = {
        x: { sync: true, nice: false },
        y: { sync: true, nice: false }
      };
      console.log(this.state.data);
      var _state$data$features = this.state.data.features,
          features = _state$data$features === undefined ? [] : _state$data$features;

      var userData = [];
      for (var i = 0; i < features.length; i++) {
        var name = features[i].properties.name;
        userData.push({
          name: name,
          value: Math.round(Math.random() * 1000)
        });
      }
      // data set
      var ds = new DataSet();
      // geo data
      var dvGeo = ds.createView().source(data, {
        type: 'GeoJSON'
      });
      // user data
      var dvData = ds.createView().source(userData);
      // assign centroid point (x, y) to user data
      dvData.transform({
        type: 'geo.region',
        field: 'name',
        geoDataView: dvGeo,
        as: ['longitude', 'latitude']
      });

      return React.createElement(
        Chart,
        { height: 380, scale: cols, padding: [2], forceFit: true },
        React.createElement(Tooltip, { showTitle: false }),
        React.createElement(
          View,
          { data: dvGeo },
          React.createElement(Geom, {
            type: 'polygon',
            position: 'longitude*latitude',
            style: { fill: '#fff', stroke: '#ccc', lineWidth: 1 }
          })
        ),
        React.createElement(
          View,
          {
            data: dvData,
            scale: {
              trend: {
                alias: 'name'
              }
            }
          },
          React.createElement(
            Geom,
            {
              type: 'polygon',
              position: 'longitude*latitude',
              animate: { leave: { animation: 'fadeOut' } },
              opacity: 'value',
              tooltip: 'name*trend',
              color: ['trend', ['#307ffe', '#e3edff']],
              size: 0
            },
            React.createElement(Label, {
              content: 'name',
              offset: 0,
              textStyle: { fill: '#545454', fontSize: 10 }
            })
          )
        ),
        React.createElement(Geom, {
          type: 'polygon',
          position: 'x*y',
          style: { lineWidth: 1, stroke: '#fff' },
          color: ['count', ['rgb(200, 200, 255)', 'rgb(0, 0, 255)']]
        })
      );
    }
  }]);

  return MapChart;
}(Component), _class.displayName = 'MapChart', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { MapChart as default };