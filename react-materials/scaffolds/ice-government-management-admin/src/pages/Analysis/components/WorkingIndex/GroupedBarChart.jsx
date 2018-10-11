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
    name: "实际指标",
    "执限内执结率": 40,
    "实际执行率": 71,
    "执行终结率": 40
  },
  {
    name: "平均指标",
    "执限内执结率": 36,
    "实际执行率": 60,
    "执行终结率": 52
  }
];

const ds = new DataSet();
const dv = ds.createView().source(mock);
dv.transform({
  type: "fold",
  fields: ["执限内执结率", "实际执行率", "执行终结率"],
  key: "工作指标",
  value: "完成率"
});

export default class GroupedBarChart extends Component {

  render() {
    return(
      <Chart
        height={200}
        width={270}
        data={dv}
        padding={48}
      >
        <Axis name="工作指标"/>
        <Axis name="完成率"/>
        <Legend position="top-center"/>
        <Tooltip
          crosshairs={{
              type: "y"
            }}
        />
        <Geom
          type="interval"
          position="工作指标*完成率"
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
