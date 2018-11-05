import React, { Component } from 'react';
import { Tab } from '@icedesign/base';
import SmallCard from './../../../../components/SmallCard';

const TabPane = Tab.TabPane;
const cardsData = [
  {
    name: 'joke',
    desc: '笑话',
    tag: '预置',
  },
  {
    name: 'weather',
    desc: '天气',
    tag: '预置',
  },
];

export default class Tabs extends Component {
  static displayName = 'Tabs';

  render() {
    const Panes = [
      {
        tab: '全部（2）',
      },
      {
        tab: '自建',
      },
      {
        tab: '预置',
      },
      {
        tab: '共享',
      },
    ];
    return (
      <Tab>
        {Panes.map((item, index) => (
          <TabPane key={index} tab={item.tab}>
            <SmallCard tab={item.tab} data={cardsData} />
          </TabPane>
        ))}
      </Tab>
    );
  }
}
