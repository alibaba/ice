---
title: 错误边界 Error Boundaries
order: 6
---

当某个组件出现 JavaScript 错误时不应该影响整个应用的渲染，为了解决这个问题，我们可以通过错误边界（Error Boundaries）进行处理。

## 应用错误边界

错误边界的工作方式类似于 JavaScript 的 `catch {}`，不同的地方在于错误边界只针对 React 组件。且只有 class 组件才可以成为错误边界组件。大多数情况下，我们只需要声明一次错误边界组件，并在整个应用中使用它。

icejs 中默认在应用的根组件上添加了 `ErrorBoundary` 组件，当应用子组件抛出的错误符合补获条件而其自身并未进行处理时，则进入应用的错误边界逻辑作为最后兜底的方案。如下图为补获错误时的备用 UI。

![](https://img.alicdn.com/tfs/TB19vuyBrY1gK0jSZTEXXXDQVXa-923-618.png)

同时，我们也可以通过自 `ErrorBoundaryFallback` 和 `onErrorBoundaryHander` 进行自定义：

```tsx
import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    // 自定义错误边界的 fallback UI
    ErrorBoundaryFallback: <div>渲染错误</div>,
    // 自定义错误的处理事件
    onErrorBoundaryHander: (error: Error, componentStack: string) {
      // Do something with the error
    },
  }
};

createApp(appConfig);
```

## 组件错误边界

错误边界的粒度可以是应用级别，也有可能是组件级别，因此 icejs 也提供了 `ErrorBoundary` 组件和 `withErrorBoundary` 的高阶方法，用于自行处理错误边界的情况。

### ErrorBoundary

错误边界组件，用法如下：

```tsx
import ErrorBoundary from 'ice';

// 错误处理事件
const myErrorHandler = (error: Error, componentStack: string) => {
  // Do something with the error
};

// 错误 fallback UI
const MyFallbackComponent = ({ componentStack, error }) => (
  <div>
    <p><strong>Oops! An error occured!</strong></p>
    <p>Here’s what we know…</p>
    <p><strong>Error:</strong> {error.toString()}</p>
    <p><strong>Stacktrace:</strong> {componentStack}</p>
  </div>
);

<ErrorBoundary
  Fallback={MyFallbackComponent}
  onError={myErrorHandler}
>
  <ComponentThatMayError />
</ErrorBoundary>
```

### withErrorBoundary

错误边界的高阶方法，用法如下：

```ts
import { withErrorBoundary } from 'ice';

const ComponentWithErrorBoundary = withErrorBoundary(
  // 必须，需要被包装的组件
  Component,
  // 可选，自定义 fallback UI
  Fallback,
  // 可选，自定义错误处理事件
  onError: (error, componentStack) => {
    // Do something with the error
  },
);
```

## 其他

错误边界无法捕获以下场景中产生的错误：

* 事件处理（[了解更多](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers)）
* 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
* 服务端渲染
* 它自身抛出来的错误（并非它的子组件）
