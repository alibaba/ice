import React, { Component } from 'react';
import addIcon from './images/add.svg';
import pcIcon from './images/pc.svg';
import targetIcon from './images/target.svg';
import uploadIcon from './images/uploading.svg';

const mockData = [
  {
    icon: addIcon,
    title: '预检后收案登记',
    count: 12,
    instrument: '对材料预检登记案件进行收案登记',
    leftColor: '#61bcfd',
    rightColor: '#1a8bfe'
  }, {
    icon: addIcon,
    title: '预检后收案登记',
    count: 12,
    instrument: '对材料预检登记案件进行收案登记',
    leftColor: '#61bcfd',
    rightColor: '#1a8bfe'
  }, {
    icon: addIcon,
    title: '预检后收案登记',
    count: 12,
    instrument: '对材料预检登记案件进行收案登记',
    leftColor: '#61bcfd',
    rightColor: '#1a8bfe'
  }, {
    icon: addIcon,
    title: '预检后收案登记',
    count: 12,
    instrument: '对材料预检登记案件进行收案登记',
    leftColor: '#61bcfd',
    rightColor: '#1a8bfe'
  }
];

export default class CountBar extends Component {
  static displayName = 'CountBar';

  render() {
    return (
      <div style={styles.container}>
        {mockData.map((item, index) => {
          return (
            <div style={styles.counter} key={index}>
              <div style={styles.card}>
                <div style={{backgroundColor: item.leftColor, ...styles.cardLeft}}>
                  <img src={item.icon} style={styles.icon} />
                </div>
                <div style={{background: 'linear-gradient(270deg, ' + item.rightColor + ' 50%, #fff 150%)', ...styles.cardRight}}>
                  <h3 style={styles.countTitle}>{item.title}</h3>
                  <span>{item.count}</span>
                </div>
              </div>
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
    margin: '20px',
    letterSpacing: '2px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  counter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '200px',
    height: '80px',
    borderRadius: '10px',
    color: 'white',
    display: 'flex',
    overflow: 'hidden'
  },
  cardLeft: {
    lineHeight: '80px',
    height: '80px',
    flex: '3',
    textAlign: 'center'
  },
  icon: {
    width: '30px',
    height: '30px',
    verticalAlign: 'middle'
  },
  cardRight: {
    textAlign: 'right',
    fontSize: '36px',
    padding: '10px',
    height: '80px',
    flex: '7'
  },
  countTitle: {
    fontSize: '12px',
    textAlign: 'right',
    margin: '0'
  },
  instrument: {
    textAlign: 'center',
    fontSize: '12px'
  }
};
