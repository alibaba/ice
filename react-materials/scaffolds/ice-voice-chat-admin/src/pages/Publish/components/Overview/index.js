import React, { Component } from 'react';
import { Icon } from '@alifd/next';

export default class Overview extends Component {
  static displayName = 'Overview';

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.item}>
          <div
            style={{
              ...styles.itemBox,
              ...styles.IconBox,
              background: '#2091fc',
            }}
          >
            <Icon type="electronics" />
          </div>
          <div style={styles.itemBox}>
            <p style={styles.itemLabel}>技能</p>
            <h5 style={styles.itemValue}>3</h5>
          </div>
          <div style={styles.itemBox}>
            <p style={styles.itemLabel}>意图</p>
            <h5 style={styles.itemValue}>0</h5>
          </div>
        </div>
        <div style={styles.item}>
          <div
            style={{
              ...styles.itemBox,
              ...styles.IconBox,
              background: '#7eccbe',
            }}
          >
            <Icon type="category" />
          </div>
          <div style={styles.itemBox}>
            <p style={styles.itemLabel}>知识库</p>
            <h5 style={styles.itemValue}>2</h5>
          </div>
          <div style={styles.itemBox}>
            <p style={styles.itemLabel}>知识点</p>
            <h5 style={styles.itemValue}>8</h5>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-between',
  },
  item: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  IconBox: {
    width: '56px',
    height: '56px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '100%',
    color: '#fff',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.5)',
    margin: '3px 0px 10px',
  },
  itemValue: {
    margin: '0',
    fontSize: '24px',
    color: 'rgba(0, 0, 0, 0.8)',
  },
};
