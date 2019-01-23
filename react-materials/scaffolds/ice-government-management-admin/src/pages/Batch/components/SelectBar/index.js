import React, { Component } from 'react';
import { Icon } from '@alifd/next';
import cx from 'classnames';
import styles from './index.module.scss';

const mockData = [
  {
    icon: 'success',
    title: '批量操作(首次分案)',
    instrument: '对一批待分案案件进行分案',
  },
  {
    icon: 'refresh',
    title: '批量操作(普通阶段分案)',
    instrument: '对一批待分案案件进行分案',
  },
  {
    icon: 'upload',
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
      <div className={styles.container}>
        {mockData.map((item, index) => {
          return (
            <div
              className={cx(
                styles.card,
                this.state.selectedCard === index
                  ? styles.selectedCard
                  : styles.unselectedCard
              )}
              key={index}
              onClick={() => this.handleCardClick(index)}
            >
              <h2
                className={
                  this.state.selectedCard === index
                    ? styles.selectedIcon
                    : styles.icon
                }
              >
                <Icon type={item.icon} size="large" />
              </h2>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.instrument}>说明: {item.instrument}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
