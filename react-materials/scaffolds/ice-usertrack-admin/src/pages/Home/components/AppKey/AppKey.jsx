import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CustomTable from './CustomTable';

const TabPane = Tab.Item;

const tabs = [
  { tab: '全部 AppKey', key: 'all', content: <CustomTable /> },
  { tab: '我的 AppKey', key: 'my', content: <CustomTable /> },
];

function handleChange(key) {
  console.log('change', key);
}

function handleClick(key) {
  console.log('click', key);
}

export default class AppKey extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <Tab onChange={handleChange}>
          {tabs.map((item) => {
            return (
              <TabPane key={item.key} title={item.tab} onClick={handleClick}>
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
    margin: '20px',
    padding: '10px 20px 20px',
  },
};
