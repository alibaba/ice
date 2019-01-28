
---
title: 主题配置
order: 9
category: 物料
---

飞冰（ICE）提供了主题替换能力，来实现项目的一键换肤，以满足业务和品牌多样化的视觉需求，包括但不限于主色、圆角、边框等的视觉自定义配置。

创建业务的自定义主题包，可以访问： https://fusion.design/ 

### 配置主题

选定一个主题包后（例如 `@icedesign/theme`），我们可以通过下面的配置引入主题。

第一步，安装依赖

```
npm install @icedesign/theme -save
```

注意：在区块和组件的开发过程中，主题的引入只是为了预览时，可以看到指定主题后的效果，所以只需将依赖安装到 `devDependencies` 中。

```
npm install @icedesign/theme -save-dev
```

第二步，在 `package.json` 中添加主题配置

```
// in package.json

...

"buildConfig": {
  "theme": "@icedesign/theme"
},
```

如此，项目中的基础组件 UI，便会随所配置的主题更新。

### 使用主题中的变量

在自定义的样式中，使用主题变量，可以实现样式跟随主题改变而改变的效果。

以下面的 demo 为例，在定义 `title` 的 `color` 时，使用了主题包中的变量 `$color-brand1-1` ，来实现文字颜色随主题中的品牌色变化。

```
// 引入主题变量
@import "~@icedesign/theme/variables.scss";

// 使用主题变量
.title {
  color: $color-brand1-1;
}
```