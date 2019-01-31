import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select, DatePicker } from '@alifd/next';

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

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
          defaultValue="taobao"
        >
          <Select.Option value="taobao">淘宝技术部</Select.Option>
          <Select.Option value="aliyun">阿里云事业部</Select.Option>
          <Select.Option value="dingding">钉钉事业部</Select.Option>
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
