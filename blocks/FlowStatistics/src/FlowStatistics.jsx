import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import { Tab, Grid } from '@icedesign/base';
import AreaChart from './AreaChart';
import Head from './Head';
import './FlowStatistics.scss';

const TabPane = Tab.TabPane;

const MOCK_DATA = {
  threeMonths: {
    visits: '4,677',
    unique_users: '3,621',
    ip: '5,690',
    click: '6,583',
  },
  halfYear: {
    visits: '6,688',
    unique_users: '8,339',
    ip: '7,989',
    click: '9,832',
  },
  nearlyYear: {
    visits: '10,323',
    unique_users: '9,262',
    ip: '12,639',
    click: '26,386',
  },
};
export default class FlowStatistics extends Component {
  static displayName = 'FlowStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flow-statistics">
        <IceContainer>
          <h4 style={styles.title}>流量统计</h4>
          <Tab type="text" size="small">
            <TabPane tab="近三个月" key="1">
              <Head data={MOCK_DATA.threeMonths} />
              <AreaChart />
            </TabPane>
            <TabPane tab="近半年" key="2">
              <Head data={MOCK_DATA.halfYear} />
              <AreaChart />
            </TabPane>
            <TabPane tab="近一年" key="3">
              <Head data={MOCK_DATA.nearlyYear} />
              <AreaChart />
            </TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
