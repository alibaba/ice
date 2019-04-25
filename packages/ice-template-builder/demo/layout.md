---
title: 布局预览
order: 2
importStyle: true
---

布局预览

---

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LayoutBuilder } from '@icedesign/template-builder';

class App extends Component {
  state = {};

  render() {
    return <LayoutBuilder />;
  }
}

ReactDOM.render(<App />, mountNode);
```
