---
title: 自定义 icon 功能
category: 进阶指南
order: 2
---

icon 作为设计元素在界面使用到的场景非常多，在 ICE 的基础和业务组件里提供了一些通用的 icon，但在实际项目中，仍会遇到很多自定义的 icon，通常有两种方案来进行自定义 icon:

- 结合 iconfont，在 css 中引入对应的 icon 字体文件及样式，然后在代码中使用。该方式的优点是足够灵活方便，缺点是代码中使用比较麻烦，且不能结合 Icon 组件使用，因此本文对该方案不做介绍，如需使用，可在 ICE 万能群里咨询使用细节。
- 结合配置平台的自定义主题功能使用，下面介绍该使用方案。

## 1. 新建主题

参照[使用自定义主题功能](/docs/addons/skin)文档，创建好对应的主题。

## 2. 导入自定义 icon

首先，视觉同学在 iconfont 上建好对应业务的图标应用项目，如「达人平台」, 在图标项目详情的页面，通过 url 可以看到一个 projectId, 复制如图中的这个数字：

![image](//img.alicdn.com/tfs/TB1bQtMOFXXXXa_apXXXXXXXXXX-1044-581.png)

接下来在配置好的主题页面，点击左侧导航中的 Icon，即会进入配置 icon 的页面：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/9a4c23e0bd29a21deeb8b29403f45250/image.png)

然后点击「导入图标」的按钮，填写上面所说的 projectId -> 点击加载 -> 点击确定，即可看到自定义的 icon 被导入到主题里，同时 iconfont 上的图标项目中也相应增加了基础组件中的所有 icon:

![image](//img.alicdn.com/tfs/TB1z_usOFXXXXX3XXXXXXXXXXXX-724-495.png)

**注意：尽量避免覆盖基础组件的 icon, 因为不同尺寸的 icon 可能会导致基础组件错位。**

## 3. 发布主题

参照[使用自定义主题功能](/docs/addons/skin)文档，发布主题。

## 4. 使用自定义 Icon

接着就是在项目里使用自定义 Icon 了, 首先参照[使用自定义主题功能](/docs/addons/skin)文档安装依赖并进行配置，重新 dev 之后就可以在代码里使用了：

```jsx
import {Icon} from '@ali/ice';

export default App extends React.Component {
  render() {
    return <Icon type="xinlangweibo" />;
  }
}
```

代码中的 type 值可通过主题页面里的 icon 列表可以查找，如下：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/03d1422e1f7bcd857286f2336a13a3a2/image.png)

## 5. icon 变更

同[使用自定义主题功能](/docs/addons/skin)文档中的主题变更流程。