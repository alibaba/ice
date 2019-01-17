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
        <div style={styles.title}>搜索验证方案:</div>
        <Input
          placeholder="请输入验证方案"
          hasClear
          onChange={this.onChange}
          size="large"
          style={{ width: '300px' }}
        />
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)',
  },
  button: {
    marginLeft: '20px',
  },
};
