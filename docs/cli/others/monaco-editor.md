---
title: 使用 Monaco Editor
order: 4
---

monaco-editor 是一款功能非常强大的代码编辑器。

## 组件引入

安装组件依赖：

```bash
npm install --save react-monaco-editor
```

代码引入：

```jsx
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    }
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
      />
    );
  }
}
```

## 使用 monaco-editor-webpack-plugin

这个插件用于 monaco 资源的引入，用了这个插件才能支持 highlighting/autocomplete/validation 等能力

```bash
npm install monaco-editor-webpack-plugin --save

touch .webpackrc.js
```

然后在 `.webpackrc.js` 引入插件：

```javascript
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
    	// available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    	languages: ['javascript']
    })
  ]
};

```

重新启动服务即可生效。

## 问题

### 云构建时 `monaco-editor-webpack-plugin` 报错找不到 webpack 依赖

暂时先将 ice-scripts 从 devDep 依赖变为 dep 依赖即可

## 参考链接

- [https://github.com/Microsoft/monaco-editor](https://github.com/Microsoft/monaco-editor)
- [https://github.com/react-monaco-editor/react-monaco-editor](https://github.com/react-monaco-editor/react-monaco-editor)
- [https://github.com/Microsoft/monaco-editor-webpack-plugin](https://github.com/Microsoft/monaco-editor-webpack-plugin)