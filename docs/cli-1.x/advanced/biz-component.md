---
title: 业务组件开发规范
order: 11
---

## 初始化组件

```bash
// 新建组件文件夹
$ mkdir my-component & cd my-component

$ ice init component
```

根据提示输入对应的组件信息，添加完成后会在当前目录下新增一个组件，进入到该目录下，运行以下命令进行开发 :

```
// 启动组件服务
$ npm run start
```

## 目录结构

组件的基本目录结构如下：

```
component      
  ├── demo                      // 【必选】组件文档，用于生成组件开发预览，以及生成组件文档
  │   └── basic.md
  ├── lib                       // 【必选】组件编译后的文件
  │   ├── variable.scss         // 【可选】用于业务组件可配置，可以指定在不同目录位置
  │   ├── index.js              // 【必选】，工程打包出来的，组件出口文件（仅babel，不打入依赖）
  │   ├── style.js              // 【必选】，工程打包出来的，包含组件所有样式的js文件，用于去重
  │   ├── main.scss             // 【必选】，工程打包出来的，仅包含组件自身样式
  │   └── index.scss            // 【必选】，工程大包出来的，包含组件自身样式，以及外部依赖样式
  ├── src                       // 【必选】组件源码
  │   ├── index.js              // 【必选】，组件出口文件
  │   └── main.scss             // 【必选】，仅包含组件自身样式的源码文件
  ├── theme                     // 【可选】用于业务组件可配置
  │   └── index.jsx
  ├── README.md                 // 【必选】，组件说明及API            
  └── package.json              // 【必选】
```

## package.json

package.json 中包含了一些依赖信息和配置信息，示例如下：

```js
{
  "name": "@alife/1688-button",
  "version": "0.0.1",
  "main": "lib/index.js",
  "files": [
    "doc/",
    "lib/",
    "theme/",
  ],
  "dependencies": {
    "@alife/next": "1.x"                      // 【可选】可以是一个util类型的组件，如果依赖next，请务必写语义化版本号，不要写*这种
  },
  "devDependencies": {
    "react": "^16.5.0",
    "react-dom": "^16.5.0"
  },
  "peerDependencies": {
    "react": "^16.5.0"
  },
  "fusionConfig": {                           // 【可选】用于配置
    "docs": "demo",                           // 指定doc的目录
    "variable": "lib/variable.scss",          // scss变量文件相对路径
    "entry": "lib/index.scss",                // 样式入口文件相对路径
    "deps": ["button", "date-picker"]         // 声明对基础组件的依赖，此处工具会自动检测，也可手动写入
  }
}
```

## 编写组件

以上面创建的组件为例，进入 `src/index.js` , 修改初始代码，就可以开始组件的开发了。

### src/index.js

包含组件的出口文件，示例如下：

```js
import Button from './Button.jsx';
import ButtonGroup from './ButtonGroup.jsx';

Button.Group = ButtonGroup;

export default Button;
```

### src/main.scss

```css
/* 入库后可以根据主题发生变化 */
/* 不引入依赖组件的样式，比如组件 import { Button } from '@alife/next'; */
/* 不需要在main.scss中引入 @import '~@alife/next/lib/button/index.scss'; */
/* 但是在libindex.scss中需要引入 @import '~@alife/next/lib/button/index.scss'; */
@import '~@alife/next/lib/core/index-noreset.scss';

/* 推荐业务组件自身带reset样式 */
@import './scss/reset';
```

## 编写 DEMO

组件的 DEMO 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。

可以修改默认的 `usage.md` ，来调整组件 DEMO，或通过增加 *.md 文件，来创建多个 DEMO。

每个 DEMO 的形式如下：

```
---
order: {文档的排序，数字，0最小，从小到大排序}
---

# 按钮类型

按钮有三种视觉层次：主按钮、次按钮、普通按钮。不同的类型可以用来区别按钮的重要程度。

​````jsx
import Button from '@alife/1688-button';

// 默认渲染到 mountNode
ReactDOM.render(<div className="test">
    <Button type="normal">普通</Button> &nbsp;&nbsp;
</div>, mountNode);


​````css
.test {
    background: #CCC;
}

```

如果需要支持多语言，可以增加 `usage.en-US.md` 文档，文件命名采取bcp47规范。

## 编写README

README.md应该包含业务组件的源信息、使用说明以及API，示例如下：

```
---
display: {组件展示的名字，例如 '按钮'}
family: {类别，包含但不限于['form', 'data-display', 'data-entry', 'navigation', 'util', 'other']}
---

# 按钮

按钮用于开始一个即时操作。

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 类型 | String | `primray`、`normal` | normal |
```

如果需要支持多语言，可以增加 `README.en-US.md` 文档，文件命名采取bcp47规范。

## 可选配置

### lib/variable.scss

用于实现可配置中基础信息的声明，示例如下：

```css
////
/// @module @alife/1688-button: 按钮
/// @category custom
/// @family general
/// @varPrefix $alife-1688-button
/// @classPrefix alife-1688-button
/// @order {"statement/normal":10,"statement/hover":11,"statement/disabled":12,"statement/loading":13,"size/bounding":10,"size/text":11,"size/icon":12}
////

/// shadow
/// @namespace statement/normal
$alife-1688-button-shadow: $shadow-zero !default;
```

其中:

- **@module** 表示组件名，必须是npm包名，冒号后面是组件的中文名
- **@category** 表示组件的分类，默认都为"custom"
- **@family** 表示组件分组，包含但不限于 ['general', 'form', 'data-display', 'data-entry', 'navigation', 'util', 'other']
- **@varPrefix** 表示变量前缀，一个组件的变量，必须用统一的前缀，比如"$alife-1688-button"
- **@classPrefix** 组件最终生成CSS类的统一前缀，alife-1688-button
- **@order** 表示组件变量配置的顺序，一般工具会自动生成

拥有了variable.scss之后，可以在index.scss声明可以配置的样式

```css
/* 推荐业务组件直接引用组件包的样式 */
/* 入库后可以根据主题发生变化 */
/* 直接引用全量大包的例如 @alife/next/index-noreset.scss，工具编译需自动转为对应组件引用 */
@import '~@alife/next/lib/core/index-noreset.scss';
@import '~@alife/next/lib/button/index.scss';

/* 推荐业务组件自身带reset样式 */
@import './scss/reset';
@import './scss/variable';

/* 注意此处的class前缀必须是variable中声明的 classPrefix */
/* 变量前缀必须是variable中声明的 varPrefix */
.alife-1688-button {
  box-shadow: $alife-1688-button-shadow;
}
```

### theme/index.jsx


此文件用于配置时展示的可视化配置界面，如果不写 src/variable.scss，此文件可以只作为预览此业务组件的设计样式（可以跟随主题变化）；如果写了 src/variable.scss，则不仅可以预览业务组件跟随主题样式变化，并且可以配置业务组件中用户声明的可配置项。

示例如下：
```jsx
import '@alife/1688-button/lib/index.scss';

import Button from '@alife/1688-button';

const i18nMap = {
    'zh-cn': {
        normal: '普通',
    },
    'en-us': {
        normal: 'Normal',
    }
};

// 可以根据设计师的要求构建此 预览&配置界面
function render(i18n) {
    return ReactDOM.render((<div className="demo-container">
        <Button>{i18n.normal}</Button>
    </div>), document.getElementById('container'));
}

// 必须暴露 window.renderDemo 方法
window.renderDemo = function(lang) {
    lang = lang || 'en-us'

    LocaleProvider.set(lang)
    render(i18nMap[lang])
};

renderDemo();

function sendMessage(compName, type, body) {
    const parent = window.parent;

    if (parent !== window) {
        parent.postMessage({
            from: 'demo',
            type: type,
            body: body,
            compName: compName
        }, '*');
    }
}

// 必须向抛出load成功信息，第一个参数必须是组件的npm包名
sendMessage('@alife/1688-button', 'loaded'); 
```

## 发布组件

发布组件的流程实际上也就是发布一个 npm 包的过程。

> 注：如果你还没有发过 npm 包或者对 npm 包的发布流程不了解，需要先简单了解下 npm 的相关知识，这里推荐 [npm 官网](https://www.npmjs.com/)  和阮一峰写的 [npm 模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)。


```bash
# 在组件根目录下
$ npm publish
```