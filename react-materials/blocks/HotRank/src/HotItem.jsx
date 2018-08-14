import React, { Component } from 'react';
import { Progress } from '@icedesign/base';
import './hot-item.scss';

class HotItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <a className="hot-rank-item" href={data.url} style={styles.item}>
        <span style={styles.index}>{data.index}</span>
        <span style={styles.keyword}>{data.keyword}</span>
        <Progress
          type="progressive"
          style={{ width: 60 }}
          percent={data.percent}
          showInfo={false}
        />
        <span style={styles.total}>{data.total}</span>
        <span style={styles.link}>解读</span>
      </a>
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
    minWidth: 22,
    height: 22,
    padding: '0 4px',
    border: '2px solid #eee',
    color: '#fff',
    lineHeight: '18px',
    textAlign: 'center',
    borderRadius: 11,
    backgroundColor: '#c6c6c6',
    marginRight: 10,
    fontSize: 12,
  },
  keyword: {
    fontSize: 14,
    flex: 'auto',
  },
  total: {
    fontSize: 12,
    paddingLeft: 10,
    width: 40,
  },
  link: {
    fontSize: 12,
    paddingLeft: 10,
  },
};

export default HotItem;
