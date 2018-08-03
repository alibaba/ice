---
title: 自定义 value key 的用法
order: 4
importStyle: true
---

有时候组件的取值属性不是 value，可以通过 valueKey 来进行修改

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormBinderWrapper, {
  FormBinder,
  FormError
} from '@icedesign/form-binder';
import { Checkbox } from '@icedesign/base';

class App extends Component {

  state = {
    checkbox: true,
  };

  formChange = (state) => this.setState(state);

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <FormBinderWrapper
          value={this.state}
          onChange={this.formChange}
        >
          <div>
            <FormBinder name="checkbox" valueKey="checked">
              <Checkbox>Hello</Checkbox>
            </FormBinder>
          </div>
        </FormBinderWrapper>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
````
