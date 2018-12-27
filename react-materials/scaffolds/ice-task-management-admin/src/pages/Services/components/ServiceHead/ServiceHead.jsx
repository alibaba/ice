import React, { Component } from 'react';
import { Button, Dialog } from '@icedesign/base';

export default class ServiceHead extends Component {
  handleClick = () => {
    Dialog.confirm({
      content: '暂不支持切换管理功能',
    });
  };

  render() {
    return (
      <div style={styles.head}>
        <Button
          size="large"
          style={{ marginRight: '10px' }}
          onClick={this.handleClick}
        >
          服务管理
        </Button>
        <Button size="large" type="primary" onClick={this.handleClick}>
          授权管理
        </Button>
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
