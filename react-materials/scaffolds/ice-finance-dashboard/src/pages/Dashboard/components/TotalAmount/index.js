import React from 'react';
import { Chart, Geom, Coord, Tooltip, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';
import CountUp from 'react-countup';
import { Grid } from '@alifd/next';
import ColumnChart from '../ColumnChart';
import styles from './index.module.scss';

const { Row, Col } = Grid;

class TotalAmount extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: '事例一',
        count: 40,
      },
      {
        item: '事例二',
        count: 21,
      },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    return (
      <Row gutter="20" wrap className={styles.row}>
        <Col l="8">
          <Chart height={200} data={dv} scale={cols} padding={[10]} forceFit>
            <Coord type="theta" radius={0.9} innerRadius={0.7} />
            <Tooltip />
            <Guide>
              <Html
                position={['50%', '50%']}
                html='<div style="color:#fff;font-size:30px;text-align: center;font-weight: bold">65%</div>'
                alignX="middle"
                alignY="middle"
              />
            </Guide>
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                'item*percent',
                (item, percent) => {
                  percent = `${percent * 100}%`;
                  return {
                    name: item,
                    value: percent,
                  };
                },
              ]}
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
            />
          </Chart>
        </Col>
        <Col l="16">
          <div className={styles.title}>今日实时借贷总额</div>
          <div className={styles.value}>
            ￥ <CountUp start={0} end="123236309" />
          </div>
        </Col>
        <Col l="24">
          <ColumnChart height="200" color="#ee706d" />
        </Col>
      </Row>
    );
  }
}

export default TotalAmount;
