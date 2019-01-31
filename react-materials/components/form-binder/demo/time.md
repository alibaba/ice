---
title: 时间类组件
order: 3
importStyle: true
---

时间类组件的 value 类型为 moment 对象，一般在提交服务器前需要预处理


````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { DatePicker, TimePicker, Button } from '@alifd/next';
import moment from 'moment';

moment.locale('zh-cn');

const { MonthPicker, RangePicker } = DatePicker;

class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        datePicker: '',
        dateTimePicker: '',
        monthPicker: '',
        rangePicker: [],
        rangeRimePicker: [],
        timePicker: '',
      }
    };
  }

  formChange = value => {
    // 说明：
    //  1. 表单是双向通行的，所有表单的响应数据都会同步更新 value
    //  2. 这里 setState 只是为了实时展示当前表单数据的演示使用
    this.setState({ value });
  };

  validateFields = () => {
    const { validateFields } = this.refs.form;

    validateFields((errors, values) => {
      console.log(errors, values)
    });
  }

  render() {
    const config = {
      required: true,
      message: "请选择",
    }

    const style = {
      width: '350px',
    }

    return (
      <div style={styles.container}>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.content}>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>日期选择：</span>
              <FormBinder name="datePicker" {...config}>
                <DatePicker format="YYYY-MM-DD" style={{...style}} />
              </FormBinder>
              <FormError style={styles.formItemError} name="datePicker" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>日期时间：</span>
              <FormBinder name="dateTimePicker" {...config}>
                <DatePicker showTime format="YYYY-MM-DD" style={{...style}} />
              </FormBinder>
              <FormError style={styles.formItemError} name="dateTimePicker" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>月份选择：</span>
              <FormBinder name="monthPicker" {...config}>
                <MonthPicker format="YYYY-MM" style={{...style}} />
              </FormBinder>
              <FormError style={styles.formItemError} name="monthPicker" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>区间选择：</span>
              <FormBinder name="rangePicker" {...config}>
                <RangePicker format="YYYY-MM-DD" style={{...style}} />
              </FormBinder>
              <FormError style={styles.formItemError} name="rangePicker" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>区间时间：</span>
              <FormBinder name="rangeRimePicker" {...config}>
                <RangePicker showTime format="YYYY-MM-DD" />
              </FormBinder>
              <FormError style={styles.formItemError} name="rangeRimePicker" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>时间选择：</span>
              <FormBinder name="timePicker" {...config}>
                <TimePicker format="HH:mm:ss" style={{...style}} />
              </FormBinder>
              <FormError style={styles.formItemError} name="timePicker" />
            </div>

            <Button type="primary" style={{marginLeft: '80px'}}  onClick={this.validateFields}>
              确 认
            </Button>
          </div>
        </FormBinderWrapper>

        <div style={styles.preview}>
          <strong>当前表单数据</strong>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </div>

      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '20px'
  },
  formItemLabel: {
    marginRight: '10px',
  },
  formItemError: {
    marginLeft: '10px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10
  }
}

ReactDOM.render(<Time />, mountNode);
````
