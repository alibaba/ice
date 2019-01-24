---
title: 重置表单
order: 4
importStyle: true
---

经过 FormBinder 包裹的 Select 组件，重置值为未选择状态。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Select, Button, Grid } from '@alifd/next';
const { Row, Col } = Grid;

const dataSource = [];

class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        bu: 'taobao',
      },
    };
  }

  formChange = value => {
    // 说明：
    //  1. 表单是双向通行的，所有表单的响应数据都会同步更新 value
    //  2. 这里 setState 只是为了实时展示当前表单数据的演示使用
    this.setState({ value });
  };

  handleReset = () => {
    this.setState({
      value: {
        bu: 'taobao',
      },
    });
  };

  render() {
    return (
      <div>
        <FormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
          <div style={styles.content}>
            <div style={styles.formItem}>
              <span>请选择：</span>
              <FormBinder name="bu" required message="请选择">
                <Select
                  dataSource={[
                    {
                      value: 'taobao',
                      label: '淘宝',
                    },
                    {
                      value: 'tmall',
                      label: '天猫',
                    },
                    {
                      value: 'aliyun',
                      label: '阿里云',
                    },
                    {
                      value: 'alitrip',
                      label: '飞猪',
                    },
                  ]}
                  placeholder="请选择"
                  autoWidth={false}
                />
              </FormBinder>
              <FormError name="bu" />
            </div>
            <Button type="primary" onClick={this.handleReset} style={styles.resetButton}>重 置</Button>
          </div>
        </FormBinderWrapper>

        <div style={styles.preview}>
          <strong>当前表单数据：</strong>
          <pre>
            {JSON.stringify(this.state.value, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  resetButton: {
    marginLeft: '56px',
  },
  preview: {
    border: '1px solid #eee',
    margin: '20px 0',
    padding: '10px'
  }
}

ReactDOM.render(<Reset />, mountNode);
````
