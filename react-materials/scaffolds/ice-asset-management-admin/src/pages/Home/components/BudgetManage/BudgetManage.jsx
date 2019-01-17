import React, { Component } from 'react';
import { Tab, DatePicker } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Calculate from './Calculate';
import Memory from './Memory';

const TabPane = Tab.TabPane;

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
  renderTabExtraContent = () => {
    return <DatePicker size="large" style={{ marginRight: '20px' }} />;
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <Tab
          onChange={handleChange}
          navStyle={styles.tabHead}
          tabBarExtraContent={this.renderTabExtraContent()}
        >
          {tabs.map((item) => {
            return (
              <TabPane key={item.key} tab={item.tab} onClick={handleClick}>
                {item.content}
              </TabPane>
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
};
