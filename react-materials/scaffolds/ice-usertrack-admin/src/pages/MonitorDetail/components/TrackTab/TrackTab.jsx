import React, { Component } from 'react';
import { Tab, DatePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Track from './Track';
import Scheme from './Scheme';

const TabPane = Tab.Item;

const tabs = [
  { tab: '埋点维度', key: 'track', content: <Track /> },
  { tab: '方案维度', key: 'scheme', content: <Scheme /> },
];

function handleChange(key) {
  console.log('change', key);
}

function handleClick(key) {
  console.log('click', key);
}

export default class TrackTab extends Component {
  renderTabExtraContent = () => {
    return <DatePicker style={{ marginRight: '20px' }} />;
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <Tab
          onChange={handleChange}
          extra={this.renderTabExtraContent()}
        >
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
    padding: '10px 0',
  },
};
