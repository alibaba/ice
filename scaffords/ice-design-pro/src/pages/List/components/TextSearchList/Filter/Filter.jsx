import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.category}>
          <span style={styles.label}>所属类目：</span>
          <span style={styles.item}>全部</span>
          <span style={styles.item}>类目一</span>
          <span style={styles.item}>类目二</span>
          <span style={styles.item}>类目三</span>
          <span style={styles.item}>类目四</span>
        </div>
        <div style={styles.others}>
          <span style={styles.label}>其它筛选：</span>
          <span style={styles.item}>全部</span>
          <span style={styles.item}>类目一</span>
          <span style={styles.item}>类目二</span>
          <span style={styles.item}>类目三</span>
          <span style={styles.item}>类目四</span>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {},
  category: {
    padding: '0 10px 15px',
    borderBottom: '1px solid #eee',
  },
  others: {
    padding: '15px 10px 0',
  },
  label: {
    color: '#333',
    fontSize: '14px',
    marginRight: '10px',
  },
  item: {
    marginRight: '10px',
  },
};
