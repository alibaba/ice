---
title: 静态资源
order: 7
---

ice.js 内置了大量规则处理静态资源，一般情况下开发者无需设置资源的处理方式，而对于一些特殊的处理规则框架同样给出了便捷方式和指引

# 基础规则

框架内置了针对以下资源的处理：

- 字体文件：`.woff`、`.woff2`、`.ttf`、`.eot`
- svg 文件 `.svg`
- 图片资源 `.png`、`.jpg`、`.webp`、`.jpeg`、`.gif`

上述资源默认通过资源地址加载，推荐将这些资源放在 `src/assets` 目录下：

```shell
src
├── assets/
│ ├── logo.png
│ └── bg.png     // Favicon
```

此时即可在代码中使用这些资源：

```jsx
import logoUrl from '@/assets/logo.png';

function Home() {
  return (
    <>
      <img src={logoUrl} />
    </>
  );
}
```

如果资源尺寸小于 8kb，则进行 base64 转码并内联到脚本或样式文件中。

# 指定处理规则

对于内置规则不满足特定场景的情况下，框架提供了便捷的方式对资源进行处理

## URL 引入

除基础规则中指定资源外，如果还希望通过资源地址的方式进行资源处理的，可以通过如下方式进行指定：

```jsx
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL);
```

`?url` 等同于为指定资源指定 url-loader

## 文件内容引入

通过 `?raw` 后缀声明将资源作为字符串引入：

```jsx
import txtContent from './text.txt?raw';
```

`?raw` 等同于为指定资源指定 raw-loader

## Worker 引入

脚本可以通过指定后缀引入为 web worker：

```jsx
import Worker from './worker.js?worker'
```

`?worker` 等同于为指定资源指定 worker-loader

```jsx
import Worker from './worker.js?sharedworker'
```

`?sharedworker` 等同于为指定资源指定 worker-loader，并指定 worker 类型为 SharedWorker

```jsx
import Worker from './worker.js?worker&inline'
```

`?worker&inline`等同于为指定资源指定 worker-loader，并指定配置 `{ inline: 'fallback' }`

# public 目录

`public/` 目录作为框架默认的静态资源目录，不被构建工具进行编译的资源都可以放在该目录下。

比如 `favicon.svg` 文件，我们并不希望该文件名编译（默认静态资源文件名在编译后会生成独立 hash，`favicon.svg` 希望保持原有文件名），在使用时直接在 html 模版中进行引用：

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
</html>
```

另外像不被源码引入的资源也存放在 public 目录下，比如设置 externals 后的 umd 链接，在不使用 CDN 的情况下，同样可以直接放在 `public` 目录下。

`public` 目录中的资源在开发时能直接通过 `/` 根路径访问到，并且打包时会被完整复制到目标目录的根目录下。
