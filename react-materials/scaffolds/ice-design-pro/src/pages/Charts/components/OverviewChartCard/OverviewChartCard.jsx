import React, { Component } from 'react';
import { Grid, Progress } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Head from './Head';
import Field from './Field';
import Trend from './Trend';
import ColumnChart from './ColumnChart';

const { Row, Col } = Grid;

export default class OverviewChartCard extends Component {
  static displayName = 'OverviewChartCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        <Col xxs="24" l="6">
          <IceContainer>
            <Head title="总销售额" content="数据说明" total="¥ 126,560" />
            <Trend />
            <Field label="日均销售额" value="￥16,245" />
          </IceContainer>
        </Col>
        <Col xxs="24" l="6">
          <IceContainer>
            <Head title="访问量" content="数据说明" total="¥ 6,238" />
            <ColumnChart type="area" />
            <Field label="日访问量" value="2,365" />
          </IceContainer>
        </Col>
        <Col xxs="24" l="6">
          <IceContainer>
            <Head title="成交量" content="数据说明" total="9,653" />
            <ColumnChart />
            <Field label="转化率" value="58%" />
          </IceContainer>
        </Col>
        <Col xxs="24" l="6">
          <IceContainer>
            <Head title="完成比例" content="数据说明" total="51%" />
            <div
              style={{ height: '64px', display: 'flex', alignItems: 'center' }}
            >
              <Progress percent={51} />
            </div>
            <Trend style={styles.footer} />
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  footer: {
    height: '30px',
    paddingTop: '10px',
    marginTop: '10px',
    borderTop: '1px solid #e8e8e8',
  },
};
