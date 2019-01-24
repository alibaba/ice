import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

// MOCK 数据，实际业务按需进行替换
const mockData = [
  {
    name: '任务数',
    value: '3,456',
  },
  {
    name: '表数',
    value: '23,789',
  },
  {
    name: '应用数',
    value: '678',
  },
  {
    name: '开发者',
    value: '18',
  },
];

export default class Overview extends Component {
  static displayName = 'Overview';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <Row>
          {mockData.map((item, index) => {
            return (
              <Col l="6" key={index}>
                <div style={styles.box}>
                  <div style={styles.name}>{item.name}</div>
                  <div style={styles.value}>{item.value}</div>
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
  name: {
    color: '#666',
    lineHeight: '14px',
    fontSize: '14px',
  },
  value: {
    color: '#333',
    fontWeight: '500',
    fontSize: '22px',
    lineHeight: '30px',
    marginTop: '8px',
  },
};
