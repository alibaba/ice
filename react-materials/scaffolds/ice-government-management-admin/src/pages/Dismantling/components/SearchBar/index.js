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
              size="small"
            />
            )
          </label>
          <Select
            placeholder="沪高拆预"
            style={{...styles.select, ...styles.input}}
            size="small"
          >
            <Option value="small">option1</Option>
            <Option value="medium">option2</Option>
            <Option value="large">option3</Option>
          </Select>
          字第
          <Input
            style={{...styles.input, ...styles.shortInput}}
            size="small"
          />
          号
        </span>
        <span style={styles.date}>
          <label>
            立案日期:
            <DatePicker
              placeholder="Start"
              size="small"
              style={{...styles.shortInput, ...styles.datePicker}}
            />
          </label>
        </span>
        <span>
          <Button size="small" style={styles.button}>
            查询
          </Button>
          <Button size="small" style={styles.button}>
            重置
          </Button>
          <Button size="small" style={styles.button}>
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
    borderRadius: '11px',
    margin: '0 4px',
    border: '1px solid #0052f7'
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
  datePicker: {
    border: '1px solid #0052f7'
  },
  date: {
    marginRight: '40px'
  },
  button: {
    background: 'linear-gradient(90deg, #006fff 25%, #fff 150%)',
    color: 'white',
    margin: '0 8px'
  }
};
