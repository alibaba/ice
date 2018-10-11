import React, { Component } from 'react';
import { Icon } from '@icedesign/base';

const mockData = [
  {
    icon: 'share',
    title: '批量操作(首次分案)',
    instrument: '对一批待分案案件进行分案'
  }, {
    icon: 'process',
    title: '批量操作(首次分案)',
    instrument: '对一批待分案案件进行分案'
  }, {
    icon: 'history',
    title: '批量操作(首次分案)',
    instrument: '对一批待分案案件进行分案'
  }
];

export default class SelectBar extends Component {
  static displayName = 'SelectBar';

  render() {
    return (
      <div style={styles.container}>
        {mockData.map((item, index) => {
          return (
            <div style={styles.card} key={index}>
              <h2 style={styles.icon}><Icon type={item.icon} size="xl" /></h2>
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.instrument}>说明: {item.instrument}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 80px',
    letterSpacing: '1px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    background: 'linear-gradient(90deg, #0055f3 50%, #fff 150%)',
    width: '240px',
    height: '120px',
    borderRadius: '10px',
    color: 'white',
    padding: '10px',
    boxShadow: '2px 2px 10px 0 hsla(0,0%,40%,.3)'
  },
  icon: {
    color: 'white',
    margin: '8px'
  },
  title: {
    fontSize: '14px',
    margin: '8px'
  },
  instrument: {
    fontSize: '12px',
    margin: '8px'
  }
};
