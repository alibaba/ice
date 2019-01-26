import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

const mockData = [
  {
    label: '分类',
    values: ['全部', '家电', '数码', '配件', '运动', '户外', '影视', '汽车'],
    selected: '全部',
  },
  {
    label: '风格',
    values: ['全部', '青春活力', '小清新', '美式休闲', '中国风'],
    selected: '全部',
  },
];

export default class Filter extends Component {
  static displayName = 'Filter';

  constructor(props) {
    super(props);
    this.state = {
      data: mockData,
    };
  }

  handleClick = (index, value) => {
    const { data } = this.state;
    data[index].selected = value;
    this.setState(
      {
        data,
      },
      () => {
        this.props.fetchData();
      }
    );
  };

  render() {
    const { data } = this.state;
    return (
      <IceContainer title="精确筛选">
        <div style={styles.filterContent}>
          {data.map((item, index) => {
            const lastItem = index === data.length - 1;
            const lastItemStyle = lastItem ? { marginBottom: 0 } : null;
            return (
              <div
                style={{ ...styles.filterItem, ...lastItemStyle }}
                key={index}
              >
                <div style={styles.filterLabel}>{item.label}:</div>
                <div style={styles.filterList}>
                  {item.values.map((value, idx) => {
                    const activeStyle =
                      item.selected === value ? styles.active : null;
                    return (
                      <span
                        onClick={() => this.handleClick(index, value)}
                        style={{ ...styles.filterText, ...activeStyle }}
                        key={idx}
                      >
                        {value}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  filterContent: {
    minWidth: '980px',
    overflowX: 'scroll',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    marginBottom: '20px',
  },
  filterLabel: {
    width: '60px',
    fontSize: '15px',
    fontWeight: '450',
  },
  filterText: {
    fontSize: '13px',
    marginRight: '15px',
    cursor: 'pointer',
    color: '#666',
  },
  active: {
    minWeight: '60px',
    borderRadius: '20px',
    padding: '5px 15px',
    background: '#2784fc',
    color: '#fff',
  },
};
