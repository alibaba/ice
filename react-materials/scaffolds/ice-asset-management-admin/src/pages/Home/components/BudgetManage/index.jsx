import React, { Component } from 'react';
import { Tab, DatePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Calculate from './Calculate';
import Memory from './Memory';

const tabs = [
  { tab: '计算配额', key: 'calculate', content: <Calculate /> },
  { tab: '存储配额', key: 'memory', content: <Memory /> },
];

function handleChange(key) {
  console.log('change', key);
}

function handleClick(key) {
  console.log('click', key);
}

export default class BudgetManage extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <Tab
          onChange={handleChange}
          navStyle={styles.tabHead}
        >
          {tabs.map((item) => {
            return (
              <Tab.Item
                key={item.key}
                title={item.tab}
                onClick={handleClick}
              >
                {item.content}
              </Tab.Item>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  tabHead: {
    fontWeight: '500',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  tabExtra: {
    // display: 'flex',
    // alignItems: 'center',
  },
};
