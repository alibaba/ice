import React, { Component } from 'react';
import { Input, Select, DatePicker, Button } from '@alifd/next';

const { Option } = Select;

export default class FormPanel extends Component {
  static displayName = 'FormPanel';

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.form}>
          <label style={styles.label}>
            承办组:
            <Select style={{ ...styles.select, ...styles.input }}>
              <Option value="small">淘小宝1</Option>
              <Option value="medium">淘小宝2</Option>
              <Option value="large">淘小宝3</Option>
            </Select>
          </label>
          <label style={styles.label}>
            承办组组长:
            <Input style={styles.input} />
          </label>
          <label style={styles.label}>
            承办人:
            <Select style={{ ...styles.select, ...styles.input }}>
              <Option value="small">淘小宝1</Option>
              <Option value="medium">淘小宝2</Option>
              <Option value="large">淘小宝3</Option>
            </Select>
          </label>
          <label style={styles.label}>
            书记员:
            <Select style={{ ...styles.select, ...styles.input }}>
              <Option value="small">淘小宝1</Option>
              <Option value="medium">淘小宝2</Option>
              <Option value="large">淘小宝3</Option>
            </Select>
          </label>
          <label style={styles.label}>
            发放时间:
            <DatePicker placeholder="Start" style={styles.input} />
          </label>
          <label style={styles.label}>
            排期时间:
            <DatePicker placeholder="Start" style={styles.input} />
          </label>
        </div>
        <div>
          <Button style={styles.button}>保存</Button>
          <Button style={styles.button}>重置</Button>
          <Button style={styles.button}>取消</Button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '20px 0',
    letterSpacing: '2px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0',
    alignItems: 'center',
    flexDirection: 'column',
  },
  form: {
    textAlign: 'center',
    marginBottom: '16px',
    wordBreak: 'keep-all',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '110px',
  },
  label: {
    margin: '0 6px',
    fontSize: '12px',
  },
  select: {
    verticalAlign: 'middle',
  },
  button: {
    margin: '0 8px',
    padding: '0 16px',
    letterSpacing: '2px',
  },
};
