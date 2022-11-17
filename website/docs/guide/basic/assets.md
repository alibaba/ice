---
title: 静态资源
order: 7
---

框架默认内置了处理静态资源的通用规则，一般情况下开发者无需设置资源的处理方式。另外，对于一些特殊的处理规则，框架给出了便捷方式方便开发者引入资源。

## 基础规则

框架内置了针对以下资源的处理：

- 图片资源：`.png`、`.jpg`、`.webp`、`.jpeg`、`.gif`
- 字体文件：`.woff`、`.woff2`、`.ttf`、`.eot`
- svg 文件：`.svg`

上述资源文件名默认会经过 hash 处理，并通过资源地址的方式加载（比如 `./assets/background.png` 经过构建处理后变成 `/assets/background.ef5b6544.png`）。

推荐将这些资源放在 `src/assets/` 目录下：

```markdown
src
├── assets/
│ ├── logo.png
│ └── background.png
```

然后就可以在源码中引入资源了。

### 在 JSX 文件中引入

```jsx
import background from '@/assets/background.png';

export default function () {
  return (
    <img src={background} />
  )
}
```

### 在 CSS 文件中引入

```css
.container {
  background-image: url('@/assets/background.png');
}
```

:::tip

如果资源尺寸小于 8kb，则进行 base64 转码并内联到脚本或样式文件中。

:::

## 指定处理规则

对于内置规则不满足特定场景的情况下，框架提供了便捷的方式对资源进行处理

### URL 引入

除基础规则中指定资源外，如果还希望通过资源地址的方式进行资源处理的，可以通过如下方式进行指定：

```jsx
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL);
```

`?url` 等同于为指定资源指定 url-loader

### 文件内容引入

通过 `?raw` 后缀声明将资源作为字符串引入：

```jsx
import txtContent from './text.txt?raw';
```

`?raw` 等同于为指定资源指定 raw-loader

## public 目录

`public` 目录作为框架默认的静态资源目录，不被构建工具进行编译的资源都可以放在该目录下。

比如 `favicon.ico` 文件，我们并不希望该文件名编译（默认静态资源文件名在编译后会生成独立 hash，而 `favicon.ico` 希望保持原有文件名），我们可以把该文件放在 `public` 目录下，使用时在 Document 组件中引用即可：

```diff
export default function Document() {
  return (
    <html>
      <head>
+       <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        ...
      </body>
    </html>
  );
}
```

另外像不被源码引入的资源也存放在 `public` 目录下，比如 `robots.txt`。

:::caution

- `public` 目录中的资源会在构建阶段完整复制到 `outputDir` 根目录，并且文件名不变，在部署时必须把资源文件放在服务器资源根目录下。（比如 `public/icon.svg` 文件应该在通过 `http:example.com/icon.svg` 进行访问）

:::
