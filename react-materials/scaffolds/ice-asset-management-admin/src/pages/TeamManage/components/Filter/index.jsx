import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select, DatePicker } from '@alifd/next';

export default class Filter extends Component {
  /**
   * Select 发生改变的时候触发的回调
   */
  handleSelectChange = (value) => {
    console.log('handleSelectChange:', value);
  };

  /**
   * DatePicker 发生改变的时候触发的回调
   */
  handleDatePickerChange = (value) => {
    console.log('handleDatePickerChange:', value);
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <Select
          style={{ width: '200px' }}
          onChange={this.handleSelectChange}
          defaultValue="frontend"
        >
          <Select.Option value="frontend">前端团队</Select.Option>
          <Select.Option value="backend">后端团队</Select.Option>
          <Select.Option value="business">业务团队</Select.Option>
          <Select.Option value="operation">运营团队</Select.Option>
        </Select>
        <DatePicker onChange={this.handleDatePickerChange} />
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
