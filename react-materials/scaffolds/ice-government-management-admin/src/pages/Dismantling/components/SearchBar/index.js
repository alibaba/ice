import React, { Component } from 'react';
import { Input, Select, DatePicker, Button } from '@icedesign/base';

const { Option } = Select;

export default class SearchBar extends Component {
  static displayName = 'SearchBar';

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
            placeholder="浙高拆预"
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
        <span style={styles.date}>
          <label>
            立案日期:
            <DatePicker
              placeholder="Start"
              size="large"
              style={styles.shortInput}
            />
          </label>
        </span>
        <span>
          <Button size="large" style={styles.button}>
            查询
          </Button>
          <Button size="large" style={styles.button}>
            重置
          </Button>
          <Button size="large" style={styles.button}>
            新增案件
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
    width: '110px',
  },
  caseNumber: {
    marginRight: '16px',
  },
  date: {
    marginRight: '24px',
  },
  button: {
    margin: '0 4px',
    padding: '0 16px',
    letterSpacing: '2px',
  },
};
