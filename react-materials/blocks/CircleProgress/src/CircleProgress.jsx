import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Progress, Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class CircleProgress extends Component {
  static displayName = 'CircleProgress';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="项目进度">
        <Row wrap>
          <Col xxs="12" s="6" l="6">
            <div style={styles.item}>
              <Progress
                percent={10}
                shape="circle"
                state="error"
                size="large"
              />
              <h6 style={styles.title}>项目A</h6>
            </div>
          </Col>
          <Col xxs="12" s="6" l="6">
            <div style={styles.item}>
              <Progress percent={50} shape="circle" size="large" />
              <h6 style={styles.title}>项目B</h6>
            </div>
          </Col>
          <Col xxs="12" s="6" l="6">
            <div style={styles.item}>
              <Progress percent={50} shape="circle" size="large" />
              <h6 style={styles.title}>项目C</h6>
            </div>
          </Col>
          <Col xxs="12" s="6" l="6">
            <div style={styles.item}>
              <Progress
                percent={100}
                shape="circle"
                state="success"
                size="large"
              />
              <h6 style={styles.title}>项目D</h6>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: 20,
  },
};
