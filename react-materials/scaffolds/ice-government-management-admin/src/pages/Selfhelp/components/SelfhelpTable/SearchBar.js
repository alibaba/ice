import React, { Component } from 'react';
import { Input, Select, DatePicker, Button } from '@icedesign/base';

export default class SearchBar extends Component {
  static displayName = 'SearchBar';

  render() {
    return (
      <div style={styles.container}>
        <span style={styles.caseNumber}>
          <label>
            案号: (
            <Input
              style={{...styles.input, ...styles.shortInput}}
              size="large"
            />
            )
          </label>
          <Select
            placeholder="浙高拆预"
            style={{...styles.select, ...styles.input}}
            size="large"
          >
            <Option value="浙执1">浙执1</Option>
            <Option value="浙执2">浙执2</Option>
            <Option value="浙执3">浙执3</Option>
          </Select>
          字第
          <Input
            style={{...styles.input, ...styles.shortInput}}
            size="large"
          />
          号
        </span>
        <span style={styles.date}>
          <label>
            立案日期:
            <DatePicker
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
    letterSpacing: '2px'
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: '0 4px'
  },
  select: {
    verticalAlign: 'middle',
    width: '200px'
  },
  shortInput: {
    width: '100px'
  },
  caseNumber: {
    marginRight: '20px'
  },
  date: {
    marginRight: '40px'
  },
  button: {
    background: 'linear-gradient(90deg, #006fff 25%, #fff 150%)',
    color: 'white',
    margin: '0 8px',
    padding: '0 16px',
    letterSpacing: '2px'
  }
};
