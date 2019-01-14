import React, { Component } from 'react';
import { Grid, Input, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (value) => {
    console.log({ value });
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
              size="large"
            />
            <Button type="primary" size="large" style={styles.button}>
              查 询
            </Button>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px 10px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    fontWeight: '500',
  },
  button: {
    marginLeft: '20px',
  },
};
