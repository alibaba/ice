import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import CustomTable from './CustomTable';
import './index.scss';

export default class DepartmentCost extends Component {
  render() {
    return (
      <IceContainer style={styles.container} className="department-cost">
        <h4 style={styles.title}>部门费用总览</h4>
        <Tab shape="text" size="small">
          <Tab.Item title="总费用" key="1">
            <CustomTable />
          </Tab.Item>
          <Tab.Item title="计算费用" key="2">
            <CustomTable />
          </Tab.Item>
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
