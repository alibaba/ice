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
import DataSet from "@antv/data-set";

const mock = [
  {
    name: "London",
    "Jun.": 20.3,
    "Jul.": 24,
    "Aug.": 35.6
  },
  {
    name: "Berlin",
    "Jun.": 35.5,
    "Jul.": 37.4,
    "Aug.": 42.4
  }
];

const ds = new DataSet();
const dv = ds.createView().source(mock);
dv.transform({
  type: "fold",
  fields: ["Jun.", "Jul.", "Aug."],
  // 展开字段集
  key: "月份",
  // key字段
  value: "月均降雨量" // value字段
});

const cols = {
  sales: {
    tickInterval: 100
  }
};

export default class GroupedBarChart extends Component {

  render() {
    return(
      <Chart
        height={200}
        width={270}
        data={dv}
        padding={40}
      >
        <Axis name="月份" />
        <Axis name="月均降雨量" />
        <Legend />
        <Tooltip
          crosshairs={{
              type: "y"
            }}
        />
        <Geom
          type="interval"
          position="月份*月均降雨量"
          color={"name"}
          adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
        />
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
