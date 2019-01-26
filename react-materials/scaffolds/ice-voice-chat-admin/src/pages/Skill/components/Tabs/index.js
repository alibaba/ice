import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import SmallCard from './../../../../components/SmallCard';

const TabPane = Tab.Item;

export default class Tabs extends Component {
  static displayName = 'Tabs';

  state = {
    data: this.props.data,
  };

  handleTab = (item) => {
    let newData = [];
    if (item.tab === '自建' || item.tab === '共享') {
      newData.push(this.props.data[0]);
    } else if (item.tab === '预置') {
      newData.push(this.props.data[1]);
    } else {
      newData = this.props.data;
    }

    this.setState({
      data: newData,
    });
  };

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
          <TabPane
            key={index}
            title={item.tab}
            onClick={() => {
              this.handleTab(item);
            }}
          >
            <SmallCard tab={item.tab} data={this.state.data} />
          </TabPane>
        ))}
      </Tab>
    );
  }
}
