import React, { Component } from 'react';
import { Button, Dialog } from '@alifd/next';

export default class ServiceHead extends Component {
  handleClick = () => {
    Dialog.confirm({
      content: '只有管理员才能操作',
    });
  };

  render() {
    return (
      <div style={styles.head}>
        <Button
          style={{ marginRight: '10px' }}
          onClick={this.handleClick}
        >
          项目管理
        </Button>
        <Button type="primary" onClick={this.handleClick}>
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
