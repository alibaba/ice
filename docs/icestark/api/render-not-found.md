---
title: renderNotFound
order: 9
---

子应用触发渲染全局 404 的方法

- 类型：`function`
- 代码示例：

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { renderNotFound, getBasename } from '@ice/stark';

function List() {
  return <div>List</div>;
}

function Detail() {
  return <div>Detail</div>;
}

export default class App extends React.Component {
  render() {
    return (
      <Router basename={getBasename()}>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/detail" component={Detail} />
          <Route
            component={() => {
              // 通知框架应用渲染全局 404
              return renderNotFound();
            }}
          />
        </Switch>
      </Router>
    );
  }
}
```
