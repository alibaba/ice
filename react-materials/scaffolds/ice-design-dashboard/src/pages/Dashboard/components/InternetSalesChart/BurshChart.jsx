/* eslint react/no-multi-comp:0, no-shadow:0, no-new:0 */
import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';
import $ from 'jquery';
import data from './mock.json';

function getComponent(data) {
  $('#mountNode').html('<div id="canvas1"></div><div id="canvas2"></div>');
  const ds = new DataSet({
    state: {
      dates: null,
    },
  });
  const totalDv = ds.createView().source(data);
  const dv = ds.createView();
  dv.source(data).transform({
    type: 'filter',
    callback: (obj) => {
      if (ds.state.dates) {
        return ds.state.dates.indexOf(obj.date) > -1;
      }

      return obj;
    },
  });
  const scale1 = {
    date: {
      tickCount: 10,
      type: 'time',
      mask: 'MMM D YYYY',
    },
    price: {
      min: totalDv.min('price'),
      max: totalDv.max('price'),
    },
  };

  class DoubleChart extends React.Component {
    render() {
      return (
        <Chart
          height={435}
          data={dv}
          padding={[60, 40, 40, 40]}
          scale={scale1}
          animate={false}
          forceFit
        >
          <Axis
            name="price"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Axis
            name="date"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Tooltip />
          <Geom
            type="area"
            position="date*price"
            shape="smooth"
            opacity={0.85}
          />
        </Chart>
      );
    }
  }
  return DoubleChart;
}

class Brushdsstate extends React.Component {
  render() {
    const DoubleChart = getComponent(data);
    return <DoubleChart />;
  }
}

export default Brushdsstate;
