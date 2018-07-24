---
title: 重置表单组件的用法
order: 3
importStyle: true
---

经过 FormBinder 包裹的 Select 组件，重置值为未选择状态。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Select, Button, Grid } from '@icedesign/base';
const { Row, Col } = Grid;

const dataSource = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        ip: undefined,
      },
    };
  }

  formChange = value => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  handleReset = () => {
    this.setState({
      value: {
        ip: undefined,
      },
    });
  };

  render() {
    return (
      <div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <div>
              <span>请选择 IP（数字累加要超过 200）：</span>
              {/* rules 作为 descriptor 透传给 async-validator 详细书写方式请参见 https://github.com/yiminghe/async-validator  */}
              <IceFormBinder>
                <Select
                  name="ip"
                  dataSource={[
                    {
                      value: 1,
                      label: '第一个选项',
                    },
                    {
                      value: 2,
                      label: '第二个选项',
                    },
                  ]}
                  placeholder="请选择"
                  autoWidth={false}
                />
              </IceFormBinder>
              <div><IceFormError name="ip" /></div>
            </div>
          </div>
        </IceFormBinderWrapper>
        <div
          style={{
            border: '1px solid #ccc',
            background: '#cacaca',
            marginTop: 20,
            padding: 10,
          }}
        >
          <strong>当前表单数据：</strong>
          <pre>
            {JSON.stringify(this.state.value, null, 2)}
          </pre>
        </div>
        <Button onClick={this.handleReset}>Reset</Button>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
````
