import React, { Component } from 'react';
import { Input, Select, DatePicker, Button } from '@icedesign/base';

export default class FormPanel extends Component {
  static displayName = 'FormPanel';

  render() {
    return (
      <div style={styles.container}>
        <div>
          <label style={styles.label}>
            承办组:
            <Select
              style={{...styles.select, ...styles.input}}
              size="small"
            >
              <Option value="small">option1</Option>
              <Option value="medium">option2</Option>
              <Option value="large">option3</Option>
            </Select>
          </label>
          <label style={styles.label}>
            承办组组长:
            <Input
              style={styles.input}
              size="small"
            />
          </label>
          <label style={styles.label}>
            承办人:
            <Select
              style={{...styles.select, ...styles.input}}
              size="small"
            >
              <Option value="small">option1</Option>
              <Option value="medium">option2</Option>
              <Option value="large">option3</Option>
            </Select>
          </label>
          <label style={styles.label}>
            书记员:
            <Select
              style={{...styles.select, ...styles.input}}
              size="small"
            >
              <Option value="small">option1</Option>
              <Option value="medium">option2</Option>
              <Option value="large">option3</Option>
            </Select>
          </label>
          <label style={styles.label}>
            发放时间:
            <DatePicker
              placeholder="Start"
              size="small"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            排期时间:
            <DatePicker
              placeholder="Start"
              size="small"
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <Button size="small" style={styles.button}>
            保存
          </Button>
          <Button size="small" style={styles.button}>
            重置
          </Button>
          <Button size="small" style={styles.button}>
            取消
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
    letterSpacing: '2px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid #095ef3',
    height: '120px'
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '100px'
  },
  label: {
    margin: '0 10px',
    fontSize: '12px'
  },
  select: {
    verticalAlign: 'middle'
  },
  button: {
    background: 'linear-gradient(90deg, #006fff 25%, #fff 150%)',
    color: 'white',
    margin: '0 8px',
    padding: '0 16px',
    letterSpacing: '2px'
  }
};
