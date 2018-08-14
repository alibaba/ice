import React, { Component } from 'react';
import { Progress } from '@icedesign/base';

class HotItem extends Component {
  render() {
    return (
      <div style={styles.item}>
        <span style={styles.index}>1</span>
        <span style={styles.keyword}>内裤女</span>
        <Progress style={{ width: 60 }} percent={50} showInfo={false} />
        <span style={styles.total}>1231</span>
        <span style={styles.link}>解读</span>
      </div>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  index: {
    width: 22,
    height: 22,
    border: '2px solid #eee',
    color: '#fff',
    lineHeight: '18px',
    textAlign: 'center',
    borderRadius: 11,
    backgroundColor: '#c6c6c6',
    marginRight: 10,
  },
  keyword: {
    flex: 'auto',
  },
  total: {
    paddingLeft: 10,
  },
  link: {
    paddingLeft: 10,
  },
};

export default HotItem;
