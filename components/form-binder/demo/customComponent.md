---
title: 自定义组件
order: 4
importStyle: true
---

这里演示自定义组件的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Select,
  Grid,
} from '@icedesign/base';
const { Row, Col } = Grid;
const { Combobox } = Select;

// 对于 FormBinder 需要标准的表单交互 API，即 value 用于回填、onChange 用于更新 value
// 对于 Combobox 这种特殊交互的组件，需要封装一个业务组件使其具备标准 API，之后接入使用
class CustomCombobox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      dataSource: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // 注意在上层 FormBinder 更新 value 之后，将组件内部 value 更新
    this.setState({
      value: nextProps.value,
    });
  }

  onInputUpdate = value => {
    // mock dataSource
    const dataSource = Array(5)
      .fill(null)
      .map((item, index) => {
        return {
          label: value + index,
          value: value + index,
        };
      });

    this.setState({
      value,
      dataSource,
    });
  };

  onChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    return (
      <Combobox
        style={{verticalAlign: 'middle'}}
        onChange={this.onChange}
        value={this.state.value}
        onInputUpdate={this.onInputUpdate}
        dataSource={this.state.dataSource}
      />
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        title: '',
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
              <span>请输入标题：</span>
              <IceFormBinder
                name="title"
                required
                message="标题必填"
              >
                <CustomCombobox />
              </IceFormBinder>
              <div><IceFormError name="title" /></div>
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
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
