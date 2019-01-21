import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Progress } from '@alifd/next';

export default class Structure extends Component {
  render() {
    return (
      <IceContainer title="男女比例">
        <div style={{ ...styles.item, ...styles.space }}>
          <h5 style={styles.title}>男</h5>
          <Progress size="large" percent={70} shape="circle" />
        </div>
        <div style={styles.item}>
          <h5 style={styles.title}>女</h5>
          <Progress size="large" percent={30} state="error" shape="circle" />
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  space: {
    paddingBottom: '32px',
    marginBottom: '32px',
    borderBottom: '1px solid #eee',
  },
  title: {
    margin: '0 0 10px',
    fontSize: '16px',
    color: '#666',
  },
};
