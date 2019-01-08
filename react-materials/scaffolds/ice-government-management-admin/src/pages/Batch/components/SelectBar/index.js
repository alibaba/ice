import React, { Component } from 'react';
import { Icon } from '@alifd/next';

const mockData = [
  {
    icon: 'share',
    title: '批量操作(首次分案)',
    instrument: '对一批待分案案件进行分案',
  },
  {
    icon: 'process',
    title: '批量操作(普通阶段分案)',
    instrument: '对一批待分案案件进行分案',
  },
  {
    icon: 'history',
    title: '批量申请延期',
    instrument: '对一批办理案件进行批量申请延期',
  },
];

export default class SelectBar extends Component {
  static displayName = 'SelectBar';

  constructor(props) {
    super(props);

    this.state = {
      selectedCard: 0,
    };
  }

  handleCardClick = (index) => {
    this.setState({
      selectedCard: index,
    });
  };

  render() {
    return (
      <div style={styles.container}>
        {mockData.map((item, index) => {
          return (
            <div
              style={{
                ...styles.card,
                ...(this.state.selectedCard === index
                  ? styles.selectedCard
                  : styles.unselectedCard),
              }}
              key={index}
              onClick={() => this.handleCardClick(index)}
            >
              <h2
                style={
                  this.state.selectedCard === index
                    ? styles.selectedIcon
                    : styles.icon
                }
              >
                <Icon type={item.icon} size="xl" />
              </h2>
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
    margin: '0 40px',
    letterSpacing: '1px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    height: '120px',
    borderRadius: '10px',
    padding: '10px',
    cursor: 'pointer',
  },
  unselectedCard: {
    border: '1px solid #edeef0',
    backgroundColor: 'white',
    color: '#666',
  },
  selectedCard: {
    boxShadow: '2px 2px 10px 0 hsla(0, 0%, 40%, .3)',
    color: '#fff',
    background: '#5e83fb',
  },
  icon: {
    color: '#5e83fb',
    margin: '8px',
  },
  selectedIcon: {
    color: 'white',
    margin: '8px',
  },
  title: {
    fontSize: '14px',
    margin: '8px',
  },
  instrument: {
    fontSize: '12px',
    margin: '8px',
  },
};
