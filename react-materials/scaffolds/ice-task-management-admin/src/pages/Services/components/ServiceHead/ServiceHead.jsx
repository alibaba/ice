import React, { Component } from 'react';
import { Button } from '@icedesign/base';

export default class ServiceHead extends Component {
  static displayName = 'ServiceHead';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.head}>
        <Button size="large" style={{ marginRight: '10px' }}>
          服务管理
        </Button>
        <Button size="large">授权管理</Button>
      </div>
    );
  }
}

const styles = {
  head: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
