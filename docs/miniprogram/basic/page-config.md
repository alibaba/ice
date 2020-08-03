---
title: 页面配置
order: 4
---

# 页面配置

框架支持在路由配置项中进行页面配置，在 `routes` 数组的每一项里，可将页面配置属性放在 `window` 中。

```json
{
  "routes": [
    {
      "path": "/",
      "source": "pages/Home/index",
      "window": {
        "barButtonTheme": "default"
      }
    },
    {
      "path": "/about",
      "source": "pages/About/index",
      "window": {
        "barButtonTheme": "light"
      }
    }
  ],
  "window": {
    "defaultTitle": "Mini program",
  }
}
```

## 生命周期

框架提供了页面级生命周期，可以通过 `usePageShow` 和 `usePageHide` hooks 来监听生命周期。

- usePageShow：在当前页面显示时触发；
- usePageHide：在当前页面被隐藏时触发。

```ts
import { usePageShow, usePageHide } from 'ice';

export default function HomePage(props) {
  usePageShow(() => {
    // page show
  });

  usePageHide(() => {
    // page hide
  });

  return (
    // jsx
  )
}
```

对于 class 组件的页面可以通过 with 高阶方法监听页面的生命周期。

```ts
import { withPageLifeCycle } from 'ice';

class HomePage extends React.Component {
  onShow() {
    // page show
  }

  onHide() {
    // page hide
  }

  render() {
    return (
      // jsx
    )
  }
}

export default withPageLifeCycle(HomePage);
```
