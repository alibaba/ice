import React, { Component } from 'react';
import { Input } from '@alifd/next';
import IceContainer from '@icedesign/container';

export default class Filter extends Component {
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
