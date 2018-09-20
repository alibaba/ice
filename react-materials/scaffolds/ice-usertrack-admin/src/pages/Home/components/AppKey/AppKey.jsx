import React, { Component } from 'react';
import { Tab, Button, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from './CustomTable';

const TabPane = Tab.TabPane;

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
  static displayName = 'AppKey';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTabExtraContent = () => {
    return (
      <Button type="primary" size="large" onClick={handleClick}>
        <Icon type="add" /> 新建 AppKey
      </Button>
    );
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <Tab
          onChange={handleChange}
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
    margin: '20px',
    padding: '10px 20px 20px',
  },
};
