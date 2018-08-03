---
title: DEMO
order: 2
importStyle: true
---

基本展示

---

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';


class App extends Component {

  state = {

  }

  render() {
    return (
      <div style={{ padding: '50px', background: '#ddd'}}>
        <IceContainer>Hello World!</IceContainer>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
