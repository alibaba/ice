import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select } from '@alifd/next';
import CustomTable from './CustomTable';
import './index.scss';

export default class DepartmentCost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'all',
    };
  }

  changeType = (type) => {
    this.setState({
      type,
    });
  }

  render() {
    const { type } = this.state;
    return (
      <IceContainer style={styles.container} className="department-cost">
        <div style={styles.titleContainer}>
          <div style={styles.title}>部门费用总览</div>
          <Select onChange={this.changeType} value={type} size="small">
            {
              ['all', 'cost'].map((item) => {
                return <Select.Option value={item} key={item}>{item}</Select.Option>;
              })
            }
          </Select>
        </div>
        <div style={styles.content}>
          <CustomTable />
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  titleContainer: {
    padding: '0 20px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(240, 240, 240)',
  },
  title: {
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
  content: {
    padding: '15px',
  },
};
