import React, { Component } from 'react';
import { Grid, Input } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class Filter extends Component {
  onChange = (value) => {
    if (!value) {
      return;
    }
    this.props.onChange(value);
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <Row style={styles.row}>
          <Col l="2">
            <div style={styles.label}>方案名称:</div>
          </Col>
          <Col>
            <Input
              placeholder="请输入方案名称"
              hasClear
              onChange={this.onChange}

            />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
  },
  button: {
    marginLeft: '20px',
  },
};
