import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import AssetTable from './AssetTable';

const detachedContentStyle = {
  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,
};

export default class Asset extends Component {
  render() {
    const panes = [
      {
        tab: '提现',
        key: 0,
        content: <AssetTable />,
      },
      {
        tab: '退款',
        key: 1,
        content: <AssetTable />,
      },
    ];

    return (
      <IceContainer>
        <Tab size="small" contentStyle={detachedContentStyle}>
          {panes.map((pane) => {
            return (
              <Tab.Item title={pane.tab} key={pane.key}>
                {pane.content}
              </Tab.Item>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}
