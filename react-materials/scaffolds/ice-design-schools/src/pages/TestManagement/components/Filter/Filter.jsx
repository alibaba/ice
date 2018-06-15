import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

const data = [
  {
    label: '专业',
    value: [
      '全部',
      '软件',
      '土木',
      '外语',
      '机械',
      '经济学',
      '管理学',
      '市场营销',
    ],
  },
  {
    label: '科目',
    value: ['全部', '英语', '数学', '材料力学', '机械原理'],
  },
];

export default class Filter extends Component {
  static displayName = 'Filter';

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleClick = (value) => {
    console.log(value);
  };

  render() {
    const { activeIndex } = this.state;
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
                  {item.value.map((text, idx) => {
                    const activeStyle =
                      activeIndex === idx ? styles.active : null;
                    return (
                      <span
                        onClick={() => this.handleClick(text)}
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
      </IceContainer>
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
    width: '60px',
    fontSize: '15px',
    fontWeight: '450',
  },
  filterText: {
    fontSize: '15px',
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
