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
    year: "1959 年",
    sales: 38
  },
  {
    year: "1960 年",
    sales: 38
  },
  {
    year: "1962 年",
    sales: 38
  }
];

const cols = {
  sales: {
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
        <Axis name="year" />
        <Axis name="sales" />
        <Tooltip
          crosshairs={{
              type: "y"
            }}
        />
        <Geom type="interval" position="year*sales" shape={['year', ['circle', 'rect']]} />
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
