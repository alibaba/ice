---
title: 元素可见
order: 16
---

当需要监测一个元素是否出现在可见区域时（比如列表滚动时是否曝光），可以通过 `<VisibilityChange />` 组件来监测指定元素是否当前可见或者消失。

:::tip
小程序端不支持该能力。
:::

## 安装 `@ice/appear`

`<VisibilityChange />` 组件并不是内置组件，需要通过安装 `@ice/appear` 来引入。

```bash
$ npm i @ice/appear --save
```

然后在代码中引入：

```ts
import VisibilityChange from '@ice/appear';
```

## 当元素进入可见状态时

```jsx
import VisibilityChange from '@ice/appear';

export default function Home() {
  return (
    <VisibilityChange
      onAppear={() => {
        console.log('onAppear')
      }}
    >
      show something
    </VisibilityChange>
  )
}
```

### 发送曝光埋点

发送曝光埋点通常只需要首次 `appear` 事件被触发，我们可以通过实现一个 `useOnce` 的自定义 `hook` 来实现。

```ts
// 实例代码
function useOnce(fn) {
  const [called, setCalled] = useState(false);
  return (...args) => {
    if (!called) {
      setCalled(true);
      return fn(...args);
    }
  };
}

export default function Index() {
  const handleAppear = useOnce(() => {
    console.log('once appear');
  });

  return (
    <div className={styles.app}>
      <VisibilityChange
        onAppear={handleAppear}
      >
        <p>Hello ice.js 3</p>
      </VisibilityChange>
    </div>
  );
}
```

## 当元素进入不可见状态时

```jsx
import VisibilityChange from '@ice/appear';

export default function Home() {
  return (
    <VisibilityChange
      onDisappear={() => {
        console.log('onDisappear')
      }}
    >
      show something
    </VisibilityChange>
  )
}
```

:::caution
请注意，当元素使用 `transform` 等非触发 DOM 布局变更的行为使元素移动时，本组件的行为可能会失效。
:::
