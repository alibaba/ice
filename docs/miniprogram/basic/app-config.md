---
title: 应用配置
order: 3
---

# 应用配置

`app.json` 用于对应用进行全局的静态配置，如设置路由、窗口表现等。


## routes

routes 用于指定应用的页面，每一项代表对应页面的路径及文件信息。

- `path`: 指定页面对应的匹配路径
- `source`: 指定页面组件地址（相对于 src 目录的路径）

```json
{
  "routes": [
    {
      "path": "/",
      "source": "pages/Home/index"
    }
  ]
}
```

## window

可以通过 window 配置应用的窗口表现，同时也支持针对每个页面设置窗口表现。目前已经支持的参数的有：

```json
{
  "window": {
    "titleBarColor": "",
    "pullRefresh": true,
    "title": "Home"
  }
}
```

其它没有列出的属性，可以直接参照各平台小程序自己的配置填写。

## tabBar

可以通过 tabBar 配置应用的 tab 栏的表现，以及 tab 切换时显示的对应页面。

```json
{
  "tabBar": {
    "textColor": "#999",
    "selectedColor": "#666",
    "backgroundColor": "#f8f8f8",
    "items": [
      {
        "name": "home",
        "path": "/",
        "icon": "https://gw.alicdn.com/tfs/TB1ypSMTcfpK1RjSZFOXXa6nFXa-144-144.png",
        "activeIcon": "https://gw.alicdn.com/tfs/TB1NBiCTgHqK1RjSZFPXXcwapXa-144-144.png"
      }
    ]
  }
}
```

完整配置详见 [全局配置 - tabBar](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar)



