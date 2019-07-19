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
import HomePage from './pages/Home';
import AboutPage from './pages/About';

export default class App extends React.Component {
  render() {
    return (
      <Router basename={getBasename()}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
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
