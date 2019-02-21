import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Coord } from 'bizcharts';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { injectIntl } from 'react-intl';

const { Row, Col } = Grid;

@injectIntl
export default class OverviewPieChart extends Component {
  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const mockData = [
      {
        chartData: [
          { type: '分类一', value: 20 },
          { type: '分类二', value: 80 },
        ],
        title: formatMessage({ id: 'app.chart.basic.overview.share' }),
        summary: formatMessage({ id: 'app.chart.basic.overview.retai' }),
      },
      {
        chartData: [
          { type: '分类一', value: 50 },
          { type: '分类二', value: 50 },
        ],
        title: formatMessage({ id: 'app.chart.basic.overview.share' }),
        summary: formatMessage({ id: 'app.chart.basic.overview.physical' }),
      },
      {
        chartData: [
          { type: '分类一', value: 80 },
          { type: '分类二', value: 20 },
        ],
        title: formatMessage({ id: 'app.chart.basic.overview.share' }),
        summary: formatMessage({ id: 'app.chart.basic.overview.taobao' }),
      },
    ];
    return (
      <IceContainer
        title={formatMessage({ id: 'app.chart.basic.overview.title' })}
      >
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
                  <p style={styles.summary}>{item.summary}</p>
                  <h4 style={styles.title}>{item.title}</h4>
                </div>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  content: {
    padding: '0 20px',
    textAlign: 'center',
  },
  summary: {
    margin: '0 0 5px',
    color: '#999',
  },
  title: {
    margin: 0,
    fontWeigth: 400,
    color: '#333',
  },
};
