import React, { Component } from 'react';
import { Calendar } from '@alifd/next';

export default class WorkingCalendar extends Component {
  static displayName = 'WorkingCalendar';

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>个人工作指标</h4>
          <Calendar type="card" style={styles.calendar} />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '50%',
    boxSizing: 'border-box',
    padding: '10px',
  },
  card: {
    width: '100%',
    padding: '24px',
    color: '#44426e',
    fontSize: '16px',
    backgroundColor: 'white',
    borderRadius: '16px',
    height: '286px',
  },
  title: {
    margin: '0',
    borderLeft: '5px solid #447eff',
    paddingLeft: '10px',
    lineHeight: '20px',
    display: 'inline-block',
  },
  calendar: {
    marginTop: '-30px',
  },
};
