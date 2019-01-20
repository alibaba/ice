import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './BasicTab.scss';

export default class BasicTab extends Component {
  static displayName = 'BasicTab';

  render() {
    const tabs = [
      { tab: '概况', key: 'dashboard' },
      { tab: '分析页', key: 'analysis' },
      { tab: '监控页', key: 'monitor' },
      { tab: '工作台', key: 'workplace' },
    ];

    return (
      <div className="basic-tab">
        <IceContainer style={styles.tabCardStyle}>
          <Tab contentStyle={{ display: 'none' }}>
            {tabs.map((item) => {
              return <Tab.Item key={item.key} title={item.tab} />;
            })}
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
