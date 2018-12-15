---
title: 响应式方案
category: 进阶指南
order: 6
---

在飞冰物料中，响应式设计主要分为 Layout 和 Block 两部分，两者区分开来；Block 的响应式不依赖于 Layout 的相关配置和样式，这样设计的目的主要是解耦和可扩展性，保证区块不仅仅适用于飞冰提供的 Layout，也可以是自定义的 Layout；

响应式断点阈值与 [component/grid](#/component/grid) 的栅格系统基本保持一致，但稍有删减，主要分 `xss`、`s`、`l` 三种场景做适配：

- xss：320px
- s：720px
- l： 1200px

## 如何使用

方案一：

使用纯 JavaScript 实现的 CSS 媒体查询库 [enquprogramire.js](https://github.com/WickyNilliams/enquire.js) 来监听当前屏幕分辨率的变化，大致用法如下：

```js
  import { enquire } from 'enquire-js';

  state = {
    isMobile: false
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };
```

方案二：

使用 CSS3 @media 查询：

```css
@media screen and (min-width: 1200px) {
}

@media screen and (min-width: 721px) and (max-width: 1199px) {
}

@media screen and (max-width: 720px) {
}
```

## 如何升级到新版的响应式

场景一：如果你使用 Iceworks 创建了项目，但是 Layout 部分还没有做任何改动，建议新创建一个临时的项目，然后将对应的 Layout 代码复制过来替换掉已有的 Layout

场景二：如果你使用 Iceworks 创建了项目，但是已经做了对应的修改，你可以先了解 ICE 物料的响应式方案，结合下面的示例代码做对应的修改：

### 升级布局

```js
// 第一步: 引入 enquire-js
import { enquireScreen } from 'enquire-js';


// 第二步：注册监听屏幕的变化，可根据不同分辨率做对应的处理
export default class BasicLayout extends PureComponent {
  state = {
    isMobile: false
  }
}

componentDidMount() {
  this.enquireScreenRegister();
}

enquireScreenRegister = () => {
  const mediaCondition = 'only screen and (max-width: 720px)';

  enquireScreen((mobile) => {
    this.setState({
      isMobile: mobile,
    });
  }, mediaCondition);
};

render () {
  // 根据当前状态做显示隐藏
  const { isMobile } = this.state;

  return (
    <Layout>
      ...
    </Layout>
  )
}
```

### 升级区块

[Iceworks](#/iceworks) 版本已经支持添加区块到指定的页面下面，可通过该方法对区块进行升级

![](https://img.alicdn.com/tfs/TB16S2cdxSYBuNjSspjXXX73VXa-1732-1346.png)

### 升级基础包

飞冰物料依赖 `@icedesign/base` 基础包，`@icedesign/base` 由 `v1` 版本升级到了 `v2` 版本，主要改动是 [Grid](#/component/grid) 组件支持 `gutter` 属性，具体改动如下：

- 删除已经废弃的 offsetFixed
- 删除 type 属性
  - 原 fluid 可选值删除
  - 原 fixed 可选值 => 单独的 fixed 属性，默认值为 false
  - 原 wrap/nowrap 可选值 => 单独的 wrap 属性，默认值为 false
  - 原 no-padding/across 删除 => 单独的 gutter 属性，默认值为 0
- 1.x Col 默认存在间距，只能通过 type 设置为 no-padding/across 去除间距，但是不能修改其他值 => 单独的 gutter 属性设置
- 1.x Row 设置了 margin-left: auto;/margin-right: auto; 自动水平居中，1.x 为了实现 gutter 需要设置 Row 的 margin 为负值实现，如想实现 0.x 水平居中，可在外层包裹一层 div，并设置它的样式，此实现方案与 bootstrap/antd 相同，业界通用，灵活方便
