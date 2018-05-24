import React, { Component } from 'react';
import { Icon, Select } from '@icedesign/base';

const { Option } = Select;

export default class Header extends Component {
  render() {
    return (
      <div style={styles.topHeader}>
        <h3 style={styles.title}>
          <Icon type="electronics" size="small" style={styles.icon} /> 我的任务
        </h3>
        <Select placeholder="看板视图" style={{ width: '160px' }}>
          <Option value="dashboard">看板视图</Option>
          <Option value="priority">按处理优先级</Option>
          <Option value="project">按项目</Option>
          <Option value="Deadline">按截止日期</Option>
          <Option value="updateTime">按更新时间</Option>
          <Option value="finishTime">按完成时间</Option>
          <Option value="alltask">全部任务</Option>
        </Select>
      </div>
    );
  }
}

const styles = {
  topHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '13px 20px',
    background: '#fff',
    zIndex: '999',
  },
  title: {
    fontWeight: '500',
    margin: '0px',
  },
  icon: {
    marginRight: '5px',
  },
};
