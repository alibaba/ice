/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Button, DatePicker, Select, Input, Feedback } from '@icedesign/base';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      value: {},
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

  handleSubmit = () => {
    const { validateFields } = this.refs.form;
    validateFields((errors, values) => {
      if (errors) {
        Feedback.toast.error('查询参数错误');
        return;
      }
      console.log(values);
      this.props.handleSubmit(values);
    });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <FormBinderWrapper value={this.state.value} ref="form">
        <div style={styles.tableFilter}>
          <div style={styles.filterItem}>
            <span style={styles.filterLabel}>责任人：</span>
            <FormBinder name="person">
              <Input placeholder="请输入责任人" size="large" />
            </FormBinder>
          </div>
          <div style={styles.filterItem}>
            <span style={styles.filterLabel}>创建时间：</span>
            <FormBinder name="date">
              <div>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  value={startValue}
                  placeholder="Start"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                &nbsp;&nbsp;
                <DatePicker
                  size="large"
                  disabledDate={this.disabledEndDate}
                  value={endValue}
                  placeholder="End"
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              </div>
            </FormBinder>
          </div>
          <div style={styles.filterItem}>
            <span style={styles.filterLabel}>状态：</span>
            <FormBinder name="status">
              <Select size="large">
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="success">成功</Select.Option>
                <Select.Option value="failed">失败</Select.Option>
              </Select>
            </FormBinder>
          </div>
          <Button
            type="primary"
            size="large"
            style={styles.submitButton}
            onClick={this.handleSubmit}
          >
            查询
          </Button>
        </div>
      </FormBinderWrapper>
    );
  }
}

const styles = {
  tableFilter: {
    display: 'flex',
    background: '#f4f4f4',
    padding: '15px 0',
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
