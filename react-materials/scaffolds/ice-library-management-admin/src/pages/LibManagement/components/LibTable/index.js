/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import LibTable from './LibTable';
import BorrowTable from './BorrowTable';

const TabPane = Tab.Item;

const tabs = [
  { tab: '全部图书', key: '1', content: <LibTable /> },
  { tab: '借阅信息', key: '2', content: <BorrowTable /> },
];

export default class DonationForm extends Component {
  static displayName = 'DonationForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>图书管理</div>
        <Tab>
          {tabs.map((item) => {
            return (
              <TabPane key={item.key} title={item.tab}>
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
  title: {
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)',
  },
};
