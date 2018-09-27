import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

const mockData = [
  {
    text: '转移',
    src: 'https://ase.alibaba-inc.com/dist/Group14.png',
  },
  {
    text: '借用',
    src: 'https://ase.alibaba-inc.com/dist/Group15.png',
  },
  {
    text: '追加',
    src: 'https://ase.alibaba-inc.com/dist/Group16.png',
  },
];

export default class BudgetCard extends Component {
  static displayName = 'BudgetCard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title = '预算操作' } = this.props;
    return (
      <IceContainer title={title}>
        <ul style={styles.items}>
          {mockData.map((item, index) => {
            return (
              <li key={index} style={styles.item}>
                <img src={item.src} alt="" style={styles.itemImg} />
                <div style={styles.itemText}>{item.text}</div>
              </li>
            );
          })}
        </ul>
      </IceContainer>
    );
  }
}

const styles = {
  items: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0',
    textAlign: 'center',
  },
  itemImg: {
    width: '60px',
  },
  itemText: {
    fontSize: '14px',
    marginTop: '10px',
  },
};
