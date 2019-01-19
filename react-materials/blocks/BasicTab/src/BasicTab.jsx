import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';

export default class BasicTab extends Component {
  static displayName = 'BasicTab';

  render() {
    const tabs = [
      { tab: '订阅号概览', key: 'guide' },
      { tab: '订阅号推送', key: 'push' },
      { tab: '互动消息', key: 'message' },
      { tab: '自动回复设置', key: 'autoreply' },
    ];

    return (
      <div className="basic-tab">
        <IceContainer style={styles.tabCardStyle}>
          <Tab contentStyle={{ display: 'none' }}>
            {tabs.map((item) => <Tab.Item key={item.key} title={item.tab} />)}
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  tabCardStyle: {
    padding: 0,
  },
};
