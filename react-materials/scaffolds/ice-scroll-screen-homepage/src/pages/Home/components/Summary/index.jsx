import React from 'react';

const Summary = (props) => {
  return (
    <div key="summary" style={styles.summary}>
      <div style={styles.num}>{`0${props.num} _`}</div>
      <div style={styles.title}>{props.title}</div>
      <div style={styles.subtitle}>{props.subTitle}</div>
    </div>
  );
};

const styles = {
  summary: {
    marginRight: '100px',
    display: 'inline-block',
    float: 'left',
  },
  num: {
    fontSize: '64px',
    color: '#fff',
    lineHeight: '56px',
    marginBottom: '30px',
    fontWeight: '700',
  },
  title: {
    fontSize: '42px',
    color: '#fff',
    lineHeight: '42px',
    marginBottom: '15px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '20px',
    color: '#fff',
    lineHeight: '20px',
    marginBottom: '15px',
  },
};

export default Summary;
