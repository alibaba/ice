---
title: 错误边界 Error Boundaries
order: 7
---

当某个组件出现 JavaScript 错误时不应该影响整个应用的渲染，为了解决这个问题，我们可以通过错误边界（Error Boundaries）进行处理。

## 应用错误边界

错误边界的工作方式类似于 JavaScript 的 `catch {}`，不同的地方在于错误边界只针对 React 组件。且只有 class 组件才可以成为错误边界组件。大多数情况下，我们只需要声明一次错误边界组件，并在整个应用中使用它。

icejs 中默认在应用的根组件上添加了 `ErrorBoundary` 组件，当应用子组件抛出的错误符合补获条件而其自身并未进行处理时，则进入应用的错误边界逻辑作为最后兜底的方案。如下图为补获错误时的备用 UI。

![](https://img.alicdn.com/tfs/TB1rNezBAL0gK0jSZFxXXXWHVXa-2880-1754.png)

同时，我们也可以通过自 `ErrorBoundaryFallback` 和 `onErrorBoundaryHander` 进行自定义：

```tsx
import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    // 是否开启 ErrorBoundary，默认为 false
    errorBoundary: true
    // 自定义错误边界的 fallback UI
    ErrorBoundaryFallback: () => <div>渲染错误</div>,
    // 自定义错误的处理事件
    onErrorBoundaryHander: (error: Error, componentStack: string) {
      // Do something with the error
    },
  }
};

createApp(appConfig);
```

## 页面错误边界

除了应用级别配置错误边界，也可以对每个页面进行配置：

```tsx
const HomePage = () => {
  return <>Home</>
}

HomePage.pageConfig = {
  // 当前页面开启 ErrorBoundary，默认为 false
  errorBoundary: true
}
```

## 组件错误边界

错误边界的粒度可以是应用级别，页面级别，也有可能是组件级别，因此 icejs 也提供了 `ErrorBoundary` 组件，用于自行处理错误边界的情况。

### ErrorBoundary

错误边界组件，用法如下：

```tsx
import { ErrorBoundary } from 'ice';

export default function Todo() {
  return (
    <ErrorBoundary
      {/* 自定义错误边界的 fallback UI */}
      Fallback={() => <div>渲染错误</div>}
      {/* 自定义错误的处理事件 */}
      onError={myErrorHandler}
    >
      <TodoList />
    </ErrorBoundary>
  );
}
```

## 其他

错误边界无法捕获以下场景中产生的错误：

* 事件处理（[了解更多](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers)）
* 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
* 服务端渲染
* 它自身抛出来的错误（并非它的子组件）
