---
title: Img
category: Components
chinese: 图片组件
---

ICE 图片组件，用来增强图片显示效果。

## 安装和升级

```bash
npm i @icedesign/img -S
```

## 参数（props）

| 参数名             | 说明                                      | 必填  | 类型     | 默认值 | 可选值                 | 备注                                                           |
| ------------------ | ----------------------------------------- | ----- | -------- | ------ | ---------------------- | -------------------------------------------------------------- |
| type               | 图片显示模式                              | false | string   | cover  | cover、contain         |                                                                |
| src                | 图片 url                                  | true  | boolean  | false  |                        |                                                                |
| shape              | 形状展现                                  | false | string   | sharp  | circle、sharp、rounded |                                                                |
| title              | 图片的 title，hover 上去会显示出来        | false | string   | ''     |                        |                                                                |
| alt                | 图片的 alt 通常用于屏幕阅读器（盲人）识别 | false | string   | ''     |                        |                                                                |
| className          | 图片的 className                          | false | string   | ''     |                        |                                                                |
| style              | 图片的 inline style                       | false | object   | {}     |                        |                                                                |
| width              | 图片显示宽度                              | false | number   |        |                        | 计算图片必需，不传则表现形式等同于普通 img 标签。              |
| height             | 图片显示高度                              | false | number   |        |                        | 计算图片必需，不传则表现形式等同于普通 img 标签。              |
| errorImgSrc        | 图片加载失败的兜底图片                    | false | string   |        |                        | 如果图片加载失败，那么将用这张图来代替                         |
| onError            | 图片加载失败的回调方法                    | false | function |        |                        | 如果图片加载失败，那么将执行这个 callback 让你添加一些容错逻辑 |
| enableAliCDNSuffix | 是否启用 Ali CDN 自动裁切参数             | false | false    |        |                        | 如果在 cover 模式下，图片高度太高可能会拉伸的比较模糊          |

### 图片底部存在 3px 空隙的解决方法

如果你将当前组件用来展示图片放在其他组件内，或者使用当前组件时有外边线，细致的你会发现底部可能存在 3px 的间隙：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice-components/ice-add-video/a02c7c20435905f1d13e7d3e7d61f7b7/image.png)

这是由于图片的 inline-block 渲染模式导致的，你无需理解背后的原理，如果你想去掉这个间隙，可以直接在当前组件加上一行 CSS 即可：

```jsx
<Img
  style={{
    verticalAlign: 'middle',
  }}
  src="xxx"
/>
```

### 图片尺寸性能优化

图片原图可能会非常大，例如 `https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png` 会达到 200kb 但实际放在页面上，希望它只显示 200x100 这样的尺寸，此时性能就会很差。

如果你的图片使用 img.alicdn.com 这个 CDN 地址，那么可以传入 props `enableAliCDNSuffix={true}` 将自动开启 Ali CDN 裁切参数，会将图片 url 变成 `https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png_400x200q90.jpg` 进行压缩优化，压缩之后图片只有 116kb，加载性能会提升非常多，建议默认开启使用。

如果在 cover 模式下，如果图片尺寸跟配置的显示尺寸差距太大，可能会导致拉伸变模糊，如果绝大部分图片都是此类尺寸，可以设置 false 去掉这个功能。
