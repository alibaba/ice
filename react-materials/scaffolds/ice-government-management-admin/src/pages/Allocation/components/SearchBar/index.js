import React, { Component } from 'react';
import { Input, Select, Button, Feedback } from '@icedesign/base';

const { Option } = Select;

export default class SearchBar extends Component {
  handleClick = () => {
    Feedback.toast.success('未搜索到符合添加的数据');
  };

  render() {
    return (
      <div style={styles.container}>
        <span style={styles.caseNumber}>
          <label>
            案号: (
            <Input
              style={{ ...styles.input, ...styles.shortInput }}
              size="large"
            />
            )
          </label>
          <Select
            placeholder="浙执"
            style={{ ...styles.select, ...styles.input }}
            size="large"
          >
            <Option value="small">浙执1</Option>
            <Option value="medium">浙执2</Option>
            <Option value="large">浙执3</Option>
          </Select>
          字第
          <Input
            style={{ ...styles.input, ...styles.shortInput }}
            size="large"
          />
          号
        </span>
        <span>
          <Button
            size="large"
            type="primary"
            style={styles.button}
            onClick={this.handleClick}
          >
            查询
          </Button>
        </span>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
    letterSpacing: '2px',
  },
  input: {
    margin: '0 4px',
  },
  select: {
    verticalAlign: 'middle',
    width: '200px',
  },
  shortInput: {
    width: '100px',
  },
  caseNumber: {
    marginRight: '20px',
  },
  button: {
    margin: '0 8px',
    letterSpacing: '2px',
  },
};
