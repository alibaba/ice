import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, View } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import './ChartBox.scss';

export default class ChartBox extends Component {
  static displayName = 'ChartBox';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      {
        x: '职业 A',
        low: 20000,
        q1: 26000,
        median: 27000,
        q3: 32000,
        high: 38000,
        outliers: [50000, 52000],
      },
      {
        x: '职业 B',
        low: 40000,
        q1: 49000,
        median: 62000,
        q3: 73000,
        high: 88000,
        outliers: [32000, 29000, 106000],
      },
      {
        x: '职业 C',
        low: 52000,
        q1: 59000,
        median: 65000,
        q3: 74000,
        high: 83000,
        outliers: [91000],
      },
      {
        x: '职业 D',
        low: 58000,
        q1: 96000,
        median: 130000,
        q3: 170000,
        high: 200000,
        outliers: [42000, 210000, 215000],
      },
      {
        x: '职业 E',
        low: 24000,
        q1: 28000,
        median: 32000,
        q3: 38000,
        high: 42000,
        outliers: [48000],
      },
      {
        x: '职业 F',
        low: 47000,
        q1: 56000,
        median: 69000,
        q3: 85000,
        high: 100000,
        outliers: [110000, 115000, 32000],
      },
      {
        x: '职业 G',
        low: 64000,
        q1: 74000,
        median: 83000,
        q3: 93000,
        high: 100000,
        outliers: [110000],
      },
      {
        x: '职业 H',
        low: 67000,
        q1: 72000,
        median: 84000,
        q3: 95000,
        high: 110000,
        outliers: [57000, 54000],
      },
    ];

    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv.transform({
      type: 'map',
      callback: (obj) => {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
      },
    });

    const cols = {
      range: {
        min: 0,
        max: 240000,
      },
      outliers: {
        min: 0,
        max: 240000,
      },
    };

    return (
      <div className="chart-box">
        <IceContainer>
          <h4 style={styles.title}>箱型图</h4>
          <Chart
            height={400}
            data={dv}
            scale={cols}
            padding={[20, 120, 95]}
            forceFit
          >
            <Axis name="x" />
            <Axis name="range" />
            <Tooltip
              showTitle={false}
              crosshairs={{
                type: 'rect',
                style: { fill: '#E4E8F1', fillOpacity: 0.43 },
              }}
              itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>最大值：{high}</span><br/><span style=&quot;padding-left: 16px&quot;>上四分位数：{q3}</span><br/><span style=&quot;padding-left: 16px&quot;>中位数：{median}</span><br/><span style=&quot;padding-left: 16px&quot;>下四分位数：{q1}</span><br/><span style=&quot;padding-left: 16px&quot;>最小值：{low}</span><br/></li>"
            />

            <Geom
              type="schema"
              position="x*range"
              shape="box"
              tooltip={[
                'x*low*q1*median*q3*high',
                (x, low, q1, median, q3, high) => {
                  return {
                    name: x,
                    low,
                    q1,
                    median,
                    q3,
                    high,
                  };
                },
              ]}
              style={{
                stroke: 'rgba(0, 0, 0, 0.45)',
                fill: '#1890FF',
                fillOpacity: 0.3,
              }}
            />
            <View data={data}>
              <Geom
                type="point"
                position="x*outliers"
                shape="circle"
                size={3}
                active={false}
              />
            </View>
          </Chart>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
