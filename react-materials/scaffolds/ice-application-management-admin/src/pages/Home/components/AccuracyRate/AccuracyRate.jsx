import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Progress, Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class AccuracyRate extends Component {
  static displayName = 'AccuracyRate';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="无人值守准确率" className="circle-progress">
        <Row wrap align="center" style={{ height: '200px' }}>
          <Col l="12">
            <div style={styles.chart}>
              <Progress
                percent={100}
                shape="circle"
                size="large"
              />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.list}>
              <div style={styles.item}>
                <span style={styles.label}>准确率</span>
                <span style={styles.number}>100%</span>
              </div>
              <div style={styles.item}>
                <span style={styles.label}>召回率</span>
                <span style={styles.number}>100%</span>
              </div>
              <div style={styles.item}>
                <span style={styles.label}>周环比</span>
                <span style={styles.number}>0%</span>
              </div>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  chart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  progress: {
    backgroundColor: '#ccc',
  },
  title: {
    marginTop: 20,
  },
  list: {
    paddingLeft: '15px',
  },
  item: {
    lineHeight: 1.5,
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    minWidth: '80px',
    display: 'inline-block',
    marginRight: '10px',
    color: '$color-text1-3',
  },
  number: {
    fontSize: '18px',
    color: '#333333',
    fontWeight: '500',
  },
};
