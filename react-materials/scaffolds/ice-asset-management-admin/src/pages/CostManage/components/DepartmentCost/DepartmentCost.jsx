import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import CustomTable from './CustomTable';
import './DepartmentCost.scss';

const TabPane = Tab.TabPane;

export default class DepartmentCost extends Component {
  static displayName = 'DepartmentCost';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container} className="department-cost">
        <h4 style={styles.title}>部门费用总览</h4>
        <Tab type="text" size="small">
          <TabPane tab="总费用" key="1">
            <CustomTable />
          </TabPane>
          <TabPane tab="计算费用" key="2">
            <CustomTable />
          </TabPane>
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
};
