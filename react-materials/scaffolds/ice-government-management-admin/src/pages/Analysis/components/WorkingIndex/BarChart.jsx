import React, { Component } from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

const mock = [
  {
    index: "收案数",
    number: 290
  },
  {
    index: "结案数",
    number: 400
  },
  {
    index: "存案数",
    number: 200
  }
];

const cols = {
  number: {
    tickInterval: 100
  }
};

export default class BarChart extends Component {

  render() {
    return(
      <Chart
        height={200}
        width={270}
        data={mock}
        scale={cols}

        padding={40}
      >
        <Axis name="index" />
        <Axis name="number" />
        <Tooltip
          crosshairs={{
              type: "y"
            }}
        />
        <Legend />
        <Geom type="interval" position="index*number" shape={['index', ['circle', 'rect']]} />
      </Chart>
    );
  }
}

const styles = {
  chart: {
    width: '50%',
    boxSizing: 'border-box'
  }
};
