import React, { Component } from 'react';

export default class Title extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>某某电商销售数据大盘</h3>
      </div>
    );
  }
}
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: '#447eff',
    fontSize: '38px',
    fontWeight: 'bold',
    margin: '20px 0',
  },
};
