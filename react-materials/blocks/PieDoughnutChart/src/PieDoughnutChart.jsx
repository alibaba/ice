import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Chart, Coord, Geom, Tooltip, Axis, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

const { Row, Col } = Grid;
const { DataView } = DataSet;

export default class PieDoughnutChart extends Component {
  static displayName = 'PieDoughnutChart';

  render() {
    const data = [
      { genre: '男', sold: 500 },
      { genre: '女', sold: 200 },
      { genre: '未知', sold: 200 },
    ];

    const data2 = [
      { genre: '10~20岁', sold: 500 },
      { genre: '20~30岁', sold: 200 },
      { genre: '40~50岁', sold: 100 },
      { genre: '60~70岁', sold: 40 },
      { genre: '80~90岁', sold: 30 },
    ];
    const dv = new DataView();
    const dv2 = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'sold',
      dimension: 'genre',
      as: 'percent',
    });

    dv2.source(data2).transform({
      type: 'percent',
      field: 'sold',
      dimension: 'genre',
      as: 'percent',
    });

    const cols = {
      percent: {
        formatter: (val) => {
          val = `${(val * 100).toFixed(2)}%`;
          return val;
        },
      },
    };

    return (
      <div className="pie-doughnut-chart">
        <Row wrap gutter="20">
          <Col xxs="24" s="24" l="12">
            <IceContainer title="性别占比" style={styles.leftContainer}>
              <Chart
                width={450}
                height={300}
                data={dv}
                scale={cols}
                padding={[0, 10, 30, 10]}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend position="bottom" offsetY={-60} />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom type="intervalStack" position="percent" color="genre" />
              </Chart>
            </IceContainer>
          </Col>
          <Col xxs="24" s="24" l="12">
            <IceContainer title="年龄分布" style={styles.rightContainer}>
              <Chart
                style={styles.chart}
                width={450}
                height={300}
                data={dv2}
                scale={cols}
                padding={[0, 10, 30, 10]}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend position="bottom" offsetY={-60} />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom type="intervalStack" position="percent" color="genre" />
              </Chart>
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {};
