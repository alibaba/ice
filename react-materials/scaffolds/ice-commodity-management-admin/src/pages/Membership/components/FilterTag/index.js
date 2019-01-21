import React, { Component } from 'react';

const MOCK_DATA = [
  {
    selected: '全部',
    label: '消费频次',
    value: ['全部', '1月未消费', '2月未消费', '3月未消费', '4月未消费'],
  },
  {
    selected: '全部',
    label: '消费次数',
    value: ['全部', '1次以内', '2次以内', '3次以内', '4次以上'],
  },
  {
    selected: '全部',
    label: '会员等级',
    value: ['全部', '普通会员', '白银会员', '黄金会员', 'VIP 会员'],
  },
  {
    selected: '全部',
    label: '会员来源',
    value: ['全部', '线上顾客', '线下顾客', '广告引流', '未知来源'],
  },
];

export default class FilterTag extends Component {
  state = {
    data: MOCK_DATA,
  };

  handleClick = (value, index) => {
    const { data } = this.state;
    data[index].selected = value;
    this.setState(
      {
        data,
      },
      () => {
        this.props.onChange();
      }
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div style={styles.filterContent}>
        {data.map((item, index) => {
          const lastItem = index === data.length - 1;
          const lastItemStyle = lastItem ? { marginBottom: 10 } : null;
          return (
            <div style={{ ...styles.filterItem, ...lastItemStyle }} key={index}>
              <div style={styles.filterLabel}>{item.label}:</div>
              <div style={styles.filterList}>
                {item.value.map((text, idx) => {
                  const activeStyle =
                    item.selected === text ? styles.active : null;
                  return (
                    <span
                      onClick={() => this.handleClick(text, index)}
                      style={{ ...styles.filterText, ...activeStyle }}
                      key={idx}
                    >
                      {text}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = {
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    marginBottom: '20px',
  },
  filterLabel: {
    width: '80px',
    fontSize: '14px',
  },
  filterText: {
    fontSize: '12px',
    marginRight: '15px',
    cursor: 'pointer',
  },
  active: {
    minWeight: '60px',
    borderRadius: '20px',
    padding: '5px 15px',
    background: '#2784fc',
    color: '#fff',
  },
};
