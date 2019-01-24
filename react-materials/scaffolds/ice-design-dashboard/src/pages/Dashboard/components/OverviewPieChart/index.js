import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Coord } from 'bizcharts';
import { Grid } from '@alifd/next';
import ContainetCard from '../../../../components/ContainerCard';

const { Row, Col } = Grid;
const mockData = [
  {
    chartData: [{ type: 'A', value: 20 }, { type: 'B', value: 80 }],
    title: '杭州',
    summary: '网络销售',
  },
  {
    chartData: [{ type: 'A', value: 60 }, { type: 'B', value: 48 }],
    title: '上海',
    summary: '门店销售',
  },
  {
    chartData: [{ type: 'A', value: 90 }, { type: 'B', value: 10 }],
    title: '北京',
    summary: '新零售',
  },
];

export default class OverviewPieChart extends Component {
  static displayName = 'OverviewPieChart';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter="20">
        {mockData.map((item, index) => {
          return (
            <Col xxs="24" l="8" key={index}>
              <ContainetCard>
                <Chart height={200} data={item.chartData} forceFit padding={10}>
                  <Coord type="theta" innerRadius={0.75} />
                  <Tooltip showTitle={false} />
                  <Geom
                    type="intervalStack"
                    position="value"
                    color="type"
                    shape="sliceShape"
                  />
                </Chart>
                <div style={styles.content}>
                  <h4 style={styles.title}>{item.title}</h4>
                  <p style={styles.summary}>{item.summary}</p>
                </div>
              </ContainetCard>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  content: {
    padding: '0 20px',
    textAlign: 'center',
  },
  title: {
    margin: '10px 0',
    color: '#999',
  },
  summary: {
    margin: '5px 0 0',
    fontWeight: '400',
    fontSize: '16px',
    color: '#fff',
  },
};
