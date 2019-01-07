---
title: BalloonConfirm
category: Components
chinese: 气泡确认框
---

ICE 气泡确认框

## 安装和升级

```bash
npm install @icedesign/balloon-confirm
```

## 开发指南

气泡确认框

### 何时使用

- 当目标操作需要进一步确认时，弹出确认框，询问用户。
- 该组件作为一个轻量级的确认交互，不宜在内部放过多元素。如需较多定制，可直接使用`Balloon`组件。

### 使用注意

- 因为内部使用`Balloon`组件，所以对于子元素是自定义`React Component`的情况，需要主动传递`onMouseEnter`、`onMouseLeave`、`onClick`事件。
- 更多`props`可参考`Balloon`组件，其中`triggerType`默认为`click`。

## API

### 气泡确认框

| 参数名      | 说明           | 必填 | 类型        | 默认值                                               | 备注 |
| ----------- | -------------- | ---- | ----------- | ---------------------------------------------------- | ---- |
| className   | 样式名         | 否   | string      | -                                                    |      |
| title       | 确认框描述     | 否   | string      | -                                                    |      |
| confirmText | 确认按钮文本   | 否   | string      | '确认'                                               |      |
| cancelText  | 取消按钮文本   | 否   | string      | '取消'                                               |      |
| onConfirm   | 点击确认的回调 | 否   | function(e) | -                                                    |      |
| onCanel     | 点击取消的回调 | 否   | function(e) | -                                                    |      |
| Icon        | 自定义气泡图标 | 否   | ReactNode   | <Icon type="warning" style={{ color: '#FFA003' }} /> |      |
