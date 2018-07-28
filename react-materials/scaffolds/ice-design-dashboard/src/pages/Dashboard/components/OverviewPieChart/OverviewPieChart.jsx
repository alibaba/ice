import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Coord } from 'bizcharts';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;
const mockData = [
  {
    chartData: [{ type: 'A', value: 20 }, { type: 'B', value: 80 }],
    title: 'Traffic',
    summary: 'News vs Returning',
  },
  {
    chartData: [{ type: 'A', value: 60 }, { type: 'B', value: 48 }],
    title: 'Revenue',
    summary: 'News vs Returning',
  },
  {
    chartData: [{ type: 'A', value: 90 }, { type: 'B', value: 10 }],
    title: 'Tradeing',
    summary: 'News vs Returning',
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
      <div style={styles.container}>
        <div />
        <h2 style={styles.head}>Overview</h2>
        <Row wrap>
          {mockData.map((item, index) => {
            return (
              <Col xxs="24" l="8" key={index}>
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
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  head: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '28px',
    fontWeight: 'normal',
    color: '#fff',
    borderBottom: '1px solid #434857',
  },
  content: {
    padding: '0 20px',
    textAlign: 'center',
  },
  title: {
    margin: '1px 0 0',
    color: '#999',
  },
  summary: {
    margin: '5px 0 0',
    fontWeight: '400',
    fontSize: '16px',
    color: '#fff',
  },
};
