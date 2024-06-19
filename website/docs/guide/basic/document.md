---
title: 定制 HTML
order: 12
---

ice.js 使用 JSX 维护页面的 HTML 模板结构，其入口位于 `src/document.tsx`。

## 初始模板

`Document` 的初始模板如下：

```jsx
import { Meta, Title, Links, Main, Scripts } from 'ice';

function Document() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ice.js DEMO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main />
        <Scripts />
      </body>
    </html>
  );
}

export default Document;
```

默认引入了以下组件：

- `<Meta />`：页面的元信息
- `<Title />` 页面的标题信息
- `<Links />` 页面面依赖的 CSS 资源及其他 `link` 标签
- `<Scripts />` 页面依赖的 JS 资源
- `<Main />` 页面渲染的容器节点

这些组件，配合各路由组件的 `pageConfig` 配置，可以实现不同页面 HTML 模板的差异化渲染。

## 内容定制

### 添加 HTML 元素

就像开发其他 React 组件一样，可以在 `Document` 组件内插入自定义的其它 JSX 内容。例如：

```jsx
<body>
  <div>hello</div>
  <Main />
  <Scripts />
  <script src="xxx.js" />
</body>
```

:::caution
注意： 在 `<Scripts />` 前插入外部资源，会阻塞主 Bundle 的解析执行，影响页面性能。
:::

### 添加内联代码

另外，由于 Document 使用的是 JSX 语法，而非普通的 HTML。在 `<style />` 或 `<script />` 元素中添加内联代码需要结合 [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) 的方式，示例如下:

```jsx
<style dangerouslySetInnerHTML={{__html: `
  p {
    color: red;
    font-size: 20px;
  }
`}}>
</style>

<script type="text/javascript" dangerouslySetInnerHTML={{__html: `
  console.log("Hello World!")
`}}>
</script>
```

### 定制不同页面的 HTML

可以通过 `props.pagePath` 参数（当前页面的路由地址）区分页面并差异化渲染 HTML：

```tsx
function Document({ pagePath }) {
  return (
    <html>
      <body>
        ...
        <script crossOrigin="anonymous" src={pagePath === '/' ? 'a.js' : 'b.js' } />
      </body>
    </html>
  );
}
```

:::tip
在 `script` 标签中添加 `crossOrigin="anonymous"` 有助于错误分析器获取到跨域的全局异常。
:::

### 自定义标签渲染逻辑

如果想自定义如 `Scripts` 等组件的渲染行为，比如希望 `<script>` 标签的行为是内联代码而不是通过 `src` 来异步拉取的，则可以通过 `Scripts`、 `Link` 等组件暴露的方法来自定义组件的行为。

#### 自定义 Scripts：

```tsx
import { Main, Scripts } from 'ice';

function Document() {
  return (
    <html>
      <head></head>
      <body>
        <Main />
        <Scripts ScriptElement={(props) => {
            console.log('Script props passed from framework', props);
            return (
              <script
                dangerouslySetInnerHTML={{
                  __html: `console.log('custom scripts')`,
                }}
              />
            );
          }}
        />
      </body>
    </html>
  );
}
```

#### 自定义 Links

```tsx
import { Links, Main } from 'ice';

function Document() {
  return (
    <html>
      <head>
        <Links LinkElement={(props) => {
            return <link {...props} ></link>;
          }}
        />
      </head>
      <body>
        <Main />
      </body>
    </html>
  );
}
```

#### 自定义 Title

```tsx
import { Title, Main } from 'ice';

function Document() {
  return (
    <html>
      <head>
        <Title TitleElement={(props) => {
            return <title {...props} ></title>;
          }}
        />
      </head>
      <body>
        <Main />
      </body>
    </html>
  );
}
```

#### 自定义 Meta

```tsx
import { Meta, Main } from 'ice';

function Document() {
  return (
    <html>
      <head>
        <Meta MetaElement={(props) => {
            return <meta {...props} ></meta>;
          }}
        />
      </head>
      <body>
        <Main />
      </body>
    </html>
  );
}
```

### usePageAssets

获取当前页面的所有 Assets 资源，包含 CSS 和 JS。

```ts title="src/document.ts"
import { usePageAssets } from 'ice';

function Document() {
  const pageAssets = usePageAssets();
  const pageScripts = pageAssets.filter(src => src.indexOf('.js') > -1);

  console.log(pageScripts);

  return (
    <html>
      <head>
      </head>
      <body>
        <Main />
      </body>
    </html>
  );
}
```
