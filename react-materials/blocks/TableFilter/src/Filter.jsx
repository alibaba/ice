import React, { Component } from 'react';
import { Button, DatePicker, Select } from '@alifd/next';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  }

  disabledStartDate = (startValue) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div style={styles.tableFilter}>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>调价日期：</span>
          <DatePicker
            disabledDate={this.disabledStartDate}
            value={startValue}
            placeholder="Start"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          &nbsp;&nbsp;
          <DatePicker
            disabledDate={this.disabledEndDate}
            value={endValue}
            placeholder="End"
            onChange={this.onEndChange}
            visible={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
        </div>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>状态：</span>
          <Select>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="checked">已审核</Select.Option>
            <Select.Option value="unCheck">未审核</Select.Option>
          </Select>
        </div>
        <Button type="primary" style={styles.submitButton}>
          查询
        </Button>
      </div>
    );
  }
}

const styles = {
  tableFilter: {
    display: 'flex',
    background: '#fff',
    padding: '20px 0',
    marginBottom: '20px',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '15px',
  },
  submitButton: {
    marginLeft: '15px',
  },
};
