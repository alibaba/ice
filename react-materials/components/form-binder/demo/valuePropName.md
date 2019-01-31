---
title: 自定义 valuePropName
order: 7
importStyle: true
---

有时候自定义或第三方的表单组件的取值属性不是 value，可以通过 valuePropName 来进行修改，也可以通过 setFieldValue 和 getFieldValue 进行转换

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Checkbox, Switch } from '@alifd/next';

class App extends Component {

  state = {
    value: {
      checkbox: true,
      switch: 1
    }
  };

  formChange = (value) => {
    // 说明：
    //  1. 表单是双向通行的，所有表单的响应数据都会同步更新 value
    //  2. 这里 setState 只是为了实时展示当前表单数据的演示使用
    this.setState({ value })
  }

  render() {
    return (
      <div>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
        >
          <div style={styles.content}>
            <div style={styles.formItem}>
              <span>复选框：</span>
              <FormBinder name="checkbox" valuePropName="checked">
                <Checkbox />
              </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span>开关：</span>
              <FormBinder
                name="switch"
                valuePropName="checked"  // Switch 接收的属性是 `checked`
                setFieldValue={(selected) => { return selected === 1 }}  // 转换为 boolean 传给 switch
                getFieldValue={(checked) => { return checked ? 1 : 0 }}  // 返回值转换为 number 给表单值
              >
                <Switch size="small" />
              </FormBinder>
            </div>
          </div>
        </FormBinderWrapper>
        <div style={styles.preview}>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10
  }
}

ReactDOM.render(<App />, mountNode);
````
