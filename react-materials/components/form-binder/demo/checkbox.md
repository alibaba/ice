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
import { Checkbox, Switch } from '@icedesign/base';

class App extends Component {

  state = {
    checkbox: true,
    switch: 1
  };

  formChange = (state) => this.setState(state);

  render() {
    return (
      <div>
        <FormBinderWrapper
          value={this.state}
          onChange={this.formChange}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormBinder name="checkbox" valueKey="checked">
              <Checkbox>Hello</Checkbox>
            </FormBinder>
            <FormBinder 
                name="switch"
                valueKey="checked"
                valueTransformer={(selected) => {return selected === 1}}
                valueFormatter={(checked) => {return checked ? 1 : 0}}
              >
              <Switch>开关</Switch>
            </FormBinder>
          </div>
        </FormBinderWrapper>
        <div style={{paddingTop: 10}}>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
````
